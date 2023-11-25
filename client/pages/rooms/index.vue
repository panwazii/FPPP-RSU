<template>
  <div>
    <SharedBreadCrumbs title="Rooms" :routes="routes" />
    <v-card min-height="1000" class="rounded-xl">
      <v-card-text>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="room in rooms"
            :key="room.id"
            cols="12"
            md="3"
          >
            <RoomsCard
              :id="room.id"
              :title="room.name"
              :picture="room.picture"
              :price="room.rent_price"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-pagination class="mt-2 justify-center" v-model="page" :length="totalPages">
    </v-pagination>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'รายการอุปกรณ์',
    }
  },
  mounted() {
    this.fetchRooms()
  },
  data() {
    return {
      page: 1,
      totalPages: 0,
      rooms: [],
      routes: [
        { id: 1, name: 'home', to: '/' },
        { id: 2, name: 'rooms', to: '/rooms' },
      ],
    }
  },
  methods: {
    async fetchRooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms')
      this.rooms = data.rooms
      this.totalPages = data.total_pages
    },
  },
}
</script>
<style scoped>
.card-actions {
  bottom: 0;
}
</style>