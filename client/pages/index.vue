<template>
  <div>
    <!-- <h1>{{ $store.getters.getCartItems }}</h1>
    <v-btn @click="$store.dispatch('addCartItems', { id: 1, name: 'test1' })">cart add</v-btn>
    <v-btn @click="$store.dispatch('removeCartItems', 1)">cart remove</v-btn> -->
    <v-card class="rounded-xl">
      <!-- <v-parallax
        height="750"
        :src="require('~/static/img/index/index-bg.jpg')"
      > -->
        <!-- <div
          class="d-flex flex-column fill-height justify-center align-center text-white"
        >
          <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
        </div> -->
      <!-- </v-parallax> -->
      <v-img :src="require('~/static/img/index/index-bg.jpg')">

      </v-img>
    </v-card>

    <h1 class="text-h4 font-weight-bold d-flex justify-center mt-12">
      ข่าวสาร
    </h1>
    <p class="d-flex justify-center text-center">ข่าวสารล่าสุดจากเว็บไซต์</p>
    <div class="justify-center card-width">
      <v-row class="justify-center">
        <v-col
          cols="12"
          md="4"
          dense
          v-for="news in allNews.slice(0, 3)"
          :key="news.id"
        >
          <indexNews :id="news.id" :name="news.title" :detail="news.details" />
        </v-col>
      </v-row>
      <div class="d-flex justify-center">
        <v-btn
          large
          dark
          class="mt-12 rounded-xl text-h5"
          @click="$router.push('/news')"
          >ดูเพิ่มเติม</v-btn
        >
      </div>
    </div>
    <v-lazy
      v-model="lazyService"
      transition="fade-transition"
      :options="{
        threshold: 1,
      }"
    >
      <div style="margin-top: 100px">
        <indexService />
      </div>
    </v-lazy>

    <v-lazy
      v-model="lazyRoom"
      transition="fade-transition"
      :options="{
        threshold: 1,
      }"
    >
      <div style="margin-top: 100px">
        <h1 class="text-h4 font-weight-bold mt-12 d-flex justify-center">
          บริการจองห้อง
        </h1>
        <p class="d-flex justify-center text-center">
          จองห้องเพื่อใช้งานอุปกรณ์ต่างๆภายในห้อง
        </p>
        <div class="card-width">
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="12"
              xs="12"
              v-for="rooms in room.slice(0, 3)"
              :key="rooms.name"
            >
              <IndexRoomReservation
                :id="rooms.id"
                :picture="rooms.picture[0].url"
                :name="rooms.name"
                :detail="rooms.details"
              />
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn
              large
              dark
              class="mt-12 rounded-xl text-h5"
              @click="$router.push('/rooms')"
              >ดูเพิ่มเติม</v-btn
            >
          </div>
        </div>
      </div>
    </v-lazy>

    <v-lazy
      v-model="lazyRoom"
      transition="fade-transition"
      :options="{
        threshold: 1,
      }"
    >
      <div style="margin-top: 100px">
        <indexContact />
      </div>
    </v-lazy>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
  mounted() {
    this.fetctrooms()
  },
  data() {
    return {
      room: [],
      allNews: [],
      lazyService: false,
      lazyRoom: false,
      lazyContact: false,
    }
  },
  methods: {
    async fetctrooms() {
      let data = await this.$store.dispatch('api/public/getAllRooms', {
        params: {
          value: '',
        },
      })
      let allNews = await this.$store.dispatch('api/public/getAllNews', {
        params: {
          value: '',
        },
      })
      this.room = data.rooms
      this.allNews = allNews.news
      console.log('this is room,', this.room)
      console.log('this is new', this.new)
    },
    goto(routeName) {
      this.$router.push(routeName)
    },
  },
}
</script>
<style scoped>
.paralax-text {
  text-shadow: 2px 2px #000000;
}
.card-width {
  max-width: 1200px;
  margin: auto;
}

.v-parallax__image {
  transform: none !important;
  width: 100% !important;
}
</style>
