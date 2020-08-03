<template>
  <div class="home">
    <h1>Location </h1>
    <p>Single item here</p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'Locations',
    computed: {
      ...mapGetters(
        [
          'viewSavedWeather'
        ]
      )
    },
  }
</script>
