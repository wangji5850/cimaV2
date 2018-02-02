<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_checkmore">
    <div class="floor floor1 m_floor1">
        <div class="wrapper clearfix">
            <div class="main_l fl">
                <p class="tit fz18">
                    <span class="line"></span>干货专区</p>
                <ul class="catalog tabs">
                    <li class="li curr" data-type="1"><i></i>报考指南</li>
                    <li class="li" data-type="2"><i></i>备考干货</li>
                    <li class="li" data-type="3"><i></i>协会动态</li>
                    <li class="li" data-type="4"><i></i>研究报告</li>
                    <li class="li" data-type="5"><i></i>铂略管会</li>
                    <li class="li" data-type="6"><i></i>Q&A大全</li>
                    <li class="li" data-type="7"><a href="${basePath}/htmlcima/quafly.html">免试申请</a></li>
                </ul>
            </div>
            <div class="main_r fr">
                <div class="title_wrap">
                    <p class="tit">报考须知</p>
                </div>
                <ul class="page_list">
                </ul>
                <div id="pager" class="pager"></div>
            </div>
        </div>
    </div>
    <div class="floor floor2 m-floor4 m-apply">
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
<input type="hidden" id="pageNo">
<input type="hidden" id="pageCount">
<input type="hidden" id="totalCount">
<script id="list_tmpl" type="text/x-jquery-tmpl">
    <li class="li">
        <a href="${basePath}/exampa/{{= id}}">{{= title}}<i></i></a>
    </li>
</script>
<script type="text/javascript">
    $(function() {
        articleMore.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>