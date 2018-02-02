<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
	<style type="text/css">
		/*S 登录页*/
		html, body, h1, h2, h3, h4, p, ul, ol, li, form, input, textarea, section {
	margin: 0;
	padding: 0;
}body {
	background-color: #fff;
	font-size: 14px;
	color: #333333;
	font-family: Arial,"Microsoft YaHei";
	line-height: 20px;
}
i {
	font-style: normal;
}
input {
	border: none;
	outline: none;
}
img {
	border: 0;
	display: inline-block;
	margin: 0;
	padding-bottom: 10px;
	
}
img:first-child{
	position: relative;
	left: 3px;
}

		li{list-style:none outside;}
		.body {background: url("${basePath}/images/sys_bg.jpg") no-repeat  center center; height: 100%; min-height: 520px; width: 100%; } 
		.login_reg.login{height: 437px; left: 50%; position: fixed; width: 340px; margin: -250px 0 0 -200px; top: 50%; z-index: 5;background: none;
    box-shadow: none; }
		.login_reg .logo{text-align: center;width: auto;}
		.login_div{background-color: #44abdf; padding: 60px 22px; border-radius: 6px;position: relative; top: 65px;} 
		.login_div .li{height: 80px;}
		.login_reg .header{width: 340px;margin-bottom: 20px;}
		.login_reg .tit{margin: 0 auto;position: relative;}
		.login_reg .line{width: 340px;border-bottom: 1px #82BEE2 solid}
		.login_reg h2{color: #fff;font-size: 24px;position: absolute;background: url("${basePath}/images/sys_bg.jpg") repeat scroll center 224px;width: 260px;left: 40px;top: -10px;text-align: center;}
		.login_reg .ipt_long input[type="text"], .login_reg .ipt_long input[type="password"]{width: 260px;}
		.login_reg .ipt_box{font-size: 14px; height: 42px; width: 296px;background-color: #fff}
		.login_reg .ipt_box input{height: 30px;line-height: 30px;padding: 6px 0;float: left;color: #333333;position: relative;top: 3px;}
		.login_reg .ipt_box input::-webkit-input-placeholder { /* WebKit browsers */
			color: #b8c4ce
		}
		.login_reg .ipt_box input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			color: #b8c4ce
		}
		.login_reg .ipt_box input::-moz-placeholder { /* Mozilla Firefox 19+ */
			color: #b8c4ce
		}
		.login_reg .ipt_box input:-ms-input-placeholder { /* Internet Explorer 10+ */
			color: #b8c4ce
		}

		.ico {display: inline-block; height: 20px; line-height: 15px; margin-right: 3px; vertical-align: middle; width: 15px; }
		.login_reg .ipt_box .ico{margin: 16px 10px;vertical-align: middle;}
		.login_reg .nick_name .ico{background: url(${basePath}/images/icos/user.png) no-repeat; float: left;}
		.login_reg .pwd .ico{background: url(${basePath}/images/icos/lock.png) no-repeat; float: left;}
		.error .ico{background: url(${basePath}/images/icos/no_active.png) no-repeat center center;}
		.login .operate{height: 52px;}
		.operate .btn {
	display: inline-block;
	color: #333333;
	cursor: pointer;
	text-align: center;
	vertical-align: middle;
	font-size: 15px;
	border: 1px #1fa0e3 solid;
	border-radius: 3px;
}
		.login_reg .operate .btn{border: 0 none;border-radius: 6px;background-color: #ffd84f;height: 41px;line-height: 41px;width: 100%;margin-top: 11px;}
		.login_reg .operate .btn:hover{background-color: #f3c936;}
		.login_msgbox{margin: -155px 0 0 -200px;border-radius: 0;width: 400px;height: 390px;border: 1px #f0f0f0 solid}
		.login_box{}
		.login_text{font-size: 16px;color: #333;padding-top: 22px;text-align: center;}
		.login-button{margin: 0 36px;position: absolute;bottom: 18px;}
		.login_box .btn_b{width: 328px;height: 40px;line-height: 40px;text-align: center;display: block;cursor: pointer;}
		.login_box .btn_b:hover{background-color: #0f8fd0;}
		.login_box .ul-choice{width: 358px;height: 260px;background-color: #f6f6f6;margin: 12px auto 0;border-radius: 6px;padding-top: 1px;}
		.ul-choice li{margin-top:20px;height:40px;line-height: 40px;cursor: pointer;}
		.ul-choice p{border: 1px #b0b0b0 solid;display: inline-block;width: 276px;background-color: #fff;float: right;margin-right: 20px;padding: 0 10px;}
		.ul-choice .curr p{border: 1px #1fa0e3 solid;}
		.ul-choice li span{font-family:Arial;font-size:14px;float:left;}
		.ul-choice li em{font-style: normal;font-size:14px;color:#999;float:right;}
		.ul-choice .circle{background: url(${basePath}/images/icos/circle.png) no-repeat center center;border-radius: 50px;height: 40px;width: 20px;margin-left: 10px;}
		.ul-choice .curr .circle{background: url(${basePath}/images/icos/circle_checked.png) no-repeat center center;}

		/*E 登录页*/
	</style>


<body class="body">
	<div class="login_reg login">
		<div class="header">
			<div class="logo">
			<img src="${basePath}/images/t_login.png"></br>
			<img src="${basePath}/images/system_logo.png">
			</div>
		</div>
		<input type="hidden" id="uuId" name="uuId" value="${uuId}">
		<input type="hidden" id="pass" name="pass" value="${pass}">
		<div class="login_div">
			<ul class="ul">
				<li class="li">
					<div class="ipt_box ipt_long nick_name">
						<i class="ico"></i>
						<input type="text" placeholder="Log-in" title="Log-in" class="" name="loginName" id="loginName">
					</div>
					<div id="loginNameError" class="error" style="display: none;"><i class="ico"></i>手机或邮箱格式不正确</div>
				</li>
				<li class="li">
					<div class="ipt_box ipt_long pwd">
					<i class="ico"></i>
					<input type="password" placeholder="Password" title="Password" class="" name="loginPass" id="loginPass">
					</div>
					<div id="loginPassError" class="error" style="display: none;"><i class="ico"></i>密码长度6~16位</div>
				</li>
			</ul>
			<div class="operate">
                <span onclick="javascript:teacherLogin();" class="btn">Log in</span>
            </div>
		</div>
	</div>

    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/md5.min.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#loginName").on('keydown', function(e) {
	             var e = e || event;
	             var key = e.keyCode || e.which || e.charCode;
	             if (key == 13) {teacherLogin();}
	         });
			$("#loginPass").on('keydown', function(e) {
	             var e = e || event;
	             var key = e.keyCode || e.which || e.charCode;
	             if (key == 13) {teacherLogin();}
	         });
		});
		//phone
		function checkPhoneValid(s){
	        return /^([0-9]{11})$/.test(s);
	    }
		//email
		function checkEmailValid(s){
        	return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s);
	    }
	    //pwd
		function checkPwdValid(s){
	        return s.replace(/(^\s*)|(\s*$)/g, "") != "" && s.length >= 6 && s.length <= 16;
	    }
		//login
		function teacherLogin(){
			var checkFlag = true;
			// loginName
			var loginNameError = $('#loginNameError');
			var loginName = $.trim($('#loginName').val());
			var phoneValid = checkPhoneValid(loginName);
			var emailValid = checkEmailValid(loginName);
			if(phoneValid==false&&emailValid==false){
				checkFlag = false;
				loginNameError.show();
			}else{
				loginNameError.hide();
			}
			
			// loginPass
			var loginPassError = $('#loginPassError');
			var loginPass = $.trim($('#loginPass').val());
			var pwdValid = checkPwdValid(loginPass);
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
					'remember': 1,
					'teacherScorePass':'${pass}'

			};
			//
			$.post('${basePath}/login?random='+Math.random(), postData, function(d){
				if(d.flag==0){
					window.location.href='${basePath}/score-list?uuId=${uuId}';
				}else{
					// alert(d.msg);
					loginPassError.html('<i class="ico"></i>'+ d.msg).show();
				}
	        });
		}
	</script>
</body>
</html>