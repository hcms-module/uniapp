<template>
	<view style="padding: 0 40rpx;">
		<view class="selection">
			<view class="label">Request</view>
			<view style="margin-top: 20rpx;">
				<button @click="getRequest">发送GET请求</button>
			</view>
			<view style="margin-top: 20rpx;">
				<button @click="postRequest">发送POST请求</button>
			</view>
		</view>
		<view class="selection">
			<view class="label">Vuex</view>
			<view>
				hello vuex number {{index_number}}
				<button @click="addEvent"> number +1</button>
			</view>
		</view>
		<view class="selection">
			<view class="label">路由跳转</view>
			<view>
				<view style="margin-top: 20rpx;">
					<button @click="$nav('Home.Demo')">Demo</button>
				</view>
				<view style="margin-top: 20rpx;">
					<button @click="$nav('home.DemoChild')">Demo Child</button>
				</view>
				<view v-for="(item,index) in button_list" :key="index" style="margin-top: 20rpx;">
					<button @click="$nav(item.url)">{{item.name}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useStore,
	} from 'vuex'
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		request
	} from '@/libs/request/index.js'
	const button_list = ref([{
		name: '微信Api',
		url: 'Demo.WxApi'
	}])
	onLoad(() => {
		console.log("onLoad") // 0
	})
	const store = useStore()
	const index_number = computed(() => {
		return store.state.home.index_number
	})

	const addEvent = () => {
		store.commit("home/setIndexNumber", index_number.value + 1)
	}
	const getRequest = () => {
		request('Home.Index').then(res => {
			// console.log('res', res)
			uni.showToast({
				title: '请求成功'
			})
		}).catch(err_res => {
			//业务错误
			console.log('err_res', err_res)
		})
	}
	const postRequest = () => {
		request('Home.IndexPost', {
			param1: "paramValue1"
		}, {
			is_encrypt_param: true
		}).then(res => {
			console.log('res', res)
			uni.showToast({
				title: '请求成功'
			})
		}).catch(err_res => {
			//业务错误
			console.log('err_res', err_res)
		})
	}
</script>
// import {
// mapMutations,
// mapState,
// } from 'vuex'
// export default {
// data() {
// return {
// button_list: [{
// name: '微信Api',
// url: 'Demo.WxApi'
// }]
// }
// },
// computed: {
// ...mapState('home', ['index_number'])
// },
// methods: {
// ...mapMutations('home', ['.,']),
// addEvent() {
// this.setIndexNumber(this.index_number + 1)
// },
// getRequest() {
// this.$request('Home.Index').then(res => {
// // console.log('res', res)
// uni.showToast({
// title: '请求成功'
// })
// }).catch(err_res => {
// //业务错误
// console.log('err_res', err_res)
// })
// }
// },
// onLoad() {}
// }

<style lang="scss" scoped>
	.selection {
		margin-bottom: 60rpx;

		.label {
			font-weight: bold;
		}
	}
</style>