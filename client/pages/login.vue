<template>
  <v-card
    class="mx-auto text-center mt-12 pa-2 pt-10 justify-center"
    max-width="400"
    max-height="800"
  >
    <v-spacer></v-spacer>
    <h1>เข้าสู่ระบบ</h1>
    <v-card-text>
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              required
              @keyup.enter="getlogin()"
              label="อีเมล"
              name="Email"
              :rules="emailRules"
              prepend-inner-icon="mdi-mail"
              type="email"
              class="rounded-1"
              outlined
              v-model="email"
            >
            </v-text-field>
            <v-text-field
              required
              @keyup.enter="getlogin()"
              label="รหัสผ่าน"
              name="password"
              prepend-inner-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
              class="rounded-1 mb-5"
              outlined
              v-model="password"
            >
            </v-text-field>
            <v-divider></v-divider>
            <v-btn
              @click="getlogin()"
              class="rounded-1 mt-10"
              color="secondary"
              large
              block
            >
              <div class="white--text font-weight-bold">เข้าสู่ระบบ</div>
            </v-btn>
            <h3 class="mt-2">หรือ</h3>
            <v-btn
              to="/register"
              class="rounded-1 mt-2"
              color="#78909C"
              large
              block
            >
              <div class="white--text font-weight-bold">ลงทะเบียน</div>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <a href="">ลืมรหัสผ่าน ?</a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'default',
  // middleware: 'login',
  head() {
    return {
      title: 'Admin Login',
    }
  },
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      dialog: false,
      loading: false,
      emailRules: [
        (v) => !!v || 'โปรดระบุอีเมล',
        (v) => /.+@.+/.test(v) || 'โปรดระบุอีเมลที่ถูกต้อง',
      ],
      passwordRules: [
        (v) => !!v || 'โปรดระบุรหัสผ่าน',
        (v) => /.{6,}/.test(v) || 'รหัสผ่านอย่างน้อย 6 ตัว',
      ],
    }
  },
  methods: {
    getlogin() {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.login(this.email, this.password)
      }
    },
    async login(email, password) {
      try {
        this.loading = true
        let response = await this.$auth.loginWith('admin', {
          data: {
            email,
            password,
          },
        })
        if (response.status === 200) {
          this.loading = false
          this.$router.push('/admin/home')
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>
<style>
/* .picture {
  background-image: url('~/assets/pictures/admin/rsu-building1.png');
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: cover;
} */
</style>
