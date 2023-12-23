<template>
  <div>
    <SharedBreadCrumbs title="จองห้อง" :routes="routes" />
    <v-card min-height="500" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        {{ room.name }}
      </v-card-title>
      <v-skeleton-loader v-if="loading" type="card-heading"></v-skeleton-loader>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-img
            contain
            aspect-ratio="1.3333"
            width="640"
            height="480"
            :src="picture"
            :lazy-src="require('~/static/img/default/no-image.png')"
            class="rounded-xl"
          />
        </v-col>
      </v-row>
      <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>
    </v-card>
    <v-card min-height="300" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        ตารางการใช้งาน
      </v-card-title>
      <v-card-text>
        <v-sheet tile height="54" class="d-flex mb-2">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="calenda.type"
            :items="calenda.types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="type"
          ></v-select>
          <v-select
            v-model="calenda.mode"
            :items="calenda.modes"
            dense
            outlined
            hide-details
            label="event-overlap-mode"
            class="ma-2"
          ></v-select>
          <v-select
            v-model="calenda.weekday"
            :items="calenda.weekdays"
            dense
            outlined
            hide-details
            label="weekdays"
            class="ma-2"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet max-height="600">
          <v-calendar
            ref="calendar"
            v-model="calenda.value"
            :weekdays="calenda.weekday"
            :type="calenda.type"
            :events="calenda.events"
            :event-overlap-mode="calenda.mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            @change="getEvents"
          ></v-calendar>
        </v-sheet>
      </v-card-text>
    </v-card>
    <v-card min-height="300" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        ข้อมูลผู้จอง
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              class="rounded-xl"
              outlined
              :label="$store.getters.getUser.fname"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="rounded-xl"
              outlined
              :label="$store.getters.getUser.lname"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="rounded-xl"
              outlined
              :label="$store.getters.getUser.email"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="rounded-xl"
              outlined
              :label="$store.getters.getUser.tel"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card min-height="300" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        ระยะเวลาการจอง
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              class="rounded-xl"
              outlined
              label="start"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="rounded-xl"
              outlined
              label="end"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card min-height="300" class="rounded-xl mt-2 pa-4">
      <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
        อุปกรณ์
      </v-card-title>
      <v-card-text>
        <v-card v-for="i in 5" :key="i" class="rounded-xl mb-2">
          <v-card-title> อุปกรณ์ {{ i + 1 }} </v-card-title>
        </v-card>
      </v-card-text>
      <div class="d-flex justify-center">
        <v-btn class="rounded-xl">add more</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    if (!room) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room[0]
      this.routes[2].name = room.room[0].name
      this.loading = false
    }
  },
  computed: {
    picture() {
      try {
        if (!this.room.picture[0]) {
          return require('~/static/img/default/no-image.png')
        } else {
          return this.room.picture[0].url
        }
      } catch (error) {
        return require('~/static/img/default/no-image.png')
      }
    },
  },
  data() {
    return {
      room: {},
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ห้องแลป', to: '/user/rooms' },
        { id: 3, name: '', to: `/user/rooms/${this.$route.params.id}` },
        { id: 4, name: 'จอง', to: '/' },
      ],
      loading: true,
      modal: {
        goToLogin: {
          open: false,
          message: 'กรุณาเข้าสู่ระบบเพื่อใช้งานบริการทั้งหมด',
        },
      },
      calenda: {
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
          { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
          { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
          { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
          { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        events: [],
        colors: [
          'blue',
          'indigo',
          'deep-purple',
          'cyan',
          'green',
          'orange',
          'grey darken-1',
        ],
        names: [
          'Meeting',
          'Holiday',
          'PTO',
          'Travel',
          'Event',
          'Birthday',
          'Conference',
          'Party',
        ],
      },
    }
  },
  methods: {
    getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.calenda.names[this.rnd(0, this.calenda.names.length - 1)],
            start: first,
            end: second,
            color: this.calenda.colors[this.rnd(0, this.calenda.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.calenda.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
  },
}
</script>
<style scoped>
</style>