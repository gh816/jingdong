import { useStore } from 'vuex'
import { toRefs, computed } from 'vue'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  return { cartList, changeCartItemInfo, productList }
}
