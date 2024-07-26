// 상세 보기 메뉴 토글 스크립트 ( 클릭 시 감추기 기능 + 축소 아이콘 화살표 방향 변경)
var toggleIconBtn = document.getElementsByClassName('toggleIconBtn');
var sidebarR = document.getElementsByClassName('sidebar-r');
var detailbarA = document.getElementsByClassName('detailbar-wrapper-a');
var detailbarB = document.getElementsByClassName('detailbar-wrapper-b');

for(var i = 0; i<toggleIconBtn.length; i++){
    toggleIconBtn[i].addEventListener('click',function(){
        sidebarR[0].classList.toggle('hidden');
        detailbarA[0].classList.toggle('hidden');
        detailbarB[0].classList.toggle('hidden');
    });
}
