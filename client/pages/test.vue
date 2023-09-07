<template>
  <div>
    <section>
      <div class="container">
        <div class="left">
          <h1 class="center">FOOD PROCESS PILOT PLANT</h1>
        </div>
        <div class="right"></div>
      </div>
    </section>
    <indexAbout />
    <indexService />
    <indexRoomt />
    <indexNews />
    <indexContact />
  </div>
</template>

<style scoped>
section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
.container {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}

.center {
  padding: 180px 0;
  font-family: Fantasy;
  font-size: 40px;
  text-align: center;
}
.left {
  width: 50%;
  height: 600px;
  text-align: center;

  background-color: #ffffff;
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
