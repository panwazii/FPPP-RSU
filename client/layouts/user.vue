<template>
  <v-app dark>
    <ModalConfirmLogout
      :open="logout_modal"
      :method="logout"
      message="are you sure about that son ?"
      :confirmLogout.sync="logout_modal"
    />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="!width"
    >
      <v-list class="mt-0 pt-0">
        <div>
          <v-img
            @click="goToHomePage('/')"
            class="mx-auto justify-center mb-2"
            :src="require('~/static/img/logo/fppp-logo.png')"
          ></v-img>
        </div>
        <v-divider></v-divider>
        <v-list-item to="/equipments" class="mt-2">
          <v-list-item-title>Equipment/อุปกรณ์</v-list-item-title>
        </v-list-item>
        <v-list-item to="/rooms" class="mt-2">
          <v-list-item-title>Room/ห้องแลป</v-list-item-title>
        </v-list-item>
        <v-list-item to="/news" class="mt-2">
          <v-list-item-title>News/ข่าวสาร</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar hide-on-scroll transparent fixed app :color="bg" elevation="3">
        <v-img
          max-width="250"
          class="mx-auto mt-10 mb-8"
          :src="require('~/static/img/logo/fppp-logo.png')"
        ></v-img>
        <template v-slot:extension>
          <v-app-bar-nav-icon v-if="!width" @click.stop="drawer = !drawer" />
          <div class="mx-auto" v-if="width">
            <v-btn class="ml-2" rounded text to="/user/equipments">
              <h4>Equipment/อุปกรณ์</h4>
            </v-btn>
            <v-btn class="ml-2" rounded text to="/user/rooms">
              <h4>Room/ห้องแลป</h4>
            </v-btn>
            <v-btn class="ml-2" rounded text to="/user/news">
              <h4>News/ข่าวสาร</h4>
            </v-btn>
            <v-badge class="ml-6" content="6" offset-x="20" offset-y="20">
              <v-btn rounded text>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
            <!-- <v-btn icon>
              <v-avatar color="primary" class="mb-1" size="32">
                <span class="white--text text-h6">CJ</span>
              </v-avatar>
            </v-btn> -->
            <v-menu offset-y rounded="xl">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                  <v-avatar color="primary" class="mb-1" size="32">
                    <span class="white--text text-h6">CJ</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list rounded class="py-0">
                <v-list-item link v-for="(item, i) in menu" :key="i" class="my-0 pa-0">
                  <v-list-item-icon class="pt-0">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="pt-0 pb-0">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <!-- <v-btn @click="logout_modal = true" class="ml-2" rounded text>
              <h4>ออกจากระบบ</h4>
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn> -->
          </div>
        </template>
      </v-app-bar>
      <v-container>
        <Nuxt />
      </v-container>
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
      fixed: false,
      drawer: false,
      miniVariant: false,
      clipped: false,
      bg: '#FFFFFF',
      logout_modal: false,
      menu: [{ name: 'ออกจากระบบ', icon: 'mdi-logout-variant' },{ name: 'account', icon: 'mdi-account' }],
    }
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return false
        case 'sm':
          return false
        case 'md':
          return true
        case 'lg':
          return true
        case 'xl':
          return true
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/auth/login')
    },
  },
}
</script>
