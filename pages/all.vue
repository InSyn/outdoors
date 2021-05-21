<template>
  <div class="d-flex flex-column">
    <v-card-title class="search_wrapper">
      Поиск
      <v-text-field
        v-model="search"
        class="search-line"
        append-icon="mdi-magnify"
        label=""
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="users_headers"
      :items="users_list"
      item-key="currenttime"
      :single-select="singleSelect"
      :search="search"
      :loading="loading"
      loading-text="Загрузка..."
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-chevron-left',
        nextIcon: 'mdi-chevron-right'
      }"
    >
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      singleSelect: false,
      search: '',
      selected: []
    }
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      if (localStorage.getItem('token') !== 'authorized') {
        vm.$router.push('/login')
      }
      if (
        vm.users_list.length === 0 &&
        localStorage.getItem('token') === 'authorized'
      )
        vm.set_list([0, 100])
    })
  },
  computed: {
    ...mapGetters({
      users_list: 'users_list/users_list',
      users_headers: 'users_list/users_headers',
      loading: 'users_list/loadingState'
    })
  },
  mounted() {},
  methods: {
    ...mapActions({
      set_list: 'users_list/set_list',
      set_page_title: 'set_page_title',
      checkToken: 'checkToken'
    })
  }
}
</script>
<style scoped>
.search_wrapper {
  display: flex;
  align-items: flex-end;
}
.search-line {
  max-width: 200px;
  margin-left: 2rem;
}
.expanded-row_wrapper {
  margin: 0.4rem 0;
}
.reason_content {
  display: inline-block;
}
</style>
