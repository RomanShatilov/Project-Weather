<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
                  v-if="item.heading"
                  :key="item.heading"
                  align="center"
          >
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
                  :to=item.href
          >
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
            color="blue darken-3"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
              style="width: 300px"
              class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Weather app</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container
              class="fill-height pa-8"
              fluid
      >
        <v-row class="mb-55 no-gutters"
        >
          <router-view/>
        </v-row>
        <v-row class="mb-55 no-gutters"
        >
          <v-form>
            <v-text-field
                    v-model="cityName"
                    label="City Name"
            >
            </v-text-field>
            <v-btn
                    color="success"
                    @click="weatherByCity(cityName)"
            >
              Показать погоду
            </v-btn>
          </v-form>
        </v-row>
        <v-row class="mb-5 no-gutters"
        >
          <div class="weather">
            <div class="weather__item weather__item_current mb-10">
              <div class="weather__save" @click="saveLocation()">
                <div class="weather__save__icon">
                  <v-icon>mdi-map-marker</v-icon>
                </div>
                <div class="weather__save__info">
                  <p>Click to save this location</p>
                </div>
              </div>
              <pre>
              <!--{{viewWeather}}-->
              <!--{{viewDailyWeather}}-->
              </pre>
              <div class="weather__current__top mb-5">
                <div class="weather__current__left">
                  <div class="weather__current__temp">
                    <p class="temp">{{viewWeather.temp}}</p>
                    <p class="degree">C</p>
                  </div>
                </div>
                <div class="weather__current__right">
                  <div icon="sunny" data-label="Sunny" :class="viewWeather.weather">
                    <span class="sun"></span>
                  </div>
                  <img :src="viewWeather.weather" :alt="viewWeather.weather">
                </div>
              </div>
              <div class="weather__current__middle mb-5">
                <div class="weather__current__city">
                  <p>{{viewWeather.name}}</p>
                </div>
              </div>
              <div class="weather__current__bottom">
                <ul class="weather__info">
                  <li class="weather__info__item">
                    <span class="text">Pressure:</span>
                    <span class="value">{{viewWeather.pressure }} hPa</span>
                  </li>
                  <li class="weather__info__item">
                    <span class="text">Humidity:</span>
                    <span class="value">{{viewWeather.humidity }}%</span>
                  </li>
                  <li class="weather__info__item">
                    <span class="text">Wind:</span>
                    <span class="value">{{viewWeather.wind }} km/h</span>
                  </li>
                  <li class="weather__info__item">
                    <span class="text">Sunrise:</span>
                    <span class="value">{{viewWeather.sunrise }}</span>
                  </li>
                  <li class="weather__info__item">
                    <span class="text">Sunset:</span>
                    <span class="value">{{viewWeather.sunset}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="weather__week__title mb-10">
              <p>Daily forecast</p>
            </div>
            <div class="weather__week">
              <div class="weather__item" v-for="item in viewDailyWeather" :key="item.dt">
                <div class="weather__week__day mb-10-custom">
                  <p>{{item.name}}</p>
                </div>
                <div class="weather__week__icon mb-10-custom">
                  <div icon="sunny" data-label="Sunny">
                    <span class="sun"></span>
                  </div>
                  <img :src="item.weather" :alt="item.weather">
                </div>
                <div class="weather__week__temp">
                  <div class="temp_min">
                    <p class="temp">{{item.main.temp}}</p>
                    <p class="degree">C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters(
        [
          'viewWeather',
          'viewDailyWeather',
        ]
      )
    },

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

    methods: {
      ...mapActions(
        [
          'getWeather',
          'createSavedLocation',
        ]),
      saveLocation() {
        this.createSavedLocation();
      },
      weatherByCity() {
        this.getWeather({name: this.cityName});
      }
    },
    mounted() {
      this.getWeather({name: this.cityName, location: navigator.geolocation});
    }
  }
</script>