$.extend(look_for_pwd, {
	
	phoneOrEmailOpt: {
		exist: false
	},
	
	
	/**
	 * check phoneOrEmail (in server)
	 */
	checkPhoneOrEmailStrong: function(){
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if(G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false){
			checkFlag = false;
			phoneOrEmailError.show();
            register.setBtnColor($(".login_reg .get_phone_code"), 0);
		}else{
			phoneOrEmailError.hide();
            register.setBtnColor($(".login_reg .get_phone_code"), 1);
		}
		// do post
		if(checkFlag==false){return;}
		var postData = {'phoneOrEmail': phoneOrEmail};
		$.post(G.opt.post_url + '/account/on-look-for-pwd-chke?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				G.look_for_pwd.phoneOrEmailOpt.exist=true;
            	register.setBtnColor($(".login_reg .get_phone_code"), 1);
			}else{
				G.look_for_pwd.phoneOrEmailOpt.exist=false;
				phoneOrEmailError.show();
            	register.setBtnColor($(".login_reg .get_phone_code"), 0);
			}
        });
	},
	
	
	/**
	 * send check code
	 */
	sendCheckCodeOpt: {
    	canSend: true,
        intervalObj: null,
        currentSecond: 60,
    },
    sendCheckCodeInterFunc: function(){
    	var lookForPwdDiv = $("#look_for_pwd_div");
    	var _input = lookForPwdDiv.find("input[name='checkCode']");
    	var _oper = _input.parents("li.li").find("span[name='checkCodeOper']");
    	var _opt = G.look_for_pwd.sendCheckCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.attr("disabled",null); //启用按钮
            _oper.text("重新发送"); 
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送("+_opt.currentSecond+"s)");
            register.setBtnColor(_oper, 0);
        }
    },
	sendCheckCode: function(){
		if(G.look_for_pwd.sendCheckCodeOpt.canSend!=true){return;}
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if(G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false){
			checkFlag = false;
			phoneOrEmailError.show();
		}else{
			phoneOrEmailError.hide();
		}
		// checkCode
		var checkCodeInput = lookForPwdDiv.find("input[name='checkCode']");
		var checkCodeOper = checkCodeInput.parents("li.li").find("span[name='checkCodeOper']");
		// do post
		if(checkFlag==false){return;}
		G.look_for_pwd.sendCheckCodeOpt.canSend = false;
		checkCodeOper.attr("disabled","disabled"); //停用按钮
		var postData = {'phoneOrEmail': phoneOrEmail};
		$.post(G.opt.post_url + '/checkCode/sendForLookForPwd?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				G.look_for_pwd.sendCheckCodeOpt.intervalObj = window.setInterval(G.look_for_pwd.sendCheckCodeInterFunc, 1000); //启动计时器，1秒执行一次 
			}else{
				G.look_for_pwd.sendCheckCodeOpt.canSend = true;
				checkCodeOper.attr("disabled",null); //启用按钮
				checkCodeOper.text("发送失败，重新发送"); 
			}
        });
	},
	
	/**
	 * do reset pwd
	 */
	doResetPwd: function(){
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if((G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false)||G.look_for_pwd.phoneOrEmailOpt.exist==false){
			checkFlag = false;
			phoneOrEmailError.show();
		}else{
			phoneOrEmailError.hide();
		}
		// checkCode
		var checkCodeInput = lookForPwdDiv.find("input[name='checkCode']");
		var checkCodeError = checkCodeInput.parents("li.li").find("div.error");
		var checkCode = checkCodeInput.val();
		if(checkCode==null||checkCode.length!=4){
			checkFlag = false;
			checkCodeError.show();
		}else{
			checkCodeError.hide();
		}
		// newPassword
		var newPasswordInput = lookForPwdDiv.find("input[name='newPassword']");
		var newPasswordError = newPasswordInput.parents("li.li").find("div.error");
		var newPassword = newPasswordInput.val();
		var pwdValid = G.pwdValid(newPassword) && G.strongpwd_ck(newPassword);
		if(pwdValid==false){
			checkFlag = false;
			newPasswordError.show();
		}else{
			newPasswordError.hide();
		}
		// do post
		if(checkFlag==false){return;}
		var postData = {
				'phoneOrEmail': phoneOrEmail,
				'checkCode': checkCode,
				'newPassword': newPassword
		};
		$.post(G.opt.post_url + '/account/on-look-for-pwd?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				window.location.href = G.opt.post_url+"/login";
			}else{
				alert(d.msg);
			}
        });
	},
	
	
	/**
	 * cancel
	 */
	cancel: function(){
		window.location.href = G.opt.post_url;
	},
	
	
});
$.extend(G, {
	look_for_pwd: look_for_pwd
});