<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
      <v-icon :color="accountCharge()">mdi-battery</v-icon>
      <v-spacer/>

      <v-btn
        x-small
        class="ma-1"
        outlined
        fab
        color="teal"
        @click="$router.go(+1)"
      >
        <v-icon>mdi-arrow-right-bold</v-icon>
      </v-btn>
      <v-btn
        x-small
        class="ma-1"
        outlined
        fab
        color="orange"
        @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>

      <v-spacer/>

      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
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
        <v-list-item @click.native="right = !right" style="color: #a2c7ff;">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>RTL / LTR</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      class="justify-center"
    >
      <span>&copy;<a herf="https://github.com/MohammadMojtabaRoshani-TOMaaR">mmRoshani </a>{{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'خانه',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'دسته بندی اصلی',
          to: '/category'
        }
      ],
      routes: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DK Dataset'
    }
  },
  methods: {
    accountCharge(){
      return 'green';
    }
  },
}
</script>
