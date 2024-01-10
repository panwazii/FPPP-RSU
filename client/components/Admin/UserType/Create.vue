<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createUserType"
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
          เพิ่มประเภทผู้ใช้งาน
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <v-form ref="form" lazy-validation>
                <v-row class="mt-2">
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.name"
                      :rules="[(v) => !!v || 'โปรดระบุประเภทผู้ใช้งาน']"
                      label="ชื่อ"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
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
        name: null,
      },
      modal: {
        confirm: { open: false, message: 'Confirm to create?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create user type complete' },
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
      this.$emit('update:createUserType', false)
    },
    async createUserType() {
      try {
        this.modal.loading.open = true
        const Response = await this.$store.dispatch(
          'api/admin/createUserType',
          this.form
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createUserType', false)
          this.modal.loading.open = false
          this.modal.complete.open = true
          this.method()
        } else {
          this.clearForm()
          this.$emit('update:createUserType', false)
          this.modal.loading.open = false
          this.modal.error.message = Response
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:createUserType', false)
        this.modal.error.message = error
        this.modal.error.open = true
      }
    },
    clearForm() {
      this.form.name = null
    },
  },
}
</script>
