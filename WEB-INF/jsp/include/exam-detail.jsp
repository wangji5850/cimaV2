<%@ page contentType="text/html; charset=UTF-8"%>
    <script id="tmpl_material_name_list" type="text/x-jquery-tmpl">
        <li class="li_c">{{= name}}</li>
    </script>
    
    <script id="tmpl_material_content_list" type="text/x-jquery-tmpl">
        <div class="lst_cont">{{html materialContent}}</div>
    </script>

    <script id="tmpl_item_content" type="text/x-jquery-tmpl">
        <div class="lst_cont">{{html content}}</div>
    </script>

    <script id="tmpl_item_content_list" type="text/x-jquery-tmpl">
        {{if answerStatus==1&isCurrent}}
        <li class="li_c has_half">
            <span class="s1">{{= sequenceAsString}}</span>
            <span class="sp" style="width:0" data-time="{{= durationAsSecond}}"><i class="ico"></i><i class="time">{{= timeFormat(remainingTimeAsString)}}</i></span>
        </li>
        {{else answerStatus==1&!isCurrent}}
        <li class="li_c new">
            <span class="s1">{{= sequenceAsString}}</span>
            <span class="s2"> (<i class="s3">{{= duration}}</i>minutes for section)</span>
        </li>
        {{else answerStatus==2}}
        <li class="li_c has_finish">
            <span class="s1">{{= sequenceAsString}}</span>
            <span class="s2"> (<i class="s3">{{= duration}}</i>minutes for section)</span>
        </li>
        {{/if}}
    </script>

    <script>function timeFormat(t){return t?t.length<6?'00:'+t:t:'-'} </script>