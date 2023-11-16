<template>
    <div>
      <ModalConfirm
        :open="confirmModal"
        :message="confirmMessage"
        :method="updateReserve"
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
            Edit Reserve
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            <v-row class="d-flex justify-center mt-3">
              <v-col cols="8">
                <template>
                  <v-form ref="form" lazy-validation>
                    <p>ID</p>
                    <v-row class="mt-2">
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="data.id"
                          disabled
                          label="ID"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <p>equipment Stock</p>
                    <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>ผู้จอง</h4>
                      <v-autocomplete
                        v-model="data.user_id"
                        :rules="[(v) => !!v || 'user id required']"
                        :items="user"
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
                        v-model="data.room_id"
                        :rules="[(v) => !!v || 'room id required']"
                        :items="rooms"
                        item-text="name"
                        item-value="id"
                        label="Room id"
                        outlined
                        required
                      >
                        <template v-slot:item="{ item }">
                          <v-img :src="item.Picture[0].url" class="itemimg"></v-img>
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
                        v-model="data.reservedate"
                        :rules="[(v) => !!v || 'reserve date required']"
                        label="Reserve date"
                        outlined
                        required
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>เริ่ม</h4>
                      <v-text-field
                        v-model="data.time_start"
                        :rules="[(v) => !!v || 'time start required']"
                        label="Time start"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>สิ้นสุด</h4>
                      <v-text-field
                        v-model="data.time_end"
                        :rules="[(v) => !!v || 'time end required']"
                        label="Time end"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>รายละเอียด</h4>
                      <v-textarea
                        v-model="data.details"
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
      const getRooms = await this.$store.dispatch('api/admin/getDropdownRoom')
      this.rooms = getRooms.room
      let getAllUsers = await this.$store.dispatch('api/admin/getAllUsers', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      this.users = getAllUsers.users
      this.totalPages = getAllUsers.total_pages
      this.rooms.forEach((room) => {
        if (room.id === this.data.room_id) {
          this.roomDisplayImage = room.Picture[0].url
        }
      })
    },
    data() {
      return {
        roomDisplayImage: null,
        confirmModal: false,
        confirmMessage: 'Confirm this change',
        loading: false,
        loadingMessage: 'Loading',
        rooms: [],
        users: [],
      }
    },
    mounted() {
      
    },
  computed: {
    formWatched () {
        return Object.assign({}, this.data)
    }
  },
  watch: {
    formWatched: {
      handler(newValue, oldValue) {
        if (newValue.room_id !== oldValue.room_id) {
          this.rooms.forEach((room) => {
            if (room.id === newValue.room_id) {
              this.roomDisplayImage = room.Picture[0].url
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
        this.$emit('update:editReserve', false)
      },
      async updateReserve() {
        try {
          this.loading = true
          await this.$store.dispatch('api/admin/updateReserve', this.data)
          this.$emit('update:editReserve', false)
          this.loading = false
        } catch (error) {
          this.loading = false
          console.log(error)
          this.$emit('update:editReserve', false)
        }
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