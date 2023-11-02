<template>
  <v-app dark>
    <ModalConfirmLogout :open="logout_modal" :method="logout" message="are you sure about that son ?"
      :confirmLogout.sync="logout_modal" />
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list class="mt-0 pt-0">
        <div>
          <v-img @click="goToHomePage('/')" class="mx-auto justify-center mb-2"
            :src="require('~/static/img/logo/fppp-logo.png')"></v-img>
        </div>
        <v-divider></v-divider>
        <v-list-item class="mt-2">
          <h4>
            test
          </h4>
        </v-list-item>
        <v-list-item class="mt-2">
          <h4>
            test
          </h4>
        </v-list-item>
        <v-list-item class="mt-2">
          <h4>
            test
          </h4>
        </v-list-item>
        <v-list-item class="mt-2">
          <h4>
            test
          </h4>
        </v-list-item>
        <v-list-item class="mt-2">
          <!-- <v-icon class="mr-2">mdi-shield-account</v-icon> -->
          <!-- <h4>Level : {{ getAdminLevel }}</h4> -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar transparent fixed app :color="bg" elevation="3">
        <v-img max-width="250" class="mx-auto mt-10" :src="require('~/static/img/logo/fppp-logo.png')"></v-img>
        <template class="mt-10" v-slot:extension>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-spacer></v-spacer>
          <v-btn rounded text to="/">
            <h4>Home/หน้าหลัก</h4>
          </v-btn>
          <v-btn class="ml-2" rounded text to="/equipments">
            <h4>Equipment/อุปกรณ์</h4>
          </v-btn>
          <v-btn class="ml-2" rounded text to="/room-selection">
            <h4>Room/ห้องแลป</h4>
          </v-btn>

          <v-btn v-if="$store.getters.getAdmin === null" class="ml-2" rounded depressed to="/login">
            <h4>Login</h4>
          </v-btn>
          <v-btn v-if="$store.getters.getAdmin !== null" class="ml-2" rounded depressed to="/admin/home">
            <h4>กลับหน้าจัดการ</h4>
          </v-btn>
          <v-btn v-if="$store.getters.getAdmin !== null" @click="logout_modal = true" text rounded
            class="ml-2"><v-icon>mdi-logout-variant</v-icon></v-btn>
        </template>
      </v-app-bar>
      <Nuxt />
    </v-main>

    <v-footer class="pa-0" height="30">
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
      fixed: false,
      drawer: false,
      miniVariant: false,
      clipped: false,
      bg: '#78909C',
      logout_modal: false
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
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/admin-login')
    },
  },
  mounted() {
    window.onscroll = () => {
      this.changeColor()
    }
  },
}
</script>
