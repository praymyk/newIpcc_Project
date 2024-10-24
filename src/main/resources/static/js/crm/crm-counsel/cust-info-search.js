// 상담원 검색 페이지 스크립트 전역 변수
var searchKeyword;
var currentPage;
var guestId;  // 선택된 고객의 guestId

// 전화가 인입됐을 때 인입 연락처를 기준으로 고객 정보를 조회하는 스크립트
function selectGuestByPhone(cid) {

    // 전화번호를 기준으로 고객 정보를 조회
    $.ajax({
        url: '/Ipcc/crm/guest/getGuestInfo/',
        type: 'post',
        data: {
            cid: cid
        },
        success: function(data) {
            console.log(data);
            // 고객 정보를 화면에 표시

        },
        error: function() {
            console.log("고객 정보 조회 실패");
        }
    });
}
// Enter 키 이벤트 처리
$('#input-guest-search').on('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // 폼이 있을 경우 기본 제출 동작을 방지합니다.
        $('#btn-guest-search').click(); // 검색 버튼 클릭 이벤트 트리거
    }
});

// 고객 검사 버튼 클릭 시 고객 리스트 조회
$('#btn-guest-search').on('click', function() {
    searchKeyword = $('#input-guest-search').val();
    currentPage = 1; // 처음 페이지 번호

    fetchGuestList(searchKeyword, currentPage);
});

// 고객 검색 함수
function fetchGuestList(searchKeyword, pageNumber=1) {
    $.ajax({
        url: '/Ipcc/crm/guest/getGuestList',
        type: 'post',
        data: {
            custId: sessionCustId,
            searchKeyword: searchKeyword,
            pageNumber: pageNumber,
            pageSize: 5  // 페이지당 항목 수
        },
        success: function(data) {
            // 고객 리스트를 #guest-info-list에 tr 추가
            $('#guest-info-list').empty();

            // 검색결과가 없을 경우
            if(data.dataList.length === 0) {
                var row = $('<tr></tr>');
                row.append('<td colspan="4">검색 결과가 없습니다.</td>')
                row.append('<td><button>신규 고객 등록</button></td>');
                $('#guest-info-list').append(row);
                return;
            } else {

                data.dataList.forEach(function(guest, index) {
                    var row = $('<tr></tr>');
                    // 전화번호에 하이픈 추가
                    var formattedPhone = formatPhoneNumber(guest.phone);

                    row.append('<td>' + (index+1) + '<input type="hidden" class="guest-id" value="' + guest.guestId + '">' + '</td>');
                    row.append('<td>' + guest.name + '</td>');
                    row.append('<td>' + formattedPhone + '</td>');
                    row.append('<td>' + guest.recentConsultDate + '</td>'); // 상담이력과 연동 필요 (미완성)
                    // #guest-info-list에 추가
                    $('#guest-info-list').append(row);

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
    var paginationContainer = $('#pagination-custInfo-guestList');
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


// 고객 리스트에서 고객 클릭 시 고객 정보 조회
$('#guest-info-list').on('click', 'tr', function() {
    // 선택된 고객의 guestId로 조회 고객정보 조회
    // 선택 gustId 값은 전역 변수로 보관
    guestId = $(this).find('.guest-id').val();
    selectGuestInfo(guestId);
    // 다른 형제 요소들에서 selected 클래스 제거
    $(this).siblings().removeClass('selected');
    // 클릭한 tr 태그에 selected 클래스 추가
    $(this).addClass('selected');

    // 특정 category-item을 클릭한 것처럼 동작하게 하기 => 고객 정보 조회
    $('.category-item[data-category="custInfo"]').trigger('click');
});

// 전화번호 형식 변환 함수
function formatPhoneNumber(phone) {
    if (phone.length === 11) {
        // 11자리 전화번호 (예: 01012341234 → 010-1234-1234)
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (phone.length === 10) {
        // 10자리 전화번호 (예: 0212341234 → 02-1234-1234)
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
        // 예상치 못한 형식일 경우 그대로 반환
        return phone;
    }
}

// 고객 검색 결과 클릭 시 고객 정보 조회 함수
function selectGuestInfo(guestId) {
    $.ajax({
        url: '/Ipcc/crm/guest/selectGuestInfo',
        type: 'post',
        data: {
            guestId: guestId
        },
        success: function (data) {
            // 1. 고객 정보를 화면에 표시
            resetOrFillGuestForm(data);
            // 2. 선택 고객의 상담이력 작성 폼 초기화
            fillCounselLogForm(data);
        },
        error: function () {
            console.log("고객 정보 조회 실패");
        }
    });
}

// 고객 등록 클릭 시 신규 고객 정보 등록 폼 -> 기존 info 폼 초기화 + gust-id 값에 new
$('#btn-guest-new').on('click', function() {
    resetOrFillGuestForm();  // 입력 폼 초기화
});

// 고객 정보 입력 폼 초기화 또는 데이터 채우기 함수
function resetOrFillGuestForm(data = {}) {
    $('#cust-name').val(data.name || '');  // 데이터가 없으면 빈 값으로 초기화
    $('#cust-phone').val(data.phone ? formatPhoneNumber(data.phone) : '');
    $('#cust-email').val(data.email || '');
    $('#cust-birth').val(data.birthDay || '');
    $('#cust-gender').val(data.gender || 'M');
    $('#cust-road-adrs').val(data.roadAddress || '');
    $('#cust-detail-adrs').val(data.detailAddress || '');
    $('#cust-type').val(data.grade || '1');  // 등급 선택 초기화
    $('#cust-enroll').val(data.enrollDate || '');
    $('#cust-notes').val(data.guestMemo || '');
    $('#cust-black').val(data.black || 'N');  // 기본값 'N'
    $('#gust-id').val(data.guestId || 'new');  // 신규 등록 시 'new'
    $('#cust-state').val(data.state || 'Y');  // 상태 선택 초기화
}

// 고객 상담이력 작성 폼 등록
function fillCounselLogForm(data = {}){
    $('#counsel-guestId').val(data.guestId || '');
}