<template>
  <div>
    <SharedBreadCrumbs title="รายละเอียดการจอง" :routes="routes" />
    <v-card min-height="800" class="rounded-xl mt-2 pa-4">
      <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>
      <v-card-title class="font-weight-bold"> รายละเอียดการจอง </v-card-title>
      <v-card-subtitle class="subtitle-1 mb-4">
        รายละเอียดวันและเวลาการจอง
      </v-card-subtitle>
      {{ bookingData }}
      <v-row class="ma-1">
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">สถานะการจอง</p>
          <p class="subtitle-1">{{ displayBookingStatus }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">ประเภทการจอง</p>
          <p class="subtitle-1">{{ displayBookingType }}</p>
        </v-col>
        <v-col cols="12">
          <p class="mb-0 subtitle-2 font-weight-bold">วันที่จอง</p>
          <p class="subtitle-1">{{ displayStartDate }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">เวลาเริ่ม</p>
          <p class="subtitle-1">{{ displayStartTime }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">เวลาสิ้นสุด</p>
          <p class="subtitle-1">{{ displayEndTime }}</p>
        </v-col>
        <v-col cols="12">
          <p class="mb-0 subtitle-2 font-weight-bold">หมายเหตุ</p>
          <p class="subtitle-1">{{ bookingData.details }}</p>
          <!-- <v-textarea
              class="rounded-xl"
              v-model="bookingData.details"
              outlined
              disabled
              label="หมายเหตุ"
            ></v-textarea> -->
        </v-col>
      </v-row>
      <v-divider class="mt-5"></v-divider>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let booking = await this.$store.dispatch('api/user/getSingleReserve', {
      params: { id: this.id },
    })
    if (!booking.data) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' error' + this.id,
      })
      return
    } else {
      this.routes[1].name = this.displayStartDate + ' ' + this.displayStartTime
      this.bookingData = booking.data
      this.loading = false
    }
  },
  computed: {
    displayBookingStatus() {
      try {
        if (this.bookingData.approval_status === 'WAITING') {
          return 'รอการตรวจสอบ'
        } else if (this.bookingData.approval_status === 'RETURN_QUOTATION') {
          return 'ได้รับใบเสนอราคา'
        } else if (this.bookingData.approval_status === 'CONFIRM_QUOTATION') {
          return 'รอการชำระเงิน'
        } else if (this.bookingData.approval_status === 'CONFIRM') {
          return 'การจองสำเร็จ'
        } else if (this.bookingData.approval_status === 'CANCEL') {
          return 'การจองถูกยกเลิก'
        } else {
          return 'n/a'
        }
      } catch (error) {
        return 'n/a'
      }
    },
    displayBookingType() {
      try {
        if (
          this.bookingData.room_id &&
          this.bookingData.reserve_equipment.length > 0
        ) {
          return 'จ้องห้องพร้อมอุปกรณ์'
        } else if (this.bookingData.room_id) {
          return 'จ้องห้อง'
        } else if (this.bookingData.reserve_equipment.length > 0) {
          return 'จ้องอุปกรณ์'
        } else {
          return 'n/a'
        }
      } catch (error) {
        return 'n/a'
      }
    },
    displayStartDate() {
      try {
        return this.$moment(this.bookingData.time_start).format('DD/MM/YYYY')
      } catch (error) {
        return 'n/a'
      }
    },
    displayStartTime() {
      try {
        return this.$moment(this.bookingData.time_start).format('HH:mm')
      } catch (error) {
        return 'n/a'
      }
    },
    displayEndTime() {
      try {
        return this.$moment(this.bookingData.time_end).format('HH:mm')
      } catch (error) {
        return 'n/a'
      }
    },
  },
  data() {
    return {
      bookingData: {},
      tool: [],
      routes: [
        { id: 1, name: 'รายการจอง', to: '/user/home' },
        {
          id: 2,
          name: '',
          to: '/',
        },
      ],
      loading: true,
    }
  },
  methods: {},
}
</script>
  <style scoped>
</style>