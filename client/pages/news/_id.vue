<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="justify-center">
      <v-card class="pa-6 rounded-lg" width="1100" height="400">
        <h1 align="left" class="amber--text pa-1"></h1>
        <v-form ref="form" lazy-validation>
          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <h1>{{ news.title }}</h1>
              {{ news.details }}

              <v-card-actions class="justify-left">
                <v-btn class="rounded-xl" variant="text" color="white"
                  >จองห้อง</v-btn
                >
              </v-card-actions>
            </v-col>
            <v-col cols="12" sm="6">
              <v-avatar class="ml-16 rounded-xl" size="300">
                <v-img :src="news.picture"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>

    <!-- <v-row class="text-h4 font-weight-bold mt-12 justify-center">
      <v-col cols="12" sm="1" v-for="(tools, i) in tools" :key="i">
        <v-card class="mx-auto rounded-xl" max-width="344">
          <v-img
            src="https://media.istockphoto.com/id/92042654/photo/cute-girl-in-shock.jpg?s=1024x1024&w=is&k=20&c=BiNPkb1OZMSF5hDAZ1r3ZNQr4BXNwj1f4j8wGZM_Q9U="
            height="200px"
            cover
          ></v-img>

          <v-card-title class="justify-center">
            <h1>{{ tools }}</h1>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row> -->
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
      this.news = news.Data
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
