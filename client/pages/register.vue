<template>
  <div class="login">
    <v-row class="centered"
      ><v-card class="pa-6 mt-12" width="600px" min-width="360px">
        <h1 align="center" class="amber--text pa-1">ลงทะเบียน</h1>
        <v-form ref="form" lazy-validation>
          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="firstname"
                :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
                label="ชื่อ"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="lastname"
                :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                label="นามสกุล"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="email"
            label="Email"
            required
            outlined
            :rules="[(v) => !!v || 'โปรดระบุอีเมล์']"
          >
          </v-text-field>

          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            :rules="[(v) => !!v || 'โปรดระบุรหัสผ่าน']"
            password="input-10-2"
            label="Password"
            @click:append="show1 = !show1"
            outlined
            required
          >
          </v-text-field>
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            v-model="confrimpassword"
            :rules="[(v) => !!v || 'โปรดระบุยืนยันรหัสผ่าน']"
            password="input-10-2"
            label="Comfrim Password"
            @click:append="show1 = !show1"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="phonenumber"
            label="หมายเลขโทรศัพท์"
            required
            outlined
            :rules="[(v) => !!v || 'โปรดระบุหมายเลขโทรศัพท์']"
          >
          </v-text-field>
          <v-checkbox label="ยืนยันข้อตกลงในการลงทะเบียน"></v-checkbox>

          <v-card-actions class="justify-center">
            <v-btn depressed color="error">REGISTER</v-btn>
          </v-card-actions>
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
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phonenumber: '',
      confrimpassword: '',
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
