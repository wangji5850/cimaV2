<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_index">
    <div class="floor floor1 ">
        <div id="j_main_slider" class="slider">
            <div class="slider_img clearfix">
                (indexBanner1
            </div>
            <ul id="j_strigger" class="slider_trigger"></ul>
        </div>
    </div>
    <div class="floor floor2 ">
        <div class="wrapper">
            <div class="title_wrap">
                <p class="tit">免试项目</p>
                <p class="sub_title">EXEMPTIONS</p>
            </div>
            <div class="con clearfix">
            	(indexBanner2
                <div class="join_wrap"><a href="" id="join1" target="_blank" >立即加入</a><a href=""  id='join2' target="_blank" class="orange">立即加入</a></div>
            </div>
            <div class="big_banner">
            	(indexBanner3
                <div class="own"><a href="" target="_blank">获取免试资格</a></div>
            </div>
        </div>
    </div>
    <div class="floor floor3 m_floor3">
        <div class="wrapper clearfix">
            <div class="title_wrap">
                <p class="tit">项目优势</p>
                <p class="sub_title">ADVANTAGE</p>
            </div>
            <div class="con fl">
                <div class="ul">
                    (indexBanner4
                </div>
            </div>
            <div class="btns fr">
               <a class="left" id="leftBtn"></a>
                <a class="right" id="rightBtn"></a>
            </div>
        </div>
    </div>
    <div class="floor floor4 m-floor4">
        <p class="fz36">现在注册，即可免费获取内部学习资料</p>
        <p class="fz14">
            <span>CIMA学习指南</span>
            <span>CIMA职业框架</span>
            <span>CIMA项目手册</span>
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
                <input type="button" class="btn" value="注册索取资料" onclick="javascript:G.apply_less($('.m-form'));" />
            </div>
        </div>
    
    </div>
    <div class="floor floor5">
        <div class="wrapper">
            <div class="title_wrap">
                <p class="tit">巨擘分享</p>
                <p class="sub_title">SHARING</p>
            </div>
            <div class="con clearfix">
                <div class="imgs fl">
                    (indexBanner5
                </div>
                <div class="fr message">
                    <div class='intro intro1'></div>
                    <div class='intro intro2'></div>
                    <div class='intro intro3'></div>
                </div>
                <div class="mask1 mask"></div>
                    <div class="mask2 mask"></div>
                    <div class="mask3 mask"></div>
                    <div class="mask4 mask"></div>
            </div>
        </div>
    </div>
    <div class="floor floor6 ">
        <div class="big_img"><img class="img" data-oxlazy="${basePath}/images/1_02.jpg" alt="强强联合，百强雇主，精英学员" src=""></div>
    </div>
    <i class="backtop"></i>
</div>
</div>
<script type="text/javascript" src="${basePath}/js/slider.min.js"></script>
<script type="text/javascript">
    $(function() {
        index.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>
