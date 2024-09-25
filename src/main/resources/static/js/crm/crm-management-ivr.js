// IVR 트리 데이터 (가상 더미 데이터)
var ivrNodes = [
    {
        id: "1",
        ccode: "A업체",
        tr_name: "A_IVR트리",
        ivr_name: "음성안내1",
        type: "음성안내",
        message: "환영합니다.",
        ivr_chain: "2",
        ivr_root: "1"
    },
    {
        id: "2",
        ccode: "A업체",
        tr_name: "A_IVR트리",
        ivr_name: "디짓입력1",
        type: "디짓입력",
        message: "1번은 영업부, 2번은 지원부로 연결됩니다.",
        ivr_chain: "",
        ivr_root: "0"
    },
    {
        id: "3",
        ccode: "A업체",
        tr_name: "A_IVR트리",
        ivr_name: "음성안내2",
        type: "음성안내",
        message: "영업부로 연결됩니다.",
        ivr_chain: "",
        ivr_root: "0"
    },
    {
        id: "4",
        ccode: "A업체",
        tr_name: "A_IVR트리",
        ivr_name: "음성안내3",
        type: "음성안내",
        message: "지원부로 연결됩니다.",
        ivr_chain: "5",
        ivr_root: "0"
    },
    {
        id: "5",
        ccode: "A업체",
        tr_name: "A_IVR트리",
        ivr_name: "음성안내4",
        type: "음성안내",
        message: "지원부로 연결됩니다.",
        ivr_chain: "",
        ivr_root: "0"
    }
];

// 디짓 입력 데이터 (가상 더미 데이터)
var ivrDigits = [
    {
        id: "2",
        digitNum: "1",
        ivr_chain: "3"
    },
    {
        id: "2",
        digitNum: "2",
        ivr_chain: "4"
    }
];

// 테이블에 IVR 노드 데이터를 표시
function renderIVRTable(ivrNodes) {
    const tableBody = document.getElementById('ivr_table_body');
    tableBody.innerHTML = ''; // 기존 테이블 내용 초기화

    ivrNodes.forEach((node, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${node.ivr_name}</td>
            <td>${node.type}</td>
            <td>${node.ivr_chain || '없음'}</td>
        `;

        // 행 클릭 시 상세 정보 표시
        row.addEventListener('click', () => showNodeDetails(node));
        tableBody.appendChild(row);
    });

    // "신규 등록" 항목 추가
    $('#ivr_table_body').append(`
        <tr class="new-entry" style="cursor: pointer;">
            <td colspan="4" style="text-align: center; color: #007aff;">+ 신규 등록</td>
        </tr>
    `);
}

// 노드 클릭 시 상세 정보 표시
function showNodeDetails(node) {
    document.getElementById('ccode').value = node.ccode;
    document.getElementById('ivrName').value = node.ivr_name;
    document.getElementById('ivr_type').value = node.type;
    document.getElementById('ivr_message').value = node.message;

    // 타입에 따라 필드 표시 제어
    if (node.type === "음성안내") {
        document.getElementById('ivr-chain-field').classList.remove('hidden');
        document.getElementById('digit-fields').classList.add('hidden');
        document.getElementById('ivr_chain').value = node.ivr_chain;

    } else if (node.type === "디짓입력") {
        document.getElementById('ivr-chain-field').classList.add('hidden');
        document.getElementById('digit-fields').classList.remove('hidden');

        // 디짓 입력 필드를 동적으로 추가
        const digitEntries = document.getElementById('digit-entries');
        digitEntries.innerHTML = ''; // 기존 디짓 필드 초기화

        //
        // ivrDigits > 나중에 node.id를 이용해 DB로 부터 digit chain 값을 불러와야함 
        //
        ivrDigits.filter(digit => digit.id === node.id).forEach(digit => {
            const digitField = document.createElement('div');
            digitField.className = 'digit-entry'; /* 수평 배치 */
            digitField.innerHTML = `        
                <input type="text" value="${digit.digitNum}" placeholder="입력 번호">
                <input type="text" value="${digit.ivr_chain}" placeholder="연결된 IVR 없음">
            `;
            digitEntries.appendChild(digitField);
        });
    }
}

// 디짓 입력 필드 추가 함수 (수직 배치)
function addDigit(event) {
    event.preventDefault(); // 폼 제출 방지
    const digitField = document.createElement('div');
    digitField.className = 'digit-entry'; 
    digitField.innerHTML = `
        <input type="text" placeholder="입력 번호">
        <input type="text" placeholder="연결된 IVR">
    `;
    document.getElementById('digit-entries').appendChild(digitField);
}

// 신규 등록 클릭 시 신규 등록 양식 폼 설정
$('#ivr_table_body').on('click', '.new-entry', function() {

        
    // IVR 정보 (상세정보 항목) 초기화 코드 입력 부분

    // 타입에 따라 필드 표시 제어
    if (node.type === "음성안내") {
        document.getElementById('ivr-chain-field').classList.remove('hidden');
        document.getElementById('digit-fields').classList.add('hidden');
        document.getElementById('ivr_chain').value = node.ivr_chain;

    } else if (node.type === "디짓입력") {
        document.getElementById('ivr-chain-field').classList.add('hidden');
        document.getElementById('digit-fields').classList.remove('hidden');

        // 디짓 입력 필드를 동적으로 추가
        const digitEntries = document.getElementById('digit-entries');
        digitEntries.innerHTML = ''; // 기존 디짓 필드 초기화

        //
        // ivrDigits > 나중에 node.id를 이용해 DB로 부터 digit chain 값을 불러와야함 
        //
        ivrDigits.filter(digit => digit.id === node.id).forEach(digit => {
            const digitField = document.createElement('div');
            digitField.className = 'digit-entry'; /* 수평 배치 */
            digitField.innerHTML = `        
                <input type="text" value="" placeholder="입력 번호">
                <input type="text" value="" placeholder="연결된 IVR 없음">
            `;
            digitEntries.appendChild(digitField);
        });
    }
});

// 페이지 로드 시 IVR 테이블 그리기
$(document).ready(function() {
    renderIVRTable(ivrNodes);
});