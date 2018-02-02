<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/loginReg-top.jsp"></jsp:include>       
            <div class="login_reg login" style="">
                <div id="login_div" class="main">
                    <p class="tit">
                        <label>登录账号</label>
                        <span class="fr">还没有账号
                            <a href="${basePath}/register-phone" class="c_blue tologin">立即注册</a>
                        </span>
                    </p>
                    <ul class="ul">
                        <li class="li">
                            <div class="ipt_box ipt_long nick_name">
                                <i class="ico"></i>
                                <input name="loginName" type="text" class="" placeholder="请输入手机号/邮箱" />
                            </div>
                            <div class="error"><i class="ico"></i>手机或邮箱格式不正确</div>
                        </li>
                        <li class="li">
                            <div class="ipt_box ipt_long pwd">
                                <i class="ico"></i>
                                <input name="loginPass" type="password" class="" placeholder="请输入密码" />
                            </div>
                            <div class="error"><i class="ico"></i>密码长度6~16位</div>
                        </li>
                    </ul>
                    <div class="more_info">
                        <label><i name="remmber" class="ico checked"></i>下次自动登录</label>
                        <div class="fr">
                            <a href="${basePath}/look-for-pwd" target="_self" class="c_blue">忘记密码？</a>
                        </div>
                    </div>
                    <div class="operate">
                        <span class="btn" onclick="javascript:G.login.doLogin();">登录</span>
                    </div>
                </div>
            </div>
        </div>
            <script type="text/javascript">
                $(function() {
                    // checkbox
                    $("#login_div .more_info label").click(function() {
                        var _t = $(this).find('.ico');
                        if (_t.hasClass("checked") == true) {
                            _t.removeClass("checked");
                        } else {
                            _t.addClass("checked");
                        }
                    });
                    // input enter to submit
                    $("#login_div input").on('keydown', function(e) {
                        var e = e || event;
                        var key = e.keyCode || e.which || e.charCode;
                        if (key == 13) {
                            G.login.doLogin();
                        }
                    });
                });
            </script>
            <jsp:include page="include/footer-unit.jsp"></jsp:include>
