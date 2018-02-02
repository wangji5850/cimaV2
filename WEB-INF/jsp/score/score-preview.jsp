<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
<body>
    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="header header_2">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl" id="p_teacher_logo"><img src="${basePath}/images/h_logo3.png" alt="" class="logo" /></div>
                        <div class="fr relatv right_part">
                      <div class="u_info">
                      <a href=" "><img class="uPhoto" src="${accountPhoto}" alt="" /><span class="menu">${accountTitle}</span><i class="ico"></i></a>
                        <ul class="ul">
                            <li class="li_c li7" id="tacher_logout"><a href="${basePath}/teacherLoginOut"><i class="ico"></i>退出登录</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web_main p_exam_ress">
            <div class="content">
                <div class="mainw">
                    <div class="clearfix tabs">
                        <span class="fl tit">${objMap.peDetailVO.nickName}’s Transcript</span>
                    </div>
                    <table cellpadding="0" cellspacing="0" class="score_point_det">
                        <tr class="th">
                            <td width="117"><c:choose><c:when test="${practiceLanguage==1}">序号</c:when><c:otherwise>Task</c:otherwise></c:choose></td>
                        	<c:forEach items="${objMap.listPoint}" var="its">
                        		<td width="192"><c:choose><c:when test="${practiceLanguage==1}">${its.name}</c:when><c:otherwise>${its.nameForeign}</c:otherwise></c:choose></td>
                        	</c:forEach>
                            <td width="117"><c:choose><c:when test="${practiceLanguage==1}">总计</c:when><c:otherwise>Total</c:otherwise></c:choose></td>
                        </tr>
                        
                        <c:forEach items="${objMap.listDetail}" var="its" varStatus="status">
                        <tr class="score_num">
                            <td class="c_blue ital">${status.index+1}</td>
                            <c:forEach items="${its.listScoreVO}" var="objS" varStatus="statusLast">
                            	<td <c:if test="${statusLast.last}">class="color"</c:if>>${objS.score}</td>
                            </c:forEach>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="big_td" colspan="7"><span class="label ital">Comments：</span><span class="con">${its.markExplain}</span>
                            </td>
                        </tr>
                        </c:forEach>
                        
                        <tr class="total_num">
                            <td class="f12"><c:choose><c:when test="${practiceLanguage==1}">总计</c:when><c:otherwise>Total marks</c:otherwise></c:choose></td>
                            <c:forEach items="${objMap.listSumScore}" var="its" varStatus="status">
                            	<td <c:if test="${status.last}">class="color"</c:if>>${its.score}</td>
                            </c:forEach>
                        </tr>
                    </table>
                    <div class="teac_feedback">
                        <div class="tabs">
                            <span class="tit">Performance Feedback</span>
                        </div>
                        <div class="p_scroll cont">
                            ${peContent}
                        </div>
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
    <script type="text/javascript" src="${basePath}/js/cimav2.min.js"></script>
    <script type="text/javascript">
     $(function() {
            $('.p_scroll').mCustomScrollbar({
                axis:"y",
                scrollButtons:{enable:true},
                theme:"3d",
                scrollbarPosition:"outside"
            });
        });
     //点击logo跳转
     var reqObj=reqStr2Obj();
    $('#p_teacher_logo').click(function(){
         window.location.href='${basePath}/score-list?uuId='+reqObj.uuId;
    });
   
    </script>
</body>

</html>
