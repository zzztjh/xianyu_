<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :data="infoData" @setAllprice="setAllprice" />

      <!-- 侧边栏 -->
      <OrderAside :data="infoData" :allprice="allPrice" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  components: {
    OrderForm, OrderAside
  },
  data () {
    return {
      allPrice: 0,
      infoData: {
        insurances: [],
        seat_infos: {}
      }
    }
  },
  mounted () {
    const { query } = this.$route
    // console.log(seat_xid, id, 111)
    this.$axios({
      url: `airs/${query.id}`,
      params:
      { seat_xid: query.seat_xid }

    }).then((res) => {
    //   console.log(res)
      this.infoData = res.data
    })
  },
  methods: {
    setAllprice (price) {
    //   console.log(price)
      this.allPrice = price
    }
  }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
