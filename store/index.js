export const state = () => ({
  admin: {
    login: 'test',
    password: '00000000'
  },
  page_title: 'Список анкет',
  userName: '',
  token: null
})

export const getters = {
  admin(state) {
    return [state.admin.login, state.admin.password]
  },
  page_title(state) {
    return state.page_title
  }
}

export const mutations = {
  set_page_title(state, title) {
    state.page_title = title
  },
  setUserName(state, userName) {
    state.userName = userName
  }
}

export const actions = {
  set_page_title(store, title) {
    store.commit('set_page_title', title)
  },
  setUserName(store, userName) {
    store.commit('setUserName', userName)
  },
  logIn({ commit }, data) {
    if (
      data[0] === this.getters.admin[0] &&
      data[1] === this.getters.admin[1]
    ) {
      localStorage.setItem('token', 'authorized')
      localStorage.setItem('userName', data[0])
    }
  },
  logOut() {
    localStorage.setItem('token', null)
    localStorage.setItem('userName', '')
  }
}
