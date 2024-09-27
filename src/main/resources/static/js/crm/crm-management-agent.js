// 페이지 로드 시 상담원 리스트 조회
$(document).ready(function () {
    console.log('crm-management-agent.js');
    getAgentList();
});

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

// 상담원 검색어 입력
document.getElementById('searchInput').addEventListener('keyup', function () {
    var searchKeyword = this.value.toLowerCase();
});

/*******
 상담원 리스트 조회 기능
     ********/
function getAgentList(searchKeyword) {
    $.ajax({
        type: 'GET',
        url: '/Ipcc/manager/agent/agentList', // manager/controller/AgentController.java
        data: {
            custId: 'meta',
            searchKeyword: searchKeyword
        },
        success: function (response) {
            // 객체 형태로 받아서 테이블 렌더 함수에 사용
            var agentList = response;

            agentTable(agentList);
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
            getAgentList();
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
            getAgentList();
        },
        error: function(xhr, status, error) {
            // 실패 콜백
            console.error('저장 실패:', error);
            alert('상담원 정보 저장 중 오류가 발생했습니다.');
        }
    });
}




/****************
 테이블 정렬 기능 ( sort 기능은 DB 조회시 쿼리문으로 해결해야 해서 삭제 해야 할 수 잇음 )
 클래스 토글만 남겨서 아이콘 전환만 유지할 것.
 ****************/
document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', () => {
        // 정렬 상태 업데이트
        header.classList.toggle('desc');
        getAgentList();

        $('#custId').val(custId);  // 세션에서 가져온 값 사용
        $('#agtId').val(custId);
        $('#agtExt').val('미할당');
        $('#agtName').val('신규');

        $('#agentCid').val('미할당');
        $('#agtGroup').val('');
        $('#agtTeam').val('');
        $('#agentTel').val('');
        $('#agentIp').val('신규');

        $('#callBackStatus').val(false);
        $('#afterStatus').val(false);
    });
});

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