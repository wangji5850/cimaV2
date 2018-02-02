<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/top.jsp"></jsp:include>
        <div class="web_main p_zhujiao p_record">
            <div class="mainw">
                <div class="title_wrap">
                    <p class="tit">我的学习记录</p>
                </div>
                <ul class="tabs hide">
                    <li class="li curr"></li>
                </ul>
                <ul class="page_list record_list"></ul>
                <jsp:include page="include/pager.jsp"></jsp:include>
            </div>
        </div>
        <script id="tmplrecord" type="text/x-jquery-tmpl">
            <li class="li{{if status == 1}} status1{{/if}}">
                <span class="status"><i class="ico2"></i>{{= passTimeString}}{{if status == 1}}学习中{{else}}完成{{/if}}</span>
                <a href="${basePath}/course/view/{{= videoId}}?classId={{= classId}}" target="_blank">
	                <span class="name">
	                    {{= code}}{{if courseLanguage==2}}{{= foreignName}}{{= videoForeignName}}{{else}}{{= name}}{{= videoName}}{{/if}}
	                </span>
                </a>
            </li>
        </script>
        <script type="text/javascript">
            $(function() {
                record.init();
            });
        </script>
        <jsp:include page="include/footer.jsp"></jsp:include>
