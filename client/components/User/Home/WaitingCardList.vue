<template>
  <v-card min-height="350" class="rounded-xl mt-2">
    <v-card-title>
      วันที่จอง {{ displayStartDate }} เวลา
      {{ displayStartTime }}
    </v-card-title>
    <v-card-subtitle>{{ data.time_start }}</v-card-subtitle>
    {{ data }}
    <v-card-actions>
      <v-spacer />
      <v-btn
        dark
        elevation="0"
        class="rounded-xl"
        @click="$router.push(`/user/booking/waiting/${data.id}`)"
        >ดูรายละเอียด
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  <script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      allBooking: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
    }
  },
  methods: {},
  computed: {
    displayStartDate() {
      return this.$moment(this.data.time_start).format('DD/MM/YYYY')
    },
    displayStartTime() {
      return this.$moment(this.data.time_start).format('HH:mm')
    },
  },
}
</script>
<style scoped>
</style>