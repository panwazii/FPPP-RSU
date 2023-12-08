<template>
  <div>
    <SharedBreadCrumbs title="อุปกรณ์ทั้งหมด" :routes="routes" />
    <v-card min-height="1250" class="rounded-xl mt-2">
      <v-card-text>
        <div class="d-flex">
          <v-row>
            <v-col cols="12" md="7" class="px-0">
              <v-text-field
                v-model="search.value"
                class="rounded-xl mx-2"
                prepend-inner-icon="mdi-magnify"
                solo
                label="ค้นหาอุปกรณ์"
              />
            </v-col>
            <v-col cols="12" md="5" class="px-0">
              <div class="d-flex">
                <v-select
                  class="rounded-xl mx-2"
                  v-model="search.filter"
                  :items="searchOptions"
                  item-text="name"
                  item-value="id"
                  label="เลือกสายการผลิต (ไม่จำเป็น)"
                  solo
                />
                <v-btn
                  height="48"
                  dark
                  class="rounded-xl mr-2"
                  @click="fetchEquipments"
                  >ค้นหา</v-btn
                >
                <v-btn height="48" class="rounded-xl mr-2" @click="clearSearch"
                  >ล้างค่า</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-if="equipments.length === 0" class="mt-10">
          <div class="d-flex justify-center text-subtitle-1">ไม่พบข้อมูล</div>
          <v-divider class="mx-10"></v-divider>
        </div>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="equipment in equipments"
            :key="equipment.id"
            cols="12"
            md="3"
          >
            <UserEquipmentsCard
              :id="equipment.id"
              :title="equipment.name"
              :picture="equipment.picture"
              :price="equipment.rent_price"
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
    ></v-pagination>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'รายการอุปกรณ์',
    }
  },
  mounted() {
    this.fetchEquipments()
    this.fetchProductionLine()
  },
  data() {
    return {
      search: { value: '', filter: 0 },
      searchOptions: [],
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      equipments: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'อุปกรณ์', to: '/equipments' },
      ],
    }
  },
  watch: {
    'fetchOption.page'() {
      this.fetchEquipments()
    },
  },
  methods: {
    async fetchEquipments() {
      let data = await this.$store.dispatch('api/public/getAllEquipmentInfo', {
        params: {
          ...this.search,
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.equipments = data.equipments
      this.fetchOption.totalPages = data.total_pages
    },
    async fetchProductionLine() {
      let data = await this.$store.dispatch('api/public/getAllProductionLine')
      this.searchOptions = data.production_lines
    },
    clearSearch() {
      this.search.filter = 0
      this.search.value = ''
      this.fetchOption.page = 1
      this.fetchEquipments()
    },
  },
}
</script>
<style scoped>
</style>