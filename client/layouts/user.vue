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
        <v-list-item to="/user/home" class="mt-2">
          <v-list-item-title>รายการจองทั้งหมด</v-list-item-title>
        </v-list-item>
        <v-list-item to="/user/equipments" class="mt-2">
          <v-list-item-title>Equipment/อุปกรณ์</v-list-item-title>
        </v-list-item>
        <v-list-item to="/user/rooms" class="mt-2">
          <v-list-item-title>Room/ห้องแลป</v-list-item-title>
        </v-list-item>
        <v-list-item to="/user/news" class="mt-2">
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
          <v-spacer v-if="!width" />
          <v-menu v-if="!width" offset-y rounded="xl">
            <template v-slot:activator="{ on, attrs }">
              <v-badge :content="cartItemsCount" offset-x="20" offset-y="20">
                <v-btn color="black" v-bind="attrs" v-on="on" icon>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-badge>
            </template>
            <v-list rounded min-width="300" max-width="350">
              <v-list-item v-if="$store.getters.getCartItems.length === 0">
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-center">
                    no items
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                link
                v-for="item in $store.getters.getCartItems"
                :key="item.id"
              >
                <v-list-item-avatar>
                  <v-img :src="item.equipment.picture" />
                </v-list-item-avatar>
                <v-list-item-content
                  @click="
                    $router.push(`/user/equipments/${item.equipment_info_id}`)
                  "
                >
                  <v-list-item-title>{{
                    item.equipment.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    >สายการผลิต :
                    {{
                      item.equipment.production_line.name
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="$store.dispatch('removeCartItem', item.id)"
                  >
                    <v-icon color="red">mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="$store.getters.getCartItems.length !== 0" />
              <div
                class="d-flex justify-space-between mt-2"
                v-if="$store.getters.getCartItems.length !== 0"
              >
                <v-sheet
                  class="rounded-xl pa-1 text-center"
                  color="grey lighten-2"
                  elevation="0"
                  height="36"
                  width="140"
                >
                  ทั้งหมด {{ $store.getters.getCartItems.length }} ชิ้น
                </v-sheet>
                <v-btn
                  @click="$router.push('/user/cart')"
                  elevation="0"
                  dark
                  class="rounded-xl"
                >
                  จองเลย
                </v-btn>
              </div>
            </v-list>
          </v-menu>
          <v-badge v-if="!width" content="2" offset-x="20" offset-y="20">
            <v-btn color="black" icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
          <v-menu offset-y rounded="xl" v-if="!width">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" icon v-bind="attrs" v-on="on" class="mb-1">
                <v-avatar color="primary" size="32">
                  <span class="white--text text-h6">{{ avatarName }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-list rounded width="200">
              <v-list-item
                link
                v-for="(item, i) in menu"
                :key="i"
                @click="item.actions"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="mx-auto" v-if="width">
            <v-btn class="ml-2" rounded text to="/user/home">
              <h4>รายการจองทั้งหมด</h4>
            </v-btn>
            <v-btn class="ml-2" rounded text to="/user/equipments">
              <h4>Equipment/อุปกรณ์</h4>
            </v-btn>
            <v-btn class="ml-2" rounded text to="/user/rooms">
              <h4>Room/ห้องแลป</h4>
            </v-btn>
            <v-btn class="ml-2" rounded text to="/user/news">
              <h4>News/ข่าวสาร</h4>
            </v-btn>

            <v-menu offset-y rounded="xl">
              <template v-slot:activator="{ on, attrs }">
                <v-badge :content="cartItemsCount" offset-x="20" offset-y="20">
                  <v-btn color="black" v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                </v-badge>
              </template>
              <v-list rounded min-width="300" max-width="350">
                <v-list-item v-if="$store.getters.getCartItems.length === 0">
                  <v-list-item-content>
                    <v-list-item-title class="d-flex justify-center">
                      no items
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  link
                  v-for="item in $store.getters.getCartItems"
                  :key="item.id"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.equipment.picture" />
                  </v-list-item-avatar>
                  <v-list-item-content
                    @click="
                      $router.push(`/user/equipments/${item.equipment_info_id}`)
                    "
                  >
                    <v-list-item-title>{{
                      item.equipment.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >สายการผลิต :
                      {{
                        item.equipment.production_line.name
                      }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="$store.dispatch('removeCartItem', item.id)"
                    >
                      <v-icon color="red">mdi-trash-can</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="$store.getters.getCartItems.length !== 0" />
                <div
                  class="d-flex justify-space-between mt-2"
                  v-if="$store.getters.getCartItems.length !== 0"
                >
                  <v-sheet
                    class="rounded-xl pa-1 text-center"
                    color="grey lighten-2"
                    elevation="0"
                    height="36"
                    width="140"
                  >
                    ทั้งหมด {{ $store.getters.getCartItems.length }} ชิ้น
                  </v-sheet>
                  <v-btn
                    @click="$router.push('/user/cart')"
                    elevation="0"
                    dark
                    class="rounded-xl"
                  >
                    จองเลย
                  </v-btn>
                </div>
              </v-list>
            </v-menu>
            <v-badge content="2" offset-x="20" offset-y="20" class="ml-2">
              <v-btn color="black" icon>
                <v-icon>mdi-bell</v-icon>
              </v-btn>
            </v-badge>
            <v-menu offset-y rounded="xl">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  class="mb-1 ml-2"
                >
                  <v-avatar color="primary" size="32">
                    <span class="white--text text-h6">{{ avatarName }}</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list rounded width="200">
                <v-list-item
                  link
                  v-for="(item, i) in menu"
                  :key="i"
                  @click="item.actions"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
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
      menu: [
        {
          name: 'account',
          icon: 'mdi-account',
          actions: () => {
            this.$router.push('/user/account')
          },
        },
        {
          name: 'support',
          icon: 'mdi-face-agent',
          actions: () => {
            this.$router.push('/user/support')
          },
        },
        {
          name: 'ออกจากระบบ',
          icon: 'mdi-logout-variant',
          actions: () => {
            this.logout()
          },
        },
      ],
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
    avatarName() {
      if (!this.$store.getters.getUser) {
        return '??'
      } else {
        return (
          this.$store.getters.getUser.fname.charAt(0) +
          this.$store.getters.getUser.lname.charAt(0)
        )
      }
    },
    cartItemsCount() {
      return this.$store.getters.getCartItems.length.toString()
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
