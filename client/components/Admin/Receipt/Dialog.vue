<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="600"
    content-class="rounded-xl"
  >
    <v-card>
      <v-card-title>ใบเสร็จ</v-card-title>
      <v-divider />
      <v-card-text v-if="bookingData.receipt !== null" class="mt-2">
        <v-img :src="bookingData.receipt"></v-img>
      </v-card-text>
      <v-card-text v-if="bookingData.receipt === null" class="d-flex justify-center mt-6">
        ยังไม่ได้อัพโหลดใบเสร็จ
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark elevation="0" class="rounded-xl" @click="close">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { formatToIsoNumber } from '~/utils/general-utils'
export default {
  props: {
    open: {
      required: true,
    },
    bookingData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      quotation: null,
    }
  },
  computed: {
    displayRoomPrice() {
      return formatToIsoNumber(Number(this.quotation.room_price))
    },
    displayEquipmentPrice() {
      return formatToIsoNumber(Number(this.quotation.equipment_price))
    },
    displaySumPrice() {
      const sumPrice =
        Number(this.quotation.room_price) +
        Number(this.quotation.equipment_price)
      return formatToIsoNumber(sumPrice)
    },
    displayStartDate() {
      return this.$moment(this.quotation.reserve.time_start).format(
        'DD/MM/YYYY'
      )
    },
    displayStartTime() {
      return this.$moment(this.quotation.reserve.time_start).format('HH:mm')
    },
    displayEndTime() {
      return this.$moment(this.quotation.reserve.time_end).format('HH:mm')
    },
  },
  methods: {
    close() {
      this.$emit('update:close', false)
    },
  },
}
</script>
<style scoped>
</style>