<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createUser"
      :confirm.sync="modal.confirm.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card class="rounded-xl">
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50"
            >mdi-account-plus</v-icon
          >
          เพิ่มผู้ใช้งานใหม่
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row class="mt-2">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.fname"
                  :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
                  label="ชื่อ"
                  outlined
                  required
                  class="rounded-xl"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lname"
                  :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                  label="นามสกุล"
                  outlined
                  required
                  class="rounded-xl"
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
                  class="rounded-xl"
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
                  class="rounded-xl"
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
              class="rounded-xl"
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
              class="rounded-xl"
            >
            </v-text-field>

            <v-text-field
              v-model="form.tel"
              label="หมายเลขโทรศัพท์"
              required
              outlined
              :rules="[(v) => !!v || 'โปรดระบุหมายเลขโทรศัพท์']"
              class="rounded-xl"
            >
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="confirm"
            class="font-weight-medium mt-3 rounded-xl"
          >
            ตกลง
          </v-btn>
          <v-btn
            color="error"
            @click="cancel"
            class="font-weight-medium mt-3 rounded-xl"
          >
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
    method: { type: Function },
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
      modal: {
        confirm: { open: false, message: 'Confirm this change' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create user complete' },
        error: { open: false, message: '' },
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
    confirm() {
      this.modal.confirm.open = true
      //   this.$emit('update:editRooms', false)
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createUser', false)
    },
    async createUser() {
      try {
        this.modal.loading.open = true
        const Response = await this.$store.dispatch(
          'api/auth/userRegister',
          this.form
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createUser', false)
          this.modal.loading.open = false
          this.method()
          this.modal.complete.open = true
        } else {
          this.clearForm()
          this.$emit('update:createUser', false)
          this.modal.loading.open = false
          this.modal.error.message = Response.msg
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        this.clearForm()
        this.$emit('update:createUser', false)
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    clearForm() {
      this.form.fname = null
      this.form.lname = null
      this.form.email = null
      this.form.type_id = null
      this.form.password = null
      this.form.tel = null
    },
  },
}
</script>
