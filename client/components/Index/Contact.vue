<template>
  <div class="mb-12">
    <h1 class="text-h4 font-weight-bold mt-12 mb-12 d-flex justify-center">
      ข้อมูลการติดต่อ
    </h1>
    <!-- <p class="d-flex justify-center text-center">
          จองห้องเพื่อใช้งานอุปกรณ์ต่างๆภายในห้อง
        </p> -->
    <v-card class="rounded-xl" height="600px">
      <v-row class="card">
        <v-col class="card" cols="12" md="7" v-if="width">
          <v-img
            height="600px"
            class="rounded-xl"
            :src="require('~/static/img/index/rsu-building1.png')"
          />
        </v-col>
        <v-col class="card" cols="12" md="5">
          <v-card-text>
            <div class="text-subtitle-1 mt-10">
              <v-icon class="mr-2" large>mdi-email</v-icon>
              contact@company.com
            </div>
            <div class="text-subtitle-1 mt-4">
              <v-icon class="mr-2" large>mdi-phone</v-icon>
              0892783278
            </div>
            <div class="text-subtitle-1 mt-4 d-flex">
              <v-icon class="mr-2" large>mdi-map-marker</v-icon>
              <div>
                มหาวิทยาลัยรังสิต 52 347 ถ. พหลโยธิน ตำบล หลักหก
                อำเภอเมืองปทุมธานี ปทุมธานี 12000
              </div>
            </div>
            <div class="d-flex">
              <iframe
                class="justify-center"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d266.8226602355528!2d100.58655326160778!3d13.964213774622861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2816f1377fc17%3A0x63d330b7f8af6e16!2sRangsit%20University!5e0!3m2!1sen!2sth!4v1700685892190!5m2!1sen!2sth"
                width="600"
                height="350"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return false
        case 'sm':
          return false
        case 'md':
          return true
        case 'lg':
          return true
        case 'xl':
          return true
      }
    },
  },
}
</script>

<style scoped>
.card {
  margin-top: 0%;
  padding-top: 0%;
}
.card-width {
  max-width: 1200px;
  margin: auto;
}
</style>
