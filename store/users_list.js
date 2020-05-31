export const state = () => ({
  users_list: [],
  loadingState: false,
  users_headers: [
    {
      text: 'ID',
      align: 'start',
      value: 'chat_id'
    },
    { text: 'Дата', value: 'currentdate', width: 'auto' },
    { text: 'Время', value: 'currenttime', width: 'auto' },
    { text: 'ФИО', value: 'name', width: 'auto' },
    // { text: 'Дата рождения', value: 'birthday', width: 'auto' },
    // { text: 'Вр. н.', value: 'date1', width: 'auto' },
    // { text: 'Вр. к.', value: 'date2', width: 'auto' },
    { text: 'Адр. отправки', value: 'address', width: 'auto' },
    { text: 'Адр. назначения', value: 'destination', width: 'auto' },
    // { text: 'Причина', value: 'reason', width: 'auto' }
    { text: '', value: 'data-table-expand' }
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
    for (const user of data) state.users_list.push(user)
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
      .get(
        'http://84.201.132.143:5000/getTickets/?token=' +
          localStorage.getItem('token') +
          '&start=' +
          data[0] +
          '&end=' +
          data[1]
      )
      .then((response) => {
        store.commit('set_users', response.data)
        store.commit('setLoadingState', false)
        if (response.data.length >= interval) {
          store.dispatch('set_list', [data[0] + interval, data[1] + interval])
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
