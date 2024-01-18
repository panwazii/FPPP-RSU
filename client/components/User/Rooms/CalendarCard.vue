<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet>
        <div class="d-flex justify-end mb-4">
          <v-menu bottom right class="rounded-xl">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="rounded-xl" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>เดือน</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>สัปดาห์</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>วัน</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn color="primary" class="ml-2 rounded-xl" @click="setToday">
            วันนี้
          </v-btn>
        </div>
        <div class="d-flex justify-space-between mb-4">
          <v-btn dark class="rounded-xl" @click="prev">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-toolbar-title class="mx-4 font-weight-bold" v-if="$refs.calendar">
            <v-sheet dark class="pa-1 px-4 rounded-xl">{{
              $refs.calendar.title
            }}</v-sheet>
          </v-toolbar-title>
          <v-btn dark class="rounded-xl" @click="next">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
        </div>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          locale="th"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          class="rounded-xl"
        >
          <v-card color="grey lighten-4" min-width="200px" flat>
            <v-toolbar color="primary" dark>
              <v-icon class="mr-2">mdi-clock-time-nine</v-icon>
              <v-toolbar-title>{{
                $moment(selectedEvent.start).format('HH:mm') +
                ' - ' +
                $moment(selectedEvent.end).format('HH:mm')
              }}</v-toolbar-title>
            </v-toolbar>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>
  <script>
export default {
  props: {
    roomId: {
      type: String,
      default: () => '',
    },
  },
  async fetch() {
    const response = await this.$store.dispatch('api/user/getRoomCalendar', {
      params: { id: this.roomId, date: this.focus },
    })
    if (response.code === 200) {
      this.events = response.data
      //   this.loading = false
    } else {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Quotation Not found ' + this.roomId,
      })
      return
    }
  },
  data() {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'เดือน',
        week: 'สัปดาห์',
        day: 'วัน',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      //   return event.color
      return 'green'
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async updateRange() {
      try {
        const response = await this.$store.dispatch(
          'api/user/getRoomCalendar',
          {
            params: { id: this.roomId, date: this.focus },
          }
        )
        this.events = response.data
        //   this.loading = false
      } catch (error) {}

      //   const min = new Date(`${start.date}T00:00:00`)
      //   const max = new Date(`${end.date}T23:59:59`)
      //   const days = (max.getTime() - min.getTime()) / 86400000
      //   const eventCount = this.rnd(days, days + 20)

      //   for (let i = 0; i < eventCount; i++) {
      //     const allDay = this.rnd(0, 3) === 0
      //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //     const second = new Date(first.getTime() + secondTimestamp)

      // events.push({
      //   name: this.names[this.rnd(0, this.names.length - 1)],
      //   start: first,
      //   end: second,
      //   color: this.colors[this.rnd(0, this.colors.length - 1)],
      //   timed: !allDay,
      // })
      //   }

      //   this.events = events
    },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a
    // },
  },
}
</script>