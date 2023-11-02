<template>
  <v-container>
    <h1>ข้อมูลผู้ใช้งาน</h1>

    <v-card class="mx-auto mt-12" max-width="1000">
      <v-row justify="center"
        ><v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          max-height="300px"
          max-width="300px"
          height="100%"
          width="100%"
          class="rounded-circle mt-12"
        ></v-img
      ></v-row>
      <v-row class="mt-12">
        <v-col cols="12" sm="6">
          <v-text-field
            :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
            label="ชื่อ"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
            label="นามสกุล"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="12" sm="6">
          <v-text-field
            :rules="[(v) => !!v || 'โปรดระบุ Email']"
            label="email"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :rules="[(v) => !!v || 'โปรดระบุ เบอร์โทร']"
            label="เบอร์โทร"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'user home',
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('setPathName', 'home')
  },
}
</script>
