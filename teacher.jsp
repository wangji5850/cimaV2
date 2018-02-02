<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_teacher">
    <div class="floor floor1 big_img m_floor1">
        (teacherBanner1
    </div>
    <div class="floor floor2">
        <div class="wrapper">
            <div class="title_wrap">
                <p class="tit">CIMA国际讲师</p>
                <p class="sub_title">CIMA INTERNATIONAL TRAINERS</p>
            </div>
            <div class="clearfix">
                (teacherBanner2
            </div>
        </div>
    </div>
    <div class="floor floor3">
        <div class="wrapper">
            <div class="title_wrap">
                <p class="tit">铂略CIMA研究团队</p>
                <p class="sub_title"> THE CIMA RESEARCH TEAM</p>
            </div>
            <div class="con">
                <div class="dib-box" class="ul clearfix">
                    (teacherBanner3
                </div>
                <a href="http://www.bolue.cn/teacher/list" class='check_more' target='_blank'>查看全部讲师</a>
            </div>
        </div>
    </div>
    <div class="floor floor4 m-floor4 m-apply">
        <p class="fz36">免试申请通道</p>
        <p class="fz14">
            <span>CIMA学习指南 </span>
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
<div id='polyvplayer' class="polyvplayer"></div>
<script src='https://player.polyv.net/script/polyvplayer.min.js'></script> 
<script type="text/javascript">
    $(function() {
        teacher.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>