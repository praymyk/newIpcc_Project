$(document).ready(function(){
    $(".hide-footer").click(function(){
        $(".footer-content").slideToggle(); // footer-content의 슬라이드 토글
        $(this).toggleClass("fa-angle-down fa-angle-up"); // 아이콘 변경
    });

    footerTodayCallStatus();
    footerAgentListSatus();

    // window 객체에 저장된 인터벌이 있으면 제거
    if (window.footerAgentListSatusInterval !== undefined) {
        clearInterval(window.footerAgentListSatusInterval);
    }
    window.footerAgentListSatusInterval = setInterval(footerAgentListSatus, 5000);

    // footer 상담원현황 갱신용 ajax
    function footerAgentListSatus(){
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

    // footer 금일 통화 현황 갱신용 ajax
    function footerTodayCallStatus(){
        $.ajax({
            url: 'agent/todayCallStatus',
            method: 'GET',
            data : {
                // 조회 조건
                ccode : window.LoginCcode
            },
            success: function(data) {
                var todayCallStat = data;
                var totalCall = todayCallStat.totalCall;
                var responseCall = todayCallStat.responseCall;

                // 금일 통화 현황 정보 업데이트
                $('#footer-tryOutCall').text(todayCallStat.outCallTry); // 아웃 시도
                $('#footer-todayOutCall').text(todayCallStat.outCall);  // 아웃콜(성공)
                $('#footer-todayInCall').text(todayCallStat.totalCall); // 전체호
                $('#footer-todayStayCustomers').text(todayCallStat.watingCall);  // 대기호
                $('#footer-todayResponse').text(todayCallStat.responseCall);  // 응답호(IB)
                $('#footer-todayAbandon').text(todayCallStat.abandonCall);    // 포기호(IB)

                calcResponseRate(responseCall, totalCall);
            },
            error: function(xhr, status, error) {
                console.error("Error loading content:", error);
            }
        });
    }

    // 응대율 계산
    function calcResponseRate(response, total){
        var rate = 0;

        if(total > 0){
            rate = (response / total) * 100;
        }
        $('#footer-todayResponseRate').text(rate.toFixed(2) + '%');
    }
});