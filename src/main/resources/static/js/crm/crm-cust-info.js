
// 선택한 카테고리가 active 상태가 되도록 하는 스크립트
const categoryItems = document.querySelectorAll('.category-item');

categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        // 모든 항목에서 active 클래스 제거
        categoryItems.forEach(el => el.classList.remove('active'));
        // 클릭된 항목에 active 클래스 추가
        this.classList.add('active');
        console.log("잘되나?");
    });
});


// 전화가 인입됐을 때 인입 연락처를 기준으로 고객 정보를 조회하는 스크립트
function selectGuestByPhone(cid) {

    // 전화번호를 기준으로 고객 정보를 조회
    $.ajax({
        url: '/Ipcc/crm/guest/getGuestInfo/',
        type: 'post',
        data: {
            cid: cid
        },
        success: function(data) {
            console.log(data);
            // 고객 정보를 화면에 표시

        },
        error: function() {
            console.log("고객 정보 조회 실패");
        }
    });
}

// 고객 검사 버튼 클릭 시 고객 리스트 조회
$('#btn-guest-search').on('click', function() {
    var searchKeyword = $('#input-guest-search').val();

    console.log("고객사 ID" + sessionCustId);
    console.log("고객 검색어 : " +  keyword);

    $.ajax({
        url: '/Ipcc/crm/guest/getGuestList',
        type: 'post',
        data: {
            custId: sessionCustId,
            searchKeyword: searchKeyword
        },
        success: function(data) {
            console.log(data);
            // 고객 리스트를 #guest-info-list에 tr 추가
            $('#guest-info-list').empty();

            data.forEach(function(item) {

                var row = $('<tr></tr>');

                row.append('<td>' + guest.no + '</td>');
                row.append('<td>' + guest.name + '</td>');
                row.append('<td>' + guest.phone + '</td>');
                row.append('<td>' + guest.recentConsultDate + '</td>');

                // #guest-info-list에 추가
                $('#guest-info-list').append(row);
            });


        },
        error: function() {
            console.log("고객 정보 조회 실패");
        }
    });
});

