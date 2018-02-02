<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/top.jsp"></jsp:include>
        <div class="web_main study_center">
        <input type="hidden" id="classId" name="classId" value="${classId}">
            <div class="head">
                <div class="mainw">
                    <div class="course_list">
                        <p class="clearfix tit">
                            <i class="ico2"></i>课表
                           
                        </p>
                        <ul class="clearfix ul p_scroll">
                        <c:forEach items="${scheduleList}" var="scheduleDetailVO">
                            <li class="li">
                                <span class="s1">
                                <c:if test="${scheduleDetailVO.level==1}">管理级</c:if>
                                <c:if test="${scheduleDetailVO.level==2}">战略级</c:if>
                                </span>
                                <span class="s2">${scheduleDetailVO.content}</span>
                                <span class="s3">${scheduleDetailVO.dueTimeAsString}</span>
                            </li>
                        </c:forEach>
                        <c:if test="${scheduleList.size()==0}">
                        <div class="no_data">
                        	<img src="${basePath}/images/no_data.png" alt=""/>
                        	<p class="tips">暂无课表哦，敬请期待~</p>
                        </div>
                        </c:if>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="floor mainw">
	            <div class="title_wrap">
	                <p class="tit">课程中心</p>
	            </div>
	            <div class="page_list">
		            <ul class="ul p_l_catalog">
		            </ul>
	            </div>
            </div>
        </div>
        <div class="floor"></div>
        <jsp:include page="include/subject-list.jsp"></jsp:include>

        <script type="text/javascript">
            $(function() {
            	var applyFlag = '${applyFlag}';
                study_center.init(applyFlag,'${classId}');
            });
        </script>
        <jsp:include page="include/footer.jsp"></jsp:include>
