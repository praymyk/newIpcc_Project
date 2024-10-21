// cust-info-counselLog.js

/*
* 선택 고객 상담이력 검색 함수
*/
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

/*
*  선택 고객 상담이력 검색 결과 오름/내림 차순 정렬 함수
*/
var orderByTh = document.querySelectorAll('.custInfo-counselTable th'); // 모든 <th> 요소 선택
var currentOrder = {
    column: null,    // 현재 정렬 기준 컬럼
    direction: 'DESC' // 기본 정렬 방향 (내림차순)
};
// 정렬 후 재 리스트 조회에 필요한 전역 변수
var currentPage; // 현재 페이지 번호
var startDate; // 검색 시작일
var endDate; // 검색 종료일
var processStat; // 상담 결과

// 검색 이벤트
orderByTh.forEach(function (th) {
    th.addEventListener('click', function () {
        var orderBy = this.getAttribute('id'); // 클릭한 <th>의 ID를 가져옴

        console.log("orderBy:", orderBy);

        startDate = document.getElementById('counselLog-startDate').value; // 검색 시작일
        endDate = document.getElementById('counselLog-endDate').value; // 검색 종료일
        processStat = document.getElementById('counselLog-result').value; // 상담 결과

        // 정렬 상태 토글 (오름차순 <-> 내림차순)
        if (currentOrder.column === orderBy) {
            currentOrder.direction = (currentOrder.direction === 'ASC') ? 'DESC' : 'ASC';
        } else {
            currentOrder.column = orderBy;
            currentOrder.direction = 'ASC'; // 새로운 컬럼 클릭 시, 오름차순으로 설정
        }

        // 현재 정렬 방향을 추출하고 변수에 저장
        var orderDirection = currentOrder.direction;

        // SQL을 통해 서버에서 정렬이 수행될 것이므로, 정렬 기준 전달 후 목록 갱신
        fetchGuestCounselLogList(startDate,endDate,processStat,
            1, // 페이지 번호는 1로 초기화
            currentOrder.column,    // 정렬 기준
            currentOrder.direction  // 정렬 방향
        );

        // 정렬 상태 시각적으로 표시
        updateTableHeaderIcons(orderByTh, currentOrder.column, currentOrder.direction);

    });
});

// 클릭한 <th>에 정렬 아이콘을 표시하고, 다른 <th>의 아이콘을 제거하는 함수
function updateTableHeaderIcons(thElements, orderBy, orderDirection) {
    thElements.forEach(function (th) {
        // 모든 <th>에서 기존 정렬 클래스를 제거
        th.classList.remove('sort-asc', 'sort-desc');

        // 클릭된 <th>에 정렬 방향에 맞는 클래스 추가
        if (th.getAttribute('id') === orderBy) {
            if (orderDirection === 'ASC') {
                th.classList.add('sort-asc');
            } else {
                th.classList.add('sort-desc');
            }
        }
    });
}

// 선택 고객의 상담이력 리스트 조회
function fetchGuestCounselLogList(startDate,endDate,result,
                                  pageNumber=1,
                                  orderBy = null,
                                  orderDirection = null) {
    $.ajax({
        url: '/Ipcc/crm/guest/getCounselLogList',
        type: 'post',
        dataType: 'json',
        data: {
            guestId: guestId, // 선택 고객ID 는 전역 변수에서 가져옴
            processStat: result,
            startDate: startDate,
            endDate: endDate,
            searchKeyword : "", // 검색어 ( 사용하지 않아 빈모양 처리 )
            pageNumber: pageNumber,
            pageSize: 5,  // 페이지당 항목 수
            orderBy: orderBy,
            orderDirection: orderDirection
        },
        success: function(data) {
            // 고객 리스트를 #custInfo-counselLogList에 tr 추가
            $('#custInfo-counselLogList').empty();

            console.log("상담이력 리스트 조회", data);

            // 검색결과가 없을 경우
            if(data.dataList.length === 0) {
                var row = $('<tr></tr>');
                row.append('<td colspan="5">등록된 상담 이력이 없습니다.</td>')
                $('#custInfo-counselLogList').append(row);
                return;
            } else {
                data.dataList.forEach(function(counselLog, index) {
                    // 각 counselLog의 categoriesAsJson 파싱
                    var categoriesObj = JSON.parse(counselLog.categoriesAsJson);
                    var row = $('<tr></tr>');
                    row.append('<td>' + counselLog.counselDate +
                        '<input type="hidden" value="' + counselLog.counselId + '"></td>');
                    row.append('<td>' + counselLog.agentName + '</td>');
                    row.append('<td>' + counselLog.guestName + '</td>');
                    row.append('<td>' + categoriesObj['ARS-1'] + '</td>');
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
