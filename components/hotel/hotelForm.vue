<template>
  <div class="data_form">
    <!-- fetch-suggestions 返回输入建议的方法 -->
    <!-- select 点击选中建议项时触发 -->
    <el-autocomplete
      v-model="form.departCity"
      popper-class="my-autocomplete"
      :fetch-suggestions="querySearch"
      placeholder="目的地"
      @select="handleSelect"
    />
    <!-- 日期选择器 -->
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="-"
      start-placeholder="入住日期"
      end-placeholder="离店日期"
    />
    <el-button type="primary">
      查看价格
    </el-button>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="area">
            区域：
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <a href="#" class="location-budget active">全部</a>
            <a v-for="(item, index) in cityList" :key="index" href="#" class="city_area">{{ item.business_area }}</a>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="3">
          <div class="strategy">
            攻略：
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            ???
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="3">
          <div class="price">
            均价：
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            ???
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 城市数据
      cityList: [],
      value6: '',
      // 目的地
      form: {
        departCity: '南京', // 目的地城市
        departCode: '' // 目的地代码
      }
    }
  },
  mounted () {
    this.$router.push({ path: '/hotel?city=74' })
    this.$axios({
      url: '/hotels'
      // params: { city: this.$route.query.city }
    }).then((res) => {
      console.log(res)
      this.cityList = res.data.data
    })
  },
  methods: {
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearch (value, cb) {
      if (value === '') {
        const arr = []
        cb(arr)
        return
      }
      this.$axios({
        url: '/airs/city',
        params: { name: value }
      }).then((res) => {
        const { data } = res.data
        // console.log(data)
        // 下拉列表必须要有value属性
        // 遍历添加value字段 并把最后市去掉
        const newdata = []
        data.forEach((e) => {
          e.value = e.name.replace('市', '')
          newdata.push(e)
        })
        // console.log(newdata)
        this.form.departCity = data[0].value
        // 城市代码保存
        this.form.departCode = data[0].sort
        // 返回数据
        cb(newdata)
      })
    },
    // 目的地选择时触发
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>
<style lang="less" scoped>
.city_area {
  padding-right: 1em;
}
.location-budget {
    background: #eee;
    cursor: auto;
    text-decoration: none;
    color: #999;
}
.content {
  padding: 20px 0;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
