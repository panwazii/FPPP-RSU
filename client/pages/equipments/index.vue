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
      :length="6"
    ></v-pagination>
  </div>

  <!-- <main>
      <h1 class="text-h4 font-weight-bold d-flex justify-center mt-12">
        รายการอุปกรณ์
      </h1>
      <section class="cards">
        <div
          class="card"
          v-for="equipments in tool"
          :key="equipments.id"
          @click="$router.push('/equipment/' + equipments.id)"
        >
          <div class="card__image-container">
            <img :src="equipments.picture" />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
              {{ equipments.name }}
            </p>
            <div class="card__info">
              <p class="text--medium">ราคา</p>
              <p class="card__price text--medium">{{ equipments.rent_price }}</p>
            </div>
          </div>
        </div>
      </section>
    </main> -->
</template>
  
  <script>
export default {
  head() {
    return {
      title: 'รายการอุปกรณ์',
    }
  },
  mounted() {
    this.fetchrooms()
  },
  data() {
    return {
      page: 1,
      equipments: [],
      routes: [
        { id: 1, name: 'home', to: '/' },
        { id: 2, name: 'equipments', to: '/equipments' },
      ],
    }
  },
  methods: {
    async fetchrooms() {
      let data = await this.$store.dispatch('api/public/getAllEquipmentInfo')
      this.equipments = data.equipments
    },
  },
}
</script>
  
  <style scoped>
.card-actions {
  bottom: 0;
}
</style>
  