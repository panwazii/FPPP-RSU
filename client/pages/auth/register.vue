<template>
  <v-card
    class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
    max-width="800"
    max-height="1000"
  >
    <v-spacer></v-spacer>
    <h1>สมัครสมาชิก</h1>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.fname"
              :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
              label="ชื่อ"
              outlined
              required
              type="email"
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.lname"
              :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
              label="นามสกุล"
              outlined
              required
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.email"
              :rules="[(v) => !!v || 'โปรดระบุ Email']"
              label="email"
              outlined
              required
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
              :items="userTypes"
              v-model="form.type_id"
              item-text="name"
              item-value="id"
              label="user type"
              outlined
              required
              class="rounded-xl"
            >
            </v-select>
          </v-form>
        </v-col>

        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
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
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid" lazy-validation>
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
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-col>

        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.tel"
              label="หมายเลขโทรศัพท์"
              :rules="[(v) => !!v || 'โปรดระบุหมายเลขโทรศัพท์']"
              outlined
              required
              type="email"
              class="rounded-xl"
            >
            </v-text-field>
            <v-checkbox label="ยืนยันข้อตกลงในการลงทะเบียน"></v-checkbox>
            <v-card-actions class="justify-center">
              <v-btn
                @click="register"
                depressed
                color="secondary"
                class="rounded-xl"
                >REGISTER</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
      Rules: {
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
      this.$router.push('/auth/login')
    },
  },
}
</script>
