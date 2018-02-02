<%@ page contentType="text/html; charset=UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <% 
		String hasLogined = session.getAttribute("hasLogined").toString();
		Object appVersion = null;
		if(hasLogined == "true"){
			application.setAttribute("appVersion", Math.random());
		}
%>
            <jsp:include page="include/top.jsp"></jsp:include>
            <div class="wrapper mt30">
                <div class="first<c:if test="${hasLogined!=true}"> no_dis</c:if>">
                    <font size="4">静态文件版本号:<strong class="red">${appVersion}</strong></font>
                    <div class="operate mt30">
                        <span id="btn_mk_newVersion" class="btn">生成版本号</span>
                    </div>
                </div>
                <div class="second<c:if test="${hasLogined==true}"> no_dis</c:if>">
                    <font size="4" class="red">要玩也得先登录吧。。。</font>
                    <div class="operate mt30">
                        <a class="btn" href="${basePath}/login">登录</a>
                    </div>
                </div>
                <div style="height:50vh">&nbsp;</div>
            </div>
            <jsp:include page="include/footer.jsp"></jsp:include>
            <script type="text/javascript">
            <c:if test="${(appVersion!=null && hasLogined==false) || (appVersion==null && hasLogined==true)}">
            window.location.reload();
            </c:if>
            <c:if test="${hasLogined==true}">
            $(function() {
                var strs = ['你玩够了没，访问一次就生成了不知道吗？', '难道你不知道点一次就生成了么？', '哈哈，<br>再点也没有用，傻傻等待。。。', "一次就好，我带你去看天荒地老...<br>不怕你哭，不怕你叫", '行了行了，去网站看看吧', '你还要我怎样，要怎样，你这样点我实在受不鸟<br>啊啊啊啊啊', '憋点了，去抽根烟活动活动吧', '没看见上面的大红字么。。。', '再点，再点就把你xx啦'];
                $('#btn_mk_newVersion').on('click', function() {
                    layer.msg(strs[Math.floor(Math.random() * 9)])
                });
            });
             </c:if>
            </script>
	<script type="text/javascript">
	//考试专区列表
	function listPrefecture(){
		//type(1：报考须知；2：考试动态；3：常见QA；4：协会资讯；5：考经分享；6：学习资料；7：推荐课程；8：免试申请；)
		$.post(
			'http://10.10.30.160:8080/cima/exampa/list-prefecture?random='+Math.random(),
			{'type':1,'pageNo':3,'pageSize':10},
			function(data){
				console.dir(data);
			},
			'json'
		);
	}
	
	//固定数据量考试专区列表(limitSize 最多10条)
	function fixedPrefecture(){
		//listType(1-8)(1：报考须知；2：考试动态；3：常见QA；4：协会资讯；5：考经分享；6：学习资料；7：推荐课程；8：免试申请；)
		$.post(
			//'${basePath}/exampa/fixed-prefecture?random='+Math.random(),
			'http://10.10.30.160:8080/cima/exampa/fixed-prefecture?random='+Math.random(),
			function(data){
				console.dir(data);
			},
			'json'
		);
	}
	
	//考试专区详情
	//http://10.10.30.160:8080/cima/exampa/33
	
	
	//登录成功后拿取登录人信息
	function logonInfo(){
		$.post(
			//'http://10.10.30.160:8080/cima/logonInfo?random='+Math.random(),
			'${basePath}/logonInfo?random='+Math.random(),
			function(data){
				console.dir(data);
			},
			'json'
		);
	}
	
	//签到信息(type - 0: 获取签到信息;1:签到操作;)
	function accountSign(){
		$.post(
			'${basePath}/account/sign?random='+Math.random(),
			{'type':1},		
			function(data){
				console.dir(data);
			},
			'json'
		);
	}
	
	//我的学习记录
	function accountLearn(){
		$.post(
			'${basePath}/account/learn?random='+Math.random(),
			{'pageNo':1,'pageSize':10},	
			function(data){
				console.dir(data);
			},
			'json'
		);
	}
	
	</script>
学习中心:http://localhost:8080/cima/learn-center
 
开始学习:http://localhost:8080/cima/start-learn
学习记录:http://localhost:8080/cima/learn-record
 
<br>
<br>
<br>
<br>
<div align="center">
	<input type="button" id="button" name="button" value="测试列子" onclick="accountLearn();">
</div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
</body>
</html>
