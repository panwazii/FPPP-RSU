<template>
  <v-app dark>
    <v-main>
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
      >
        <v-list class="mt-0 pt-0">
          <div>
            <v-img
              class="mx-auto justify-center mb-2"
              width="100px"
              height="130px"
              :src="require('~/static/img/logo/rsu-logo.png')"
            ></v-img>
          </div>
          <!-- <div class="mt-0 pt-0">
            <v-img
              :src="require('../assets/biofarm-bg.jpg')"
              height="130px"
              dark
            ></v-img>
          </div> -->
          <v-divider></v-divider>
          <v-list-item class="mt-2">
            <!-- <v-icon class="mr-2">mdi-shield-account</v-icon> -->
            <h4>
              Name :
              {{ $store.getters.getAdmin.fname }}
              {{ $store.getters.getAdmin.lname }}
            </h4>
          </v-list-item>
          <v-list-item class="mt-2">
            <!-- <v-icon class="mr-2">mdi-shield-account</v-icon> -->
            <h4>Level : {{ getAdminLevel }}</h4>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item-group class="mb-1">
            <div v-for="menus in menu" :key="menus.id" :value="menu">
              <v-list-item :to="menus.path">
                <v-list-item-icon>
                  <v-icon>{{ menus.icon }} </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="ml-2">
                    {{ menus.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
        <div v-if="$store.getters.getAdmin.type_id === 1">
          <v-divider></v-divider>
          <v-list nav>
            <v-list-item-group class="mb-1">
              <div
                v-for="super_admin_menus in super_admin_menu"
                :key="super_admin_menus.id"
                :value="menu"
              >
                <v-list-item :to="super_admin_menus.path">
                  <v-list-item-icon>
                    <v-icon>{{ super_admin_menus.icon }} </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="ml-2">
                      {{ super_admin_menus.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
          </v-list>
          <v-divider></v-divider>
        </div>
      </v-navigation-drawer>
      <v-app-bar transparent fixed app :color="bg" elevation="3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!-- <img
          src="~/static/img/logo/rsu-logo.png"
          class="ma-1"
          width="auto"
          height="50"
        /> -->
        <h3>FPPP</h3>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-toolbar-title> {{ navPathName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text rounded><v-icon>mdi-cog</v-icon></v-btn>
        <v-btn @click="logout_modal = true" text rounded
          ><v-icon>mdi-logout-variant</v-icon></v-btn
        >
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
  name: 'AdminLayout',
  data() {
    return {
      bg: '#78909C',
      fixed: false,
      drawer: false,
      miniVariant: false,
      clipped: false,
      logout_modal: false,
      menu: [
        { id: 1, name: 'Home', icon: 'mdi-home', path: '/admin/home' },
        {
          id: 2,
          name: 'Manage user',
          icon: 'mdi-account-group',
          path: '/admin/manage-user',
        },
        {
          id: 3,
          name: 'Manage equipment',
          icon: 'mdi-tools',
          path: '/admin/manage-equipment',
        },
        {
          id: 4,
          name: 'Manage news',
          icon: 'mdi-newspaper',
          path: '/admin/manage-news',
        },
        {
          id: 5,
          name: 'Manage Service',
          icon: 'mdi-hand-heart-outline',
          path: '/admin/manage-service',
        },
        {
          id: 6,
          name: 'Manage Web Info',
          icon: 'mdi-information-box-outline',
          path: '/admin/manage-webinfo',
        },
        {
          id: 7,
          name: 'Manage Production line',
          icon: 'mdi-package-variant',
          path: '/admin/manage-productionline',
        },
        {
          id: 8,
          name: 'Manage Equipment rent rate',
          icon: 'mdi-cash-multiple',
          path: '/admin/manage-equipmentrentrate',
        },
        {
          id: 9,
          name: 'Manage Equipment stock',
          icon: 'mdi-toolbox-outline',
          path: '/admin/manage-equipmentstock',
        },
        // {
        //   id: 10,
        //   name: 'Manage Reserve',
        //   icon: 'mdi-adjust',
        //   path: '/admin/manage-reserve',
        // },
        {
          id: 11,
          name: 'Manage Supplier',
          icon: 'mdi-adjust',
          path: '/admin/manage-supplier',
        },
        {
          id: 12,
          name: 'Manage Supply stock',
          icon: 'mdi-adjust',
          path: '/admin/manage-supplystock',
        },
      ],
      super_admin_menu: [
        {
          id: 1,
          name: 'Manage room',
          icon: 'mdi-home-edit-outline',
          path: '/admin/manage-room',
        },
        {
          id: 2,
          name: 'Manage admin',
          icon: 'mdi-account-supervisor',
          path: '/admin/manage-admin',
        },
        {
          id: 3,
          name: 'Manage user types',
          icon: 'mdi-account-star',
          path: '/admin/manage-user-type',
        },
      ],
      path_name: '',
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/admin-login')
    },
  },
  computed: {
    navPathName() {
      return this.$store.getters.getPathName
    },
    getAdminLevel() {
      if (this.$store.getters.getAdmin.type_id === 1) {
        return 'super admin'
      } else if (this.$store.getters.getAdmin.type_id === 2) {
        return 'admin'
      }
    },
  },
}
</script>
