<template>
  <div>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>
    <v-row class="mb-12"><v-spacer></v-spacer></v-row>

    <h1 class="text-h4 font-weight-bold mt-12 d-flex justify-center">
      อุปกรณ์
    </h1>

    <v-row class="justify-center mt-6 mb-16">
      <v-col
        class="pa-5 mx-0 d-flex justify-center"
        xs="12"
        md="2"
        v-for="equipments in tool"
        :key="equipments.id"
      >
        <IndexEquipmentCard
          :picture="equipments.picture"
          :name="equipments.name"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  mounted() {
    this.fetchrooms()
  },
  data() {
    return {
      tool: [],
    }
  },
  methods: {
    async fetchrooms() {
      let data = await this.$store.dispatch('api/public/getAllEquipmentInfo')
      this.tool = data.equipments
    },
  },
}
</script>
