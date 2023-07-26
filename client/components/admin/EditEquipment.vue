<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="updateEquipment"
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
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          Edit Equipment
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="rooms"
                        v-model="data.room_id"
                        item-text="name"
                        item-value="id"
                        label="room"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.name"
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
                        v-model="data.price"
                        :rules="[(v) => !!v || 'price required']"
                        label="Price"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.rent_price"
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
                        v-model="data.details"
                        :rules="[(v) => !!v || 'details required']"
                        label="Details"
                        outlined
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-img
                        class="mx-auto"
                        :src="data.picture"
                        height="250"
                        width="300"
                      ></v-img>
                    </v-col>
                    <v-file-input
                      v-model="data.file"
                      label="รูปภาพ"
                      filled
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-row>
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
    // method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
      //   type: String,
    },
  },
  async fetch() {
    const Rooms = await this.$store.dispatch('api/admin/getAllRooms')
    this.rooms = Rooms.rooms
  },
  data() {
    return {
      rooms: null,
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
    }
  },
  methods: {
    confirm() {
      this.confirmModal = true
      //   this.$emit('update:editRoom', false)
    },
    cancel() {
      this.$emit('update:editEquipment', false)
    },
    async updateEquipment() {
      try {
        this.loading = true
        let file = new FormData()
        file.append('file', this.data.file),
          file.append('id', this.data.id),
          file.append('name', this.data.name),
          file.append('price', this.data.price),
          file.append('rent_price', this.data.rent_price),
          file.append('details', this.data.details),
          await this.$store.dispatch('api/admin/updateEquipment', file)
        this.$emit('update:editEquipment', false)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:editEquipment', false)
      }
    },
  },
}
</script>
