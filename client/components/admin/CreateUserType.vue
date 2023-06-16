<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createUserType"
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
          Create new user type.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <v-form ref="form" lazy-validation>
                <v-row class="mt-2">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.name"
                      :rules="[(v) => !!v || 'please input usertype']"
                      label="ชื่อ"
                      outlined
                      required
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
        name: null,
      },
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
      completeMessage: 'Create user type complete',
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
      this.$emit('update:createUserType', false)
    },
    async createUserType() {
      try {
        this.loading = true
        const Response = await this.$store.dispatch(
          'api/admin/createUserType',
          this.form
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createUserType', false)
          this.loading = false
          this.completeModal = true
        } else {
          this.clearForm()
          this.$emit('update:createUserType', false)
          this.loading = false
          this.errorMessage = Response
          this.errorModal = true
        }
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:createUserType', false)
        this.errorMessage = error
        this.errorModal = true
      }
    },
    clearForm() {
      this.form.name = null
    },
  },
}
</script>