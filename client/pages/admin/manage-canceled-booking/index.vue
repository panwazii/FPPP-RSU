<template>
  <div>
    <SharedBreadCrumbs title="รายการยกเลิกการจองทั้งหมด" :routes="routes" />
    <AdminBookingCancel />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'super-admin',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
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
  methods: {
    selectType(type) {
      this.selectedType = type
    },
    getSelectedStatus(id) {
      if (this.selectedType === id) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
