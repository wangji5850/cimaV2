$.extend(search_result, {
	doSearch: function(){
		var keyword = $("#search_input").val();
        if (keyword.length == 0) {
            return false;
        } else if (keyword.length > 1) {
        	window.location.href = G.opt.post_url+ "/search-result?keyword=" + keyword + "&random=" + Math.random();
        } else {
            alert("从没有人不输入两个汉字的，很好，你已经成功引起了我的注意~");
        }
	},
    init: function(keyword) {
        var _t = this;
        //_t.keyword = decodeURI(window.location.search.replace('?', ''));
        _t.keyword = keyword;
        _t.init_data();
        $('#search_input').val(_t.keyword);
    },
    keyword: '',
    //填充数据
    init_data: function() {
        var _t = G;
        //必须输入 keyword ： keyword关键字是问题标题.
        $.get(_t.opt.post_url + '/search/subject?random=' + Math.random(), {
                'keyword': _t.search_result.keyword,
                'pageNo': 1
            },
            function(d) {
                if (d.flag == 0) {
                	_t.show_data(d.data.resultList, $("#tmpl_subject_catalog_list"), $('.p_l_catalog'));
                	if(d.data.numFound>d.data.pageSize){
                		_t.search_result.loadPager(1, d.data.numFound, d.data.pageSize, 1);
                	}
                } else {
                	console.log('网络异常');
                }
            });
    },
    showTab: function(type) {
    	 var _t = G;
    	 var url = "";
         if(type == 1) {
         	url = "subject";
         }else if(type == 2) {
         	url = "question";
         }else if(type == 3) {
         	url = "account";
         }
    	 
         //必须输入 keyword ： keyword关键字是问题标题.
         $.get(_t.opt.post_url + '/search/'+url+'?random=' + Math.random(), {
                 'keyword': _t.search_result.keyword,
                 'pageNo': 1
             },
             function(d) {
                 if (d.flag == 0) {
                	 if(type==1){
                		 $('.p_l_catalog').text('');
                		 _t.show_data(d.data.resultList, $("#tmpl_subject_catalog_list"), $('.p_l_catalog'));
	                     if(d.data.numFound>d.data.pageSize){
	                    		_t.search_result.loadPager(1, d.data.numFound, d.data.pageSize, 1);
	                     }
                	 }else if(type == 2) {
                		 $('.study_area').text('');
                		 _t.show_data(d.data.resultList, $("#tmpl_qa_list"), $('.study_area'));
	                     if(d.data.numFound>d.data.pageSize){
	                    		_t.search_result.loadPager(1, d.data.numFound, d.data.pageSize, 2);
	                     }
                     }else if(type == 3) {
                    	 $('.p_my_focus').text('');
                    	 _t.show_data(d.data.resultList, $("#tmpl_focus_list"), $('.p_my_focus'));
	                     if(d.data.numFound>d.data.pageSize){
	                    		_t.search_result.loadPager(1, d.data.numFound, d.data.pageSize, 3);
	                     }
                     }
                 } else {
                 	console.log('网络异常');
                 }
             }
         );
    },
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
                    G.search_result.pageClick(pageNo, pagesize, type);
                }
            }).show();
        }
    },
    pageClick: function(pageNo, pageSize, type) {
        var _t = G;
        var url = "";
        if(type == 1) {
        	url = "subject";
        }else if(type == 2) {
        	url = "question";
        }else if(type == 3) {
        	url = "account";
        }
        
        $.get(_t.opt.post_url + '/search/'+url+'?random=' + Math.random(), {
            'keyword': _t.search_result.keyword,
            'pageNo': pageNo
        	},
        	function(d){
           	 if(type==1){
        		 $('.p_l_catalog').text('');
        		 _t.show_data(d.data.resultList, $("#tmpl_subject_catalog_list"), $('.p_l_catalog'));
                 if(d.data.numFound>d.data.pageSize){
                	 _t.search_result.loadPager(pageNo, d.data.numFound, d.data.pageSize, 1);
                 }
        	 }else if(type == 2) {
        		 $('.study_area').text('');
        		 _t.show_data(d.data.resultList, $("#tmpl_qa_list"), $('.study_area'));
                 if(d.data.numFound>d.data.pageSize){
                	 _t.search_result.loadPager(pageNo, d.data.numFound, d.data.pageSize, 2);
                 }
             }else if(type == 3) {
            	 $('.p_my_focus').text('');
            	 _t.show_data(d.data.resultList, $("#tmpl_focus_list"), $('.p_my_focus'));
                 if(d.data.numFound>d.data.pageSize){
                	 _t.search_result.loadPager(pageNo, d.data.numFound, d.data.pageSize, 3);
                 }
             }
    	});
    }
});
$.extend(G, {
    search_result: search_result
});
