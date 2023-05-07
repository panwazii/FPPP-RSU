<template>
    <div>
      <v-row class="mb-12"><v-spacer></v-spacer></v-row>
      <v-row class="mb-12"><v-spacer></v-spacer></v-row>
  
      <h1 class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center">
        ข่าวสาร
      </h1>
      <v-row class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center">   
        <v-col cols="8" class="d-flex justify-space-between">
          <div
          v-for="i in 2"
          :key="i"
          >
            <v-card width="440" height="400" outlined color="white" class="mx-auto">
                <v-card-title>Top 10 Australian beaches</v-card-title>
                <v-card-text>
                <div>Whitehaven Beach</div>
                <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-img
                class="align-end text-white"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
                >
                </v-img>
            </v-card>
          </div>
        </v-col>
        
      </v-row>
      <v-row class="text-h4 font-weight-bold mt-12 mr-sm-16 d-flex justify-center">
        <v-col cols="8" class="d-flex justify-space-between" >
        <div
        v-for="i in 4"
        :key="i"
        >
          <v-card width="200" height="400" outlined color="white" class="mx-auto">
            <v-card-title>Top 10 Australian beaches</v-card-title>
            <v-card-text>
            <div>Whitehaven Beach</div>
            <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-img
            class="align-end text-white"
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
            >
            </v-img>
          </v-card>
        </div>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {

      }
    },
  }
  </script>