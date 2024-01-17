<template>
  <div v-if="loading === false">
    <div class="header">
      <h1>ใบเสนอราคา</h1>
    </div>
    <h5>
      ผู้จอง:
      {{ quotation.reserve.user.fname + ' ' + quotation.reserve.user.lname }}
    </h5>
    <h5>อีเมล: {{ quotation.reserve.user.email }}</h5>
    <h5>เบอร์โทรศัพท์: {{ quotation.reserve.user.tel }}</h5>
    <h5>
      วันที่เวลาที่จอง: วันที่ {{ displayStartDate }} เวลา
      {{ displayStartTime }} - {{ displayEndTime }}
    </h5>
    <table v-if="quotation.reserve.room !== null">
      <thead>
        <tr>
          <th>ห้อง</th>
          <th>ราคา</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ quotation.reserve.room.name }}</td>
          <td>{{ displayRoomPrice }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Page 2 -->
    <!-- <div v-if="quotation.reserve.room !== null" style="page-break-before: always"></div> -->
    <table v-if="quotation.reserve.reserve_equipment.length !== 0">
      <thead>
        <tr>
          <th>อุปกรณ์</th>
          <th>จำนวน</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="(item, index) in items" :key="index">
          <td>test</td>
          <td>2</td>
        </tr> -->
        <tr v-for="item in quotation.reserve.reserve_equipment" :key="item.id">
          <td>{{ item.equipment_info.name }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
        <td class="font-weight-bold">
          <h5>ราคาอุปกรณ์ทั้งหมด {{ displayEquipmentPrice }} บาท</h5>
        </td>
      </tbody>
    </table>
    <table>
      <tr>
        <td class="sum-price">
          <h5>ราคารวม {{ displaySumPrice }} บาท</h5>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { formatToIsoNumber } from '~/utils/general-utils'
export default {
  layout: 'empty',
  middleware: 'user',
  head() {
    return {
      title: 'พิมพ์ใบเสนอราคา',
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    const response = await this.$store.dispatch('api/user/getSingleQuotation', {
      params: { id: this.id },
    })
    if (response.code === 200) {
      this.quotation = response.quotation
      this.loading = false
      // this.printPage()
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
      loading: true,
      items: Array.from({ length: 30 }),
    }
  },
  computed: {
    displayRoomPrice() {
      return formatToIsoNumber(Number(this.quotation.room_price))
    },
    displayEquipmentPrice() {
      return formatToIsoNumber(Number(this.quotation.equipment_price))
    },
    displaySumPrice() {
      const sumPrice =
        Number(this.quotation.room_price) +
        Number(this.quotation.equipment_price)
      return formatToIsoNumber(sumPrice)
    },
    displayStartDate() {
      return this.$moment(this.quotation.reserve.time_start).format(
        'DD/MM/YYYY'
      )
    },
    displayStartTime() {
      return this.$moment(this.quotation.reserve.time_start).format('HH:mm')
    },
    displayEndTime() {
      return this.$moment(this.quotation.reserve.time_end).format('HH:mm')
    },
  },
  methods: {
    printPage() {
      window.print()
    },
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
}

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

.sum-price {
  background-color: #808080; /* Use the desired shade of grey */
  color: #000000; /* Set text color to contrast with the background */
}
</style>