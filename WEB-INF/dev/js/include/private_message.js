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