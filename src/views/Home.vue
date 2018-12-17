<template>
<div>

    <div
      class="home-container"
      :style="{ backgroundImage: `url('${require('@/assets/movies-background.jpg')}')` }"
    >

    <!-- Ce qui ira SUR l'image -->

  </div>
  <!--  Ce qui ira SOUS l'image -->
</div>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>


<style>

body, html {
  height: 100%;
}

.home-container {
  height: 100vh;
  width: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  position: relative;
}

.btn {
  z-index: 2;
}
</style>
