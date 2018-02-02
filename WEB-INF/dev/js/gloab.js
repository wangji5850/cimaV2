var arr_cn = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
//倒计时
(function(W, D) {
    var timeCount = W["timeCount"] = function(o) {
            return new _timeCount(o);
        },
        _timeCount = function(o) {
            this.startTime = o.startTime;
            this.endTime = o.endTime; // 结束时间 年/月/日 时:分:秒
            this.dom = o.dom;
            this.format = o.format;
            this.callback = o.callback;
            this.time = 0; //用于给callback提供当前时间参数
            this.i = 0;
            this.flag = o.flag; // 是否为正计时 true 正计时 false 倒计时
            /* var aa=this.check();
             this.diff_time=aa[0];
             if(aa[1]==0)
             {
                 this.init();
                 
             }*/
            this.diff_time = 0;
            var _this = this;
            this.interval = setInterval(function() {
                _this.init();
                _this.callback && _this.callback(_this.dom, _this.time);
            }, 1000);
            // this.init();
        };

    _timeCount.prototype = {
        check: function() {
            var http_request = "",
                now_date = 0;
            if (window.XMLHttpRequest) {
                try { http_request = new XMLHttpRequest(); } catch (e) {; }
            } else if (window.ActiveXObject) {
                try { http_request = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {; }
                if (http_request == null) {
                    try { http_request = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {; }
                }
            }
            http_request.open('HEAD', window.location.href.toString(), false);  
            http_request.setRequestHeader("Content-Type", "text/html");
            http_request.send(null);
            //校正本地时间
            diff_time = http_request.getResponseHeader('Date') ? (new Date().getTime() - new Date(http_request.getResponseHeader('Date')).getTime()) : 0;
            //控制具体某一天开始now_date = new Date(http_request.getResponseHeader('Date')).getDate()-12;
            now_date = 0;
            
            return [diff_time, now_date];
        },
        auto: function() {
            var _this = this;
            setTimeout(function() {
                _this.init();
                _this.callback && _this.callback(_this.dom, _this.time);
            }, 1000);

        },
        ten: function(t) {
            if (t < 10) {
                t = '0' + t;
            };
            return t;
        },
        init: function() {
            var _this = this,
                time = 0;
            if (_this.flag) {
                var l = 1000;
            } else {
                var l = -1000;
            }
            _this.i++;
            _this.time = time = (new Date(_this.endTime).getTime() - new Date(_this.startTime).getTime() - _this.diff_time + l * _this.i) / 1000;  

          
            var str, str1; //for format
            if (time > 0) {
                var day = _this.ten(Math.floor(time / (60 * 60 * 24))),
                    hour = _this.ten(Math.floor(time / (60 * 60)) - day * 24),
                    minute = _this.ten(Math.floor(time / 60) - (day * 60 * 24) - (hour * 60)),
                    second = _this.ten(Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60));


                switch (_this.format) {
                    case 2: //ss
                        str = second;
                        str1 = "00";
                        break;
                    case 4: //mm:ss
                        str = minute + ":" + second;
                        str1 = "00:00";
                        break;
                    default: //hh:mm:ss
                        str = _this.ten(24 * day + parseInt(hour)) + ":" + minute + ":" + second;
                        str1 = "00:00:00";
                        break;
                }
                _this.dom.show().text(str);
                // _this.auto();
            } else {
                switch (_this.format) {
                    case 2: //ss
                        str1 = "00";
                        break;
                    case 4: //mm:ss
                        str1 = "00:00";
                        break;
                    default: //hh:mm:ss
                        str1 = "00:00:00";
                        break;
                }
                _this.dom.html(str1);
                window.clearInterval(this.interval);
            }
        }
    }
})(window, document);


G = {
    opt: {
        domain: window.location.hostname,
        post_url: basePath
    },
    init: function() {
        G.for_enter_submit();
        //close
        $('.msg_box').on('click', '.close', function() {
            $(this).parent('.msg_box').hide();
            $('#mask').hide();
        });
    },
    // 类型
    get_qa_type: function() {
        // return $("#orderByType").val();
        return G.get_attr_data($('.tabs').eq(0))[0];
    },
    set_qa_type: function(s) {
        // $("#orderByType").val(s);
        $('.tabs').eq(0).children('.curr').attr('data-type', s);
    },
    // 页码
    get_qa_pn: function() {
        // return $("#pageNob").val();
        return G.get_attr_data($('.tabs').eq(0))[1];
    },
    set_qa_pn: function(s) {
        // $("#pageNob").val(s);
        $('.tabs').eq(0).children('.curr').attr('data-page', s);
    },
    // 加载总数量
    get_qa_tn: function() {
        return G.get_attr_data($('.tabs').eq(0))[3];
    },
    set_qa_tn: function(s) {
        $('.tabs').eq(0).children('.curr').attr('data-totalNumber', s);
    },
    // 页面容量
    get_qa_pc: function() {
        // return $("#pageNob").val();
        return G.get_attr_data($('.tabs').eq(0))[5];
    },
    set_qa_pc: function(s) {
        // $("#pageNob").val(s);
        $('.tabs').eq(0).children('.curr').attr('data-pagecount', s);
    },
    //登录 忘记密码 注册 搜索 回车提交
    for_enter_submit: function() {
        $('.search_input').on('keydown', function(e) {
            var e = e || event;
            var key = e.keyCode || e.which || e.charCode;
            if (key == 13) {
                var _t = $(this);
                switch (_t.attr('id')) {
                    case 'search_input':
                        $('.btn_search').trigger('click');
                        break;
                }
            }
        });
    },
    // object空判断
    IsEmpty: function(o) {
        if (o) {
            return (typeof(o) == "string") ? false : ((typeof(o) === "object") ? !this.ObjNotEmpty(o) : o);
        }
        return true;
    },
    ObjNotEmpty: function(o) {
        if (typeof(o) === "object" && !(o instanceof Array)) {
            var hasP = false;
            for (var p in o) {
                hasP = true;
                break;
            }
            if (hasP) {
                return true;
            } else {
                return false;
            }
        } else if (o instanceof Array) {
            return o.length == 0 ? false : true;
        } else {
            return o;
        }
    },
    //暂无内容
    show_empty: function(obj, n) {
        if (obj.children().length == 0) {
            parseInt(obj.css('width')) > 580 ? obj.html(G.templates.tpl_empty_div) : obj.html(G.templates.tpl_empty_minidiv);
            obj.show();
        }
    },
    // 显示所填充数据：数据，模板，内容放置对象，没数据要移除的对象，是否需要set_qa_pn=最大：n==2不需要
    show_data: function(data, tpl, obj, noshow, n) {
        if (!G.IsEmpty(data)) {
            obj.html(tpl.tmpl(data)).fadeIn(400);
            var _o = obj.parent();
            _o.show();
        } else {
            obj.html('<div class="no_data"> <img src="' + basePath + '/images/no_data.png" alt=""/> <p class="tips">暂无相关数据</p> </div>').fadeIn(400);
        }
    },
    // 获取元素子级curr元素的data-for值
    get_attr_data: function(o) {
        console.log(o);
        var ob = o.children('.curr');

        return [ob.attr('data-type'), ob.attr('data-page'), ob.attr('data-for'), ob.attr('data-totalNumber'), ob.attr('data-pageCount'), ob.attr('data-loadNumber')];
    },
    templates: {
        tpl_more: '<div class="view_more">加载更多</div>',
        tpl_unfold: '<a href="javascript:;">展开更多</a>',
        tpl_empty_div: '<div class="empty_area"></div>',
        tpl_empty_minidiv: '<div class="empty_area empty_area_mini"></div>'
    },
    // 根据返回code，判断是否登录
    need_login: function(d) {
        if (1 == d.flag) {
            window.location.href = basePath + '/login';
        }
    },
    //超出n行显示更多效果 
    // G.spreadParg($('.quesList_ul .ques_text'), 3);
    // G.clickForSpreadParg($('.quesList_ul'));
    //n=0 +省略号 n=1 +...展开
    spreadParg: function(obj, row, n) {
        //row显示的行数
        if (row == null) {
            row = 0;
        }
        var btn = "";
        obj.each(function(index, el) {
            var el = $(el),
                m = 0;
            //计算能显示多少个字符
            if (!el.hasClass('has_spread')) {
                var limit = Math.floor(parseInt(el.css('width')) / (parseInt(el.css('font-size')) + parseInt(el.css('letter-spacing')))) * row * 2 - 18;
                if (n == 0) {
                    m = 7;
                } else {
                    btn = $('<a class="spread_a" style="display:inline;" href="javascript:;" data-limit="' + limit + '">(显示全部)</a>');
                }
                limit = limit + m;
                var newdiv = $('<div class="full_txt hide"></div>');
                var html = el.children('span').length > 0 ? el.children('span').html() : $.trim(el.html());
                var text = (el.children('span').length > 0 ? el.children('span').text() : $.trim(el.text()));
                var _height = parseInt(el.css('line-height')) * row;
                if (text.length > text.subCHStr(0, limit).length || el.height() > _height) {
                    el.html($('<span></span>').text(text.subCHStr(0, limit) + '... '));
                    n != 0 && el.append(newdiv.html(html.replace(/\n/g, '<br />'))).append(btn);
                }
                el.addClass('has_spread');
            }
        });
    },
    clickForSpreadParg: function(obj) {
        if (obj == null) {
            obj = $('.quesList_ul');
        }
        obj.on('click', '.spread_a', function() {
            var _t = $(this);
            var _p = _t.parent();
            if (_t.text() == "(显示全部)") {
                _p.children('span').hide().next('.full_txt').show();
                _t.text("(收起)");
            } else {
                _p.children('span').show().next('.full_txt').hide();
                _t.text("(显示全部)");
            }
        })
    },
    //分页
    loadPager: function(pagenumber, totalnumber, pagesize, callback) {
        var _t = G;
        $("#pageNo").val(pagenumber);
        $("#pageCount").val(Math.ceil(totalnumber / pagesize));
        $("#totalCount").val(totalnumber);
        var pn = pagenumber,
            pc = Math.ceil(totalnumber / pagesize),
            tn = totalnumber;
        if (pc <= 1) {
            $("#pager").hide();
        } else {
            $("#pager").pager({
                pagenumber: pn,
                pagecount: pc,
                totalnumber: tn,
                buttonClickCallback: function(pageNo) {
                    _t.set_qa_pn(pageNo);
                    callback && callback();
                    //G.user_list.pageClick(pageNo);
                }
            }).show();
        }
    },
    // 获取字节数（中文字符按照2字节长处理）
    getByteCount: function(str) {
        return str.toString().ByteCount();
    },
    phoneValid: function(s) {
        // return typeof('') === typeof(s) ? /^1([0-9]{10})$/.test(s) : !!0;
        return typeof('') === typeof(s) ? /^((13[0-9])|(14[5|7|9])|(15[^4])|(17[0|1|3|5-8])|(18[0-9]))\d{8}$/.test(s) : !!0;

    },
    emailValid: function(s) {
        return typeof('') === typeof(s) ? /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s) : !!0;
    },
    pwdValid: function(s) {
        return typeof('') === typeof(s) ? s.replace(/\s/g, "") != "" && s.length >= 6 && s.length <= 16 : !!0;
    },
    /**
     * [strongpwd_ck 密码强度校验：须包含字符、大小写、数字 任意2种]
     * @author: markwang
     * @version: 2016-12-30T10:33:51+0800
     * @modification list: 2016-8-30 新增 
                           2016-12-30 修改
     * @param {[type]} pwd [字符串]
     * @return {[type]} [description]
     */
    strongpwd_ck: function(pwd) {
        var m = 0,
            mode = 0;
        for (var i = 0; i < pwd.length; i++) {
            var c_type = 0;
            var t = pwd.charCodeAt(i);
            if (t >= 48 && t <= 57) {
                c_type = 1;
            } else if ((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) {
                c_type = 2;
            } else {
                c_type = 4;
            }
            mode |= c_type;
        }
        for (var i = 0; i < 3; i++) {
            if (mode & 1) {
                m++;
            }
            mode >>>= 1;
        }
        if (m < 2) {
            return false
        }
        return true;
    },
    toUtf8: function(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },
    //分享
    social_share: function(obj, s) {
        var sinaShareURL = "http://service.weibo.com/share/share.php?"; //新浪URL
        var qqShareURL = "http://share.v.t.qq.com/index.php?c=share&a=index&"; //新浪URL
        var host_url = G.opt.post_url; //host_url获取当前的路径
        var title = " CGMA 全球管理会计高级经理人课程 Fulfill your career potential !我在学cima等你！http://www.xuecima.com";
        var title1 = " CGMA 全球管理会计高级经理人课程 Fulfill your career potential";
        var _URL;
        if (s == "wx") {
            //console.log(host_url);
            $('#code').qrcode({
                //render: "table", //table方式 
                width: 100, //宽度 
                height: 100, //高度 
                text: G.toUtf8(host_url) //任意内容 
            }).css("box-shadow", "0 0 3px 0px #333");
            return;
        }
        var w = window.open();
        if (s == "xl") {
            _URL = sinaShareURL + "url=" + host_url + "&title=" + title; //新浪
            // _URL=sinaShareURL+"&title="+title;//新浪
        } else if (s == "tx") {
            _URL = qqShareURL + "url=" + host_url + "&title=" + title; //QQ
            // _URL=qqShareURL+"&title="+title;//QQ
        } else if (s == "dx") {
            //_URL=qqShareURL+"url="+host_url+"&title="+title;//QQ
            _URL = "mailto:sample@linked-f.com?subject=" + title1 + "&body= CGMA 全球管理会计高级经理人课程 \n访问链接：" + host_url;
        }
        //window.open( _URL,'', 'width=700, height=480, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
        setTimeout(function() {
            w.location = _URL;
        }, 200);
    },
    //提交审核
    apply_less: function(o) {
        var inputFlag = false;
        o.find('input[type="text"]').on('keydown', function(event) {
            $(this).next('.error').hide();
        });
        var nameObj = o.find('.name');
        var name = nameObj.val();
        if ($.trim(nameObj.val()) == "") {
            nameObj.next().show();
            inputFlag = true;
        }

        // var positionObj = o.find('.position');
        // var position = positionObj.val();
        // if ($.trim(positionObj.val()) == "") {
        //     positionObj.next().show();
        //     inputFlag = true;
        // }

        var phoneInput = o.find('.mobile');
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phone != "" && phoneValid == false) {
            phoneInput.next().html('<i class="ico"></i>手机号码格式不正确').show();
            inputFlag = true;
        } else if (phone == "") {
            phoneInput.next().html('<i class="ico"></i>手机号码不能为空').show();
            inputFlag = true;
        }

        // var telephone = o.find('.teleph').val();

        // var companyObj = o.find('.company');
        // var company = companyObj.val();
        // if ($.trim(companyObj.val()) == "") {
        //     companyObj.next().show();
        //     inputFlag = true;
        // }

        var emailInput = o.find('.email')
        var email = emailInput.val();
        var emailValid = G.emailValid(email);
        if (email != "" && emailValid == false) {
            emailInput.next().html('<i class="ico"></i>邮箱格式不正确').show();
            inputFlag = true;
        } else if (email == "") {
            emailInput.next().html('<i class="ico"></i>邮箱不能为空').show();
            inputFlag = true;
        }

        if (inputFlag == true) {
            return;
        }
        $.post(G.opt.post_url + '/application/apply-lesson?random=' + Math.random(), {
                'name': name,
                // 'position': position,
                'phone': phone,
                // 'telephone': telephone,
                // 'company': company,
                'email': email
            },
            function(d) {
                if (d.flag == 0) {
                    o.find('input[type="text"]').val('');
                    // $('.m_apply .msg_success').not(".msg_wrong").show();
                    // setTimeout("$('.m_apply').hide(200);$('.mb_enroll .msg_success').hide();$('.no_author .close').length>0&&$('.no_author').hide();", 3000);
                    $('.m-form input').val('');
                    // location.reload();
                    layer.msg("发送成功");
                } else {
                    layer.msg("发送失败");
                }
            });
    },

    setHeight: function() {
        $('.main_r').height() > $('.main_l').height() && $('.main_l').css("min-height", $('.main_r').height());
    },
    //自定义滚动条
    for_p_scroll: function() {
        try {
            (function($) {
                $('.p_scroll').mCustomScrollbar({
                    axis: "y",
                    scrollButtons: { enable: true },
                    // theme:"dark",
                    // theme:"light-thick",
                    // theme:"dark-thin",
                    theme: "3d",
                    // theme:"light-3",
                    // theme:"3d-thick",
                    // theme:"rounded-dark",
                    scrollbarPosition: "inside"
                });
            })(jQuery);
        } catch (e) {}
    },

};
G.init();
var note = {}; // 笔记部分
var private_message = {}; // 私信
var exercise_set = {}; //题集
var exset_detail = {}; //题集详情
var video = {}; //视频
var setting = {}; //设置
var cache_processor = {}; // 公用缓存处理
var login = {}; // 登录
var register = {}; // 注册
var focus = {}; //关注
var qa = {}; //问答
var search_result = {}; //搜索
var look_for_pwd = {}; // 忘记密码

$(function() {
    G.for_p_scroll();
    //select 添加事件
    for_selct();
});


/**
 * 获取登录用户信息
 * @author markwang
 * @version 2017-06-28T14:00:13+0800
 * @example no example
 * @modification list 2017-06-28 新增 
                       2017-06-28 修改
 * @param {Function} callback 无
 * @return {data}
 */
G.getUserInf = function(callback) {
    $.post(basePath + '/logonInfo?random=' + Math.random(),
        function(d) {
            callback&&callback(d);
        });
}
G.getUserInf(function(d) {
    if (d.flag == 0) {
        var _h = $('.header'),
            _l = _h.find('.loginReg'),
            _lw = _h.find('.logo_wrap'),
            _u = _h.find('.u_info');
        if (d.data.accountTitle) {
            hasLogined = true;
            _l.hide();
            _u.removeClass('no_dis').show()
                .find('.menu').text(d.data.accountTitle)
                .end().find('.uPhoto').attr('src', d.data.accountPhoto);
            _lw.find('.no_login').hide()
                .end().find('.has_login').removeClass('no_dis').show();
        }
        if(d.data.hasClass){$('#just_stu').show();};
    }
});
function for_selct() {
    $(".select_sp span.cur-select").on('click', function() {
        var selectIsVisible = $(this).next("div.select").is(":visible");
        $(".select_sp div.select").hide();
        if (selectIsVisible == false) {
            $(this).next("div.select").show();
        }
    });
    $(".select_sp div.select").on('mouseleave', function() {
        $(this).hide();
    });
};
$.myPost = function(url, data, callback, type) {
    if ("object" == typeof url) {
        url.type = 'post';
        $.ajax(url);
    } else {
        if ("function" == typeof data) {
            type = type || callback;
            callback = data;
            data = {};
        }
        $.post(url, data, function(d) {
            if (d == null || d == undefined || d.flag == null || d.flag == undefined) {
                console.log("undefined d or d.flag");
                return;
            }
            if (d.flag == 1) {
                window.location.href = G.opt.post_url + d.data;
            } else { callback(d); }
        }, type == undefined ? "json" : type);
    }
};

//截取字符串（从start字节到end字节）
String.prototype.strToCharsCH = function() {
    for (var a = new Array, b = 0; b < this.length; b++) a[b] = [this.substr(b, 1), this.isCHS(b)];
    return String.prototype.charsArray = a, a
};
String.prototype.isCHS = function(a) {
    return this.charCodeAt(a) > 255 || this.charCodeAt(a) < 0 ? !0 : !1
};
String.prototype.subCHString = function(a, b) {
    var c = 0,
        d = "";
    this.strToCharsCH();
    for (var e = 0; e < this.length; e++) {
        if (this.charsArray[e][1] ? c += 2 : c++, c > b) return d;
        c > a && (d += this.charsArray[e][0])
    }
    return d
};
String.prototype.subCHStr = function(a, b) {
    return this.subCHString(a, a + b)
};
String.prototype.ByteCount = function() {
    var d = 0;
    this.strToCharsCH();
    for (var e = 0; e < this.length; e++) {
        this.charsArray[e][1] ? d += 2 : d++;
    }
    return d;
};

String.prototype.startWith = function(str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.endWith = function(str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}
