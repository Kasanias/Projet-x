<template>
  <div>
    <div
      class="home-container"
      :style="{ backgroundImage: `url('${require('@/assets/movies-background.jpg')}')` }"
    ></div>
    
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
.home-container {
  height: 100vh;
  width: 100vw;
}
</style>
