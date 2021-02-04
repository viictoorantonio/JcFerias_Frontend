import { Line } from 'react-chartjs-2'

const dataSets = [
{
    type: 'line',
    label: 'Previsto de vendas',
    backgroundColor: '#004c8b',
    borderColor: '#004c8b',
    borderWidth: 2,
    fill: false,
    data: [10, 20, 100, 40, 50, 30]
}, {
    type: 'bar',
    label: 'Vendas',
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    borderWidth: 2,
    data: [50, 300, 80, 80, 10, 100]
}, {
    type: 'bar',
    label: 'Cancelamentos',
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    borderWidth: 2,
    data: [30, 100, 300, 200, 100, 200]
}]

const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],

    datasets: dataSets
}

const options = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            time: {
                unit: 'date'
            },
            gridLines: {
                display: false,
                drawBorder: false
            },
            ticks: {
                maxTicksLimit: 3
            }
        }],
        yAxes: [{
            ticks: {
                maxTicksLimit: 3,
                padding: 2,
                callback: (value) => {
                    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
            },
            gridLines: {
                display: true
            },
        }],
    },
    legend: {
        display: true,
        position: 'bottom'
    },
    tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 10,
        yPadding: 10,
        displayColors: true,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
            label: (tooltipItem, chart) => {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + tooltipItem.yLabel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        }
    }
}

function ChartBarsLine(props) {
    return (
        <Line className="heightChart" data={data} options={options} />
    )
}

export default ChartBarsLine