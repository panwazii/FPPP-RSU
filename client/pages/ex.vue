<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="register"
      :confirm.sync="confirmModal"
    />
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :method="redirectToLogin"
      :complete.sync="completeModal"
    />
    <ModalError
      :open="errorModal"
      :message="errorMessage"
      :method="reset"
      :error.sync="errorModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <v-card class="pa-6" elevation="4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title primary-title> สมัครใช้งานใหม่ </v-card-title>
        <v-card-text>
          <v-card-subtitle class="subtitle-1">
            ข้อมูลผู้ประสานงาน
          </v-card-subtitle>
          {{ forms }}
          <v-container>
            <v-row>
              <v-col cols="12" :md="colsValue">
                <v-select
                  :items="pronounces"
                  v-model="pronounce"
                  label="คำนำหน้า"
                  :rules="Rules.namePrefix"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col v-if="pronounce === 'อื่นๆ'" cols="12" md="2">
                <v-text-field
                  v-model="customPronounce"
                  outlined
                  label="โปรดระบุ"
                  :rules="Rules.namePrefix"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.fname"
                  outlined
                  label="ชื่อจริง"
                  :rules="Rules.firstName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.lname"
                  outlined
                  label="นามสกุล"
                  :rules="Rules.lastName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.position"
                  outlined
                  label="ตำแหน่ง"
                  :rules="Rules.position"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.public_tel"
                  outlined
                  label="เบอร์ติดต่อ"
                  :rules="Rules.tel"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.private_tel"
                  outlined
                  label="เบอร์มือถือ"
                  :rules="Rules.tel"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.email"
                  outlined
                  label="อีเมล"
                  :rules="Rules.email"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="4">
                <v-text-field
                v-model="forms"
                  outlined
                  label="ชื่อผู้ใช้"
                  :rules="Rules.username"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="forms.password"
                  outlined
                  label="รหัสผ่าน"
                  :rules="Rules.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-5"></v-divider>

            <v-card-subtitle class="subtitle-1">
              ข้อมูลองค์กรปกครองท้องถิ่น
            </v-card-subtitle>

            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  @click="clearLocation"
                  :items="provinces"
                  v-model="forms.province_id"
                  item-text="name_th"
                  item-value="id"
                  label="จังหวัด"
                  :rules="Rules.province"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  @click="getAmphures(forms.province_id)"
                  :loading="selectLoading1"
                  :items="amphures"
                  v-model="forms.amphure_id"
                  item-text="name_th"
                  item-value="id"
                  label="อำเภอ/เขต"
                  :rules="Rules.district"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="test"
                  :items="subDistrict"
                  item-text="name_th"
                  item-value="id"
                  label="ตำบล/แขวง"
                  :rules="Rules.subDistrict"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  @click="clearGovList"
                  :items="localGovernmentTypes"
                  v-model="forms.type_local_goverment_id"
                  item-text="name"
                  item-value="id"
                  label="ชนิด อปท."
                  :rules="Rules.obtType"
                  outlined
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  @click="
                    getLocalGovernmentList(
                      forms.type_local_goverment_id,
                      forms.province_id,
                      forms.amphure_id
                    )
                  "
                  :items="localGovernmentList"
                  v-model="forms.local_goverment_name_id"
                  item-text="name"
                  item-value="id"
                  label="ชื่อ อปท."
                  :rules="Rules.obtName"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <!-- <v-btn text rounded color="error" class="mr-4" @click="reset">
              ลบข้อมูล
            </v-btn> -->
            <v-btn
              rounded
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="register"
            >
              สมัคร
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  async fetch() {
    const Provinces = await this.$store.dispatch('api/public/getAllProvince')
    this.provinces = Provinces.data.data
    const GovType = await this.$store.dispatch(
      'api/public/getLocalGovernmentType'
    )
    this.localGovernmentTypes = GovType.data.data
  },
  watch: {
    pronounce: {
      handler(newValue, oldValue) {
        if (newValue === 'อื่นๆ') {
          this.colsValue = 2
        } else {
          this.colsValue = 4
        }
      },
    },
    // forms: {
    //   handler(newValue, oldValue) {
    //     if (newValue.province !== null) {
    //       this.getAmphures(newValue.province)
    //       this.forms.amphure = null
    //       this.forms.type_local_goverment = null
    //       this.forms.local_goverment_name = null
    //       if (
    //         newValue.type_local_goverment !== null &&
    //         newValue.province !== null &&
    //         newValue.amphure !== null
    //       ) {
    //         console.log('hi')
    //         this.getLocalGovernmentList(
    //           newValue.type_local_goverment,
    //           newValue.province,
    //           newValue.amphure
    //         )
    //       }
    //     }
    //   },
    //   deep: true,
    // },
  },
  data() {
    return {
      test: 'asd',
      selectLoading1: false,
      selectLoading2: false,
      colsValue: '4',
      pronounce: '',
      customPronounce: '',
      forms: {
        fname: 'Panwa',
        lname: 'Muangsong',
        email: '',
        password: '',
        public_tel: '095000000',
        private_tel: '095000000',
        position: 'Develeoper',
        // ข้อมูลองค์กรปกครองท้องถิ่น
        province_id: null,
        amphure_id: null,
        type_local_goverment_id: null,
        local_goverment_name_id: null,
      },
      valid: true,
      pronounces: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ'],
      // ข้อมูลองค์กรปกครองท้องถิ่น
      provinces: [],
      amphures: [],
      subDistrict: [],
      localGovernmentTypes: [],
      localGovernmentList: [],
      confirmMessage: 'confirm register?',
      confirmModal: false,
      completeMessage: 'Register complete press ok to login',
      completeModal: false,
      errorMessage: '',
      errorModal: false,
      loadingMessage: 'registering',
      loading: false,

      Rules: {
        // ข้อมูลผู้ประสานงาน
        namePrefix: [(v) => !!v || 'โปรดระบุคำนำหน้าชื่อ'],
        firstName: [(v) => !!v || 'โปรดระบุชื่อจริง'],
        lastName: [(v) => !!v || 'โปรดระบุนามสกุล'],
        position: [(v) => !!v || 'โปรดระบุตำแหน่งงาน'],
        tel: [
          (v) => !!v || 'โปรดระบุเบอร์โทรศัพท์',
          (v) =>
            /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/gm.test(
              v
            ) || 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง',
        ],
        email: [
          (v) => !!v || 'โปรดระบุอีเมล',
          (v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'โปรดระบุอีเมลที่ถูกต้อง',
        ],
        username: [(v) => !!v || 'โปรดระบุชื่อผู้ใช้'],
        password: [(v) => !!v || 'โปรดระบุชื่อรหัสผ่าน'],

        // ข้อมูลองค์กรปกครองท้องถิ่น
        province: [(v) => !!v || 'โปรดระบุจังหวัด'],
        district: [(v) => !!v || 'โปรดระบุอำเภอ'],
        subDistrict: [(v) => !!v || 'โปรดระบุตำบล'],
        obtType: [(v) => !!v || 'โปรดระบุชนิด อปท.'],
        obtName: [(v) => !!v || 'โปรดระบุชื่อ อปท.'],
      },
    }
  },
  methods: {
    async register() {
      try {
        if (!this.$refs.form.validate()) {
          this.errorMessage = 'please check form'
          this.errorModal = true
          return
        }
        this.loading = true
        let pronounce = ''
        if (this.pronounce === 'อื่นๆ') {
          pronounce = this.customPronounce
        } else {
          pronounce = this.pronounce
        }
        const register = await this.$store.dispatch('api/auth/userRegister', {
          ...this.forms,
          pronounce,
        })
        console.log('this is res', register.data)
        if (register.data.code === 201) {
          this.loading = false
          this.completeModal = true
        } else if (register.data.err_code === 'EMAIL-UNAVAILABLE') {
          this.loading = false
          this.errorMessage = 'this email is aready in use.'
          this.errorModal = true
        } else {
          this.loading = false
          this.errorMessage = 'unknown error: ' + register.data
          this.errorModal = true
        }
      } catch (error) {
        console.log(error)
        this.loading = false
        this.errorMessage = 'unknown error: ' + error
        this.errorModal = true
      }
    },
    redirectToLogin() {
      this.$router.push('/auth/login')
    },
    refresh() {
      this.$nuxt.refresh()
    },
    reset() {
      this.$refs.form.reset()
    },
    async getAmphures(id) {
      if (this.forms.province_id === null) {
        return
      }
      this.forms.type_local_goverment_id = null
      this.forms.local_goverment_name_id = null
      this.localGovernmentList = []
      this.selectLoading1 = true
      const getAmphure = await this.$store.dispatch('api/public/getAmphure', {
        params: { id: id },
      })
      this.selectLoading1 = false
      this.amphures = getAmphure.data.data
    },
    async getLocalGovernmentList(govType, provinceId, amphureId) {
      if (
        this.forms.province_id === null &&
        this.forms.amphure_id === null &&
        this.forms.type_local_goverment_id === null
      ) {
        return
      }
      this.forms.local_goverment_name_id = null
      this.selectLoading2 = true
      const getLocalGovList = await this.$store.dispatch(
        'api/public/getLocalGovernmentList',
        {
          params: {
            type: govType,
            provice_id: provinceId,
            amphure_id: amphureId,
          },
        }
      )
      this.selectLoading2 = false
      this.localGovernmentList = getLocalGovList.data.data
    },
    clearGovList() {
      this.forms.local_goverment_name_id = null
      this.localGovernmentList = []
    },
    clearLocation() {
      this.forms.amphure_id = null
      this.amphures = []
      this.forms.type_local_goverment_id = null
      this.forms.local_goverment_name_id = null
      this.localGovernmentList = []
    },
  },
}
</script>
