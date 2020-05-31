<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title class="pa-4">Регистрация заявки на въезд</v-card-title>
      <v-divider></v-divider>
      <v-container class="pa-4">
        <v-container class="d-flex">
          <v-text-field label="Фамилия"></v-text-field>
          <v-text-field class="ml-2" label="Имя"></v-text-field>
          <v-text-field class="ml-2" label="Отчество"></v-text-field>
        </v-container>
        <v-container>
          <v-text-field label="Дата рождения"></v-text-field>
          <v-text-field label="Адрес по прописке"></v-text-field>
          <v-text-field label="Адрес фактического проживания"></v-text-field
        ></v-container>
        <v-container class="d-flex">
          <v-file-input label="Фото на светлом фоне"></v-file-input>
          <v-file-input
            class="ml-4"
            label="Фото с паспортом на уровне лица"
          ></v-file-input></v-container
      ></v-container>
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
