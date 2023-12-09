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
    <v-card class="pa-6" elevation="4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="d-flex">
          <v-card-title primary-title> บัญชี </v-card-title>
          <v-spacer></v-spacer>
        </div>
        <v-card-text>
          <v-card-subtitle class="subtitle-1"> ข้อมูลส่วนตัว </v-card-subtitle>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.fname"
                  outlined
                  label="ชื่อจริง"
                  :rules="Rules.firstName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.lname"
                  outlined
                  label="นามสกุล"
                  :rules="Rules.lastName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.tel"
                  outlined
                  label="เบอร์ติดต่อ"
                  :rules="Rules.tel"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.email"
                  outlined
                  label="อีเมล"
                  :rules="Rules.email"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.type_id"
                  outlined
                  label="ประเภทผู้ใช้"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.created_at"
                  outlined
                  label="สร้างเมื่อ"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="UserInfo.update_at"
                  outlined
                  label="อัพเดทล่าสุด"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-5"></v-divider>
          </v-container>

          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <!-- <v-btn text rounded color="error" class="mr-4" @click="reset">
              ลบข้อมูล
            </v-btn> -->
            <v-btn
              v-if="!edit"
              color="primary"
              class="mr-4"
              @click="edit = true"
            >
              <v-icon>mdi-pencil</v-icon>
              edit
            </v-btn>
            <v-btn
              v-if="edit"
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="confirmUpdateModal = true"
            >
              <v-icon>mdi-content-save</v-icon>
              save
            </v-btn>
            <v-btn
              v-if="edit"
              color="error"
              class="mr-4"
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
      UserInfo: [],
      //   forms: {
      //     fname: '',
      //     lname: '',
      //     email: '',
      //     tel: '',
      //     type_id: '',
      //     update_at: '',
      //     created_at: '',
      //   },
      edit: false,
      selectLoading1: false,
      selectLoading2: false,
      selectLoading3: false,
      colsValue: '4',
      page: 1,
      pageCount: 10,
      colsValue: '4',
      forms: {
        // fname: 'Panwa',
        // lname: 'Muangsong',
        // email: '',
        // password: '',
        // public_tel: '095000000',
        // private_tel: '095000000',
        // position: 'Develeoper',
        // ข้อมูลองค์กรปกครองท้องถิ่น
        // province_id: null,
        // amphure_id: null,
        // type_local_goverment_id: null,
        // local_goverment_name_id: null,
        // เวลา
        // start_date: null,
        // end_date : null,
      },
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
      Rules: {
        // ข้อมูลผู้ประสานงาน
        firstName: [(v) => !!v || 'โปรดระบุชื่อจริง'],
        lastName: [(v) => !!v || 'โปรดระบุนามสกุล'],
        tel: [
          (v) => !!v || 'โปรดระบุเบอร์โทรศัพท์',
          (v) =>
            /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm.test(
              v
            ) || 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง',
        ],
        email: [
          (v) => !!v || 'โปรดระบุอีเมล',
          (v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'โปรดระบุอีเมลที่ถูกต้อง',
        ],
      },
    }
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
