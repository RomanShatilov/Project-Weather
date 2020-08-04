<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app>
      <v-list dense>
        <template v-for="item in items">
          <v-row
                  v-if="item.heading"
                  :key="item.heading"
                  align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>

          </v-row>
          <v-list-item
                  v-else
                  :key="item.text"
                  link
                  :to=item.href>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            class="header__custom"
            dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
              style="width: 300px"
              class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Weather app</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container
              class="pa-8 custom-container"
              fluid>
        <v-row class="mb-5 no-gutters">
          <transition name="fade" mode="out-in">
          <router-view/>
          </transition>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  export default {

    data: () => ({
      cityName: 'Киев',
      info: '',
      weatherType: ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Atmosphere'],

      dialog: false,
      drawer: null,
      items: [
        {icon: 'mdi-home', text: 'Home', href: '/'},
        {icon: 'mdi-map-marker', text: 'Locations', href: '/locations'},
      ],
    }),

  }
</script>