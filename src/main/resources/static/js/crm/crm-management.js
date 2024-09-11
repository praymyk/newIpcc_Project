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


    /****************
     테이블 정렬 기능 ( sort 기능은 DB 조회시 쿼리문으로 해결해야 해서 삭제 해야 할 수 잇음 )
    클래스 토글만 남겨서 아이콘 전환만 유지할 것.
    ****************/
    document.querySelectorAll('th.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const index = Array.prototype.indexOf.call(header.parentNode.children, header);
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const isDescending = header.classList.contains('desc');

            // 다른 열의 정렬 상태 초기화
            table.querySelectorAll('th.sortable').forEach(th => th.classList.remove('desc'));

            // 행 정렬
            rows.sort((rowA, rowB) => {
                const cellA = rowA.children[index].innerText;
                const cellB = rowB.children[index].innerText;

                // 숫자 열의 경우 숫자로 변환
                const a = isNaN(cellA) ? cellA : parseFloat(cellA);
                const b = isNaN(cellB) ? cellB : parseFloat(cellB);

                if (a < b) return isDescending ? 1 : -1;
                if (a > b) return isDescending ? -1 : 1;
                return 0;
            });

            // 정렬된 행 추가
            rows.forEach(row => tbody.appendChild(row));

            // 정렬 상태 업데이트
            header.classList.toggle('desc', !isDescending);
        });
    });


    /************
     서브 메뉴 클릭 이벤트
         **************/

    $(document).on('click', '.sub-content-link', function(event){
        event.preventDefault(); // 링크 기본 동작 방지

        var contentId = $(this).data('content-id');

        // 선택한 메뉴에 active class 부여 (스타일 적용 및 선택 메뉴 구분)
        if ($(this).hasClass('active')) {
            // 이미 선택된 메뉴라면 추가 작업을 하지 않음
            console.log("Same menu clicked, no action taken.");
        }
        // 메뉴가 변경된 경우, 모든 메뉴에서 'active' 클래스를 제거하고 현재 메뉴에 추가
        $('.content-link').removeClass('active');
        $(this).addClass('active');

        $.ajax({
            url: 'loadSubContent',
            method: 'GET',
            data: {
                contentId: contentId
            },
            success: function(data) {
                // 기존의 content 부분을 가져온 데이터로 교체
               $('.management-content').html(data);
                console.log("Content loaded successfully:", data);
                // HTML이 DOM에 완전히 반영된 후 스크립트와 스타일을 로드
                // loadContentScriptsAndStyles(contentId);
            },
            error: function(xhr, status, error) {
                console.error("Error loading content:", error);
            }
        });
    });

});


