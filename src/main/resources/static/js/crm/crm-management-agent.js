//crm-management-agent.js
// 페이지 로드 시 상담원 리스트 조회

// 상담원 리스트 조회 시 기본 정렬 기준 및 방향
var currentOrderBy = 'agtNo';  // 기본 정렬 기준 (이름)
var currentOrderDirection = 'ASC'; // 기본 정렬 방향 (오름차순)
var searchKeyword = ''; // 검색어 초기화
var pageSize = 10; // 페이지 크기
var currentPage = 1; // 현재 페이지

// 처음 상담원 리스트 조회
getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage);

/*
* 리스트 (자동 후처리, 콜백 일괄 제어 기능)
*/

// 자동 후처리 일괄 제어
$('#toggleAutoProcess').on('click', function (event) {
    event.stopPropagation(); // 이벤트 전파 중단
    const isChecked = $('.after-process').first().is(':checked'); // 첫 번째 체크박스 상태 확인
    $('.after-process').prop('checked', !isChecked); // 모든 체크박스 상태 변경

    // agentId 배열 생성
    let agentIds = [];
    let status = isChecked ? 'N' : 'Y'; // 상태값을 반전시킴

    // 모든 체크박스의 agentId를 배열로 수집
    $('.after-process').each(function () {
        agentIds.push($(this).data('agtno'));
    });

    // AJAX로 일괄 상태 업데이트 요청
    updateAgentList(agentIds, 'useAfter', status);
});

// 콜백 일괄 제어
$('#toggleCallback').on('click', function (event) {
    event.stopPropagation(); // 이벤트 전파 중단
    const isChecked = $('.callback-process').first().is(':checked'); // 첫 번째 체크박스 상태 확인
    $('.callback-process').prop('checked', !isChecked); // 모든 체크박스 상태 변경

    // agentId 배열 생성
    let agentIds = [];
    let status = isChecked ? 'N' : 'Y'; // 상태값을 반전시킴

    // 모든 체크박스의 agentId를 배열로 수집
    $('.callback-process').each(function () {
        agentIds.push($(this).data('agtno'));
    });

    // AJAX로 일괄 상태 업데이트 요청
    updateAgentList(agentIds, 'useCallBack', status);
});



/*******
* 검색 및 정렬 기능
 * *******/
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
            currentPage = response.currentPage;
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

        // 상태 값이 N일 경우에 row에 disabled-row 클래스를 추가
        if (node.state === 'N') {
            row.classList.add('disabled-row');
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${node.agtName}</td>
            <td>${node.agtExt}</td>
            <td>${node.agtGroup || ''}</td>
            <td>${node.agtTeam || ''}</td>
            <td>${node.agtAuth === '1' ? '관리자' : '일반'}</td>
        <td>
            <label class="management-switch">
                <input type="checkbox" class="after-process" data-agtNo="${node.agtNo}" ${afterStatus}>
                <span class="management-slider"></span>
            </label>
        </td>
        <td>
            <label class="management-switch">
                <input type="checkbox" class="callback-process" data-agtNo="${node.agtNo}" ${callbackStatus}>
                <span class="management-slider"></span>
            </label>
        </td>
        `;

        // 행 클릭 시 상세 정보 표시 및 강조 표시
        row.addEventListener('click', () => {
            // 기존에 선택된 행에서 selected-row 클래스를 제거
            const selectedRow = tableBody.querySelector('.selected-row');
            if (selectedRow) {
                selectedRow.classList.remove('selected-row');
            }
            // 클릭한 행에 selected-row 클래스 추가
            row.classList.add('selected-row');
            // 상세 정보 표시 함수 호출
            showNodeDetails(node);
        });

        // after-process 체크박스 클릭 시 값 업데이트
        const afterCheckbox = row.querySelector('.after-process');
        afterCheckbox.addEventListener('change', function() {
            const isChecked = this.checked ? 'Y' : 'N';
            updateAgentList(node.agtNo, 'useAfter', isChecked);
        });

        // callback-process 체크박스 클릭 시 값 업데이트
        const callbackCheckbox = row.querySelector('.callback-process');
        callbackCheckbox.addEventListener('change', function() {
            const isChecked = this.checked ? 'Y' : 'N';
            updateAgentList(node.agtNo, 'useCallBack', isChecked);
        });



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

        // 'active' 클래스 추가는 현재 페이지일 때만 실행
        if (i === currentPage) {
            pageButton.classList.add('active');
        }

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
    addAgentInfo(formData, currentPage);
});
// 신규 상담원 추가용 함수
function addAgentInfo(formData, currentPage) {
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
            getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage);
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

// 계정 저장 버튼 함수
$('#agentForm').on('submit', function(e) {
    e.preventDefault(); // 폼의 기본 제출 이벤트 막기
    updateAgentInfo(currentPage);
});

// 상담원 정보 업데이트 용 함수
function updateAgentInfo(currentPage) {
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
            getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage);
        },
        error: function(xhr, status, error) {
            // 실패 콜백
            console.error('저장 실패:', error);
            alert('상담원 정보 저장 중 오류가 발생했습니다.');
        }
    });
}

// 상담원 리스트에서 상담원 상태 업데이트
function updateAgentList(agtNos, field, value) {

    // agtNos가 배열이 아닌 경우, 배열로 변환
    if (!Array.isArray(agtNos)) {
        agtNos = [agtNos];
    }

    $.ajax({
        url: './management/updateAgentList', // 업데이트할 서버의 URL을 설정
        method: 'POST',
        data: {
            agtNos: agtNos,
            field: field,
            value: value
        },
        success: function(response) {
            console.log('상태 업데이트 성공:', response);
        },
        error: function(error) {
            console.log('상태 업데이트 실패:', error);
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

    if(node.state === 'N') {
        $('#toggleStatusBtn')
            .text('복구')       // 버튼 텍스트 변경
            .removeClass('stop-btn')  // '정지' 스타일 제거
            .addClass('recovery-btn');  // '복구' 스타일 추가
    } else {
        $('#toggleStatusBtn')
            .text('정지')        // 버튼 텍스트 변경
            .removeClass('recovery-btn')  // '복구' 스타일 제거
            .addClass('stop-btn');  // '정지' 스타일 추가
    }
}

/************
 * 상담원 정지/복구 토글 기능
 **************/
$("#toggleStatusBtn").click(function() {
    var agtId = $('#agtId').val();

    toggleAgentState(agtId, currentPage);
});


// 상담원 정지 버튼 클릭 시 정지 처리
function toggleAgentState(agtId, currentPage) {
    console.log('상담원 ID:', agtId);
    // 정지 확인 메시지
    if (confirm('상담원 상태를 변경 하시겠습니까?')) {
        $.ajax({
            url: './management/toggleAgentState',
            type: 'POST',
            data: {
                agtId: agtId
            },
            success: function(response) {
                alert(response);
                getAgentList(searchKeyword, currentOrderBy, currentOrderDirection, currentPage);

                // 상태에 따라 버튼 텍스트 및 스타일 토글
                var $toggleBtn = $('#toggleStatusBtn');

                if ($toggleBtn.hasClass('stop-btn')) {
                    $toggleBtn.text('복구'); // 텍스트를 '복구'로 변경
                    $toggleBtn.removeClass('stop-btn').addClass('recovery-btn'); // 클래스를 'recovery-btn'으로 변경
                } else {
                    $toggleBtn.text('정지'); // 텍스트를 '정지'로 변경
                    $toggleBtn.removeClass('recovery-btn').addClass('stop-btn'); // 클래스를 'stop-btn'으로 변경
                }
            },
            error: function(xhr, status, error) {
                console.error('상담원 정지 실패:', error);
                alert('상담원 정지 중 오류가 발생했습니다.');
            }
        });
    }
}