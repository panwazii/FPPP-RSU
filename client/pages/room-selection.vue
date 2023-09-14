<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>

    <h1 class="text-h4 font-weight-bold mt-12 d-flex justify-center">
      ห้องปฏิบัติการ
    </h1>

    <v-row
      class="text-h4 font-weight-bold mt-2 d-flex justify-center"
      v-for="(rooms, index) in room"
      :key="rooms.name"
      ><roomRoomselect
        :id="rooms.id"
        :picture="rooms.Picture[0].url"
        :name="rooms.name"
        :detail="rooms.details"
      />
    </v-row>
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
