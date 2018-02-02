<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_cima_intr">
    <div class="floor floor1 m_floor1">
        <div id="j_main_slider" class="slider">
            <div class="slider_img clearfix">
                (cimaIntroBanner1
            </div>
            <ul id="j_strigger" class="slider_trigger"></ul>
        </div>
    </div>
    <div class="floor floor2 m_floor2">
        <div class="wrapper exemp">
            <div class="title_wrap">
                <p class="tit">CIMA与CGMA简介</p>
                <p class="sub_title">INTRODUCTION</p>
            </div>
            <div class="con">
                (cimaIntroBanner2 
                (cimaIntroBanner3
            </div>
        </div>
    </div>
    <div class="floor floor3 m_floor3">
        <div class="wrapper clearfix">
            <div class="title_wrap">
                <p class="tit">CIMA职业资格认证的含金量</p>
                <p class="sub_title">HIGH CALIBRE</p>
            </div>
            <div class="con fl">
                <div class="ul">
                    (cimaIntroBanner4
                </div>
            </div>
            <div class="btns fr">
                <a class="left" id="leftBtn"></a>
                <a class="right" id="rightBtn"></a>

            </div>
        </div>
    </div>
    <div class="floor floor4">
        <div class="wrapper">
            <div class="title_wrap">
                <p class="tit">CGMA管理会计职业能力框架</p>
                <p class="sub_title"> CGMA Competency Framework</p>
            </div>
            <div class="con clearfix">
                <div class="fl">
                    <img data-oxlazy="${basePath}/images/index/p_cima_intr_abile.png" src="">
                </div>
                <div class="fr message">
                   <p>
                        CIMA在企业界享有很高的声望，被誉为21世纪最完善的商业培训体系。大多数的国际财务资格均面向财务会计，偏重审计， </br>而CIMA的认证群体则以企业会计和经理为主。
                        </br>
                        <span class="sed_text">在培养他们扎实财务技能的同时，重点提高他们参与经营管理和战略决策的能力，实现“财务支持战略决策，战略融于财务管理”。</spam>
                    </p>
                </div>
            </div>
            <p>通过考试成为CGMA会员的55个理由</p>
            <div class="m_reason_wrap">
                (cimaIntroBanner5
                <div class="page clearfix">
                    <div class="spans" id="page_span">
                        <span class="on">01-10</span>
                        <span>11-20</span>
                        <span>21-30</span>
                        <span>31-40</span>
                        <span>41-50</span>
                        <span>51-55</span>
                    </div>
                    <div class="btns fr">
                        <img data-oxlazy="${basePath}/images/index/left.png" id="left">
                        <img data-oxlazy="${basePath}/images/index/right.png" id="right">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/js/slider.min.js"></script>
<script type="text/javascript">
    $(function() {
        cima_intr.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>