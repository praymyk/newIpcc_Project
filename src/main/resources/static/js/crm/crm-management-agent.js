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

// 상담원 필터링 기능
document.getElementById('searchInput').addEventListener('keyup', function () {
console.log('검색어 입력됨');
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

/****************
 테이블 정렬 기능 ( sort 기능은 DB 조회시 쿼리문으로 해결해야 해서 삭제 해야 할 수 잇음 )
클래스 토글만 남겨서 아이콘 전환만 유지할 것.
****************/
document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', () => {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const index = Array.prototype.indexOf.call(header.parentNode.children, header);
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const isDescending = header.classList.contains('desc');

        // 다른 열의 정렬 상태 초기화
        table.querySelectorAll('th.sortable').forEach(th => th.classList.remove('desc'));

        // 행 정렬
        rows.sort((rowA, rowB) => {
            const cellA = rowA.children[index].innerText;
            const cellB = rowB.children[index].innerText;

            // 숫자 열의 경우 숫자로 변환
            const a = isNaN(cellA) ? cellA : parseFloat(cellA);
            const b = isNaN(cellB) ? cellB : parseFloat(cellB);

            if (a < b) return isDescending ? 1 : -1;
            if (a > b) return isDescending ? -1 : 1;
            return 0;
        });

        // 정렬된 행 추가
        rows.forEach(row => tbody.appendChild(row));

        // 정렬 상태 업데이트
        header.classList.toggle('desc', !isDescending);
    });
});