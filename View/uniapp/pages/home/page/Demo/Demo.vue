<template>
	<view>
		hello index number {{index_number}}
		<button @click="addEvent"> number +1</button>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import {
		computed
	} from 'vue'

	const store = useStore()
	const index_number = computed(() => {
		return store.state.home.index_number
	})
	const addEvent = () => {
		store.commit("home/setIndexNumber", index_number.value + 1)
	}
</script>

<style lang="scss">

</style>