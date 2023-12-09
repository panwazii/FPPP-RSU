<template>
  <div>
    <SharedBreadCrumbs title="ข่าวทั้งหมด" :routes="routes" />
    <v-card min-height="1250" class="rounded-xl mt-2">
      <v-card-text>
        <div class="d-flex">
          <v-text-field
            v-model="search.value"
            class="rounded-xl mx-2"
            prepend-inner-icon="mdi-magnify"
            solo
            label="ค้นหาข่าว"
          />
          <div class="d-flex">
            <v-btn height="48" dark class="rounded-xl mr-2" @click="fetchNews"
              >ค้นหา</v-btn
            >
            <v-btn height="48" class="rounded-xl mr-2" @click="clearSearch"
              >ล้างค่า</v-btn
            >
          </div>
        </div>
        <div v-if="allNews.length === 0" class="mt-10">
          <div class="d-flex justify-center text-subtitle-1">ไม่พบข้อมูล</div>
          <v-divider class="mx-10"></v-divider>
        </div>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="news in allNews"
            :key="news.id"
            cols="12"
            md="3"
          >
            <NewsCard
              :id="news.id"
              :title="news.title"
              :picture="news.picture"
              :details="news.details"
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
  middleware: 'guest',
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
      search: { value: '' },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      allNews: [],
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
      this.allNews = data.news
      this.fetchOption.totalPages = data.total_pages
    },
    clearSearch() {
      this.search.value = ''
      this.fetchOption.page = 1
      this.fetchNews()
    },
  },
}
</script>
<style scoped></style>
