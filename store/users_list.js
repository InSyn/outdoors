export const state = () => ({
  users_list: [
    // {
    //   will_participate: 'Да',
    //   candidate: 'Единая Россия',
    //   age: '25-34',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'Telegram',
    //   phone_number: '79130475622',
    //   sex: 'M'
    // },
    // {
    //   will_participate: 'Да',
    //   candidate: 'ЛДПР',
    //   age: '34-45',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'odnoklassniki',
    //   phone_number: '79130474626',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Нет',
    //   candidate: 'Справедливая Россия',
    //   age: '45-60',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'Telegram',
    //   phone_number: '79133475726',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Нет',
    //   candidate: 'Единая Россия',
    //   age: '25-34',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'VK',
    //   phone_number: '79134473226',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Да',
    //   candidate: 'Единая Россия',
    //   age: '34-45',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'VK',
    //   phone_number: '79133214226',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Да',
    //   candidate: 'ЛДПР',
    //   age: '25-34',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'Telegram',
    //   phone_number: '79131275622',
    //   sex: 'M'
    // },
    // {
    //   will_participate: 'Да',
    //   candidate: 'Другая',
    //   age: '25-34',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'odnoklassniki',
    //   phone_number: '79130478626',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Нет',
    //   candidate: 'Справедливая Россия',
    //   age: '25-34',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'Telegram',
    //   phone_number: '79133446726',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Нет',
    //   candidate: 'Справедливая Россия',
    //   age: '34-45',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'VK',
    //   phone_number: '79234475626',
    //   sex: 'W'
    // },
    // {
    //   will_participate: 'Да',
    //   candidate: 'Другая',
    //   age: '45-60',
    //   living_place: 'Красноярск, Взлётка',
    //   messenger: 'VK',
    //   phone_number: '79130484226',
    //   sex: 'W'
    // }
  ],
  loadingState: false,
  users_headers: [
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
  loadingState: (s) => {
    return s.loadingState
  }
}

export const mutations = {
  set_users(state, data) {
    console.log(data)
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
    store.commit('setLoadingState', true)
    this.$axios
      .get('http://v665095.hosted-by-vdsina.ru/getResults')
      .then((response) => {
        store.commit('set_users', response.data)
        store.commit('setLoadingState', false)
      })
      .catch((e) => {
        throw e
      })
  }
}
