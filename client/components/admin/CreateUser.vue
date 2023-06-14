<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createUser"
      :confirm.sync="confirmModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :complete.sync="completeModal"
    />
    <ModalError
      :open="errorModal"
      :message="errorMessage"
      :error.sync="errorModal"
    />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50"
            >mdi-account-plus</v-icon
          >
          Create new user.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
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
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="confirm"
            class="font-weight-medium mt-3"
          >
            ตกลง
          </v-btn>
          <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      required: true,
    },
  },
  data() {
    return {
      show1: false,
      show2: false,
      userTypes: [],
      form: {
        fname: null,
        lname: null,
        email: null,
        type_id: null,
        password: null,
        tel: null,
        avatar: 'beta',
      },
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
      completeMessage: 'Create user complete',
      completeModal: false,
      errorMessage: '',
      errorModal: false,
    }
  },
  async fetch() {
    const UserTypes = await this.$store.dispatch(
      'api/public/getAllUserTypesDropdown'
    )
    this.userTypes = UserTypes.user_types
  },
  methods: {
    confirm() {
      this.confirmModal = true
      //   this.$emit('update:editRooms', false)
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createUser', false)
    },
    async createUser() {
      try {
        this.loading = true
        const Response = await this.$store.dispatch(
          'api/auth/userRegister',
          this.form
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createUser', false)
          this.loading = false
          this.completeModal = true
        } else {
          this.clearForm()
          this.$emit('update:createUser', false)
          this.loading = false
          this.errorMessage = ''
          this.errorModal = true
        }
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:createUser', false)
        this.errorMessage = error
        this.errorModal = true
      }
    },
    clearForm() {
      this.fname = null
      this.lname = null
      this.email = null
      this.type_id = null
      this.password = null
      this.tel = null
    },
  },
}
</script>