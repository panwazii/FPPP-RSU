<template>
  <div>
    <SharedBreadCrumbs title="รายละเอียดห้องแลป" :routes="routes" />
    <v-card min-height="800" class="rounded-xl mt-2 pa-4">
      <v-card-title class="text-h5 font-weight-bold">{{
        room[0].name
      }}</v-card-title>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-img
            contain
            aspect-ratio="1.3333"
            width="640"
            height="480"
            :src="room[0].picture[0].url"
            :lazy-src="require('~/static/img/default/no-image.png')"
            class="rounded-xl"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div justify="center" align="center">
            <div class="d-flex justify-space-around">
              <div class="text-h6 font-weight-bold">ราคา</div>
              <div>
                <v-chip class="text-h5 font-weight-bold">
                  {{ room[0].rent_price }} บาท
                </v-chip>
              </div>
            </div>
            <v-btn
              x-large
              elevation="2"
              max-width="200"
              class="text-h6 rounded-xl mt-8"
              dark
            >
              <v-icon>mdi-cart-plus</v-icon>เพิ่มลงตระกร้า
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-4"></v-divider>
      <div class="mt-4">
        <div class="text-h6 font-weight-bold">รายละเอียด</div>
        <div class="mt-2">{{ room[0].details }}</div>
      </div>
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
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })

    if (room == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room
      this.routes[2].name = room.room[0].name
      console.log('this is equipment', room)
    }
  },
  data() {
    return {
      room: {},
      equipmentInfo: {},
      tool: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'ห้องแลป', to: '/rooms' },
        { id: 3, name: '', to: '/' },
      ],
      loading: true,
    }
  },
  methods: {},
}
</script>
<style scoped></style>
