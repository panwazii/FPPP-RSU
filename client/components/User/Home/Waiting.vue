<template>
  <div>
    <div v-for="booking in allBooking" :key="booking.id">
      <UserHomeWaitingCardList :bookingData="booking" />
    </div>
    <v-pagination
      circle
      dark
      class="mt-2"
      v-model="fetchOption.page"
      :length="fetchOption.totalPages"
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
        params: { approval_status: 'WAITING' },
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
/* .card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
} */
</style>
