<template>
  <div class="docker">
    <div class="docker__item"
     v-for="(item, index) in dockerList" :key="item.icon"
     :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
     >
     <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.text}}</div>
     </router-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe7e5;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe61e;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'PersonalInfo' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriales.scss";
@import "../style/mixins.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
}
.docker__item {
  flex: 1;
  text-align: center;
  margin-top: .1rem;
}
a{
  color: $content-font-color;
  text-decoration: none;
}
.iconfont {
  font-size: 0.18rem;
}
.docker__item--active {
  a{
    color: #1fa4fc;
  }
}
</style>
