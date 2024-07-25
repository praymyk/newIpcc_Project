$(document).ready(function(){
    $(".hide-footer").click(function(){
        $(".footer-content").slideToggle(); // footer-content의 슬라이드 토글
        $(this).toggleClass("fa-angle-down fa-angle-up"); // 아이콘 변경
    });
});