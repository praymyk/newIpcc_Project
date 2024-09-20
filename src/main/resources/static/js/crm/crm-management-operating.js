$(document).ready(function() {

    const timeInputs = document.querySelectorAll('.flatpickr-input');

    // 모든 시간 필드에 flatpickr 적용
    timeInputs.forEach(function(input) {
        flatpickr(input, {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i", // 24시간 형식
            time_24hr: true,
            appendTo: document.getElementById('management-operating')// 24시간제로 설정
        });
    });

    // 예시로 사용되는 근무 시간 데이터
    let workTimes = [
        {
            id: 1,
            ccode: '001',
            workName: 'A타입',
            workHours: { start: '09:00', end: '18:00' },
            lunch: { start: '12:00', end: '13:00' },
            holidays: { start: '12:00', end: '13:00' },
            weekdaysHours: {
                monday: { start: '09:00', end: '18:00' },
                tuesday: { start: '09:00', end: '18:00' },
                wednesday: { start: '09:00', end: '18:00' },
                thursday: { start: '09:00', end: '18:00' },
                friday: { start: '09:00', end: '18:00' },
                saturday: { start: '09:00', end: '12:00' },
                sunday: { start: '09:00', end: '10:00' }
            }
        },
        {
            id: 2,
            ccode: '002',
            workName: 'B타입',
            workHours: { start: '10:00', end: '19:00' },
            lunch: { start: '13:00', end: '14:00' },
            holidays: { start: '12:00', end: '13:00' },
            weekdaysHours: {
                monday: { start: '10:00', end: '19:00' },
                tuesday: { start: '10:00', end: '19:00' },
                wednesday: { start: '10:00', end: '19:00' },
                thursday: { start: '10:00', end: '19:00' },
                friday: { start: '10:00', end: '19:00' },
                saturday: { start: '10:00', end: '19:00' },
                sunday: { start: '09:00', end: '10:00' }
            }
        }
    ];

    // 테이블에 데이터 렌더링
    const renderTable = () => {
        $('#workTableBody').empty(); // 테이블 초기화
        workTimes.forEach(item => {
            $('#workTableBody').append(`
                <tr class="work-item" data-id="${item.id}">
                    <td>${item.id}</td>
                    <td>${item.workName}</td>
                    <td>${item.workHours.start}~${item.workHours.end}</td>
                    <td>${item.lunch.start}~${item.lunch.end}</td>
                    <td>${item.holidays.start}~${item.holidays.end}</td>
                </tr>
            `);
        });

        // "신규 등록" 항목 추가
        $('#workTableBody').append(`
            <tr class="new-entry" style="cursor: pointer;">
                <td colspan="5" style="text-align: center; color: #007aff;">+ 신규 등록</td>
            </tr>
        `);
    };

    // 테이블 초기 렌더링
    renderTable();

    // 리스트 항목 클릭 시 상세보기 폼에 값 채우기
    $('#workTableBody').on('click', '.work-item', function() {
        const id = $(this).data('id');
        const selectedWorkTime = workTimes.find(item => item.id == id);

        // 기본 시간 설정 값 채우기
        $('#ccode').val(selectedWorkTime.ccode);
        $('#workName').val(selectedWorkTime.workName);
        $('#work-start').val(selectedWorkTime.workHours.start);
        $('#work-end').val(selectedWorkTime.workHours.end);
        $('#lunch-start').val(selectedWorkTime.lunch.start);
        $('#lunch-end').val(selectedWorkTime.lunch.end);

        // 요일별 시간 설정 값 채우기
        $('#monday-start').val(selectedWorkTime.weekdaysHours.monday.start);
        $('#monday-end').val(selectedWorkTime.weekdaysHours.monday.end);
        $('#tuesday-start').val(selectedWorkTime.weekdaysHours.tuesday.start);
        $('#tuesday-end').val(selectedWorkTime.weekdaysHours.tuesday.end);
        $('#wednesday-start').val(selectedWorkTime.weekdaysHours.wednesday.start);
        $('#wednesday-end').val(selectedWorkTime.weekdaysHours.wednesday.end);
        $('#thursday-start').val(selectedWorkTime.weekdaysHours.thursday.start);
        $('#thursday-end').val(selectedWorkTime.weekdaysHours.thursday.end);
        $('#friday-start').val(selectedWorkTime.weekdaysHours.friday.start);
        $('#friday-end').val(selectedWorkTime.weekdaysHours.friday.end);
        $('#saturday-start').val(selectedWorkTime.weekdaysHours.saturday.start);
        $('#saturday-end').val(selectedWorkTime.weekdaysHours.saturday.end);
        $('#sunday-start').val(selectedWorkTime.weekdaysHours.sunday.start);
        $('#sunday-end').val(selectedWorkTime.weekdaysHours.sunday.end);
        $('#holidays-start').val(selectedWorkTime.holidays.start);
        $('#holidays-end').val(selectedWorkTime.holidays.end);
    });
});

 // 신규 등록 클릭 시 신규 등록 양식 폼 설정
$('#workTableBody').on('click', '.new-entry', function() {
    // 업체코드와 근무 이름은 신규 등록 시 기본 값 넣어 주기
    $('#ccode').val('신규');
    $('#workName').val('신규');

    $('#work-start').val('');
    $('#work-end').val('');
    $('#lunch-start').val('');
    $('#lunch-end').val('');
    $('#holidays-start').val('');
    $('#holidays-end').val('');
    $('#monday-start').val('');
    $('#monday-end').val('');
    $('#tuesday-start').val('');
    $('#tuesday-end').val('');
    $('#wednesday-start').val('');
    $('#wednesday-end').val('');
    $('#thursday-start').val('');
    $('#thursday-end').val('');
    $('#friday-start').val('');
    $('#friday-end').val('');
    $('#saturday-start').val('');
    $('#saturday-end').val('');
    $('#sunday-start').val('');
    $('#sunday-end').val('');
});