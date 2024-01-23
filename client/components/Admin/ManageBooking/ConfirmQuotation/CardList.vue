<template>
  <div>
    <v-card class="rounded-xl mt-4">
      <v-card-title class="ml-0">
        วันที่ {{ displayStartDate }} เวลา {{ displayStartTime }} -
        {{ displayEndTime }}
      </v-card-title>
      <v-card-subtitle>
        {{ bookingData.id }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text class="subtitle-1 font-weight-bold ml-2">
        <div>ผู้จอง : {{ displayUsername }}</div>
        <div>ประเภท : {{ bookingData.user.user_type.name }}</div>
        <div class="mt-2">
          <v-chip color="secondary" :input-value="true">
            {{ displayBookingType }}</v-chip
          >
          <v-chip
            color="primary"
            :input-value="true"
            v-if="bookingData.room_id"
          >
            ห้อง : {{ bookingData.room.name }}</v-chip
          >
          <v-chip :input-value="true" v-if="displayEquipmentCount !== 0">
            อุปกรณ์ทั้งหมด : {{ displayEquipmentCount }}</v-chip
          >
        </div>
        <div class="mt-2">
          <v-chip
            color="success"
            :input-value="true"
            v-if="bookingData.receipt !== null"
          >
            <v-icon class="mr-1">mdi-receipt-text-check</v-icon>
            อัพโหลดใบเสร็จแล้ว</v-chip
          >
          <v-chip :input-value="true" v-if="bookingData.receipt === null">
            <v-icon class="mr-1">mdi-receipt-text-remove</v-icon>
            ยังไม่ได้อัพโหลดใบเสร็จ</v-chip
          >
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          dark
          elevation="0"
          class="rounded-xl"
          @click="
            $router.push(
              `/admin/manage-booking/confirm-quotation/${bookingData.id}`
            )
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
          return 'จองห้องพร้อมอุปกรณ์'
        } else if (this.bookingData.room_id) {
          return 'จองห้อง'
        } else if (this.bookingData.reserve_equipment.length > 0) {
          return 'จองอุปกรณ์'
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
    displayUsername() {
      return this.bookingData.user.fname + ' ' + this.bookingData.user.lname
    },
  },
}
</script>
  <style scoped>
</style>