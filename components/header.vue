<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
      </div>
      <el-row class="nav" type="flex">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>
      <el-row type="flex" class="login">
        <nuxt-link to="user/login">
          登陆 / 注册
        </nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 0 #f5f5f5;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
.nav {
  flex: 1;
  margin: 0 20px;
  a {
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      border-bottom: 5px #409eff solid;
      color: #409eff;
    }
  }
  .nuxt-link-exact-active {
    color: #fff;
    background: #409eff;
    &:hover {
      background: #409eff;
      color: #fff;
    }
  }
}
.logo img {
  width: 156px;
  height: 42px;
  padding-top: 8px;
}

.login {
  a {
    font-size: 14px;
    color: #666;
    &:hover {
      text-decoration: underline;
      color: #409eff;
    }
  }
}
</style>
