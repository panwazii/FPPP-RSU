<template>
  <v-card
    class="mx-auto text-center mt-12 pa-2 pt-10 justify-center rounded-xl"
    max-width="400"
    max-height="800"
  >
    <v-spacer></v-spacer>
    <h1>เข้าสู่ระบบ</h1>
    <v-card-text>
      <v-row>
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
              class="rounded-xl"
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
              class="rounded-xl mb-5"
              outlined
              v-model="password"
            >
            </v-text-field>
            <v-divider></v-divider>
            <v-btn
              @click="login()"
              class="rounded-xl mt-10"
              color="secondary"
              large
              block
            >
              <div class="white--text font-weight-bold">เข้าสู่ระบบ</div>
            </v-btn>
            <h3 class="mt-2">หรือ</h3>
            <v-btn
              to="/auth/register"
              class="rounded-xl mt-2"
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
      <v-row class="text-center">
        <v-col>
          <a href="/auth/admin-login">admin only</a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'user-login',
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
    async login() {
      try {
        const email = this.email
        const password = this.password
        await this.$store
          .dispatch('api/auth/userLogin', { email, password })
          .then((res) => {
            console.log('this is res', res)
            this.$store.dispatch('setUser', res.user)
            this.$store.dispatch('setToken', res.token)
            this.$store.dispatch('setIsAdmin', res.admin)
            this.$router.push('/user/home')
          })
      } catch (error) {
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
