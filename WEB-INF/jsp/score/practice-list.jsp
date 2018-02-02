<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
    <style type="text/css">
        .demo-class .layui-layer-content,.demo-class .layui-layer-btn{text-align: center;}
        .demo-class .layui-layer-btn a{border: 0; border-radius:15px;color: #fff; width: 80px;height: 26px;line-height: 25px;text-align: center;padding: 0;}
        .demo-class .layui-layer-btn .layui-layer-btn0{background-color: #FF9A63;margin-right: 40px;}
        .demo-class .layui-layer-btn .layui-layer-btn1{background-color: #999;}
        .demo-class .layui-layer-btn .layui-layer-btn0:hover{background-color: #F37633;}
        .demo-class .layui-layer-btn .layui-layer-btn1:hover{background-color: #666;}
    </style>


<body>
    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="header header_2">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl"><a href="${basePath}"><img src="${basePath}/images/h_logo3.png" alt="" class="logo" /></a></div>
                    <div class="fr relatv right_part">
                      <div class="u_info">
                        <a class="uifo" href="${basePath}/learn-center"><img class="uPhoto cursor" src="${accountPhoto}" alt="">
                        <span class="menu">${accountTitle}</span><i class="ico"></i></a>
                        <ul class="ul">
                            <li class="li_c li6"><a href="${basePath}/setting"><i class="ico"></i>账号设置</a></li>
                            <li class="li_c li7"><a href="javascript:G.login.logout();"><i class="ico"></i>退出登录</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web_main p_door">
            <div class="content">
                <div class=" mainw">
                    <div class="clearfix door_area">
                    	<c:forEach items="${base}" var="item" varStatus="status">
                        
                    		<div class="door door${status.index+1}">
	                            <img src="${basePath}/images/t_exam/exam${status.index+1}.png" alt="" class="tit" />
	                            <div class="status">
	                                <img src="${basePath}/images/t_exam/status_op.png" alt="" />
	                            </div>
								<c:choose>
									<c:when test="${item.detailStatus==1}">
										<p class="lever lever1">测试时间（北京时间）</p>
			                            <p class="lever lever2">${item.periodAsString}</p>
			                            <div class="operate">
			                                <span class="btn btn1">暂未开始</span>
			                            </div>
									</c:when>
									<c:when test="${item.detailStatus==2 || item.detailStatus==3}">
										<p class="lever lever1">开放时间（北京时间）</p>
				                            <p class="lever lever2">${item.periodAsString}</p>
				                            <div class="operate">
				                                <span class="btn" onclick="alertchoose(${item.id});">开始测试</span>
				                            </div>
                                            <div id="hidetime" style="display: none;">${item.durationAsHour}</div>
									</c:when>
									<c:when test="${item.detailStatus==4}">
										<p class="lever lever1">已结束(<i class="c_sp">老师批阅中</i>)</p>
			                            <p class="lever lever1">暂无分数</p>
			                            <div class="operate">
			                                <span class="btn btn1">查看详情</span>
			                            </div>
									</c:when>
									<c:when test="${item.detailStatus==5}">
										<c:choose>
											<c:when test="${item.score!=null}">
												<p class="lever lever1">测试总分： <i class="num">${item.score}</i> 分 </p>
		                            			<!-- <p class="lever lever1">班级排名： 第 <i class="num">${item.ranking}</i> 名</p>  -->
		                            			<div class="operate">
					                                <span class="btn" onclick="javascript:window.location.href='${basePath}/practices/${item.id}/person-score'">查看详情</span>
					                            </div>
											</c:when>
											<c:otherwise>
												<p class="lever lever1">该场模拟考没有成绩</p>
											</c:otherwise>
										</c:choose>
									</c:when>
									<c:otherwise>
									</c:otherwise>
								</c:choose>
                        	</div>
                    	</c:forEach>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/gloab.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/website.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/layer/layer.js?version=0.1166305005534308"></script>
    <script type="text/javascript">
        function alertchoose(id){
            var time = $('#hidetime').text();
            layer.open({
                skin: 'demo-class',
                title: '请注意',
                content:'一旦开始测试就会自动计时，中途不能暂停。本次模考将持续'+ time +'小时，您是否确定要开始做题？',
                btn: ['确定','取消'], //按钮
                closeBtn: 1,
                area: ['295px'],
                btn2: function(index){ //或者使用btn2
                },btn1: function(index, layero){ //或者使用btn1
                    //提交试题
                    window.location.href='${basePath}/practices/'+id;
                }
            });
    }
    $(function() {
    });
    </script>
</body>