<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="form"
  >
    <el-form-item
      class="form-item"
      prop="username"
    >
      <el-input
        v-model="form.username"
        placeholder="用户名手机"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
      >
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="你的名字"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input
        v-model="form.checkpassword"
        placeholder="确认密码"
        type="password"
      />
    </el-form-item>

    <el-button
      class="submit"
      type="primary"
      @click="handleRegSubmit"
    >
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      form: {
        username: '13222222265',
        nickname: '',
        captcha: '000000',
        password: '',
        checkpassword: ''
      },
      // 表单规则
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        checkpassword: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        captcha: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      // console.log(this.form.username)
      if (this.form.username) {
        this.$axios({
          url: '/captchas',
          method: 'POST',
          data: { tel: this.form.username }
        }).then((res) => {
        // console.log(res)
        // const { code } = res.data.code
          this.$message.success(`获取验证码成功：` + res.data.code)
        })
      } else {
        this.$message.warning('请输入手机号')
      }
    },

    // 注册
    handleRegSubmit () {
      // console.log(this.form)
      this.$refs.form.validate((valide) => {
        if (valide) {
          // 把checkpassword抽出来  其他的分给formdata
          const { checkpassword, ...formdata } = this.form
          // console.log(formdata)
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: formdata
          }).then((res) => {
            this.$message.success('注册成功，正在跳转')
            setTimeout(() => {
              this.$store.commit('user/setUserInfo', res.data)
              this.$router.push('/')
            }, 1000)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
