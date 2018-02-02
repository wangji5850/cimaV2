(function($) {
    //自定义hide和show，用class=“hide”取代display:none
    $.fn.extend({
        myShow: function(n) { //n==1 需要遮罩
            $(this).removeClass('hide').show();
            return this;
        },
        myHide: function(n) {
            $(this).addClass('hide');
            return this;
        }
    });
})(jQuery);
// 首页
var index = {
    init: function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 100) {
                $('.backtop').fadeIn(300);
            } else {
                $('.backtop').fadeOut(300);
            }
        });
        $('.backtop').click(function() {
            $('html,body').animate({
                scrollTop: '0px'
            }, 1000);
        });
        $('#j_main_slider .li').eq(0).show();

        //首页轮播
        slider._domLoaded = true;
        slider.mainSlider();
        this.for_items();
        // 老师信息切换
        $('.p_index .floor5 .mask').on('mouseover', function() {
            var _index = $(this).index() - 2;
            var _t = $('.p_index .floor5 .group').eq(_index),
                xhr
            _tar = $('.p_index .floor5 .message');
            _tar.html(_t.html());
            $('.mask').eq(_index).hide().siblings().show();

        });
        $('.p_index .floor5 .mask').eq(0).trigger('mouseover');

        $('#join1').click(function() {
            var _t = $(this);
            var _href = $('.floor2 .con').find('.group:first-child a').attr('href');
            _t.attr('href', _href);
        });

        $('#join2').click(function() {
            var _t = $(this);
            var _href = $('.floor2 .con').find('.group').eq(1).find('a').attr('href');
            _t.attr('href', _href);
        });

        $('.own a').click(function() {
            var _t = $(this);
            var _href = $('.floor2 .big_banner').find('.group a').attr('href');
            _t.attr('href', _href);

        });
        //点击首图跳到申请按钮
        // $('.slider_img .group:first').click(function(){
        //     $('html,body').animate({
        //         scrollTop: '1600px'
        //     }, 1000);

        // })
    },

    for_items: function() {
        // 项目优势
        function move(flag) {
            var obj = $(".m_floor3 .con .ul");
            if (-1 == flag) {
                obj.find('.group').last().prependTo(obj.css('marginLeft', "-310px"));
                obj.animate({
                    marginLeft: 0
                }, "slow");
            } else {
                obj.animate({
                    marginLeft: "-310px"
                }, "slow", function() {
                    obj.find('.group').first().appendTo(obj);
                    obj.css('marginLeft', 0);
                })
            }
        };

        var t = setInterval(move, 2000);
        $('#leftBtn').click(function() {
            move(-1);
        });

        $('#rightBtn').click(function() {
            move(1);
        });

        $(".m_floor3").hover(function() {
            clearInterval(t);
        }, function() {
            t = setInterval(move, 2000);
        });
    }
};
// cima介绍
var cima_intr = {
    init: function() {
        //首页轮播
        slider._domLoaded = true;
        slider.mainSlider();
        index.for_items();

        marquee.mainMarquee();

        $('.floor4 .m_reason_wrap .group').eq(0).addClass('current');

        // function turn(index) {
        //     $('.floor4 .m_reason_wrap .page span').eq(Math.floor(index / 10)).addClass('on').siblings().removeClass('on');
        // }

        // $(function() {
        //     $('.floor4 .m_reason_wrap .group').eq(0).addClass('current');
        //     $('#left').click(function() {
        //         var _index = $('.current').index();
        //         if (_index == 54) {
        //             return;
        //         } else {
        //             $('.floor4 .m_reason_wrap .group').eq(_index + 1).addClass('current').siblings().removeClass('current');
        //             turn(_index);
        //         }
        //     });
        //     $('#right').click(function() {
        //         var _index = $('.current').index();
        //         if (_index == 0) {
        //             return;
        //         } else {
        //             $('.floor4 .m_reason_wrap .group').eq(_index - 1).addClass('current').siblings().removeClass('current');
        //             turn(_index);
        //         }
        //     });
        // });
        // $('.m_reason_wrap .page span').click(function() {
        //     if ($(this).attr('class') == 'on') {
        //         return
        //     } else {
        //         $(this).addClass('on').siblings().removeClass('on');
        //         var index = $(this).index();
        //         if (index == 0) {
        //             return;
        //         } else {
        //             $('.floor4 .m_reason_wrap .group').eq(parseInt(index * 10)).addClass('current').siblings().removeClass('current');
        //         }
        //     }
        // });
    }


};
// 职业发展
var career = {
    init: function() {
        $(function() {
            $('.feed_back .a').hover(function() {
                var _t = $(this);
                $('.feed_back .li_c').eq(_t.index()).show()
                    .siblings().hide();
                _t.addClass('curr')
                    .siblings().removeClass('curr');
            });
            $('.about_fu.tabs0 .li').hover(function() {
                var _t = $(this);
                _t.addClass('curr').siblings().removeClass('curr');
                _t.parent().parent().find('.page_list').children('.ul').eq(_t.index()).removeClass('hide').show().siblings('.ul').hide();
            });
            // CIMA职业资格的含金量
            $('.floor2 .group').on('mouseover', '.intro1', function(event) {
                var _t = $(this),
                    _p = _t.parents('.group');
                _p.siblings('.group').find('.img').hide()
                    .end().find('.intro1').removeClass('curr');
                _p.siblings('.group').find('.intro2').hide();
                _p.find('.img').show()
                    .end().find('.intro1').addClass('curr');
                _p.find('.intro2').show();

            });
            $('.floor2 .group .intro:first').trigger('mouseover');
        })
    }
};
// 干货专区
var examzone = {
    init: function() {
        $.post(G.opt.post_url + '/exampa/fixed-prefecture?random=' + Math.random(), {}, function(d, textStatus, xhr) {
            if (d.flag == 0) {
                $.each(d.data, function(index, el) {
                    G.show_data(el, $('#list_tmpl'), $('.page_list').eq(index));
                    $('.page_list').find('a').hover(function() {
                        var val = $(this).html();
                        $(this).attr('title', val);
                    })
                });
            } else {
                layer.msg(d.msg)
            }
        });
    }
};
// 更多文章
var articleMore = {
    init: function() {
        var _that = this,
            type = (window.location.search + '').replace('?type=', '');
        // _that.getItems(type);
        $('.catalog').on('click', '.li', function(event) {
            var _t = $(this);
            _t.addClass('curr')
                .siblings('.li').removeClass('curr');
            _that.getItems(_t.data('type'));
            $('.main_r .title_wrap .tit').text(_t.text())
        });
        $('.catalog .li').eq(type - 1).click();

       
    },
    getItems: function(type) {
        $.post(G.opt.post_url + '/exampa/list-prefecture?random=' + Math.random(), {
            'type': type || 1,
            'pageNo': G.get_qa_pn() || 1,
            'pageSize': 10
        }, function(d, textStatus, xhr) {
            console.log(d);
            if (d.flag == 0) {
                G.show_data(d.data.list, $('#list_tmpl'), $('.page_list'))
                var rb = d.data.rowBounds;
                G.loadPager(rb.pageNo, rb.totalCount, rb.pageSize, function() {
                    $('.catalog .li.curr').click();
                })
            } else {
                layer.msg(d.msg)
            }
        });
    }
};
// 文章详情
var articleDes = {
    init: function() {
        $('.catalog .li').click(function() {
            var _type = $(this).attr('data-type');
            window.location.href = basePath + '/htmlcima/checkmore.html?type=' + _type;
        });
        $('.btn_wrap span a').hover(function() {
            var val = $(this).html();
            $(this).attr('title', val);
        });
    }

};
// 精英学员
var student = {
    init: function() {
        $(function() {
            var len = $('.p_eli_stu .floor3 .group').length;
            for (var i = 0; i <= len; i++) {
                var num = i;
                $('.p_eli_stu .floor3 .group').eq(num).attr('data-str', num + 1);
            }
            var div = $('<div class="btn_wrap"></div>');
            var len = Math.round($('.floor2 .group ').length/2);
            if (len <= 1) {
                return;
            } else {
                for (var i = 0; i <= len - 1; i++) {
                    var span = $('<div><span></span></div>');
                    span.appendTo(div);
                }
                div.find('span').eq(0).addClass('checkon');
                div.appendTo($('.floor2 .wrapper'));
            };
            $('.floor2 .wrapper').find('.btn_wrap').find('div').hover(function(){
                var _t = $(this);
                if (_t.find('span').attr('class')=='checkon') return;
                var index = _t.index()*2;
                var _index = index*2+1;
                $('.group_wrap .group').hide();
                $('.group_wrap .group').eq(index).fadeIn('slow');
                $('.group_wrap .group').eq(_index).fadeIn('slow');
                _t.find('span').addClass('checkon');
                _t.siblings().find('span').removeClass('checkon');
            })

        //     var a = 0;
        //     function move(flag) {
        //         var obj = $(".p_eli_stu .floor2 .group_wrap");
        //         if (-1 == flag) {
        //             obj.find('div').last().prependTo(obj.css('marginLeft', "-481px"));
        //             obj.animate({
        //                 marginLeft: 12
        //             }, "slow");
        //         } else {
        //             obj.animate({
        //                 marginLeft: "-481px"
        //             }, "slow", function() {
        //                 obj.find('div').first().appendTo(obj);
        //                 obj.css('marginLeft', '12px');
        //             })
        //             if (a < 2) {
        //                 a = a + 1;
        //                 $('.btn_wrap span').eq(a).addClass('checkon').siblings().removeClass('checkon');
        //             } else {
        //                 console.log(2);
        //                 a = 0;
        //                 $('.btn_wrap span').eq(a).addClass('checkon').siblings().removeClass('checkon');
        //             }
        //         }
        //     };
        //     var t = setInterval(move, 3000);
        //     $(".floor2 .info_wrap").hover(function() {
        //         clearInterval(t);
        //     }, function() {
        //         t = setInterval(move, 3000);
        //     });
         })
    }
};
// 百强雇主
var employers = {
    init: function() {
        $(function() {
            $('.about_fu.tabs0 .li').hover(function() {
                var _t = $(this);
                _t.addClass('curr').siblings().removeClass('curr');
                _t.parent().parent().find('.page_list').children('.ul').eq(_t.index()).removeClass('hide').show().siblings('.ul').hide();
            });
            $('.about_pdfbox').hover(function() {
                $(this).find('.about_pdf').hide();
                $(this).find('.about_pdf_hover').show();
            }, function() {
                $(this).find('.about_pdf_hover').hide();
                $(this).find('.about_pdf').show();
            })
            $('.floor2 .group').eq(0).find('.intro3').addClass('on');
            $('.floor2 .group').find('.intro3').hover(function() {
                if ($(this).attr('class') == 'intro intro3 on') {
                    return
                } else {
                    $(this).parent().siblings().find('.intro1,.intro2').hide();
                    $(this).siblings('div').show();
                    $(this).addClass('on');
                    $(this).parent().siblings().find('.intro3').removeClass('on');
                }
            })
        })
    }
};
/**
 * 讲师页面
 * @Object {Object}
 */
var teacher = {
    init: function() {
        var _that = this;
        $('.p_teacher .floor2 .group .intro3').each(function(index, el) {
            var _t = $(this);
            _t.attr('vid', _t.text())
                .text('他的视听');
        });
        $('.p_teacher .floor2 .group').on('click', '.intro3', function(event) {
            _that.set_player($(this).attr('vid'));
        });
    },
    set_player: function(vid) {
        var _that = this;
        if (vid) {
            $.post('http://10.10.30.95' + '/onlines/getSign/' + vid + '?random=' + Math.random(), {}, function(d) {
                if (d.flag == 0) {
                    $('#polyvplayer,#mask').show();
                    // if (!player || navigator.userAgent.toLocaleLowerCase().indexOf('mobile') > -1) {
                    player = polyvObject('#polyvplayer').videoPlayer({
                        'width': '100%',
                        'height': '100%',
                        'vid': d.data.vid,
                        'sign': d.data.sign,
                        'ts': d.data.ts,
                        'flashParams': { 'wmode': 'transparent', 'allowScriptAccess': 'always', 'allowFullScreen': 'true', 'quality': 'high', },
                        'flashvars': { 'autoplay': '1', 'is_auto_replay': 'on', 'ban_history_time': 'on', 'watchStartTime': 0, 'start': 0 }
                    });
                    // }
                    _that.openIfram();
                } else {
                    layer.msg(d.msg);
                    layer.closeAll();
                }
            });
        } else {
            $('#polyvplayer,#mask').hide();
            layer.msg('该老师目前没有视频');
        }
    },
    openIfram: function() {
        layer.open({
            type: 1,
            shade: false,
            area: ['485px', '315px'],
            title: false,
            scrollbar: false,
            maxmin: false,
            fix: false, //不固定
            content: $('#polyvplayer'),
            zIndex: layer.zIndex, //重点1
            success: function(layero) {
                layer.setTop(layero); //重点2
            },
            end: function() {
                $('#mask').hide();
            }
        });
    }
};
// 免试项目
var freeItem = {
    init: function() {
        $('#join1').click(function() {
            var _t = $(this);
            var _href = $('.floor2 .con').find('.group:first-child a').attr('href');
            _t.attr('href', _href);
        });

        $('#join2').click(function() {
            var _t = $(this);
            var _href = $('.floor2 .con').find('.group').eq(1).find('a').attr('href');
            _t.attr('href', _href);
        });

    }
};
// 获取免试资格
var quafly = {
    init: function() {

    }
};
// 课程中心
var study_center = {
    init: function(applyFlag, classId) {
        $.get(G.opt.post_url + '/course/subject-list?random=' + Math.random(), {
            classId: classId
        }, function(d) {
            $('.p_l_catalog').html('');
            G.show_data(d.data.subjectList, $("#tmpl_subject_list"), $('.p_l_catalog'));
            G.show_data(d.data.videoList, $("#tmpl_catalog_list"), $('.p_l_catalog .tit').first().next());
            $('.p_l_catalog .tit').first().find('.rt_part .ico2').removeClass('arrow');
            //展开两个章节
            if ($('.p_l_catalog .tit').length > 1) {
                $('.p_l_catalog .tit').eq(1).trigger('click');
            }
            //移除教程类课程的习题
            if ($('.p_l_catalog .tit').first().parent().data('type') == 1) {
                $('.p_l_catalog .tit').first().next().find('.practice').remove();
            }
        });
        $('.page_list .p_l_catalog').on('click', '.tit', function() {
            var _t = $(this);
            if (_t.find('.rt_part .ico2').hasClass('arrow')) {
                var subjectId = _t.parent().attr('data-id');
                $.get(G.opt.post_url + '/course/video-list?random=' + Math.random(), {
                    subjectId: subjectId,
                    classId: classId
                }, function(d) {
                    if (d.flag == 0) {
                        try {
                            _t.next().html("");
                            G.show_data(d.data, $("#tmpl_catalog_list"), _t.next());
                            if (_t.parent().data('type') == 1) {
                                _t.next().find('.practice').remove();
                            }
                            if (applyFlag != 0) {
                                $('.p_l_catalog .li_c .abc').attr('href', 'javascript:showNoAuthBox(' + applyFlag + ');');
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        alert(d.msg);
                    }
                });
            }

            _t.find('.rt_part .ico2').toggleClass('arrow')
                .end().parent().children('.ul_c').toggle();
        });
    }
};
// 我的学习记录
var record = {
    init: function() {
        var _that = this;
        _that.getList();
    },
    getList: function() {
        var _that = this;
        $.post(G.opt.post_url + '/account/learn?random=' + Math.random(), {
            'pageNo': G.get_qa_pn() || 1,
            'pageSize': 10
        }, function(d, textStatus, xhr) {
            if (d.flag == 0) {
                G.show_data(d.data.list, $('#tmplrecord'), $('.page_list'))
                var rb = d.data.rowBounds;
                G.loadPager(rb.pageNo, rb.totalCount, rb.pageSize, function() {
                    _that.getList()
                })
            } else {
                layer.msg(d.msg)
            }
        });
    }
};
var showLog = function(containt, tip) {
    function showDialog() {
        var dialog = $('<div class="dialog"><p class="con">' + containt + '</p><p class="tip">' + tip + '</p></div>');
        dialog.appendTo($('body'));
        dialog.css({ "margin-left": -(dialog.outerWidth(true) / 2), "margin-top": -dialog.outerHeight(true) / 2 });
        setTimeout(function() {
            dialog.remove();
        }, 2000);
    };
    showDialog();
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $('.dialog')
    });

};

var marquee = {
    templates: {
        tpl_trigger: '<span data-index="{index}">{start}-{end}</span>',
        tpl_servTrigger: '<span data-index="{index}">{name}</span>'
    },
    mainMarquee: function() {
        var areaCls = '.floor4 .m_reason_wrap',
            contentCls = '.group',
            titleId = '#page_span',
            titleTag = 'span',
            pageSize = 10;
        this.createTab($(areaCls).find(titleId), this.templates.tpl_trigger, $(areaCls).find(contentCls).length, pageSize);
        this.marquee();
    },
    //创建tab
    createTab: function(dom, tpl, len, size) {
        if (len < 2) return;
        var html = [];
        for (var i = 0; i < Math.ceil(len / size); i++) {
            html.push(tpl.replace(/\{(\w+)\}/g, function(a, b) {
                if ('start' == b) {
                    return i * size + 1;
                } else if ('end' == b) {
                    return (i + 1) * size > len ? len : (i + 1) * size
                } else if ('index' == b) {
                    return i * size;
                }
            }));
        }
        dom.html(html.join(''));
    },
    marquee: function(option) {
        var opt = {
            areaCls: '.floor4 .m_reason_wrap',
            contentCls: '.group',
            titleId: '#page_span',
            titleTag: 'span',
            leftId: '#left',
            rightId: '#right',
            pageSize: 10
        }
        $.extend(opt, option);

        var _p = $(opt.areaCls),
            _group = _p.find(opt.contentCls),
            _title = _p.find(opt.titleId + ' ' + opt.titleTag),
            marginLR = parseInt(_group.eq(0).css('margin-left')) + parseInt(_group.eq(0).css('margin-right')),
            w = _p.width();
        _title.eq(0).addClass('on');

        function move(flag) { //flag:-1下一个
            var _index = _p.find(opt.contentCls + '.current').index();
            if (-1 == flag) {
                if (_index + 1 < _group.length) {
                    _index++;
                }
            } else {
                if (_index > 0) {
                    _index--;
                }
            }
            _group.removeClass('current').eq(_index).addClass('current');
            _title.removeClass('on').eq(Math.floor(_index / opt.pageSize)).addClass('on');
        }
        _p.on('click', opt.rightId, function() {
            move(-1);
        });
        _p.on('click', opt.leftId, function() {
            move(1);
        });
        _title.click(function() {
            var _index = $(this).attr('data-index');
            _group.removeClass('current').eq(_index).addClass('current');
            _title.removeClass('on').eq(Math.floor(_index / opt.pageSize)).addClass('on');
        })
    }
};
// 学习中心
var learn = {
    signTmpl: $('#tmplsign_up'),
    init: function() {
        var _that = this;
        /*var date = new Date();
        G.show_data([{
            text: '签到打卡',
            date: date.getMonth() + '月' + date.getDay() + '日',
            days: 0,
            ev: 'learn.sign($(this))'
        }], _that.signTmpl, $('#sign_up'));*/
        _that.sign(null, 0);
    },
    //签到信息(type - 0: 获取签到信息;1:签到操作;)
    sign: function(o, type) {
        var _that = this;
        if (o && o.length > 0 && o.parent('.has_sign').length > 0) {
            layer.msg('已签到');
            return false;
        }
        $.post(basePath + '/account/sign?random=' + Math.random(), {
            type: type
        }, function(d) {
            var obj;
            if (d.flag == 0) {
                obj = {
                    date: d.data.dateString,
                    days: d.data.cumulativeTotal,
                    hasSign: d.data.hasSign
                };
                if (d.data.hasSign) {
                    obj.text = '已签到';
                    $('#sign_up').addClass('has_sign');
                } else {
                    obj.text = '签到打卡';
                    obj.ev = 'learn.sign($(this),1)';
                }
                G.show_data([obj], _that.signTmpl, $('#sign_up'));
            }
        })
    }
};

var online = {
    startDuration: 0, //上次上传时候的进度
    init: function(hasNoAuth, applyFlag, isExitClass, id) {
        if (hasNoAuth) {
            if (applyFlag && applyFlag < 4) {
                if (applyFlag > 0) {
                    $('.msg_box.no_author .cont').children('.attend').hide()
                        .end().children('.tips').text('目前正在审核中，若有问题请联系客服');
                }
                $('.no_author').show();
            }

            if (applyFlag == 4 && isExitClass == 'true') {
                $('.msg_box.no_author .cont').children('.attend').hide()
                    .end().children('.tips').text('目前正在审核中，若有问题请联系客服');
                $('.no_author').show();
            }
        }
        //移到播放区域隐藏标题
        $('.play_area').hover(function() {
            $('.video_info').slideUp();
        }, function() {
            $('.video_info').slideDown();
        });
        $('.video .for_menu').on('click', '.tit', function() {
            var _t = $(this);
            //目录
            if (_t.children('.ico').hasClass('arrow')) {
                var subjectId = _t.parent().attr('data-id');
                $.get(basePath + '/course/video-list', {
                    subjectId: subjectId
                }, function(d) {
                    // console.dir(d);
                    if (d.flag == 0) {
                        _t.next().html("");
                        G.show_data(d.data, $("#tmpl_video_list"), _t.next());
                        G.spreadParg($('.for_menu .right .name'), 2, 0);
                        $('.for_menu .right .name').css('display', 'inline');
                    } else {
                        alert(d.msg);
                    }
                });
            }
            _t.children('.ico').toggleClass('arrow')
                .end().parent().children('.ul_c').toggle();
        });
        //右侧展开收起
        $('.full_screen .main_r').on('click', '.control', function() {
            if (!$('.full_screen').hasClass('has_spread')) {
                $(this).parent().css("width", "0");
                $('.full_screen').css("padding-right", "15px");
                $('.full_screen').addClass('has_spread')
            } else {
                $(this).parent().css("width", "300px");
                $('.full_screen').css("padding-right", "315px");
                $('.full_screen').removeClass('has_spread');
            }
        });
        var endPoint;
        var overFlag = false;
        window.onbeforeunload = function(e) {
            if (!hasLogined || !player) {
                return;
            }
            endPoint = player.j2s_getCurrentTime();
            $.ajaxSetup({
                cache: false
            });
            $.ajax({
                url: basePath + "/course/" + id + "/leave",
                async: false,
                type: "post",
                dataType: 'json',
                data: {
                    "endPoint": endPoint,
                    "overFlag": overFlag
                }
            });
        };
    },
    /**
     * 视频观看心跳
     * @author markwang
     * @version 2017-10-19T13:19:55+0800
     * @deprecated
     * @example no example
     * @modification list 2017-10-19 新增 
                           2017-10-19 修改
     * @param {[type]} before [description]
     * @param {[type]} after [description]
     * @return {[type]}
     */
    video_heart_break: function(before, after) {
        var _that = this;
        var onlineId = $('#resourceId').val();
        // var player = _that.getPlayer("polyvplayer");
        var stayInVideoTime = player && player.j2s_stayInVideoTime ? player.j2s_stayInVideoTime() : 0;
        var realPlayTime = player && player.j2s_realPlayVideoTime ? player.j2s_realPlayVideoTime() : 0;
        var duration = player && player.j2s_getCurrentTime ? player.j2s_getCurrentTime() : 0;
        $.post(basePath + '/postVideoHeartBreak?random=' + Math.random(), {
            'videoId': onlineId,
            'stayInVideoTime': stayInVideoTime,
            'realPlayTime': realPlayTime,
            'duration': before ? before : duration,
            'startDuration': _that.startDuration,
             'classId': classId
        }, function(d) {
            if (d.flag == 0) {
                _that.startDuration = after ? after : duration;
            }
        });
    },
    /**
     * 播放结束传后台做记录
     * @author markwang
     * @version 2017-10-19T13:22:47+0800
     * @example no example
     * @modification list 2017-10-19 新增 
                           2017-10-19 修改
     * @param {int} videoId 视频Id
     * @param {int} classId 班级
     * @return {none}
     */
    video_record: function(videoId,classId){
        $.post(basePath + '/course/updateCourseFinished?random=' + Math.random(), {
            'videoId': videoId,
            'classId': classId
        }, function(d) {});
    }
};
    // 请求字符串转对象
function reqStr2Obj() {
    var requireStr = location.search;
    if (requireStr === "") return false;
    requireStr = requireStr.substring(1);
    var requireArr = requireStr.split("&");
    var requireObj = {};
    for (var i = requireArr.length - 1; i >= 0; i--) {
        var tempArr = requireArr[i].split("=");
        requireObj[tempArr[0]] = tempArr[1];
    }
    return requireObj;
};



