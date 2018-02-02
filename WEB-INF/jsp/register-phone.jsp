<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/loginReg-top.jsp"></jsp:include>
            <div class="login_reg register">
                <div id="register_phone_div" class="main">
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
                                <input name="phone" type="text" class="" placeholder="请输入手机号" onblur="register.checkUser()" />
                            </div>
                            <div class="more_info fl">或
                                <a href="${basePath}/register-email" class="c_blue toreg">点击这里用邮箱注册</a>
                            </div>
                            <div class="fr error" style="margin-top:4px;"><i class="ico"></i>手机号码格式不正确</div>
                        </li>
                        <li class="li">
                            <div class="clearfix">
                                <div class="ipt_box ipt_short check_code">
                                    <i class="ico"></i>
                                    <input name="imgCode" type="text" class="" placeholder="请输入验证码" />
                                </div>
                                <div class="fr codepic">
                                    <img name="imgCodeOper" src="${basePath}/checkCode/getImgCode" onclick="javascript:G.register.getImgCode();" title="点击获取" alt="点击获取" />
                                    <span class="c_blue change" onclick="javascript:G.register.getImgCode();">换一张</span>
                                </div>
                            </div>
                            <div class="error"><i class="ico"></i>请输入4位验证码</div>
                        </li>
                        <li class="li">
                            <div class="clearfix">
                                <div class="ipt_box ipt_short sms_code">
                                    <i class="ico"></i>
                                    <input name="smsCode" type="text" class="" placeholder="请输入短信验证码" />
                                </div>
                                <span name="smsCodeOper" class="fr dis_ib get_phone_code" onclick="javascript:G.register.sendSmsCode();">点击获取短信验证码</span>
                            </div>
                            <div class="error"><i class="ico"></i>请输入短信验证码</div>
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
                        <span class="btn" onclick="javascript:G.register.doRegisterByPhone();">立即注册</span>
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
                $("#register_phone_div input").on('keydown', function(e) {
                    var e = e || event;
                    var key = e.keyCode || e.which || e.charCode;
                    if (key == 13) {
                        G.register.doRegisterByPhone();
                    }
                });
            });
        </script>
        <jsp:include page="include/footer-unit.jsp"></jsp:include>
