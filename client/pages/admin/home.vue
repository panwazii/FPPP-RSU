<template>
<<<<<<< HEAD
  <div>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto my-6" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                การจอง
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Button </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                อุปกรณ์ชำรุด
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Button </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                อุปกรณ์พร้อมใช้งาน
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Button </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Button </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ApexCharts
          width="500"
          type="line"
          :options="chart.chartOptions"
          :series="chart.series"
        />
      </v-col>
    </v-row>
=======
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chart.chartOptions"
      :series="chart.series"
    ></apexchart>
>>>>>>> 22b424afabc30fb5c78aa2c01d3c787b5052e4d7
  </div>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'admin home',
    }
  },
  components: {
<<<<<<< HEAD
    ApexCharts: () => import('vue-apexcharts'),
=======
    [process.browser && 'apexchart']: () => import('vue-apexcharts'),
>>>>>>> 22b424afabc30fb5c78aa2c01d3c787b5052e4d7
  },
  data() {
    return {
      chart: {
        series: [
          {
<<<<<<< HEAD
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
=======
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
>>>>>>> 22b424afabc30fb5c78aa2c01d3c787b5052e4d7
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
<<<<<<< HEAD
          },
          // Other ApexCharts options...
=======
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
>>>>>>> 22b424afabc30fb5c78aa2c01d3c787b5052e4d7
        },
      },
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'home')
  },
}
</script>