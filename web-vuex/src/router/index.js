import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login'


import FenLei from '../views/FenLei.vue'
import Size from '../views/Size.vue'
import Goods from '../views/Goods.vue'
import Select from '../views/Select.vue'
import Order from '../views/Order.vue'
import SendGoods from '../views/SendGoods.vue'
import WareHouse from '../views/WareHouse.vue'
import Role from '../views/Role.vue'
import StaffMang from '../views/StaffMang.vue'
import WelCome from '../views/WelCome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children:[
          {
            path: 'welcome',
            name: 'WelCome',
            component: WelCome
          },

          {
            path: 'goodsType',
            name: 'FenLei',
            component: FenLei
          },
          {
            path: 'goodsTypeSize',
            name: 'Size',
            component: Size
          },
          {
            path: 'commodity',
            name: 'Goods',
            component: Goods
          },
          {
            path: 'select',
            name: 'Select',
            component: Select
          },
          {
            path: 'orders',
            name: 'Order',
            component: Order
          },
          {
            path: 'delivery',
            name: 'SendGoods',
            component: SendGoods
          },
          {
            path: 'repository',
            name: 'WareHouse',
            component: WareHouse
          },
          {
            path: 'role',
            name: 'Role',
            component: Role
          },
          {
            path: 'employee',
            name: 'StaffMang',
            component: StaffMang
          },
    ]
  },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
