<template>
  <div>
    <div>
      <div class="secondary-navigation">
        <el-button
          class="secondary-option"
          :class="[item.iconName, { active: item.isActive }]"
          v-for="item in menuItems"
          :key="item.id"
          @click="navigateTo(item)"
          type="primary"
        >
          <!-- 可以在这里添加按钮的内容 -->
          {{ item.label }}
        </el-button>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientInformation",
  data() {
    return {
      menuItems: [
        {
          id: 1,
          label: "数据信息",
          route: "/operationPlatform/patientInformation/information",
          iconName: "el-icon-data-analysis",
          isActive: true,
        },
        {
          id: 2,
          label: "CMI值",
          route: "/operationPlatform/patientInformation/CMI",
          iconName: "el-icon-star-off",
          isActive: false,
        },
      ],
    };
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
.secondary-navigation {
  margin-left: 60px;
}
.secondary-option {
  color: white;
}
.secondary-option.active {
  color: #00ffff;
  border-color: #035252;
  font-weight: bold;
}
.content {
  /* height: 100vh; */
  padding-left: 30px;
  padding-right: 30px;
  background-color: #081326;
  flex: 1;
}
</style>