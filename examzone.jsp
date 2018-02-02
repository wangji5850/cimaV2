<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_examzone">
    <div class="floor floor1 m_floor1 big_img">
        (examZoneBanner1
    </div>
    <div class="floor floor2">
        <div class="wrapper">
            <div class="con">
                <div class="clearfix">
                    <div class="fl">
                        <div class="title clearfix">
                            <p class="dib"><i class="zhinan"></i>报考指南</p>
                            <a href="checkmore.html?type=1" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                    <div class="fr">
                        <div class="title clearfix">
                            <p class="dib"><i class="ganhuo"></i>备考干货</p>
                            <a href="checkmore.html?type=2" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="fl">
                        <div class="title clearfix">
                            <p class="dib"><i class="xiehui"></i>协会动态</p>
                            <a href="checkmore.html?type=3" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                    <div class="fr">
                        <div class="title clearfix">
                            <p class="dib"><i class="yanjiu"></i>研究报告</p>
                            <a href="checkmore.html?type=4" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="fl">
                        <div class="title clearfix">
                            <p class="dib"><i class="guanhui"></i>铂略管会</p>
                            <a href="checkmore.html?type=5" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                    <div class="fr">
                        <div class="title clearfix">
                            <p class="dib"><i class="qa"></i>Q&A大全</p>
                            <a href="checkmore.html?type=6" class="fr more">More+</a>
                        </div>
                        <ul class="clearfix page_list">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="floor floor3 m-floor4 m-apply">
        <p class="fz36">免试申请通道</p>
        <p class="fz14">
            <span>CIMA学习指南</span>
            <span>CIMA职业框架 </span>
            <span> CIMA项目手册</span>
            <span>最新考试真题</span>
            <span>内部讲义等</span>
        </p>
          <div class="wrapper">
               <div class="enroll" id="enroll">
                <div class="clearfix relatv mainw m-form">
                        <div class="div">
                            <input type="text" class="name" placeholder="姓名/Name" id="txt_name" />
                            <div class="error"><i class="ico"></i>姓名不能为空</div>
                        </div>
                        <div class="div">
                        <input type="text" class="mobile" placeholder="手机/Mobile" id="txt_phone" />
                         <div class="error"><i class="ico"></i>手机号码格式不正确</div>
                        </div>
                   
                        <div class="div last">
                        <input type="text" class="email" placeholder="邮箱/E-mail" id="txt_email"/>
                        <div class="error"><i class="ico"></i>邮箱格式不正确</div>
                        </div>
                </div>
                <input type="button" class="btn" value="立即申请" onclick="javascript:G.apply_less($('.m-apply'));" />
            </div>
        </div>
    </div>
</div>
<script id="list_tmpl" type="text/x-jquery-tmpl">
    <li class="li{{if ($index+1) % 2 == 0}} right{{/if}}">
        <a href="${basePath}/exampa/{{= id}}">{{= wordName}}</a>
    </li>
</script>
<script type="text/javascript">
    $(function() {
        examzone.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>