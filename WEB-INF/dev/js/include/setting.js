$.extend(setting, {
    checkPhone: function() {
        var phone = $('#setting_safe_phone .nick_name input').val();
        if (G.phoneValid(phone)) {
            register.setBtnColor($("#setting_safe_phone .get_phone_code"), 1);

        } else {
            register.setBtnColor($("#setting_safe_phone .get_phone_code"), 0);
        }
    },
    /** ==================================== init ==================================== **/

    /**
     * @param flag 0-all;1-basic;2-photo;3-safe;4-pref
     */
    init: function(flag) {
        $.myPost(G.opt.post_url + '/account/to-setting?random=' + Math.random(), {}, function(d) {
            if (d.flag == 0) {
                var account = d.data.account;
                if (flag == 0 || flag == 1) { G.setting.initBasic(account, d.data.city, d.data.industry); }
                if (flag == 0 || flag == 2) { G.setting.initPhoto(account); }
                if (flag == 0 || flag == 3) { G.setting.initSafe(account); }
                if (flag == 0 || flag == 4) { G.setting.initPref(d.data.accountPreference); }
            } else {
                alert(d.msg);
            }
        });
    },

    initBasic: function(account, city, industry) {
        var basciDiv = $("#setting_basci_div");
        // ...
        basciDiv.find("input[name='nickName']").val(account.nickName);
        basciDiv.find("input[name='name']").val(account.name);
        basciDiv.find("input[name='alphaLastName']").val(account.alphaLastName);
        basciDiv.find("input[name='alphaFirstName']").val(account.alphaFirstName);
        // gender
        var gender = account.gender;
        if (gender == 1 || gender == 2) { basciDiv.find("input[name='gender']").eq(gender).attr("checked", "checked"); } else { basciDiv.find("input[name='gender']").eq(0).attr("checked", "checked"); }
        // address
        var provinceId = null;
        var cityId = null;
        var cityName = null;
        if (city != null) {
            provinceId = city.provinceId;
            if (provinceId != null) { cityId = city.id;
                cityName = city.name; }
        }
        G.cache_processor.selectProvince("setting_province", "setting_city", provinceId);
        G.cache_processor.selectCity("setting_city", cityId, cityName);
        // industry
        var industryId = null;
        var industryName = null;
        if (industry != null) { industryId = industry.id;
            industryName = industry.name; }
        G.cache_processor.selectIndustry("setting_industry", industryId, industryName);
        // ...
        basciDiv.find("input[name='company']").val(account.company);
        basciDiv.find("input[name='position']").val(account.position);
        for_selct();
    },

    initPhoto: function(account) {
        var photoDiv = $("#setting_photo_div");
        var photo = account.photo;
        photo = photo == null || photo == '' ? (G.opt.post_url + "/images/icos/photo96.jpg") : photo;
        photoDiv.find("img").attr("src", photo);
    },

    initSafe: function(account) {
        var safeDiv = $("#setting_safe_div");
        safeDiv.find("input[name='phone']").val(account.phone);
        safeDiv.find("input[name='email']").val(account.email);
        safeDiv.find("input:password").val("");
    },

    initPref: function(accountPreference) {
        var prefDiv = $("#setting_pref_div");
        var courseLanguage = accountPreference.courseLanguage;
        if (courseLanguage == 1 || courseLanguage == 2) { prefDiv.find("input[name='courseLanguage']").eq(courseLanguage - 1).attr("checked", "checked"); } else { prefDiv.find("input[name='courseLanguage']").eq(0).attr("checked", "checked"); }
        var exerciseLanguage = accountPreference.exerciseLanguage;
        if (exerciseLanguage == 1 || exerciseLanguage == 2) { prefDiv.find("input[name='exerciseLanguage']").eq(exerciseLanguage - 1).attr("checked", "checked"); } else { prefDiv.find("input[name='exerciseLanguage']").eq(0).attr("checked", "checked"); }
    },


    /** ==================================== set basic ==================================== **/

    setBasic: function() {
        var basciDiv = $("#setting_basci_div");
        var checkFlag = true;

        // nickName
        var nickNameInput = basciDiv.find("input[name='nickName']");
        var nickNameError = nickNameInput.parents("li.li").find("div.error");
        var nickName = nickNameInput.val();
        var nickNameByteCount = nickName != undefined && nickName != null && nickName != '' ? G.getByteCount(nickName) : 0;
        if (nickNameByteCount <= 0 || nickNameByteCount > 16 || /^[\u0391-\uFFE5A-Za-z0-9]+$/.test(nickName) == false) {
            checkFlag = false;
            nickNameError.show();
        } else {
            nickNameError.hide();
        }

        // name
        var nameInput = basciDiv.find("input[name='name']");
        var nameError = nameInput.parents("li.li").find("div.error");
        var name = nameInput.val();
        var nameByteCount = name != undefined && name != null && name != '' ? G.getByteCount(name) : 0;
        if (nameByteCount < 0 || nameByteCount > 32 || (nameByteCount > 0 && /^[\u0391-\uFFE5A-Za-z\s]+$/.test(name) == false)) {
            checkFlag = false;
            nameError.show();
        } else {
            nameError.hide();
        }

        // alphaLastName & alphaFirstName
        var alphaLastNameInput = basciDiv.find("input[name='alphaLastName']");
        var alphaFirstNameInput = basciDiv.find("input[name='alphaFirstName']");
        var alphaNameError = alphaLastNameInput.parents("li.li").find("div.error");
        var alphaLastName = alphaLastNameInput.val();
        var alphaFirstName = alphaFirstNameInput.val();
        var alphaLastNameByteCount = alphaLastName != undefined && alphaLastName != null && alphaLastName != '' ? G.getByteCount(alphaLastName) : 0;
        var alphaFirstNameByteCount = alphaFirstName != undefined && alphaFirstName != null && alphaFirstName != '' ? G.getByteCount(alphaFirstName) : 0;
        if (alphaLastNameByteCount < 0 || alphaLastNameByteCount > 32 || (alphaLastNameByteCount > 0 && /^[A-Za-z]+$/.test(alphaLastName) == false) || alphaFirstNameByteCount < 0 || alphaFirstNameByteCount > 32 || (alphaFirstNameByteCount > 0 && /^[A-Za-z]+$/.test(alphaFirstName) == false)) {
            checkFlag = false;
            alphaNameError.show();
        } else {
            alphaNameError.hide();
        }

        // gender
        var gender = basciDiv.find("input[name='gender']:checked").val();

        // cityId
        var cityId = G.cache_processor.getSelectedId("setting_city");

        // industryId
        var industryId = G.cache_processor.getSelectedId("setting_industry");

        // company
        var companyInput = basciDiv.find("input[name='company']");
        var companyError = companyInput.parents("li.li").find("div.error");
        var company = companyInput.val();
        var companyByteCount = company != undefined && company != null && company != '' ? G.getByteCount(company) : 0;
        if (companyByteCount < 0 || companyByteCount > 256) {
            checkFlag = false;
            companyError.show();
        } else {
            companyError.hide();
        }

        // position
        var positionInput = basciDiv.find("input[name='position']");
        var positionError = positionInput.parents("li.li").find("div.error");
        var position = positionInput.val();
        var positionByteCount = position != undefined && position != null && position != '' ? G.getByteCount(position) : 0;
        if (positionByteCount < 0 || positionByteCount > 256) {
            checkFlag = false;
            positionError.show();
        } else {
            positionError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'nickName': nickName,
            'name': name,
            'alphaLastName': alphaLastName,
            'alphaFirstName': alphaFirstName,
            'gender': gender,
            'cityId': cityId,
            'industryId': industryId,
            'company': company,
            'position': position
        };
        $.myPost(G.opt.post_url + '/account/on-setting-basic?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // basciDiv.find("div.msg_success").not("div.msg_wrong").show();
                // basciDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg(d.msg);
                // basciDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // basciDiv.find("div.msg_wrong").show();
                // basciDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set password ==================================== **/

    setPassword: function() {
        var safeDiv = $("#setting_safe_div");
        var checkFlag = true;

        // oldPwd
        var oldPwdInput = safeDiv.find("input[name='oldPwd']");
        var oldPwdError = oldPwdInput.parents("li.li").find("div.error");
        var oldPwd = oldPwdInput.val();
        if (G.pwdValid(oldPwd) == false) {
            checkFlag = false;
            oldPwdError.show();
        } else {
            oldPwdError.hide();
        }

        // newPwd1
        var newPwd1Input = safeDiv.find("input[name='newPwd1']");
        var newPwd1Error = newPwd1Input.parents("li.li").find("div.error");
        var newPwd1 = newPwd1Input.val();
        if (G.pwdValid(newPwd1) == false || G.strongpwd_ck(newPwd1) == false) {
            checkFlag = false;
            newPwd1Error.show();
        } else {
            newPwd1Error.hide();
        }

        // newPwd2
        var newPwd2Input = safeDiv.find("input[name='newPwd2']");
        var newPwd2Error = newPwd2Input.parents("li.li").find("div.error");
        var newPwd2 = newPwd2Input.val();
        if (newPwd2 != newPwd1) {
            checkFlag = false;
            newPwd2Error.show();
        } else {
            newPwd2Error.hide();
        }

        // do post
        if (checkFlag == false) {
            return; }
        var postData = {
            'oldPassword': calcMD5(oldPwd),
            'newPassword': newPwd1
        };
        $.myPost(G.opt.post_url + '/account/on-setting-pwd?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                safeDiv.find("input:password").val("");
                layer.msg("操作成功");
                // safeDiv.find("div.msg_success").not("div.msg_wrong").show();
                // safeDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg(d.msg);
                // safeDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // safeDiv.find("div.msg_wrong").show();
                // safeDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set email ==================================== **/

    setEmail: function() {
        var safeDiv = $("#setting_safe_div");
        var safeEmailDiv = $("#setting_safe_email");
        var checkFlag = true;

        // email
        var emailInput = safeEmailDiv.find("input[name='email']");
        var emailError = emailInput.parents("li.li").find("div.error");
        var email = emailInput.val();
        var emailValid = G.emailValid(email);
        if (emailValid == false) {
            checkFlag = false;
            emailError.show();
        } else {
            emailError.hide();
        }

        // password
        var passwordInput = safeEmailDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        if (G.pwdValid(password) == false) {
            checkFlag = false;
            passwordError.show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'newEmail': email,
            'password': calcMD5(password)
        };
        $.myPost(G.opt.post_url + '/account/on-setting-email?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
            	layer.msg(d.msg);
                safeDiv.find("input[name='email']").val(email);
                safeEmailDiv.hide();
            } else {
                alert(d.msg);
            }
        });
    },


    /** ==================================== set phone ==================================== **/

    /**
     * get image code
     */
    getImgCode: function() {
        var _img = $("#setting_safe_phone").find("img[name='imgCodeOper']");
        _img.attr('src', G.opt.post_url + "/checkCode/getImgCode?time=" + new Date().getTime());
    },

    /**
     * send sms code
     */
    sendSmsCodeOpt: {
        canSend: true,
        intervalObj: null,
        currentSecond: 60,
    },
    sendSmsCodeInterFunc: function() {
        var safePhoneDiv = $("#setting_safe_phone");
        var _input = safePhoneDiv.find("input[name='smsCode']");
        var _oper = _input.parents("li.li").find("span[name='smsCodeOper']");
        var _opt = G.setting.sendSmsCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.removeAttr("disabled"); //启用按钮
            _oper.text("重新发送");            
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送(" + _opt.currentSecond + "s)");
            register.setBtnColor(_oper, 0);
        }
    },
    sendSmsCode: function() {
        if (G.setting.sendSmsCodeOpt.canSend != true) {
            return; }
        var safePhoneDiv = $("#setting_safe_phone");
        var checkFlag = true;
        // phone
        var phoneInput = safePhoneDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }
        // imgCode
        var imgCodeInput = safePhoneDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }
        // smsCode
        var smsCodeInput = safePhoneDiv.find("input[name='smsCode']");
        var smsCodeOper = smsCodeInput.parents("li.li").find("span[name='smsCodeOper']");
        // do post
        if (checkFlag == false) {
            return; }
        G.setting.sendSmsCodeOpt.canSend = false;
        smsCodeOper.attr("disabled", "disabled"); //停用按钮
        var postData = { 'phone': phone };
        $.myPost(G.opt.post_url + '/checkCode/sendSmsForSetPhone?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                G.setting.sendSmsCodeOpt.intervalObj = window.setInterval(G.setting.sendSmsCodeInterFunc, 1000); //启动计时器，1秒执行一次 
            } else {
                G.setting.sendSmsCodeOpt.canSend = true;
                smsCodeOper.attr("disabled", null); //启用按钮
                smsCodeOper.text("发送失败，重新发送");
            }
        });
    },

    /**
     * set phone
     */
    setPhone: function() {
        var safeDiv = $("#setting_safe_div");
        var safePhoneDiv = $("#setting_safe_phone");
        var checkFlag = true;

        // phone
        var phoneInput = safePhoneDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }

        // imgCode
        var imgCodeInput = safePhoneDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }

        // smsCode
        var smsCodeInput = safePhoneDiv.find("input[name='smsCode']");
        var smsCodeError = smsCodeInput.parents("li.li").find("div.error");
        var smsCode = smsCodeInput.val();
        if (smsCode == null || smsCode.length != 4) {
            checkFlag = false;
            smsCodeError.show();
        } else {
            smsCodeError.hide();
        }

        // password
        var passwordInput = safePhoneDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        if (G.pwdValid(password) == false) {
            checkFlag = false;
            passwordError.show();
        } else {
            passwordError.hide();
        }
        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'newPhone': phone,
            'imgCode': imgCode,
            'smsCode': smsCode,
            'password': calcMD5(password)
        };
        $.myPost(G.opt.post_url + '/account/on-setting-phone?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
            	layer.msg(d.msg);
                safeDiv.find("input[name='phone']").val(phone);
                safePhoneDiv.hide();
            } else {
                alert(d.msg);
            }
        });
    },


    /** ==================================== set preference ==================================== **/


    /**
     * set preference: course language
     */
    setPrefCourseLanguage: function() {
        var prefDiv = $("#setting_pref_div");
        // courseLanguage
        var courseLanguage = prefDiv.find("input[name='courseLanguage']:checked").val();
        // doPost
        var postData = { 'courseLanguage': courseLanguage };
        $.myPost(G.opt.post_url + '/account/on-setting-pref-cl?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg("操作失败，请重试");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // prefDiv.find("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },

    /**
     * set preference: exercise language
     */
    setPrefExerciseLanguage: function() {
        var prefDiv = $("#setting_pref_div");
        var prefDiv = $("#setting_pref_div");
        // exerciseLanguage
        var exerciseLanguage = prefDiv.find("input[name='exerciseLanguage']:checked").val();
        // doPost
        var postData = { 'exerciseLanguage': exerciseLanguage };
        $.myPost(G.opt.post_url + '/account/on-setting-pref-el?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg("操作失败，请重试");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // prefDiv.find("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set photo ==================================== **/

    setPhoto: function() {
        var photoDiv = $("#setting_photo_div");
        $.ajaxFileUpload({
            url: G.opt.post_url + '/account/on-setting-photo?random=' + Math.random(), //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'setting_photo_input', //文件上传域的ID
            dataType: 'json',
            success: function(d, status) {
                if (d.flag == 0) {
                    // photoDiv.find("div.msg_success").not("div.msg_wrong").show();
                    // photoDiv.find("div.msg_wrong").hide();
                    photoDiv.find("img").attr("src", d.data);

                    layer.msg("操作成功");
                } else {
                    layer.msg("操作失败，请重试");
                    // photoDiv.find("div.msg_success").not("div.msg_wrong").hide();
                    // photoDiv.find("div.msg_wrong").show();
                    // photoDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
                }
            },
            error: function(d, status, e) {
                layer.msg("操作失败，请重试");
                // photoDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // photoDiv.find("div.msg_wrong").show();
                // photoDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>系统异常");
            }
        });
    },

});
$.extend(G, {
    setting: setting
});
