<template>
  <div class="shop">
        <img
          class="shop__img"
          :src="item.imgUrl"
        />
        <div :class="{'shop__content': true, 'shop__bordered': hideBorder ? false: true}">
          <div class="shop__content__title">{{item.name}}</div>
          <div class="shop__content__tags">
            <span class="shop__content__tag">月售: {{ item.sales }}</span>
            <span class="shop__content__tag">起送:{{ item.expressLimit }}</span>
            <span class="shop__content__tag">基础运费:{{ item.expressPrice }}</span>
          </div>
          <p class="shop__content__highlight">
            {{ item.slogan }}
          </p>
        </div>
      </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>
<style lang="scss" scoped>
@import "../style/viriales.scss";
@import "../style/mixins.scss";
.shop {
  padding-top: 0.12rem;
  display: flex;
}
.shop__img {
  margin-right: 0.16rem;
  width: 0.56rem;
  height: 0.56rem;
}
.shop__content {
  flex: 1;
  padding-bottom: 0.12rem;
}
.shop__bordered {
  border-bottom: 1px solid $content-bgColor;
}
.shop__content__title {
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-font-color;
}
.shop__content__tags {
  margin-top: 0.08rem;
  line-height: 0.18rem;
  font-size: 0.13rem;
  color: $content-font-color;
}
.shop__content__tag {
  margin-right: 0.16rem;
}
.shop__content__highlight {
  margin: 0.08rem 0 0 0;
  line-height: 0.18rem;
  font-size: 0.13rem;
  color: $hight-light-fontColor;
}
</style>
