    // 상세 보기 메뉴 토글 스크립트 ( 클릭 시 감추기 기능 + 축소 아이콘 화살표 방향 변경)
    document.getElementById('toggleIcon').addEventListener('click', function() {
        var detailbar = document.getElementById('detailbarWrapper');
        var sidebar_r = document.getElementsByClassName('sidebar-r')[0];
        var arrowicon = document.getElementById('toggleIcon');
        detailbar.classList.toggle('hidden');
        sidebar_r.classList.toggle('hidden');
        arrowicon.classList.toggle('fa-arrow-left');
        arrowicon.classList.toggle('fa-arrow-right');
    });