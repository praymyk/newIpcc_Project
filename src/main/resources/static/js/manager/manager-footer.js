$(document).ready(function(){
    $(".hide-footer").click(function(){
        $(".footer-content").slideToggle(); // footer-content의 슬라이드 토글
        $(this).toggleClass("fa-angle-down fa-angle-up"); // 아이콘 변경
    });

    footerStatus();

    // window 객체에 저장된 인터벌이 있으면 제거
    if (window.footerStatusInterval !== undefined) {
        clearInterval(window.footerStatusInterval);
    }
    window.footerStatusInterval = setInterval(footerStatus, 5000);

    // 푸터 상담원현황 갱신용 ajax
    function footerStatus(){
        $.ajax({
            url: 'agent/agentListStatus',
            method: 'GET',
            data : {
                // 조회 조건
                ccode : window.LoginCcode
            },
            success: function(data) {
                var agentListStat = data;

                // 상담원 현황 정보 업데이트
                $('#footer-readyAgents').text(agentListStat.readyAgents);
                $('#footer-inCallAgents').text(agentListStat.inCallAgents);
                $('#footer-outCallAgents').text(agentListStat.outCallAgents);
                $('#footer-logonAgents').text(agentListStat.loginAgents);
                $('#footer-totalAgents').text(agentListStat.totalAgents);
            },
            error: function(xhr, status, error) {
                console.error("Error loading content:", error);
            }
        });
    }
});