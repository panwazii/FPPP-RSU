<template>
  <div>
    <v-card min-height="1250" class="rounded-xl mt-2"> </v-card>
    <v-pagination
      circle
      dark
      class="mt-2 justify-center"
      v-model="fetchOption.page"
      :length="fetchOption.totalPages"
    >
    </v-pagination>
  </div>
</template>
<script>
export default {
  computed: {},
  data() {
    return {
      reserve: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      routes: [{ id: 1, name: 'หน้าหลัก', to: '/' }],
      selectedType: 1,
    }
  },
  methods: {},
}
</script>
