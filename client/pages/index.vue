<template>
  <div>
    <!-- <h1>{{ $store.getters.getCartItems }}</h1>
    <v-btn @click="$store.dispatch('addCartItems', { id: 1, name: 'test1' })">cart add</v-btn>
    <v-btn @click="$store.dispatch('removeCartItems', 1)">cart remove</v-btn> -->
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text"></h1>
      </div>
    </v-parallax>
    <indexAbout />
    <indexService />

    <h1 class="text-h4 font-weight-bold mb-4 d-flex justify-center">
      บริการจองห้อง
    </h1>
    <p class="mb-4 d-flex justify-center text-center">
      จองห้องเพื่อใช้งานอุปกรณ์ต่างๆภายในห้อง
    </p>

    <div class="room1 justify-center">
      <v-row class="justify-center mt-12">
        <v-col v-for="(rooms, index) in room.slice(0, 3)" :key="rooms.name">
          <indexAboutUs
            :id="rooms.id"
            :picture="rooms.Picture[0].url"
            :name="rooms.name"
            :detail="rooms.details"
          />
        </v-col>
      </v-row>
    </div>

    <v-row class="text-h4 font-weight-bold d-flex justify-center mt-12">
      <a href="/room-selection" class="btn justify-center">ROOMS</a>
    </v-row>

    <v-row class="mt-12">
      <v-card width="800" class="mx-auto" outlined>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="text-h5"> ข่าว 1 </v-card-title>

                <v-card-subtitle
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequatur quidem obcaecati reiciendis ipsum explicabo
                  numquam ad pariatur nulla aperiam delectus.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn variant="text"> อ่านเพิ่มเติม </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="text-h5"> ข่าว 1 </v-card-title>

                <v-card-subtitle
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequatur quidem obcaecati reiciendis ipsum explicabo
                  numquam ad pariatur nulla aperiam delectus.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn variant="text"> อ่านเพิ่มเติม </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="text-h5"> ข่าว 1 </v-card-title>

                <v-card-subtitle
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequatur quidem obcaecati reiciendis ipsum explicabo
                  numquam ad pariatur nulla aperiam delectus.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn variant="text"> อ่านเพิ่มเติม </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="text-h4 font-weight-bold d-flex justify-center mb-1">
            <a href="/room-selection" class="btn justify-center">NEWS</a>
          </v-row>
        </v-container>
      </v-card>
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
      image: require('@/static/img/index/ventilation_mono.png'),
      items: [
        { type: 'subheader', title: 'Today' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle:
            '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle:
            '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
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
  font-size: 40px;
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
  background-color: rgb(58, 52, 52);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 2px;
  border-radius: 200px;
  justify-items: center;
}
</style>
