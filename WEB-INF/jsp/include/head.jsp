<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.regex.Pattern"%> 
<% 
    String path = request.getContextPath(); 
    // 获得本项目的地址赋值给basePath变量 
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path; 
    session.setAttribute("basePath",basePath); 
    Boolean isLocal = false; 
    String expDomain = "(\\w+(\\.linked-f\\.com|\\.andexin\\.net|\\.xuecima\\.com|\\.caishuiwenda\\.com|\\.bolue\\.cn))"; 
    if(request.getServerName()!=null){ 
        isLocal = Pattern.matches(expDomain, request.getServerName().trim().toLowerCase()); 
    } 
    session.setAttribute("IS_LOCAL",!isLocal); 
    Object accountId = request.getAttribute("accountId");
    Object accountTitle = request.getAttribute("accountTitle");
    Object accountPhoto = request.getAttribute("accountPhoto");
    Object accountRole = request.getAttribute("accountRole");
    Object courseLanguage = request.getAttribute("courseLanguage")==null?1:request.getAttribute("courseLanguage");
    Object exerciseLanguage = request.getAttribute("exerciseLanguage");
    if(accountPhoto==null || accountPhoto instanceof String == false || accountPhoto.toString().trim().equals("")){
        accountPhoto = basePath +"/images/icos/photo96.jpg";
    }
    session.setAttribute("hasLogined",accountId!=null);
    session.setAttribute("accountId",accountId!=null?accountId:"''");
    session.setAttribute("accountTitle",accountTitle);
    session.setAttribute("accountPhoto",accountPhoto);
    session.setAttribute("hasClass",request.getAttribute("hasClass"));
    session.setAttribute("accountRole",accountRole);
    session.setAttribute("courseLanguage",courseLanguage);
    session.setAttribute("exerciseLanguage",exerciseLanguage);
%>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link type="text/css" rel="stylesheet" href="${basePath}/css/website.min.css?t=${appVersion}" />
    <link rel="stylesheet" href="${basePath}/css/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="${basePath}/css/cimav2.min.css?t=${appVersion}">
    <title>
        铂略CIMA考证培训，管理会计培训，企业财务管理会计证书课程供应商
    </title>
    <meta content="管理会计高级经理人项目是CIMA针对企业财务经理人开设的管理会计师考证项目，审批通过学员可免试14门快速获得全球管理会计师资格证书；铂略为指定报名培训机构。咨询热线：4006890679" name="description">
    <meta content="CIMA，CIMA考证，CIMA证书，皇家特许管理会计师公会，全球特许管理会计师，管理会计，管理会计培训，管理会计师培训，管理会计考证，管理会计师证书，管理会计课程，管理会计师，财务经理证书，高级财务经理证书，财务总监证书" name="keywords">
    <link href="${basePath}/images/icos/favicon.ico" type="image/x-icon" rel="shortcut icon">
    <link href="${basePath}/images/icos/favicon.ico" type="image/x-icon" rel="icon">
	<link href="${basePath}/images/icos/favicon18x18.png" rel="apple-touch-icon"/>
	<link href="${basePath}/images/icos/favicon72x72.png" rel="apple-touch-icon" sizes="72x72"/>
	<link href="${basePath}/images/icos/favicon114x114.png" rel="apple-touch-icon" sizes="114x114"/>
    <meta name="image" content="http://static.xuecima.com/logo/seo-logo.png">
    <meta itemprop="image" content="http://static.xuecima.com/logo/seo-logo.png">
	<script type="text/javascript">
       	var IS_LOCAL = ${IS_LOCAL};var hasLogined = ${hasLogined};
        var basePath= '${basePath}';
        function adaptVP(a){function c(){var c,d;return b.uWidth=a.uWidth?a.uWidth:640,b.dWidth=a.dWidth?a.dWidth:window.screen.width||window.screen.availWidth,b.ratio=window.devicePixelRatio?window.devicePixelRatio:1,b.userAgent=navigator.userAgent,b.bConsole=a.bConsole?a.bConsole:!1,a.mode?(b.mode=a.mode,void 0):(c=b.userAgent.match(/Android/i),c&&(b.mode="android-2.2",d=b.userAgent.match(/Android\s(\d+.\d+)/i),d&&(d=parseFloat(d[1])),2.2==d||2.3==d?b.mode="android-2.2":4.4>d?b.mode="android-dpi":d>=4.4&&(b.mode=b.dWidth>b.uWidth?"android-dpi":"android-scale")),void 0)}function d(){var e,f,g,h,c="",d=!1;switch(b.mode){case"apple":c="width="+b.uWidth+", user-scalable=1";break;case"android-2.2":a.dWidth||(b.dWidth=2==b.ratio?720:1.5==b.ratio?480:1==b.ratio?320:.75==b.ratio?240:480),e=window.screen.width||window.screen.availWidth,320==e?b.dWidth=b.ratio*e:640>e&&(b.dWidth=e),b.mode="android-dpi",d=!0;case"android-dpi":f=160*b.uWidth/b.dWidth*b.ratio,c="target-densitydpi="+f+", width="+b.uWidth+", user-scalable=1",d&&(b.mode="android-2.2");break;case"android-scale":c="width="+b.uWidth+", user-scalable=1"}g=document.querySelector("meta[name='viewport']")||document.createElement("meta"),g.name="viewport",g.content=c,h=document.getElementsByTagName("head"),h.length>0&&h[0].appendChild(g)}function e(){var a="";for(key in b)a+=key+": "+b[key]+"; ";alert(a)}if(a){var b={uWidth:0,dWidth:0,ratio:1,mode:"apple",userAgent:null,bConsole:!1};c(),d(),b.bConsole&&e()}};
        var IsMob = navigator.userAgent.toLocaleLowerCase().indexOf('mobile') > -1;
        window.addEventListener("orientationchange", function() {IsMob && adaptVP && go_VP && go_VP(); }, false);
    </script>
	<script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
</head>