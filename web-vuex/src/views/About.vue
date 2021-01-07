<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- <WelCome  v-if="$store.state.islogin"></WelCome> -->
     <router-view></router-view>

  </div>
</template>
<style lang="stylus" scoped></style>
<script>
import WelCome from '../views/WelCome.vue'
export default {
  name: "about",
   components:{
    WelCome
   }
};
</script>
