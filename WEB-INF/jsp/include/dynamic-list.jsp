<%@ page contentType="text/html; charset=UTF-8"%>
    <ul id="div_listaccountdynamic" class="ul"></ul>
    <script id="tmpl_listaccountdynamic" type="text/x-jquery-tmpl">
        <li class="li">
            <p class="author">
                <a href="${basePath}/user-center/{{= receiverId}}" target="_blank"><i class="ico"></i>{{= nickName}}</a>
            </p>
            {{if type==1}}
            <p class="name"><i class="ico"></i>{{= noteContent}}</p>
            <p class="m_info"></p>
            {{else type==2}}
            <p class="name name2">
                <a target="_blank" href="${basePath}/exset-details/{{= exerciseId}}"><i class="ico"></i>{{= exerciseName}}</a>
            </p>
            <p class="m_info"></p>
            {{else type==3}}
            <p class="name name1">
                <a target="_blank" href="${basePath}/question-details/{{= questionId}}"><i class="ico"></i>{{= questionTitle}}</a>
            </p>
            <p class="m_info">
                <a href="${basePath}/course/view/{{= videoId}}" target="_blank">{{if subjectSequence}}{{= subjectSequence}}-{{/if}}{{= videoSequence}} {{= videoName}}</a>
            </p>
            {{/if}}
        </li>
    </script>
