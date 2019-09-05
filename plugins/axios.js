// 引入e-ui的信息弹出框
import { Message } from 'element-ui'
// 添加拦截器
export default ({ $axios }) => {
//   console.log({ $axios }, 123)
  $axios.onError((res) => {
    if (res.response.data.statusCode === 400) {
      Message.error(res.response.data.message)
    }
  })
}
