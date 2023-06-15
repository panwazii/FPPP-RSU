<template>
  <div>
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text">
          FACULTY OF AGRICULTURAL INNOVATION
        </h1>
        <v-btn rounded depressed>more</v-btn>
      </div>
    </v-parallax>
    {{ rooms }}
    <indexCarousel />
    <v-card
      color="transparent"
      elevation="0"
      max-width="500"
      class="mx-auto justify-center"
    >
      <h1 class="text-h4 font-weight-bold mb-4 d-flex justify-center">Room</h1>
      <p class="mb-4 d-flex justify-center text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        eaque, aliquam ipsum magnam aliquid cum earum ab ex dolore labore
        quaerat maiores totam repellat id, delectus perspiciatis sunt maxime
        hic.
      </p>
    </v-card>
    <div class="room1 mt-10 d-flex justify-center">
      <v-row>
        <v-col
          class="pa-5 mx-0 d-flex justify-center"
          xs="12"
          sm="6"
          md="3"
          v-for="room in rooms"
          :key="room.id"
        >
        <indexRoom
          :picture="room.picture"
          :name="room.name"
        />
        </v-col>
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
    this.rooms = await this.$store.dispatch('api/public/getAllRooms')
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
.room1{
  max-width: 1200px;
  margin: auto;
}
</style>