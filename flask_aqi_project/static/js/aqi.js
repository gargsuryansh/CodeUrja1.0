document.addEventListener("DOMContentLoaded", function () {
    // AQI Data for Hyderabad (Example: March 28, 2025 - April 3, 2025)
    const forecastDates = [
        "28-03-2025", "29-03-2025", "30-03-2025", 
        "31-03-2025", "01-04-2025", "02-04-2025", "03-04-2025"
    ];
    const forecastAQI = [106, 112, 118, 125, 130, 135, 140]; // Example AQI values

    // Get Chart Context
    const ctx = document.getElementById("forecastChart").getContext("2d");

    // Create AQI Forecast Chart
    new Chart(ctx, {
        type: "line",
        data: {
            labels: forecastDates,
            datasets: [{
                label: "AQI Forecast",
                data: forecastAQI,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderWidth: 2,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "red"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 50,
                    suggestedMax: 150,
                    title: {
                        display: true,
                        text: "AQI Value"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                }
            }
        }
    });
});
