$(document).ready(function() {
    // 상담원 필터링 기능
    document.getElementById('searchInput').addEventListener('keyup', function () {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('.agent-item');
        rows.forEach(function (row) {
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (name.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // 상담원 추가 기능
    document.getElementById('addAgentBtn').addEventListener('click', function () {
        const newId = document.getElementById('agentTableBody').rows.length + 1;
        const newRow = `
            <tr class="agent-item" data-id="${newId}">
                <td>${newId}</td>
                <td>신규 상담원</td>
                <td>0000</td>
                <td>신규 그룹</td>
                <td>신규 팀</td>
                <td>상담원</td>
                <td>
                    <select class="auto-process-select">
                        <option value="사용">사용</option>
                        <option value="미사용">미사용</option>
                    </select>
                </td>
                <td>
                    <select class="callback-select">
                        <option value="사용">사용</option>
                        <option value="미사용">미사용</option>
                    </select>
                </td>
                <td><input type="checkbox" class="agent-checkbox"></td>
            </tr>`;
        document.getElementById('agentTableBody').insertAdjacentHTML('beforeend', newRow);
    });

    // 모두 선택/해제 기능
    document.getElementById('selectAll').addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('.agent-checkbox');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = document.getElementById('selectAll').checked;
        });
    });

    // 일괄 적용 버튼 기능
    document.getElementById('batchApplyBtn').addEventListener('click', function () {
        const selectedAgents = document.querySelectorAll('.agent-checkbox:checked');

        selectedAgents.forEach(function (agentCheckbox) {
            const row = agentCheckbox.closest('tr');  // 체크된 상담원의 행을 가져옴

            // 각 상담원의 auto-process-select와 callback-select 값을 가져옴
            const autoProcessValue = row.querySelector('.auto-process-select').value;
            const callbackValue = row.querySelector('.callback-select').value;

            // 처리 로직 - 각 상담원의 select 값을 개별적으로 처리
            console.log(`상담원 ID: ${row.dataset.id}, 자동 후처리: ${autoProcessValue}, 콜백: ${callbackValue}`);
            
            // 여기에서 값을 서버로 전송하거나 추가 로직을 처리할 수 있음
        });

        alert('일괄 적용 완료!');
    });
});