<%@ page contentType="text/html; charset=UTF-8"%>
    <% 
    String path = request.getContextPath(); 
    // 获得本项目的地址赋值给basePath变量 
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path; 
    pageContext.setAttribute("basePath",basePath); 
%>
		<ul class="ul c_notes no_dis">
		</ul>
		
        <script id="tmpl_video_note_list" type="text/x-jquery-tmpl">
			<li class="clearfix li" data-id="{{= id}}">
            	<i class="ico play"></i>
                <div class="right">
                	<p class="name">{{= subjectName}}<a href="${basePath}/course/view/{{= id}}" target="_blank"><span class="m_info">{{if subjectCode!=null}}{{= subjectCode}}-{{/if}}{{if sequence<10}}0{{/if}}{{= sequence}} {{= name}}</span></a><span class="rt_part">&nbsp;<i class="ico"></i></span></p>
                    <div class="div">
                        <ul class="ul_c cc_notes" data-page="1" data-pagecount="5">
    						{{each noteList}}
                        		<li class="li_c" data-id="{{= id}}">
                            		<div class="p cont">
                                		<i class="ico"></i> {{= content}}
                                	</div>
                                	<p class="clearfix p social">
                                		<span class="author"><i class="ico"></i>{{= nickName}}</span>
                                    	<span class="time"><i class="ico"></i>记录时间 : {{= createTimeAsString}}</span>
    									<span class="store {{if hasBeenCollected}}has_store{{/if}}">
                                    	   <i class="ico"></i>收藏 ({{= collectCount}})
                                   		</span>
                                        {{if hasBeenOwned}}
                                        <span class="del cursor">删除</span>
                                        {{/if}}
                                	</p>
                            	</li> 
    						{{/each}}                                       
                        </ul>
    					{{if rowBounds}}
                            {{if rowBounds.pageCount > rowBounds.pageNo}}
                            	<span class="see_more">展开更多<i>﹢</i></span>
                            {{/if}}
    					{{/if}}
                    </div>
                </div>
            </li>
        </script>
        
        <script id="tmpl_note_list" type="text/x-jquery-tmpl">
							<li class="li_c" data-id="{{= id}}">
                        		<div class="p cont">
                            		<i class="ico"></i> {{= content}}
                            	</div>
                            	<p class="clearfix p social">
                            		<span class="author"><i class="ico"></i>{{= nickName}}</span>
                                	<span class="time"><i class="ico"></i>记录时间 : {{= createTimeAsString}}</span>
                                	{{if !hasBeenCollected}}
										<span class="store">
									{{/if}}
									{{if hasBeenCollected}}
										<span class="store has_store">
									{{/if}}
                                	<i class="ico"></i>收藏 ({{= collectCount}})
                               		</span>
                            	</p>
                        	</li> 
        </script>

