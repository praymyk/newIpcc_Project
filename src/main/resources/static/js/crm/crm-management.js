    // crm-management.js
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
    });

    /****************
     테이블 정렬 기능
        토클 css 애니메이션 추가 (db 조회는 각 설정 화면의 js에서 처리)
    ****************/
    document.querySelectorAll('th.sortable').forEach(header => {
        header.addEventListener('click', () => {

            // 클릭된 헤더의 기존 상태 확인 (desc가 있으면 내림차순 상태)
            const isDescending = header.classList.contains('desc');
            const isAscending = header.classList.contains('asc');
            // 모든 헤더에서 'desc' 및 'asc' 클래스 제거
            document.querySelectorAll('th.sortable').forEach(th => {
                th.classList.remove('desc', 'asc');
            });

            // 상태에 따라 desc 또는 asc 클래스를 토글
            if (isDescending) {
                header.classList.remove('desc');
                header.classList.add('asc');  // 내림차순에서 오름차순으로 변경
            } else if (isAscending) {
                header.classList.remove('asc');
                header.classList.add('desc'); // 오름차순에서 내림차순으로 변경
            } else {
                header.classList.add('desc'); // 기본적으로 내림차순으로 시작
            }
        });
    });



    /************
     서브 메뉴 클릭 이벤트
         **************/
    $(document).on('click', '.sub-content-link', function(event){
        event.preventDefault(); // 링크 기본 동작 방지

        var contentId = $(this).data('content-id');
        console.log("contentId:", contentId);

        // 선택한 메뉴에 active class 부여 (스타일 적용 및 선택 메뉴 구분)
        if ($(this).hasClass('sub-active')) {
            // 이미 선택된 메뉴라면 추가 작업을 하지 않음
            console.log("Same menu clicked, no action taken.");
            return; // 클릭 이벤트 종료
        }
        // 메뉴가 변경된 경우, 모든 메뉴에서 'active' 클래스를 제거하고 현재 메뉴에 추가
        $('.sub-content-link').removeClass('sub-active');
        $(this).addClass('sub-active');

        $.ajax({
            url: 'loadSubContent',
            method: 'GET',
            data: {
                contentId: contentId
            },
            success: function(data) {
                // 기존의 content 부분을 가져온 데이터로 교체
                $('.management-content').replaceWith(data);
            },
            error: function(xhr, status, error) {
                console.error("Error loading content:", error);
            }
        });
    });




