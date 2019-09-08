<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select v-model="airport" size="mini" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTimes" size="mini" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" size="mini" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="airSize" size="mini" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airoptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({ })
    }
  },
  data () {
    return {
      flightsData: { // 航班总数据
        flights: [],
        info: {},
        options: {}
      },
      airoptions: [
        { label: '大', value: 'L' }, { label: '中', value: 'M' }, { label: '小', value: 'S' }
      ],
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: ''// 机型大小
    }
  },
  mounted () {
    // console.log(this.data)
  },
  methods: {
    // 选择机场时候触发
    handleAirport (value) {

    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {

    },

    // 选择航空公司时候触发
    handleCompany (value) {
    //   console.log(this.data)
      const arr = this.data.flights.filter((v) => {
        return v.airline_name === value
      })
      //   console.log(arr)
      this.$emit('setFlightsData', arr)
    },

    // 选择机型时候触发
    handleAirSize (value) {

    },

    // 撤销条件时候触发
    handleFiltersCancel () {

    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
