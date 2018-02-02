$.extend(login, {

	doLogin: function(){
		
		var loginDiv = $("#login_div");
		var checkFlag = true;
		
		// loginName
		var loginNameInput = loginDiv.find("input[name='loginName']");
		var loginNameError = loginNameInput.parent("div").next(".error");
		var loginName = loginNameInput.val();
		var phoneValid = G.phoneValid(loginName);
		var emailValid = G.emailValid(loginName);
		if(phoneValid==false&&emailValid==false){
			checkFlag = false;
			loginNameError.show();
		}else{
			loginNameError.hide();
		}
		
		// loginPass
		var loginPassInput = loginDiv.find("input[name='loginPass']");
		var loginPassError = loginPassInput.parent("div").next(".error");
		var loginPass = loginPassInput.val();
		var pwdValid = G.pwdValid(loginPass);
		if(pwdValid==false){
			checkFlag = false;
			loginPassError.html('<i class="ico"></i>密码长度6~16位').show();
		}else{
			loginPassError.hide();
		}
		
		// doPost
		if(checkFlag==false){return;}
		var postData = {
				'loginName': loginName,
				'loginPass': calcMD5(loginPass).toLowerCase(),
				'remember': $("#login_div i.ico").hasClass("checked")
		};
		$.post(G.opt.post_url + '/login?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				// window.location.href = G.opt.post_url + d.data;
				var str = document.referrer;
				window.location.href = (str && str != window.location.href && str.indexOf('register') == -1 && str.indexOf('look-for-pwd') == -1 ) ? str : G.opt.post_url;
			}else{
				// alert(d.msg);
				loginPassError.html('<i class="ico"></i>'+ d.msg).show();
			}
        });
	},


	logout: function(){
		$.post(G.opt.post_url + '/logout?random='+Math.random(), {}, function(d){
			window.location.href = G.opt.post_url;
        });
	}
	
});
$.extend(G, {
    login: login
});
