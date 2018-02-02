<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/loginReg-top.jsp"></jsp:include>
            <div class="login_reg get_pwd">
                <div id="look_for_pwd_div" class="main">
                    <p class="tit">
                        <label>找回密码</label>
                    </p>
                    <ul class="ul">
                        <li class="li">
                            <div class="ipt_box ipt_long nick_name">
                                <i class="ico"></i>
                                <input name="phoneOrEmail" type="text" class="" placeholder="请输入手机号或邮箱" onblur="javascript:G.look_for_pwd.checkPhoneOrEmailStrong();" />
                            </div>
                            <div class="error"><i class="ico"></i>账号不合法，不存在或未激活</div>
                        </li>
                        <li class="li">
                            <div class="clearfix">
                                <div class="ipt_box ipt_short check_code">
                                    <i class="ico"></i>
                                    <input name="checkCode" type="text" class="" placeholder="请输入验证码" />
                                </div>
                                <span name="checkCodeOper" class="fr dis_ib get_phone_code" onclick="javascript:G.look_for_pwd.sendCheckCode();">点击获取验证码</span>
                            </div>
                            <div class="error"><i class="ico"></i>请输入4位验证码</div>
                        </li>
                        <li class="li">
                            <div class="ipt_box ipt_long pwd">
                                <i class="ico"></i>
                                <input name="newPassword" type="password" class="" placeholder="请输入新密码" />
                            </div>
                            <div class="error sp"><i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。</div>
                        </li>
                    </ul>
                    <div class="operate">
                        <span class="btn" onclick="javascript:G.look_for_pwd.doResetPwd();">确定</span>
                        <span class="btn btn_qx" onclick="javascript:G.look_for_pwd.cancel();">取消</span>
                    </div>
                </div>
            </div>
            <jsp:include page="include/footer-unit.jsp"></jsp:include>
