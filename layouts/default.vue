<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="this.$store.getters.page_title" />
      <v-spacer />
      <v-btn icon router to="/login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click.stop="changeTheme()">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app>
      <span>TimingWeb &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      theme_dark: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-format-list-bulleted-square',
          title: 'Все анктеты',
          to: '/all'
        }
      ],
      miniVariant: false,
      title: this.$store.getters.page_title
    }
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
