slider = {
	templates : {
        tpl_trigger : '<i>&bull;</i>',
        tpl_servTrigger : '<p>&bull;</p>',
        tpl_sliderTrigger : '<li>{index}</li>',
        tpl_mainTrigger : '<li></li>'
    },
    _domLoaded : false,
    _initSlider : false,
    init: function() {
        this.mainSlider();
    },
    servSlider : function(cls) {
    	var _p=$(cls),
    		li = $(cls+' li'),
            w= li.width()+parseInt(li.eq(0).css('margin-left'));
        _p.width(li.length*w);
        var index=0;
        var t=setInterval(move,2000);
        function move(){
            _p.animate({marginLeft:"-"+w},"slow",function(){
                _p.find('li').first().appendTo(_p);
                _p.css('marginLeft',0);
            })
        }
        _p.hover(function(){
            clearInterval(t);
        },function(){
            t=setInterval(move,2000);
        })
    },
    //巨无霸
    mainSlider : function() {
        this.createTab($('#j_strigger'), this.templates.tpl_mainTrigger, $('.slider_img').find('.group').length, 'on', 'li');
        var _mainSlider = this.slider({
            titleId : '#j_strigger',
            titleTag : 'li',
            contentId : '.slider_img',
            contentTag : '.group',
            // contentTag : 'li',
            prevId : '#j_sprev',
            nextId : '#j_snext',
            areaId : '#j_main_slider',
            speed : 400,
            autoLag : 4000
        });
        _mainSlider();
    },
    newsSlider : function() {
        this.createTab($('#j_strigger'), this.templates.tpl_sliderTrigger, $('.news_slider').find('li').length, 'on', 'li');
        var _mainSlider = this.slider({
            titleId : '#j_strigger',
            titleTag : 'li',
            contentId : '.news_slider',
            contentTag : 'li',
            prevId : '#j_sprev',
            nextId : '#j_snext',
            areaId : '#news_banner',
            speed : 1000,
            autoLag : 3000
        });
        _mainSlider();
    },
    //创建tab
    createTab : function(dom, tpl, len, className, tag, start) {
        if(len < 2) return;
        var html = [], index = 1;
        for(var i = 0; i < len; i ++) {
            html.push(tpl.replace(/\{(\w+)\}/g, function (a, b) {
                if('index' == b) {
                    return index++;
                }
            }));
        }
        dom.html(html.join(''));
    },
    
    //轮播
    slider : function(option) {
        var opt = {
            titleId : '',
            titleTag : '',
            contentId : '',
            contentTag : '',
            prevId : '',
            nextId : '',
            areaId : '',
            className : 'on',
            initIndex : 0,
            timeLag : 300,
            auto : true,
            speed : 200,
            autoLag : 6000,
            effect : 'fade',
            backAttr : '_src',
            callback : ''
        };
        $.extend(opt, option);
        
        var curIndex = opt.initIndex,
            $control = $(opt.titleId),
            oContent = $(opt.contentId).find(opt.contentTag),
            oControl = $control.find(opt.titleTag),
            prev = $(opt.prevId),
            next = $(opt.nextId),
            oArea = $(opt.areaId),
            timer = null;
        var hasBtn = (prev.length > 0 && next.length > 0);
        var $curEl = oContent.eq(curIndex), callback = opt.callback;
        
        function showScrollbtn() {
            prev.myShow();
            next.myShow();
        }
        function hideScrollbtn() {
            prev.myHide();
            next.myHide();
        }
        
        function setTimer() {
            if(!opt.auto) return;
            
            clearInterval(timer);
            
            timer = setInterval(function() {
                show((curIndex + 1) % opt.len);
            }, opt.autoLag);
        }
        function clearTimer() {
            if(!opt.auto) return;
            clearInterval(timer);
        }
        
        function show(nextIndex, init) {
            if(curIndex == nextIndex && !init) return;
            oControl.removeClass(function() {
                return opt.className;
            }).eq(nextIndex).addClass(opt.className);
            if(init) return;

            if('fade' == opt.effect) {
                var $nextEl = oContent.eq(nextIndex);
                var oImg = $('img[' + opt.backAttr + ']', $nextEl), backSrc;
                (oImg.length > 0) && (backSrc = oImg.attr(opt.backAttr)) && (oImg.attr('src', backSrc).removeAttr(opt.backAttr));
                $curEl = oContent.eq(curIndex);
                $curEl.stop(1, 1).css({opacity : '1'}).animate({opacity : '0'}, opt.speed/2, function(){
                    $curEl.myHide();   
                    $nextEl.myShow().css({opacity : '0.5'}).animate({opacity : '1'}, opt.speed/2);  
                });  
                curIndex = nextIndex;
                if(callback && $.isFunction(callback)) {
                    opt.curIndex = curIndex;
                    callback(opt);
                }
            }
        }
        return function(reset) {
            if(reset) {
                oContent = $(opt.contentId).find(opt.contentTag);
                oControl = $(opt.titleId).find(opt.titleTag);
                opt.len = Math.min(oControl.length, oContent.length);
            //  curIndex = (curIndex < opt.len) ? curIndex : 0;
                show(0, 1);
                
                return;
            }
            if(oArea.length === 0) oArea = oContent;
            
            opt.len = Math.min(oControl.length, oContent.length);
            if(opt.len == 0) {
                return;
            } else if(opt.len == 1) {
                oControl.myHide();
                $curEl.myShow();
                return;
            }
            oContent.each(function() {
                $(this).addClass('hide');
            });
            var oImg = $('img[' + opt.backAttr + ']', $curEl), backSrc;
            (oImg.length > 0) && (backSrc = oImg.attr(opt.backAttr)) && (oImg.attr('src', backSrc).removeAttr(opt.backAttr));
            $curEl.myShow();
            
            var startFn = function() {
                $control.myShow();
                show(opt.initIndex, 1);
                setTimer();
                
                oControl.hover(function() {
                    clearTimer();
                    var _self = this;
                    show(oControl.index($(_self)));
                }, function() {
                    setTimer();
                });
                
                oContent.hover(function() {
                    clearTimer();
                }, function() {
                    setTimer();
                });
                
                if(hasBtn) {
                    prev.click(function() {
                        show((curIndex + opt.len - 1) % opt.len);
                    }).hover(function() {
                        clearTimer();
                    }, function() {
                        setTimer();
                    });
                    next.click(function() {
                        show((curIndex + 1) % opt.len);
                    }).hover(function() {
                        clearTimer();
                    }, function() {
                        setTimer();
                    });
                    // oArea.hover(function() {showScrollbtn();}, function() {hideScrollbtn();});
                }
            };
            slider._domLoaded ? startFn() : $(document).bind('init_slider', function() { startFn(); });
        }
    },
    
    //获取页面对象绝对Y位置
    getY : function(e){
        if(0 == e.length) return 0;
        return e.offset().top;
    },
    
    //滚动加载图片
    loadImgWhenScroll : (function(){
        var that = slider;
        var visibleH = that.data.visibleH;
        
        function loadImg(opt) {
            for(var i = 0,len = opt.data.length; i < len; i ++){
                var oImg = opt.data[i];
                var src = $(oImg).attr('_src');         
                if(src && !oImg.src){
                    $(oImg).attr('src', src).removeAttr('_src');
                }
            }
        }
        
        return function(dom) {
            dom = dom || document;
            var bakImages = $('img[_src]', dom),
                loadList = {};
            var len = bakImages.length;
            if(0 == len) return;
            
            for(var i = 0; i < len; i ++) {
                var oImg = bakImages[i];
                var _index = that.getY($(oImg));
                if(_index != 0) {
                    _index = _index > visibleH ? _index : 0;
                    loadList[_index] ? loadList[_index].push(oImg) : loadList[_index] = [oImg];
                }
            }
            for(var i in loadList){
                that.scroll({height:i, data:loadList[i], func:loadImg});
            }
        }
    })
};

$.extend(slider.data, {
    serverTime  :   (function() {
                        var t = (new Date(window.serverTime)).getTime();
                        return (t)? new Date(t) : new Date();
                    })(),
    visibleH    :   (function(){
                        return (document.documentElement.clientHeight || document.body.clientHeight);
                    })()
});

