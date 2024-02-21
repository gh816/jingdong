import { useStore } from 'vuex'
import { get } from '../utils/request'

const useCommonAddressEffect = () => {
  const store = useStore()
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.data?.length) {
      store.commit('changeAddressList', result.data)
    }
  }
  return { getAddressList }
}

export default useCommonAddressEffect
