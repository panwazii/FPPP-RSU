<template>
  <div class="container">
    <div class="card">
      <div class="content">
        <div class="imgBx">
          <v-img :src="picture" height="100px"></v-img>
        </div>
        <div class="contentBx">
          <h3>{{ name }}</h3>
        </div>
      </div>
      <ul class="sci">
        <li>
          <a href=""><span class="mdi mdi-information-outline"></span></a>

          <a href="" class="ma-2 pa-2"
            ><span class="mdi mdi-cart-plus"></span
          ></a>
        </li>
      </ul>
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
  },
}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

.grid {
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 3rem;
}

.container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0;
}

.container .card {
  position: relative;
  width: 300px;
  height: 350px;
  background: rgba(255, 255, 255, 0.05);
  margin: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.container .card .content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.5s;
}

.container .card:hover .content {
  transform: translateY(-20px);
}

.container .card .content .imgBx {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.container .card .content .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container .card .content .contentBx h3 {
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  margin: 20px 0 10px;
  line-height: 1.1em;
}

.container .card .content .contentBx h3 span {
  font-size: 12px;
  font-weight: 300;
  text-transform: initial;
}

.container .card .sci {
  position: absolute;
  bottom: 50px;
  display: flex;
}

.container .card .sci li {
  list-style: none;
  margin: 0 10px;
  transform: translateY(40px);
  transition: 0.5s;
  opacity: 0;
}

.container .card:hover .sci li {
  transform: translateY(0px);
  opacity: 1;
}

.container .card .sci li a {
  color: #000000;
  font-size: 30px;
}
</style>
