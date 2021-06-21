<template>
  <div class="d-flex flex-column">
    <v-card-title class="search_wrapper" style="text-align: end">
      Поиск
      <v-text-field
        v-model="search"
        class="search-line"
        append-icon="mdi-magnify"
        label=""
        single-line
        hide-details
      ></v-text-field>
      <div class="d-flex flex-wrap px-4" style="text-align: end">
        <div class="px-2">Группировка по:</div>
        <select
          v-model="group_by"
          class="px-2"
          style="border: 1px solid #363636; border-radius: 4px; outline: none; background-color: #f2f2f4"
        >
          <option
            v-for="header in users_headers"
            :key="header.text"
            :value="header.value"
            style="font-size: 1rem; font-weight: normal"
          >
            {{ header.text }}
          </option></select
        >
      </div>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :group-by="group_by"
      :headers="users_headers"
      :items="users_list"
      item-key="phone_number"
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
      <template v-slot:item.messenger="{ item }">
        <div class="d-flex align-center">
          <v-icon
            size="16"
            class="mr-1"
            :style="{
              color:
                (item.messenger === 'VK' && '#2787f5') ||
                (item.messenger === 'Telegram' && '#5682A3') ||
                '#EE8208'
            }"
            >{{
              `${(item.messenger === 'Telegram' && 'mdi-telegram') ||
                (item.messenger === 'VK' && 'mdi-vk') ||
                'mdi-odnoklassniki'}`
            }}</v-icon
          >
          {{ `${item.messenger}` }}
        </div>
      </template>
      <template v-slot:item.will_participate="{ item }">
        <div>
          <v-icon v-if="item.will_participate" color="green">mdi-check</v-icon
          ><v-icon v-else color="red">mdi-close</v-icon>
          {{ `${item.will_participate ? 'Да' : 'Нет'}` }}
        </div>
      </template>
    </v-data-table>
    <div
      style="width: 100%;height: 3px; position: relative;border-left: 1px solid #35495e;border-top: 1px solid #35495e"
    >
      <div
        style="position:absolute; height: 100%;background-color: #3b8070"
        :style="{
          width: `${($store.getters['users_list/regionDataState'] /
            $store.getters['users_list/users_list'].length) *
            100}%`
        }"
      ></div>
    </div>
    <div class="d-flex align-center">
      <div
        class="pa-1"
        style="cursor: pointer;border-radius: 50%; height: 2rem;background-color: #3b8070;color: aliceblue"
        @click="$store.dispatch('users_list/set_region_data')"
      >
        Load regions
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      singleSelect: false,
      search: '',
      selected: [],
      group_by: null
    }
  },
  computed: {
    ...mapGetters({
      users_list: 'users_list/users_list',
      users_headers: 'users_list/users_headers',
      loading: 'users_list/loadingState'
    })
  },
  methods: {
    set_group(group) {
      this.group_by = group
    },
    ...mapActions({
      set_list: 'users_list/set_list',
      set_page_title: 'set_page_title',
      checkToken: 'checkToken'
    })
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      if (localStorage.getItem('token') !== 'authorized') {
        vm.$router.push('/login')
      }
    })
  }
}
</script>
<style scoped>
* {
  /*border: 1px solid #41b883;*/
}
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
