export const state = () => ({
  users_list: [],
  loadingState: false,
  regionDataState: 0,
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
  },
  regionDataState: (state) => {
    return state.regionDataState
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
  },
  setRegionDataState(state, newState) {
    if (state.regionDataState < newState) state.regionDataState = newState
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
    store.commit('setLoadingState', true)
    for (let i = 0; i < Math.ceil(store.getters.users_list.length / 200); i++) {
      setTimeout(() => {
        store.getters.users_list
          .slice(i * 200, (i + 1) * 200)
          .forEach((resp, indx) => {
            this.$axios
              .get(`https://ciss.ga/lev.php?word=${resp.living_place}`)
              .then((regionData) => {
                store.commit('setRegionDataState', i * 200 + indx)
                regionData.data &&
                  store.commit('set_regionData', [
                    i * 200 + indx,
                    { id: regionData.data[0].id, name: regionData.data[0].name }
                  ])
                if (i * 200 + indx === store.getters.users_list.length - 1) {
                  store.commit('setLoadingState', false)
                }
              })
              .catch((e) => {
                throw e
              })
          })
      }, i * 1024)
    }
  }
}
