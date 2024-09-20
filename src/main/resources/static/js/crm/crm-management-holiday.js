// 스위치 상태 변경시 처리 (근무 유무)
$(document).on('change', 'input[type="checkbox"]', function() {
    let status = $(this).is(':checked') ? '근무' : '휴무';
    console.log("상태 변경:", status);
});

// 저장 버튼 클릭 이벤트 처리
$('#saveBtn').on('click', function() {
    const ccode = $('#ccode').val();
    const holiName = $('#holiName').val();
    const holiStatus = $('#holiStatus').is(':checked') ? '근무' : '휴무';
    console.log("저장됨 - 업체코드:", ccode, "휴무일 이름:", holiName, "근무 상태:", holiStatus);
});


// "신규 등록" 항목 추가
$('#holiTableBody').append(`
    <tr class="new-entry" style="cursor: pointer;">
        <td colspan="5" style="text-align: center; color: #007aff;">+ 신규 등록</td>
    </tr>
`);

// 신규 등록 클릭 시 신규 등록 양식 폼 설정
$('#holiTableBody').on('click', '.new-entry', function() {
    // 업체코드와 근무 이름은 신규 등록 시 기본 값 넣어 주기
    $('#ccode').val('신규');
    $('#holiName').val('신규');
    $('#holiday').val('');

    $('#holiStatus').val(false);
    
});