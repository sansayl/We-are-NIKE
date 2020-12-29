<template>
  <div id="app">
    <el-container>
      <el-header line-height="60px">
        <div class="systemImg">
          <img
            class="logo"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072177575,1951826205&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
        <div class="systemName">We are Nike</div>
        <div class="systemUser">
          <div class="headImgs">
            <el-row class="demo-avatar demo-basic ">
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
          <div class="headList">
            <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#001529"
              text-color="#fff"
              active-text-color="#001529">
              <el-submenu index="1">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">首页</el-menu-item>
                <el-menu-item index="2-2">用户信息</el-menu-item>
                <el-menu-item index="2-3">修改密码</el-menu-item>
                <el-menu-item index="2-3">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Home></Home>
        </el-aside>
        <el-main class="cont">
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
    About,
  },
  data() {
    return {
      isCollapse: true,
      circleUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      sizeList: ["large"],
      // 顶部登录退出
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 顶部登录退出
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
};
</script>


<style  >
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
}
#app {
  width: 100%;
}
.el-container {
  margin: 0;
  padding: 0;
  width: 100%;
  /* height: 100%; */
}
.el-header,
.el-footer {
  background-color: #001529;
  color: #333;
}

.el-aside {
  background-color: #001529;
  color: #333;
  /* // text-align: center;
  // line-height: 700px;
  // height:80%;
  //width: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
<<<<<<< HEAD
  padding: 0px !important;
=======
  // text-align: center;
  // line-height: 160px;
>>>>>>> dcf194deba4d2f1d16692ed8b6989ffe4c92aca5
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

/* //顶部 */
.systemImg {
  width: 33.3%;
  height: 60px;
  overflow: hidden;
  float: left;
  /* background: pink; */
}
/* //左侧logo */
.logo {
  width: 170px;
  height: 60px;
  vertical-align: top;
}
.systemName {
  width: 33.3%;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
  float: left;
  color: white;

  /* //background: tomato; */
}
/* //顶部右边样式 */
.systemUser {
  width: 33.3%;
  /* line-height: 60px; */
  float: left;
  padding-top: 5px;
}
.headImgs {
  width: 60%;
  float: left;
  margin-right: 10px;
  
}
.demo-avatar{
  float: right;

}
/* 顶部右边样式 */
.headList{
  width: 30%;
  /* line-height: 60px; */
  /* background: pink; */
  float: left;
  overflow: hidden;
  height: 60px;

}

/* .el-menu ,.el-submenu{
  height: 40px !important;
  line-height: 40px;
} */
.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 40px !important;
  line-height: 60px;
  border-bottom: 0px !important;
}
/* 顶部右侧的文字 */
.el-menu::after, .el-menu::before{
  display: none;
}

</style>


