<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>

<body>
	
    <div class="section_wrap">
    
        <a name="web_top"></a>
        
        <div class="header">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl"><a href="${basePath}"><img src="${basePath}/images/logo.png" alt="" class="logo" /></a></div>
                </div>
            </div>
        </div>
        
        <div class="login_reg login" style="background-image:url(这里是背景图片地址)">
            <div id="login_div" class="main">
                <div class="more_info" style="text-align:center">
                	您的考卷已经提交，请耐心等待批阅结果。。。 
                </div>
        	</div>
        </div>
    
    
    <jsp:include page="../include/footer.jsp"></jsp:include>
    
    <script type="text/javascript">
    $(function() {
    	// checkbox
    	$("#login_div i.ico").click(function(){
    		if($(this).hasClass("checked")==true){
    			$(this).removeClass("checked");
    		} else{
    			$(this).addClass("checked");
    		}
    	});
    });
    </script>
    
    
    
</body>

</html>