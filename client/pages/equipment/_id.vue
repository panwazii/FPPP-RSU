<template>
  <div>
    <section>
      <div class="bottom-right"></div>
      <div class="card">
        <v-card class="cardinfo">
          <div class="cardcontainer">
            <v-img :src="equipment.picture" cover class="img"> </v-img>

            <v-card-text>
              <div>
                <span class="h1">{{ equipment.name }}</span>
                <!-- <span class="right h1">{{ equipment.name }}</span> -->
              </div>
              <div class="mt-5">
                <h2>
                  {{ equipment.details }}
                </h2>
              </div>
            </v-card-text>

            <v-btn class="rounded-xl mt-12 mx-2" width="300" color="yellow">
              <h1 class="textcategory">CATEGORIES</h1></v-btn
            >
            <v-btn class="right mt-12 mx-12" width="500" color="#6A5F49">
              <h1 class="text">ADD TO CART</h1></v-btn
            >
          </div>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let equipment = await this.$store.dispatch(
      'api/public/getSingleEquipmentInfo',
      {
        params: { id: this.id },
      }
    )
    if (equipment == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.equipment = equipment.Data
    }
  },
  data() {
    return {
      equipment: {},
      tool: [],
    }
  },
  methods: {},
}
</script>

<style scoped>
.text {
  color: #ffffff;
}

.textcategory {
  color: #080707;
}

section {
  top: 0;
  min-height: 100vh;
  width: 100%;
  display: grid;
  background-color: #ffffff;
  position: relative;
}

section .bottom-right {
  top: 100px;
  right: -40px;
  padding: 1rem;
  position: absolute;
  background: rgb(106, 95, 73);
  border-radius: 40px;
  width: 80%;
  height: 15%;
  color: #ffffff;
  /* center overlay text */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: -200px;
  height: 2200px;
  font-weight: bold;
  z-index: 0;
}

.container {
  max-width: 70%;
  margin: 100px auto;
}

.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 70%;
  max-height: 500px;
}

.card {
  margin: auto;
  width: 80%;
  height: 80%;
  padding: 10px;
}

.cardinfo {
  margin: auto;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(0, 0, 0);
  padding: 10px;
  border-radius: 100px;
}

.cardcontainer {
  margin: auto;
  margin-top: 50px;
  width: 80%;
  height: 90%;
  position: relative;
}
.right {
  position: absolute;
  right: 0px;
  width: 300px;
  padding: 10px;
}
.h1 {
  font-family: verdana;
  font-size: 150%;
}
</style>
