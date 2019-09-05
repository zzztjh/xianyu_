<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        :class="{active: index === currentTab}"
        @click="handleSearchTab(item, index)"
      >
        <i :class="item.icon" />
        {{ item.name }}
      </span>
    </el-row>

    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker v-model="form.departDate" type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate" />
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 到达城市
        destCode: '', // 到达城市代码
        departDate: '' // 日期
      },
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0
    }
  },
  mounted () {
    this.form.departDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  },
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) {
      // this.currentTab = index
      if (index === 1) {
        this.$alert('往返功能未开通', '提示')
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
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
        // 默认选中第一个  解决一个用户不点击选择直接输入 导致没有拿到数据的bug
        this.form.departCity = data[0].value
        this.form.departCode = data[0].sort
        // console.log(newdata)
        // 返回数据
        cb(newdata)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch (value, cb) {
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
        // 返回数据
        this.form.destCity = data[0].value
        this.form.destCode = data[0].sort
        cb(newdata)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      // console.log(item)
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate (value) {
      // 使用moment插件初始化时间
      this.form.departDate = moment(value).format('YYYY-MM-DD')
      // console.log(this.form.departDate)
    },

    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      // 出发
      this.form.departCity = destCity
      this.form.departCode = destCode
      // 到达
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
      const { departCity, destCity, departDate } = this.form
      if (!departCity) {
        this.$alert('请输入出发城市', '提示')
        return
      }

      if (!destCity) {
        this.$alert('请输入到达城市', '提示')
        return
      }
      if (!departDate) {
        this.$alert('请输入出发时间', '提示')
        return
      }
      // console.log(this.form)
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    }
  }
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
    cursor: pointer;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
