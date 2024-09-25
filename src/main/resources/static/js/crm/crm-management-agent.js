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

// "신규 등록" 항목 추가
$('#agentTableBody').append(`
    <tr class="new-entry" style="cursor: pointer;">
        <td colspan="8" style="text-align: center; color: #007aff;">+ 신규 등록</td>
    </tr>
`);

// 신규 등록 클릭 시 신규 등록 양식 폼 설정
$('#agentTableBody').on('click', '.new-entry', function() {
    // 업체코드와 근무 이름은 신규 등록 시 기본 값 넣어 주기
    $('#ccode').val('신규');
    $('#agentId').val('신규');
    $('#agentExtension').val('');
    $('#agentName').val('신규');

    $('#agentCid').val('신규');
    $('#agentGroup').val('신규');
    $('#agentTeam').val('신규');
    $('#agentTel').val('신규');
    $('#agentIp').val('신규');

    $('#callBackStatus').val(false);
    $('#afterStatus').val(false);

});

/****************
 테이블 정렬 기능 ( sort 기능은 DB 조회시 쿼리문으로 해결해야 해서 삭제 해야 할 수 잇음 )
 클래스 토글만 남겨서 아이콘 전환만 유지할 것.
 ****************/
document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', () => {
        // 정렬 상태 업데이트
        header.classList.toggle('desc');
    });
});