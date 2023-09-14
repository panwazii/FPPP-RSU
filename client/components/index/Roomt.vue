<template>
  <div class="container">
    <div class="card">
      <h3 class="title">{{ title }}</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <v-avatar class="justify-center" size="200" rounded="0">
          <v-img :src="picture"></v-img>
        </v-avatar>
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

body {
  font-family: 'Open Sans', sans-serif;
}

.card {
  display: flex;
  height: 380px;
  width: 300px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
  margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}

.circle {
  position: absolute;
  top: 120px;
  left: calc(50% - 100px);
}

.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}

svg {
  fill: #17141d;
  stroke-width: 2px;
}

.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
  background-image: url(~/static/img/index/ventilation_mono.png);
}

.center {
  padding: 180px 0;
  font-family: Fantasy;
  font-size: 40px;
  text-align: center;
}
.left h1 {
  color: rgb(106, 95, 73);
}
.left {
  width: 50%;
  height: 600px;
  text-align: center;
  border-radius: 8px;
}
.right {
  width: 200%;
  height: 800px;
  background-image: url(~/static/img/index/872.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: white;
  margin-left: 50px;
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

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    margin: 0 20px;
  }
  .left {
    width: 100%;
    height: 400px;
  }
  .right {
    width: 90%;
    margin: 0;
    margin-top: -100px;
  }
}
</style>
