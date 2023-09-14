<template>
  <div>
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
      </div>
    </v-parallax>
    <indexCarousel />

    <h1 class="text-h4 font-weight-bold mb-4 d-flex justify-center">
      บริการของเรา
    </h1>
    <p class="mb-4 d-flex justify-center text-center">
      ห้องปฎิบัติการของโรงงานต้นแบบ ที่ช่วยในการผลิตและทดลองอาหาร
      ในกระบวนการต่างๆ
    </p>
    <div class="room1 justify-center">
      <v-row class="justify-center mt-12">
        <indexAboutUs />
      </v-row>
    </div>

    <div class="mt-15">
      <indexContact />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async fetch() {
    const Rooms = await this.$store.dispatch('api/public/getAllRooms')
    this.rooms = Rooms.rooms
  },

  data() {
    return {
      rooms: [],
    }
  },
  methods: {
    async fetctrooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms')
      this.rooms = data.rooms
    },
  },
}
</script>
<style scoped>
.paralax-text {
  text-shadow: 2px 2px #000000;
}
.room1 {
  max-width: 1200px;
  margin: auto;
}
</style>
