/*
* jQuery pager plugin
* Version 1.0 (12/22/2008)
* @requires jQuery v1.2.6 or later
*
* Example at: http://jonpauldavies.github.com/JQuery/Pager/PagerDemo.html
*
* Copyright (c) 2008-2009 Jon Paul Davies
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Read the related blog post and contact the author at http://www.j-dee.com/2008/12/22/jquery-pager-plugin/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage: .pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PagerClickTest });
*
* Where pagenumber is the visible page number
*       pagecount is the total number of pages to display
*       buttonClickCallback is the method to fire when a pager button is clicked.
*
* buttonClickCallback signiture is PagerClickTest = function(pageclickednumber) 
* Where pageclickednumber is the number of the page clicked in the control.
*
* The included Pager.CSS file is a dependancy but can obviously tweaked to your wishes
* Tested in IE6 IE7 Firefox & Safari. Any browser strangeness, please report.
*/
(function($) {

    $.fn.pager = function(options) {

        var opts = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {

        // empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(parseInt(options.totalnumber),parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));
            
            // specify correct cursor activity
            $('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
        });
    };

    // render and return the pager with the supplied options
    function renderpager(totalnumber,pagenumber, pagecount, buttonClickCallback) {

        // setup $pager to hold render
        var $pager = $('<div class="page"></div>');
        //$pager.append('<li class="pgtotal">共'+pagecount+'页'+totalnumber+'条</li>'
        		
        		//renderButton('共'+pagecount+'页'+totalnumber+'条')
        		
        //);
        // add in the 上一页ious and 下一页 buttons
         // $pager.append(renderButton('首页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('上一页', pagenumber, pagecount, buttonClickCallback));
         $pager.append(renderButton('上一页', pagenumber, pagecount, buttonClickCallback));

        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in 下一页 version ) so handle edge cases
        var startPoint = 1;
        var endPoint = 3;

        if (pagenumber > 1) {
            startPoint = pagenumber - 1;
            endPoint = pagenumber + 1;
        }

        if (endPoint > pagecount) {
            startPoint = pagecount - 2;
            endPoint = pagecount;
        }

        if (startPoint < 1) {
            startPoint = 1;
        }
        
        if(startPoint > 1){
        	var firstButton = $('<a href="javascript:void(0)">' + (1) + '</a>');
        	firstButton.click(function() { buttonClickCallback(this.firstChild.data); });
        	firstButton.appendTo($pager);
        	if(startPoint-1 != 1){
        		var hasMore = $('<span>...</span>');
        		hasMore.appendTo($pager);
        	}
        }

        // loop thru visible pages and render buttons
        for (var page = startPoint; page <= endPoint; page++) {

            var currentButton = $('<a href="javascript:void(0)">' + (page) + '</a>');

            page == pagenumber ? currentButton.addClass('current') : currentButton.click(function() { buttonClickCallback(this.firstChild.data); });
            currentButton.appendTo($pager);
        }
        
        if(endPoint < pagecount){
        	if(pagecount-1 != endPoint){
        		var hasMore = $('<span>...</span>');
        		hasMore.appendTo($pager);
        	}
        	
        	currentButton = $('<a href="javascript:void(0)">' + (pagecount) + '</a>');
            currentButton.click(function() { buttonClickCallback(this.firstChild.data); });
            currentButton.appendTo($pager);
        }

        // render in the 下一页 and 尾页 buttons before returning the whole rendered control back.
        // $pager.append(renderButton('下一页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('尾页', pagenumber, pagecount, buttonClickCallback));
        $pager.append(renderButton('下一页', pagenumber, pagecount, buttonClickCallback));
        
        //goto page
        var gotoPage = $('<input type="text" id="gotoNum" value="' + pagenumber + '"/>');
        gotoPage.keypress(function(e){										
			var curKey = e.which;
			if(curKey==13){
				var pageNo = $(this).val();
				if(pageNo>=1&&pageNo<=pagecount){
					buttonClickCallback(pageNo);
				}else{
					alert("页码输入有误！");
					$(this).select();
				}
			}
		});
        gotoPage.appendTo($pager);
        var gotoButton = $('<input type="button" value="GO"/>');
        gotoButton.click(function() {
        			var gotoNum = parseInt($(this).parent().find('#gotoNum').get(0).value,10);
        			if(gotoNum>=1&&gotoNum<=pagecount){
        				buttonClickCallback(gotoNum);
        			}else{
        				alert("页码输入有误！");
        				$('#gotoNum').get(0).select();
        			}
        		});
        gotoButton.appendTo($pager);

        return $pager;
    }

    // renders and returns a 'specialized' button, ie '下一页', '上一页ious' etc. rather than a page number button
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {

        var $Button = $('<a class="pg" data_type="'+buttonLabel+'"><i></i></a>');

        var destPage = 1;

        // work out destination page for required button type
        switch (buttonLabel) {
            case "首页":
                destPage = 1;
                break;
            case "上一页":
                destPage = pagenumber - 1;
                break;
            case "下一页":
                destPage = pagenumber + 1;
                break;
            case "尾页":
                destPage = pagecount;
                break;
        }


        // disable and 'grey' out buttons if not needed.
        if (buttonLabel == "首页" || buttonLabel == "上一页") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function() { buttonClickCallback(destPage); });
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function() { buttonClickCallback(destPage); });
        }

        return $Button;
    }

    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the 下一页 version
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    };

})(jQuery);





