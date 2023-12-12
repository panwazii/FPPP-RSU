<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.message"
      :method="updateUser"
      :confirm.sync="modal.confirm.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card class="rounded-xl">
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          Edit User
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="data.id"
                  label="ID"
                  required
                  outlined
                  disabled
                  class="rounded-xl"
                >
                </v-text-field>
                <v-row class="mt-2">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="data.fname"
                      :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
                      label="ชื่อ"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="data.lname"
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
                      v-model="data.email"
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
                      v-model="data.type_id"
                      item-text="name"
                      item-value="id"
                      label="user type"
                      outlined
                      class="rounded-xl"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="data.tel"
                  label="หมายเลขโทรศัพท์"
                  required
                  outlined
                  :rules="[(v) => !!v || 'โปรดระบุหมายเลขโทรศัพท์']"
                  class="rounded-xl"
                >
                </v-text-field>
                <v-switch
                  v-model="data.verify_status"
                  :label="`verify status : ${convertAvailableStatus(
                    data.verify_status
                  )}`"
                >
                </v-switch>
                <v-switch
                  v-model="data.available_status"
                  :label="`available status : ${convertAvailableStatus(
                    data.available_status
                  )}`"
                ></v-switch>
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
    // method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
      //   type: String,
    },
  },
  data() {
    return {
      userTypes: null,
      modal: {
        confirm: { open: false, message: 'Confirm this change' },
        loading: { open: false, message: 'Loading' },
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
      //   this.$emit('update:editRoom', false)
    },
    cancel() {
      this.$emit('update:editUser', false)
    },
    async updateUser() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/updateUser', this.data)
        this.$emit('update:editUser', false)
        this.modal.loading.open = false
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editUser', false)
      }
    },
    convertAvailableStatus(status) {
      if (status === true) {
        return 'On'
      } else if (status === false) {
        return 'Off'
      }
    },
  },
}
</script>
