<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createEquipment"
      :confirm.sync="confirmModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-home-plus</v-icon>
          Create new Equipment.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.name"
                        :rules="[(v) => !!v || 'name required']"
                        label="Name"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.price"
                        :rules="[(v) => !!v || 'price required']"
                        label="Price"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.rent_price"
                        :rules="[(v) => !!v || 'rent price required']"
                        label="Rent price"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-textarea
                        v-model="form.details"
                        :rules="[(v) => !!v || 'details required']"
                        label="Details"
                        outlined
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="form.file"
                      label="รูปภาพ"
                      filled
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-form>
              </template>
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
  async fetch() {
    const Rooms = await this.$store.dispatch('api/admin/getAllRooms')
    this.rooms = Rooms.rooms
  },
  data() {
    return {
      rooms: null,
      form: {
        room_id: null,
        name: null,
        details: null,
        price: null,
        rent_price: null,
        picture: 'beta',
        available_status: true,
      },
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
    }
  },
  methods: {
    confirm() {
      this.confirmModal = true
      //   this.$emit('update:editRooms', false)
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createEquipment', false)
    },
    async createEquipment() {
      try {
        this.loading = true
        let file = new FormData()
        file.append('file', this.form.file),
          file.append('name', this.form.name),
          file.append('price', this.form.price),
          file.append('rent_price', this.form.rent_price),
          file.append('details', this.form.details)
        await this.$store.dispatch('api/admin/createEquipmentInfo', file)
        this.clearForm()
        this.$emit('update:createEquipment', false)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:createEquipment', false)
      }
    },
    clearForm() {
      this.form.room_id = null
      this.form.name = null
      this.form.details = null
      this.form.rent_price = null
      this.form.picture = 'beta'
      this.form.available_status = true
    },
  },
}
</script>
