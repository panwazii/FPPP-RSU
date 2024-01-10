<template>
  <div>
    <div>
      <div class="d-flex justify-center">
        <h1>บริการของเรา</h1>
      </div>
      <div class="d-flex justify-center">
        <p>
          ทางเรามีบริการเยอะแยะมากมายทั้ง การจองห้อง การผลิต และการรับคำปรึกษา
          ผู้ใช้งานเว็บไซต์สามารถติดต่อทางเราเพื่อรับบริการเหล่านี้ได้เลย
        </p>
      </div>
    </div>
    <v-carousel
      class="card-width"
      hide-delimiters
      v-model="onboarding"
      show-arrows
      :cycle="true"
      :interval="6000"
    >
      <v-carousel-item v-for="item in allServices" :key="item.id">
        <v-card height="460" class="ma-2 rounded-xl">
          <v-row>
            <v-col cols="12" md="5" xs="12">
              <div>
                <v-card-title class="text-h3">{{ item.title }}</v-card-title>
                <v-card-text class="text-h6">{{ item.details }}</v-card-text>
              </div>
            </v-col>
            <v-col cols="7" md="7" xs="0" v-if="width">
              <v-img class="rounded-xl image" :src="item.picture" />
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
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
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      page: 1,
      itemsPerPage: 7,
      totalPages: 0,
      search: '',
      allServices: [],
      service: null,
      length: 3,
      onboarding: 0,
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'manage news')
    this.fetchServices()
  },
  watch: {
    page() {
      this.fetchServices()
    },
  },
  methods: {
    async fetchServices() {
      let Data = await this.$store.dispatch('api/public/getAllService', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      console.log('this is equipment', Data)
      this.allServices = Data.services
      this.totalPages = Data.total_pages
    },
  },
}
</script>

<style scoped>
.image {
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  /* background-image: url(https://images.unsplash.com/photo-1580707578919-892eb22db615?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60); */
  background-repeat: no-repeat;
  background-size: cover;
}

.card-width {
  max-width: 1200px;
  margin: auto;
}
</style>
