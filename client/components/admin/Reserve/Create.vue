<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createReserve"
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
          Create new Reserve.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>ผู้จอง</h4>
                      <v-autocomplete
                        v-model="form.user_id"
                        :rules="[(v) => !!v || 'user id required']"
                        :items="users"
                        item-text="fname"
                        item-value="id"
                        label="User id"
                        outlined
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ชื่อห้อง</h4>
                      <v-autocomplete
                        v-model="form.room_id"
                        :rules="[(v) => !!v || 'room id required']"
                        :items="rooms"
                        item-text="name"
                        item-value="id"
                        label="Room id"
                        outlined
                        required
                      >
                        <template v-slot:item="{ item }">
                          <v-img :src="item.picture[0].url" class="itemimg"></v-img>
                          {{item.name}}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-img :src="roomDisplayImage" class="disimg" :contain="true"></v-img>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>วันที่</h4>
                      <v-date-picker
                        v-model="form.reservedate"
                        :rules="[(v) => !!v || 'reserve date required']"
                        label="Reserve date"
                        outlined
                        required
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>เริ่ม</h4>
                      <v-text-field
                        v-model="form.time_start"
                        :rules="[(v) => !!v || 'time start required']"
                        label="Time start"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>สิ้นสุด</h4>
                      <v-text-field
                        v-model="form.time_end"
                        :rules="[(v) => !!v || 'time end required']"
                        label="Time end"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>รายละเอียด</h4>
                      <v-textarea
                        v-model="form.details"
                        :rules="[(v) => !!v || 'details required']"
                        label="Details"
                        outlined
                        required
                      ></v-textarea>
                    </v-col>
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
    open: {
      required: true,
    },
  },
  async fetch() {
    const getRooms = await this.$store.dispatch('api/admin/getDropdownRoom')
    this.rooms = getRooms.rooms
    let getAllUsers = await this.$store.dispatch('api/admin/getAllUsers', {
      params: {
        limit: this.itemsPerPage,
        page: this.page,
      },
    })
    this.users = getAllUsers.users
    this.totalPages = getAllUsers.total_pages
  },
  data() {
    return {
      roomDisplayImage: null,
      form: {
        name: null,
        contact_info: null,
        available_status: true,
      },
      rooms: [],
      users: [],

      readers: [],
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
    }
  },
  mounted() {

  },
  computed: {
    formWatched () {
        return Object.assign({}, this.form)
    }
  },
  watch: {
    formWatched: {
      handler(newValue, oldValue) {
        if (newValue.room_id !== oldValue.room_id) {
          this.rooms.forEach((room) => {
            if (room.id === newValue.room_id) {
              this.roomDisplayImage = room.picture[0].url
            }
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    confirm() {
      this.confirmModal = true
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createReserve', false)
    },
    async createReserve() {
      try {
        this.loading = true
        await this.$store.dispatch('api/admin/createReserve', this.form)
        this.clearForm()
        this.$emit('update:createReserve', false)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:createReserve', false)
      }
    },
    
    clearForm() {
      this.form.name = null
      this.form.contact_info = null
      this.form.available_status = true
    },
  },
}
</script>

<style scoped>
.itemimg{
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.disimg {
  max-height: 200px;
}

</style>