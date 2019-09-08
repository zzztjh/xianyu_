<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setFlightsData="setFlightsData" />
        <div />

        <!-- 航班头部布局 -->
        <FlightsListHead />
        <!-- 航班信息 -->
        <flights-item v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/flightsAside.vue'

export default {
  components: {
    FlightsListHead, FlightsItem, FlightsFilters, FlightsAside
  },
  data () {
    return {
      // 备用一份总数据   用来实现筛选功能
      cacheFlightsData: {
        info: {},
        flights: [],
        options: {}
      },
      // 当前页
      pageIndex: 0,
      //   显示条数
      pageSize: 5,
      // 总页数
      total: 10,
      // 航班总数据
      flightsData: {
        info: {},
        flights: [],
        options: {}
      },
      //   航班分页显示数据
      dataList: []
    }
  },
  // 监听器可以监听当前实例下的所有数据
  watch: {
    // 只要路由变化了
    $route () {
      // console.log(1)
      // 重新发送请求获取数据
      this.getFlightsData()
    }
  },
  mounted () {
    this.getFlightsData()
    // console.dir(this.flightsData, 1111)
  },
  methods: {
    setFlightsData (arr) {
      // 赋值筛选条件的数组
      // console.log(arr, 111)
      this.flightsData.flights = arr
      this.pageIndex = 1
      // 展示数据
      this.dataList = this.flightsData.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageSize * this.pageIndex)
      // 修改当前总数居
      // console.log(this.dataList, 111111)
      this.total = this.flightsData.flights.length
    },
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.dataList = this.flightsData.flights.slice(0, this.pageSize)
      // this.total = this.dataList.length
    },
    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.dataList = this.flightsData.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageSize * this.pageIndex)
      // this.total = this.dataList.length
    },
    getFlightsData () {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
        // console.log(res)
        this.flightsData = res.data
        this.total = this.flightsData.flights.length
        // 结构出缓存数据
        this.cacheFlightsData = { ...res.data }
        this.dataList = this.flightsData.flights.slice(0, this.pageSize)
        // console.log(this.flightsData)
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
