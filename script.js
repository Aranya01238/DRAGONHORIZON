// Initialize the charts
const humanCountCtx = document.getElementById('humanCountChart').getContext('2d');
const upthrustCtx = document.getElementById('upthrustChart').getContext('2d');
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');

// Configuration for the charts
const commonConfig = {
    type: 'line',
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            x: {
                type: 'linear',
                display: true,
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                display: true,
                beginAtZero: true
            }
        }
    }
};

// Create the charts
const humanCountChart = new Chart(humanCountCtx, {
    ...commonConfig,
    data: {
        datasets: [{
            label: 'Human Count',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]
    }
});

const upthrustChart = new Chart(upthrustCtx, {
    ...commonConfig,
    data: {
        datasets: [{
            label: 'Upthrust (N)',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4
        }]
    }
});

const temperatureChart = new Chart(temperatureCtx, {
    ...commonConfig,
    data: {
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgb(255, 159, 64)',
            tension: 0.4
        }]
    }
});

// Function to generate random data
function generateRandomData(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update charts
let timeCounter = 0;
function updateCharts() {
    timeCounter++;
    
    // Generate random values
    const humanCount = generateRandomData(0, 50);
    const upthrust = generateRandomData(100, 500);
    const temperature = generateRandomData(20, 35);

    // Update current values
    document.getElementById('currentHumanCount').textContent = humanCount;
    document.getElementById('currentUpthrust').textContent = upthrust;
    document.getElementById('currentTemp').textContent = temperature;

    // Add new data points
    humanCountChart.data.datasets[0].data.push({x: timeCounter, y: humanCount});
    upthrustChart.data.datasets[0].data.push({x: timeCounter, y: upthrust});
    temperatureChart.data.datasets[0].data.push({x: timeCounter, y: temperature});

    // Remove old data points if there are more than 20
    if (humanCountChart.data.datasets[0].data.length > 20) {
        humanCountChart.data.datasets[0].data.shift();
        upthrustChart.data.datasets[0].data.shift();
        temperatureChart.data.datasets[0].data.shift();
    }

    // Update the charts
    humanCountChart.update();
    upthrustChart.update();
    temperatureChart.update();
}

// Update charts every second
setInterval(updateCharts, 1000);


document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    // Open lightbox
    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src;
        }
    });

    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
});