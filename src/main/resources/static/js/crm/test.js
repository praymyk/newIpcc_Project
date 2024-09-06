// 전역 변수로 도넛 차트를 선언 (이미 선언된 경우 중복 선언하지 않음)
if (typeof myDonutChart2 === 'undefined') {
    var myDonutChart2; // let 대신 var를 사용하여 조건부로 선언 가능
}

// 도넛 차트 생성 함수
function initDonutChart_2(labels = [], dataValues = [], backgroundColors = []) {
    const ctx2 = document.getElementById('myDonutChart-2').getContext('2d');

    // 차트를 초기화하거나 업데이트
    myDonutChart_2 = new Chart(ctx2, {
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
function DonutChart_1_update() {
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

// 페이지 로드 시 차트 데이터를 더미로 가져와서 차트 그리기
$(document).ready(function() {
    DonutChart_1_update(); // ajax 완료 후에는 ajax로 대체
});