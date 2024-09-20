var myStatisticsChart = undefined;

// 색상 팔레트 배열 정의
if (typeof stsColorPalette === 'undefined') {
    var stsColorPalette = [
        { background: 'rgba(0, 122, 255, 0.05)', border: 'rgba(0, 122, 255, 0.8)' },
        { background: 'rgba(255, 205, 86, 0.05)', border: 'rgba(255, 205, 86, 0.8)' },
        { background: 'rgba(242, 140, 140, 0.05)', border: 'rgba(242, 140, 140, 0.8)' },
        { background: 'rgba(163, 227, 216, 0.05)', border: 'rgba(163, 227, 216, 0.8)' }
    ];
}

// 동적 데이터셋에 맞춰 색상 배열을 처리하는 함수 > 색상 팔레트를 넘어가면 순환해서 색상을 사용
function getBackgroundColors(dataValues) {
    return dataValues.map((dataSet, index) => {
        // 색상 팔레트의 길이를 넘어가면 순환해서 색상을 사용
        return stsColorPalette[index % stsColorPalette.length];
    });
}

/****************
    차트 데이터는 updateStatistics 함수를 호출하여 업데이트 > 차트와 테이블 동시에 업데이트
    추후 ajax 연동 해서 labels와 data 값 받아서 넣어야 함
    const dummyData 형태면 됨
****************/
$(document).ready(function() {
    const dummyData = {
        labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // x축 시간 데이터
        datasets: [
            { label: '알림톡', data: [50, 60, 70, 80, 90, 90, 90, 90 ] },
            { label: '문자', data: [30, 20, 25, 35, 40, 90, 90, 90] },
            { label: '통화성공', data: [40, 35, 45, 50, 60, 90, 90, 90] },
            { label: '통화실패', data: [10, 15, 5, 10, 8, 90, 90, 90] },
        ]
    };
    updateStatistics(dummyData); // 더미 데이터를 넘겨 차트와 테이블을 동시에 업데이트

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


// 차트를 초기화하는 함수
function initStatisticsChart(labels = [], dataValues = [], backgroundColors = []) {
    var ctx = document.getElementById('statisticsChart').getContext('2d');

    // 기존 차트가 있으면 삭제
    if (myStatisticsChart) {
        myStatisticsChart.destroy();
    }

    // 차트 생성
    myStatisticsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // x축 라벨
            datasets: dataValues.map((dataSet, index) => ({
                label: dataSet.label, // 데이터셋 이름
                data: dataSet.data,   // 데이터셋 값
                backgroundColor: backgroundColors[index].background,
                borderColor: backgroundColors[index].border,
                borderWidth: 2,
                tension: 0.4,
                fill: true // 배경색 사용 유무
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',// 범례를 차트 아래로 배치
                    labels: {
                        usePointStyle: true, // 범례 아이콘을 동그라미로 변경
                        padding: 20
                    }
                }
            }
        }
    });
}

// 테이블 초기화 함수
function initStatisticsTable(data) {
    const tableBody = document.getElementById('statisticsTableBody');
    tableBody.innerHTML = ''; // 기존 테이블 내용 삭제

    // 각 시간대별로 데이터를 테이블에 추가
    data.labels.forEach((label, index) => {
        const row = document.createElement('tr');

        // 시간 셀 추가
        const timeCell = document.createElement('td');
        timeCell.textContent = label;
        row.appendChild(timeCell);

        // 데이터 셀 추가
        data.datasets.forEach((dataset) => {
            const cell = document.createElement('td');
            cell.textContent = dataset.data[index];
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// 차트와 테이블을 동시에 업데이트하는 함수
function updateStatistics(data) {
    // 동적으로 색상을 가져오기
    const backgroundColors = getBackgroundColors(data.datasets);

    initStatisticsChart(data.labels, data.datasets, backgroundColors); // 차트 업데이트
    initStatisticsTable(data); // 테이블 업데이트
}


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