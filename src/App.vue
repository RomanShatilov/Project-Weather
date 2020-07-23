<template>
  <div class="page_wrapper">
    <header></header>
    <main class="main">
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </main>
    <footer></footer>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        routes: this.$router.options.routes,
        transitionName: 'slide-left',
        messageModal: false,
        menuStatus: false,
      };
    },
    updated () {

    },
    methods: {

    },

  };
</script>