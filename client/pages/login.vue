<template>
  <div class="login">
    <v-row class="centered"
      ><v-card class="pa-6 mt-12" width="600px" min-width="360px">
        <h1 align="center" class="amber--text pa-1">เข้าสู่ระบบ</h1>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="email" label="Email"> </v-text-field>

          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            password="input-10-2"
            label="Password"
            @click:append="show1 = !show1"
          >
          </v-text-field>
          <v-btn depressed color="success"> LOGIN </v-btn>
          <v-btn depressed color="error" to="/register"> REGISTER </v-btn>
        </v-form>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="loadingDialog"></v-overlay>
    <div class="text-center">
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="#056839" dark>
          <v-card-text>
            loging in ....
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      show1: false,
      dialog: false,
      loadingDialog: false,
      message: '',
      title: '',
    }
  },
  methods: {},
}
</script>
