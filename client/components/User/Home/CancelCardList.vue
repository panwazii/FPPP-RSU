<template>
    <div>
      <v-card class="rounded-xl mt-4">
        <v-card-title class="ml-2">
          วันที่ {{ displayStartDate }} เวลา {{ displayStartTime }} -
          {{ displayEndTime }}
        </v-card-title>
        <v-card-subtitle class="subtitle-1 font-weight-bold">
          <v-chip color="secondary" :input-value="true">
            {{ displayBookingType }}</v-chip
          >
          <v-chip color="primary" :input-value="true" v-if="bookingData.room_id">
            ห้อง : {{ bookingData.room.name }}</v-chip
          >
          <v-chip :input-value="true" v-if="displayEquipmentCount !== 0">
            อุปกรณ์ทั้งหมด : {{ displayEquipmentCount }}</v-chip
          >
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dark
            elevation="0"
            class="rounded-xl"
            @click="
              $router.push(`/user/booking/cancel/${bookingData.id}`)
            "
            >ดูรายละเอียด
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
        <script>
  export default {
    props: {
      bookingData: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      displayEquipmentCount() {
        try {
          if (this.bookingData.reserve_equipment.length > 0) {
            let count = 0
            this.bookingData.reserve_equipment.forEach((item) => {
              count += item.quantity
            })
            return count
          } else {
            return 0
          }
        } catch (error) {
          return 0
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
        return this.$moment(this.bookingData.time_start).format('DD/MM/YYYY')
      },
      displayStartTime() {
        return this.$moment(this.bookingData.time_start).format('HH:mm')
      },
      displayEndTime() {
        return this.$moment(this.bookingData.time_end).format('HH:mm')
      },
    },
  }
  </script>
  <style scoped>
  </style>