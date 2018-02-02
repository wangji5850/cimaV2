$.extend(video, {
    init: function() {
    	//标记视频
        $('.page_list .p_l_catalog').on('click', '.mark', function() {
        	var _t = $(this);
        	var videoId = _t.parents('.li_c').attr('data-id');
        	
        	if(!_t.hasClass('has_mark')) {
        		$.myPost(G.opt.post_url + '/course/mark?random='+Math.random(),
                    	{'id' : videoId},
            			function(d){
                    		if(d.flag == 0) {
                    			_t.toggleClass('has_mark');
                    		}
                    	});
        	}else {
        		$.post(G.opt.post_url + '/course/unMark?random='+Math.random(),
                    	{'id' : videoId},
            			function(d){
                    		if(d.flag == 0) {
                    			_t.toggleClass('has_mark');
                    		}
                    	});
        	}
        	
		});
		$('.page_list .my_mark').on('click', '.mark', function() {
        	var _t = $(this);
        	var videoId = _t.parents('.li_c').attr('data-id');
        	
        	if(_t.hasClass('no_mark')) {
        		$.post(G.opt.post_url + '/course/mark?random='+Math.random(),
                    	{'id' : videoId},
            			function(d){
                    		
                    	});
        	}else {
        		$.post(G.opt.post_url + '/course/unMark?random='+Math.random(),
                    	{'id' : videoId},
            			function(d){
                    		
                    	});
        	}
        	_t.toggleClass('no_mark');
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
                    G.video.pageClick(pageNo, pagesize, type);
                }
            }).show();
        }
    },
    pageClick: function(pageNo, pageSize, type) {
        var _t = G;
        var url = "";
        if(type == 2) {
        	url = "/account/mark-self";
        	$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
        			{'pageNo':pageNo,
            		'pageSize':pageSize},
        			function(d){
            			if(d.flag!=0){console.log(d.msg);return;}
        				$('.my_mark').html('');
        				G.show_data(d.data.resultList, $("#tmpl_mark_list"), $('.my_mark'));
                		G.set_qa_tn(d.data.rowBounds.totalCount);
                        G.video.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                	});
        }
        else if(type == 3) {
        	url = "/account/mark-other";
        	var otherAccountId = $('#otherAccountId').val();
        	$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
        			{'accountIdOfAnother':otherAccountId,
        			'pageNo':pageNo,
            		'pageSize':pageSize},
        			function(d){
            			if(d.flag!=0){console.log(d.msg);return;}
        				$('.my_mark').html('');
        				G.show_data(d.data.resultList, $("#tmpl_mark_list"), $('.my_mark'));
                		G.set_qa_tn(d.data.rowBounds.totalCount);
                        G.video.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                	});
        }
        

    }


});
$.extend(G, {
	video: video
});
