<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div />

        <!-- 航班头部布局 -->
        <FlightsListHead />
        <!-- 航班信息 -->
        <flights-item v-for="(item,index) in flightsData.flights" :key="index" :data="item" />
        <el-pagination
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem.vue'

export default {
  components: {
    FlightsListHead, FlightsItem
  },
  data () {
    return {
      // 航班总数据
      flightsData: {},
      //   航班分页显示数据
      dataList: []
    }
  },
  mounted () {
    this.getFlightsData()
    // console.dir(this.flightsData, 1111)
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getFlightsData () {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
        console.log(res)
        this.flightsData = res.data
        console.log(this.flightsData)
      })
    }
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
