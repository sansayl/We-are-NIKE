<template>
  <div id="app">
    <el-container>
      <el-header height="60px">
        <div class="systemImg">
          <img
            class="logo"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072177575,1951826205&fm=26&gp=0.jpg"
            alt=""/>
         
        </div>
         <div class="systemName">
            We are Nick
          </div>
        <div class="systemUser">
          <el-row class="demo-avatar demo-basic">
            <el-col :span="12">
              <div class="sub-title"></div>
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                
              </div>
            </el-col>

          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <Home></Home>
        </el-aside>
        <el-main>
          <About></About>
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

export default {
  name: "app",

  components: {
    Home,
    About
  },
  data() {
    return {
      isCollapse: true,
       circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        sizeList: ["large"]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>


<style lang="less" >
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.el-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #001529;
  color: #333;
}

.el-aside {
  background-color: #001529;
  color: #333;
  text-align: center;
  // line-height: 700px;
  // height:80%;
  //width: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

//顶部
.systemImg {
  width: 400px;
  height: 60px;
  overflow: hidden;
  float: left;
}
//左侧logo
.logo {
  width: 170px;
  height: 60px;
  margin-left: 10px;
  vertical-align: top;
}
.systemName{
  height: 60px;
  width: 200px;
  text-align: center;
  line-height: 60px;
  font-size: 28px;
  font-weight: bold;
  float: left;
  margin-left:450px ;
  color: white;
 
}
//顶部右边样式
.systemUser{
  width: 60px;
  height: 60px;
  float: right;
  margin-right: 50px;
  padding-top:5px ;

}
</style>


