<template>
  <div>
    <v-card
      v-if="allBooking.length === 0"
      class="rounded-xl mt-4 text-center"
      height="100"
    >
      <div class="center">
        <h4>ไม่มีข้อมูล</h4>
      </div>
    </v-card>
    <div v-for="booking in allBooking" :key="booking.id">
      <AdminManageBookingConfirmCardList :bookingData="booking" />
    </div>
    <v-pagination
      circle
      dark
      class="mt-2"
      v-model="fetchOption.page"
      :length="fetchOption.totalPages"
      v-if="allBooking.length !== 0"
    >
    </v-pagination>
  </div>
</template>
  <script>
export default {
  async fetch() {
    const getAllBookings = await this.$store.dispatch(
      'api/admin/getAllReserve',
      {
        params: {
          approval_status: 'CONFIRM',
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      }
    )
    if (getAllBookings.code === 200) {
      this.allBooking = getAllBookings.reserves
      this.fetchOption.totalPages = getAllBookings.total_pages
    }
  },
  data() {
    return {
      allBooking: [],
      search: { value: '' },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 8 },
    }
  },
  methods: {},
}
</script>
<style scoped>
.center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>