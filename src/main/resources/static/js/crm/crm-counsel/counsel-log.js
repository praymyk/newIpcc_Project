// counsel-log.js

loadCounselLogForm();

// 업체별 상담이력 폼 불러오기 (설정 카테고리 숫자에 맞게 )
function loadCounselLogForm() {
    $.ajax({
        url: '/Ipcc/crm/counsel/getConsultForm',
        type: 'POST',
        data: {custId: sessionCustId},
        success: function (response) {

            const arsContainer = $('.counsel-entry');  // ARS select 태그를 담을 div
            const counsleContainer = $('.counsel-group');  // COUNSLE select 태그를 담을 div

            // 기존 select 태그 제거
            arsContainer.empty();
            counsleContainer.empty();

            // categoryType을 기준으로 동적으로 select 태그 생성 및 옵션 추가
            const containers = {
                'ARS': arsContainer,
                'COUNSLE': counsleContainer
            };

            response.forEach(category => {
                const [type, group] = category.categoryType.split('-'); // 예: 'ARS-1' -> type='ARS', group='1'
                const container = containers[type]; // ARS 또는 COUNSLE에 해당하는 컨테이너 선택

                // 해당 group에 대한 select 태그가 이미 있는지 확인
                let selectElement = container.find(`#${type}-${group}`);
                if (selectElement.length === 0) {
                    // 없으면 새로 생성
                    const label = `<label for="${type}-${group}">${category.categoryName}</label>`;
                    const select =
                        `<div class="select-container">
                            <select id="${type}-${group}" class="dynamic-select" data-type="${type}" data-group="${group}"></select>
                            <i class="fa-solid fa-angle-down"></i>
                         </div>`;
                    container.append(`<div>${label}${select}</div>`);
                    selectElement = container.find(`#${type}-${group}`);
                }

                // 해당 select 태그에 옵션 추가
                const option = `<option value="${category.categoryId}">${category.categoryValue}</option>`;
                selectElement.append(option);
            });

            // 생성된 select 태그에 이벤트 핸들러 부착
            $('.dynamic-select').on('change', function() {
                const selectedValue = $(this).val();
                const type = $(this).data('type');
                const group = $(this).data('group');

                // 다음 선택지 불러오기
                loadNextSelect(type, group, selectedValue);
            });

            // ***초기 선택된 값을 기반으로 하위 카테고리를 로드***
            $('.dynamic-select').each(function () {
                const selectedValue = $(this).val();
                const type = $(this).data('type');
                const group = $(this).data('group');

                if (selectedValue) {  // 선택된 값이 있을 때만 하위 카테고리 로드
                    loadNextSelect(type, group, selectedValue);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('상담 이력 폼 불러오기 실패:', error);
            alert('상담 이력 폼 불러오기에 실패했습니다.');
        }
    });
}

// 다음 선택지 불러오기 (ARS 또는 COUNSLE)
// 첫 번째 카테고리 선택 시 관련된 하위 카테고리를 초기화하고 재생성
function loadNextSelect(type, group, selectedValue) {
    // AJAX 요청을 통해 선택된 값에 따라 다음 선택지를 조회
    $.ajax({
        url: '/Ipcc/crm/counsel/getNextCategory', // 다음 선택지를 불러올 URL
        type: 'POST',
        data: {
            categoryType: type,
            categoryGroup: group,
            selectedId: selectedValue
        },
        success: function (response) {

            const arsContainer = $('.counsel-entry');  // ARS select 태그를 담을 div
            const counsleContainer = $('.counsel-group');  // COUNSLE select 태그를 담을 div

            const containers = {
                'ARS': arsContainer,
                'COUNSLE': counsleContainer
            };

            // 상위 카테고리가 변경될 때 해당 그룹 이후의 모든 하위 카테고리 제거
            const container = containers[type];
            container.find('select').filter(function() {
                return parseInt($(this).data('group')) > parseInt(group);
            }).closest('div').parent().remove();

            // 새로운 하위 카테고리 생성
            response.forEach(category => {
                const [type, group] = category.categoryType.split('-'); // 예: 'ARS-2' -> type='ARS', group='2'
                let selectElement = container.find(`#${type}-${group}`);
                if (selectElement.length === 0) {
                    // 없으면 새로 생성
                    const label = `<label for="${type}-${group}">${category.categoryName}</label>`;
                    const select =
                        `<div class="select-container">
                            <select id="${type}-${group}" class="dynamic-select" data-type="${type}" data-group="${group}">
                                <option value="">Select an option</option>
                            </select>
                            <i class="fa-solid fa-angle-down"></i>
                         </div>`;
                    container.append(`<div>${label}${select}</div>`);
                    selectElement = container.find(`#${type}-${group}`);
                }

                // 해당 select 태그에 옵션 추가
                const option = `<option value="${category.categoryId}">${category.categoryValue}</option>`;
                selectElement.append(option);
            });

            // 이벤트 핸들러 재부착
            $('.dynamic-select').off('change').on('change', function () {
                const selectedValue = $(this).val();
                const type = $(this).data('type');
                const group = $(this).data('group');

                // 다음 선택지 불러오기
                loadNextSelect(type, group, selectedValue);
            });
        },
        error: function (xhr, status, error) {
            console.error('다음 선택지 불러오기 실패:', error);
            alert('다음 선택지를 불러오기에 실패했습니다.');
        }
    });
}


// 상담 이력 저장 (기본 폼 내용 / 카테고리 내용 별도 저장 )
$("#counselLogForm").on('submit', function (e) {
    e.preventDefault();

    // 1. 상담 이력 저장 시 고객 선택 필수
    if( $('#counsel-guestId').val() === '' ){
        alert('상담이력 저장을 위한 고객을 선택해주세요.');
        return;
    }
    // 2. 입력된 상담이력 ID가 없을 경우 수동 상담 이력 등록
    if( $('#counsel-id').val() === '' ){
        $('#counsel-date').val(formatDate(new Date())); // 상담일자 현재 시간으로 설정
        $('#counsel-timeUsed').val('0'); // 통화시간 0으로 설정
    }

    // 3. 기본 폼 내용 저장
    const logData = {
        custId: sessionCustId,
        counselId: $('#counsel-id').val(), // 상담 이력 ID (수정 시 필요)
        agentId: $('#counsel-agentId').val(), // 상담원 ID
        guestId: $('#counsel-guestId').val(), // 고객 ID
        counselDate: $('#counsel-date').val(), // 상담일자
        timeUsed: $('#counsel-timeUsed').val(), // 통화시간
        callId: $('#counsel-callId').val(), // 통화ID  (통화 이력과 연결)
        counselInOut: $('#counsel-inout').val(), // 상담유형
        processStat: $('#processStat').val(), // 상담상태
        counselMemo: $('#counsel-memo').val(), // 상담메모

        categoriesArr: []  // 카테고리 선택 값 저장
    };

    // 4. 카테고리 내용 저장 (카테고리 내용은 업체별로 다르기 때문에 동적으로 수집)
    // #counseLogForm 안으로 제한 select 태그에서 선택된 값 수집 (기본 카테고리 값 제외)
    $('#counselLogForm select').not('#counsel-inout, #processStat').each(function () {
        const categoryId = $(this).val();
        if (categoryId) {
            logData.categoriesArr.push(categoryId);
        }
    });

    console.log('상담 이력 저장:데이터', logData);

    // 3. logData를 서버로 전송
    $.ajax({
        url: '/Ipcc/crm/counsel/saveCounselLog',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(logData),
        success: function (response) {
            alert(response);
            $("#counselLogForm")[0].reset();
            // 동적으로 설정된 고객 ID 필드 수동 초기화
            $('#counsel-guestId').val('');  // guestId 수동 초기화
        },
        error: function (xhr, status, error) {
            console.error(error);
            alert('상담 이력 저장에 실패했습니다.');
            $("#counselLogForm")[0].reset();
            // 동적으로 설정된 고객 ID 필드 수동 초기화
            $('#counsel-guestId').val('');  // guestId 수동 초기화
        }
    });
});

// 날짜 포맷 함수 (yyyy-MM-dd HH:mm:ss)
function formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 두 자리로 맞추기
    const day = ('0' + date.getDate()).slice(-2); // 두 자리로 맞추기
    const hours = ('0' + date.getHours()).slice(-2); // 두 자리로 맞추기
    const minutes = ('0' + date.getMinutes()).slice(-2); // 두 자리로 맞추기
    const seconds = ('0' + date.getSeconds()).slice(-2); // 두 자리로 맞추기

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



