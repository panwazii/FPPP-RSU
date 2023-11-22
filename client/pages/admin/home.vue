<template>
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
    ApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      chart: {
        series: [
          {
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
          },
          // Other ApexCharts options...
        },
      },
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'home')
  },
}
</script>