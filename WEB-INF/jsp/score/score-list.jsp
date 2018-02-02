<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
<body>
    <div class="section_wrap">
    <input type="hidden" id="uuId" name="uuId" value="${uuId}">
    <input type="hidden" id="flagIndex" name="flagIndex" value="${flagIndex}">
        <a name="web_top"></a>
        <div class="header header_2">
            <div class="main">
                <div class="clearfix mainw">
                    <div class="fl"><img src="${basePath}/images/h_logo3.png" alt="" class="logo" /></div>
                        <div class="fr relatv right_part">
                      <div class="u_info">
                       <a href=""><img class="uPhoto" src="${accountPhoto}" alt="" /><span class="menu">${accountTitle}</span><i class="ico"></i></a> 
                        <ul class="ul">
                            <li class="li_c li7" id="tacher_logout"><a href="${basePath}/teacherLoginOut"><i class="ico"></i>退出登录</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web_main p_paper">
            <div class="content">
                <div class="mainw">
                    <ul class="clearfix tabs">
                        <li id="1" class="li curr">Class list</li>
                        <li id="2" class="li">Expand all </li>
                    </ul>
                    <div id="classgrade_div" class="page_list for_library">
                    </div>
                    <script id="classgrade_tmpl" type="text/x-jquery-tmpl">
						{{each resultList}}
                    	<div class="class_list {{if obj.isUnfold}}collapse{{/if}}">
                            <div class="operate">
                                <span class="btn btn_class">{{if practiceLanguage==1}}{{= obj.name}}{{else}}{{= obj.foreignName}}{{/if}}</span>
                                <span class="fr btn btn_sh" onclick="collapseUnfold(this);">{{if obj.isUnfold}}Collapse{{else}}Unfold{{/if}}</span>
                            </div>
                            <ul class="triangle ul">
                            	{{each list}}
                                <li class="li {{if status==4}}li_ok{{/if}}">
                                    <a href="${basePath}/score-detail?id={{= id}}&uuId=${uuId}" target="_blank">
                            			{{if markCount>0}}
                                        <i class="abs ico"></i>
                            			{{/if}}
                                        <img class="uPhoto" src="{{if G.IsEmpty(photo)}}${basePath}/images/icos/photo.jpg{{else}}{{= photo}}{{/if}}" alt="" />
                                        <span class="span dis_ib">
                                            <span class="name">{{= nickName}}</span>
                                        <span class="id">ID:{{= cimaId}}</span>
                                        </span>
                                    </a>
                                </li>
                            	{{/each}}
                                <div class="clear"></div>
                            </ul>
                        </div>
                        <div class="white"></div>
						{{/each}}
                    </script>
                    
                    <div class="page_list hide for_expand">
                        <div class="operate">
                            <span id="3" data-page="1" class="btn unfinish curr">Processing</span>
                            <span id="4" data-page="1" class="btn complt">Completed</span>
                            <div class="fr pager_num">
                                <label>Showing <i id="loadnumber" class="loadnumber">0</i> of <i id="total" class="total">0</i></label>
                                <span class="relatv num_contr">View: 
                                    <i class="abs ico"></i>
                                    <select id="pageSize" name="pageSize" onchange="pageListPEDetail();">
                                        <option value="40">40</option>
                                        <option value="60">60</option>
                                        <option value="80">80</option>
                                        <option value="100">100</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <ul id="pedetail_div3" class="triangle ul for_unfinish"></ul>
                        <div class="clear"></div>
                        <ul id="pedetail_div4" class="triangle ul no_dis for_complt"></ul>
                        <div class="clear"></div>
                        <script id="pedetail_tmpl" type="text/x-jquery-tmpl">
                            <li class="li ">
								<a href="${basePath}/score-detail?id={{= id}}&uuId=${uuId}" target="_blank">
                                	{{if markCount>0}}
                                    <i class="abs ico"></i>
                                	{{/if}}
                                    <img class="uPhoto" src="{{if G.IsEmpty(photo)}}${basePath}/images/icos/photo.jpg{{else}}{{= photo}}{{/if}}" alt="" />
                                    <span class="span dis_ib">
                                        <span class="name">{{= nickName}}</span>
                                    <span class="id">ID:{{= cimaId}}</span>
                                    </span>
                                </a>
                            </li>
                        </script>
                        <jsp:include page="../include/pager.jsp"></jsp:include>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.pager.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/gloab.min.js"></script>
    <script type="text/javascript">
    $(function() {
        $('.for_expand .operate .btn').on('click', function() {
            var _t = $(this);
            _t.addClass('curr')
                .siblings().removeClass('curr');
            $('.for_expand .ul').eq(_t.index()).show()
                .siblings('.ul').hide();
            pageListPEDetail();
        });
        $('.for_library .operate .btn_sh').on('click', function() {
            var _t = $(this);
            _t.text() == 'Unfold' ? _t.text('Collapse') : _t.text('Unfold');
            _t.parents('.class_list').toggleClass('collapse');
        });
        $('.tabs .li').on('click', function() {
            var _t = $(this);
            _t.addClass('curr')
                .siblings().removeClass('curr');
            $('.p_paper .page_list').eq(_t.index()).show()
                .siblings('.page_list').hide();
            var id=_t.attr('id');
            $("#flagIndex").val(id);
            if(id==2){
            	pageListPEDetail();
            }else {
            	listPEClassGrade();
            }
        });
        //初始化数据
        var flagIndex=${flagIndex};
        if(flagIndex==2){
        	$('.tabs .li').each(function(){
        		var id=$(this).attr('id');
        		if(id==2){
        			$(this).addClass('curr').siblings().removeClass('curr');
                	$('.p_paper .page_list').eq($(this).index()).show().siblings('.page_list').hide();
        		}
        	});
        	pageListPEDetail();
        }else {
        	listPEClassGrade();
        }
    });
    //跳转到打分详情页
    function scoreDetail(o,id){
        var uuId=$("#uuId").val();
        var flagIndex=$("#flagIndex").val();
        $(o).prop('href', '${basePath}/score-detail?id='+id+'&uuId='+uuId+'&flagIndex='+flagIndex);
        return false;
    }
    //Library size
    function listPEClassGrade(){
    	$.post(
   			'${basePath}/score/list-peclassgrade?random='+Math.random(),
   			{'uuId':'${uuId}'},
   			function(d){
   				if(d.data!="" && d.data!=null){
   					//班级所属年级列表
	   				$("#classgrade_div").html('');
		   			G.show_data(d.data, $("#classgrade_tmpl"), $("#classgrade_div"));
   				}
   			},
   			'json'
   		);
    }
    function collapseUnfold(obj){
    	var _t = $(obj);
        _t.text() == 'Unfold' ? _t.text('Collapse') : _t.text('Unfold');
        _t.parents('.class_list').toggleClass('collapse');
    }
    //Expand all
    function pageListPEDetail(){
    	var uuId='${uuId}';
    	var pageSize=$('#pageSize').val();
    	var status=$('.for_expand .operate .curr').attr('id');
    	$.post(
   			'${basePath}/score/pagelist-pedetail?random='+Math.random(),
   			{'uuId':uuId,'status':status,'pageSize':pageSize,'pageNo':1},
   			function(d){
   				if(d.data!="" && d.data!=null){
   					//分页查询模考批卷列表
	   				$("#pedetail_div"+status).html('');
		   			G.show_data(d.data.resultList, $("#pedetail_tmpl"), $("#pedetail_div"+status));
		   			setDataPage(1);
		   			loadPager(getDataPage(), d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, uuId, status);
		   			$("#loadnumber").html(pageSize);
		   			$("#total").html(d.data.rowBounds.totalCount);
   				}
   			},
   			'json'
   		);
    }
  	//分页
  	function getDataPage() {
        return $('.for_expand .operate .curr').attr('data-page');
    }
  	function setDataPage(s) {
        $('.for_expand .operate .curr').attr('data-page', s);
    }
    function loadPager(pagenumber, totalnumber, pagesize, uuId, status) {
        $("#pageNo").val(pagenumber);
        $("#pageCount").val(Math.ceil(totalnumber / pagesize));
        $("#totalCount").val(totalnumber);
        var pn = pagenumber,
            pc = Math.ceil(totalnumber / pagesize),
            tn = totalnumber;
        if (pc <= 1) {
            $("#pager").hide();
        }else {
            $("#pager").pager({
                pagenumber: pn,
                pagecount: pc,
                totalnumber: tn,
                buttonClickCallback: function(pageNo) {
                	setDataPage(pageNo);
                    pageClick(pageNo,pagesize, uuId, status);
                }
            }).show();
        }
    }
    function pageClick(pageNo,pageSize, uuId, status) {
        $.post('${basePath}/score/pagelist-pedetail?random='+Math.random(),
  			{'pageNo':pageNo,
  			'pageSize':pageSize,
  			'uuId':uuId,
  			'status':status},
  			function(d){
  				$("#pedetail_div"+status).html('');
	   			G.show_data(d.data.resultList, $("#pedetail_tmpl"), $("#pedetail_div"+status));
          		loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, uuId, status);
       });
    };
   
    </script>
</body>

</html>
