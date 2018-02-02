<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/top.jsp"></jsp:include>
        <div class="web_main p_zhujiao p_learn">
            <div class="head">
                <div class="mainw">
                    <div class="info_det u_info">
                        <div class="left"> <img class="fl uPhoto" src="${metaData.accountPhoto}" alt="${metaData.accountTitle}">
                            <div class="right">
                                <span class="name">${metaData.accountTitle}</span>
                                <div class="oper_btns">
                                	<c:choose>
                                		<c:when test="${metaData.hasClass}"><a href="${basePath}/start-learn?classId=${metaData.classId}" class="s start"><i class="ico2"></i>开始学习</a></c:when>
                                		<c:otherwise><a href="${basePath}/start-learn?classId=0" class="s start"><i class="ico2"></i>开始学习</a></c:otherwise>
                                	</c:choose>
                                    <a href="${basePath}/learn-record" class="s learn"><i class="ico2"></i>我的学习轨迹</a>
                                </div>
                            </div>
                        </div>
                        <div id="sign_up" class="right sign_up"></div>
                        <script id="tmplsign_up" type="text/x-jquery-tmpl">
                        	<span class="fl btns" onclick="{{= ev}}">{{= text}}</span>
                            <span class="sign_days">
                                <span class="time">{{= date}}</span>
                                <span class="days">累计学习<i class="num">{{= days}}</i>天</span>
                            </span>
                        </script>
                    </div>
                </div>
            </div>
            <div class="my_course">
                <div class="mainw">
                    <div class="title_wrap">
                        <p class="tit">我的课程</p>
                    </div>
                    <c:forEach items="${listLessonVO}" var="lessonVO">
                        <div class="course">
                            <c:choose>
                                <c:when test="${metaData.courseLanguage == 1}">
                                    <a title="${lessonVO.name}" <c:if test="${lessonVO.currentStatus}">href="${basePath}/start-learn?classId=${lessonVO.classId}"</c:if> target="_blank">
                                        <img class="img" src="${lessonVO.briefImage}" alt="${lessonVO.name}"/>
                                        <span class="c_title1 banner_tit">${lessonVO.name}</span>
                                        <span class="c_title2 banner_tit">${lessonVO.title}</span>
                                        <i class="learning">开始学习</i>
                                        <c:choose>
                                            <c:when test="${lessonVO.currentStatus}"><i class="status">已开始</i></c:when>
                                            <c:otherwise><i class="status end">已结束</i></c:otherwise>
                                        </c:choose>
                                    </a>
                                </c:when>
                                <c:otherwise>
                                    <a title="${lessonVO.name}" <c:if test="${lessonVO.currentStatus}">href="${basePath}/start-learn?classId=${lessonVO.classId}"</c:if> target="_blank">
                                        <img class="img" src="${lessonVO.briefImage}" alt="${lessonVO.foreignName}"/>
                                        <span class="banner_tit e_title1">${lessonVO.foreignName}</span>
                                        <span class="banner_tit e_title2">${lessonVO.foreignTitle}</span>
                                        <i class="learning">Start</i>
                                        <c:choose>
                                            <c:when test="${lessonVO.currentStatus}"><i class="status">已开始</i></c:when>
                                            <c:otherwise><i class="status end">已结束</i></c:otherwise>
                                        </c:choose>
                                    </a>
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </c:forEach>
                    <c:if test="${listLessonVO.size()==0}">
                    <div class="no_data">
                     <a title="${lessonVO.name}" href="${basePath}/start-learn?classId=0" target="_blank">
                        <img src="${basePath}/images/freecourse.jpg" alt="免费试听"/>
                        <p class="tips">CIMA免费试听课程</p>
                        <i class="learning">免费试听</i>
                        </a>
                    </div>
                    </c:if>
                </div>
            </div>
            <div class="c_offline">
                <div class="mainw">
                    <div class="title_wrap">
                        <p class="tit">实务沙龙</p>
                    </div>
                    <ul class="clearfix offline_list">
                    <c:forEach items="${listOfflineInfoVO}" var="offlineInfoVO" varStatus="status">
                        <li class="li <c:if test="${status.index==2}">last</c:if>">
                            <a title="${offlineInfoVO.title}" href="//www.bolue.cn/offlines/${offlineInfoVO.id}" target="_blank">
                                <img class="img" src="${offlineInfoVO.briefImage}" alt="${offlineInfoVO.title}">
                                <h3 class="tit">${offlineInfoVO.title}</h3>
                            </a>
                        </li>
                    </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            $(function() {
                learn.init();                  
                if ($('.my_course .img').attr('src')) return;
                $('.my_course .img').attr('src','${basePath}/images/zhan.jpg');
            });
        </script>
        <jsp:include page="include/footer.jsp"></jsp:include>
