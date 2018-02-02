<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>


    <style type="text/css">
        .answer-feedback .layui-layer-content, .answer-feedback .layui-layer-btn{text-align: center;}
        .answer-feedback .layui-layer-btn{padding-bottom: 26px!important;}
        .answer-feedback .layui-layer-btn a{border: 0; border-radius:15px;color: #fff; width: 80px;height: 26px;line-height: 25px;text-align: center;padding: 0;}
        .answer-feedback .layui-layer-btn .layui-layer-btn0,.answer-feedback .layui-layer-btn .layui-layer-btn2{background-color: #A8A8A8;}
        .answer-feedback .layui-layer-btn .layui-layer-btn1{background-color: #1FA0E2;}
        .answer-feedback .layui-layer-btn .layui-layer-btn0:hover,.answer-feedback .layui-layer-btn .layui-layer-btn2:hover{background-color: #666;}
        .answer-feedback .layui-layer-btn .layui-layer-btn1:hover{background-color: #0F8FD0;}
        .answer-feedback .layui-layer-title{border-bottom:none; background-color: transparent;font-size: 16px;font-weight: bold;font-family: "Arial";height: 60px;line-height: 60px; padding: 0; text-align: center;}
        .er-tips-class.layui-layer-tips .layui-layer-content{border: 1px #E0E1E0 solid; color: #333;}
        .er-tips-class.layui-layer-tips i.layui-layer-TipsR{border-bottom-color: #fff;}
        .answer{word-break: break-all;}
    </style>


<body>

    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="header header_2">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl" id="p_teacher_logo"><img src="${basePath}/images/h_logo3.png" alt="" class="logo"/></div>
                       <div class="fr relatv right_part">
                      <div class="u_info">
                      <a href="">
                          <img class="uPhoto" src="${accountPhoto}" alt="" /><span class="menu">${accountTitle}</span><i class="ico"></i> </a>
                        <ul class="ul">
                            <li class="li_c li7" id="tacher_logout"><a href="${basePath}/teacherLoginOut"><i class="ico"></i>退出登录</a></li>
                        </ul>
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <form id="scoreSubmit" action="${basePath}/score/score-submit?uuId=${uuId}" method="post">
	        <input type="hidden" id="practiceExamDetailId" name="practiceExamDetailId" value="${id}">
	        <input type="hidden" id="pageNo" name="pageNo" value="1">
	        <input type="hidden" id="practiceExamAnswerId" name="practiceExamAnswerId" value="">
	        <input type="hidden" id="isMarked" name="isMarked" value="">
	        <input type="hidden" id="markExplain" name="markExplain" value="">
	        <input type="hidden" id="str" name="str" value="">
	        <input type="hidden" id="performanceFeedback" name="performanceFeedback" value="">
	        <input type="hidden" id="uuId" name="uuId" value="${uuId}">
	        <input type="hidden" id="flagIndex" name="flagIndex" value="${flagIndex}">
        </form>
        <form id="scorePreview" action="${basePath}/score/score-preview?uuId=${uuId}" method="post" target="_blank">
	        <input type="hidden" id="peDetailId" name="peDetailId" value="${id}">
	        <input type="hidden" id="peContent" name="peContent" value="">
        </form>
        <div class="clearfix mainw p_main_lrsp p_exam">
            <p class="clearfix tit"><span class="fl left">Management Case Study Exam</span><span class="fr right"><span class="name" id="peDetailVONickName"></span>&nbsp;&nbsp;<span class="cid">ID:<span id="peDetailVOCimaId"></span></span></span></p>
            <div class="main_l prat_area">
                <div class="relatv content">
                    <p class="btns">
                        <span class="btn btn_detail">Details of the task</span>
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
									<input type="text" id="scoreId" datatype="{{= id}}" value="{{= score}}" placeholder="score (full mark : {{= fullScore}})" data-limt="{{= fullScore}}">
									{{else}}
									<input type="text" id="scoreId" datatype="{{= id}}" disabled="disabled" data-limt="{{= fullScore}}">
									{{/if}}
								</td>
								{{/each}}
                    		</script>
                        </table>
                        
                        <div class="clearfix">
                            <script id="peAnswer_isMarked_tmpl" type="text/x-jquery-tmpl">
                                <div id="isMarkedStr" datatype="{{if peAnswer.isMarked==1}}1{{else}}0{{/if}}" onclick="peAnswerIsMarked(this);" class="left {{if peAnswer.isMarked==1}}has_mark{{/if}}">
                                    <i class="ico"></i>
                                    <span class="dis_ib word">Mark</span>
                                </div>
                                <textarea id="markExplainStr" placeholder="Comments">{{= peAnswer.markExplain}}</textarea>
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
                                <a href="javascript:nextData(1,2);" class="next">Next&gt;</a>
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
                        <p class="c_tit"><i class="ico"></i>Answer sheet</p>
                        <ul id="listPEItemVO_name_div" class="ul_c">
                        </ul>
                        <script id="listPEItemVO_name_tmpl" type="text/x-jquery-tmpl">
                        	{{each listPEItemVO}}
                            <li id="peItemId{{= id}}" class="li_c {{if markingStatus==2}}has_finish{{else}}new{{/if}}">
                                <span class="s1">0{{= $index+1}}</span>
                                <span class="s2">{{if practiceLanguage==1}}{{= name}}{{else}}{{= nameForeign}}{{/if}}</span>
								{{if isMarked==1}}
                                <i class="ico has_mark"></i>
								{{/if}}
                            </li>
                        	{{/each}}
						</script>
                    </div>
                </div>
                <!-- 
                <div class="btn_ok">Submit</div>
                 -->
                <div class="btn_operate download" onclick="javascript:$('#downloadForm').submit();"><i class="ico"></i>Download</div>
                <form id="downloadForm" action="${basePath}/score/download-file" method="post">
					<input type="hidden" id="detailId" name="detailId" value="${id}">
				</form>
            </div>
            <div id="feedback" class="feedback">
                <textarea id="feedbackStr"></textarea>
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
    <script type="text/javascript" src="${basePath}/js/cimav2.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/layer/layer.js?version=0.1166305005534308"></script>
    <script type="text/javascript">
    $(function() {
        //参数page_index{int整型}表示当前的索引页
        /*var initPagination = function() {
            // 创建分页
            $("#pager").pagination(4, {
                num_edge_entries: 2, //边缘页数
                items_per_page: 1, //每页显示的条目数
                num_display_entries: 4, //主体页数
                callback: pageselectCallback,
                prev_text: "&lt; Prev",
                next_text: "Next &gt;",
            });
        }();

        function pageselectCallback(page_index, jq) {
            var o = $("#pager").children('.current.next');
            return false;
        }*/
        $('.p_exam .marks .left').on('click', function() {
            $('.p_exam .marks textarea').val() == '' && $(this).toggleClass('has_mark');
        });
        $('.p_exam .marks textarea').on('keyup', function() {
            $('.p_exam .marks .left').addClass('has_mark');
        });
        $('.ref_mater').on('click', '.li_c', function() {
            var _t = $(this);
            _t.addClass('curr')
                .siblings('.curr').removeClass('curr')
                .end().parent().next('.lists').find('.lst_cont').eq(_t.index()).show()
                .siblings('.lst_cont').hide();
        });
        $('.content .btn_matris').on('click', function() {
            $('.ref_mater').show();
            $('.content #for_cont,.item_con').hide();
        });
        $('.content .btn_detail').on('click', function() {
            $('.item_con').show();
            $('.content #for_cont,.ref_mater').hide();
        });
        $('.reference').on('click', '.go_back', function() {
            $(this).parent().hide()
                .parent('.content').children('#for_cont').show();

        }).on('click','.close', function() {
            $('.reference .go_back').click();
        });
    });
    $(function() {
        //绑定feedback 弹窗
        /*
        $('.main_r .btn_ok').hide();
        $('.main_r .btn_ok').on('click',function(){
        	nextData(1,2);
        });*/
        $('.score_point .score').on('blur', 'input', function() {
            var _t = $(this),
                _limt = _t.data('limt');
            (_limt && _t.val()!=0 && _t.val()) ? (_limt < parseInt(_t.val()) ? show_error(_t.attr('placeholder'),_t) : _t.removeClass('error')) : '';
        }).on('keyup', 'input', function() {
            var _t = $(this);
                // _v = parseInt(_t.val());
                _t.removeClass('error');
                layer.closeAll('tips');
                // _v || _v==0 ? _t.val(_v) : _t.val('');
                _t.val(_t.val().replace(/\D\S*/,''))
        });

        $('.p_scroll').mCustomScrollbar({
            axis: "y",
            scrollButtons: {
                enable: true
            },
            theme: "3d",
            scrollbarPosition: "inside"
        });
        //加载数据
        scorePEDetail(1);
    });
    function show_error(str,obj){
        obj.addClass('error');
        layer.tips(str,obj,{
            tips: [1,'#fff'],
            time: 4000,
            skin: 'er-tips-class',
        });
    }
    //标记
    function peAnswerIsMarked(obj){
    	var objM=$(obj);
    	if(objM.attr('datatype')==1){
    		objM.attr('datatype',0);
    		objM.removeClass('has_mark');
    	}else {
    		objM.attr('datatype',1);
    		objM.addClass('has_mark');
    	}
    }
    //模考批卷详情
    function scorePEDetail(pageNo){
    	var practiceExamDetailId=$("#practiceExamDetailId").val();
    	$.post(
   			'${basePath}/score/score-pedetail?random='+Math.random(),
   			{'practiceExamDetailId':practiceExamDetailId,'pageNo':pageNo},
   			function(d){
   				if(d.data!="" && d.data!=null){
   					$("#practiceExamAnswerId").val(d.data.peAnswer.id);
   					$("#peDetailVONickName").html(d.data.peDetailVO.nickName);
   					$("#peDetailVOCimaId").html(d.data.peDetailVO.cimaId);
   					
		   			//
		   			$("#peAnswer_answer_div").html('');
		   			G.show_data(d.data, $("#peAnswer_answer_tmpl"), $("#peAnswer_answer_div"));
		   			//
		   			$("#rowBounds_pageNo_div").html('').attr('pageno',d.data.rowBounds.pageNo);
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
	   				//
		   			$("#peAnswer_isMarked_div").html('');
		   			G.show_data(d.data, $("#peAnswer_isMarked_tmpl"), $("#peAnswer_isMarked_div"));
		   			//
		   			$("#peItem_content_div").html('');
		   			G.show_data(d.data, $("#peItem_content_tmpl"), $("#peItem_content_div"));
		   			//
		   			$("#listPEItemVO_name_div").html('');
		   			G.show_data(d.data, $("#listPEItemVO_name_tmpl"), $("#listPEItemVO_name_div"));
		   			$("#peItemId"+d.data.peItem.id).removeClass('has_finish new').addClass('has_half now_prog');
		   			//
		   			$("#listPEReferenceMaterial_name_div").html('');
		   			G.show_data(d.data, $("#listPEReferenceMaterial_name_tmpl"), $("#listPEReferenceMaterial_name_div"));
		   			$('#listPEReferenceMaterial_name_div').find('.li_c').find('.pageNum').text($("#rowBounds_pageNo_div").attr('pageno'));
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
   				}
   			},
   			'json'
   		);
    }
    //layerOpen
    function layerOpen(){
    	layer.open({
            type: 1,
            shade: [1,'rgba(0,0,0,0.6)'],
            skin : 'answer-feedback',
            title:['Performance Feedback',''],
            content: $('#feedback'), //这里content是一个DOM
            btn: ['Skip','Submit','Preview'], //按钮
            closeBtn: 1,
            area: ['462px','320px'],
            btn3: function(index){
            	//Preview
            	var feedbackStr=$.trim($('#feedbackStr').val());
             	$('#peContent').val(feedbackStr);
             	$('#scorePreview').submit();
            },
            btn2: function(index){
            	//Submit
            	var feedbackStr=$.trim($('#feedbackStr').val());
             	$('#performanceFeedback').val(feedbackStr);
             	$('#scoreSubmit').submit();
            },
            btn1: function(index, layero){
				//Skip
            	$('#performanceFeedback').val('');
             	$('#scoreSubmit').submit();
            }
        });
    }
    //Next
    function nextData(pageNo,num){
    	var practiceExamDetailId=$.trim($("#practiceExamDetailId").val());
    	var practiceExamAnswerId=$.trim($("#practiceExamAnswerId").val());
    	var isMarkedStr=$("#isMarkedStr").attr('datatype');
    	var markExplainStr=$.trim($("#markExplainStr").val());
    	var flag=true;
    	$('input[id="scoreId"]').each(function(i){
        	var score=$.trim($(this).val());
        	var limt=parseInt($(this).attr('data-limt'));
        	if(limt>0){
	        	if(score>limt || score==""){
	        		show_error($(this).attr('placeholder'),$(this));
	        		flag=false;
	        		return;
	        	}
        	}
    	});
    	//提交数据
    	if(flag){
    		var str='';
	    	$('input[id="scoreId"]').each(function(i){
	        	var datatype=$.trim($(this).attr('datatype'));
	        	var limt=parseInt($(this).attr('data-limt'));
	        	var score=$.trim($(this).val());
	        	if(limt>0){
	        		str=str+datatype+','+score+'@';
	        	}else {
	        		str=str+datatype+','+-1+'@';
	        	}
	    	});
	    	//
	    	$.post(
	    		'${basePath}/score/pe-score?random='+Math.random(),
       			{'practiceExamDetailId':practiceExamDetailId,'practiceExamAnswerId':practiceExamAnswerId,
	    		'isMarked':isMarkedStr,'markExplain':markExplainStr,'str':str},
       			function(d){
       				if(d.flag==0){
       	             	$('#feedbackStr').val(d.data.performanceFeedback);
       					if(num==1){
       						scorePEDetail(pageNo);
       					}else {
       						layerOpen();
       					}
       				}else if (d.flag == 1){
                        alert('请先登录');
       					window.location.href = d.data;
       				} else {
                        alert('操作失败');
                    }
       			},
       			'json'
       		);
    	}
    };
    //点击logo跳转
    var reqObj=reqStr2Obj();
    $('#p_teacher_logo').click(function(){
         window.location.href='${basePath}/score-list?uuId='+reqObj.uuId;
    });
   
    </script>
</body>

</html>
