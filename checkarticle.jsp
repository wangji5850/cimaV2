<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_checkmore p_checkarticle">
    <div class="floor floor1">
        <div class="wrapper clearfix">
            <div class="fl">
                <p class="tit fz18">
                    <span class="line"></span>考试专区</p>
                <ul>
                    <li class="checkon"><i></i>报考须知</li>
                    <li><i class="hide"></i>考试动态</li>
                    <li><i class="hide"></i>常见QA</li>
                    <li><i class="hide"></i>协会资讯</li>
                    <li><i class="hide"></i>考经分享</li>
                    <li><i class="hide"></i>学习资料</li>
                    <li><i class="hide"></i>推荐课程</li>
                    <li><i class="hide"></i>免试申请</li>
                </ul>
            </div>
            <div class="fr">
                <p class="tit">报考须知文章页</p>
                <span class="download">下载PDF</span>
                <div class="tip">
                    <span>发布时间：2017-12-30</span>
                    <span>分享到</span>
                </div>
                <p class="con" onselectstart="return false;" unselectable="on">韩国外交部长官尹炳世、国防部长官金宽镇、统一部长官柳吉在及韩国国家安保室第1次长金奎显与韩国国家情报院第1次官韩基范等出席了此次会议。 朴槿惠在会议上表示，在全韩国国民正沉浸在沉船事故的悲痛中时，朝鲜挑起炮击事件令她感得非常遗憾。朴槿惠指示，越是非常时期，越要做出更加严密的应对态势。此外，还要全力以赴，做好保护韩国国民的各项工作。 此外，青瓦台还表示，将在强化韩媒联盟防卫态势的同时，将更加紧密地维持韩美同盟间的合作体制，还将努力与中国等国家建立国际社会对朝鲜半岛问题的共同立场。 朴槿惠访华会对朝鲜有触动吗？ 肯定会有的。因为中国和韩国建交，朝鲜一直都很抵触，甚至把板门店的中国国旗都撤掉了。 (urhvlu / twg16888) 　　中新网6月28日电 韩国总统朴槿惠访华，并与中国国家主席习近平举行会谈。境外华文媒体认为，朴槿惠上台后表现出对华亲近和对朝政策灵活性，此次访华打破惯例引关注，被期待将中韩关系提升为“政热经热”，促进两国经贸合作大跃进，为两国因应东北亚局势变化打下合作基础。韩国外交部长官尹炳世、国防部长官金宽镇、统一部长官柳吉在及韩国国家安保室第1次长金奎显与韩国国家情报院第1次官韩基范等出席了此次会议。 朴槿惠在会议上表示，在全韩国国民正沉浸在沉船事故的悲痛中时，朝鲜挑起炮击事件令她感得非常遗憾。朴槿惠指示，越是非常时期，越要做出更加严密的应对态势。此外，还要全力以赴，做好保护韩国国民的各项工作。 此外，青瓦台还表示，将在强化韩媒联盟防卫态势的同时，将更加紧密地维持韩美同盟间的合作体制，还将努力与中国等国家建立国际社会对朝鲜半岛问题的共同立场。 朴槿惠访华会对朝鲜有触动吗？ 肯定会有的。因为中国和韩国建交，朝鲜一直都很抵触，甚至把板门店的中国国旗都撤掉了。 (urhvlu / twg16888) 　　中新网6月28日电 韩国总统朴槿惠访华，并与中国国家主席习近平举行会谈。境外华文媒体认为，朴槿惠上台后表现出对华亲近和对朝政策灵活性，此次访华打破惯例引关注，被期待将中韩关系提升为“政热经热”，促进两国经贸合作大跃进，为两国因应东北亚局势变化打下合作基础。</p>
                <div class="clearfix btn_wrap">
                    <p class="fl">上一篇：
                        <span>报考须知1</span>
                    </p>
                    <p class="fr">下一篇：
                        <span>报考须知2</span>
                    </p>
                </div>
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

<script type="text/javascript">
    $(function() {
        articleDes.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>