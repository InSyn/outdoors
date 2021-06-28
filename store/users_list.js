export const state = () => ({
  users_list: [],
  loadingState: false,
  users_headers: [
    { text: 'Дата', value: 'unixtime', width: 'auto' },
    { text: 'Участие', value: 'will_participate', width: 'auto' },
    { text: 'Партия', value: 'candidate', width: 'auto' },
    { text: 'Возраст', value: 'age', width: 'auto' },
    { text: 'Место жительства', value: 'living_place', width: 'auto' },
    { text: 'Мессенджер', value: 'messenger', width: 'auto' },
    { text: 'Телефон', value: 'phone_number', width: 'auto' },
    { text: 'Пол', value: 'sex', width: 'auto' }
    // { text: 'Дата рождения', value: 'birthday', width: 'auto' },
    // { text: 'Причина', value: 'reason', width: 'auto' }
    // { text: '', value: 'data-table-expand', groupable: false }
  ]
})

export const getters = {
  users_list(state) {
    return state.users_list
  },
  users_headers(state) {
    return state.users_headers
  },
  loadingState: (state) => {
    return state.loadingState
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
  push_user(state, data) {
    state.users_list.push(...data)
  },
  set_regionData(state, data) {
    state.users_list[data[0]].region_id = data[1].id
    state.users_list[data[0]].region = data[1].name
  },
  setLoadingState(state, lState) {
    state.loadingState = lState
  }
}

export const actions = {
  set_list(store, data) {
    store.commit('setLoadingState', true)
    this.$axios
      .get(`https://votekrsk.club/getResults`)
      .then((response) => {
        console.log(response.data)
        store.commit('push_user', response.data)
        store.commit('setLoadingState', false)
      })
      .catch((e) => {
        store.commit('setLoadingState', false)
        throw e
      })
  },
  set_region_data(store, data) {
    console.log(data)
  }
}
