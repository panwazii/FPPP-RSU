<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chart.chartOptions"
      :series="chart.series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'admin home',
    }
  },
  components: {
    [process.browser && 'apexchart']: () => import('vue-apexcharts'),
  },
  data() {
    return {
      chart: {
        series: [
          {
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left',
          },
          // grid: {
          //   row: {
          //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          //     opacity: 0.5,
          //   },
          // },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
            ],
          },
        },
      },
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'home')
  },
}
</script>