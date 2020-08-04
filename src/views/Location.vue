<template>
  <div class="home">
    <div class="title mb-10">
      <h1>Location</h1>
    </div>
    <div class="weather">
      <div class="weather__item__wrapper"
           v-for="item in viewCurrentSavedWeather"
           :key="item.current.id">
        <div class="weather__item weather__item_current mb-10"
             v-if="item.current.id == currentId">
          <div class="weather__current">
            <div class="weather__current__top mb-5">
              <div class="weather__current__left">
                <div class="weather__current__temp">
                  <p class="temp">{{item.current.temp}}</p>
                  <p class="degree">C</p>
                </div>
              </div>
              <div class="weather__current__right">
                <div icon="sunny" data-label="Sunny" :class="item.current.weather">
                  <span class="sun"></span>
                </div>
                <img :src="item.current.weather" :alt="item.current.weather">
              </div>
            </div>
            <div class="weather__current__middle mb-5">
              <div class="weather__current__city">
                <p>{{item.current.name}}</p>
              </div>
            </div>
            <div class="weather__current__bottom">
              <ul class="weather__info">
                <li class="weather__info__item">
                  <span class="text">Pressure:</span>
                  <span class="value">{{item.current.pressure }} hPa</span>
                </li>
                <li class="weather__info__item">
                  <span class="text">Humidity:</span>
                  <span class="value">{{item.current.humidity }}%</span>
                </li>
                <li class="weather__info__item">
                  <span class="text">Wind:</span>
                  <span class="value">{{item.current.wind }} km/h</span>
                </li>
                <li class="weather__info__item">
                  <span class="text">Sunrise:</span>
                  <span class="value">{{item.current.sunrise }}</span>
                </li>
                <li class="weather__info__item">
                  <span class="text">Sunset:</span>
                  <span class="value">{{item.current.sunset}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="weather__week__wrapper">
            <div class="weather__week__title mb-10">
              <p>Daily forecast</p>
            </div>
            <div class="weather__week" v-for="item in viewCurrentSavedWeather" :key="item.id">
              <div class="weather__week" v-if="item.current.id == currentId">
                <div class="weather__item" v-for="weekItem in item.week" :key="weekItem.id">
                  <div class="weather__week__day mb-10-custom">
                    <p>{{weekItem.name}}</p>
                  </div>
                  <div class="weather__week__icon mb-10-custom">
                    <div icon="sunny" data-label="Sunny">
                      <span class="sun"></span>
                    </div>
                    <img :src="weekItem.weather" :alt="weekItem.weather">
                  </div>
                  <div class="weather__week__temp">
                    <div class="temp_min">
                      <p class="temp">{{weekItem.main.temp}}</p>
                      <p class="degree">C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Locations',
    computed: {
      ...mapGetters(
        [
          'viewCurrentSavedWeather'
        ]
      )
    },
    data: () => ({
      currentId: ''
    }),
    methods: {
      ...mapActions(
        [
          'getCurrentSavedLocation',
        ]),
    },
    mounted() {
      this.currentId = this.$route.path;
      this.currentId = this.currentId.substring(11, this.currentId.length);
      this.getCurrentSavedLocation();
    }
  }
</script>
