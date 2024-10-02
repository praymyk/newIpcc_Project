//crm-management-agent.js
// 페이지 로드 시 상담원 리스트 조회

// 상담원 리스트 조회 시 기본 정렬 기준 및 방향
var currentOrderBy = 'agtNo';  // 기본 정렬 기준 (이름)
var currentOrderDirection = 'DESC'; // 기본 정렬 방향 (오름차순)
var searchKeyword = ''; // 검색어 초기화
var pageSize = 10; // 페이지 크기

// 상담원 리스트 조회
getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, 1);

// 자동 후처리 일괄 제어
$('#toggleAutoProcess').on('click', function () {
    const isChecked = $('.after-process').first().is(':checked'); // 첫 번째 체크박스 상태 확인
    $('.after-process').prop('checked', !isChecked); // 모든 자동 후처리 체크박스 상태 변경
});
// 콜백 일괄 제어
$('#toggleCallback').on('click', function () {
    const isChecked = $('.callback-process').first().is(':checked'); // 첫 번째 체크박스 상태 확인
    $('.callback-process').prop('checked', !isChecked); // 모든 콜백 체크박스 상태 변경
});

// 검색어 입력 시마다 검색을 수행하는 이벤트 핸들러
$('#searchInput').on('input', function() {
    searchKeyword = $(this).val();  // 검색어를 가져옴
    getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, 1); // 검색 및 정렬된 리스트 요청
});
// 테이블 헤더 클릭 시 정렬을 수행하는 이벤트 핸들러
$('.sortable').on('click', function() {
    var column = $(this).text().trim();  // 클릭한 컬럼을 기준으로 정렬
    var orderBy;

    // 컬럼명에 따라 서버에서 사용할 필드명을 설정
    switch (column) {
        case '이름':
            orderBy = 'agtName';
            break;
        case '내선':
            orderBy = 'agtExt';
            break;
        case '상담그룹':
            orderBy = 'agtGroup';
            break;
        case '상담팀':
            orderBy = 'agtTeam';
            break;
        case '권한':
            orderBy = 'agtAuth';
            break;
        case '자동 후처리':
            orderBy = 'useAfter';
            break;
        case '콜백':
            orderBy = 'useCallBack';
            break;
        default:
            orderBy = 'agtNo'; // 기본값
    }
    // 오름차순/내림차순 토글
    currentOrderDirection = (currentOrderBy === orderBy && currentOrderDirection === 'DESC') ? 'ASC' : 'DESC';
    console.log(currentOrderDirection);
    currentOrderBy = orderBy;
    // 검색어와 함께 정렬된 리스트 요청
    searchKeyword = $('#searchInput').val();
    getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, 1);
});



/*******
상담원 리스트 조회 기능
********/
function getAgentList(searchKeyword,
                      currentOrderBy,
                      currentOrderDirection,
                      pageNumber) {

    $.ajax({
        type: 'GET',
        url: '/Ipcc/crm/management/agentList',
        data: {
            custId: sessionCustId, // 고객사 코드 : crm-main.js 에서 세션으로 받아온 값 사용
            searchKeyword: searchKeyword, // 검색어
            orderBy: currentOrderBy, // 정렬 기준
            orderDirection: currentOrderDirection, // 정렬 방향
            pageNumber: pageNumber,  // 페이지 번호 추가
            pageSize: pageSize // 페이지 크기 추가
        },
        success: function (response) {
            // 객체 형태로 받아서 테이블 렌더 함수에 사
            var agentList = response.dataList
            agentTable(agentList);
            console.log(response);
            var currentPage = response.currentPage;
            var totalPages = response.totalPages;
            updatePagination(totalPages, currentPage);

        },
        error: function (error) {
            console.log(error);
        }
    });
};

// 테이블에 상담원 노드 데이터를 표시
function agentTable(agentList) {
    const tableBody = document.getElementById('agentTableBody');
    tableBody.innerHTML = ''; // 기존 테이블 내용 초기화

    agentList.forEach((node, index) => {
        const row = document.createElement('tr');

        var afterStatus = node.useAfter === 'Y' ? 'checked' : '';
        var callbackStatus = node.useCallBack === 'Y' ? 'checked': '';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${node.agtName}</td>
            <td>${node.agtExt}</td>
            <td>${node.agtGroup || ''}</td>
            <td>${node.agtTeam || ''}</td>
            <td>${node.agtAuth === '1' ? '관리자' : '일반'}</td>
            <td>
                <label class="management-switch">
                    <input type="hidden" data-agtId="${node.agtId}" value="${node.agtId}">
                    <input type="checkbox" class="after-process" data-agtId="${node.agtId}-after" value="true" ${afterStatus}>
                    <span class="management-slider"></span>
                </label>
            </td>
            <td>
                <label class="management-switch">
                    <input type="checkbox" class="after-process" data-agtId="${node.agtId}-callback" value="true" ${callbackStatus}>
                    <span class="management-slider"></span>
                </label>
            </td>
        `;

        // 행 클릭 시 상세 정보 표시
        row.addEventListener('click', () => showNodeDetails(node));
        tableBody.appendChild(row);
    });

    // "신규 등록" 항목 추가
    $('#agentTableBody').append(`
        <tr class="new-entry" style="cursor: pointer;">
            <td colspan="8" style="text-align: center; color: #007aff;">+ 신규 등록</td>
        </tr>
    `);
}

// 페이지네이션 업데이트 함수
function updatePagination(totalPages, currentPage) {
    const paginationBox = document.querySelector('.paging-box');
    paginationBox.innerHTML = ''; // 기존 페이징 버튼 제거

    // 왼쪽 화살표
    const prevButton = document.createElement('button');
    prevButton.textContent = '«';
    prevButton.classList.add('arrow');
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage - 1);
    paginationBox.appendChild(prevButton);

    // 페이지 번호 버튼
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add(i === currentPage ? 'active' : '');
        pageButton.onclick = () => getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, i);
        paginationBox.appendChild(pageButton);
    }

    // 오른쪽 화살표
    const nextButton = document.createElement('button');
    nextButton.textContent = '»';
    nextButton.classList.add('arrow');
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage + 1);
    paginationBox.appendChild(nextButton);
}

/*
* 신규 상담원 등록 함수
*/
// 신규 등록 클릭 시 신규 등록 양식 폼 설정
$('#agentTableBody').on('click', '.new-entry', function() {
    alert('신규 상담원을 등록하시겠습니까?');
    // 숨겨진 필드에서 custId 값을 가져오기
    var custId = sessionCustId;
    // 기본값 설정
    var formData = {
        custId: custId,
        agtId: custId,
        agtPw: 1,
        agtExt: "미할당",
        agtName: "신규",
    };
    addAgentInfo(formData);
});
// 신규 상담원 추가용 함수
function addAgentInfo(formData) {
    // AJAX 요청
    $.ajax({
        url: './management/addAgentInfo', // 폼의 action URL
        type: 'POST', // HTTP 메소드
        contentType: 'application/json', // JSON 형태로 데이터 전송
        data: JSON.stringify(formData), // 폼 데이터를 JSON으로 변환하여 전송
        success: function (response) {
            // 성공 콜백
            alert('상담원 정보가 성공적으로 저장되었습니다.');
            // 추가적인 처리 (리스트 갱신)
            getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, pageNumber, pageSize);
            console.log(agentList);
        },
        error: function (xhr, status, error) {
            // 실패 콜백
            console.error('저장 실패:', error);
            alert('상담원 정보 저장 중 오류가 발생했습니다.');
        }
    });
}

/*
* 상담원 정보 수정용 함수
*/

// 신규 계정 저장 버튼 함수
$('#agentForm').on('submit', function(e) {
    e.preventDefault(); // 폼의 기본 제출 이벤트 막기
    updateAgentInfo();
});

// 상담원 정보 업데이트 용 함수
function updateAgentInfo() {
    // form 데이터를 수집하여 객체로 변환
    const formData = {
        agtNo: $('#agtNo').val(),
        custId: $('#custId').val(),
        agtId: $('#agtId').val(),
        agtPw: $('#agtPw').val(),
        agtExt: $('#agtExt').val(),
        agtName: $('#agtName').val(),
        agtGroup: $('#agtGroup').val(),
        agtTeam: $('#agtTeam').val(),
        agtTel: $('#agtTel').val(),
        agtIp: $('#agtIp').val(),
        // 체크박스 값 처리
        agtAuth: $('#agtAuth').is(':checked') ? 'true' : 'false',
        useCallBack: $('#useCallBack').is(':checked') ? 'true' : 'false',
        useAfter: $('#useAfter').is(':checked') ? 'true' : 'false'
    };

    $.ajax({
        url: './management/updateAgentInfo',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            alert('상담원 정보가 성공적으로 수정되었습니다.');
            getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, pageNumber, pageSize);
        },
        error: function(xhr, status, error) {
            // 실패 콜백
            console.error('저장 실패:', error);
            alert('상담원 정보 저장 중 오류가 발생했습니다.');
        }
    });
}

// 노드 클릭 시 상세 정보 표시
function showNodeDetails(node) {

    $('#agtNo').val(node.agtNo);
    $('#custId').val(node.custId);
    $('#agtId').val(node.agtId);
    $('#agtPw').val(node.agtPw);
    $('#agtExt').val(node.agtExt);
    $('#agtName').val(node.agtName);
    $('#agtGroup').val(node.agtGroup);
    $('#agtTeam').val(node.agtTeam);
    // 체크박스 상태
    node.agtAuth === "0" ? $('#agtAuth').prop('checked', false) : $('#agtAuth').prop('checked', true);
    node.useAfter === "N" ? $('#useCallBack').prop('checked', false) : $('#useCallBack').prop('checked', true);
    node.useCallBack === "N" ? $('#useAfter').prop('checked', false) : $('#useAfter').prop('checked', true);
}