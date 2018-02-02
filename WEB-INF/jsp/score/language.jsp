<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>

<body>
	<form id='startForm' action="${basePath}/practices/${result.practiceDetailVO.id}/start" method='get'> 
		<input type="hidden" id="language" name="language" value="1"> 
	</form>
	
    <div class="section_wrap web_main">
        <a name="web_top"></a>
        <div class="mainw relatv p_exam_door">
            <p class="tit">${result.practiceDetailVO.name}</p>
            <div class="top">
                <img class="logo" alt="" src="${basePath}/images/t_login_logo.png"/>
            </div>
            <div class="center">
                <div class="p_exam_tit">${result.practiceDetailVO.name}</div>
                <div class="p_exam_uinfo">Welcome <span class="name">${result.practiceDetailVO.nickName}</span><span class="id">ID:${result.practiceDetailVO.cimaId}</span></div>
                <div class="p_exam_language">
                    <p class="label">Choose&nbsp;&nbsp;a&nbsp;&nbsp;Language&nbsp;&nbsp;To&nbsp;&nbsp;Start&nbsp;&nbsp;The&nbsp;&nbsp;Test.</p>
                    <p class="btns">
                        <span class="btn cn" data-id="1">中文</span>
                        <span class="btn en" data-id="2">English</span>
                    </p>
                </div>
            </div>
            <div class="bottom">
                Maxlmun&nbsp;&nbsp;Time&nbsp;&nbsp;Allowed&nbsp;&nbsp;: <span class="time">${result.practiceDetailVO.durationAsHour}</span> Hours
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script src="${basePath}/js/jquery.tmpl.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/gloab.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    		 $('.btns').on('click', '.btn', function() {
    			 $("#language").val($(this).attr("data-id"));
    			 $("#startForm").submit();
    		 });
    	})
    </script>
</body>

</html>