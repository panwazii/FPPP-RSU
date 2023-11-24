<template>
  <div>
    <section>
      <div class="grid">
        <header class="page-header content-header">
          <H3>CATEGORIES /</H3>
        </header>
        <footer class="page-footer content-footer">
          <div class="box footerHeader"><H1>คุณสมบัติ</H1></div>
          <div>
            <h3 class="footerHeader">รายละเอียด {{ room[0].details }}</h3>
          </div>
        </footer>
        <div class="page-leftbar content-left">
          <H1>{{ room[0].name }}</H1>
          <img class="centerimg" :src="room[0].picture[0].url" />
        </div>
        <div class="page-main content-main">
          <H3>{{ room[0].name }}</H3>
          <div id="textbox">
            <p class="alignleft">ราคา</p>
            <p class="aligncenter">{{ room[0].rent_price }}</p>
            <p class="alignright">บาท</p>
          </div>
          <v-divider></v-divider>
          <button class="button-28" role="button">จองเลย</button>
          <v-divider class="mt-5"></v-divider>
        </div>
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
      this.room = room.room
      console.log('this is equipment', room)
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
.footerHeader {
  padding-left: 10px;
}
.button-28 {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 150px;
  will-change: transform;
  margin-top: 20px;
}

.button-28:disabled {
  pointer-events: none;
}

.button-28:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}

#textbox {
  display: flex;
  flex-flow: row wrap;
}

.alignleft {
  padding-left: 20px;
  padding-top: 30px;
  width: 33.33333%;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
}
.aligncenter {
  width: 33.33333%;
  text-align: center;
  font-size: 50px;
  font-weight: 900;
  padding-top: 10px;
}
.alignright {
  font-size: 30px;
  padding-right: 20px;
  padding-top: 30px;
  width: 33.33333%;
  text-align: right;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: minmax(600px, auto) auto;
  grid-template-rows: 50px minmax(600px, auto) 200px;
  grid-template-areas: 'header header' 'leftbar main' 'footer footer';
}

.page-header {
  grid-area: header;
}
.page-leftbar {
  grid-area: leftbar;
}
.page-main {
  grid-area: main;
}
.page-footer {
  grid-area: footer;
}

.content-header {
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
}

.content-left {
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-left: 30px;
}

.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.box {
  background-color: #d1d0d0;
}

img {
  object-fit: fill;
  border-radius: 50px;
  max-width: 550px;
  max-height: 550px;
}

.content-main {
  background-color: white;
  border: 4px solid rgb(117, 117, 203);
  box-sizing: border-box;
  padding: 10px;
  justify-items: center;
  text-align: center;
}

.content-main h3 {
  font-size: 30px;
}

.content-footer {
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
}
</style>
