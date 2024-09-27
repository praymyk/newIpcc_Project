// 국선코드와 인입 코드 앞자리 고정용 스크립트
function enforcePrefix(id, prefix) {
    const input = document.getElementById(id);
    // 입력 값에서 prefix가 빠지지 않도록 강제
    if (!input.value.startsWith(prefix)) {
        input.value = prefix;
    }
}

// 대표번호 정보 더미 데이터
var trunk = [
    {
        no : "1",
        ccode : "테스트",
        trunkCode : "T_07012341234",
        did : "07012341234",
        tel : "07012341234",
        ingress : "I_07012341234",
        routing : "",
        trunkNum : "1234-1234",
        trunkName : "테스트 대표번호"
    }
]

// 테이블에 IVR 노드 데이터를 표시
function renderTrunkTable(trunk) {
    console.log("잘들어오나?");
    console.log(trunk);
    const tableBody = document.getElementById('trunkTableBody');
    tableBody.innerHTML = ''; // 기존 테이블 내용 초기화

    trunk.forEach((node, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${node.trunkName}</td>
            <td>${node.trunkCode}</td>
            <td>${node.did}</td>
            <td>${node.tel}</td>
            <td>${node.ingress}</td>
            <td>${node.routing || '없음'}</td>

        `;

        // 행 클릭 시 상세 정보 표시
        row.addEventListener('click', () => showNodeDetails(node));
        tableBody.appendChild(row);
    });

        // "신규 등록" 항목 추가
        $('#ivr_table_body').append(`
            <tr class="new-entry" style="cursor: pointer;">
                <td colspan="7" style="text-align: center; color: #007aff;">+ 신규 등록</td>
            </tr>
        `);
    }


    // 노드 클릭 시 상세 정보 표시
function showNodeDetails(trunk) {

}

// 페이지 로드 시 IVR 테이블 그리기
$(document).ready(function() {
    renderTrunkTable(trunk);

});