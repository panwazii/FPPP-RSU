<template>
  <v-container>
    <div>
      <v-col class="whitediv">
        <form>
          <p>web info</p>
          <v-row>
            <v-col cols="12" sm="12">
              <v-img
                class="mx-auto"
                :src="webinfos.logo"
                height="250"
                width="300"
              ></v-img>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.banner_text"
                label="banner text"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-img
                class="mx-auto"
                :src="webinfos.banner_picture"
                height="250"
                width="300"
              ></v-img>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="12">
              <v-img
                class="mx-auto"
                :src="webinfos.about_picture"
                height="250"
                width="300"
              ></v-img>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.about_title"
                label="about title"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.about_details"
                label="about details"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row class="mt-2">
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.service_title"
                label="service title"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.service_details"
                label="service details"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.contact_email"
                label="contact email"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.contact_description"
                label="contact description"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.contact_address"
                label="contact address"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="webinfos.contact_tel"
                label="contact tel"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="webinfos.contact_location"
                label="contact location"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'จัดการข้อมูลเว็บไซต์',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      search: '',
      webinfos: [],
      webinfo: null,
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'จัดการข้อมูลเว็บไซต์')
    this.fetchWebInfos()
  },
  watch: {
    page() {
      this.fetchWebInfos()
    },
  },
  methods: {
    async fetchWebInfos() {
      let Data = await this.$store.dispatch('api/admin/getAllWebInfo', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      console.log('this is webinfo', Data)
      this.webinfos = Data.webinfo[0]
      this.totalPages = Data.total_pages
    },
  },
}
</script> 

<style scoped>
.whitediv{
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.75);
}
</style>