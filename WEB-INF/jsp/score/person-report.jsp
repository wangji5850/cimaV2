<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
        <style>
            .answer{word-break: break-all;}
        </style>

<body>
	<input type="hidden" id="practiceExamDetailId" name="practiceExamDetailId" value="${result.id}">

    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="clearfix relatv mainw p_main_lrsp p_exam p_exam_res">
            <p class="clearfix tit"><span class="fl left">${result.name} <span class="score">( Score : <i class="num">${result.totalFullScore}</i> )</span></span><span class="fr right"><span class="name">${accountTitle}</span><span class="cid">ID：${accountCimaId}</span></span>
            </p>
            <div class="main_l prat_area">
                <div class="relatv content">
                    <p class="btns">
                        <span class="btn btn_detail">Details of the question</span>
                        <span id="referenceMaterials" class="btn btn_matris">Reference Materials</span>
                    </p>
                    <div id="for_cont">
                        <p id="rowBounds_pageNo_div" class="section">Section 1</p>
                        <script id="rowBounds_pageNo_tmpl" type="text/x-jquery-tmpl">
                        	Section {{= rowBounds.pageNo}}
						</script>
                        <div id="peAnswer_answer_div" class="answer">
                        </div>
                        <script id="peAnswer_answer_tmpl" type="text/x-jquery-tmpl">
                        	{{if practiceLanguage==1}}{{html peAnswer.answer}}{{else}}{{html peAnswer.answerForeign}}{{/if}}
						</script>
						
                        <table cellpadding="0" cellspacing="0" class="score_point">
                            <tr id="listPEPointVO_name_div" class="th">
                            </tr>
                            <script id="listPEPointVO_name_tmpl" type="text/x-jquery-tmpl">
								{{each listPEPointVO}}
                    			<td><span>{{if practiceLanguage==1}}{{= name}}{{else}}{{= nameForeign}}{{/if}}</span></td>
								{{/each}}
                    		</script>
                            <tr id="listPEPointVO_content_div" class="descri">
                            </tr>
                            <script id="listPEPointVO_content_tmpl" type="text/x-jquery-tmpl">
								{{each listPEPointVO}}
									{{if fullScore>0}}
									<td><span>{{if practiceLanguage==1}}{{html content}}{{else}}{{html contentForeign}}{{/if}}</span></td>
									{{else}}
									<td><span></span></td>
									{{/if}}
								{{/each}}
                    		</script>
                            <tr id="listPEPointVO_score_div" class="score">
                            </tr>
                    		<script id="listPEPointVO_score_tmpl" type="text/x-jquery-tmpl">
								{{each listPEPointVO}}
								<td>
									{{if fullScore>0}}
									<input type="text" datatype="{{= id}}" value="{{= score}}" disabled="disabled">
									{{else}}
									<input type="text" datatype="{{= id}}" disabled="disabled">
									{{/if}}
								</td>
								{{/each}}
                    		</script>
                        </table>
                        <div class="clearfix">
                        	<script id="peAnswer_isMarked_tmpl" type="text/x-jquery-tmpl">
								<div class="left c3">
                                    Comments:
                                </div>
                                <textarea id="markExplainStr" placeholder="Comments" readonly="true">{{= peAnswer.markExplain}}</textarea>
							</script>
                            <div id="peAnswer_isMarked_div" class="marks">
                            </div>
                            <script id="rowBounds_tmpl" type="text/x-jquery-tmpl">
                            	{{if rowBounds.pageNo==1}}
                                <span class="prev current">&lt;Prev</span>
                            	{{else}}
                                <a href="javascript:scorePEDetail({{= rowBounds.pageNo-1}});" class="prev">&lt;Prev</a>
                            	{{/if}}
                            	{{if rowBounds.pageNo==rowBounds.pageCount}}
                                <span class="next current">Next&gt;</span>
                            	{{else}}
                                <a href="javascript:nextData({{= rowBounds.pageNo+1}},1);" class="next">Next&gt;</a>
                            	{{/if}}
							</script>
                            <div id="rowBounds_div" class="pagination answer_pagen">
                            </div>
                        </div>
                    </div>
                    <div class="reference item_con">
                        <i class="ico close"></i>
                        <div class="lists">
                            <div id="peItem_content_div" class="lst_cont" style="display: block;">
                            </div>
                            <script id="peItem_content_tmpl" type="text/x-jquery-tmpl">
								{{if practiceLanguage==1}}{{html peItem.content}}{{else}}{{html peItem.contentForeign}}{{/if}}
							</script>
                        </div>
                        <span class="btn go_back">back</span>
                    </div>
                    <div class="reference ref_mater">
                        <i class="ico close"></i>
                        <script id="listPEReferenceMaterial_name_tmpl" type="text/x-jquery-tmpl">
                            {{each(i,obj) listPEReferenceMaterial}}
                            <li class="li_c {{if i==0}}curr{{/if}}">{{if practiceLanguage==1}}{{= obj.name}}{{else}}{{= obj.nameForeign}}{{/if}}</li> 
                            {{/each}}
                        </script>
						<script id="listPEReferenceMaterial_materialContent_tmpl" type="text/x-jquery-tmpl">
                        	{{each listPEReferenceMaterial}}
                            <div class="lst_cont">{{if practiceLanguage==1}}{{html materialContent}}{{else}}{{html materialForeignContent}}{{/if}}</div>
                        	{{/each}}
						</script>
                        <ul id="listPEReferenceMaterial_name_div" class="clearfix tabs">
                        </ul>
                        <div id="listPEReferenceMaterial_materialContent_div" class="lists">
                        </div>
                        <span class="btn go_back">back</span>
                    </div>
                </div>
            </div>
            <div class="relatv main_r">
                <div class="inner">
                    <div class="ans_sheet">
                        <p class="c_tit"><i class="ico"></i>Transcript</p>
                        <ul id="listPEItemVO_name_div" class="ul_c">
                        </ul>
                        <script id="listPEItemVO_name_tmpl" type="text/x-jquery-tmpl">
                        	{{each listPEItemVO}}
                            <li id="peItemId{{= id}}" class="li_c new">
                                <span class="s1">0{{= $index+1}}</span>
                                <span class="s2">{{if practiceLanguage==1}}{{= name}}{{else}}{{= nameForeign}}{{/if}}</span>
                            </li>
                        	{{/each}}
						</script>
                    </div>
                </div>
                <div class="btn_operate download" onclick="javascript:$('#downloadForm').submit();"><i class="ico"></i>Download</div>
                <form id="downloadForm" action="${basePath}/score/download-file" method="post">
                    <input type="hidden" id="detailId" name="detailId" value="${result.id}">
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.pagination.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/gloab.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/layer/layer.js?version=0.1166305005534308"></script>
    <script type="text/javascript">
        $(function(){
            //参数page_index{int整型}表示当前的索引页
            /*var initPagination = function() {
                // 创建分页
                $("#pager").pagination(4, {
                    num_edge_entries: 2, //边缘页数
                    items_per_page : 1, //每页显示的条目数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    prev_text:"&lt; Prev",
                    next_text:"Next &gt;",
                });
             }();
             
            function pageselectCallback(page_index, jq){
                var o=$("#pager").children('.current.next');
                if(o.length>0){
                    o.hide().after('<a class="next" href="javascript:;" onclick="layer_tip()">submit &gt;</a>');
                }
                return false;
            }*/
            $('.reference').on('click','.li_c',function(){
                var _t = $(this);
                _t.addClass('curr')
                .siblings('.curr').removeClass('curr')
                .end().parent().next('.lists').find('.lst_cont').eq(_t.index()).show()
                .siblings('.lst_cont').hide();
            }).on('click','.go_back',function(){
                $(this).parent().hide()
                .parent('.content').children('#for_cont').show();

            });
            $('.content .btn_matris').on('click',function(){
                $('.ref_mater').show();
                $('.content #for_cont').hide();
            });
            $('.content .btn_detail').on('click', function() {
                $('.item_con').show();
                $('.content #for_cont,.ref_mater').hide();
            });
            $('.reference .close').on('click',function(){
                $('.reference .go_back').click();
            });
            //读取数据
            $('.reference .li_c').eq(0).click();
        });
        //询问框
        function layer_tip(){
            layer.open({
                skin: 'demo-class',
                title: '提示',
                content:'提交将进入下一题,且不能返回修改。<br />确认提交吗？',
                btn: ['取消','确定'], //按钮
                closeBtn: 1,
                area: ['295px'],
                btn2: function(index){ //或者使用btn2
                //提交试题
                },btn1: function(index, layero){ //或者使用btn1
                console.log(444)
                }
            });
        }
        //答题时间提醒
        $(function() {
            $('.p_scroll').mCustomScrollbar({
                axis:"y",
                scrollButtons:{enable:true},
                theme:"3d",
                scrollbarPosition:"inside"
            });
            
            //加载数据
            scorePEDetail(1);
        });
        
        //模考批卷详情
        function scorePEDetail(pageNo){
        	var practiceExamDetailId=$("#practiceExamDetailId").val();
        	$.post(
       			'${basePath}/practices/score-pedetail?random='+Math.random(),
       			{'practiceExamDetailId':practiceExamDetailId,'pageNo':pageNo},
       			function(d){
       				if(d.data!="" && d.data!=null){
       					$("#practiceExamAnswerId").val(d.data.peAnswer.id);
    		   			//
    		   			$("#peAnswer_answer_div").html('');
    		   			G.show_data(d.data, $("#peAnswer_answer_tmpl"), $("#peAnswer_answer_div"));
    		   			//
    		   			$("#rowBounds_pageNo_div").html('');
    		   			G.show_data(d.data, $("#rowBounds_pageNo_tmpl"), $("#rowBounds_pageNo_div"));
    	   				//
       					$("#listPEPointVO_name_div").html('');
    		   			G.show_data(d.data, $("#listPEPointVO_name_tmpl"), $("#listPEPointVO_name_div"));
    		   			//
    	   				$("#listPEPointVO_content_div").html('');
    		   			G.show_data(d.data, $("#listPEPointVO_content_tmpl"), $("#listPEPointVO_content_div"));
    	   				//
    		   			$("#listPEPointVO_score_div").html('');
    		   			G.show_data(d.data, $("#listPEPointVO_score_tmpl"), $("#listPEPointVO_score_div"));
    		   			$("#peAnswer_isMarked_div").html('');
    		   			G.show_data(d.data, $("#peAnswer_isMarked_tmpl"), $("#peAnswer_isMarked_div"));
    		   			//
    		   			$("#peItem_content_div").html('');
    		   			G.show_data(d.data, $("#peItem_content_tmpl"), $("#peItem_content_div"));
    		   			//
    		   			$("#listPEItemVO_name_div").html('');
    		   			G.show_data(d.data, $("#listPEItemVO_name_tmpl"), $("#listPEItemVO_name_div"));
    		   			$("#peItemId"+d.data.peItem.id).removeClass('new').addClass('has_half now_prog');
    		   			// $('#listPEItemVO_name_div li:last').addClass('last');
    		   			//
    		   			$("#listPEReferenceMaterial_name_div").html('');
    		   			G.show_data(d.data, $("#listPEReferenceMaterial_name_tmpl"), $("#listPEReferenceMaterial_name_div"));
    		   			$("#listPEReferenceMaterial_materialContent_div").html('');
    		   			G.show_data(d.data, $("#listPEReferenceMaterial_materialContent_tmpl"), $("#listPEReferenceMaterial_materialContent_div"));
    		   			$('.reference.ref_mater').hide();
    		   	        $('.reference .li_c').eq(0).click();
    		   	        //
    		   	        if(d.data.listPEReferenceMaterial!=null && d.data.listPEReferenceMaterial!=""){
    		   	        	$("#referenceMaterials").show();
    		   	        }else {
    		   	        	$("#referenceMaterials").hide();
    		   	        }
    		   			//
    		   			$("#rowBounds_div").html('');
    		   			G.show_data(d.data, $("#rowBounds_tmpl"), $("#rowBounds_div"));
    		   			//
    		   			if(d.data.rowBounds.pageCount==d.data.rowBounds.pageNo){
    		   				$('.main_r .btn_ok').show();
    		   			}else {
    		   				$('.main_r .btn_ok').hide();
    		   			}
    		   			//
       				}
       			},
       			'json'
       		);
        }
        
        //Next
        function nextData(pageNo,num){
        	scorePEDetail(pageNo);
        }
    </script>
</body>

</html>

