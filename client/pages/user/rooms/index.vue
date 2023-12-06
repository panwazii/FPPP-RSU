<template>
  <div>
    <SharedBreadCrumbs title="ห้องแลปทั้งหมด" :routes="routes" />
    <v-card min-height="1250" class="rounded-xl">
      <v-card-text>
        <div class="d-flex">
          <v-row>
            <v-col cols="12" md="7" class="px-0">
              <v-text-field
                v-model="search.value"
                class="rounded-xl mx-2"
                prepend-inner-icon="mdi-magnify"
                solo
                label="ค้นหาห้องแลป"
              />
            </v-col>
            <v-col cols="12" md="5" class="px-0">
              <div class="d-flex">
                <!-- <v-select
                  class="rounded-xl mx-2"
                  v-model="search.filter"
                  :items="searchOptions"
                  item-text="name"
                  item-value="id"
                  solo
                /> -->
                <v-btn
                  height="48"
                  dark
                  class="rounded-xl mr-2"
                  @click="fetchRooms"
                  >ค้นหา</v-btn
                >
                <v-btn height="48" class="rounded-xl mr-2" @click="clearSearch"
                  >ล้างค่า</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-if="rooms.length === 0" class="mt-10">
          <div class="d-flex justify-center text-subtitle-1">ไม่พบข้อมูล</div>
          <v-divider class="mx-10"></v-divider>
        </div>
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
    <v-pagination
      circle
      dark
      class="mt-2 justify-center"
      v-model="fetchOption.page"
      :length="fetchOption.totalPages"
    >
    </v-pagination>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'รายการห้องแลป',
    }
  },
  mounted() {
    this.fetchRooms()
  },
  data() {
    return {
      rooms: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'ห้องแลป', to: '/rooms' },
      ],
    }
  },
  watch: {
    'fetchOption.page'() {
      this.fetchNews()
    },
  },
  methods: {
    async fetchRooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms', {
        params: {
          ...this.search,
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.rooms = data.rooms
      this.fetchOption.totalPages = data.total_pages
    },
    clearSearch() {
      this.search.filter = 1
      this.search.value = ''
      this.fetchOption.page = 1
      this.fetchRooms()
    },
  },
}
</script>
<style scoped>
.card-actions {
  bottom: 0;
}
</style>
