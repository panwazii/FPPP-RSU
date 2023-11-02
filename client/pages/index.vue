<template>
  <div>
<<<<<<< HEAD
    
    <section>
      <div class="container">
        <div class="left">
          <h1 class="center">FOOD PROCESS PILOT PLANT</h1>
        </div>
        <div class="right"></div>
=======
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
>>>>>>> 1793cb012f4485ab77c24a5958bc130087c4e416
      </div>
    </v-parallax>
    <indexService />
<<<<<<< HEAD
    <!-- <h1>{{ $store.getters.getCartItems }}</h1>
    <v-btn @click="$store.dispatch('addCartItems', { id: 1, name: 'test1' })">cart add</v-btn>
    <v-btn @click="$store.dispatch('removeCartItems', 1)">cart remove</v-btn> -->
    <section>
      <v-img class="overlay" width="600" :src="image" />
      <v-row class="justify-center">
        <span class="roomcenter">
          <h1>ROOM</h1>
        </span>
        <v-col v-for="(rooms, index) in room.slice(0, 3)" :key="rooms.name">
          <indexRoomIndex :id="rooms.id" :picture="rooms.Picture[0].url" :name="rooms.name" :detail="rooms.details" />
        </v-col>
=======
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
>>>>>>> 1793cb012f4485ab77c24a5958bc130087c4e416
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
<<<<<<< HEAD

section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
}

a {
  height: 35px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rgb(106, 95, 73);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 2px;
  border-radius: 200px;
  position: absolute;
  bottom: 200px;
  font-size: 18px;
  z-index: 1;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
=======
.room1 {
  max-width: 1200px;
  margin: auto;
>>>>>>> 1793cb012f4485ab77c24a5958bc130087c4e416
}

.roomcenter {
  padding: 300px 260px;
  font-family: Tahoma (sans-serif);
  font-size: 40px;
  text-align: center;
  color: rgb(106, 95, 73);
  z-index: 1;
}
<<<<<<< HEAD

.center {
  padding: 180px 0;
  font-family: Tahoma (sans-serif);
  font-size: 40px;
  text-align: center;
}

.left {
  width: 50%;
  height: 600px;
  text-align: center;
  color: rgb(106, 95, 73);
  background-color: #ffffff;
  border-radius: 8px;
}

.right {
  width: 200%;
  height: 800px;
  background-image: url(~/static/img/index/872.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: white;
  margin-left: 50px;
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    margin: 0 20px;
  }

  .left {
    width: 100%;
    height: 400px;
  }

  .right {
    width: 90%;
    margin: 0;
    margin-top: -100px;
  }
=======
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
>>>>>>> 1793cb012f4485ab77c24a5958bc130087c4e416
}
</style>
