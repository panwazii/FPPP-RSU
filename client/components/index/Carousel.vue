<template>
  <v-carousel hide-delimiter-background cycle height="800">
    <v-carousel-item v-for="item in allNews" :key="item.id" :src="item.picture">
      <div class="d-flex fill-height justify-center align-center">
        <div class="text-h1">
          <v-card-title class="text-h2">
            <main @click="$router.push('/news/' + item.id)">
              {{ item.title }}
            </main></v-card-title
          >
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>

  <!-- <v-carousel cycle max-height="400" :hide-delimiters="true" class="mt-4">
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
  </v-carousel> -->
</template>

<script>
export default {
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
<style scoped>
@font-face {
  src: url('https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2')
    format('woff2');
  font-family: 'Meta';
  font-style: normal;
  font-weight: normal;
}

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #8357eb;
  width: 100vw;
  height: 100vh;
}

main {
  transition: all 0.5s;
  -webkit-text-stroke: 4px #d6f4f4;
  font-variation-settings: 'wght' 900, 'ital' 1;
  font-size: 15rem;
  text-align: center;
  color: transparent;
  font-family: 'Meta', sans-serif;
  text-shadow: 10px 10px 0px #07bccc, 15px 15px 0px #e601c0,
    20px 20px 0px #e9019a, 25px 25px 0px #f40468, 45px 45px 10px #482896;
  cursor: pointer;
}

main:hover {
  font-variation-settings: 'wght' 100, 'ital' 0;
  text-shadow: none;
}

h1 {
  text-shadow: 5px 5px #ffffff;
}

/* to make the header only as wide as the content and centering it */

/* added by editor for deomnstration purpose */

body {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/5b/St_Mary%27s_Church%2C_Castle_Street_1.jpg');
  background-size: cover;
}
</style>
