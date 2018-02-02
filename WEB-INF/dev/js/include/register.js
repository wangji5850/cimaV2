$.extend(register, {
    checkUser: function() {
        var phone = $('#register_phone_div .nick_name input').val();
        if(!G.phoneValid(phone)){
         register.setBtnColor($(".login_reg .get_phone_code"), 0);
     }else{
        $.post(G.opt.post_url + '/checkPhoneUnique?random=' + Math.random(), {
                phone: phone
            }, function(d) {
                if (d.flag == -1) {
                    if (d.msg != '') {
                        layer.msg(d.msg);
                         G.register.sendSmsCodeOpt.canSend = false;
                    }
                    register.setBtnColor($(".login_reg .get_phone_code"), 0);
                } else {
                    register.setBtnColor($(".login_reg .get_phone_code"), 1);
                    G.register.sendSmsCodeOpt.canSend = true;
                }
            });
     }
        
    },
    /** ==================================== do register by email ==================================== **/

    doRegisterByEmail: function() {
        var registerDiv = $("#register_email_div");
        var checkFlag = true;
        // email
        var emailInput = registerDiv.find("input[name='email']");
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
        var passwordInput = registerDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        var pwdValid = G.pwdValid(password) && G.strongpwd_ck(password);
        if (pwdValid == false) {
            checkFlag = false;
            passwordError.html('<i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。').show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'phoneOrEmail': email,
            'password': password
        };
        $.post(G.opt.post_url + '/register?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                window.location.href = G.opt.post_url + d.data;
            } else {
                // alert(d.msg);
                layer.msg(d.msg);
            }
        });
    },


    /** ==================================== do register by phone ==================================== **/

    doRegisterByPhone: function() {
        var registerDiv = $("#register_phone_div");
        var checkFlag = true;

        // phone
        var phoneInput = registerDiv.find("input[name='phone']");
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
        var imgCodeInput = registerDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }

        // smsCode
        var smsCodeInput = registerDiv.find("input[name='smsCode']");
        var smsCodeError = smsCodeInput.parents("li.li").find("div.error");
        var smsCode = smsCodeInput.val();
        if (smsCode == null) {
            checkFlag = false;
            smsCodeError.show();
        } else {
            smsCodeError.hide();
        }

        // password
        var passwordInput = registerDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        var pwdValid = G.pwdValid(password) && G.strongpwd_ck(password);
        if (pwdValid == false) {
            checkFlag = false;
            passwordError.html('<i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。').show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'phoneOrEmail': phone,
            'imgCode': imgCode,
            'smsCode': smsCode,
            'password': password
        };
        $.post(G.opt.post_url + '/register?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                window.location.href = G.opt.post_url;
            } else {
                // alert(d.msg);
                layer.msg(d.msg);
            }
        });
    },

    /**
     * get image code
     */
    getImgCode: function() {
        var _img = $("#register_phone_div").find("img[name='imgCodeOper']");
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
        var registerDiv = $("#register_phone_div");
        var _input = registerDiv.find("input[name='smsCode']");
        var _oper = _input.parents("li.li").find("span[name='smsCodeOper']");
        var _opt = G.register.sendSmsCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.removeAttr("disabled")
                .text("重新发送");
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送(" + _opt.currentSecond + "s)");
            register.setBtnColor(_oper, 0);
        }
    },
    setBtnColor: function(o, flag) {
        if (flag) {
            o.css({ 'backgroundColor': '#3CBFB1', 'color': '#fff' })
        } else {
            o.css({ 'backgroundColor': '#E9E9E9', 'color': '#666' })
        }
    },
    sendSmsCode: function() {
        if (G.register.sendSmsCodeOpt.canSend != true) {
            return; }
        var registerDiv = $("#register_phone_div");
        var checkFlag = true;
        // phone
        var phoneInput = registerDiv.find("input[name='phone']");
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
        var imgCodeInput = registerDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }
        // smsCode
        var smsCodeInput = registerDiv.find("input[name='smsCode']");
        var smsCodeOper = smsCodeInput.parents("li.li").find("span[name='smsCodeOper']");
        // do post
        if (checkFlag == false) {
            return; }
        G.register.sendSmsCodeOpt.canSend = false;
        smsCodeOper.attr("disabled", "disabled"); //停用按钮
        var postData = { 'phone': phone };
        $.post(G.opt.post_url + '/checkCode/sendSmsForRegister?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                G.register.sendSmsCodeOpt.intervalObj = window.setInterval(G.register.sendSmsCodeInterFunc, 1000); //启动计时器，1秒执行一次 
            } 
            else {
                G.register.sendSmsCodeOpt.canSend = true;
                smsCodeOper.attr("disabled", null); //启用按钮
                smsCodeOper.text("发送失败，重新发送");
            }
        });
    },


});
$.extend(G, {
    register: register
});
