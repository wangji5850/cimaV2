<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/loginReg-top.jsp"></jsp:include>
            <div class="login_reg register register_yx">
                <div id="register_email_div" class="main">
                    <p class="tit">
                        <label>注册账号</label>
                        <span class="fr">已有铂略账号
                            <a href="${basePath}/login" class="c_blue tologin">立即登录</a>
                        </span>
                    </p>
                    <ul class="ul">
                        <li class="li">
                            <div class="ipt_box ipt_long nick_name">
                                <i class="ico"></i>
                                <input name="email" type="text" class="" placeholder="请输入邮箱" />
                            </div>
                            <div class="more_info fl">或
                                <a href="${basePath}/register-phone" class="c_blue toreg">点击这里用手机注册</a>
                            </div>
                            <div class="fr error" style="margin-top:4px;"><i class="ico"></i>邮箱格式不正确</div>
                        </li>
                        <li class="li">
                            <div class="ipt_box ipt_long pwd">
                                <i class="ico"></i>
                                <input name="password" type="password" class="" placeholder="请输入密码" />
                            </div>
                            <div class="error sp"><i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。</div>
                        </li>
                    </ul>
                    <div class="operate">
                        <span class="btn" onclick="javascript:G.register.doRegisterByEmail();">立即注册</span>
                    </div>
                    <div class="more_info agregister">
                        <i class="ico checked"></i> 我已经认真阅读并同意
                        <a href="//www.bolue.cn/about/service-protocol?pageType=2" target="_blank" class="c_blue">《服务协议》</a>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            $(function() {
                // input enter to submit
                $("#register_email_div input").on('keydown', function(e) {
                    var e = e || event;
                    var key = e.keyCode || e.which || e.charCode;
                    if (key == 13) {
                        G.register.doRegisterByEmail();
                    }
                });
            });
        </script>
        <jsp:include page="include/footer-unit.jsp"></jsp:include>
