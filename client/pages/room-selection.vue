<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>

    <h1 class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center">
      ห้องปฏิบัติการ
    </h1>

    <v-row
      class="text-h4 font-weight-bold mt-2 mr-sm-16 d-flex justify-center"
      v-for="(rooms, index) in room"
      :key="rooms.name"
      ><roomRoomselect
        :id="rooms.id"
        :picture="rooms.picture"
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
    },
  },
}
</script>
