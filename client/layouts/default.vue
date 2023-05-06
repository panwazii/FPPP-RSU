<template>
  <v-app dark>
    <v-main>
      <v-app-bar fixed app color="grey" elevation="0" hide-on-scroll>
        <img
          src="~/assets/logo/rsu-logo.png"
          class="ma-1"
          width="auto"
          height="50"
        />
        <h3>FPPP</h3>
        <v-spacer></v-spacer>
        <v-btn rounded text to="/"> <h4>Home/หน้าหลัก</h4></v-btn>
        <v-btn rounded text to="/room-selection"> <h4>Room/ห้องแลป</h4></v-btn>
        <v-btn rounded text><h4>Contact/ติดต่อ</h4></v-btn>
        <v-btn rounded depressed to="/login"><h4>Login</h4></v-btn>
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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
