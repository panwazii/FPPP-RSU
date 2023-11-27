<template>
  <div>
    <SharedGoToLoginModal
      :open="modal.goToLogin.open"
      :message="modal.goToLogin.message"
      :goToLogin.sync="modal.goToLogin.open"
    />
    <SharedBreadCrumbs title="รายละเอียดห้องแลป" :routes="routes" />
    <v-card min-height="800" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        {{ room.name }}
      </v-card-title>
      <v-skeleton-loader v-if="loading" type="card-heading"></v-skeleton-loader>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-img
            contain
            aspect-ratio="1.3333"
            width="640"
            height="480"
            :src="picture"
            :lazy-src="require('~/static/img/default/no-image.png')"
            class="rounded-xl"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader v-if="loading" type="text@2"></v-skeleton-loader>
          <div v-if="!loading" justify="center" align="center">
            <div class="d-flex justify-space-around">
              <div class="text-h6 font-weight-bold">ราคา</div>
              <div>
                <v-chip class="text-h5 font-weight-bold">
                  {{ room.rent_price }} บาท
                </v-chip>
              </div>
            </div>
            <v-btn
              @click="modal.goToLogin.open = true"
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
      <div v-if="!loading" class="mt-4">
        <div class="text-h6 font-weight-bold">รายละเอียด</div>
        <div class="mt-2">{{ room.details }}</div>
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
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    if (!room) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room[0]
      this.routes[2].name = room.room[0].name
      this.loading = false
    }
  },
  computed: {
    picture() {
      try {
        if (!this.room.picture[0]) {
          return require('~/static/img/default/no-image.png')
        } else {
          return this.room.picture[0].url
        }
      } catch (error) {
        return require('~/static/img/default/no-image.png')
      }
    },
  },
  data() {
    return {
      room: {},
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
        { id: 2, name: 'ห้องแลป', to: '/rooms' },
        { id: 3, name: '', to: '/' },
      ],
      loading: true,
      modal: {
        goToLogin: {
          open: false,
          message: 'กรุณาเข้าสู่ระบบเพื่อใช้งานบริการทั้งหมด',
        },
      },
    }
  },
  methods: {},
}
</script>
<style scoped></style>
