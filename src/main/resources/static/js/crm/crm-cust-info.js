
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