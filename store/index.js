export const state = () => ({
  users: [
    ['admin', 'Adm032167'],
    ['MZolotukhin', 'MZ21quiz24'],
    ['EPodolyak', 'EP21quiz24']
  ],
  admin: {
    login: 'test',
    password: '00000000'
  },
  page_title: 'Список анкет',
  userName: '',
  token: null
})

export const getters = {
  users(state) {
    return state.users
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
      this.getters.users.some((check) => {
        return check[0] === data[0] && check[1] === data[1]
      })
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
