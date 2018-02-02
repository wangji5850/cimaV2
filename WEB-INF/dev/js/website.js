$.extend(cache_processor, {
	
	
	/**
	 * @param _id 下拉框的dom的id, string
	 */
	getSelectedId: function(_id){
		var _container = $("#"+_id);
		var _curSelect = _container.find("span.cur-select");
		return _curSelect.attr("selectedId");
	},
	
	/**
	 * @param _p 省份下拉框的dom的id, string
	 * @param _c 城市下拉框的dom的id, string
	 */
	intiAddressSelect: function(_p, _c){
		var _pContainer = $("#"+_p);
		var _cContainer = $("#"+_c);
		
		// province
		var _pCurSelect = _pContainer.find("span.cur-select");
		_pCurSelect.attr("selectedId",null);
		_pCurSelect.text("请选择省份");
		var _pSelect = _pContainer.find("div.select");
		_pSelect.html("");
		$.each(cacheAddressMap, function(index, item) {
			_pSelect.append('<p onclick="G.cache_processor.selectProvince(\'' + _p + '\', \'' + _c + '\',' + item.id + ');">' + item.name + '</p>')
        });
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",null);
		_cCurSelect.text("请选择城市");
		var _cSelect = _cContainer.find("div.select");
		_cSelect.html("");
	},
	
	/**
	 * @param _p 省份下拉框的dom的id, string
	 * @param _c 城市下拉框的dom的id, string
	 * @param provinceId 被选择省份的id, int
	 */
	selectProvince: function(_p, _c, provinceId){
		var _pContainer = $("#"+_p);
		var _cContainer = $("#"+_c);
		var provinceGroup = provinceId==null ? null : cacheAddressMap[provinceId];
		
		// province
		var _pCurSelect = _pContainer.find("span.cur-select");
		_pCurSelect.attr("selectedId",provinceId);
		_pCurSelect.text(provinceGroup==null ? "请选择省份" : provinceGroup.name);
		var _pSelect = _pContainer.find("div.select");
		_pSelect.hide();
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",null);
		_cCurSelect.text("请选择城市");
		var _cSelect = _cContainer.find("div.select");
		_cSelect.html("");
		if(provinceGroup!=null){
			$.each(provinceGroup.cityList, function(index, item) {
				_cSelect.append('<p onclick="G.cache_processor.selectCity(\'' + _c + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
	        });
		}
	},
	
	/**
	 * @param _c 城市下拉框的dom的id, string
	 * @param cityId 被选择城市的id, int
	 * @param cityName 被选择城市的name, string
	 */
	selectCity: function(_c, cityId, cityName){
		var _cContainer = $("#"+_c);
		
		// city
		var _cCurSelect = _cContainer.find("span.cur-select");
		_cCurSelect.attr("selectedId",cityId);
		_cCurSelect.text(cityId==null ? "请选择城市" : cityName);
		var _cSelect = _cContainer.find("div.select");
		_cSelect.hide();
	},
	
	
	/**
	 * 
	 */
	intiIndustryCacheData: function(){
		if(cacheIndustryList==undefined||cacheIndustryList==null||cacheIndustryList.length==0){
			$.get(G.opt.post_url + '/cache/industryList?random='+Math.random(),{},function(d){
				if(d.flag==0){
					cacheIndustryList = d.data;
				}
			});
		}
	},
	
	
	
	/**
	 * @param _i 行业下拉框的dom的id, string
	 */
	intiIndustrySelect: function(_i){
		var _container = $("#"+_i);
		
		// industry
		var _curSelect = _container.find("span.cur-select");
		_curSelect.attr("selectedId",null);
		_curSelect.text("请选择行业");
		var _select = _container.find("div.select");
		_select.html("");
		if(cacheIndustryList==undefined||cacheIndustryList==null||cacheIndustryList.length==0){
			$.get(G.opt.post_url + '/cache/industryList?random='+Math.random(),{},function(d){
				if(d.flag==0){
					cacheIndustryList = d.data;
					$.each(cacheIndustryList, function(index, item) {
						_select.append('<p onclick="G.cache_processor.selectIndustry(\'' + _i + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
			        });
				}
			});
		}else{
			$.each(cacheIndustryList, function(index, item) {
				_select.append('<p onclick="G.cache_processor.selectIndustry(\'' + _i + '\', ' + item.id + ',\'' + item.name + '\');">' + item.name + '</p>')
	        });
		}
	},
	
	/**
	 * @param _i 行业下拉框的dom的id, string
	 * @param industryId 被选择行业的id, int
	 * @param industryName 被选择行业的name, string
	 */
	selectIndustry: function(_i, industryId, industryName){
		var _container = $("#"+_i);
		
		// industry
		var _curSelect = _container.find("span.cur-select");
		_curSelect.attr("selectedId",industryId);
		_curSelect.text(industryId==null ? "请选择行业" : industryName);
		var _select = _container.find("div.select");
		_select.hide();
	},
	
	
});
$.extend(G, {
	cache_processor: cache_processor
});
$.extend(exercise_set, {
    init: function() {
    	//收藏题集
        $('.page_list .hot_sheet').on('click', '.store', function() {
        	var _t = $(this);
        	var setId = _t.parents('.li').attr('data-id');
        	
        	if(!_t.hasClass('has_store')) {
        		$.post(G.opt.post_url + '/exsets/'+ setId + '/collect?random='+Math.random(),
                    	{'noteId' : setId},
            			function(d){
                    		_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectNum +")")
                    	});
        	}else {
        		$.post(G.opt.post_url + '/exsets/'+ setId + '/uncollect?random='+Math.random(),
                    	{'noteId' : setId},
            			function(d){
                    		_t.html("<i class=\"ico\"></i>收藏 (" + d.data.collectNum +")")
                    	});
        	}
        	_t.toggleClass('has_store');
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
                    G.exercise_set.pageClick(pageNo, pagesize, type);
                }
            }).show()
            .find('a').prop('href','#mainw_content');
        }
    },
    pageClick: function(pageNo, pageSize, type) {
        var _t = G;
        var url = "";
        if(type == 1) {
        	url = "/exsets/hot";
        }else if(type == 2) {
        	url = "/account/exset-self";
        }
        else if(type == 3) {
        	url = "/account/exset-other";
        }else if(type == 4) {
        	url = "/account/exset-collect";
        }
        
        if(type<2){
            $.get(_t.opt.post_url + url + '?random='+Math.random(),
        			{'pageNo':pageNo,
            	'pageSize':pageSize},
        			function(d){
        				$('.hot_sheet').html('');
                		
                		if(type == 1) {
                			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                    		}else {
                    			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                    		}
                		$('.hot_sheet .chot_sheet').each(function() {
                			$(this).children().last().addClass('last');
                		})
                		G.set_qa_tn(d.data.rowBounds.totalCount);
                        G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                	});
        }else{
        	if(type==3){
        		$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
            			{'pageNo':pageNo,
                		 'pageSize':pageSize,
                		 'accountIdOfAnother' : $("#accountIdOfAnother").val()},
            			function(d){
                			 if(d.flag!=0){console.log(d.msg);return;}
            				$('.hot_sheet').html('');
                    		
                    		if(type == 1) {
                    			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}else {
                        			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}
                    		$('.hot_sheet .chot_sheet').each(function() {
                    			$(this).children().last().addClass('last');
                    		})
                    		G.set_qa_tn(d.data.rowBounds.totalCount);
                            G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                    	});
        	}else{
            	$.myPost(_t.opt.post_url + url + '?random='+Math.random(),
            			{'pageNo':pageNo,
                	'pageSize':pageSize},
            			function(d){
                			if(d.flag!=0){console.log(d.msg);return;}
            				$('.hot_sheet').html('');
                    		
                    		if(type == 1) {
                    			G.show_data(d.data.exsetVoList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}else {
                        			G.show_data(d.data.resultList, $("#tmpl_exercise_set_list"), $('.hot_sheet'));
                        		}
                    		$('.hot_sheet .chot_sheet').each(function() {
                    			$(this).children().last().addClass('last');
                    		})
                    		G.set_qa_tn(d.data.rowBounds.totalCount);
                            G.exercise_set.loadPager(pageNo, d.data.rowBounds.totalCount, d.data.rowBounds.pageSize, type);
                    	});
        	}
        }
    }

});
$.extend(G, {
	exercise_set: exercise_set
});

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

$.extend(focus, {
    init: function() {
    	//列表页取消关注
        $('.p_my_focus').on('click', '.focus', function() {
        	var _t = $(this);
        	var accountId = _t.parents('.li').attr('data-id');
        	if(!_t.hasClass('has_focus')){
        		$.myPost(G.opt.post_url + '/account/onFocus?random='+Math.random(),
                	{'accountIdOfToOnFocus' : accountId},
            		function(d){
                		if(d.flag!=0){alert(d.msg);return;}
                		_t.addClass('has_focus');
                	}
                );
        	}else{
            	$.myPost(G.opt.post_url + '/account/offFocus?random='+Math.random(),
                	{'accountIdOfToOnFocus' : accountId},
        			function(d){
                		if(d.flag!=0){alert(d.msg);return;}
                		_t.removeClass('has_focus');
                	}
                );
        	}
		});
        
        //详情页关注
        $('.u_info .operate').on('click', '.btn1', function() {
        	var _t = $(this);
        	var accountId = _t.attr('data-id');
        	if(_t.text() != "已关注") {
        		$.post(G.opt.post_url + '/account/onFocus?random='+Math.random(),
                    	{'accountIdOfToOnFocus' : accountId},
            			function(d){
                    		_t.html("已关注");
                    	});
        	}else {
        		$.post(G.opt.post_url + '/account/offFocus?random='+Math.random(),
                    	{'accountIdOfToOnFocus' : accountId},
            			function(d){
                    		_t.html("+ 关注");
                    	});
        	}
        	
		});
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
                    _t.set_qa_pn(pageNo);
                    G.focus.pageClick(pageNo,pagesize);
                }
            }).show();
        }
    },
    pageClick: function(pageNo,pageSize) {
        var _t = G;
        $.post(_t.opt.post_url + '/account/focus-self?random='+Math.random(),
    			{'pageNo':pageNo,
				'pageSize':pageSize},
    		   function(d){
           		$('.p_my_focus .ul').html('');
           		G.show_data(d.data.resultList, $("#tmpl_focus_list"), $('.p_my_focus .ul'));
           		/* $('.my_mark').each(function() {
           			$(this).children().last().addClass('last');
           		}) */
           		$('.totalcount').find('i').html(d.data.rowBounds.totalCount)
           		if(d.data.rowBounds.pageCount > 1) {
           			G.focus.loadPager(G.get_qa_pn(), d.data.rowBounds.totalCount, d.data.rowBounds.pageSize);
           		}
           	});
    },

});
$.extend(G, {
	focus: focus
});

$.extend(login, {

	doLogin: function(){
		
		var loginDiv = $("#login_div");
		var checkFlag = true;
		
		// loginName
		var loginNameInput = loginDiv.find("input[name='loginName']");
		var loginNameError = loginNameInput.parent("div").next(".error");
		var loginName = loginNameInput.val();
		var phoneValid = G.phoneValid(loginName);
		var emailValid = G.emailValid(loginName);
		if(phoneValid==false&&emailValid==false){
			checkFlag = false;
			loginNameError.show();
		}else{
			loginNameError.hide();
		}
		
		// loginPass
		var loginPassInput = loginDiv.find("input[name='loginPass']");
		var loginPassError = loginPassInput.parent("div").next(".error");
		var loginPass = loginPassInput.val();
		var pwdValid = G.pwdValid(loginPass);
		if(pwdValid==false){
			checkFlag = false;
			loginPassError.html('<i class="ico"></i>密码长度6~16位').show();
		}else{
			loginPassError.hide();
		}
		
		// doPost
		if(checkFlag==false){return;}
		var postData = {
				'loginName': loginName,
				'loginPass': calcMD5(loginPass).toLowerCase(),
				'remember': $("#login_div i.ico").hasClass("checked")
		};
		$.post(G.opt.post_url + '/login?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				// window.location.href = G.opt.post_url + d.data;
				var str = document.referrer;
				window.location.href = (str && str != window.location.href && str.indexOf('register') == -1 && str.indexOf('look-for-pwd') == -1 ) ? str : G.opt.post_url;
			}else{
				// alert(d.msg);
				loginPassError.html('<i class="ico"></i>'+ d.msg).show();
			}
        });
	},


	logout: function(){
		$.post(G.opt.post_url + '/logout?random='+Math.random(), {}, function(d){
			window.location.href = G.opt.post_url;
        });
	}
	
});
$.extend(G, {
    login: login
});

$.extend(look_for_pwd, {
	
	phoneOrEmailOpt: {
		exist: false
	},
	
	
	/**
	 * check phoneOrEmail (in server)
	 */
	checkPhoneOrEmailStrong: function(){
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if(G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false){
			checkFlag = false;
			phoneOrEmailError.show();
            register.setBtnColor($(".login_reg .get_phone_code"), 0);
		}else{
			phoneOrEmailError.hide();
            register.setBtnColor($(".login_reg .get_phone_code"), 1);
		}
		// do post
		if(checkFlag==false){return;}
		var postData = {'phoneOrEmail': phoneOrEmail};
		$.post(G.opt.post_url + '/account/on-look-for-pwd-chke?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				G.look_for_pwd.phoneOrEmailOpt.exist=true;
            	register.setBtnColor($(".login_reg .get_phone_code"), 1);
			}else{
				G.look_for_pwd.phoneOrEmailOpt.exist=false;
				phoneOrEmailError.show();
            	register.setBtnColor($(".login_reg .get_phone_code"), 0);
			}
        });
	},
	
	
	/**
	 * send check code
	 */
	sendCheckCodeOpt: {
    	canSend: true,
        intervalObj: null,
        currentSecond: 60,
    },
    sendCheckCodeInterFunc: function(){
    	var lookForPwdDiv = $("#look_for_pwd_div");
    	var _input = lookForPwdDiv.find("input[name='checkCode']");
    	var _oper = _input.parents("li.li").find("span[name='checkCodeOper']");
    	var _opt = G.look_for_pwd.sendCheckCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.attr("disabled",null); //启用按钮
            _oper.text("重新发送"); 
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送("+_opt.currentSecond+"s)");
            register.setBtnColor(_oper, 0);
        }
    },
	sendCheckCode: function(){
		if(G.look_for_pwd.sendCheckCodeOpt.canSend!=true){return;}
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if(G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false){
			checkFlag = false;
			phoneOrEmailError.show();
		}else{
			phoneOrEmailError.hide();
		}
		// checkCode
		var checkCodeInput = lookForPwdDiv.find("input[name='checkCode']");
		var checkCodeOper = checkCodeInput.parents("li.li").find("span[name='checkCodeOper']");
		// do post
		if(checkFlag==false){return;}
		G.look_for_pwd.sendCheckCodeOpt.canSend = false;
		checkCodeOper.attr("disabled","disabled"); //停用按钮
		var postData = {'phoneOrEmail': phoneOrEmail};
		$.post(G.opt.post_url + '/checkCode/sendForLookForPwd?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				G.look_for_pwd.sendCheckCodeOpt.intervalObj = window.setInterval(G.look_for_pwd.sendCheckCodeInterFunc, 1000); //启动计时器，1秒执行一次 
			}else{
				G.look_for_pwd.sendCheckCodeOpt.canSend = true;
				checkCodeOper.attr("disabled",null); //启用按钮
				checkCodeOper.text("发送失败，重新发送"); 
			}
        });
	},
	
	/**
	 * do reset pwd
	 */
	doResetPwd: function(){
		var lookForPwdDiv = $("#look_for_pwd_div");
		var checkFlag = true;
		// phoneOrEmail
		var phoneOrEmailInput = lookForPwdDiv.find("input[name='phoneOrEmail']");
		var phoneOrEmailError = phoneOrEmailInput.parents("li.li").find("div.error");
		var phoneOrEmail = phoneOrEmailInput.val();
		if((G.phoneValid(phoneOrEmail)==false&&G.emailValid(phoneOrEmail)==false)||G.look_for_pwd.phoneOrEmailOpt.exist==false){
			checkFlag = false;
			phoneOrEmailError.show();
		}else{
			phoneOrEmailError.hide();
		}
		// checkCode
		var checkCodeInput = lookForPwdDiv.find("input[name='checkCode']");
		var checkCodeError = checkCodeInput.parents("li.li").find("div.error");
		var checkCode = checkCodeInput.val();
		if(checkCode==null||checkCode.length!=4){
			checkFlag = false;
			checkCodeError.show();
		}else{
			checkCodeError.hide();
		}
		// newPassword
		var newPasswordInput = lookForPwdDiv.find("input[name='newPassword']");
		var newPasswordError = newPasswordInput.parents("li.li").find("div.error");
		var newPassword = newPasswordInput.val();
		var pwdValid = G.pwdValid(newPassword) && G.strongpwd_ck(newPassword);
		if(pwdValid==false){
			checkFlag = false;
			newPasswordError.show();
		}else{
			newPasswordError.hide();
		}
		// do post
		if(checkFlag==false){return;}
		var postData = {
				'phoneOrEmail': phoneOrEmail,
				'checkCode': checkCode,
				'newPassword': newPassword
		};
		$.post(G.opt.post_url + '/account/on-look-for-pwd?random='+Math.random(), postData, function(d){
			if(d.flag==0){
				window.location.href = G.opt.post_url+"/login";
			}else{
				alert(d.msg);
			}
        });
	},
	
	
	/**
	 * cancel
	 */
	cancel: function(){
		window.location.href = G.opt.post_url;
	},
	
	
});
$.extend(G, {
	look_for_pwd: look_for_pwd
});
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

$.extend(private_message, {
	init: function(){
		//监听服务
		$.post(
			G.opt.post_url+'/chat/getprops?random='+Math.random(),
  			function(d){
				if(d.data!="" && d.data!=null){
					var has_had_focus = false;  
					if(typeof WebSocket != 'undefined'){
						//var ws = new WebSocket('ws://10.10.1.173:15674/ws');
						var ws = new WebSocket(d.data.wsUrl);
					}else{
						//var ws = new SockJS('http://10.10.1.173:15674/stomp');
						var ws = new SockJS(d.data.stompUrl);
					}
					var client = Stomp.over(ws);
					var on_connect = function(x) {
						//var queue= 'e508229e-d48b-11e6-b366-000c294d68651';//UUID+ID
						var queue= d.data.queueName;
						id = client.subscribe(queue, function(d) {
							//$('#div_msg_list').prepend($("#tmpl_msg_list").tmpl(d.body));
							//console.dir(d.body);
							//$("#contactId"+contactId+" i:eq(0)").addClass('mark');
							//$('#div_msg_list').append($("#tmpl_msg_list").tmpl($.parseJSON(d.body)));
							var objMSG=$.parseJSON(d.body);
							var msgType=objMSG.msgType;
							var fromid=objMSG.fromid;
							var contactId=0;
							var flag=true;
							$('#div_msg_account li').each(function(){
								var dataId=$(this).attr('data-id');
								if($(this).hasClass('curr')){
									contactId=dataId;
								}
								if(fromid==dataId){
									flag=false;
								}
							});
							//如果联系人不存在列表中,加载.
							if(flag && msgType==2){
								$.post(
									G.opt.post_url+'/chat/search-fromId?random='+Math.random(),
									{'contactId':fromid},
						  			function(d){
										if(d.data!="" && d.data!=null){
											$("#div_msg_account").prepend($("#tmpl_msg_account").tmpl(d.data));
										}
						  			},
						  			'json'
						  		);
							}
							//判断是否是别人发过来的信息,并且用户是否被选中.
							if(msgType==2){
								if(fromid==contactId){
									$('#div_msg_list').append($("#tmpl_msg_list").tmpl(objMSG));
									$('#msg_p_scroll').mCustomScrollbar("scrollTo","bottom");
									if($('#foot_message').is(":visible")){
										$("#contactId"+fromid+" i:eq(0)").addClass('mark');
										$('#foot_message i:eq(0)').addClass('mark');
									}
								}else {
									$("#contactId"+fromid+" i:eq(0)").addClass('mark');
									$('#foot_message i:eq(0)').addClass('mark');
								}
							}else {
								$('#div_msg_list').append($("#tmpl_msg_list").tmpl(objMSG));
								$('#msg_p_scroll').mCustomScrollbar("scrollTo","bottom");
							}
						});
					};
					var on_error =  function() {
						//console.log('error');
					};
					//client.connect('chat', 'chat', on_connect, on_error, '/chat');
					client.connect(d.data.user, d.data.password, on_connect, on_error, d.data.vHost);
				}
  			},
  			'json'
  		);
		
	    //初始化事件
		$('#top_message').hide();
		$('#keywordMSG').val('');
		$('#foot_message').on('click',function(){
			$(this).hide();
			$('#top_message').show();
		});
		$('#close_message').on('click',function(){
			$('#top_message').hide();
			$('#foot_message').show();
		});
		G.private_message.listContactList();
		$('#keywordMSG').on('change',function(){
			G.private_message.searchAccount($(this).val());
		});
		$('#searchMSG').on('click',function(){
			G.private_message.searchAccount($('#keywordMSG').val());
		});
		$('#sendMSG').on('click',function(){
			var contentMSG=$.trim($('#contentMSG').val());
			var contactIdMSG=$.trim($('#contactIdMSG').val());
			if(contentMSG==""){
				$('#contentMSG').focus();
				return;
			}else if(contactIdMSG==""){
				return;
			}else {
				$.post(
					G.opt.post_url+'/chat/send-msg?random='+Math.random(),
					{'contactId':contactIdMSG,'contentMSG':contentMSG},
		  			function(d){
						$('#contentMSG').val('');
		  			},
		  			'json'
		  		);
			}
		});
	},
	//初始化最近联系人列表
	listContactList: function(){
		$.post(
			G.opt.post_url+'/chat/contact-list?random='+Math.random(),
  			function(d){
  				$("#div_msg_account").html('');
  				if(d.data.resultList!=null && d.data.resultList!=""){
  					$("#div_msg_account").append($("#tmpl_msg_account").tmpl(d.data.resultList));
  					if(d.data.flag){
  						$('#foot_message i:eq(0)').addClass('mark');
  					}
  				}
  			},
  			'json'
  		);
	},
	//打开私信对话框，并显示accountId的用户信息
	openMessage: function(accountId){
		$('#foot_message').hide();
		$('#top_message').show();
		$('#contactNickName').html('');
		$('#contactIdMSG').val(accountId);
		var flag=true;
		$('#div_msg_account li').each(function(){
			var contactId=$(this).attr('data-id');
			if(accountId==contactId){
				flag=false;
				$('#contactNickName').html($(this).attr('data-name'));
				$(this).addClass('curr').siblings().removeClass('curr');
			}
		});
		if(flag){
			$('#div_msg_account li').each(function(){
				$(this).removeClass('curr');
			});
			$.post(
				G.opt.post_url+'/chat/search-contactId?random='+Math.random(),
				{'contactId':accountId},
	  			function(d){
					if(d.data!="" && d.data!=null){
						//$("#div_msg_account").append($("#tmpl_msg_account").tmpl(d.data));
						$("#div_msg_account").prepend($("#tmpl_msg_account").tmpl(d.data));
						$('#contactNickName').html(d.data.nickName);
					}
	  			},
	  			'json'
	  		);
		}
		G.private_message.msgList(accountId);
	},
	//选中单个用户
	selectAccount: function(contactId){
		$('#contactNickName').html($("#contactId"+contactId).attr('data-name'));
		$("#contactId"+contactId).addClass('curr').siblings().removeClass('curr');
		$("#contactId"+contactId+" i:eq(0)").removeClass('mark');
		$('#contactIdMSG').val(contactId);
		G.private_message.msgList(contactId);
		G.private_message.removeMSG();
	},
	//删除用户
	deleteAccount: function(contactId){
		$.post(
			G.opt.post_url+'/chat/contanct-delete?random='+Math.random(),
			{'contactId':contactId},
  			function(d){
				$('#contactIdMSG').val();
				$('#contactId'+contactId).remove();
				$('#contactNickName').html('');
				$('#moreMsg').hide();
				$('#div_msg_list').html('');
				G.private_message.removeMSG();
  			},
  			'json'
  		);
	},
	//移除提示
	removeMSG: function(){
		var flag=true;
		$('#div_msg_account li').each(function(){
			var contactId=$(this).attr('data-id');
			if($("#contactId"+contactId+" i:eq(0)").hasClass('mark')){
				flag=false;
			}
		});
		if(flag){
			$('#foot_message i:eq(0)').removeClass('mark');
		}
	},
	//初始化显示数据
	msgList: function(contactId,lastId){
		$('#moreMsg').hide();
		$('#pageNoMSG').val(1);
		$('#div_msg_list').html('');
		$.post(
			G.opt.post_url+'/chat/msg-list?random='+Math.random(),
			{'contactId':contactId,'lastId':lastId,'pageNo':1},
  			function(d){
				if(d.data.resultList!="" && d.data.resultList!=null){
					$('#div_msg_list').append($("#tmpl_msg_list").tmpl(d.data.resultList));
					if(d.data.rowBounds.pageCount>1){
						$('#moreMsg').off('click');
						$('#moreMsg').show();
						$('#moreMsg').on('click',function(){
							G.private_message.moreMSG(contactId,lastId);
						});
					}
				}
				$('#msg_p_scroll').mCustomScrollbar("scrollTo","bottom");
  			},
  			'json'
  		);
	},
	//查看更多消息
	moreMSG: function(contactId,lastId){
		var pageNoMSG=parseInt($('#pageNoMSG').val())+1;
		$.post(
			G.opt.post_url+'/chat/msg-list?random='+Math.random(),
			{'contactId':contactId,'lastId':lastId,'pageNo':pageNoMSG},
  			function(d){
				if(d.data.resultList!="" && d.data.resultList!=null){
					$('#div_msg_list').prepend($("#tmpl_msg_list").tmpl(d.data.resultList));
					$('#msg_p_scroll').mCustomScrollbar("scrollTo","top");
					
					$('#pageNoMSG').val(pageNoMSG);
					if(d.data.rowBounds.pageCount<=pageNoMSG){
						$('#moreMsg').hide();
					}
				}
  			},
  			'json'
  		);
	},
	//搜索通讯记录
	searchAccount: function(keyword){
		keyword=$.trim(keyword);
		if(keyword!=""){
			$('#div_msg_account li').each(function(){
				var name=$.trim($(this).attr('data-name'));
				if(name.indexOf(keyword)>=0){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		}else {
			$('#div_msg_account li').each(function(){
				$(this).show();
			});
		}
	},
	
});
$.extend(G, {
	private_message: private_message
});
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

$.extend(register, {
    checkUser: function() {
        var phone = $('#register_phone_div .nick_name input').val();
        if(!G.phoneValid(phone)){
         register.setBtnColor($(".login_reg .get_phone_code"), 0);
     }else{
        $.post(G.opt.post_url + '/checkPhoneUnique?random=' + Math.random(), {
                phone: phone
            }, function(d) {
                if (d.flag == -1) {
                    if (d.msg != '') {
                        layer.msg(d.msg);
                         G.register.sendSmsCodeOpt.canSend = false;
                    }
                    register.setBtnColor($(".login_reg .get_phone_code"), 0);
                } else {
                    register.setBtnColor($(".login_reg .get_phone_code"), 1);
                    G.register.sendSmsCodeOpt.canSend = true;
                }
            });
     }
        
    },
    /** ==================================== do register by email ==================================== **/

    doRegisterByEmail: function() {
        var registerDiv = $("#register_email_div");
        var checkFlag = true;
        // email
        var emailInput = registerDiv.find("input[name='email']");
        var emailError = emailInput.parents("li.li").find("div.error");
        var email = emailInput.val();
        var emailValid = G.emailValid(email);
        if (emailValid == false) {
            checkFlag = false;
            emailError.show();
        } else {
            emailError.hide();
        }

        // password
        var passwordInput = registerDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        var pwdValid = G.pwdValid(password) && G.strongpwd_ck(password);
        if (pwdValid == false) {
            checkFlag = false;
            passwordError.html('<i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。').show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'phoneOrEmail': email,
            'password': password
        };
        $.post(G.opt.post_url + '/register?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                window.location.href = G.opt.post_url + d.data;
            } else {
                // alert(d.msg);
                layer.msg(d.msg);
            }
        });
    },


    /** ==================================== do register by phone ==================================== **/

    doRegisterByPhone: function() {
        var registerDiv = $("#register_phone_div");
        var checkFlag = true;

        // phone
        var phoneInput = registerDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }

        // imgCode
        var imgCodeInput = registerDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }

        // smsCode
        var smsCodeInput = registerDiv.find("input[name='smsCode']");
        var smsCodeError = smsCodeInput.parents("li.li").find("div.error");
        var smsCode = smsCodeInput.val();
        if (smsCode == null) {
            checkFlag = false;
            smsCodeError.show();
        } else {
            smsCodeError.hide();
        }

        // password
        var passwordInput = registerDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        var pwdValid = G.pwdValid(password) && G.strongpwd_ck(password);
        if (pwdValid == false) {
            checkFlag = false;
            passwordError.html('<i class="ico"></i>请输入6~16位密码,至少包含数字、字母或符号中的两种。').show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'phoneOrEmail': phone,
            'imgCode': imgCode,
            'smsCode': smsCode,
            'password': password
        };
        $.post(G.opt.post_url + '/register?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                window.location.href = G.opt.post_url;
            } else {
                // alert(d.msg);
                layer.msg(d.msg);
            }
        });
    },

    /**
     * get image code
     */
    getImgCode: function() {
        var _img = $("#register_phone_div").find("img[name='imgCodeOper']");
        _img.attr('src', G.opt.post_url + "/checkCode/getImgCode?time=" + new Date().getTime());
    },

    /**
     * send sms code
     */
    sendSmsCodeOpt: {
        canSend: true,
        intervalObj: null,
        currentSecond: 60,
    },
    sendSmsCodeInterFunc: function() {
        var registerDiv = $("#register_phone_div");
        var _input = registerDiv.find("input[name='smsCode']");
        var _oper = _input.parents("li.li").find("span[name='smsCodeOper']");
        var _opt = G.register.sendSmsCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.removeAttr("disabled")
                .text("重新发送");
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送(" + _opt.currentSecond + "s)");
            register.setBtnColor(_oper, 0);
        }
    },
    setBtnColor: function(o, flag) {
        if (flag) {
            o.css({ 'backgroundColor': '#3CBFB1', 'color': '#fff' })
        } else {
            o.css({ 'backgroundColor': '#E9E9E9', 'color': '#666' })
        }
    },
    sendSmsCode: function() {
        if (G.register.sendSmsCodeOpt.canSend != true) {
            return; }
        var registerDiv = $("#register_phone_div");
        var checkFlag = true;
        // phone
        var phoneInput = registerDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }
        // imgCode
        var imgCodeInput = registerDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }
        // smsCode
        var smsCodeInput = registerDiv.find("input[name='smsCode']");
        var smsCodeOper = smsCodeInput.parents("li.li").find("span[name='smsCodeOper']");
        // do post
        if (checkFlag == false) {
            return; }
        G.register.sendSmsCodeOpt.canSend = false;
        smsCodeOper.attr("disabled", "disabled"); //停用按钮
        var postData = { 'phone': phone };
        $.post(G.opt.post_url + '/checkCode/sendSmsForRegister?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                G.register.sendSmsCodeOpt.intervalObj = window.setInterval(G.register.sendSmsCodeInterFunc, 1000); //启动计时器，1秒执行一次 
            } 
            else {
                G.register.sendSmsCodeOpt.canSend = true;
                smsCodeOper.attr("disabled", null); //启用按钮
                smsCodeOper.text("发送失败，重新发送");
            }
        });
    },


});
$.extend(G, {
    register: register
});

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

$.extend(setting, {
    checkPhone: function() {
        var phone = $('#setting_safe_phone .nick_name input').val();
        if (G.phoneValid(phone)) {
            register.setBtnColor($("#setting_safe_phone .get_phone_code"), 1);

        } else {
            register.setBtnColor($("#setting_safe_phone .get_phone_code"), 0);
        }
    },
    /** ==================================== init ==================================== **/

    /**
     * @param flag 0-all;1-basic;2-photo;3-safe;4-pref
     */
    init: function(flag) {
        $.myPost(G.opt.post_url + '/account/to-setting?random=' + Math.random(), {}, function(d) {
            if (d.flag == 0) {
                var account = d.data.account;
                if (flag == 0 || flag == 1) { G.setting.initBasic(account, d.data.city, d.data.industry); }
                if (flag == 0 || flag == 2) { G.setting.initPhoto(account); }
                if (flag == 0 || flag == 3) { G.setting.initSafe(account); }
                if (flag == 0 || flag == 4) { G.setting.initPref(d.data.accountPreference); }
            } else {
                alert(d.msg);
            }
        });
    },

    initBasic: function(account, city, industry) {
        var basciDiv = $("#setting_basci_div");
        // ...
        basciDiv.find("input[name='nickName']").val(account.nickName);
        basciDiv.find("input[name='name']").val(account.name);
        basciDiv.find("input[name='alphaLastName']").val(account.alphaLastName);
        basciDiv.find("input[name='alphaFirstName']").val(account.alphaFirstName);
        // gender
        var gender = account.gender;
        if (gender == 1 || gender == 2) { basciDiv.find("input[name='gender']").eq(gender).attr("checked", "checked"); } else { basciDiv.find("input[name='gender']").eq(0).attr("checked", "checked"); }
        // address
        var provinceId = null;
        var cityId = null;
        var cityName = null;
        if (city != null) {
            provinceId = city.provinceId;
            if (provinceId != null) { cityId = city.id;
                cityName = city.name; }
        }
        G.cache_processor.selectProvince("setting_province", "setting_city", provinceId);
        G.cache_processor.selectCity("setting_city", cityId, cityName);
        // industry
        var industryId = null;
        var industryName = null;
        if (industry != null) { industryId = industry.id;
            industryName = industry.name; }
        G.cache_processor.selectIndustry("setting_industry", industryId, industryName);
        // ...
        basciDiv.find("input[name='company']").val(account.company);
        basciDiv.find("input[name='position']").val(account.position);
        for_selct();
    },

    initPhoto: function(account) {
        var photoDiv = $("#setting_photo_div");
        var photo = account.photo;
        photo = photo == null || photo == '' ? (G.opt.post_url + "/images/icos/photo96.jpg") : photo;
        photoDiv.find("img").attr("src", photo);
    },

    initSafe: function(account) {
        var safeDiv = $("#setting_safe_div");
        safeDiv.find("input[name='phone']").val(account.phone);
        safeDiv.find("input[name='email']").val(account.email);
        safeDiv.find("input:password").val("");
    },

    initPref: function(accountPreference) {
        var prefDiv = $("#setting_pref_div");
        var courseLanguage = accountPreference.courseLanguage;
        if (courseLanguage == 1 || courseLanguage == 2) { prefDiv.find("input[name='courseLanguage']").eq(courseLanguage - 1).attr("checked", "checked"); } else { prefDiv.find("input[name='courseLanguage']").eq(0).attr("checked", "checked"); }
        var exerciseLanguage = accountPreference.exerciseLanguage;
        if (exerciseLanguage == 1 || exerciseLanguage == 2) { prefDiv.find("input[name='exerciseLanguage']").eq(exerciseLanguage - 1).attr("checked", "checked"); } else { prefDiv.find("input[name='exerciseLanguage']").eq(0).attr("checked", "checked"); }
    },


    /** ==================================== set basic ==================================== **/

    setBasic: function() {
        var basciDiv = $("#setting_basci_div");
        var checkFlag = true;

        // nickName
        var nickNameInput = basciDiv.find("input[name='nickName']");
        var nickNameError = nickNameInput.parents("li.li").find("div.error");
        var nickName = nickNameInput.val();
        var nickNameByteCount = nickName != undefined && nickName != null && nickName != '' ? G.getByteCount(nickName) : 0;
        if (nickNameByteCount <= 0 || nickNameByteCount > 16 || /^[\u0391-\uFFE5A-Za-z0-9]+$/.test(nickName) == false) {
            checkFlag = false;
            nickNameError.show();
        } else {
            nickNameError.hide();
        }

        // name
        var nameInput = basciDiv.find("input[name='name']");
        var nameError = nameInput.parents("li.li").find("div.error");
        var name = nameInput.val();
        var nameByteCount = name != undefined && name != null && name != '' ? G.getByteCount(name) : 0;
        if (nameByteCount < 0 || nameByteCount > 32 || (nameByteCount > 0 && /^[\u0391-\uFFE5A-Za-z\s]+$/.test(name) == false)) {
            checkFlag = false;
            nameError.show();
        } else {
            nameError.hide();
        }

        // alphaLastName & alphaFirstName
        var alphaLastNameInput = basciDiv.find("input[name='alphaLastName']");
        var alphaFirstNameInput = basciDiv.find("input[name='alphaFirstName']");
        var alphaNameError = alphaLastNameInput.parents("li.li").find("div.error");
        var alphaLastName = alphaLastNameInput.val();
        var alphaFirstName = alphaFirstNameInput.val();
        var alphaLastNameByteCount = alphaLastName != undefined && alphaLastName != null && alphaLastName != '' ? G.getByteCount(alphaLastName) : 0;
        var alphaFirstNameByteCount = alphaFirstName != undefined && alphaFirstName != null && alphaFirstName != '' ? G.getByteCount(alphaFirstName) : 0;
        if (alphaLastNameByteCount < 0 || alphaLastNameByteCount > 32 || (alphaLastNameByteCount > 0 && /^[A-Za-z]+$/.test(alphaLastName) == false) || alphaFirstNameByteCount < 0 || alphaFirstNameByteCount > 32 || (alphaFirstNameByteCount > 0 && /^[A-Za-z]+$/.test(alphaFirstName) == false)) {
            checkFlag = false;
            alphaNameError.show();
        } else {
            alphaNameError.hide();
        }

        // gender
        var gender = basciDiv.find("input[name='gender']:checked").val();

        // cityId
        var cityId = G.cache_processor.getSelectedId("setting_city");

        // industryId
        var industryId = G.cache_processor.getSelectedId("setting_industry");

        // company
        var companyInput = basciDiv.find("input[name='company']");
        var companyError = companyInput.parents("li.li").find("div.error");
        var company = companyInput.val();
        var companyByteCount = company != undefined && company != null && company != '' ? G.getByteCount(company) : 0;
        if (companyByteCount < 0 || companyByteCount > 256) {
            checkFlag = false;
            companyError.show();
        } else {
            companyError.hide();
        }

        // position
        var positionInput = basciDiv.find("input[name='position']");
        var positionError = positionInput.parents("li.li").find("div.error");
        var position = positionInput.val();
        var positionByteCount = position != undefined && position != null && position != '' ? G.getByteCount(position) : 0;
        if (positionByteCount < 0 || positionByteCount > 256) {
            checkFlag = false;
            positionError.show();
        } else {
            positionError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'nickName': nickName,
            'name': name,
            'alphaLastName': alphaLastName,
            'alphaFirstName': alphaFirstName,
            'gender': gender,
            'cityId': cityId,
            'industryId': industryId,
            'company': company,
            'position': position
        };
        $.myPost(G.opt.post_url + '/account/on-setting-basic?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // basciDiv.find("div.msg_success").not("div.msg_wrong").show();
                // basciDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg(d.msg);
                // basciDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // basciDiv.find("div.msg_wrong").show();
                // basciDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set password ==================================== **/

    setPassword: function() {
        var safeDiv = $("#setting_safe_div");
        var checkFlag = true;

        // oldPwd
        var oldPwdInput = safeDiv.find("input[name='oldPwd']");
        var oldPwdError = oldPwdInput.parents("li.li").find("div.error");
        var oldPwd = oldPwdInput.val();
        if (G.pwdValid(oldPwd) == false) {
            checkFlag = false;
            oldPwdError.show();
        } else {
            oldPwdError.hide();
        }

        // newPwd1
        var newPwd1Input = safeDiv.find("input[name='newPwd1']");
        var newPwd1Error = newPwd1Input.parents("li.li").find("div.error");
        var newPwd1 = newPwd1Input.val();
        if (G.pwdValid(newPwd1) == false || G.strongpwd_ck(newPwd1) == false) {
            checkFlag = false;
            newPwd1Error.show();
        } else {
            newPwd1Error.hide();
        }

        // newPwd2
        var newPwd2Input = safeDiv.find("input[name='newPwd2']");
        var newPwd2Error = newPwd2Input.parents("li.li").find("div.error");
        var newPwd2 = newPwd2Input.val();
        if (newPwd2 != newPwd1) {
            checkFlag = false;
            newPwd2Error.show();
        } else {
            newPwd2Error.hide();
        }

        // do post
        if (checkFlag == false) {
            return; }
        var postData = {
            'oldPassword': calcMD5(oldPwd),
            'newPassword': newPwd1
        };
        $.myPost(G.opt.post_url + '/account/on-setting-pwd?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                safeDiv.find("input:password").val("");
                layer.msg("操作成功");
                // safeDiv.find("div.msg_success").not("div.msg_wrong").show();
                // safeDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg(d.msg);
                // safeDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // safeDiv.find("div.msg_wrong").show();
                // safeDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set email ==================================== **/

    setEmail: function() {
        var safeDiv = $("#setting_safe_div");
        var safeEmailDiv = $("#setting_safe_email");
        var checkFlag = true;

        // email
        var emailInput = safeEmailDiv.find("input[name='email']");
        var emailError = emailInput.parents("li.li").find("div.error");
        var email = emailInput.val();
        var emailValid = G.emailValid(email);
        if (emailValid == false) {
            checkFlag = false;
            emailError.show();
        } else {
            emailError.hide();
        }

        // password
        var passwordInput = safeEmailDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        if (G.pwdValid(password) == false) {
            checkFlag = false;
            passwordError.show();
        } else {
            passwordError.hide();
        }

        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'newEmail': email,
            'password': calcMD5(password)
        };
        $.myPost(G.opt.post_url + '/account/on-setting-email?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
            	layer.msg(d.msg);
                safeDiv.find("input[name='email']").val(email);
                safeEmailDiv.hide();
            } else {
                alert(d.msg);
            }
        });
    },


    /** ==================================== set phone ==================================== **/

    /**
     * get image code
     */
    getImgCode: function() {
        var _img = $("#setting_safe_phone").find("img[name='imgCodeOper']");
        _img.attr('src', G.opt.post_url + "/checkCode/getImgCode?time=" + new Date().getTime());
    },

    /**
     * send sms code
     */
    sendSmsCodeOpt: {
        canSend: true,
        intervalObj: null,
        currentSecond: 60,
    },
    sendSmsCodeInterFunc: function() {
        var safePhoneDiv = $("#setting_safe_phone");
        var _input = safePhoneDiv.find("input[name='smsCode']");
        var _oper = _input.parents("li.li").find("span[name='smsCodeOper']");
        var _opt = G.setting.sendSmsCodeOpt;
        if (_opt.currentSecond <= 0) {
            window.clearInterval(_opt.intervalObj); //停止计时器
            _opt.currentSecond = 60;
            _opt.canSend = true;
            _oper.removeAttr("disabled"); //启用按钮
            _oper.text("重新发送");            
            register.setBtnColor(_oper, 1);

        } else {
            _opt.currentSecond--;
            _oper.text("已发送(" + _opt.currentSecond + "s)");
            register.setBtnColor(_oper, 0);
        }
    },
    sendSmsCode: function() {
        if (G.setting.sendSmsCodeOpt.canSend != true) {
            return; }
        var safePhoneDiv = $("#setting_safe_phone");
        var checkFlag = true;
        // phone
        var phoneInput = safePhoneDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }
        // imgCode
        var imgCodeInput = safePhoneDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }
        // smsCode
        var smsCodeInput = safePhoneDiv.find("input[name='smsCode']");
        var smsCodeOper = smsCodeInput.parents("li.li").find("span[name='smsCodeOper']");
        // do post
        if (checkFlag == false) {
            return; }
        G.setting.sendSmsCodeOpt.canSend = false;
        smsCodeOper.attr("disabled", "disabled"); //停用按钮
        var postData = { 'phone': phone };
        $.myPost(G.opt.post_url + '/checkCode/sendSmsForSetPhone?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                G.setting.sendSmsCodeOpt.intervalObj = window.setInterval(G.setting.sendSmsCodeInterFunc, 1000); //启动计时器，1秒执行一次 
            } else {
                G.setting.sendSmsCodeOpt.canSend = true;
                smsCodeOper.attr("disabled", null); //启用按钮
                smsCodeOper.text("发送失败，重新发送");
            }
        });
    },

    /**
     * set phone
     */
    setPhone: function() {
        var safeDiv = $("#setting_safe_div");
        var safePhoneDiv = $("#setting_safe_phone");
        var checkFlag = true;

        // phone
        var phoneInput = safePhoneDiv.find("input[name='phone']");
        var phoneError = phoneInput.parents("li.li").find("div.error");
        var phone = phoneInput.val();
        var phoneValid = G.phoneValid(phone);
        if (phoneValid == false) {
            checkFlag = false;
            phoneError.show();
        } else {
            phoneError.hide();
        }

        // imgCode
        var imgCodeInput = safePhoneDiv.find("input[name='imgCode']");
        var imgCodeError = imgCodeInput.parents("li.li").find("div.error");
        var imgCode = imgCodeInput.val();
        if (imgCode == null || imgCode.length != 4) {
            checkFlag = false;
            imgCodeError.show();
        } else {
            imgCodeError.hide();
        }

        // smsCode
        var smsCodeInput = safePhoneDiv.find("input[name='smsCode']");
        var smsCodeError = smsCodeInput.parents("li.li").find("div.error");
        var smsCode = smsCodeInput.val();
        if (smsCode == null || smsCode.length != 4) {
            checkFlag = false;
            smsCodeError.show();
        } else {
            smsCodeError.hide();
        }

        // password
        var passwordInput = safePhoneDiv.find("input[name='password']");
        var passwordError = passwordInput.parents("li.li").find("div.error");
        var password = passwordInput.val();
        if (G.pwdValid(password) == false) {
            checkFlag = false;
            passwordError.show();
        } else {
            passwordError.hide();
        }
        // doPost
        if (checkFlag == false) {
            return; }
        var postData = {
            'newPhone': phone,
            'imgCode': imgCode,
            'smsCode': smsCode,
            'password': calcMD5(password)
        };
        $.myPost(G.opt.post_url + '/account/on-setting-phone?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
            	layer.msg(d.msg);
                safeDiv.find("input[name='phone']").val(phone);
                safePhoneDiv.hide();
            } else {
                alert(d.msg);
            }
        });
    },


    /** ==================================== set preference ==================================== **/


    /**
     * set preference: course language
     */
    setPrefCourseLanguage: function() {
        var prefDiv = $("#setting_pref_div");
        // courseLanguage
        var courseLanguage = prefDiv.find("input[name='courseLanguage']:checked").val();
        // doPost
        var postData = { 'courseLanguage': courseLanguage };
        $.myPost(G.opt.post_url + '/account/on-setting-pref-cl?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg("操作失败，请重试");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // prefDiv.find("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },

    /**
     * set preference: exercise language
     */
    setPrefExerciseLanguage: function() {
        var prefDiv = $("#setting_pref_div");
        var prefDiv = $("#setting_pref_div");
        // exerciseLanguage
        var exerciseLanguage = prefDiv.find("input[name='exerciseLanguage']:checked").val();
        // doPost
        var postData = { 'exerciseLanguage': exerciseLanguage };
        $.myPost(G.opt.post_url + '/account/on-setting-pref-el?random=' + Math.random(), postData, function(d) {
            if (d.flag == 0) {
                layer.msg("操作成功");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").hide();
            } else {
                layer.msg("操作失败，请重试");
                // prefDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // prefDiv.find("div.msg_wrong").show();
                // prefDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
            }
        });
    },


    /** ==================================== set photo ==================================== **/

    setPhoto: function() {
        var photoDiv = $("#setting_photo_div");
        $.ajaxFileUpload({
            url: G.opt.post_url + '/account/on-setting-photo?random=' + Math.random(), //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'setting_photo_input', //文件上传域的ID
            dataType: 'json',
            success: function(d, status) {
                if (d.flag == 0) {
                    // photoDiv.find("div.msg_success").not("div.msg_wrong").show();
                    // photoDiv.find("div.msg_wrong").hide();
                    photoDiv.find("img").attr("src", d.data);

                    layer.msg("操作成功");
                } else {
                    layer.msg("操作失败，请重试");
                    // photoDiv.find("div.msg_success").not("div.msg_wrong").hide();
                    // photoDiv.find("div.msg_wrong").show();
                    // photoDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>"+d.msg);
                }
            },
            error: function(d, status, e) {
                layer.msg("操作失败，请重试");
                // photoDiv.find("div.msg_success").not("div.msg_wrong").hide();
                // photoDiv.find("div.msg_wrong").show();
                // photoDiv.find("div.msg_wrong").html("<i class=\"ico\"></i>系统异常");
            }
        });
    },

});
$.extend(G, {
    setting: setting
});

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
