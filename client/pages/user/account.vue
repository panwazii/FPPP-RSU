<template>
  <div>
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :method="refresh"
      :complete.sync="completeModal"
    />
    <ModalError
      :open="errorModal"
      :message="errorMessage"
      :method="refresh"
      :error.sync="errorModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <SharedBreadCrumbs title="จัดการข้อมูลส่วนตัว" :routes="routes" />
    <v-card class="rounded-xl pa-6" elevation="4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title> ข้อมูลส่วนตัว </v-card-title>
        <v-card-subtitle class="subtitle-1 mb-4">
          สามารถแก้ไขข้อมูลส่วนตัวได้
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.fname"
                outlined
                label="ชื่อจริง"
                :rules="firstName"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.lname"
                outlined
                label="นามสกุล"
                :rules="lastName"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.tel"
                outlined
                label="เบอร์ติดต่อ"
                :rules="tel"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.email"
                outlined
                label="อีเมล"
                :rules="email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.type_id"
                outlined
                label="ประเภทผู้ใช้"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.created_at"
                outlined
                label="สร้างเมื่อ"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="UserInfo.update_at"
                outlined
                label="อัพเดทล่าสุด"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="my-5"></v-divider>
          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn
              v-if="!edit"
              color="primary"
              class="rounded-xl mr-4"
              @click="edit = true"
            >
              <v-icon>mdi-pencil</v-icon>
              edit
            </v-btn>
            <v-btn
              v-if="edit"
              :disabled="!valid"
              color="primary"
              class="rounded-xl mr-4"
              @click="confirmUpdateModal = true"
            >
              <v-icon>mdi-content-save</v-icon>
              save
            </v-btn>
            <v-btn
              v-if="edit"
              color="error"
              class="rounded-xl mr-4"
              @click="closeUpdateModal()"
            >
              cancel
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  mounted() {
    this.$store.dispatch('setPathName', 'ข้อมูลส่วนตัว')
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let Data = await this.$store.dispatch('api/user/getUserInfo', {
      params: { id: this.id },
    })
    if (!Data) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Data Not found ' + this.id,
      })
      return
    } else {
      this.UserInfo = Data.user
    }
  },
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'แก้ไขข้อมูล',
    }
  },
  data() {
    return {
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'จัดการข้อมูลส่วนตัว', to: '/' },
      ],
      UserInfo: [],
      forms: {
        fname: '',
        lname: '',
        email: '',
        tel: '',
        type_id: '',
        update_at: '',
        created_at: '',
      },
      edit: false,
      selectLoading1: false,
      selectLoading2: false,
      selectLoading3: false,
      page: 1,
      pageCount: 10,
      valid: true,
      confirmUpdateMessage: 'ยืนยันการแก้ไขข้อมูล?',
      confirmUpdateModal: false,
      confirmUploadMessage: 'ยืนยันการอัพโหลดไฟล์?',
      confirmUploadModal: false,
      completeMessage: '',
      completeModal: false,
      errorMessage: '',
      errorModal: false,
      loadingMessage: '',
      loading: false,
      // Rules: {
      //   firstName: [(v) => !!v || 'โปรดระบุชื่อจริง'],
      //   lastName: [(v) => !!v || 'โปรดระบุนามสกุล'],
      //   tel: [
      //     (v) => !!v || 'โปรดระบุเบอร์โทรศัพท์',
      //     (v) =>
      //       /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm.test(
      //         v
      //       ) || 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง',
      //   ],
      //   email: [
      //     (v) => !!v || 'โปรดระบุอีเมล',
      //     (v) =>
      //       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'โปรดระบุอีเมลที่ถูกต้อง',
      //   ],
      // },
    }
  },
  computed: {
    firstName: () => {
      return [(v) => !!v || 'โปรดระบุชื่อจริง']
    },
    lastName: () => {
      return [(v) => !!v || 'โปรดระบุนามสกุล']
    },
    tel: () => {
      return [
        (v) => !!v || 'โปรดระบุเบอร์โทรศัพท์',
        (v) =>
          /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm.test(
            v
          ) || 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง',
      ]
    },
    email: () => {
      return [
        (v) => !!v || 'โปรดระบุอีเมล',
        (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'โปรดระบุอีเมลที่ถูกต้อง',
      ]
    },
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
    reset() {
      this.$refs.form.reset()
    },
    async updateUserInfo() {
      try {
        if (!this.$refs.form.validate()) {
          this.errorMessage = 'กรุณาตรวจสอบความถูกต้องของข้อมูล'
          this.errorModal = true
          return
        }
        this.loadingMessage = 'กำลังอัปเดต'
        this.loading = true
        const token = await this.$cookies.get('token')
        await this.$axios.setHeader('authorization', token)
        await this.$store.dispatch('api/user/updateUserInfo', this.forms)
        this.edit = false
        this.loading = false
        this.completeMessage = 'อัปเดตข้อมูลส่วนตัวสำเร็จ'
        this.completeModal = true
      } catch (error) {
        this.loading = false
        this.errorMessage = String(error)
        this.errorModal = true
      }
    },
    async closeUpdateModal() {
      this.edit = false
    },

    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
