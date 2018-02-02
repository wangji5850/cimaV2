$.extend(exercise_set, {
    init: function() {
    	//收藏题集
        $('.page_list .hot_sheet').on('click', '.store', function() {
        	var _t = $(this);
        	var setId = _t.parents('.li').attr('data-id');
        	
        	if(!_t.hasClass('has_store')) {
        		$.post(G.opt.post_url + '/exsets/'+ setId + '/collect?random='+Math.random(),
                    	{'noteId' : setId},
            			function(d){
                    		_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectNum +")")
                    	});
        	}else {
        		$.post(G.opt.post_url + '/exsets/'+ setId + '/uncollect?random='+Math.random(),
                    	{'noteId' : setId},
            			function(d){
                    		_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectNum +")")
                    	});
        	}
        	_t.toggleClass('has_store');
		});
    },
    //分页
    loadPager: function(pagenumber, totalnumber, pagesize, type) {
        var _t = G;
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
                    _t.set_qa_pn(pageNo);
                    G.exercise_set.pageClick(pageNo, pagesize, type);
                }
            }).show()
            .find('a').prop('href','#mainw_content');
        }
    },
    pageClick: function(pageNo, pageSize, type) {
        var _t = G;
        var url = "";
        if(type == 1) {
        	url = "/exsets/hot";
        }else if(type == 2) {
        	url = "/account/exset-self";
        }
        else if(type == 3) {
        	url = "/account/exset-other";
        }else if(type == 4) {
        	url = "/account/exset-collect";
        }
        
        if(type<2){
            $.get(_t.opt.post_url + url + '?random='+Math.random(),
        			{'pageNo':pageNo,
            	'pageSize':pageSize},
        			function(d){
        				$('.hot_sheet').html('');
                		
                		if(type == 1) {
                			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                    		}else {
                    			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                    		}
                		$('.hot_sheet .chot_sheet').each(function() {
                			$(this).children().last().addClass('last');
                		})
                		G.set_qa_tn(d.data.rowBounds.totalCount);
                        G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                	});
        }else{
        	if(type==3){
        		$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
            			{'pageNo':pageNo,
                		 'pageSize':pageSize,
                		 'accountIdOfAnother' : $("#accountIdOfAnother").val()},
            			function(d){
                			 if(d.flag!=0){console.log(d.msg);return;}
            				$('.hot_sheet').html('');
                    		
                    		if(type == 1) {
                    			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}else {
                        			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}
                    		$('.hot_sheet .chot_sheet').each(function() {
                    			$(this).children().last().addClass('last');
                    		})
                    		G.set_qa_tn(d.data.rowBounds.totalCount);
                            G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                    	});
        	}else{
            	$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
            			{'pageNo':pageNo,
                	'pageSize':pageSize},
            			function(d){
                			if(d.flag!=0){console.log(d.msg);return;}
            				$('.hot_sheet').html('');
                    		
                    		if(type == 1) {
                    			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}else {
                        			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}
                    		$('.hot_sheet .chot_sheet').each(function() {
                    			$(this).children().last().addClass('last');
                    		})
                    		G.set_qa_tn(d.data.rowBounds.totalCount);
                            G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                    	});
        	}
        }
    }

});
$.extend(G, {
	exercise_set: exercise_set
});
