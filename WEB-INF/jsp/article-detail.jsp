<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="include/top.jsp"></jsp:include>
        <div class="p_checkmore p_checkarticle">
            <div class="floor floor1 m_floor1">
                <div class="wrapper clearfix">
                    <div class="main_l fl">
                        <p class="tit fz18">
                            <span class="line"></span>干货专区
                        </p>
                        <ul class="catalog tabs">
                            <li class="li <c:if test="${examPrefectureVO.type==1}">curr</c:if>" data-type="1"><i></i>报考指南</li>
                            <li class="li <c:if test="${examPrefectureVO.type==2}">curr</c:if>" data-type="2"><i></i>备考干货</li>
                            <li class="li <c:if test="${examPrefectureVO.type==3}">curr</c:if>" data-type="3"><i></i>协会动态</li>
                            <li class="li <c:if test="${examPrefectureVO.type==4}">curr</c:if>" data-type="4"><i></i>研究报告</li>
                            <li class="li <c:if test="${examPrefectureVO.type==5}">curr</c:if>" data-type="5"><i></i>铂略管会</li>
                            <li class="li <c:if test="${examPrefectureVO.type==6}">curr</c:if>" data-type="6"><i></i>Q&A大全</li>
                            <li class="li <c:if test="${examPrefectureVO.type==7}">curr</c:if>" data-type="7"><a href="${basePath}/htmlcima/quafly.html">免试申请</a></li>
                        </ul>
                    </div>
                    <div class="main_r fr">
                        <p class="tit">${examPrefectureVO.title}</p>
                        
                        <div class="tip clearfix">
                            <a class="time tag"><i></i>发布时间：${examPrefectureVO.createTimeString}</a>
                            <c:if test="${examPrefectureVO.source != null && examPrefectureVO.source != ''}"><a class="artfrom tag"><i></i>来源：${examPrefectureVO.source}</a></c:if>

                            <span class="tag"><a class="share jiathis"><i></i>分享到...</a></span>

                            <c:if test="${examPrefectureVO.examAttach!=null && examPrefectureVO.examAttach.downloadLink != null && examPrefectureVO.examAttach.downloadLink != ''}">
                            <a class="download tag" href="javascript:;"><i></i>下载资料</a>
                        </c:if>
                        </div>
                        <script>
                            $(function(){
                                var num = $('.tip .tag').length;
                                var w = parseFloat(1/num)*100+'%';
                                $('.tip .tag').css('width',w);
                          })


                        </script>
                        <div class="con" onselectstart="return false;" unselectable="on">${examPrefectureVO.content}</div>
                        <div class="clearfix btn_wrap">
                            <p class="fl">
                                <c:if test="${examPrefectureVO.beforeId!=null}">
                                        <a href="${basePath}/exampa/${examPrefectureVO.beforeId}" title="${examPrefectureVO.beforeTitle}"> 上一篇：${examPrefectureVO.beforeTitle}</a>
                                </c:if>
                            </p>
                            <p class="fr">
                                <c:if test="${examPrefectureVO.afterId!=null}">
                                        <a href="${basePath}/exampa/${examPrefectureVO.afterId}" title="${examPrefectureVO.afterTitle}">下一篇：${examPrefectureVO.afterTitle}</a>
                                </c:if>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="floor floor2 m-floor4 m-apply">
                <p class="fz36">免试申请通道</p>
                <p class="fz14">
                    <span>CIMA学习指南</span>
                    <span>CIMA职业框架 </span>
                    <span> CIMA项目手册</span>
                    <span>最新考试真题</span>
                    <span>内部讲义等</span>
                </p>
           <div class="wrapper">
               <div class="enroll" id="enroll">
                <div class="clearfix relatv mainw m-form">
                        <div class="div">
                            <input type="text" class="name" placeholder="姓名/Name" id="txt_name" />
                            <div class="error"><i class="ico"></i>姓名不能为空</div>
                        </div>
                        <div class="div">
                        <input type="text" class="mobile" placeholder="手机/Mobile" id="txt_phone" />
                         <div class="error"><i class="ico"></i>手机号码格式不正确</div>
                        </div>
                        <div class="div last">
                        <input type="text" class="email" placeholder="邮箱/E-mail" id="txt_email"/>
                        <div class="error"><i class="ico"></i>邮箱格式不正确</div>
                        </div>
                </div>
                <input type="button" class="btn" value="立即申请" onclick="javascript:G.apply_less($('.m-apply'));" />
            </div>
        </div>
            </div>
        </div>
        <script>
        $(function() {
             articleDes.init();
             $('.download').click(function(){
                 G.getUserInf(function(d) {
                     if (d.flag != 0) {
                          layer.msg("请先登录");
                     }else{
                         window.open('${basePath}/exampa/download-file?downloadName=${examPrefectureVO.examAttach.fileName}&downloadPath=${examPrefectureVO.examAttach.downloadLink}');
                     }
                 });

             });
         });
        </script>
        <!-- JiaThis Button BEGIN -->
        <script type="text/javascript" >
        var jiathis_config={
            data_track_clickback:true,
            siteNum:2,
            sm:"weixin,email",
            shortUrl:true,
            hideMore:true
        }
        </script>
        <script type="text/javascript" src="//v3.jiathis.com/code_mini/jia.js?uid=1965839" charset="utf-8"></script>
        <!-- JiaThis Button END -->
        <jsp:include page="include/footer.jsp"></jsp:include>
