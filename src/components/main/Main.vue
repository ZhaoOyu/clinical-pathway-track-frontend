<template>
  <div class="main">
    <!-- <button @click="display">查看某些属性</button> -->
    <Header v-if="!yuanZhang"></Header>
    <router-view></router-view>
  </div>
</template>
 
<script>
import Header from "../Header.vue";
export default {
  components: { Header },
  data() {
    return {
      yuanZhang: false,
    };
  },
  watch: {
    $route: {
      handler: function (newV) {
        if (
          newV.name === "yuanZhang" ||
          newV.name === "login" ||
          newV.name === "monitorPlatform" ||
          newV.name === "dashboard" ||
          newV.name === "evaluation" ||
          newV.name === "quality" ||
          newV.name === "feedback"
        ) {
          this.yuanZhang = true;
        } else {
          this.yuanZhang = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    // display(){
    //   console.log("---------1.Vue对象-------");
    //   console.log("Vue对象：",this);
    //   console.log("---------2.$attrs属性-------");
    //   //从父传过来的非prop属性
    //   console.log("$attrs属性：",this.$attrs);
    //   console.log("---------3.$children属性-------");
    //   //子组件即可
    //   console.log("$children属性：",this.$children);
    // }
  },
};
</script>
 
<style lang="scss" scoped>
.main {
  height: 100%;
}
</style>