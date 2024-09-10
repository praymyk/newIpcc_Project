$(document).ready(function() {
    /************
    * 통계 메뉴 토글 기능
    **************/
    // sts-toggle-btn 클릭 시 sts-hidden 클래스 부여
    $('#sts-toggle-btn').on('click', function() {
        $('.sub-menu').addClass('sts-hidden'); // .sub-menu에 sts-hidden 클래스 추가
        $('#sts-toggle-btn-hidden').removeClass('sts-hidden'); // 버튼 보이도록 sts-hidden 제거
    });

    // sts-toggle-btn-hidden 클릭 시 sts-hidden 클래스 제거
    $('#sts-toggle-btn-hidden').on('click', function() {
        $('.sub-menu').removeClass('sts-hidden'); // .sub-menu에서 sts-hidden 클래스 제거
        $('#sts-toggle-btn-hidden').addClass('sts-hidden'); // 버튼 숨기도록 sts-hidden 추가
        console.log("눌림");
    });

});


