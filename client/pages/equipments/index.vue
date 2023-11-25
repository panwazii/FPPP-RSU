<template>
  <div>
    <SharedBreadCrumbs title="Equipments" :routes="routes" />
    <v-card min-height="1000" class="rounded-xl">
      <v-card-text>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="equipment in equipments"
            :key="equipment.id"
            cols="12"
            md="3"
          >
            <EquipmentsCard
              :id="equipment.id"
              :title="equipment.name"
              :picture="equipment.picture"
              :price="equipment.rent_price"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-pagination
      class="mt-2 justify-center"
      v-model="page"
      :length="totalPages"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'รายการอุปกรณ์',
    }
  },
  mounted() {
    this.fetchEquipments()
  },
  data() {
    return {
      page: 1,
      equipments: [],
      totalPages: 0,
      routes: [
        { id: 1, name: 'home', to: '/' },
        { id: 2, name: 'equipments', to: '/equipments' },
      ],
    }
  },
  methods: {
    async fetchEquipments() {
      let data = await this.$store.dispatch('api/public/getAllEquipmentInfo')
      this.equipments = data.equipments
      this.totalPages = data.total_pages
    },
  },
}
</script>
<style scoped>
.card-actions {
  bottom: 0;
}
</style>