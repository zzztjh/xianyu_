<template>
  <div>
    <div class="taps">
      <span
        v-for="(item, index) in ['新闻','娱乐','体育']"
        :key=" index "
        :class="{ active:cuttent === index }"
        @click="changeTap(index)"
      >{{ item }}</span>
    </div>
    <div v-show="cuttent===0">
      <ul>
        <li>新闻</li>
        <li>新闻</li>
        <li>新闻</li>
      </ul>
    </div>
    <div v-show="cuttent===1">
      <ul>
        <li>娱乐</li>
        <li>娱乐</li>
        <li>娱乐</li>
      </ul>
    </div>
    <div v-show="cuttent===2">
      <ul>
        <li>体育</li>
        <li>体育</li>
        <li>体育</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cuttent: 0
    }
  },
  methods: {
    changeTap (index) {
      this.cuttent = index
    }
  }
}
</script>

<style lang="less" scoped>
.taps{
    padding-left:  50px;
    span {
        margin-left: 10px;
        cursor: pointer;
    }
}
.active {
    color: hotpink;
}
</style>
