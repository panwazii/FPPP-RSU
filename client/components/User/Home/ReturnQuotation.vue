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
      <UserHomeReturnQuotationCardList :bookingData="booking" />
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
      'api/user/getAllReserve',
      {
        params: {
          approval_status: 'RETURN_QUOTATION',
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      }
    )
    this.allBooking = getAllBookings.reserve
    this.fetchOption.totalPages = getAllBookings.total_pages
  },
  data() {
    return {
      allBooking: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
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
