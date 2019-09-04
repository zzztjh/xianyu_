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

      <!-- 消息 -->
      <el-dropdown class="message">
        <span class="el-dropdown-link">
          <i class="el-icon-bell" />
          消息<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 判断token -->
      <el-row v-if="!$store.state.user.userInfo.token" type="flex" class="login">
        <nuxt-link to="/user/login">
          登陆 / 注册
        </nuxt-link>
      </el-row>

      <!-- 用户头像 -->
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="` ${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar} `" class="userImg">
            <span>{{ $store.state.user.userInfo.user.nickname }}</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="userOut">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    // console.log(this.$store.state.user)
  },
  methods: {
    userOut () {
      // 退出调用清除方法
      this.$store.commit('user/clearUserInfo')
    }
  }
}
</script>
<style lang="less" scoped>
.message {
  margin-right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}
.userImg {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
    border:2px solid #fff;
  box-sizing: border-box;
  &:hover {
    border:2px solid #409eff
  }
}
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
