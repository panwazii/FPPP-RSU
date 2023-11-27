<template>
  <div>
    <SharedBreadCrumbs title="ข่าวทั้งหมด" :routes="routes" />
    <v-card min-height="1000" class="rounded-xl mt-2">
      <v-card-text>
        <div class="d-flex">
          <v-row>
            <v-col cols="12" md="7" class="px-0">
              <v-text-field
                v-model="search.value"
                class="rounded-xl mx-2"
                prepend-inner-icon="mdi-magnify"
                solo
                label="ค้นหาข่าว"
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
                  solo
                />
                <v-btn
                  height="48"
                  dark
                  class="rounded-xl mr-2"
                  @click="fetchNews"
                  >ค้นหา</v-btn
                >
                <v-btn height="48" class="rounded-xl mr-2" @click="clearSearch"
                  >ล้างค่า</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="allnew in news"
            :key="allnew.id"
            cols="12"
            md="3"
          >
            <NewsCard
              :id="allnew.id"
              :title="allnew.title"
              :picture="allnew.picture"
              :details="allnew.details"
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
  head() {
    return {
      title: 'รายการข่าว',
    }
  },
  mounted() {
    this.fetchNews()
  },
  data() {
    return {
      search: { value: '', filter: 1 },
      searchOptions: [
        { name: 'ค้นหาโดยชื่อข่าว', id: 1 },
        { name: 'ค้นหาโดยหมวดข่าว', id: 2 },
      ],
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 16 },
      news: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'ข่าว', to: '/news' },
      ],
    }
  },
  watch: {
    'fetchOption.page'() {
      this.fetchNews()
    },
  },
  methods: {
    async fetchNews() {
      let data = await this.$store.dispatch('api/public/getAllNews', {
        params: {
          ...this.search,
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.news = data.news
      this.fetchOption.totalPages = data.total_pages
    },
    clearSearch() {
      this.search.filter = 1
      this.search.value = ''
      this.fetchOption.page = 1
      this.fetchNews()
    },
  },
}
</script>
<style scoped></style>
