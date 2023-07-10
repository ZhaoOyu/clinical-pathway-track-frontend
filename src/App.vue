<template>
  <div id="app">
    <Main a="1"></Main>
  </div>
</template>

<script>
import Main from './components/main/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  },

}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
.blue {
  color: #3981ee;
}
.orange {
  color: #f29308;
}
.red {
  color: #ec3333 !important;
}
.bold {
  font-weight: bold;
}
.green {
  color: #7ac756;
}
.purple {
  color: #893fef;
}
.orangeBackground {
  background: #f29308;
}
.white {
  color: white;
}
.small {
  font-size: 12px;
}
.medium {
  font-size: 14px;
}
.appleColor {
  color: #e64c65;
}
.drg {
  color: #ec3333;
  font-size: 16px;
  font-weight: bold;
}
.amap-logo {
  display: none !important;
  visibility: hidden !important;
}
.amap-copyright {
  display: none !important;
  visibility: hidden !important;
}
</style>
