<template>
  <div>
    <section>
      <div class="container">
        <div class="left">
          <h1 class="center">FOOD PROCESS PILOT PLANT</h1>
        </div>
        <div class="right"></div>
      </div>
    </section>
    <indexAbout />
    <indexService />
    <section>
      <v-img class="overlay" width="600" :src="image" />
      <v-row class="justify-center">
        <span class="roomcenter"> <h1>ROOM</h1></span>
        <v-col v-for="(rooms, index) in room.slice(0, 3)" :key="rooms.name">
          <indexRoomIndex
            :id="rooms.id"
            :picture="rooms.Picture[0].url"
            :name="rooms.name"
            :detail="rooms.details"
          />
        </v-col>
      </v-row>

      <a href="/room-selection" class="btn">ROOMS</a>
    </section>

    <indexNews />
    <indexContact />
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
.overlay {
  position: absolute;
  top: 30%;
  right: 50%;
  width: 100%;
  text-align: center;
  z-index: 0;
}

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
}

.roomcenter {
  padding: 300px 260px;
  font-family: Tahoma (sans-serif);
  font-size: 40px;
  text-align: center;
  color: rgb(106, 95, 73);
  z-index: 1;
}
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
}
</style>
