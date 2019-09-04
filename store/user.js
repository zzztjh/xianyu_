export const state = () => {
  return {
    userInfo: {
      token: '',
      user: {}
    }
  }
}
export const mutations = {
// 保存用户信息到state
  setUserInfo (state, data) {
    //   发送过来的数据保存到state中
    state.userInfo = data
  },
  clearUserInfo (state) {
    //   发送过来的数据保存到state中
    state.userInfo = {
      token: '',
      user: {}
    }
  }
}
