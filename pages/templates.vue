<template>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote">
        Проверка зарегистрированной заявки
      </blockquote>
    </v-flex>
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
    this.set_page_title('Шаблоны отказа в передвижении')
  },
  methods: {
    ...mapActions({
      set_page_title: 'set_page_title'
    })
  }
}
</script>
