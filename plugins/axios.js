// 引入e-ui的信息弹出框
import { Message } from 'element-ui'
// 添加拦截器
export default ({ $axios, redirect }) => {
//   console.log({ $axios }, 123)
  $axios.onError((res) => {
    if (res.response.data.statusCode === 400) {
      Message.error(res.response.data.message)
    }
    if (res.response.data.statusCode === 401 || res.response.data.statusCode === 403) {
      Message.error('请登录')
      redirect('/user/login')
    }
  })
}
