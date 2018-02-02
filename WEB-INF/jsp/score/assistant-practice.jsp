<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>


<body>
    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="header header_2">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl"><img src="${basePath}/images/h_logo3.png" alt="" class="logo" /></div>
                    <div class="fr relatv right_part">
		                <div class="fr u_info">
		                    <img class="uPhoto" src="${accountPhoto}" alt="" /><span class="menu">${accountTitle}</span>
		                </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web_main p_door">
            <div class="content">
                <div class="mainw">
                    <div class="ch_class">查看年级:&nbsp;
                        <select id="gradeId" name="gradeId" onchange="assistantExam();">
                        	<c:forEach items="${listGrade}" var="its">
                            <option value="${its.id}">${its.name}</option>
                        	</c:forEach>
                        </select>
                    </div>
                    <div id="listDetail_div" class="clearfix door_area"></div>
                    <script id="listDetail_tmpl" type="text/x-jquery-tmpl">
						{{each data}}
                     	 <div class="door door{{= $index+1}}">
                            <img src="${basePath}/images/t_exam/exam{{= $index+1}}.png" alt="" class="tit" />
                            <div class="status">
                                <img src="${basePath}/images/t_exam/status.png" alt="" />
                            </div>
                            <p class="lever lever1">{{if status==0}}已结束(<i class="c_sp">老师批阅中</i>){{else status==2}}开放时间(北京时间){{else}}测试时间(北京时间){{/if}}</p>
                            <p class="lever lever2">
								{{if status==0}}暂无分数、排名信息{{else}}{{= periodAsString}}{{/if}}
							</p>
                            <div class="operate">
                                <span {{if status==1}}onclick="assistantList('{{= uuid}}');"{{/if}} class="btn {{if status==0 || status==2 || status==3}}btn1{{/if}}">
								{{if status==0}}查看详情{{else status==1}}查看详情{{else status==2}}开始测试{{else}}暂未开始{{/if}}
								</span>
                            </div>
                        </div>
						{{/each}}
					</script>
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
    <script type="text/javascript">
    $(function() {
    	assistantExam();
    });
    //
    function assistantExam(){
    	var gradeId=$('#gradeId').val();
    	$.post(
   			'${basePath}/score/assistant-exam?random='+Math.random(),
   			{'gradeId':gradeId},
   			function(d){
	   			$("#listDetail_div").html('');
   				if(d.data!="" && d.data!=null){
   					//助教通过选择年级显示模考信息
		   			G.show_data(d, $("#listDetail_tmpl"), $("#listDetail_div"));
   				}
   			},
   			'json'
   		);
    }
    //
    function assistantList(uuId){
    	window.location.href='${basePath}/assistant-list?uuId='+uuId;
    }
    </script>
</body>

</html>