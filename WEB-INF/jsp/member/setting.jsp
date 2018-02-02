<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/top.jsp"></jsp:include>
        <div class="web_main left_right p_setting">
            <div class="clearfix content mainw">
                <ul class="left_menu">
                    <li class="curr">基本资料</li>
                    <li>头像设置</li>
                    <li>账号安全</li>
                    <li>偏好设置</li>
                </ul>
                <div class="right_content">
                    <!-- setting basic -->
                    <div id="setting_basci_div" class="relatv inner u_info">
                        <div class="abs msg_success"><i class="ico"></i>保存成功</div>
                        <div class="abs msg_success msg_wrong"><i class="ico"></i>保存失败</div>
                        <h3 class="item_tit">编辑个人信息</h3>
                        <ul class="set_list">
                            <li class="li">
                                <label>昵 称：<i></i></label>
                                <input name=nickName class="ipt_long" type="text" placeholder="请输入您的昵称" />
                                <div class="error"><i class="ico"></i>请输入最多为8个汉字或16个英文字符组成的昵称</div>
                            </li>
                            <li class="li">
                                <label>姓 名：<i></i></label>
                                <input name="name" class="ipt_long" type="text" placeholder="请输入您的姓名 例如：张三" />
                                <div class="error"><i class="ico"></i>请输入最多为16个汉字或32个英文字符组成的姓名</div>
                            </li>
                            <li class="clearfix li">
                                <label>拼 音：<i></i></label>
                                <input name="alphaLastName" class="mr70 ipt_long ipt_short" type="text" placeholder="姓，例如：zhang" />
                                <input name="alphaFirstName" class="ipt_long ipt_short" type="text" placeholder="名，例如：san" />
                                <div class="error"><i class="ico"></i>请输入最多32位的姓和最多32位的名的拼音</div>
                            </li>
                            <li class="clearfix li">
                                <label>性 别：<i></i></label>
                                <label class="choose">保密
                                    <input type="radio" name="gender" checked value="0" />
                                </label>
                                <label class="choose">男
                                    <input type="radio" name="gender" value="1" />
                                </label>
                                <label class="choose">女
                                    <input type="radio" name="gender" value="2" />
                                </label>
                                <div class="error"><i class="ico"></i>3</div>
                            </li>
                            <li class="clearfix li">
                                <label>地 区：<i></i></label>
                                <div id="setting_province" class="mr70 select_sp sel_short">
                                    <span class="cur-select">请选择省份</span>
                                    <div class="select"></div>
                                </div>
                                <div id="setting_city" class="select_sp sel_short">
                                    <span class="cur-select">请选择城市</span>
                                    <div class="select"></div>
                                </div>
                                <div class="error"><i class="ico"></i></div>
                            </li>
                            <li class="clearfix li">
                                <label>行 业：<i></i></label>
                                <div id="setting_industry" class="fl select_sp">
                                    <span class="cur-select">请选择行业</span>
                                    <div class="select"></div>
                                </div>
                                <div class="error"><i class="ico"></i></div>
                            </li>
                            <li class="li">
                                <label>公 司：<i></i></label>
                                <input name="company" class="ipt_long" type="text" placeholder="请输入公司名称" />
                                <div class="error"><i class="ico"></i>请输入公司名称</div>
                            </li>
                            <li class="clearfix li">
                                <label>职 位：<i></i></label>
                                <input name="position" class="ipt_long" type="text" placeholder="请输入职位" />
                                <div class="error"><i class="ico"></i>请输入职位</div>
                            </li>
                        </ul>
                        <p class="submit_data">
                            <span class="btn_opera" onclick="javascript:G.setting.setBasic();">保存</span>
                        </p>
                    </div>
                    <!-- setting photo -->
                    <div id="setting_photo_div" class="inner hide u_photo">
                        <h3 class="item_tit">头像设置</h3>
                        <div class="relatv big_ph">仅支持5M以内的jpg、png和gif格式的图片</div>
                        <img class="mid260 mr70" src="${basePath}/images/icos/photo96.jpg" alt="" />
                        <img class="mid160 mr70 bordr" src="${basePath}/images/icos/photo96.jpg" alt="" />
                        <img class="mid100 mr70 bordr" src="${basePath}/images/icos/photo96.jpg" alt="" />
                        <img class="small50 bordr" src="${basePath}/images/icos/photo96.jpg" alt="" />
                        <div class="relatv clearfix big_ph">
                            <div class="abs msg_success"><i class="ico"></i>头像修改成功</div>
                            <input id="setting_photo_input" name="imageFile" class="hide" type="file" onchange="javascript:G.setting.setPhoto();" accept="image/png,image/jpeg" />
                            <span class="btn_opera btn3" onclick="javascript:$('#setting_photo_input').click();">上传头像</span>
                        </div>
                    </div>
                    <!-- setting safe -->
                    <div id="setting_safe_div" class="relatv inner hide account">
                        <div class="abs msg_success"><i class="ico"></i>保存成功</div>
                        <div class="abs msg_success msg_wrong"><i class="ico"></i>保存失败</div>
                        <h3 class="item_tit">账号安全</h3>
                        <ul class="set_list">
                            <li class="li">
                                <label>手 机：<i></i></label>
                                <input name="phone" class="ipt_long sp" type="text" placeholder="手机号码" value="" disabled="disabled" />
                                <span class="btn_operas" id="changePhone">修改手机</span>
                            </li>
                            <li class="li">
                                <label>邮 箱：<i></i></label>
                                <input name="email" class="ipt_long sp" type="text" placeholder="电子邮箱" value="" disabled="disabled" //>
                                <span  class="btn_operas" id='changeEmail'>修改邮箱</span>
                            </li>
                        </ul>
                        <div class="mt40"></div>
                        <h3 class="item_tit">密码修改</h3>
                        <ul class="set_list">
                            <li class="li">
                                <label>原 密 码：</label>
                                <input name="oldPwd" class="ipt_long" type="password" placeholder="请输入您的原密码" />
                                <div class="error"><i class="ico"></i>密码长度6~16位</div>
                            </li>
                            <li class="li">
                                <label>新 密 码：<i></i></label>
                                <input name="newPwd1" class="ipt_long" type="password" placeholder="请输入您的新密码" />
                                <div class="error"><i class="ico"></i>请输入6~16位新密码,至少包含数字、字母或符号中的两种</div>
                            </li>
                            <li class="li">
                                <label>确认密码：<i></i></label>
                                <input name="newPwd2" class="ipt_long" type="password" placeholder="请再次输入您的新密码" />
                                <div class="error"><i class="ico"></i>两次密码不一致</div>
                            </li>
                        </ul>
                        <p class="submit_data">
                            <span class="btn_opera" onclick="javascript:G.setting.setPassword();">保存</span>
                        </p>
                    </div>
                    <!-- setting pref -->
                    <div id="setting_pref_div" class="relatv inner hide prefer">
                        <div class="abs msg_success"><i class="ico"></i>保存成功</div>
                        <div class="abs msg_success msg_wrong"><i class="ico"></i>保存失败</div>
                        <ul class="set_list">
                            <h3 class="item_tit">偏好设置</h3>
                            <li>
                                <label class="label">目 录：<i></i></label>
                                <label class="item">
                                    <input type="radio" name="courseLanguage" value="1" checked="checked" />默认中文显示</label>
                                <label class="item">
                                    <input type="radio" name="courseLanguage" value="2" />默认英文显示</label>
                                <span class="btn_operas" onclick="javascript:G.setting.setPrefCourseLanguage();">确认修改</span>
                            </li>
                         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="login_reg msg_box setting_sbasePathafe_box" id="setting_safe_phone">
            <a class="close ico" href="javascript:;"></a>
            <div class="main">
                <p class="tit">
                    <label>修改手机</label>
                </p>
                <ul class="ul">
                    <li class="li">
                        <div class="ipt_box ipt_long nick_name">
                            <i class="ico"></i>
                            <input name="phone" type="text" class="" placeholder="请输入新手机号" onkeyup="setting.checkPhone()" />
                        </div>
                        <div class="error"><i class="ico"></i>手机号码格式不正确</div>
                    </li>
                    <li class="li">
                        <div class="clearfix">
                            <div class="ipt_box ipt_short check_code">
                                <i class="ico"></i>
                                <input name="imgCode" type="text" class="" placeholder="请输入验证码" />
                            </div>
                            <div class="fr codepic">
                                <img name="imgCodeOper" src="${basePath}/checkCode/getImgCode" onclick="javascript:G.setting.getImgCode();" title="点击获取" alt="点击获取" />
                                <span class="c_blue change" onclick="javascript:G.setting.getImgCode();">换一张</span>
                            </div>
                        </div>
                        <div class="error"><i class="ico"></i>验证码错误</div>
                    </li>
                    <li class="li">
                        <div class="clearfix">
                            <div class="ipt_box ipt_short sms_code">
                                <i class="ico"></i>
                                <input name="smsCode" type="text" class="" placeholder="请输入短信验证码" />
                            </div>
                            <span name="smsCodeOper" class="fr dis_ib get_phone_code" onclick="javascript:G.setting.sendSmsCode();">点击获取短信验证码</span>
                        </div>
                        <div class="error"><i class="ico"></i>短信验证码填写错误</div>
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
                    <span class="btn" onclick="javascript:G.setting.setPhone();">确定</span>
                    <span class="btn btn_qx">取消</span>
                </div>
            </div>
        </div>
        <div class="login_reg msg_box setting_safe_box" id="setting_safe_email">
            <a class="close ico" href="javascript:;"></a>
            <div class="main">
                <p class="tit">
                    <label>修改邮箱</label>
                </p>
                <ul class="ul">
                    <li class="li">
                        <div class="ipt_box ipt_long nick_name">
                            <i class="ico"></i>
                            <input name="email" type="text" placeholder="请输入新邮箱" class="">
                        </div>
                        <div class="error"><i class="ico"></i>邮箱格式不正确</div>
                    </li>
                    <li class="li">
                        <div class="ipt_box ipt_long pwd">
                            <i class="ico"></i>
                            <input name="password" type="password" class="" placeholder="请输入密码" />
                        </div>
                        <div class="error sp"><i class="ico"></i>密码长度6~16位</div>
                    </li>
                </ul>
                <div class="operate">
                    <span class="btn" onclick="javascript:G.setting.setEmail();">确定</span>
                    <span class="btn btn_qx">取消</span>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="${basePath}/js/ajaxfileupload.js"></script>
        <script type="text/javascript">
            $(function() {
                $('.left_right .left_menu').height($('.left_right .right_content').height());
                //select 添加事件
                $(".select_sp span.cur-select").on('click', function() {
                    $(".select_sp div.select").hide();
                    $(this).next("div.select").toggle();
                });
                $(".select_sp div.select").on('mouseleave', function() {
                    $(this).hide();
                });

                // 弹出框 添加事件
                $('.msg_box .close, .msg_box .btn_qx').on('click', function() {
                    $(this).parents('.msg_box').hide();
                });

                // 左侧导航
                $('.left_menu').on('click', 'li', function() {
                    var _t = $(this);
                    var _tIndex = _t.index();
                    var _tContainer = $('.right_content').children('.inner').eq(_tIndex);
                    _t.addClass('curr').siblings().removeClass('curr');
                    _tContainer.find("div.msg_success").hide();
                    _tContainer.find("div.error").hide();
                    _tContainer.show(200).siblings().hide();
                    G.setting.init(_tIndex + 1);
                });


                // 隐藏消息
                $("div.msg_success").hide();

                // 初始化页面基本数据
                G.cache_processor.intiAddressSelect("setting_province", "setting_city");
                G.cache_processor.intiIndustrySelect("setting_industry");

                // 初始化业务数据
                G.setting.init(0);

                //点击修改手机，清空以前数据
                $('#changePhone').click(function(){
                     $('#setting_safe_phone input').val('');
                     $('#setting_safe_phone .error').hide();
                    $('#setting_safe_phone').show();
                });
                //点击修改邮箱，清空以前数据
                $('#changeEmail').click(function(){
                    $('#setting_safe_email input').val('');
                    $('#setting_safe_email .error').hide();
                   $('#setting_safe_email').show();
                })
            });
        </script>
        <jsp:include page="../include/footer.jsp"></jsp:include>
