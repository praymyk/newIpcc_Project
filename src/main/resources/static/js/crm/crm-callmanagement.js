/****************

 실시간 현황 부분 스크립트

****************/
// 상담관리 페이지 내 차트를 담을 전역 변수 선언 및 초기화
var myDonutChart = undefined;
var myBarChart = undefined;
var myDonutChart2 = undefined;
var myDonutChart3 = undefined;


// 흘니 스타일 색상 팔레트 (파스텔톤)
if (typeof hulniStyleColors === 'undefined') {
    var hulniStyleColors = [
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
}
// 페이지 로드 시 차트 데이터를 더미로 가져와서 차트 그리기
$(document).ready(function() {
    donutChart_1_update();
    barChart_Update();
    donutChart_2_update();
    donutChart_3_update();
    setIntervals();
});

function setIntervals() {
    setInterval(function() {
        donutChart_1_update();
    console.log("실시간 현황 차트 업데이트");
    }, 5000);
}

/****************
 실시간 현황 도넛 차트 부분
 *****************/
function initDonutChart_1(labels = [], dataValues = [], backgroundColors = []) {
    const ctx = document.getElementById('myDonutChart').getContext('2d');

    // 차트를 초기화하거나 업데이트
    myDonutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: '#F9F9F9', // 도넛 경계선 색상
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
                    display: false // 범례 숨김
                },
                tooltip: {
                    enabled: true, // 툴팁 활성화
                }
            }
        }
    });

    // 범례는 차트를 처음 생성할 때만 한 번 실행
    generateMyDonutLegend(window.myDonutChart);
}

// 도넛 차트 범례 생성 함수
function generateMyDonutLegend(chart) {
    const legendContainer = document.getElementById('legend');
    legendContainer.innerHTML = ''; // 기존 범례 제거

    const labels = chart.data.labels;
    const colors = chart.data.datasets[0].backgroundColor;
    const data = chart.data.datasets[0].data;

    labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const colorBox = document.createElement('div');
        colorBox.classList.add('legend-color-box');
        colorBox.style.backgroundColor = colors[index];

        const labelText = document.createElement('span');
        labelText.classList.add('legend-label');
        labelText.textContent = `${label}: ${data[index]}`;

        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);
        legendContainer.appendChild(legendItem);
    });
}

/********
 실시간 현황 차트 데이터 입력 부분
 *******/
function donutChart_1_update() {
    const dummyData = {

        //더미 데이터로 차트 생성 (Ajax 전 테스트용)
        labels: ['연결 대기 고객', '상담 가능(대기)', '상담 중'],
        dataValues: [10, 10, 10],
        backgroundColors: ['#A3E3D8', '#FFE8AE', '#CBC4F2']
    };

    const labels = dummyData.labels;
    const dataValues = dummyData.dataValues;
    const backgroundColors = dummyData.backgroundColors;

    if (myDonutChart) {
        // 차트가 존재하면 데이터를 업데이트
        myDonutChart.data.labels = labels;
        myDonutChart.data.datasets[0].data = dataValues;
        myDonutChart.data.datasets[0].backgroundColor = backgroundColors;
        myDonutChart.update(); // 차트 갱신
        updateLabels(myDonutChart); // 라벨 업데이트
    } else {
        // 차트가 존재하지 않으면 새로 생성
        initDonutChart_1(labels, dataValues, backgroundColors);
        updateLabels(myDonutChart); // 라벨 업데이트
    }
}

// 커스템 라벨 업데이트 함수
function updateLabels(chart) {
    const data = chart.data.datasets[0].data;

    document.getElementById('waiting').textContent = `${data[0]}`;
    document.getElementById('ready').textContent = `${data[1]}`;
    document.getElementById('busy').textContent = `${data[2]}`;
}


/**********************

전화상담 현황 스크립트

***********************/

/****************
 전화상담 현황 막대 그래프 부분
 *****************/

// 바 차트 생성 함수
function initBarChart(labels = [], datasets = []) {
    const bctx = document.getElementById('myBarChart').getContext('2d');

    // 차트를 초기화
    myBarChart = new Chart(bctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    },
                    grid: {
                        color: '#E5E5EA',
                        borderDash: [4, 4]
                    }
                }
            },
            plugins: {
                legend: {
                    display: true // 범례 표시
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#FFFFFF',
                    titleColor: '#1C1C1E',
                    bodyColor: '#1C1C1E',
                    borderColor: '#E5E5EA',
                    borderWidth: 1,
                    titleFont: {
                        weight: 'bold'
                    },
                    padding: 10,
                    cornerRadius: 6
                }
            }
        }
    });
}

/*************
 막대형 그래프 업데이트 함수 데입터 입력 부분
 *************/
function barChart_Update() {
    const dummyData = {
        labels: ['0시', '2시', '4시', '6시', '8시', '10시', '12시', '14시', '16시', '18시', '20시', '22시'],
        datasets: [
            {
                type: 'bar', // 막대형 그래프 데이터셋
                label: '총 유입수',
                data: [12, 19, 3, 5, 2, 3, 9, 14, 7, 11, 10, 6], // 더미 데이터 1
                backgroundColor: 'rgba(0, 122, 255, 0.8)',
                borderColor: 'rgba(0, 122, 255, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 12,
                borderSkipped: false
            },
            {
                type: 'bar',
                label: '전화 연결 건수',
                data: [10, 15, 2, 4, 1, 2, 7, 12, 5, 9, 8, 5], // 더미 데이터 2
                backgroundColor: 'rgba(255, 205, 86, 0.8)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 12,
                borderSkipped: false
            },
            {
                type: 'bar',
                label: 'ARS 처리 건수',
                data: [5, 9, 1, 2, 1, 1, 5, 7, 4, 6, 5, 3], // 더미 데이터 3
                backgroundColor: 'rgba(163, 227, 216, 0.8)',
                borderColor: 'rgba(163, 227, 216, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 12,
                borderSkipped: false
            },
            {
                type: 'line', // 막대형 그래프를 선으로 연결하는 데이터셋
                label: '연결선',
                data: [12, 19, 3, 5, 2, 3, 9, 14, 7, 11, 10, 6], // 선형 데이터
                borderColor: 'rgba(100, 100, 100, 0.5)',
                borderWidth: 1.5,
                fill: false,
                tension: 0.3, // 선의 곡률 설정 (0: 직선, 0.4: 곡선)
            }
        ]
    };

    const labels = dummyData.labels;
    const datasets = dummyData.datasets;

    if (myBarChart) {
        // 차트가 이미 있을 경우 데이터를 업데이트
        myBarChart.data.labels = labels;
        myBarChart.data.datasets = datasets;
        myBarChart.update(); // 차트 갱신
    } else {
        // 차트가 없을 경우 새로 생성
        initBarChart(labels, datasets);
    }
}

/****************
전화상담 현황 도넛 그래프 부분
*****************/
// 전역 변수로 도넛 차트를 선언 (이미 선언된 경우 중복 선언하지 않음)
if (typeof myDonutChart2 === 'undefined') {
    var myDonutChart2; // let 대신 var를 사용하여 조건부로 선언 가능
}

//전화상담 현황 (통화성공/포기호) 도넛 차트 생성 함수
function initDonutChart_2(labels = [], dataValues = [], backgroundColors = []) {
    const ctx2 = document.getElementById('myDonutChart-2').getContext('2d');

    // 차트를 초기화하거나 업데이트
    myDonutChart_2 = new Chart(ctx2, {
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
}

/********
 실시간 현황 차트 데이터 입력 부분
 *******/
//전화상담 현황 (통화성공/포기호) 도넛 차트 생성 함수
function donutChart_2_update() {
    const dummyData = {

        //더미 데이터로 차트 생성 (Ajax 전 테스트용)
        labels: ['통화 성공', '포기 호'],
        dataValues: [10, 10],
        backgroundColors: ['#A3E3D8', '#FFE8AE']
    };

    const labels = dummyData.labels;
    const dataValues = dummyData.dataValues;
    const backgroundColors = dummyData.backgroundColors;

    if (myDonutChart2) {
        // 차트가 존재하면 데이터를 업데이트
        myDonutChart2.data.labels = labels;
        myDonutChart2.data.datasets[0].data = dataValues;
        myDonutChart.data.datasets[0].backgroundColor = backgroundColors;
        myDonutChart2.update(); // 차트 갱신

    } else {
        // 차트가 존재하지 않으면 새로 생성
        initDonutChart_2(labels, dataValues, backgroundColors);
    }
}

/********************

ARS 인입 현황

**********************/
// 차트를 초기화하는 함수
function initDonutChart_3(labels = [], dataValues = []) {
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
function generateMyDonutLegend_3(chart) {
    const legendContainer = document.getElementById('arsLegend');
    legendContainer.innerHTML = ''; // 기존 범례 제거

    const labels = chart.data.labels;
    const colors = chart.data.datasets[0].backgroundColor;
    const data = chart.data.datasets[0].data; // 데이터 값을 가져옴

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

/********
 ARS 인입 현황 차트 데이터 입력 부분
*******/
function donutChart_3_update(){
    const dummyData = {
        labels: ["네이버", "카카오", "내부랜딩", "버스광고", "전광판", "틱톡2"],
        dataValues: [20, 20, 30, 40, 50, 60]
    };

    const labels = dummyData.labels;
    const dataValues = dummyData.dataValues;

    if (myDonutChart3) {
        // 이미 존재하는 차트가 있다면 데이터를 업데이트
        myDonutChart3.data.labels = labels;
        myDonutChart3.data.datasets[0].data = dataValues; // dataValues3으로 수정
        myDonutChart3.data.datasets[0].backgroundColor = labels.map((_, index) => hulniStyleColors[index % hulniStyleColors.length]);
        myDonutChart3.update(); // 차트 갱신
    } else {
        // 차트가 존재하지 않으면 새로 생성
        initDonutChart_3(labels, dataValues);
    }
    // 범례 업데이트
    generateMyDonutLegend_3(myDonutChart3); // 범례 업데이트 함수 호출
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