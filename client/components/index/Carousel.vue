<template>
  <v-carousel max-height="400" :hide-delimiters="true" class="mt-4">
    <v-carousel-item v-for="item in allNews" :key="item.id">
      <v-card
        max-width="800"
        min-height="300"
        max-height="800"
        class="d-flex justify-space-around mx-auto ma-10"
      >
        <div>
          <div class="justify-space-evenly">
            <v-row class="mt-6">
              <v-col cols="12" sm="6"
                ><v-img
                  class="ma-3"
                  :src="item.picture"
                  width="500"
                  height="200"
                ></v-img
              ></v-col>
              <v-col cols="12" sm="6"
                ><v-card-title class="text-h4">{{ item.title }}</v-card-title>
                <v-card-text>{{ item.details }}</v-card-text>
                <v-card-actions>
                  <v-btn
                    class="rounded-xl"
                    variant="text"
                    color="white"
                    @click="$router.push('/news/' + item.id)"
                  >
                    รายละเอียดเพิ่มเติม
                  </v-btn>
                </v-card-actions></v-col
              >
            </v-row>
          </div>
        </div>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'manage news',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      page: 1,
      itemsPerPage: 7,
      totalPages: 0,
      search: '',
      allNews: [],
      news: null,
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'manage news')
    this.fetchNews()
  },
  watch: {
    page() {
      this.fetchNews()
    },
  },
  methods: {
    async fetchNews() {
      let Data = await this.$store.dispatch('api/public/getAllNews', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      console.log('this is equipment', Data)
      this.allNews = Data.news
      this.totalPages = Data.total_pages
    },
    async openEditNewsModal(id) {
      const NewsData = await this.$store.dispatch('api/public/getSingleNews', {
        params: {
          id: id,
        },
      })
      this.news = NewsData.news
      this.editNews = true
    },
  },
}
</script>
<style scoped></style>
