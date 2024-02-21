import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Shop from '../views/shop/Shop'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import CartList from '../views/cartList/CartList'
import OrderConfirmation from '../views/orderConfirmation/OrderConfirmation'
import OrderList from '../views/orderList/OrderList'
import PersonalInfo from '../views/personalInfo/PersonalInfo'
import MyAddressList from '../views/myAddressList/MyAddressList'
import UpsertAddress from '../views/upsertAddress/UpsertAddress'
import ChooseAddressList from '../views/chooseAddressList/ChooseAddressList'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personal',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/upsertAddress/:id?',
    name: 'UpsertAddress',
    component: UpsertAddress
  },
  {
    path: '/chooseAddressList/:shopId',
    name: 'ChooseAddressList',
    component: ChooseAddressList
  },
  {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: MyAddressList
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: CartList
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/orderConfirmation/:id/:addressId?',
    name: 'OrderConfirmation',
    component: OrderConfirmation
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
