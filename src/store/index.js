import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList, addressList } = state
  const cartListString = JSON.stringify(cartList)
  const cartAddressList = JSON.stringify(addressList)
  localStorage.cartList = cartListString
  localStorage.addressList = cartAddressList
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

const getLocalAddressList = () => {
  try {
    return JSON.parse(localStorage.addressList)
  } catch (e) {
    return []
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
    addressList: getLocalAddressList()
  /*  cartList: {
      /* shopId: {
        shopName: '沃尔玛',
        productList: {
          productId: {
            _id: '1',
            name: '番茄250g/份',0
            imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
            sales: 10,
            price: 33.6,
            oldPrice: 39.6,
            count: 2
          }
        }
      }
    } */
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      // eslint-disable-next-line prefer-const
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCarData (state, shopId) {
      state.cartList[shopId].productList = {}
    },
    changeAddressList (state, value) {
      state.addressList.splice(0, state.addressList.length, ...value)
    }
  },
  actions: {
  },
  modules: {
  }
})
