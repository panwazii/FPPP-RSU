<!-- <template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="justify-center">
      <IndexReservations
        :open="Reservations"
        :data="room"
        :Reservations.sync="Reservations"
      />
      <v-card class="maincard pa-6 rounded-lg">
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
              <v-img class="pictureincard" :src="room.picture"></v-img>
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
        <roomHoverCard :picture="equipments.picture" :name="equipments.name" />
      </v-col>
    </v-row>
  </div>
</template> -->

<template>
  <div>
    <section>
      <div class="bottom-right"></div>
      <div class="card">
        <v-card class="cardinfo">
          <div class="cardcontainer">
            <v-card-text>
              <div>
                <!-- <span class="right h1">{{ equipment.name }}</span> -->
              </div>
              <div class="mt-5">
                <h2>
                  {{ room }}
                </h2>
              </div>
            </v-card-text>

            <v-btn class="rounded-xl mt-12 mx-2" width="300" color="#6A5F49">
              <h1 class="text">CATEGORIES</h1></v-btn
            >
            <v-btn
              class="right rounded-xl mt-12 mx-12"
              width="300"
              color="#6A5F49"
            >
              <h1 class="text">ADD TO CART</h1></v-btn
            >
          </div>
        </v-card>
      </div>
    </section>
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

    if (room == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.Data
    }
  },
  data() {
    return {
      room: {},
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

<style scoped>
.text {
  color: #ffffff;
}
section {
  top: 0;
  min-height: 100vh;
  width: 100%;
  display: grid;
  background-color: #ffffff;
  position: relative;
}

section .bottom-right {
  top: 100px;
  right: -40px;
  padding: 1rem;
  position: absolute;
  background: rgb(106, 95, 73);
  border-radius: 40px;
  width: 80%;
  height: 15%;
  color: #ffffff;
  /* center overlay text */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
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

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 70%;
  max-height: 500px;
}

.card {
  margin: auto;
  width: 80%;
  height: 80%;
  padding: 10px;
}

.cardinfo {
  margin: auto;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(0, 0, 0);
  padding: 10px;
  border-radius: 100px;
}

.cardcontainer {
  margin: auto;
  margin-top: 50px;
  width: 80%;
  height: 90%;
  position: relative;
}
.right {
  position: absolute;
  right: 0px;
  width: 300px;
  padding: 10px;
}
.h1 {
  font-family: verdana;
  font-size: 150%;
}
</style>
