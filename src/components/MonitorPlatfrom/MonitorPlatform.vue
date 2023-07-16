<template>
  <div class="container">
    <div class="top">
      <div class="banner">医疗质量监管平台</div>
      <div class="header">
        <div class="d0 d1"></div>
        <div class="d0 d2"></div>
        <div class="d0 d3"></div>
      </div>
    </div>
    <div class="yuanZhang">
      <el-button @click="$router.push('/yuanZhang')" type="primary" round
        >院长视角</el-button
      >
    </div>
    <div class="body">
      <div class="sidebar">
        <div
          class="menu-item"
          :class="[item.iconName, { active: item.isActive }]"
          v-for="item in menuItems"
          :key="item.id"
          @click="navigateTo(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      menuItems: [
        {
          id: 1,
          label: "Dashboard",
          route: "/monitorPlatform/dashboard",
          iconName: "el-icon-odometer",
          isActive: true,
        },
        {
          id: 2,
          label: "医疗质量",
          route: "/monitorPlatform/quality",
          iconName: "el-icon-first-aid-kit",
          isActive: false,
        },
        {
          id: 3,
          label: "运营效率",
          route: "/monitorPlatform/efficiency",
          iconName: "el-icon-data-analysis",
          isActive: false,
        },
        {
          id: 4,
          label: "满意度",
          route: "/monitorPlatform/evaluation",
          iconName: "el-icon-edit-outline",
          isActive: false,
        },
      ],
    };
  },
  mounted() {
    this.$router.push("/monitorPlatform/dashboard");
  },
  methods: {
    navigateTo(item) {
      // 使用Vue Router的编程式导航进行路由跳转
      this.$router.push(item.route);
      this.menuItems.forEach((tab) => {
        tab.isActive = tab === item;
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #081326;
}
.top {
  position: fixed;
  width: 100%;
  z-index: 999;
}
.banner {
  background-color: #0e1d38;
  line-height: 90px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: white;
  height: 67.45px;
}
.header {
  background-color: #081326;
  display: flex;
  .d0 {
    //background-color: #00ffff;
    width: 33.3%;
    height: 20px;
  }
  .d1 {
    border-top: 1px solid #3a77e6;
    border-right: 2px solid #3a77e6;
    transform: skewX(20deg);
  }
  .d3 {
    border-top: 1px solid #3a77e6;
    border-left: 2px solid #3a77e6;
    transform: skewX(-20deg);
  }
  .d2 {
    background-color: #0e1d38;
    margin-left: 2px;
    border-bottom: 2px solid #3a77e6;
    margin-right: 2px;
  }
}

.body {
  padding-top: 90px;
  background: 100% 100%;
  background-color: #081326;
  display: flex;
}

.sidebar {
  background-color: #081326;
  position: fixed;
  white-space: nowrap;
  border-right: skyblue 1px solid;
  padding: 10px;
  box-sizing: border-box;
  min-width: 160px;
  height: 100vh;
  background-color: #0e1d38;
  display: flex;
  flex-direction: column;
}

.menu-item {
  color: white;
  font-size: 20px;
  cursor: default;
  line-height: 60px;
  height: 60px;
}
.menu-item.active {
  font-weight: bold;
  color: #00ffff;
  border-color: #00ffff;
}

.content {
  //height: 100vh;
  padding-top: 50px;
  background-color: #081326;
  flex: 1;
  padding-left: 200px;
  padding-right: 30px;
}
.yuanZhang {
  cursor: default;
  text-align: right;
  position: fixed;
  top: 15px;
  right: 10px;

  z-index: 9999;
}
</style>
  