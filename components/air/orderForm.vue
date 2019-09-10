<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form
        class="member-info"
      >
        <div
          v-for="(item, index) in users"
          :key="index"
          class="member-info-item"
        >
          <el-form-item label="乘机人类型">
            <el-input
              v-model="users[index].username"
              placeholder="姓名"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              v-model="users[index].id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          v-for="(item, index) in data.insurances"
          :key="index"
          class="insurance-item"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handlechange(item.id)"
          />
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
      </div>
    </div>
    <input type="hidden" :value="getAllprice">
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      allPrice: '',
      users: [
        { username: '', id: '' }
      ],
      insurancesList: [], // 保险数据列表
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      captcha: '000000', // 验证码
      invoice: false // 发票
    }
  },
  computed: {
    getAllprice () {
      let price = 0
      const len = this.users.length
      //   购买的票数
      price += this.data.seat_infos.org_settle_price * len
      //   保险
      this.insurancesList.forEach((e, i) => {
        price += this.data.insurances[e - 1].price * len
      })
      //   机建＋燃油
      price += this.data.airport_tax_audlet * len
      this.$emit('setAllprice', price)
      return price
    }
  },
  mounted () {

  },
  methods: {
    handlechange (id) {
    //   console.log(id)
      const index = this.insurancesList.indexOf(id)
      //   如果大于-1说明  当前为选中
      if (index > -1) {
        this.insurancesList.splice(index, 1)
      } else {
        this.insurancesList.push(id)
      }
    //   console.log(this.insurancesList)
    },
    // 添加乘机人
    handleAddUsers () {
      this.users.push({ username: '', id: '' })
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha () {
      if (this.contactPhone) {
        this.$axios({
          url: '/captchas',
          method: 'POST',
          data: { tel: this.contactPhone }
        }).then((res) => {
        // console.log(res)
        // const { code } = res.data.code
          this.$message.success(`获取验证码成功：` + res.data.code)
        })
      } else {
        this.$message.warning('请输入手机号')
      }
    },

    // 提交订单
    handleSubmit () {
      const data = {
        users: this.users,
        insurances: this.insurancesList,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      }
      // 判断乘机人
      if (!this.users[0].username || !this.users[0].id) {
        this.$message.error('乘机人不能为空')
        return
      }
      // 联系人
      if (!this.contactName) {
        this.$message.error('联系人不能为空')
        return
      }
      // 联系电话
      if (!this.contactPhone) {
        this.$message.error('联系电话不能为空')
        return
      }
      // 联系电话
      if (!this.captcha) {
        this.$message.error('验证码不能为空')
        return
      }
      //   console.log(this.$store.state.user.userInfo.token)
      this.$axios({
        url: '/airorders',
        method: 'POST',
        data,
        headers: { Authorization: `Bearer ${this.$store.state.user.userInfo.token}` }
      }).then((res) => {
        // console.log(res)
        // console.log(this.data)
        const { id } = res.data.data
        this.$router.push({
          path: '/air/pay',
          query: { id }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
