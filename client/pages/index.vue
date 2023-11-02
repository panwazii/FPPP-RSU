<template>
  <div>
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
      </div>
    </v-parallax>
    <indexService />
    <indexAbout />

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

    <h1 class="text-h4 font-weight-bold d-flex justify-center mt-12">
      บริการจองห้อง
    </h1>
    <p class="mb-4 d-flex justify-center text-center">
      จองห้องเพื่อใช้งานอุปกรณ์ต่างๆภายในห้อง
    </p>
    <v-row class="justify-center">
      <v-col v-for="(rooms, index) in room.slice(0, 3)" :key="rooms.name">
        <indexRoomIndex
          :id="rooms.id"
          :picture="rooms.Picture[0].url"
          :name="rooms.name"
          :detail="rooms.details"
        />
      </v-col>
    </v-row>
    <v-row class="text-h4 font-weight-bold d-flex justify-center mt-12">
      <a href="/room-selection" class="btn justify-center">ROOMS</a>
    </v-row>
    <div class="mt-15">
      <indexContact />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetctrooms()
  },
  data() {
    return {
      room: [],
      image: require('@/static/img/index/ventilation_mono.png'),
    }
  },
  methods: {
    async fetctrooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms')
      this.room = data.rooms
      console.log(this.room)
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

.roomcenter {
  padding: 300px 260px;
  font-family: Tahoma (sans-serif);
  font-size: 40px;
  text-align: center;
  color: rgb(106, 95, 73);
  z-index: 1;
}
a {
  height: 50px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rgb(58, 52, 52);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 2px;
  border-radius: 200px;
  justify-items: center;
}
</style>
