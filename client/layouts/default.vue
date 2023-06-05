<template>
  <v-app dark>
    <v-main>
      <v-app-bar transparent fixed app :color="bg" elevation="3">
        <img
          src="~/static/img/logo/rsu-logo.png"
          class="ma-1"
          width="auto"
          height="50"
        />
        <h3>FPPP</h3>
        <v-spacer></v-spacer>
        <v-btn rounded text to="/"> <h4>Home/หน้าหลัก</h4></v-btn>
        <v-btn class="ml-2" rounded text to="/room-selection"> <h4>Room/ห้องแลป</h4></v-btn>
        <v-btn class="ml-2" rounded depressed to="/login"><h4>Login</h4></v-btn>
      </v-app-bar>
      <Nuxt />
    </v-main>

    <v-footer class="pa-0" height="30">
      <v-spacer></v-spacer>
      <span class="mr-1"
        >FPPP &copy; {{ new Date().getFullYear() }} developed by DIT CS</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      bg: '#78909C',
      fixed: false,
    }
  },
  methods: {
    changeColor() {
      if (document.documentElement.scrollTop <= 100) {
        this.bg = '#78909C'
      } else if (document.documentElement.scrollTop < 100) {
        this.bg = 'transparent'
      } else {
        this.bg = 'transparent'
      }
    },
  },
  mounted() {
    window.onscroll = () => {
      this.changeColor()
    }
  },
}
</script>
