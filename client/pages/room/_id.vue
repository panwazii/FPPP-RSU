<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="justify-center">
      <IndexReservations
        :open="Reservations"
        :data="room"
        :Reservations.sync="Reservations"
      />
      <v-card class="pa-6 rounded-lg" width="1100" height="400">
        <h1 align="left" class="amber--text pa-1"></h1>
        <v-form ref="form" lazy-validation>
          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <h1>{{ room.name }}</h1>
              {{ room.details }}

              <v-card-actions class="justify-left">
                <v-btn color="primary" @click="openReservationsModal(room.id)">
                  Reservations
                </v-btn>
                <IndexCalender class="mx-2" />
              </v-card-actions>
            </v-col>
            <v-col cols="12" sm="6">
              <v-avatar class="ml-16 rounded-xl" size="300">
                <v-img :src="room.picture"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="justify-center mt-16">
      <h1>อุปกรณ์</h1>
    </v-row>

    <v-row class="justify-center mt-6 mb-16">
      อุปกรณ์ภายในห้องปฏิบัติการณ์
    </v-row>

    <v-row class="justify-center mt-6 mb-16">
      <v-col
        class="pa-5 mx-0 d-flex justify-center"
        xs="12"
        md="2"
        v-for="equipments in tool"
        :key="equipments.id"
      >
        <roomEquipmentCard
          :picture="equipments.picture"
          :name="equipments.name"
        />
      </v-col>
    </v-row>

    <!-- <v-row class="text-h4 font-weight-bold mt-12 justify-center">
      <v-col cols="12" sm="1" v-for="(tools, i) in tools" :key="i">
        <v-card class="mx-auto rounded-xl" max-width="344">
          <v-img
            src="https://media.istockphoto.com/id/92042654/photo/cute-girl-in-shock.jpg?s=1024x1024&w=is&k=20&c=BiNPkb1OZMSF5hDAZ1r3ZNQr4BXNwj1f4j8wGZM_Q9U="
            height="200px"
            cover
          ></v-img>

          <v-card-title class="justify-center">
            <h1>{{ tools }}</h1>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    let tool = await this.$store.dispatch('api/public/getAllEquipmentByRoom', {
      params: { id: this.id },
    })
    if (room == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.Data
      this.tool = tool.equip
    }
  },
  data() {
    return {
      room: {},
      tool: [],
      Reservations: false,
      dialog: false,
    }
  },
  methods: {
    async openReservationsModal(id) {
      this.Reservations = true
    },
  },
}
</script>

<style>
.myclass.v-sheet.v-card {
  border-width: 0px;
}
</style>
