$.extend(qa, {
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
                    G.qa.pageClick(pageNo, pagesize, type);
                }
            }).show()
            .find('a').prop('href','#mainw_content');
        }
    },
    pageClick: function(pageNo, pageSize, type) {
        var _t = G;
        var url = "";
        if(type == 1) {
        	url = "/question/hot-question";
        }else if(type == 2) {
        	url = "/account/qa-self";
        }
        else if(type == 3) {
        	url = "/account/qa-other";
        }else if(type == 4) {
        	url = "/account/qa-focus";
        }
        $.myPost(_t.opt.post_url + url + '?random='+Math.random(),
    			{'pageNo':pageNo,
        	'pageSize':pageSize},
    			function(d){
        			if(d.flag!=0){console.log(d.msg);return;}
    				$('#div_qa_list').html('');
    				G.show_data(d.data.resultList, $("#tmpl_qa_list"), $('#div_qa_list'));
    				G.spreadParg($('.study_area .cont'), 2);
            		G.set_qa_tn(d.data.rowBounds.totalCount);
                    G.qa.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
            	});

    }

});
$.extend(G, {
	qa: qa
});
