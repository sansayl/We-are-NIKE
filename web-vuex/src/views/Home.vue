<template>
  <div class="home">
    <div class="headImg">
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"
          ></el-image>
        </div>
      </div>
      <p>你好:{{ Login_employee }}欢迎回来</p>
    </div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="index + ''"
            v-for="(menu, index) in menuList"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.powername }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="index + '-' + menuIndex"
                v-for="(menuItem, menuIndex) in menu.children"
                :key="menuIndex"
              >
                <router-link :to="'/about'+ menuItem.powerurl">{{
                  menuItem.powername
                }}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" >
                <router-link to="/about/fenlei">分类管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/about/size">尺寸管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                 <router-link to="/about/goods">商品管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
              <router-link to="/about/select">商品查询管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                 <router-link to="/about/order">订单管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                 <router-link to="/about/">退款管理</router-link>
              </el-menu-item>
              
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>发货管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                 <router-link to="/about/sendgoods">发货管理</router-link>
              </el-menu-item>
             
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>仓库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                 <router-link to="/about/warehouse">仓库管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>员工管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <router-link to="/about/role">角色管理</router-link>
              </el-menu-item>
              <el-menu-item index="5-2">
                <router-link to="/about/staffmang">员工管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      Login_employee: "",
      isCollapse: true,
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  computed: {
    //菜单数据
    menuList: function () {
      return this.$store.getters.menuList.filter(item => {
        return item.children.length > 0;
      });
    },
  },
  mounted() {
    this.Login_employee = window.sessionStorage.getItem("employee");

    //获取菜单

    let powerData = window.sessionStorage.getItem("powerList");

    if (powerData) {
      this.$store.commit("setPower", JSON.parse(powerData));
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
html {
  height: 100%;
}
body {
  height: 100%;
}
//左侧菜单栏宽度
.home {
  width: 200px;
  height: 735px;
}
//登录用户头像
.headImg {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.imghead {
  width: 140px;
  height: 120px;
  border: 1px solid;
}
.headImg p {
  height: 30px;
  margin-top: 0;
  color: white;
  text-align: center;
  font-size: 12px;
  line-height: 30px;
}
.demo-image {
  margin-top: 20px;
}
span {
  font-size: 14px;
  font-weight: 100px;
}

//左侧菜单栏颜色样式
.router-link-active {
  text-decoration: none;
  color: teal;
}
a {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
}
</style>