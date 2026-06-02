import Chart from 'chart.js/auto';

(async function () {

  try {

    const response =
      await fetch('http://localhost/iot/select.php');

    const jsonData =
      await response.json();

    const sensor1 =
      jsonData.data.filter(
        item => item.sensor_id == 1
      );

    const sensor2 =
      jsonData.data.filter(
        item => item.sensor_id == 2
      );

    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',

        data: {
          labels: sensor1.map(
            (_, index) => index + 1
          ),

          datasets: [
            {
              label: 'Sensor 1',
              data: sensor1.map(
                item => item.temperature
              ),
              borderColor: 'red'
            },

            {
              label: 'Sensor 2',
              data: sensor2.map(
                item => item.temperature
              ),
              borderColor: 'blue'
            }
          ]
        }
      }
    );

  } catch(error) {

    console.error(error);

  }

})();