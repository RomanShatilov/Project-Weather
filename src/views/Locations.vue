<template>
	<div class="home">
		<h1>Locations</h1>
		<div v-for="item in viewSavedWeather" :key="item.current.id">
			<router-link :to="`/locations/${item.current.id}`">{{item.current.cityName}}</router-link>
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
