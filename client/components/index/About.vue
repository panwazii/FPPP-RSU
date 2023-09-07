<template>
  <div class="container">
    <div class="left"></div>
    <div class="right">
      <div class="content">
        <h1>Processing Plant</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          assumenda dolore reprehenderit ullam blanditiis ex sapiente pariatur
          tempore incidunt facilis?
        </p>
        <a href="#" class="btn">ABOUT</a>
      </div>
    </div>
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
.container {
  width: 90%;
  max-width: 1000px;
  height: 270px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}
.left {
  width: 35%;
  height: 500px;
  background: url(https://www.millconsteel.com/wp-content/uploads/2019/12/%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%8A%E0%B8%B1%E0%B8%A2-%E0%B8%A5%E0%B8%B5%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B4%E0%B9%8C%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B9%E0%B8%A5-5-1200x800.jpg)
    no-repeat center / cover;
  border-radius: 100px;
  margin-top: -150px;
  margin-right: 100px;
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
