<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateUserInfo"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :method="refresh"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
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
                v-model="userInfo.email"
                outlined
                label="อีเมล"
                required
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :items="userTypes"
                v-model="userInfo.type_id"
                item-text="name"
                item-value="id"
                label="ประเภทผู้ใช้งาน"
                disabled
                outlined
                required
                class="rounded-xl"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4"></v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="forms.fname"
                outlined
                label="ชื่อจริง"
                :rules="firstName"
                required
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="forms.lname"
                outlined
                label="นามสกุล"
                :rules="lastName"
                required
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                class="rounded-xl"
                v-model="forms.tel"
                outlined
                label="เบอร์ติดต่อ"
                :rules="tel"
                required
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                class="rounded-xl"
                v-model="forms.address"
                outlined
                label="ที่อยู่เพื่อออกใบกำกับภาษี"
                :disabled="!edit"
              ></v-textarea>
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
              @click="modal.confirm.open = true"
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
  async fetch() {
    const UserTypes = await this.$store.dispatch(
      'api/public/getAllUserTypesDropdown'
    )
    this.userTypes = UserTypes.user_types
    let Data = await this.$store.dispatch('api/user/getUserInfo')
    this.userInfo = Data.user
    this.forms.fname = Data.user.fname
    this.forms.lname = Data.user.lname
    this.forms.tel = Data.user.tel
    this.forms.address = Data.user.address
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
      userInfo: {},
      forms: {
        fname: '',
        lname: '',
        tel: '',
        address: '',
      },
      userTypes: [],
      edit: false,
      valid: true,
      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการแก้ไขข้อมูลส่วนตัว',
        },
        complete: {
          open: false,
          message: '',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: '',
        },
      },
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
          this.modal.error.message = 'กรุณาตรวจสอบความถูกต้องของข้อมูล'
          this.modal.error.open = true
          return
        }
        const response = await this.$store.dispatch('api/user/updateUserInfo', {
          ...this.forms,
        })
        if (response.code === 201) {
          this.modal.loading.open = false
          this.modal.complete.open = true
          this.edit = false
          this.modal.complete.message = 'แก้ไขข้อมูลส่วนตัวสำเร็จ'
        } else {
          this.modal.loading.open = false
          this.modal.error.message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก'
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    async closeUpdateModal() {
      this.edit = false
      this.forms.fname = this.userInfo.fname
      this.forms.lname = this.userInfo.lname
      this.forms.tel = this.userInfo.tel
      this.forms.address = this.userInfo.address
    },

    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
