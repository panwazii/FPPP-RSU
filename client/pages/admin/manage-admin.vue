<template>
  <div>
    <v-data-table
      height="300px"
      width="1020"
      :headers="headers"
      sort-by="id"
      class="elevation-1 mt-12 pa-6 ml-12 mr-12 rounded-xl"
      :search="search"
    >
      <template v-slot:top>
        <AdminAddAdmin />
        <v-toolbar flat>
          <v-icon class="mr-2" large>mdi-note-multiple</v-icon>
          <v-toolbar-title> แก้ไขแอดมิน</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'super-admin',
  head() {
    return {
      title: 'จัดการผู้ดูแล',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
      search: '',
      headers: [
        {
          text: 'ชื่อ',
          value: 'name',
          sortable: true,
          align: 'start',
        },

        { text: 'แก้ไข', value: 'edit', sortable: false, align: 'center' },
        {
          text: 'ลบ',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'จัดการผู้ดูแล')
  },
}
</script>
