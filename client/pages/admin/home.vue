<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto my-6 rounded-xl" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1"> ใหม่ </v-list-item-title>
              <v-list-item-subtitle> รายการจองใหม่ </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl text-h2"
              width="100"
              height="80"
              color="primary"
            >
              {{ dashbordData.waiting }}
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="$router.push('/admin/manage-booking')"
            >
              ดูเพิ่มเติม
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6 rounded-xl" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                อนุมัติแล้ว
              </v-list-item-title>
              <v-list-item-subtitle>
                รายการจองที่ผ่านการอนุมัติแล้ว
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl text-h2"
              width="100"
              height="80"
              color="success"
            >
              {{ dashbordData.confirm }}
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="$router.push('/admin/manage-booking')"
            >
              ดูเพิ่มเติม
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6 rounded-xl" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                อุปกรณ์ชำรุด
              </v-list-item-title>
              <v-list-item-subtitle> ราการอุปกรณ์ชำรุด </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl text-h2"
              width="100"
              height="80"
              color="warning"
            >
              {{ dashbordData.repair }}
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="$router.push('/admin/report-malfunction')"
            >
              ดูเพิ่มเติม
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto my-6 rounded-xl" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                ผู้ใช้งาน
              </v-list-item-title>
              <v-list-item-subtitle>
                จำนวนผู้ใช้งานทั้งหมด
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl text-h2"
              width="100"
              height="80"
              color="grey"
            >
              {{ dashbordData.user }}
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="$router.push('/admin/manage-user')"
            >
              ดูเพิ่มเติม
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-xl">
          <v-card-title>
            ยอดการจองของปี {{ new Date().getFullYear() }}
          </v-card-title>
          <!-- <client-only> -->
          <apexchart
            v-if="visible"
            ref="chart"
            type="line"
            :options="chart.chartOptions"
            :series="chart.series"
          />
          <!-- </client-only> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import ApexCharts from 'apexcharts'
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
  async fetch() {
    await this.fetchDashbordData()
    this.visible = true
  },
  mounted() {
    this.$store.dispatch('setPathName', 'หน้าหลัก')
    // this.fetchDashbordData()
  },
  components: {
    [process.browser && 'apexchart']: () => import('vue-apexcharts'),
  },
  // computed: {
  //   series() {
  //     return this.chart.series
  //   },
  // },
  watch: {
    chart() {
      this.visible = true
    },
  },

  data() {
    return {
      visible: false,
      chart: {
        series: [
          {
            name: 'ยอดการจองทั้งหมด',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            enabled: true,
          },
          stroke: {
            curve: 'straight',
          },
          // title: {
          //   text: 'Product Trends by Month',
          //   align: 'left',
          // },
          // grid: {
          //   row: {
          //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          //     opacity: 0.5,
          //   },
          // },
          yaxis: {
            title: {
              text: 'ยอดการจอง',
            },
          },
          xaxis: {
            title: {
              text: 'เดือน',
            },
            categories: [
              'ม.ค.',
              'ก.พ.',
              'มี.ค.',
              'เม.ย.',
              'พ.ค.',
              'มิ.ย.',
              'ก.ค.',
              'ส.ค.',
              'ก.ย.',
              'ต.ค.',
              'พ.ย.',
              'ธ.ค.',
            ],
          },
        },
      },
      dashbordData: {
        waiting: 0,
        confirm: 0,
        repair: 0,
        user: 0,
      },
    }
  },
  methods: {
    async fetchDashbordData() {
      try {
        const response = await this.$store.dispatch('api/admin/getDashboard')
        this.dashbordData.waiting = response.waiting
        this.dashbordData.confirm = response.confirm
        this.dashbordData.repair = response.repair
        this.dashbordData.user = response.user
        this.chart.series[0].data = response.graph
      } catch (error) {}
    },
  },
}
</script>