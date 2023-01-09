import Chart from 'chart.js/auto';
import { animation } from './animation';

// Create a new bar chart.
export function bar_chart_init(canvas, data) {
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data,
            datasets: [{
                label: 'array',
                data: data,
                borderWidth: 0,
                categoryPercentage: 1.0,
                barPercentage: 1.0
            }]
        },
        options: {
            animation: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

// Update the chart with new data.
export function update_chart(chart) {
    chart.data.labels = animation.array;
    chart.data.datasets[0].data = animation.array;
    chart.data.datasets[0].backgroundColor = animation.default_color;
    chart.update();
}

export function update_chart_color(chart, swap = -1) {
    chart.data.labels = animation.array;
    chart.data.datasets[0].data = animation.array;

    const colors = new Array(animation.array_size).fill(animation.default_color);
    colors[animation.state] = animation.index_color;
    
    if (swap != -1)
        colors[swap] = animation.swap_color;

    chart.data.datasets[0].backgroundColor = colors;
    
    chart.update();
}
