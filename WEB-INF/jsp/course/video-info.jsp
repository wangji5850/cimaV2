<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <!DOCTYPE html>
        <html style="height:100%">
        <jsp:include page="../include/head.jsp"></jsp:include>
        <script src='https://player.polyv.net/script/polyvplayer.min.js?version=${appVersion}'></script>
        <body style="height:100%">
            <div class="section_wrap" style="height:100%">
                <a name="web_top"></a>
                <div class="relatv full_screen video">
                    <div class="clearfix relatv play_area">
                        <!-- <i class="ico btn_play"></i> -->
                        <p class="abs video_info">
                            <span class="dis_ib name">${videoDetail.subjectName}
                                <c:if test="${videoDetail.subjectCode!=null}">${videoDetail.subjectCode}-</c:if>
                                <c:if test="${videoDetail.sequence<10}">0</c:if>${videoDetail.sequence} ${videoDetail.name} </span>
                            <!-- <span class="progs">正在学习：<i class="now c_blue">1课时</i>/100课时</span> -->
                        </p>
                        <div id="polyvplayer" class="video_src">
                        </div>
                    </div>
                    <div class="abs main_r">
                        <div class="abs link">
                             <a class="trans1 menu<c:if test="${hasClass!=true}">1</c:if> curr" href="javascript:;" data-id="1"><c:if test="${hasClass==true}"><span class="no_dis go_next" onclick="javascript:goNext();">切换到下一节</span></c:if><i class="ico"></i>目录</a>
                        </div>
                        <div class="abs control"><i class="abs ico"></i></div>
                        <div class="cont main_cont">
                            <c:if test="${subjectList != null}">
                                <ul class="ul for_menu">
                                    <c:forEach items="${subjectList}" var="subject" varStatus="status">
                                        <li class="li" data-id="${subject.id}">
                                            <p class="p tit">
                                                <i class="ico arrow"></i>
                                                <span class="name">
                                                    ${subject.code} ${subject.name}
                                                </span>
                                            </p>
                                            <ul class="ul_c hide">
                                            </ul>
                                        </li>
                                    </c:forEach>
                                </ul>
                                <script id="tmpl_video_list" type="text/x-jquery-tmpl">
                                    <li class="li_c {{if id==${videoDetail.id}}}curr{{/if}}">
                                        <i class="ico"></i>
                                        <div class="right">
                                            <span class="chap">{{if sequence<10}}0{{/if}}{{= sequence}}</span>
                                            <span class="name" onclick="window.location.href='${basePath}/course/view/{{= id}}?classId=${classId}'">{{= name}}</span>
                                            <span class="time">({{= durationAsString2}})</span>
                                        </div>
                                    </li>
                                </script>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="msg_box no_author">
                    <a class="ico close" href="javascript:;"></a>
                    <p class="tit">本课程为正式会员专享</p>
                    <div class="cont">
                        <a class="attend" href="https://chat.live800.com/live800/chatClient/chatbox.jsp?companyID=330913&configID=125841&jid=2077907427" target="_blank">立即加入</a>
                        <p class="p tips"> 通过资格审核即可免除高达14门考试科目 </p>
                        <p class="p conect">联系电话：400-060-2320 </p>
                    </div>
                </div>
                <input type="hidden" id="resourceId" value="${id}" />
                <script type="text/javascript">
                    var classId = '${classId}';
                    //右侧view_more
                    var get_more_flag = 0,
                        player = "";
                    $(function() {
                        // G.note.init();
                        <c:if test = "${videoDetail.videoUrl != null && videoDetail.videoUrl != ''}">
                           player = polyvObject('#polyvplayer').videoPlayer({
                               'width': '100%',
                               'height': '100%',
                               'vid': '${videoDetail.videoUrl}',
                               'flashParams': { 'wmode': 'transparent', 'allowScriptAccess': 'always', 'allowFullScreen': 'true', 'quality': 'high', },
                               'flashvars': { 'autoplay': 1, 'ban_history_time': 'on', 'watchStartTime': '${hisTime}' }
                           });
                        </c:if>
                        $('.video .for_menu li').each(function() {
                            if ($(this).attr('data-id') == '${videoDetail.subjectId}') {
                                $(this).children('.tit').click();
                            }
                        });
                        var hasNoAuth = '${hasNoAuth}' == 'null' ? false : '${hasNoAuth}';
                        online.init(hasNoAuth,'${applyFlag}','${isExitClass}','${id}');
                    });
                    function goNext() {
                        $.post('${basePath}/course/${id}/next?random=' + Math.random(), {},
                            function(d) {
                                if (d.flag == 0) {
                                    window.location.href = "${basePath}/course/view/" + d.data.id + "?classId=${classId}";
                                }

                            });
                    }
                    function s2j_onPlayOver() {
                       online.video_record(${id},classId);                        
                    }               
                </script>
                <jsp:include page="../include/footer.jsp"></jsp:include>
