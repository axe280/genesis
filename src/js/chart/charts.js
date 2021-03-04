;(function () {
  // default global
  Chart.defaults.global.defaultFontColor = '#7c7c7c'
  Chart.defaults.global.defaultFontFamily =
    "'Montserrat', 'BlinkMacSystemFont', 'Segoe UI', sans-serif"
  Chart.defaults.global.legend.display = false
  Chart.defaults.global.tooltips.bodyFontSize = 13
  Chart.defaults.global.tooltips.bodyFontColor = 'rgba(0, 0, 0, .5)'
  Chart.defaults.global.tooltips.backgroundColor = '#fff'
  Chart.defaults.global.tooltips.borderWidth = 1
  Chart.defaults.global.tooltips.borderColor = '#11dadc'
  Chart.defaults.global.tooltips.displayColors = false
  Chart.defaults.global.tooltips.titleFontSize = 16
  Chart.defaults.global.tooltips.titleFontColor = '#000'
  Chart.defaults.global.tooltips.titleFontStyle = '500'
  Chart.defaults.global.tooltips.titleMarginBottom = 2
  Chart.defaults.global.tooltips.xPadding = 16
  Chart.defaults.global.tooltips.yPadding = 12
  Chart.defaults.global.tooltips.caretSize = 6

  var chartStat = document.getElementById('chartStat')

  if (chartStat) {
    var ctx = chartStat.getContext('2d')

    var gradient1 = ctx.createLinearGradient(0, 0, 0, 500)
    gradient1.addColorStop(0, 'rgba(17, 218, 220, 0.2')
    gradient1.addColorStop(1, 'rgba(17, 218, 220, 0)')

    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
        datasets: [
          {
            data: [
              1200,
              1500,
              1800,
              2000,
              2200,
              2400,
              2600,
              2800,
              3000,
              3200,
              3400,
              3600,
              3800,
              4000,
              4200,
              4000,
              3800,
              3600,
              3800,
              4000,
              4200,
              4400,
              4600,
              4800,
              5000,
              4800,
              4600,
              4800,
              5000,
              5200,
            ],
            backgroundColor: gradient1,
            borderColor: '#11d4d8',
            borderWidth: 1,
            pointBorderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#f7f7f7',
            pointHoverBackgroundColor: '#f7f7f7',
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return tooltipItem[0].value + '₽'
            },
            label: function (tooltipItem, data) {
              return tooltipItem.label
            },
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: 'rgba(0, 0, 0, 0.1)',
              },
              ticks: {
                padding: 20,
                callback: function (value, index, values) {
                  return value + '₽'
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 10,
              },
            },
          ],
        },
      },
    })

    $('.header-switch-theme').on('click', 'button:not(.active)', function () {
      var themeName = $(this).data('switchTheme')
      if (themeName === 'dark') {
        Chart.defaults.global.defaultFontColor = '#8491b4'
        chart.update()
      }
    })
  }
})()
