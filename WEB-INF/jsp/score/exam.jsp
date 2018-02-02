<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <jsp:include page="../include/head.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/js/ckeditor/ckeditor.js"></script>
    <style type="text/css">
        .cke_top{background: transparent!important;background-image: none!important;}
        .cke_toolgroup{box-shadow:none;}
        .scratch_pad .layui-layer-content{overflow: hidden;}
        .demo-class .layui-layer-content,.demo-class .layui-layer-btn{text-align: center;}
        .demo-class .layui-layer-btn a{border: 0; border-radius:15px;color: #fff; width: 80px;height: 26px;line-height: 25px;text-align: center;padding: 0;}
        .demo-class .layui-layer-btn .layui-layer-btn0{background-color: #FF9A63;margin-right: 40px;}
        .demo-class .layui-layer-btn .layui-layer-btn1{background-color: #999;}
        .demo-class .layui-layer-btn .layui-layer-btn0:hover{background-color: #F37633;}
        .demo-class .layui-layer-btn .layui-layer-btn1:hover{background-color: #666;}
        .scratch_pad_btn{background: #D8D8D8;}
        .btn_scratch_pad {color: #333;background: transparent;line-height: 37px;font-size: 14px;cursor: pointer;}
       .btn_scratch_pad:before{content: ''; display: inline-block; width: 16px;height: 17px;background: url(${basePath}/images/icos/spad_icon.png); position: relative;top: 2px;margin:0 10px 0 27px; }
       .btn_scratch_pad:hover{color: #333!important;}
       .cke_reset{margin: 0 auto!important;}
        .layui-layer-page .layui-layer-content{overflow: hidden!important;}
    </style>
   
<body>

    <input type="hidden" id="practiceExamId" name="practiceExamId" value="${result.practiceDetailVO.id}">
    <input type="hidden" id="remainingSecond" name="remainingSecond" value="${result.practiceDetailVO.remainingSecond}">
    <input type="hidden" id="totalItemNum" name="totalItemNum" value="4">
    <input type="hidden" id="currentItemIndex" name="currentItemIndex" value="1">
    <input type="hidden" id="examStartTime" name="examStartTime" value="">
    <input type="hidden" id="examEndTime" name="examEndTime" value="">
    <input type="hidden" id="itemEndTime" name="itemEndTime" value="">
    <form id='endForm' action="${basePath}/practices/${result.practiceDetailVO.id}/end-exam" method='post'>
        <input type="hidden" id="formDetailId" name="practiceExamDetailId">
        <input type="hidden" id="formItemId" name="practiceExamItemId">
        <input type="hidden" id="formAnswer" name="answer" value="">
    </form>
    <div id="pcontentCK"></div>     
    <div class="section_wrap">
        <a name="web_top"></a>
        <div class="clearfix relatv mainw p_main_lrsp p_exam">
            <p class="clearfix tit"><span class="fl left">${result.practiceDetailVO.name}</span><span class="fr right"><i class="ico"></i>距离考试结束<i class="time">${result.practiceDetailVO.remainingTimeAsString}</i></span>
            </p>
            <div class="main_l prat_area">
             <div class="scratch_pad_btn"><a class="btn_scratch_pad" href="javascript:;">Scratch Pad</a></div>
                <div class="relatv content">
                    <p class="btns">
                        <span class="btn btn_matris" id="referenceMaterials">Reference Materials</span>
                        <span class="btn" onclick="window.open ('${result.practiceDetailVO.preSeenFileUrl}','newwindow','height=768,width=985,top=5,left=20,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') ">Pre-seen</span>
                        

                    </p>
                    <input id="save_for_cont" type="hidden" value="">
                    <jsp:include page="../include/exam-detail.jsp"></jsp:include>
                    <div id="for_cont">
                        <div class="cont conts"></div>
                        <div id="txt_for_cont" class="cont">
                            <textarea id="editor_ans" placeholder="请在此进行答题。(Please input your answer here.)"></textarea>
                        </div>
                    </div>
                    <div data-pagecount="0" data-totalcount="0" data-page="1" data-rows="10" data-type="0" id="pager" style="display: block;" class="pagination">
                        <div class="page"><a href="javascript:void(0)" class="prev">&lt;Prev</a><a href="javascript:void(0)">1</a><a href="javascript:void(0)">2</a><a href="javascript:void(0)" class="current">3</a><a href="javascript:void(0)">4</a><a href="javascript:void(0)" class="next">Next&gt;</a>
                        </div>
                    </div>
                    <div class="reference">
                        <i class="ico close"></i>
                        <ul class="clearfix tabs" id="material_name_list">
                            <%--         Fill with [exam-detail.jsp]#tmpl_material_name_list#         --%>
                        </ul>
                        <div class="lists" id="material_content_list">
                            <%--         Fill with [exam-detail.jsp]#tmpl_material_content_list#         --%>
                        </div>
                        <span class="btn go_back">back</span>
                    </div>
                </div>
            </div>
            <div class="relatv main_r">
                <div class="inner">
                    <div class="ans_sheet">
                        <p class="c_tit"><i class="ico"></i>答题卡</p>
                        <ul class="ul_c" id="item_content_list">
                        </ul>
                        <div class="tips">本题答题时间马上就要结束了！
                            <br /> 即将为您跳转到下一题...</div>
                    </div>
                </div>
                <div class="btn_ok" id="btn_end_exam">End Exam</div>
                <div class="btn_operate" onclick="window.open ('${result.practiceDetailVO.formulaFile}','newwindow','height=768,width=985,top=5,left=20,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') "><i class="ico"></i>Tables and Formulae</div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.pagination.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/jquery.mCustomScrollbar.min.js"></script>
    <script type="text/javascript" src="${basePath}/js/gloab.min.js?version=0.1166305005534305"></script>
    <script type="text/javascript" src="${basePath}/js/layer/layer.js?version=0.1166305005534305"></script>
    <script type="text/javascript" src="${basePath}/js/ckeditor/ckeditor.js"></script>
    <script type="text/javascript">
    var editor_ans;
    //各个题目倒计时
    function right_time_down() {
        var exam_start = $("#examStartTime").val();
        var exam_end = $("#examEndTime").val();
        var item_end = $("#itemEndTime").val();

        //顶部倒计时
        timeCount({
            startTime: exam_start,
            dom: $(".p_exam .tit .right .time"),
            endTime: new Date(exam_end),
            flag: 0
        });

        timeCount({
            startTime: exam_start,
            dom: $(".ans_sheet .has_half .time"),
            endTime: new Date(item_end),
            flag: 0,
            format: 6,
            callback: function(dom, cur_time) {
                var o = dom.parent('.sp'),
                    _t = new Date(o.data('time'));
                o.css('width', (1 - new Date(cur_time).getTime() / _t) * 100 + '%');
                cur_time === 110 && show_timeover(); //1分钟时显示自动结束提示框
                cur_time <= 2 && upload_data(); //自动提交结果
            }
        });
    }
    var resize_pad = function(){
        var ck = $('#cke_contentCK'),
            ly = $('.scratch_pad');
        ck.width(ly.width()-4)
        .height(ly.height()-42);
        ck.find('.cke_reset').height(ly.height()-72);
    };
    $(function() {
        init_detail();
        editor_ans = CKEDITOR.replace('editor_ans', {
            width: '890px',
            height: '414px',
            toolbar: 'MyToolbar',
            resize_enabled: false,
            toolbarCanCollapse: false
        });       
        var practiceExamId = $("#practiceExamId").val();
        // 考试开始后，每3分钟提交一次本题答案
        window.setInterval(function() {
            practiceExamId && ($.trim(editor_ans.getData())!='') && $.post('${basePath}/practices/saveAnswer/' + practiceExamId + '?random=' + Math.random(), {
                'practiceExamDetailId': $.trim($("#formDetailId").val()),
                'practiceExamItemId': $.trim($("#formItemId").val()),
                'answer': $.trim(editor_ans.getData())
            }, function(d) {
                if (d.flag == 0) {
                    layer.msg('已经自动保存数据', { time: 1000 });
                }
            })
        }, 180000);
        $('.btn_scratch_pad').on('click', function() {
            var obj = $('.scratch_pad');
            if (obj.length > 0) {
                layer.restore(layer_pad);
                obj.show();
            } else {
                $('#pcontentCK').html('<textarea rows="3" cols="5" id="contentCK"></textarea>');
                //编辑器加载
                editor = CKEDITOR.replace('contentCK', {
                    height: '178px',
                    width: '396px',
                    toolbar: 'MyToolbar',
                    resize_enabled: false,
                    toolbarCanCollapse: false
                });
                layer_pad = layer.open({
                    type: 1,
                    shade: false,
                    skin: 'scratch_pad',
                    area: ['400px', '265px'],
                    title: 'Scratch pad',
                    scrollbar: false,
                    maxmin: true,
                    offset: ['86', '0'],
                    fix: true, //不固定
                    resize:true,
                    content: $('#contentCK'),
                    zIndex: layer.zIndex, //重点1
                    success: function(layero) {
                        resize_pad();
                    },
                    min: function() {
                        $('.scratch_pad').hide();
                        resize_pad();
                    },
                    resizing: function() {
                        resize_pad();
                    },
                    restore: function() {
                        resize_pad();
                    },
                    full: function() {
                        $('#cke_contentCK').width($(window).width() - 2);
                        resize_pad();
                    },
                    end: function() {
                        $('#pcontentCK').html('');
                    }
                });
            }
        });
        //参数page_index{int整型}表示当前的索引页
        var initPagination = function() {
            // 创建分页
            $("#pager").pagination(2, {
                num_edge_entries: 2, //边缘页数
                items_per_page: 1, //每页显示的条目数
                num_display_entries: 4, //主体页数
                current_page: 0,
                callback: pageselectCallback,
                prev_text: "&lt; Prev",
                next_text: "Next &gt;",
            });
        }();

        function pageselectCallback(page_index, jq) {
            var totalPage = $("#totalItemNum").val(); //当前第几道题，由jsp变量给其赋值
            var currentPage = $("#currentItemIndex").val();
            var txt = $('#for_cont #txt_for_cont'),
                ob = $('#for_cont .conts');
            //答题框
            page_index === 0 ? (ob.show(), txt.hide()) : (ob.hide(), txt.show());
            var o = $("#pager").children('.current.next');
            if (o.length > 0) {
                var s = '提交将进入下一题,且不能返回修改。<br />确认提交吗？';
                totalPage == currentPage && (s = '确定结束答题吗？');
                o.hide().after('<a class="next" href="javascript:;" onclick="layer_tip(\'' + s + '\')">submit &gt;</a>');
            }
            return false;
        }

        $('.reference').on('click', '.li_c', function() {
            var _t = $(this);
            _t.addClass('curr')
                .siblings('.curr').removeClass('curr')
                .end().parent().next('.lists').find('.lst_cont').eq(_t.index()).show()
                .siblings('.lst_cont').hide();
        }).on('click', '.go_back', function() {
            $(this).parent().hide()
                .parent('.content').children('#for_cont').show();

        });
        $('.content .btn_matris').on('click', function() {
            $('.reference').show();
            $('.content #for_cont').hide();
        });
        $('.reference .close').on('click', function() {
            $('.reference .go_back').click();
        });

        $('#btn_end_exam').on('click', function() {
            var s = '确定结束答题吗？';
            layer_tip(s, 1);
        });
    });
    //询问框
    function layer_tip(s,type) {
        layer.open({
            skin: 'demo-class',
            title: '提示',
            content: s,
            btn: ['取消', '确定'], //按钮
            closeBtn: 1,
            area: ['295px'],
            btn2: function(index) { //或者使用btn2
                if(type){
                    var total = $("#totalItemNum").val();
                    $("#currentItemIndex").val(total);
                }
                submitExam();
            },
            btn1: function(index, layero) { //或者使用btn1
                layer.close(index);
            }
        });
    }

    function show_timeover() {
        var totalPage = $("#totalItemNum").val();
        var currentPage = $("#currentItemIndex").val();
        var s = '本题答题时间马上就要结束了！<br> 即将为您跳转到下一题...';
        totalPage == currentPage && (s = '本题答题时间马上就要结束了！<br>考试即将结束');
        layer.tips(s, $('.has_half'), {
            tips: [4, '#1FA0E2'],
            time: 10000
        });
    }
    //自动提交结果
    function upload_data() {
        submitExam();
        layer.msg('数据提交成功');
    }
    $(function() {
        $('.p_scroll').mCustomScrollbar({
            axis: "y",
            scrollButtons: {
                enable: true
            },
            theme: "3d",
            scrollbarPosition: "inside"
        });
    });

    //初始化数据
    function init_detail() {
        var practiceExamId = $("#practiceExamId").val();
        $.post(
            '${basePath}/practices/' + practiceExamId + '/detail?random=' + Math.random(),
            function(d) {
                if (d.data != "" && d.data != null) {
                    //
                    if (d.data.listPEReferenceMaterial != null && d.data.listPEReferenceMaterial != '') {
                        $("#material_name_list").html('');
                        G.show_data(d.data.listPEReferenceMaterial, $("#tmpl_material_name_list"), $("#material_name_list"));
                        //
                        $("#material_content_list").html('');
                        G.show_data(d.data.listPEReferenceMaterial, $("#tmpl_material_content_list"), $("#material_content_list"));
                        $('.reference').hide();
                    } else {
                        $("#referenceMaterials").hide();
                    }
                    //
                    if (d.data.peItem != null && d.data.peItem != '') {
                        $("#formItemId").val(d.data.peItem.id);
                        $("#for_cont .conts").html('');
                        G.show_data(d.data.peItem, $("#tmpl_item_content"), $("#for_cont .conts"));
                        //首次保存当前题目内容
                        // $('#save_for_cont').val($('#for_cont').html());
                    }
                    //
                    if (d.data && 　d.data.listPEItemVO) {
                        if (d.data.listPEItemVO != '') {
                            $("#item_content_list").html('');
                            G.show_data(d.data.listPEItemVO, $("#tmpl_item_content_list"), $("#item_content_list"));
                            $('#item_content_list li:last').addClass('last');
                            $("#examStartTime").val(d.data.peDetailVO.nowTimeAsString);
                            $("#examEndTime").val(d.data.peDetailVO.finishTimeAsString);
                            $("#itemEndTime").val(d.data.peDetailVO.itemFinishTimeAsString);
                            right_time_down();
                        }
                        $("#totalItemNum").val(d.data.peDetailVO.totalItemNum);
                        $("#currentItemIndex").val(d.data.peDetailVO.currentItemIndex);
                        $("#formDetailId").val(d.data.peDetailVO.id);
                    }

                    $('.reference .ref_mater').hide();
                    //读取数据
                    $('.reference .li_c').eq(0).click();
                    try{
                        // 考试开始3分钟后，如果答题框没内容，调用一次历史答案
                        editor_ans && ($.trim(editor_ans.getData()) == '') && $.get('${basePath}/practices/getAnswer/' + practiceExamId + '?random=' + Math.random(), {
                            'practiceExamDetailId': $.trim($("#formDetailId").val()),
                            'practiceExamItemId': $.trim($("#formItemId").val())
                        }, function(d) {
                            if (d.flag == 0 && d.data.answer) {
                                if(editor_ans){
                                    editor_ans.setData(d.data.answer);
                                    setTimeout(function(){
                                        if(!$.trim(editor_ans.getData())){
                                            editor_ans.setData(d.data.answer);
                                        }
                                        layer.msg('已经自动恢复数据', { time: 1000 });
                                    },500);
                                }
                            }
                        })
                    }catch(e){
                        console.dir(e)
                    }
                }
            },
            'json'
        );
    }

    //自动提交结果
    function submitExam() {
        var total = $("#totalItemNum").val();
        var current = $("#currentItemIndex").val();
        if (total === current) {
            submitAndEnd();
        } else {
            submitItem();
        }
    }

    function submitItem() {
        var practiceExamId = $.trim($("#practiceExamId").val());
        var practiceExamDetailId = $.trim($("#formDetailId").val());
        var practiceExamItemId = $.trim($("#formItemId").val());
        $.post(
            '${basePath}/practices/' + practiceExamId + '/submit?random=' + Math.random(), {
                'practiceExamDetailId': practiceExamDetailId,
                'practiceExamItemId': practiceExamItemId,
                'answer': editor_ans ? $.trim(editor_ans.getData()) : ''
            },
            function(d) {
                if (d.flag == 0) {
                    window.location.reload(true);
                }
                else{
                    try{
                        layer.msg(d.msg);
                    }catch(e){}
                    window.setTimeout(function(){
                        window.location.reload(true)
                    },2000);
                }
            });
    }

    function submitAndEnd() {
        $("#formAnswer").val(editor_ans ? $.trim(editor_ans.getData()) : '');
        $("#endForm").submit();
    }
    </script>
</body>

</html>
