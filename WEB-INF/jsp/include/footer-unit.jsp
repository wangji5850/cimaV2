<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:choose>
        <c:when test="${IS_LOCAL==true}">		
		<script type="text/javascript" src="${basePath}/dev/js/gloab.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/note.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/private_message.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/exercise_set.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/exset_detail.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/video.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/focus.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/qa.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/setting.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/cache.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/cache_processor.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/login.js"></script>
		<script type="text/javascript" src="${basePath}/dev/js/include/register.js"></script>	
		<script type="text/javascript" src="${basePath}/dev/js/include/search_result.js"></script>	
		<script type="text/javascript" src="${basePath}/dev/js/include/look_for_pwd.js"></script>	
		<script type="text/javascript" src="${basePath}/dev/js/md5.js"></script>	
		<script type="text/javascript" src="${basePath}/dev/js/cimav2.js"></script>	
	</c:when>
	<c:otherwise>	
		<script type="text/javascript" src="${basePath}/js/md5.min.js"></script>	
		<script type="text/javascript" src="${basePath}/js/cimav2.min.js?t=${appVersion}"></script>	
		<script type="text/javascript" src="${basePath}/js/cache.min.js?t=${appVersion}"></script>
		<script type="text/javascript" src="${basePath}/js/gloab.min.js?t=${appVersion}"></script>
		<script type="text/javascript" src="${basePath}/js/website.min.js?t=${appVersion}"></script>
		<script>
			var _hmt = _hmt || [];
			(function() {
			  var hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?415c3955e3fd99cca1ad78c7466dac16";
			  var s = document.getElementsByTagName("script")[0];
			  s.parentNode.insertBefore(hm, s);
			})();
		</script>
		<!-- Live800在线客服图标:默认图标[浮动图标] 开始-->
		<script language="javascript" src="https://chat.live800.com/live800/chatClient/floatButton.js?jid=2077907427&companyID=330913&configID=125841&codeType=custom"></script>
		<!-- 在线客服图标:默认图标 结束-->
		<c:if test="${servletPath.indexOf('video-info')==-1}">
			<!-- Live800默认跟踪代码: 开始-->
			<script language="javascript" src="https://chat.live800.com/live800/chatClient/monitor.js?jid=2077907427&companyID=330913&configID=125840&codeType=custom"></script>
			<!-- Live800默认跟踪代码: 结束-->
		</c:if>
		 <!-- live800数据分析   -->
	    <div style='display:none;'><a href='https://www.live800.com'>客服软件</a></div>
	    <script type="text/javascript">
	    var _gaq = _gaq || [];
	    _gaq.push(['_setAccount', 'UA-18196890-45']);
	     _gaq.push(['_trackPageview']);
	    (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	     })();
	    </script>		
	</c:otherwise>
	</c:choose>
	
    <script type="text/javascript" src="${basePath}/js/jquery.tmpl.min.js?t=${appVersion}"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
	<script type="text/javascript" src="${basePath}/js/jquery.pager.min.js?"></script>
    <script type="text/javascript" src='${basePath}/js/layer/layer.js?t=${appVersion}'></script>
    <script type="text/javascript" src='${basePath}/js/lazyLoad.min.js'></script>

	<script type="text/javascript">
	    $(function() {
            var pathname = window.location.pathname;
            if(pathname.indexOf('index.html') > -1 || pathname == '/'){
                $('.navigation .li:first').addClass('curr')
            }else if(pathname.indexOf('checkmore.html') > -1 || pathname.indexOf('exampa') > -1){
                $('.navigation .li[data-for="exampa"]').addClass('curr')
            }else{
                $('.navigation .li').each(function(index, el) {
                    var _t = $(this);
                    if(_t.children('a').attr('href').indexOf(pathname) > -1){
                        _t.addClass('curr');
                        return false;
                    }
                });
            }
        })
	</script>
	</body>

	</html>
