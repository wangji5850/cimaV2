$.extend(exset_detail, {
    init: function() {
    },
    // 页码
    get_detail_pn: function() {
        return $('#exser_detail_ul').attr('data-page');
    },
    set_detail_pn: function(s) {
        $('#exser_detail_ul').attr('data-page', s);
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
                	G.exset_detail.set_detail_pn(pageNo);
                    G.exset_detail.pageClick(pageNo);
                }
            }).show();
        }
    },
    pageClick: function(pageNo) {
        var _t = G;
        $.get(_t.opt.post_url + '/exsets/'+$("#exsetId").val()+'?random='+Math.random(),
    			{'pageNo':pageNo, 'pageSize':5},
    			function(d){
    				$('#exser_detail_ul').children(".li").remove();
    				G.show_data(d.data.exsetVo, $("#tmpl_exset_detail_list"), $('#exser_detail_ul'));
            		G.exset_detail.set_detail_pn(d.data.rowBounds.totalCount);
            		G.exset_detail.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize);
            	});

    }

});
$.extend(G, {
	exset_detail: exset_detail
});
