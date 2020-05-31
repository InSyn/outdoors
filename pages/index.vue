<template>
  <v-layout column justify-center align-center>
    Приложения для осуществления контроля передвижений населения
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      if (localStorage.getItem('token') !== 'authorized') {
        vm.$router.push('/login')
      }
    })
  },
  mounted() {
    this.set_page_title('Контоль движения потоков населения')
  },
  methods: {
    ...mapActions({
      set_page_title: 'set_page_title',
      checkToken: 'checkToken'
    })
  }
}
</script>
