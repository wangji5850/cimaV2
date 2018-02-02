<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html style="height:100%">
    <jsp:include page="head.jsp"></jsp:include>
    <script type="text/javascript" charset="utf-8"> 
    function go_VP(){switch(window.orientation){case 0: adaptVP({uWidth:512});$('html').height('200%'); break; default: adaptVP({uWidth:1200});$('html').height('100%'); break; } }
    !(function(){IsMob && go_VP();})();
    </script>
<body class="sp_body">
     <div class="section_wrap">
            <a name="web_top"></a>
            <div class="header header_2">
                <div class="main">
                    <div class="clearfix mainw">
                        <div class="fl">
                            <a href="${basePath}"><img src="${basePath}/images/h_logo3.png" alt="" class="logo" /></a>
                        </div>
                    </div>
                </div>
            </div>