$.extend(note, {
    init: function() {
        $('.page_list .c_notes').on('click', '.rt_part', function() {
            var _t = $(this);
            _t.find('.ico').toggleClass('arrow')
            .end().parents('.right').children('.div').toggle();
        });
    	//收藏笔记
        $('.page_list .c_notes, .for_note .ul_c').on('click', '.store', function() {
        	var _t = $(this);
        	var noteId = _t.parents('.li_c').attr('data-id');
        	
        	if(!_t.hasClass('has_store')) {
        		$.myPost(G.opt.post_url + '/note/collect?random='+Math.random(),
                    	{'noteId' : noteId},
            			function(d){
                    		if(d.flag == 0) {
                    			_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectCount +")");
                    			_t.toggleClass('has_store');
                    		}
                    		
                    	});
        	}else {
        		$.myPost(G.opt.post_url + '/note/unCollect?random='+Math.random(),
                    	{'noteId' : noteId},
            			function(d){
                    		if(d.flag == 0) {
                    			_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectCount +")");
                    			_t.toggleClass('has_store');
                    		}
                    	});
        	}
        	
		});
        
        //删除笔记
        $('.page_list .c_notes').on('click', '.del', function() {
        	var _t = $(this);
        	var noteId = _t.parents('.li_c').attr('data-id');
        	
        	$.myPost(G.opt.post_url + '/note/delete?random='+Math.random(),
                	{'noteId' : noteId},
        			function(d){
                		_t.parents('.li_c').remove();
                	});
		});
        
        $('.page_list .c_notes').on('click', '.see_more', function() {
        	var _t = $(this);
        	G.note.viewMore(_t);
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
                    G.note.pageClick(pageNo,pagesize, type);
                }
            }).show()
            .find('a').prop('href','#mainw_content');
        }
    },
    pageClick: function(pageNo,pageSize, type) {
        var _t = G;
        var url = "";
        $('.c_notes').html('');
        if(type == 1) {
        	url = "/note/video-list";
        }else if(type == 2) {
        	url = "/account/note-self";
        }
        else if(type == 3) {
        	url = "/account/note-other";
        }else if(type == 4) {
        	url = "/account/note-collect";
        }
        if(type != 3) {
	        $.myPost(_t.opt.post_url + url + '?random='+Math.random(),
	    			{'pageNo':pageNo,
	    			'pageSize':pageSize},
	    			function(d){
	    				if(d.flag!=0){console.log(d.msg);return;}
	            		$('.c_notes').html('');
	            		if(type == 1) {
	            			G.show_data(d.data.videoList, $("#tmpl_video_note_list"), $('.c_notes'));
	            		}else {
	            			show_resultList(d.data.resultList);
	            		}
	            		$('.c_notes .cc_notes').each(function() {
	            			$(this).children().last().addClass('last');
	            		})
	            		G.set_qa_tn(d.data.rowBounds.totalCount);
	                    G.note.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
	            	});
        }else {
        	var otherAccountId = $('#otherAccountId').val();
        	$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
	    			{'accountIdOfAnother':otherAccountId,
        			'pageNo':pageNo,
	    			'pageSize':pageSize},
	    			function(d){
	    				if(d.flag!=0){console.log(d.msg);return;}
	            		$('.c_notes').html('');
	            		if(type == 1) {
	            			G.show_data(d.data.videoList, $("#tmpl_video_note_list"), $('.c_notes'));
	            		}else {
	            			show_resultList(d.data.resultList);
	            		}
	            		$('.c_notes .cc_notes').each(function() {
	            			$(this).children().last().addClass('last');
	            		})
	            		G.set_qa_tn(d.data.rowBounds.totalCount);
	                    G.note.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
	            	});
        }

    },
    // viewMore
    viewMore: function(_p) {
        var _t = G;
        var videoId = _p.parent().parent().attr('data-id');
        var pageNo = _p.prev().attr('data-page');
        var pageSize = _p.prev().attr('data-pagecount');
        $.myPost(_t.opt.post_url + '/note/note-list?random='+Math.random(),
    			{'videoId':videoId,
        		'type' : 0,
    		   'pageNo':parseInt(pageNo)+1,
    		   'pageSize':pageSize},
    			function(d){
    			   if(d.flag!=0){console.log(d.msg);return;}
    			   if (!G.IsEmpty(d.data.noteList)) {
	            		G.show_data(d.data.noteList, $("#tmpl_note_list"), _p.prev());
	            		$('.c_notes .cc_notes').each(function() {
	            			$(this).children().removeClass('last');
	            			$(this).children().last().addClass('last');
	            		})
	            		_p.prev().attr('data-page', parseInt(pageNo)+1);
    			   }
            		if(d.data.rowBounds.pageCount <= d.data.rowBounds.pageNo) {
            			_p.hide();
            		}
            	});
    },

});
$.extend(G, {
    note: note
});
//我的笔记数据显示
function show_resultList(d){
    $('.c_notes').html('');
    $.each(d,function(i,v){
        v.name=v.videoName;
        v.id=v.videoId;
        v.sequence=v.videoSequence;
        $.each(v.noteList,function(j,va){
            va.nickName=va.ownerNickName;
        });
        v.id=v.videoId;
    });
    G.show_data(d, $("#tmpl_video_note_list"), $('.c_notes'));
    $('.c_notes .cc_notes').each(function() {
        $(this).children().last().addClass('last');
    });
}
