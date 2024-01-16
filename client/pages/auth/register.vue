<template>
  <div>
    <ModalConfirm
      :open="modal.confirmRegister.open"
      :message="modal.confirmRegister.message"
      :method="register"
      :confirm.sync="modal.confirmRegister.open"
    />
    <ModalComplete
      :open="modal.completeRegister.open"
      :message="modal.completeRegister.message"
      :method="redirectToLogin"
      :complete.sync="modal.completeRegister.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <v-card
      class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
      max-width="800"
      max-height="1000"
    >
      <v-spacer></v-spacer>
      <h1>สมัครสมาชิก</h1>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.fname"
                :rules="[(v) => !!v || 'โปรดระบุชื่อจริง']"
                label="ชื่อ"
                outlined
                required
                class="rounded-xl"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.lname"
                :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                label="นามสกุล"
                outlined
                required
                class="rounded-xl"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.email"
                :rules="[(v) => !!v || 'โปรดระบุ Email']"
                label="email"
                outlined
                required
                class="rounded-xl"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
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
            </v-col>

            <v-col cols="12" sm="6">
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
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                v-model="form.confirmPassword"
                :rules="[(v) => !!v || 'โปรดระบุยืนยันรหัสผ่าน']"
                password="input-10-2"
                label="Comfirm Password"
                @click:append="show2 = !show2"
                outlined
                required
                class="rounded-xl"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12">
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
              <v-checkbox
                v-model="agree"
                label="ยืนยันข้อตกลงในการลงทะเบียน"
              ></v-checkbox>
              <v-card-actions class="justify-center">
                <v-btn
                  @click="register"
                  :disabled="!valid"
                  depressed
                  color="secondary"
                  class="rounded-xl"
                  >REGISTER</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
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
      },
      confirmPassword: '',
      userTypes: [],
      show1: false,
      show2: false,
      modal: {
        confirmRegister: {
          open: false,
          message: 'confirm register?',
        },
        completeRegister: {
          open: false,
          message: 'Register complete press ok to login',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: 'registering',
        },
      },
      valid: false,
      agree: false,
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
        if (!this.$refs.form.validate() || !this.agree) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.modal.loading.open = true
        const Response = await this.$store.dispatch(
          'api/auth/userRegister',
          this.form
        )
        if (Response.code === 201) {
          this.modal.loading.open = false
          this.modal.completeRegister.open = true
        } else {
          this.modal.loading.open = false
        }
      } catch (error) {
        this.modal.loading.open = false
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    redirectToLogin() {
      this.$router.push('/auth/login')
    },
  },
}
</script>
