<template>
  <v-container>
    <AdminNewsEdit
      :open="editNews"
      :data="news"
      :method="fetchNews"
      :editNews.sync="editNews"
      v-if="news"
    />
    <AdminNewsCreate
      :open="createNews"
      :method="fetchNews"
      :createNews.sync="createNews"
    />
    <div class="d-flex justify-end">
      <v-btn @click="createNews = true" class="mb-3 rounded-xl" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มข่าว</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="allNews"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditNewsModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteEquipment(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          class="rounded-xl"
          v-model="fetchOption.page"
          :length="fetchOption.totalPages"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'จัดการข่าว',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      allNews: [],
      news: null,
      editNews: false,
      createNews: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'หัวข้อ',
          value: 'title',
          sortable: false,
          align: 'start',
        },
        {
          text: 'เนื้อหา',
          value: 'details',
          sortable: false,
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
    this.$store.dispatch('setPathName', 'จัดการข่าว')
    this.fetchNews()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchNews()
    },
  },
  methods: {
    async fetchNews() {
      let Data = await this.$store.dispatch('api/admin/getAllNews', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
          value: '',
        },
      })
      console.log('this is equipment', Data)
      this.allNews = Data.news
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditNewsModal(id) {
      const NewsData = await this.$store.dispatch('api/admin/getSingleNews', {
        params: {
          id: id,
        },
      })
      this.news = NewsData.news
      this.editNews = true
    },
  },
}
</script>
