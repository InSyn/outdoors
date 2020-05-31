<template>
  <v-layout justify-center>
    <v-form
      v-if="token !== 'authorized'"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        id="login"
        v-model="login"
        :counter="16"
        :rules="nameRules"
        label="Логин"
        required
        clearable
      ></v-text-field>

      <v-text-field
        id="password"
        v-model="password"
        :rules="[passwordRules.required, passwordRules.min]"
        label="Пароль"
        required
        :type="show ? 'text' : 'password'"
      ></v-text-field>

      <v-btn
        id="l_button"
        :disabled="!valid"
        color="success"
        class="mt-2 d-flex justify-center"
        @click="validate"
      >
        Войти
      </v-btn>

      <!--      <v-btn color="error" class="mr-4" @click="reset">-->
      <!--        Очистить форму-->
      <!--      </v-btn>-->
    </v-form>
    <div v-else class="d-flex flex-column align-center">
      <div>Вы вошли как {{ userName }}</div>
      <v-btn color="#ea1e47" class="mt-4" @click="logOut">Выйти</v-btn>
    </div>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    show: false,
    login: '',
    token: '',
    userName: '',
    nameRules: [
      (v) => !!v || 'Login is required',
      (v) => (v && v.length <= 16) || 'Login must be less than 16 characters'
    ],
    password: '',
    passwordRules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters'
    }
  }),
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      vm.token = localStorage.getItem('token')
      vm.userName = localStorage.getItem('userName')
    })
  },
  mounted() {
    this.set_page_title('Авторизация')
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (
          this.login === this.$store.getters.admin[0] &&
          this.password === this.$store.getters.admin[1]
        ) {
          this.$store.dispatch('logIn', [this.login, this.password])
          this.$store.dispatch('setUserName', this.login)
          this.$router.push('/')
        } else alert('Неверное сочетание логина и пароля')
      }
    },
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    },
    ...mapActions({
      set_page_title: 'set_page_title'
    })
  }
}
</script>

<style scoped>
#l_button {
  margin: 0 auto;
}
</style>
