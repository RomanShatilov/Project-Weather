<template>
  <div class="home">
    <div class="title mb-10">
      <h1>Locations</h1>
    </div>
    <div class="weather">
      <div class="weather__list">
        <div v-for="item in viewSavedWeather" :key="item.current.id">
          <router-link :to="`/locations/${item.current.id}`">
            <div class="weather__item">
              <div class="weather__item__name mb-5">
                <p>{{item.current.cityName}}</p>
              </div>
              <div class="weather__item__icon mb-5">
                <img :src="item.current.weather" :alt="item.current.cityName">
              </div>
              <div class="weather__item__temp">
                <span class="temp">{{item.current.temp}}</span>
                <span class="degree">C</span>
              </div>
            </div>
          </router-link>
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
          'viewSavedWeather'
        ]
      )
    },
    methods: {
      ...mapActions(
        [
          'getSavedLocation',
        ]),
    },
    mounted() {
      this.getSavedLocation();
    }
  }
</script>
