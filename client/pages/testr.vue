<template>
  <div>
    <indexRoomFirst />
    <section>
      <v-row class="justify-center">
        <v-col v-for="(rooms, index) in room" :key="rooms.name">
          <indexRoomList
            :id="rooms.id"
            :picture="rooms.Picture[0].url"
            :name="rooms.name"
            :detail="rooms.details"
          />
        </v-col>
      </v-row>
    </section>
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
      image: require('@/static/img/index/clerk_man_mono.png'),
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
section {
  top: 0;
  min-height: 100vh;
  width: 100%;
  display: grid;
  background-color: #ffffff;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: -200px;
  height: 2200px;
  font-weight: bold;
  z-index: 0;
}

.container {
  max-width: 70%;
  margin: 100px auto;
}
</style>
