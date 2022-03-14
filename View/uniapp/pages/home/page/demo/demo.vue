<template>
	<view>
		hello index number {{index_number}}
		<button @click="addEvent"> number +1</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState('home', ['index_number'])
		},
		methods: {
			...mapMutations('home', ['setIndexNumber']),
			addEvent() {
				this.setIndexNumber(this.index_number + 1)
			}
		}
	}
</script>

<style lang="scss">

</style>
