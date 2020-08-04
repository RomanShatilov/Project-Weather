<template>
  <div class="home">
    <div class="title mb-10">
      <h1>Search by city name</h1>
    </div>
    <v-row class="mb-5 no-gutters" >
      <form class="form search">
        <div class="form__input">
          <label for="city">Enter city Name</label>
          <input id="city" type="text" name="city" v-model="cityName">
        </div>
        <div class="form__submit">
          <v-btn @click="weatherByCity(cityName)">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </form>
    </v-row>
    <v-row class="mb-5 no-gutters">
      <div class="weather">
        <div class="weather__item weather__item_current mb-10">
          <div class="weather__current">
            <div class="weather__save" @click="saveLocation()">
              <div class="weather__save__icon">
                <v-icon>mdi-map-marker</v-icon>
              </div>
              <div class="weather__save__info">
                <p>Click to save this location</p>
              </div>
            </div>
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
          <div class="weather__week__wrapper">
            <div class="weather__week__title mb-10">
              <p>Daily forecast</p>
            </div>
            <div class="weather__week">
              <div class="weather__item" v-for="item in viewDailyWeather" :key="item.dt">
                <div class="weather__week__icon mb-10-custom">
                  <div icon="sunny" data-label="Sunny">
                    <span class="sun"></span>
                  </div>
                  <img :src="item.weather" :alt="item.weather">
                </div>
                <div class="weather__week__day mb-10-custom">
                  <p>{{item.name}}</p>
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
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Home',
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
