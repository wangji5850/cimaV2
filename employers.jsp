<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="WEB-INF/jsp/include/top.jsp"></jsp:include>
<div class="p_employers">
    <div class="floor floor1 big_img m_floor1">
        (employersBanner1
    </div>
    <div class="floor floor2">
        <div class="wrapper">
            <p>雇主谈CIMA</p>
            <div class="m_reason_wrap">
                (employersBanner2
        </div>
    </div>
    <div class="floor floor3">
        <div class="wrapper">
            <div class="about_us about_bottom">
                <div class="m_title"><i></i>
                    <div>
                        <p>百强雇主</p>
                        <p class="sub_tip">TOP EMPLOYERS</p>
                    </div><i></i></div>
                <jsp:include page="fuwu-logo.jsp"></jsp:include>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function() {
        employers.init();
    });
</script>
<jsp:include page="WEB-INF/jsp/include/footer.jsp"></jsp:include>