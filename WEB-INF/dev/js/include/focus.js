$.extend(focus, {
    init: function() {
    	//列表页取消关注
        $('.p_my_focus').on('click', '.focus', function() {
        	var _t = $(this);
        	var accountId = _t.parents('.li').attr('data-id');
        	if(!_t.hasClass('has_focus')){
        		$.myPost(G.opt.post_url + '/account/onFocus?random='+Math.random(),
                	{'accountIdOfToOnFocus' : accountId},
            		function(d){
                		if(d.flag!=0){alert(d.msg);return;}
                		_t.addClass('has_focus');
                	}
                );
        	}else{
            	$.myPost(G.opt.post_url + '/account/offFocus?random='+Math.random(),
                	{'accountIdOfToOnFocus' : accountId},
        			function(d){
                		if(d.flag!=0){alert(d.msg);return;}
                		_t.removeClass('has_focus');
                	}
                );
        	}
		});
        
        //详情页关注
        $('.u_info .operate').on('click', '.btn1', function() {
        	var _t = $(this);
        	var accountId = _t.attr('data-id');
        	if(_t.text() != "已关注") {
        		$.post(G.opt.post_url + '/account/onFocus?random='+Math.random(),
                    	{'accountIdOfToOnFocus' : accountId},
            			function(d){
                    		_t.html("已关注");
                    	});
        	}else {
        		$.post(G.opt.post_url + '/account/offFocus?random='+Math.random(),
                    	{'accountIdOfToOnFocus' : accountId},
            			function(d){
                    		_t.html("+ 关注");
                    	});
        	}
        	
		});
    },
    //分页
    loadPager: function(pagenumber, totalnumber, pagesize) {
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
                    G.focus.pageClick(pageNo,pagesize);
                }
            }).show();
        }
    },
    pageClick: function(pageNo,pageSize) {
        var _t = G;
        $.post(_t.opt.post_url + '/account/focus-self?random='+Math.random(),
    			{'pageNo':pageNo,
				'pageSize':pageSize},
    		   function(d){
           		$('.p_my_focus .ul').html('');
           		G.show_data(d.data.resultList, $("#tmpl_focus_list"), $('.p_my_focus .ul'));
           		/* $('.my_mark').each(function() {
           			$(this).children().last().addClass('last');
           		}) */
           		$('.totalcount').find('i').html(d.data.rowBounds.totalCount)
           		if(d.data.rowBounds.pageCount > 1) {
           			G.focus.loadPager(G.get_qa_pn(), d.data.rowBounds.totalCount, d.data.rowBounds.pageSize);
           		}
           	});
    },

});
$.extend(G, {
	focus: focus
});
