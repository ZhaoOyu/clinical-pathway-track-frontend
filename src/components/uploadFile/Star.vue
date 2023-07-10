<template>
  <div>
    <div class="star">
      <img
        :src="imgSrc"
        alt
        v-for="(item,index) in allRanks"
        :key="item"
        @click="handleClick(index,0)"
      />
      <img
        :src="imgSrc2"
        alt
        v-for="(item,index) in otherRanks"
        :key="item"
        @click="handleClick(index,allRanks.length)"
      />
    </div>
  </div>
</template>
<script>
// 星星长度 
const LENGTH = 5

// 星星的状态

const mock = [1, 2, 3, 4, 5]
export default {
  name: 'Star',
  data () {
    return {
      score: 3,
      imgSrc: require('../../../public/img/all.png'),
      imgSrc2: require('../../../public/img/none.png'),
      allRanks: [],
      otherRanks: []
    }
  },
  watch: {
    score () {
      this.allRanks = mock.slice(0, this.score)
      this.otherRanks = mock.slice(this.score)
    }

  },
  methods: {
    handleClick (index, begin) {
      this.score = index + begin + 1
    }
  },
  mounted () {
    this.allRanks = mock.slice(0, this.score)
    this.otherRanks = mock.slice(this.score)
  }
}
</script>
<style scoped lang='scss'>
.star {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    cursor: pointer;
  }
}
.star-item.on {
  background-image: url(../../../public/img/all.png);
}
.star-item.half {
  background-image: url(../../../public/img/half.png);
}
.star-item.off {
  background-image: url(../../../public/img/none.png);
}
</style>