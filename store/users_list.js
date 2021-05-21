export const state = () => ({
  users_list: [],
  loadingState: false,
  users_headers: [
    { text: 'Возраст', value: 'age', width: 'auto' },
    { text: 'Партия', value: 'candidate', width: 'auto' },
    { text: 'Место жительства', value: 'living_place', width: 'auto' },
    // { text: 'Дата рождения', value: 'birthday', width: 'auto' },
    { text: 'Мессенджер', value: 'messenger', width: 'auto' },
    { text: 'Телефон', value: 'phone_number', width: 'auto' },
    { text: 'Пол', value: 'sex', width: 'auto' },
    { text: 'Участие', value: 'will_participate', width: 'auto' },
    // { text: 'Причина', value: 'reason', width: 'auto' }
    { text: '', value: 'data-table-expand', groupable: false }
  ]
})

export const getters = {
  users_list(state) {
    return state.users_list
  },
  users_headers(state) {
    return state.users_headers
  },
  loadingState: (s) => {
    return s.loadingState
  }
}

export const mutations = {
  set_users(state, data) {
    for (const user of data) {
      user.will_participate
        ? (user.will_participate = 'Да')
        : (user.will_participate = 'Нет')
      user.sex === 0 ? (user.sex = 'М') : (user.sex = 'Ж')
      state.users_list.push(user)
    }
  },
  push_users(state, data) {
    state.users_list = data
  },
  setLoadingState(state, lState) {
    state.loadingState = lState
  }
}

export const actions = {
  set_list(store, data) {
    const interval = data[1] - data[0]
    store.commit('setLoadingState', true)
    this.$axios
      .get('http://v636867.hosted-by-vdsina.ru/getResults')
      .then((response) => {
        store.commit('set_users', response.data)
        store.commit('setLoadingState', false)
        if (response.data.length >= interval) {
          store.dispatch('set_list', [data[0] + interval, data[1] + interval])
        }
      })
      .catch((e) => {
        throw e
      })
  }
}
