<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="500"
    max-height="300"
  >
    <v-card class="rounded-xl">
      <v-card-title class="text-h5">
        <v-icon justify="left" class="mr-3" size="50">
          mdi-login-variant
        </v-icon>
        กรุณาเข้าสู่ระบบ
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark
          @click="goToLogin"
          class="rounded-xl font-weight-medium mt-3"
        >
          เข้าสู่ระบบ
        </v-btn>
        <v-btn @click="close" class="rounded-xl font-weight-medium mt-3">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      required: true,
    },
    message: {
      type: String,
    },
  },
  data() {
    return {}
  },
  methods: {
    goToLogin() {
      this.$router.push('/auth/login')
    },
    close() {
      this.$emit('update:goToLogin', false)
    },
  },
}
</script>