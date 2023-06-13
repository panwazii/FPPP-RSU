<template>
  <div class="login">
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="register"
      :confirm.sync="confirmModal"
    />
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :method="redirectToLogin"
      :complete.sync="completeModal"
    />
    <ModalError
      :open="errorModal"
      :message="errorMessage"
      :method="redirectToLogin"
      :error.sync="errorModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <v-row class="centered">
      <v-card class="pa-6 mt-12" width="600px" min-width="360px">
        <h1 align="center">ลงทะเบียน</h1>
        <v-form ref="form" lazy-validation>
          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.fname"
                :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
                label="ชื่อ"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.lname"
                :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                label="นามสกุล"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.email"
                :rules="[(v) => !!v || 'โปรดระบุ Email']"
                label="email"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="userTypes"
                v-model="form.type_id"
                item-text="name"
                item-value="id"
                label="user type"
                outlined
              ></v-select>
            </v-col>
          </v-row>

          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            v-model="form.password"
            :rules="[(v) => !!v || 'โปรดระบุรหัสผ่าน']"
            password="input-10-2"
            label="Password"
            @click:append="show1 = !show1"
            outlined
            required
          >
          </v-text-field>
          <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            v-model="form.confirmPassword"
            :rules="[(v) => !!v || 'โปรดระบุยืนยันรหัสผ่าน']"
            password="input-10-2"
            label="Comfrim Password"
            @click:append="show2 = !show2"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="form.tel"
            label="หมายเลขโทรศัพท์"
            required
            outlined
            :rules="[(v) => !!v || 'โปรดระบุหมายเลขโทรศัพท์']"
          >
          </v-text-field>
          <v-checkbox label="ยืนยันข้อตกลงในการลงทะเบียน"></v-checkbox>

          <v-card-actions class="justify-center">
            <v-btn @click="register" depressed color="secondary"
              >REGISTER</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  // middleware: 'admin',
  head() {
    return {
      title: 'register',
    }
  },
  data() {
    return {
      form: {
        fname: null,
        lname: null,
        email: null,
        type_id: null,
        password: null,
        tel: null,
        avatar: 'beta',
      },
      confirmPassword: '',
      userTypes: [],
      show1: false,
      show2: false,
      confirmMessage: 'confirm register?',
      confirmModal: false,
      completeMessage: 'Register complete press ok to login',
      completeModal: false,
      errorMessage: '',
      errorModal: false,
      loadingMessage: 'registering',
      loading: false,
    }
  },
  async fetch() {
    const UserTypes = await this.$store.dispatch(
      'api/public/getAllUserTypesDropdown'
    )
    this.userTypes = UserTypes.user_types
  },
  methods: {
    async register() {
      try {
        this.loading = true
        const Response = await this.$store.dispatch(
          'api/auth/userRegister',
          this.form
        )
        console.log(Response)
        if (Response.code === 201) {
          this.loading = false
          this.completeModal = true
        } else {
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        this.errorMessage = error
        this.errorModal = true
        console.log(error)
      }
    },
    redirectToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
