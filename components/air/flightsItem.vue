<template>
  <div class="flight-item">
    <div @click="handleRec">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }}</span> MU5316
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }}{{ data.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ data.base_price/2 }}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-if="showRecommend" class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row
            v-for="(item, index) in data.seat_infos"
            :key="index"
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span> | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.org_settle_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                type="warning"
                size="mini"
                @click="handleChoose(data.id, item.seat_xid)"
              >
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    {{ data.value }}
  </div>
</template>

<script>
export default {
  //,    props: ['data']

  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 低价推荐的弹窗框显示状态
      showRecommend: false
    }
  },
  computed: {
    rankTime () {
      // 出发时间
      const dep = this.data.dep_time.split(':')
      //   到达时间
      const arr = this.data.arr_time.split(':')
      //   转换为分钟
      const depTime = dep[0] * 60 + +dep[1]
      const arrTime = arr[0] * 60 + +arr[1]
      //   计算时间差
      let getTime = arrTime - depTime
      //   处理凌晨时间段的时差
      if (getTime < 0) {
        getTime = arrTime + 24 * 60 - depTime
      }
      //   console.log(depTime, arrTime, getTime / 60)
      return `${Math.floor(getTime / 60)}时${getTime % 60}分`
    }
  },
  methods: {
    handleChoose (id, xid) {
      this.$router.push({
        path: '/air/order',
        query: {
          id,
          seat_xid: xid
        }
      })
    },
    //   切换显示低价推荐
    handleRec () {
      this.showRecommend = !this.showRecommend
    }
  }

}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{

            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            }

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>
