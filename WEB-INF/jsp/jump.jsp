<%@ page session="false" %>
    <jsp:include page="include/top.jsp"></jsp:include>
	<form name="jumpForm" action="${basePath}${jumpURL}" method="${jumpMethod}">
		<c:if test="${jumpParameters!=null}">
			<c:forEach var="jumpParameter" items="${jumpParameters}">
				<input type="hidden" name="${jumpParameter.name}" value="${jumpParameter.value}" />
			</c:forEach>
		</c:if>
	</form>
	<script type="text/javascript">
		window.onload = function (argument) {
			var jumpInfo = "${jumpInfo}";
			if (jumpInfo != null && jumpInfo != "") {
				alert(jumpInfo);
			}
			document.jumpForm.submit();
		}
	</script>
  
    
</body>

</html>