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
      <el-row>
        <el-col :span="14">
          <el-row :gutter="20" type="flex" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="area">
                区域：
              </div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <a href="#" class="location-budget active" style="font-size:14px">全部</a>
                <a v-for="(item, index) in cityList" :key="index" href="#" class="city_area" style="font-size:14px;color:#666">{{ item.business_area }}</a>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="strategy">
                攻略：
              </div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <span style="font-size:14px;color:#666">北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="price">
                均价：
              </div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥332</span>
                </el-col>
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥521</span>
                </el-col>
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥789</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="10">
          <div class="map">
            <div id="container" />
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
    // 地图
    window.onLoad = function () {
      const map = new AMap.Map('container')
    }
    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=f9a05005eca16632b6fbe97d15d9ce1e&callback=onLoad'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
    // 获取城市数据
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
#container {width:300px; height: 180px; }
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
