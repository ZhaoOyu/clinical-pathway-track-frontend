<template>
  <div>
    <div class="container">
      <div class="sidebar">
        <div
          v-for="(tab, index) in Tabs"
          :key="index"
          class="tabs"
          :class="{ active: tab.isActive }"
          @click="selectTab(tab, index)"
        >
          {{ tab.title }}
        </div>
      </div>
      <div class="content">
        <PatientInfo v-if="index === 0" />
        <IncomeStructure v-if="index === 1" />
        <IncomeScale v-if="index === 2" />
        <CostStructure v-if="index === 3" />
      </div>
    </div>
  </div>
</template>

<script>
import CostStructure from "./CostStructure.vue";
import IncomeScale from "./IncomeScale.vue";
import PatientInfo from "./PatientInfo.vue";
import IncomeStructure from "./IncomeStructure.vue";
export default {
  name: "Tab",
  components: {
    CostStructure,
    IncomeScale,
    PatientInfo,
    IncomeStructure,
  },
  data() {
    return {
      index: 0,
      Tabs: [
        { title: "患者信息", isActive: true },
        { title: "收入结构", isActive: false },
        { title: "收入规模", isActive: false },
        { title: "成本结构", isActive: false },
      ],
    };
  },
  methods: {
    selectTab(selectedTab, index) {
      this.index = index;
      this.Tabs.forEach((tab) => {
        tab.isActive = tab === selectedTab;
      });
    },
  },
  // beforeMount: {
  //   initIndex() {
  //     setTimeout(() => {
  //       console.log("hhh");
  //     }, 5000);
  //     this.Tabs[0].isActive = true;
  //   },
  // },
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: auto;
  display: flex;
}
.sidebar {
  width: 100px;
}

.tabs {
  cursor: default;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 100px;
  height: 100px;
  border-spacing: 0;
  border-right: 3px white solid;
  margin: 15px 0px;
  color: white;
  font-size: 20px;
}
.tabs.active {
  font-weight: bold;
  color: #00ffff;
  border-color: #00ffff;
}
.content {
  width: 90%;
}
</style>

