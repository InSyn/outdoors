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
      :expanded.sync="expanded"
      :single-expand="singleExpand"
      show-expand
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
      <template v-slot:item.unixtime="{ item }">
        <div class="d-flex align-center">
          {{ getDate(item.unixtime) }}
        </div>
      </template>
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="d-flex flex-wrap">
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Готов к звонку: ${(item.can_we_call && 'Да') || 'Нет'}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Почему за основную: ${item.why_candidate}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Вторая партия: ${item.second_candidate}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Точно нет: ${item.never_candidate}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Причина: ${item.never_candidate}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Соц. статус: ${item.social_status}` }}
            </div>
            <div class="pa-1" style="border-right: 1px solid #c2c2c6">
              {{ `Пожелание: ${item.tip}` }}
            </div>
          </div>
        </td>
      </template>
    </v-data-table>
    <!--    <div-->
    <!--      style="border-radius: 50%; width: 2rem;height: 2rem;background-color: #3b8070"-->
    <!--      @click="$store.dispatch('users_list/set_region_data')"-->
    <!--    ></div>-->
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
      expanded: [],
      singleExpand: true,
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
    getDate(time) {
      const date = new Date(time * 1000)
      return `${date.getDate()}/${(date.getMonth().toString().length < 2 &&
        '0' + date.getMonth()) ||
        date.getMonth()}/${date
        .getFullYear()
        .toString()
        .slice(2, 4)} ${(date.getHours().toString().length < 2 &&
        '0' + date.getHours()) ||
        date.getHours()}:${(date.getMinutes().toString().length < 2 &&
        '0' + date.getMinutes()) ||
        date.getMinutes()}`
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
