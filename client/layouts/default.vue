<template>
  <v-app dark>
    <v-main>
      <v-app-bar height="60px" color="#fbba00" :elevation="2">
        <img
          src="~/assets/logo/rsu-logo.png"
          class="ma-1"
          width="auto"
          height="50"
        />
        <h3>FPPP</h3>
        <v-spacer></v-spacer>
        <v-btn rounded text> Home</v-btn>
        <v-btn rounded text>Room</v-btn>
        <v-btn rounded text>Contact</v-btn>
        <v-btn rounded depressed>Login</v-btn>
      </v-app-bar>
        <Nuxt />
    </v-main>

    <v-footer  class="pa-0" height="30">
      <v-spacer></v-spacer>
      <span class="mr-1">FPPP &copy; {{ new Date().getFullYear() }} developed by DIT CS</span>
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
