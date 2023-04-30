<template>
  <v-card class="mx-auto mb-2 rounded-xl" width="712px">
    <v-row>
      <v-col cols="8">
        <v-img :src="picture" width="490px" height="294px" class="rounded-l-xl d-flex flex-row"></v-img>
      </v-col>
      <v-col cols="4" style="float: left">
        <v-card-title class="d-flex flex-row" >{{ title }}</v-card-title>
    

        <v-card-subtitle class="d-flex flex-row">
          {{ formatDateEN(createdAt) }}
        </v-card-subtitle>
      </v-col>
    </v-row>
      
    
      

  </v-card>
</template>

<script>
export default {
  name: 'CardL',
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    createdAt: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
  },
}
</script>

<style scoped>
.cimg {
  
  float: left;
}

.ctitle {
  max-height: 210px;

  min-width: 200px;
  max-width: 240px;
  float: left;
}

.cdate {
  max-width: 110px;
  float: left;
}
</style>
