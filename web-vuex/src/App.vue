<template>
  <div id="app">

    <div >
      <Login class="l1" v-if="$store.state.islogin"></Login>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
  import Login from '@/views/Login';
  import Main from '@/views/Main';

  export default {
    name:'app',
    data:function(){
      return{
        msg:true,
        islogin:true
        }
      },
    components: {
      // HelloWorld
      Login,
      Main
    },
    mounted(){
      // console.log(window.location.href)
    }

  }

// import About from "@/views/About.vue";


</script>


<style lang="less" >
  *{
    padding: 0;
    margin: 0;
  }
#app{
  height: 100%;
 // background: url("assets/images/4.jpg")  no-repeat !important;
  background-size: cover ;
  overflow: hidden;
}
  .l1{
    margin: 200px 500px;

  }
</style>


