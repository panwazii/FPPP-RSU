<template>
  <body>
    <div>
      <div>
        <v-row class="justify-center"><h1 class="left">SERVICE</h1></v-row>
        <v-row class="justify-center"
          ><p class="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            assumenda dolore reprehenderit ullam blanditiis ex sapiente pariatur
            tempore incidunt facilis?
          </p></v-row
        >
      </div>
      <v-window v-model="onboarding" show-arrows class="d-flex justify-center">
        <v-window-item
          v-for="item in allServices"
          :key="item.id"
          :src="item.picture"
        >
          <v-card
            elevation="2"
            height="460"
            width="1200"
            class="d-flex align-center justify-center ma-2 rounded-xl"
            color="#F2F2F2"
          >
            <div class="header header_home">{{ item.title }}</div>
            <div class="content content_home">
              {{ item.details }}
            </div>
            <img class="image rounded-xl" :src="item.picture" />
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </body>
</template>

<!-- <div
      class="wrapper"
      
    >
      <div class="header header_home">{{ item.title }}</div>
      <div class="content content_home">
        {{ item.details }}
      </div>
      <img class="image" :src="item.picture"></img>
    </div> -->

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
      allServices: [],
      service: null,
      length: 3,
      onboarding: 0,
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'manage news')
    this.fetchServices()
  },
  watch: {
    page() {
      this.fetchServices()
    },
  },
  methods: {
    async fetchServices() {
      let Data = await this.$store.dispatch('api/public/getAllService', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      console.log('this is equipment', Data)
      this.allServices = Data.service
      this.totalPages = Data.total_pages
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

.container {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}

body {
  background-color: white;
}
.wrapper {
  position: absolute;
  margin: auto;
  max-width: 90%;
  max-height: 90%;
  width: 1500px;
  height: 550px;

  background: hsl(0, 0%, 95%);
  box-shadow: 1px 1px 25px 3px rgba(0, 0, 0, 0.3);
}

h1 {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  font-family: Fantasy;
  color: rgb(106, 95, 73);
}
p {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
  font-family: Fantasy;
  color: rgb(106, 95, 73);
}

.left {
  width: 50%;
  text-align: center;

  border-radius: 8px;
  font-family: Fantasy;
}

/*************/
.header {
  position: absolute;
  width: max-content;
  font-size: 2.875rem;
  font-family: Fantasy;
  white-space: nowrap;

  top: 25%;
  left: 4%;
  color: rgb(106, 95, 73);
}
.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5%;
  font-family: Fantasy;
  background: rgb(106, 95, 73);
}

/*************/
.content {
  position: absolute;
  font-size: 1.2rem;
  width: 23%;
  font-family: Fantasy;
  top: 45%;
  left: 4%;
  color: rgb(106, 95, 73);
}
.image {
  position: absolute;
  top: 0;
  right: 0;

  width: 70%;
  height: 100%;
  background-image: url(https://images.unsplash.com/photo-1580707578919-892eb22db615?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
