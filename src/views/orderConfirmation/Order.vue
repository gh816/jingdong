<template>
  <div class="order">
      <div class="order__price">实付金额 <b>¥{{ price }}</b></div>
      <div class="order__btn" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div
    class="mask" v-show="showConfirm" @click="() => handleShowConfirmChange(false)">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useStore } from 'vuex'
import { post } from '../../utils/request'

const useMakeOrderEffect = () => {
  const router = useRouter()
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const { price, shopName, productLista } = useCommonCartEffect(shopId)
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productLista.value) {
      const product = productLista.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const result = await post('/api/order', {
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCarData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      console.log('错误')
    }
  }
  return { price, handleConfirmOrder }
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Order',
  setup () {
    const showConfirm = ref(false)
    const { price, handleConfirmOrder } = useMakeOrderEffect()
    const handleShowConfirmChange = (status) => {
      showConfirm.value = status
    }
    return { price, handleConfirmOrder, showConfirm, handleShowConfirmChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriales.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-font-color;
  }
  &__btn {
    width: .98rem;
    background: $btn-bgColor;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bgColor;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: $content-font-color;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: .01rem solid $btn-bgColor;
        color: $btn-bgColor;
      }
      &--last {
        margin-left: .12rem;
        background: $btn-bgColor;
        color: #fff;
      }
    }
  }
}
</style>
