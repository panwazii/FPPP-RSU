<template>
  <v-app dark>
    <v-main>
      <ModalConfirmLogout
        :open="logout_modal"
        :method="logout"
        message="คุณกำลังจะออกจากระบบ"
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
              @click="goToHomePage('/')"
              class="mx-auto justify-center mb-2"
              :src="require('~/static/img/logo/fppp-logo.png')"
            ></v-img>
          </div>
          <v-divider></v-divider>
          <v-list-item class="mt-2">
            <h4>
              Name :
              {{ $store.getters.getAdmin.fname }}
              {{ $store.getters.getAdmin.lname }}
            </h4>
          </v-list-item>
          <v-list-item class="mt-2">
            <h4>Level : {{ getAdminLevel }}</h4>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav rounded>
          <v-subheader>จัดการทั่วไป</v-subheader>
          <v-list-item-group class="mb-1">
            <div v-for="menus in menu" :key="menus.id" :value="menu">
              <v-list-item :to="menus.path">
                <v-list-item-icon class="mr-0">
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
        <div v-if="$store.getters.getAdmin.type === 'SUPERADMIN'">
          <v-list nav>
            <v-divider class="mx-4" />
            <v-subheader>เฉพาะผู้ดูแลระบบ</v-subheader>
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
            <v-divider class="mx-4" />
          </v-list>
        </div>
      </v-navigation-drawer>
      <v-app-bar transparent fixed app dark elevation="3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <h3>FPPP</h3>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-toolbar-title> {{ navPathName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn text rounded><v-icon>mdi-cog</v-icon></v-btn> -->
        <v-btn @click="logout_modal = true" text rounded
          ><v-icon>mdi-logout-variant</v-icon></v-btn
        >
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
import { goTo } from '../utils/general-utils'
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
        { id: 1, name: 'หน้าหลัก', icon: 'mdi-home', path: '/admin/home' },
        {
          id: 2,
          name: 'จัดการการจอง',
          icon: 'mdi-calendar-check',
          path: '/admin/manage-booking',
        },
        {
          id: 3,
          name: 'จัดการผู้ใช้',
          icon: 'mdi-account-group',
          path: '/admin/manage-user',
        },
        {
          id: 4,
          name: 'จัดการเครื่องมือ',
          icon: 'mdi-tools',
          path: '/admin/manage-equipment',
        },
        {
          id: 5,
          name: 'จัดการข่าว',
          icon: 'mdi-newspaper',
          path: '/admin/manage-news',
        },
        {
          id: 6,
          name: 'จัดการรายการบริการ',
          icon: 'mdi-hand-heart-outline',
          path: '/admin/manage-service',
        },
        {
          id: 7,
          name: 'จัดการข้อมูลเว็บไซต์',
          icon: 'mdi-information-box-outline',
          path: '/admin/manage-webinfo',
        },
        {
          id: 8,
          name: 'จัดการไลน์การผลิต',
          icon: 'mdi-package-variant',
          path: '/admin/manage-productionline',
        },
        {
          id: 9,
          name: 'จัดการอัตราค่าเช่า',
          icon: 'mdi-cash-multiple',
          path: '/admin/manage-equipmentrentrate',
        },
        {
          id: 10,
          name: 'จัดการสต็อคอุปกรณ์',
          icon: 'mdi-toolbox-outline',
          path: '/admin/manage-equipmentstock',
        },
        {
          id: 11,
          name: 'จัดการผู้ผลิต',
          icon: 'mdi-briefcase-account-outline',
          path: '/admin/manage-supplier',
        },
        {
          id: 12,
          name: 'จัดการ Supply stock',
          icon: 'mdi-warehouse',
          path: '/admin/manage-supplystock',
        },
        {
          id: 13,
          name: 'จัดการ Report malfunction',
          icon: 'mdi-warehouse',
          path: '/admin/report-malfunction',
        },
      ],
      super_admin_menu: [
        {
          id: 1,
          name: 'จัดการห้อง',
          icon: 'mdi-home-edit-outline',
          path: '/admin/manage-room',
        },
        {
          id: 2,
          name: 'จัดการผู้ดูแล',
          icon: 'mdi-account-supervisor',
          path: '/admin/manage-admin',
        },
        {
          id: 3,
          name: 'จัดการประเภทผู้ใช้',
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
      this.$router.push('/auth/admin-login')
    },
    goToHomePage() {
      goTo('/')
    },
  },
  computed: {
    navPathName() {
      return this.$store.getters.getPathName
    },
    getAdminLevel() {
      if (this.$store.getters.getAdmin.type === 'SUPERADMIN') {
        return 'super admin'
      } else if (this.$store.getters.getAdmin.type === 'ADMIN') {
        return 'admin'
      }
    },
  },
}
</script>
