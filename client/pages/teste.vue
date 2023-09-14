<template>
  <div>
    <indexEquipmentFirst />
    <section>
      <v-img class="overlay" width="600" :src="image" />
      <v-row class="justify-center">
        <v-col v-for="equipments in tool" :key="equipments.id">
          <indexEquipmentList
            :picture="equipments.picture"
            :name="equipments.name"
            :id="equipments.id"
          />
        </v-col>
      </v-row>
    </section>
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
      image: require('@/static/img/index/clerk_man_mono.png'),
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

<style scoped>
section {
  top: 0;
  min-height: 100vh;
  width: 100%;
  display: grid;
  background-color: #ffffff;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: -200px;
  height: 2200px;
  font-weight: bold;
  z-index: 0;
}

.container {
  max-width: 70%;
  margin: 100px auto;
}
</style>
