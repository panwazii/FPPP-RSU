<template>
  <div>
    <!-- <h1>{{ $store.getters.getCartItems }}</h1>
    <v-btn @click="$store.dispatch('addCartItems', { id: 1, name: 'test1' })">cart add</v-btn>
    <v-btn @click="$store.dispatch('removeCartItems', 1)">cart remove</v-btn> -->
    <v-parallax
      class="rounded-lg"
      height="750"
      :src="require('~/static/img/index/index-bg.jpg')"
    >
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
      </div>
    </v-parallax>

    <h1 class="text-h4 font-weight-bold d-flex justify-center mt-12">
      ข่าวสาร
    </h1>
    <p class="d-flex justify-center text-center">ข่าวสารล่าสุดจากเว็บไซต์</p>
    <div class="room1 justify-center">
      <v-row class="justify-center">
        <v-col
          dense
          v-for="(news, index) in datanew.slice(0, 3)"
          :key="news.id"
        >
          <indexNewTest
            :id="news.id"
            :name="news.title"
            :detail="news.details"
          />
        </v-col>
      </v-row>
      <v-row class="text-h4 font-weight-bold d-flex justify-center mt-12">
        <a href="/room-selection" class="btn justify-center">SEE MORE</a>
      </v-row>
    </div>

    <indexService />

    <h1 class="text-h4 font-weight-bold mt-12 mb-4 d-flex justify-center">
      บริการจองห้อง
    </h1>
    <p class="mb-4 d-flex justify-center text-center">
      จองห้องเพื่อใช้งานอุปกรณ์ต่างๆภายในห้อง
    </p>

    <!-- <v-row dense v-for="(news, index) in datanew.slice(0, 3)" :key="news.title">
            <indexNew
            :id="news.id"
            :picture="rooms.Picture[0].url"
            :name="news.name"
            :details="news.details"
          />
          </v-row> -->

    <div class="room1 justify-center">
      <v-row class="justify-center mt-12">
        <v-col v-for="(rooms, index) in room.slice(0, 3)" :key="rooms.name">
          <indexAboutUs
            :id="rooms.id"
            :picture="rooms.picture[0].url"
            :name="rooms.name"
            :detail="rooms.details"
          />
        </v-col>
      </v-row>
    </div>

    <v-row class="text-h4 font-weight-bold d-flex justify-center mt-12">
      <a href="/room-selection" class="btn justify-center">SEE MORE</a>
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
      datanew: [],
      image: require('@/static/img/index/ventilation_mono.png'),
    }
  },
  methods: {
    async fetctrooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms')
      let datanew = await this.$store.dispatch('api/public/getAllNews')
      this.room = data.rooms
      this.datanew = datanew.news
      console.log(this.room)
      console.log(this.new)
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
  font-size: 30px;
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
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 2px;
  border-radius: 200px;
  justify-items: center;
  font-size: 20px;
}
</style>
