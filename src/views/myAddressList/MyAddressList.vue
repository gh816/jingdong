<template>
  <div class="wrapper">
    <div class="title">
      <div
        class="iconfont title__back"
        @click="handleBackClick"
      >&#xe6f2;</div>
      <div class="title__text">管理收货地址</div>
      <div class="title__add" @click="handleAddClick">新建</div>
    </div>
    <Address v-for="address in addressList" :address="address" :key="address._id" @click="() => handleUpdateClick(address._id)"></Address>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Address from '../../components/Address'

export default {
  name: 'MyAddressList',
  components: { Address },
  setup () {
    const router = useRouter()
    const addressList = ref([])
    const getAddress = async () => {
      const result = await get('/api/user/address')
      addressList.value = result.data
    }
    getAddress()

    const handleAddClick = () => {
      router.push({ name: 'UpsertAddress' })
    }
    const handleUpdateClick = (addressId) => { router.push(`/upsertAddress/${addressId}`) }
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick, handleAddClick, addressList, handleUpdateClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriales.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: $dark-bgColor;
}
.title {
  display: flex;
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-font-color;
  text-align: center;
  &__back {
    width: .2rem;
    margin-left: .18rem;
    font-size: .2rem;
    color: #B6B6B6;
  }
  &__text {
    flex: 1;
    text-align: center;
  }
  &__add {
    margin-right: .2rem;
    font-size: .14rem;
  }
}

</style>
