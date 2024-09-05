/****************

 실시간 현황 부분 스크립트

****************/

// Chart.js 설정 및 초기화
const ctx = document.getElementById('myDonutChart').getContext('2d');

// 여기에 값 불러 오기
const dataValues = [10, 10, 10]; // 각 영역의 초기 값
const labels = ['연결 대기 고객', '상담 가능(대기)', '상담 중']; // 라벨 이름
const backgroundColors = ['#A3E3D8', '#FFE8AE', '#CBC4F2']; // 각 라벨의 색상

const myDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: '#F9F9F9', // 도넛 사이의 경계선 색상 (배경색과 동일하게 설정)
            borderWidth: 4, // 경계선 너비
            borderRadius: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%',
        plugins: {
            legend: {
                display: false // 기본 범례 숨김
            },
            tooltip: {
                enabled: true,
            }
        }
    }
});

// 실시간 현황 차트 라벨 업데이트 함수
function updateLabels(chart) {
    const data = chart.data.datasets[0].data;

    document.getElementById('waiting').textContent = `${data[0]}`;  // 연결 대기 고객
    document.getElementById('ready').textContent = `${data[1]}`;    // 상담 가능(대기)
    document.getElementById('busy').textContent = `${data[2]}`;     // 상담 중
    // 포기 호는 추가해야함
}

// 통화 상태 차트 사용자 정의 범례 생성
function generateCustomLegend(chart) {
    const legendContainer = document.getElementById('legend');
    legendContainer.innerHTML = ''; // 기존 범례 제거

    const labels = chart.data.labels;
    const colors = chart.data.datasets[0].backgroundColor;
    const data = chart.data.datasets[0].data; // 데이터 값을 가져옴

    labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const colorBox = document.createElement('div');
        colorBox.classList.add('legend-color-box');
        colorBox.style.backgroundColor = colors[index];

        const labelText = document.createElement('span');
        labelText.classList.add('legend-label');
        labelText.textContent = `${label}: ${data[index]}`;  // 라벨과 데이터 값 함께 표시

        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);
        legendContainer.appendChild(legendItem);

        console.log("작동함?");
    });
}

// 통화 상태 차트 초기 라벨 설정
updateLabels(myDonutChart);

// 통화 상태 차트 사용자 정의 범례 생성
generateCustomLegend(myDonutChart);


// 차트 데이터를 주기적으로 업데이트하는 함수 (더미용 삭제 필요)
function updateChartData() {
    // 실제로는 서버에서 데이터를 가져와야 하지만, 여기서는 예시로 랜덤 데이터 사용
    const newData = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
    ];

    // 차트 데이터 업데이트
    myDonutChart.data.datasets[0].data = newData;
    myDonutChart.update();

    // 업데이트된 데이터를 기반으로 라벨 갱신
    updateLabels(myDonutChart);

    // 범례를 새로 고침
    generateCustomLegend(myDonutChart);
}

// 5초마다 데이터 갱신
setInterval(updateChartData, 5000);



// 테이블 정렬 기능
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

/**********************

전화상담 현황 스크립트

***********************/

/*
* 막대 그래프 부분
*/
const bctx = document.getElementById('myBarChart').getContext('2d');
const data = {
    labels: ['0시', '2시', '4시', '6시', '8시', '10시', '12시', '14시', '16시', '18시', '20시', '22시'],
    datasets: [
        {
            type: 'bar', // 막대형 그래프 데이터셋
            label: '총 유입수',
            data: [12, 19, 3, 5, 2, 3, 9, 14, 7, 11, 10, 6],  // 추후 데이터를 data: [] 로 초기화 하여 값을 대입하기
            backgroundColor: 'rgba(0, 122, 255, 0.8)',
            borderColor: 'rgba(0, 122, 255, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 12,
            borderSkipped: false,
        },
        {
            type: 'bar',
            label: '전화 연결 건수',
            data: [10, 15, 2, 4, 1, 2, 7, 12, 5, 9, 8, 5],
            backgroundColor: 'rgba(255, 205, 86, 0.8)',
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 12,
            borderSkipped: false,
        },
        {
            type: 'bar',
            label: '전화 연결 실패 건수',
            data: [2, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1],
            backgroundColor: 'rgba(242, 140, 140, 0.8)',
            borderColor: 'rgba(203, 196, 242, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 12,
            borderSkipped: false,
        },
        {
            type: 'bar',
            label: 'ARS 처리 건수',
            data: [5, 9, 1, 2, 1, 1, 5, 7, 4, 6, 5, 3],
            backgroundColor: 'rgba(163, 227, 216, 0.8)',
            borderColor: 'rgba(163, 227, 216, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 12,
            borderSkipped: false,
        },
        {
            type: 'line', // 막대형 그래프를 선으로 연결하는 데이터셋
            label: '연결선',
            data: [12, 19, 3, 5, 2, 3, 9, 14, 7, 11, 10, 6],
            borderColor: 'rgba(100, 100, 100, 0.3)',
            borderWidth: 1.5,
            fill: false,
            tension: 0.3, // 선의 곡률 설정 (0: 직선, 0.4: 곡선)
        }
    ]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 5,
            },
            grid: {
                color: '#E5E5EA',
                borderDash: [4, 4], // 점선으로 표시된 격자선
            }
        }
    },
    plugins: {
        legend: {
            display: false // 기본 범례 숨김
        },
        tooltip: {
            enabled: true,
            backgroundColor: '#FFFFFF',
            titleColor: '#1C1C1E',
            bodyColor: '#1C1C1E',
            borderColor: '#E5E5EA',
            borderWidth: 1,
            titleFont: {
                weight: 'bold',
            },
            padding: 10,
            cornerRadius: 6,
        }
    }
};

const myBarChart = new Chart(bctx, {
    data: data,
    options: options,
});


// 차트에 값 넣을떄 사용할 함 수 예시 > 배열 형태로 받아와서 관리 쉽도록
/*
function fetchDataAndUpdateChart() {
    fetch('/api/getChartData')  // 여기에 실제 API 엔드포인트를 입력
        .then(response => response.json())
        .then(data => {
            // 가져온 데이터를 차트에 업데이트
            myBarChart.data.labels = data.labels;
            myBarChart.data.datasets[0].data = data.totalInflow;
            myBarChart.data.datasets[1].data = data.callConnected;
            myBarChart.data.datasets[2].data = data.callFailed;
            myBarChart.data.datasets[3].data = data.arsProcessed;
            myBarChart.data.datasets[4].data = data.totalInflow; // 연결선 데이터는 총 유입수와 동일
            myBarChart.update(); // 차트를 업데이트
        })
        .catch(error => console.error('Error fetching data:', error));
}
*/

// 페이지 로드 시 데이터 가져오기
// document.addEventListener('DOMContentLoaded', fetchDataAndUpdateChart);


/*
* 우측 도넛 그래프 부분 (우측 응대율 그래프)
*/
// Chart.js 설정 및 초기화
const ctx2 = document.getElementById('myDonutChart-2').getContext('2d');

// 여기에 값 불러 오기
const dataValues2 = [10, 10]; // 각 영역의 초기 값
const labels2 = ['통화 성공', '포기 호']; // 라벨 이름
const backgroundColors2 = ['#A3E3D8', '#FFE8AE']; // 각 라벨의 색상

const myDonutChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: labels2,
        datasets: [{
            data: dataValues2,
            backgroundColor: backgroundColors2,
            borderColor: '#F9F9F9', // 도넛 사이의 경계선 색상 (배경색과 동일하게 설정)
            borderWidth: 4, // 경계선 너비
            borderRadius: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%',
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        },
        plugins: {
            legend: {
                display: false, // Chart.js 범례는 숨김
            },
            tooltip: {
                enabled: true,
            }
        }
    }
});


/********************

ARS 인입 현황

**********************/

let myDonutChart3;

// 흘니 스타일 색상 팔레트 (파스텔톤)
const hulniStyleColors = [
    '#FFB3BA', // 밝은 핑크
    '#FFDFBA', // 피치
    '#FFFFBA', // 연노랑
    '#BAFFC9', // 연그린
    '#BAE1FF', // 연블루
    '#F5C7F7', // 라이트 퍼플
    '#C3FBD8', // 민트
    '#FFD6E0', // 연한 장미색
    '#D4E157', // 라임
    '#FFECB3'  // 연크림
];

// 차트를 초기화하는 함수
function initDonutChart(labels = [], dataValues = []) {
    const ctx3 = document.getElementById('arsDonutChart').getContext('2d');

    // 라벨 개수에 맞게 색상 순차적으로 선택
    const backgroundColors3 = labels.map((_, index) => hulniStyleColors[index % hulniStyleColors.length]);

    myDonutChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: labels, // 동적으로 채워질 라벨
            datasets: [{
                data: dataValues, // 동적으로 채워질 데이터
                backgroundColor: backgroundColors3, // 미리 정의된 흘니 스타일 색상
                borderColor: '#F9F9F9', // 도넛 사이 경계선
                borderWidth: 4, // 경계선 너비
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    display: false // 기본 범례 숨김
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

// 사용자 정의 범례 생성 함수
function generateCustomLegend(chart3) {
    const legendContainer = document.getElementById('arsLegend');
    legendContainer.innerHTML = ''; // 기존 범례 제거

    const labels = chart3.data.labels;
    const colors = chart3.data.datasets[0].backgroundColor;
    const data = chart3.data.datasets[0].data; // 데이터 값을 가져옴

    labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('arsLegend-item');

        const colorBox = document.createElement('div');
        colorBox.classList.add('arsLegend-color-box');
        colorBox.style.backgroundColor = colors[index];

        const labelText = document.createElement('span');
        labelText.classList.add('arsLegend-label');
        labelText.textContent = `${label}: ${data[index]}`;  // 라벨과 데이터 값 함께 표시

        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);
        legendContainer.appendChild(legendItem);
    });
}

// 차트 데이터를 가져오고 차트 업데이트 (Ajax로 값 받아올 예정)
function fetchChartData() {
    $.ajax({
        url: '/api/getChartData', // 서버로부터 차트 데이터를 가져오는 API 엔드포인트
        method: 'GET',
        success: function(response) {
            // 서버 응답 형식:
            // response = {
            //     labels: ["네이버", "카카오", "내부랜딩", "버스광고", "전광판", "틱톡"],
            //     dataValues: [10, 20, 30, 40, 50, 60]
            // }

            const labels3 = response.labels; // 서버로부터 받은 라벨 배열
            const dataValues = response.dataValues; // 서버로부터 받은 데이터 배열

            // 차트 초기화 또는 업데이트
            if (myDonutChart3) {
                // 차트가 이미 있을 경우 데이터 업데이트
                myDonutChart3.data.labels = labels;
                myDonutChart3.data.datasets[0].data = dataValues;
                myDonutChart3.data.datasets[0].backgroundColor = labels.map((_, index) => hulniStyleColors[index % hulniStyleColors.length]);
                myDonutChart3.update(); // 차트 갱신
            } else {
                // 차트가 없을 경우 초기화
                initDonutChart(labels3, dataValues);
            }

            // 사용자 정의 범례 생성
            generateCustomLegend(myDonutChart3);
        },
        error: function(error) {
            console.error('Error fetching chart data:', error); // 에러 발생 시 콘솔에 로그
        }
    });
}


// ajax 완성 전 더미 데이터! (ajax 완성 시 삭제 할 것)
function dummy(){
    const dummyData = {
        labels: ["네이버", "카카오", "내부랜딩", "버스광고", "전광판", "틱톡"],
        dataValues: [10, 20, 30, 40, 50, 60]
    };

    const labels3 = dummyData.labels;
    const dataValues3 = dummyData.dataValues;

    if (myDonutChart3) {
        myDonutChart3.data.labels = labels3;
        myDonutChart3.data.datasets[0].data = dataValues;
        myDonutChart3.data.datasets[0].backgroundColor = labels.map((_, index) => hulniStyleColors[index % hulniStyleColors.length]);
        myDonutChart3.update(); // 차트 갱신
    } else {
        initDonutChart(labels3, dataValues3);
    }

    generateCustomLegend(myDonutChart3); // 범례 생성
}

// 페이지 로드 시 차트 데이터를 가져와서 차트 그리기
$(document).ready(function() {
    dummy();
    //fetchChartData(); // Ajax 요청으로 데이터를 받아 차트를 생성
});