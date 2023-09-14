<template>
  <div class="container">
    <div class="grid-container">
      <div class="grid-items">
        <v-card
          class="mx-auto rounded-xl"
          width="400"
          height="540"
          outlined
          color="transparent"
        >
          <v-img
            height="450"
            :src="picture"
            cover
            class="text-white rounded-xl avatar"
          >
            <h1 class="bottom-right overlay">{{ name }}</h1>
          </v-img>

          <v-btn class="rounded-xl mt-12" width="270" color="#6A5F49">
            <h1 class="text">ADD TO CART</h1></v-btn
          >
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    id: {
      type: String,
      default: () => '',
    },
    detail: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped>
section {
  min-height: 100vh;
  width: 100%;
  display: grid;
  background-color: #ffffff;
}

.container {
  max-width: 70%;
  margin: 100px auto;
}

.avatar {
  position: relative;
}

.cardColor {
  background-color: rgb(255, 255, 255) !important;
  border-color: white !important;
}

.text {
  color: #ffffff;
}
.bottom-right {
  bottom: 0;
  right: 0;
  padding: 1rem;
  position: absolute;
  background: rgb(106, 95, 73);
  border-top-left-radius: 80px 80px;
  width: 80%;
  height: 15%;
  color: #ffffff;
  /* center overlay text */
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  padding: 10px;
  z-index: 2;
}

.grid-items {
  text-align: center;
  padding: 25px 0;
  z-index: 2;
}

a {
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
