<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="1000"
    content-class="rounded-xl"
  >
    <v-card>
      <v-card-title> Quotation</v-card-title>
      <v-divider />
      <v-card-text v-if="quotation !== null">
        {{ quotation }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          elevation="0"
          class="rounded-xl"
          :to="'/user/quotation/' + bookingData.id"
          target="_blank"
        >
          <v-icon class="mr-1">mdi-printer</v-icon>
          พิมพ์
        </v-btn>
        <!-- </NuxtLink> -->
        <v-btn dark elevation="0" class="rounded-xl" @click="close">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      required: true,
    },
    bookingData: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    const response = await this.$store.dispatch('api/user/getSingleQuotation', {
      params: { id: this.bookingData.id },
    })
    if (response.code === 200) {
      this.quotation = response.quotation
      this.loading = false
    } else {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Quotation Not found ' + this.id,
      })
      return
    }
  },
  data() {
    return {
      quotation: null,
    }
  },
  methods: {
    close() {
      this.$emit('update:close', false)
    },
  },
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

body {
  font-family: Arial, sans-serif;
  margin: 40px;
}
</style>