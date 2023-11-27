<template>
  <div>
    <SharedBreadCrumbs title="รายละเอียดข่าว" :routes="routes" />
    <v-card min-height="800" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">{{
        newInfo.title
      }}</v-card-title>
      <v-skeleton-loader v-if="loading" type="card-heading"></v-skeleton-loader>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-img
            contain
            aspect-ratio="1.3333"
            width="800"
            height="800"
            :src="newInfo.picture"
            :lazy-src="require('~/static/img/default/no-image.png')"
            class="rounded-xl"
          />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="mt-4" v-if="!loading">
        <div class="text-h6 font-weight-bold">รายละเอียด</div>
        <div class="mt-2">{{ newInfo.details }}</div>
      </div>
      <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>
    </v-card>
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
    if (news === null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.routes[2].name = news.news.title
      this.newInfo = news.news
      this.loading = false
    }
  },
  data() {
    return {
      newInfo: {},
      tool: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'ข่าว', to: '/news' },
        { id: 3, name: '', to: '/' },
      ],
      loading: true,
    }
  },
  methods: {},
}
</script>
<style scoped></style>
