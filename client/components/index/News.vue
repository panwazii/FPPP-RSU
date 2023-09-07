<template>
  <div class="container">
    <div class="left"><h1 class="mt-12">NEWS</h1></div>
    <v-row class="center">
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div>CATEGORIES</div>
            <p class="text-5 text--primary">"CONTENT"</p>
            <p>DATE</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div>CATEGORIES</div>
            <p class="text-5 text--primary">"CONTENT"</p>
            <p>DATE</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div>CATEGORIES</div>
            <p class="text-5 text--primary">"CONTENT"</p>
            <p>DATE</p>
          </v-card-text>
        </v-card>
      </v-col></v-row
    >
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'manage news',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      page: 1,
      itemsPerPage: 7,
      totalPages: 0,
      search: '',
      allNews: [],
      news: null,
    }
  },
}
</script>
<style scoped>
@font-face {
  src: url('https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2')
    format('woff2');
  font-family: 'Meta';
  font-style: normal;
  font-weight: normal;
}

section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e1f26;
}

.center {
  margin-top: 350px;
  /* bring your own prefixes */
  transform: translate(-40%, -50%);
}
.container {
  width: 90%;
  max-width: 1000px;
  height: 350px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}
.left {
  width: 40%;
  height: 200px;
  background-image: url(~/static/img/index/event_02_mono.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -300px;
  margin-right: 50px;
}
.left h1 {
  transform: translate(5%, 175%);
  margin-bottom: 200px;
  margin: 50px auto;
  padding-left: 400px;
  font-size: 40px;
  font-weight: lighter;
  color: #1e1f26;
  font-family: Fantasy;
}

.lefttext {
  margin-top: -300px;
  margin-right: 100px;
}
.lefttext h1 {
  padding-right: 1200px;
  font-size: 40px;
  font-weight: lighter;
  color: #1e1f26;
}
.right {
  width: 50%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 8px;
  color: white;
  margin-left: 50px;
}
.right h1 {
  font-size: 40px;
  font-weight: lighter;
  color: #1e1f26;
}
.right p {
  margin: 20px 0;
  font-weight: 500;
  line-height: 25px;
  color: #1e1f26;
}
.right a {
  height: 35px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rgb(58, 52, 52);
  color: rgb(255, 255, 255);
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 2px;
  border-radius: 200px;
}
</style>
