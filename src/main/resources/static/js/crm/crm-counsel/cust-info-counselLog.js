document.getElementById('counselLog-filter').addEventListener('submit', function(e) {
    e.preventDefault(); // 기본 동작 방지 (페이지 리로드 방지)

    // 검색 필터 값 가져오기
    const startDate = document.getElementById('counselLog-startDate').value;
    const endDate = document.getElementById('counselLog-endDate').value;
    const result = document.getElementById('counselLog-result').value;

    // AJAX로 비동기 요청 보내기
    fetchGuestCounselLogList(startDate, endDate, result);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    console.log("result:", result);

});

// 선택 고객의 상담이력 리스트 조회
function fetchGuestCounselLogList(startDate,endDate,result, pageNumber=1) {
    $.ajax({
        url: '/Ipcc/crm/guest/getCounselLogList',
        type: 'post',
        data: {
            guestId: guestId, // 선택 고객ID 는 전역 변수에서 가져옴
            processStat: result,
            startDate: startDate,
            endDate: endDate,
            pageNumber: pageNumber,
            pageSize: 5  // 페이지당 항목 수
        },
        success: function(data) {
            // 고객 리스트를 #custInfo-counselLogList에 tr 추가
            $('#custInfo-counselLogList').empty();

            // 검색결과가 없을 경우
            if(data.dataList.length === 0) {
                var row = $('<tr></tr>');
                row.append('<td colspan="5">등록된 상담 이력이 없습니다.</td>')
                $('#custInfo-counselLogList').append(row);
                return;
            } else {
                data.dataList.forEach(function(counselLog, index) {
                    var row = $('<tr></tr>');
                    row.append('<td>' + counselLog.counselDate +
                        '<input type="hidden" value="' + counselLog.counselId + '"></td>');
                    row.append('<td>' + counselLog.상담원이름join해야함 + '</td>');
                    row.append('<td>' + counselLog.고객이름 + '</td>');
                    row.append('<td>' + counselLog.인입경로ARS카테고리1조인해야함 + '</td>');
                    row.append('<td>' + counselLog.processStat + '</td>');
                    // #guest-info-list에 추가
                    $('#custInfo-counselLogList').append(row);

                });
            }
            // 페이지 네이션
            renderPagination(searchKeyword, data.totalPages, data.currentPage); // 페이지네이션 렌더링
            currentPage = data.currentPage; // 현재 페이지 갱신
        },
        error: function() {
            console.log("고객 정보 조회 실패");
        }
    });
}

// 페이징 버튼 렌더링 함수
function renderPagination(searchKeyword, totalPages, currentPage) {
    var paginationContainer = $('#pagination-container');
    paginationContainer.empty(); // 기존 페이지네이션 초기화

    // 이전 페이지 버튼
    var prevButton = $('<button class="counsel-page-btn counsel-prev-btn"><i class="fa fa-chevron-left"></i></button>');
    prevButton.prop('disabled', currentPage === 1);
    prevButton.on('click', function () {
        fetchGuestList(searchKeyword, currentPage - 1);
    });

    // 다음 페이지 버튼
    var nextButton = $('<button class="counsel-page-btn counsel-next-btn"><i class="fa fa-chevron-right"></i></button>');
    nextButton.prop('disabled', currentPage === totalPages);
    nextButton.on('click', function () {
        fetchGuestList(searchKeyword, currentPage + 1);
    });

    // 페이지 정보
    var pageInfo = $('<span class="counsel-page-info"></span>').text(`Page ${currentPage} of ${totalPages}`);

    // 버튼 추가
    paginationContainer.append(prevButton, pageInfo, nextButton);
}
