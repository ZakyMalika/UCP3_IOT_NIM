import Chart from 'chart.js/auto';

(async function () {
  try {
    const response = await fetch('http://ai.suryaformosa.com/datasensortwoloc.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json();

    const sensorData = jsonData.datasensorreport[0].sensordata;

    const sensor1 = sensorData.filter(item => item.sensor_id === "1");
    const sensor2 = sensorData.filter(item => item.sensor_id === "2");

    new Chart(document.getElementById('acquisitions'), {
      type: 'line',
      data: {
        labels: sensor1.map((item, index) => index + 1),

        datasets: [
          {
            label: 'Sensor 1 (Lokasi 1)',
            data: sensor1.map(item => item.temperature),
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.3)',
            tension: 0.3
          },
          {
            label: 'Sensor 2 (Lokasi 2)',
            data: sensor2.map(item => item.temperature),
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.3)',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Temperature Comparison'
          }
        }
      }
    });

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})();