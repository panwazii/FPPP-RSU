<template>
  <div>
    <section>
      <div class="grid">
        <header class="page-header content-header">
          <H3>CATEGORIES / </H3>
        </header>
        <footer class="page-footer content-footer">
          <div class="box footerHeader"><H1>ข่าวอื่นๆ</H1></div>
          <div>
            <v-divider></v-divider>
          </div>
        </footer>
        <div class="page-leftbar content-left">
          <img class="centerimg" :src="news.picture" />
        </div>
        <div class="page-main content-main">
          <H3>{{ news.title }}</H3>
          <v-divider></v-divider>
          <p class="details">{{ news.details }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let news = await this.$store.dispatch('api/public/getSingleNews', {
      params: { id: this.id },
    })
    if (news == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.news = news.news
    }
  },
  data() {
    return {
      news: {},
      tool: [],
    }
  },
  methods: {},
}
</script>

<style scoped>
.details {
  padding-top: 20px;
  font-size: 20px;
  text-align: left;
}
.footerHeader {
  padding-left: 10px;
}

#textbox {
  display: flex;
  flex-flow: row wrap;
}

.grid {
  display: grid;
  grid-template-columns: minmax(600px, auto) minmax(auto, 500px);
  grid-template-rows: 50px minmax(600px, auto) 200px;
  grid-template-areas: 'header header' 'leftbar main' 'footer footer';
}

.page-header {
  grid-area: header;
}
.page-leftbar {
  grid-area: leftbar;
}
.page-main {
  grid-area: main;
}
.page-footer {
  grid-area: footer;
}

.content-header {
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
}

.content-left {
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-left: 30px;
}

.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.box {
  background-color: #d1d0d0;
}

img {
  object-fit: fill;
  border-radius: 50px;
  max-width: 550px;
  max-height: 550px;
}

.content-main {
  background-color: white;
  border: 4px solid #d1d0d0;
  box-sizing: border-box;
  padding: 10px;
  justify-items: center;
  text-align: center;
}

.content-main h3 {
  font-size: 30px;
}

.content-footer {
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
}
</style>
