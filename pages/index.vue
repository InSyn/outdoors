<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title class="pa-4">Анкетирование населения</v-card-title>
    </v-card>
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
  data() {
    return {
      file_1: null
    }
  },
  mounted() {
    this.set_page_title('Регистрация заявки')
  },
  methods: {
    ...mapActions({
      set_page_title: 'set_page_title',
      checkToken: 'checkToken'
    }),
    log() {
      console.log(this.file_1)
    }
  }
}
</script>
