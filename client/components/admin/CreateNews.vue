<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createNews"
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
            >mdi-newspaper-plus</v-icon
          >
          Create new user.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <v-form ref="form" lazy-validation>
                <v-row class="mt-2">
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="form.title"
                      :rules="[(v) => !!v || 'title is required']"
                      label="title"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="form.details"
                      :rules="[(v) => !!v || 'details is required']"
                      label="details"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="form.picture"
                      :rules="[(v) => !!v || 'picture is required']"
                      label="picture"
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
      form: {
        title: null,
        details: null,
        picture: 'beta',
      },
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
      completeMessage: 'Create news complete',
      completeModal: false,
      errorMessage: '',
      errorModal: false,
    }
  },
  methods: {
    confirm() {
      this.confirmModal = true
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createNews', false)
    },
    async createNews() {
      try {
        this.loading = true
        const Response = await this.$store.dispatch(
          'api/admin/createNews',
          this.form
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createNews', false)
          this.loading = false
          this.completeModal = true
        } else {
          this.clearForm()
          this.$emit('update:createNews', false)
          this.loading = false
          this.errorMessage = Response.msg
          this.errorModal = true
        }
      } catch (error) {
        this.loading = false
        this.clearForm()
        this.$emit('update:createNews', false)
        this.errorMessage = String(error)
        this.errorModal = true
      }
    },
    clearForm() {
      this.form.title = null
      this.form.details = null
      this.form.picture = null
    },
  },
}
</script>