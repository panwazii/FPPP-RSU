<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>

    <h1 class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center">
      ห้องปฏิบัติการ
    </h1>

    <v-row
      class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center"
      v-for="(rooms, index) in room"
      :key="rooms.name"
    >
      <!-- <v-card width="1020" height="220">
        <div class="d-flex flex-no-wrap justify-space-between rounded-lg">
          <div>
            <v-card-title class="text-h5"> {{ room }} </v-card-title>

            <v-card-subtitle
              >ไม่ต้องการเกย์เป็นใหญ่ เราคนจีนจงเจริญ ไม่ต้องการเกย์เป็นใหญ่
              เราคนจีนจงเจริญ ไม่ต้องการเกย์เป็นใหญ่ เราคนจีนจงเจริญ
              ไม่ต้องการเกย์เป็นใหญ่ เราคนจีนจงเจริญ</v-card-subtitle
            >

            <v-card-actions>
              <v-btn
                class="rounded-xl"
                variant="text"
                color="white"
                @click="$router.push('/room/' + room)"
              >
                รายละเอียดเพิ่มเติม
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="mt-12 mr-sm-16 rounded-xl" size="125">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            ></v-img>
          </v-avatar>
        </div>
      </v-card> -->
      <roomRoomselect
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
  mounted(){
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
