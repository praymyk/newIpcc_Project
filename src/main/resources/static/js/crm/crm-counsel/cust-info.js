/*
* 고객 정보 - 고객정보 수정 페이지 스크립트
*/

// 카카오 주소 검색 API 스크립트 로드
function loadDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 도로명 주소와 지번 주소 중 하나를 선택하여 입력
            var address = data.roadAddress ? data.roadAddress : data.jibunAddress;

            // 주소 필드에 선택한 주소 입력
            $('#cust-road-adrs').val(address);
            // 상세 주소 필드에 포커스
            $('#cust-detail-adrs').focus();
        }
    }).open();
}

// 주소 검색 버튼 클릭 이벤트
$('#btn-address-search').on('click', function() {
    loadDaumPostcode(); // 주소 검색 창 열기
});


// 고객 정보 저장 버튼 클릭 이벤트
// 저장 버튼 클릭 이벤트
$('.edit-button').on('click', function (e) {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지

    // 폼 데이터 수집
    // session 값은 crm-main.js 에서 선언한 전역 변수로 사용
    var formData = {
        guestId: $('#gust-id').val(),
        custId: sessionCustId, // 세션에서 가져오는 업체코드 (로그인 사용자 정보에 따라 변경)
        agentId: sessionAgentId, // 세션에서 가져오는 상담원코드 (로그인 사용자 정보에 따라 변경)
        name: $('#cust-name').val(),
        phone: removeHyphenFromPhone($('#cust-phone').val()),
        birthDay: $('#cust-birth').val(),
        gender: $('#cust-gender').val(),
        email: $('#cust-email').val(),
        roadAddress: $('#cust-road-adrs').val(),
        detailAddress: $('#cust-detail-adrs').val(),
        grade: $('#cust-type').val(),
        enrollDate: $('#cust-enroll').val(),
        guestMemo: $('#cust-notes').val(),
        black: $('#cust-balck').val() || 'N', // 기본값 N

        guestType: $('#cust-type').val(), // 고객 등급은 고객 등급 테이블에서 별도 관리
        state: $('#cust-state').val() || 'Y' // 기본값 Y
    }

    // 비동기 요청 (AJAX) 전송
    $.ajax({
        url: '/Ipcc/crm/guest/saveGuestInfo',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData), // JSON 형식으로 전송
        success: function (response) {
            alert(response);
            fetchGuestList(searchKeyword, currentPage);
        },
        error: function (xhr, status, error) {
            console.error('저장 실패:', error);
            alert('고객 정보 저장에 실패했습니다.');
        }
    });
});

// 하이픈 제거 함수
function removeHyphenFromPhone(phone) {
    return phone.replace(/-/g, '');
}

/*
* 선택 상담원의 탭 메뉴 클릭 시 해당 내용을 불러오는 스크립트
*/
var categoryItems = document.querySelectorAll('.category-item');

// 각 category-item에 클릭 이벤트 리스너를 추가
categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        console.log("선택 고객 : " + guestId);
        // 선택된 고객이 없을 경우 고객 검색 안내
        if(guestId === '' || guestId === undefined) {
            alert('고객을 선택해주세요.');
            return;
        }

        // 모든 항목에서 active 클래스 제거
        categoryItems.forEach(el => el.classList.remove('active'));

        // 클릭된 항목에 active 클래스 추가
        this.classList.add('active');

        // 카테고리 식별자
        const category = this.getAttribute('data-category');
        const url = `/Ipcc/crm/crm-counsel/cust-info-${category}`;

        // 페이지 리로드 없이 HTML 조각을 불러와 특정 부분에 삽입
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById('cust-info-content').innerHTML = html;
                // 삽입된 HTML 내의 <script> 태그를 다시 실행
                executeScripts(document.getElementById('cust-info-content'));
            })
            .catch(error => console.log('Error:', error));
    });
});

// 삽입된 HTML 내의 <script> 태그를 찾아 실행하는 함수
function executeScripts(element) {
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
            // 외부 스크립트의 경우 src를 복사하여 다시 로드
            newScript.src = script.src;
        } else {
            // 인라인 스크립트의 경우 내용을 복사해서 실행
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript); // 스크립트를 다시 추가하여 실행
    });
}

