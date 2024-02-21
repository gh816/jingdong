<template>
  <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item"></ShopInfo>
      </router-link>
     <!-- <div class="nearby__item" v-for="item in nearbyList" :key="item._id">
        <img
          class="nearby__item__img"
          :src="item.imgUrl"
        />
        <div class="nearby__content">
          <div class="nearby__content__title">{{item.name}}</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售: {{ item.sales }}</span>
            <span class="nearby__content__tag">起送:{{ item.expressLimit }}</span>
            <span class="nearby__content__tag">基础运费:{{ item.expressPrice }}</span>
          </div>
          <p class="nearby__content__highlight">
            {{ item.slogan }}
          </p>
        </div>
      </div>-->
    </div>
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    console.log(result.data)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriales.scss";
@import "../../style/mixins.scss";
.nearby__title {
  margin: 0.16rem 0 0.02rem 0;
  font-size: 0.18rem;
  color: $content-font-color;
  font-weight: normal;
}
a{
  text-decoration: none;
}
</style>
