<template>
  <div id="container">
    <div class="product-details">
      <h1>{{ name }}</h1>

      <p class="information">{{ detail }}</p>

      <div class="control">
        <button class="btn">
          <span class="buy" @click="$router.push('/room/' + id)"
            >รายละเอียดเพิ่มเติม</span
          >
        </button>
      </div>
    </div>

    <div class="product-image">
      <img :src="picture" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: () => '',
    },
    picture: {
      type: String,
      default: () => '',
    },
    name: {
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

<style>
#body {
  background: #dfc2f2;
  background-image: linear-gradient(to right, #ffffb3, #ffe6e6);
  background-attachment: fixed;
  background-size: cover;
}

#container {
  box-shadow: 0 15px 30px 1px grey;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  margin: 1em auto;
  height: 350px;
  width: 700px;
}

.product-details {
  position: relative;
  text-align: left;
  overflow: hidden;
  padding: 30px;
  height: 100%;
  float: left;
  width: 40%;
}

#container .product-details h1 {
  display: inline-block;
  position: relative;
  font-size: 23px;
  color: #344055;
  margin: 0;
}

#container .product-details > p {
  text-align: start;
  font-size: 18px;
  color: #7d7d7d;
}
.control {
  position: absolute;
  bottom: 20%;
  left: 22.8%;
}
.btn {
  transform: translateY(0px);
  transition: 0.3s linear;
  background: #809fff;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border: none;
  color: #eee;
  padding: 0;
  margin: 0;
}

.btn:hover {
  transform: translateY(-6px);
  background: #1a66ff;
}

.btn span {
  transition: transform 0.3s;
  display: inline-block;
  padding: 10px 20px;
  font-size: 0.5em;
  margin: 0;
}
.btn .price,
.shopping-cart {
  background: #333;
  border: 0;
  margin: 0;
}

.btn .price {
  transform: translateX(-10%);
  padding-right: 15px;
}

.btn .shopping-cart {
  transform: translateX(-100%);
  position: absolute;
  background: #333;
  z-index: 1;
  left: 0;
  top: 0;
}

.btn .buy {
  z-index: 3;
  font-weight: bolder;
}

.btn:hover .price {
  transform: translateX(-110%);
}

.btn:hover .shopping-cart {
  transform: translateX(0%);
}

.product-image {
  transition: all 0.3s ease-out;
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 100%;
  float: right;
  width: 45%;
  display: inline-block;
}

#container img {
  width: 100%;
  height: 100%;
}

.info {
  background: rgba(27, 26, 26, 0.9);
  font-family: 'Bree Serif', serif;
  transition: all 0.3s ease-out;
  transform: translateX(-100%);
  position: absolute;
  line-height: 1.8;
  text-align: left;
  font-size: 105%;
  cursor: no-drop;
  color: #fff;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.info h2 {
  text-align: center;
}
.product-image:hover .info {
  transform: translateX(0);
}

.info ul li {
  transition: 0.3s ease;
}
.info ul li:hover {
  transform: translateX(50px) scale(1.3);
}

.product-image:hover img {
  transition: all 0.3s ease-out;
}
.product-image:hover img {
  transform: scale(1.2, 1.2);
}
</style>
