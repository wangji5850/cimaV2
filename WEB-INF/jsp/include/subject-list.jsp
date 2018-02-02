<%@ page contentType="text/html; charset=UTF-8"%>
    <% 
    Object courseLanguage = request.getAttribute("courseLanguage")==null?1:request.getAttribute("courseLanguage");
    pageContext.setAttribute("courseLanguage",courseLanguage);
%>
		<div class="msg_box no_author">
            <a class="ico close" href="javascript:;"></a>
            <p class="tit">本课程为正式会员专享</p>
            <div class="cont">
                <a class="attend" href="https://chat.live800.com/live800/chatClient/chatbox.jsp?companyID=330913&configID=125841&jid=2077907427" target="_blank">立即加入</a>
                <p class="p tips"> 通过资格审核即可免除高达14门考试科目 </p>
                <p class="p conect">联系电话：400-060-2320 </p>
            </div>
        </div>
        <script id="tmpl_subject_list" type="text/x-jquery-tmpl">
			<li class="li" data-id="{{= id}}" data-type="{{= type}}">
            	<p class="p tit">
                	<i class="ico2"></i>
                	<span class="chap">{{= code}}<i></i></span>
                    <span class="name">{{= name}}</span>
                    <span class="rt_part"><i class="ico2 arrow"></i>
        			</span>
                </p>
                <ul class="ul_c">
                </ul>
            </li>
        </script>
        
        <script id="tmpl_catalog_list" type="text/x-jquery-tmpl">
			<li class="li_c" data-id="{{= id}}">
            	{{if progress==3}}
            	<p class="p lession has_learned">
            	{{/if}}
            	{{if progress!=3}}
            	<p class="p lession">
            	{{/if}}
                    <i class="kong"></i>
					{{if videoType == 0}}
						<a class="a abc" href="javascript:showNoAuthBox();">
					{{else}}
                    	<a class="a" href="${basePath}/course/view/{{= id}}?classId=${classId}"  target="_blank">
					{{/if}}
                        <span class="chap">{{if ${courseLanguage}==1}}第{{= sequence}}节{{/if}}{{if ${courseLanguage}==2}}part {{= sequence}}{{/if}}<i></i></span>
                        <span class="name">{{= name}}</span>
                        <span class="chap_time"><i class="ico2"></i>{{= durationAsString}}</span>                        
                    </a>
                    <span class="rt_part">
                        {{if videoType == 2}}<a class="a" href="${basePath}/course/view/{{= id}}?classId=${classId}"  target="_blank"><span class="operate"><span class="btn btn_min">试听</span></span></a>{{/if}}
                        {{if progress!=1}}
                            <i class="ico2 status"></i>
						{{/if}}
		        	</span>
                </p>
            </li>
		</script>
		
        <script id="tmpl_subject_catalog_list" type="text/x-jquery-tmpl">
			<li class="li" data-id="{{= id}}">
            	<p class="p tit">
                	<i class="ico2"></i>
                    <span class="chap">{{= code}}<i></i></span>
                    <span class="name">{{html name}}</span>
                	<span class="rt_part">
        				&nbsp;<i class="ico2"></i>
        			</span>
           		</p>
                <ul class="ul_c no_dis">
					{{each(i,item) videoList}}
                	<li class="li_c" data-id="{{= item.id}}">
                    	    {{if item.progress==3}}
            					<p class="p lession has_learned">
            				{{else}}
            					<p class="p lession">
            				{{/if}}
                        	<i class="kong"></i>
                            <span class="chap">第{{= item.sequence}}节<i></i></span>
                            {{if item.videoType == 1}}
                    			<a class="name" href="${basePath}/course/view/{{= item.id}}?classId=${classId}" target="_blank">{{html item.name}}</a>
							{{else}}
                    			<span class="name">{{html item.name}}</span>
							{{/if}}
                            <span class="chap_time"><i class="ico2"></i>{{= item.durationAsString}}</span>
                            <span class="rt_part">
                            	{{if item.videoType == 2}}
                        			<span class="operate"><a class="btn btn_min" href="${basePath}/course/trial/{{= item.id}}"  target="_blank">试听</a></span>
								{{/if}}
								{{if item.progress!=1}}
									<i class="ico2 status"></i>
								{{else}}
									&nbsp;
								{{/if}}
								<i class="ico2 mark {{if item.hasBeenMarked}}has_mark{{/if}}"></i>
		        			</span>
                        </p>
                        {{if item.learnStatus == 2}}
                			<p class="p practice has_passed">
                		{{else}}
                			<p class="p practice">
                		{{/if}}
                        	<i class="kong"></i>
                            <span class="chap">练 习<i></i></span>
                            {{if item.videoType == 1}}
                    			<a class="name" href="${basePath}/exercises/{{= item.id}}?classId=${classId}" target="_blank">{{html item.name}}<i class="ico2"></i></a>
							{{else}}
                    			<a class="name">{{html item.name}}<i class="ico2"></i></a>
							{{/if}}
                    		<span class="rt_part">
						
		        			</span>
                        </p>
                    </li>
					{{/each}}
                </ul>
        	</li>
		</script>
		
<script type="text/javascript">
	$(function() {
		$('.mb_enroll').on('click', '.close', function() {
			$('.msg_box').hide();
		})
	})

	function showNoAuthBox(n){
		var isExitClass = '${isExitClass}';	
		
		if(n==1||n==2||n==3){	
			$('.msg_box.no_author .cont').children('.attend').hide()
			.end().children('.tips').text('目前正在审核中，若有问题请联系客服');
			
		}
		
		if(n==4&&isExitClass=='true'){
			$('.msg_box.no_author .cont').children('.attend').hide()
			.end().children('.tips').text('目前正在审核中，若有问题请联系客服');
		}
		$('.no_author').show();
	}
</script>
