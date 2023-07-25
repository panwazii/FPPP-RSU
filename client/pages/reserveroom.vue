<template>
    <v-row class="centered">
      <v-card class="card pa-6 mt-12" width="600px" min-width="360px">
        <h1 align="center">จองห้อง</h1>
        <v-form class="card-content">

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="ชื่อห้อง"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12" sm="6">
              <v-text-field
                label="ชื่อ"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="นามสกุล"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="email"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="เบอร์โทร"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="start date"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="end date"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-text-field
                label="อุปกรณ์"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col cols="12">
              <v-textarea
                label="หมายเหตุ"
                outlined
                required
              ></v-textarea>
            </v-col>
          </v-row>

          <v-card-actions class="justify-center">
            <v-btn  depressed color="secondary"
              >reserve</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
</template>

<style scoped>
.card {
  /* Set a fixed height for the card */
  height: 800px;
  /* Add padding or margins as needed */
  padding: 10px;
}

.card-content {
  /* Set a fixed height for the card content container */
  height: 700px; /* Adjust this height based on your needs */
  /* Add padding or margins as needed */
  padding: 5px;
  /* Add the scrollbar to the container */
  overflow-y: auto;
  overflow-x: hidden;
}
</style>