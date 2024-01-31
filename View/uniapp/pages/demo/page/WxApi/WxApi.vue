<template>
	<view class="container">
		<view class="button-row">
			<button @click="login">静默授权</button>
		</view>
		<view class="button-row">
			<button open-type="getPhoneNumber" @getphonenumber="phone">获取手机号码</button>
		</view>
		<view class="button-row">
			<button @click="subscribeEvent">订阅消息</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		request
	} from '@/libs/request/index.js'
	onLoad(async () => {

	})
	const login = async () => {
		let res = await uni.login({}).catch(err => {})
		let {
			code = ''
		} = res
		let result = await request('Demo.WxLogin', {
			code
		}).then().catch(err => {})
		//这里会获取token，来作为登录凭证
		console.log('result', result)
	}

	const phone = async (e) => {
		let {
			detail = {}
		} = e
		// console.log('@getphonenumber', detail)
		let {
			errMsg,
			iv = '',
			encryptedData = '',
			code = ''
		} = detail

		let result = await request('Demo.WxPhone', {
			code
		}).then().catch(err => {})
		// console.log('result', result)
	}

	const subscribeEvent = async () => {
		//订阅模板消息
		let res = await uni.requestSubscribeMessage({
			tmplIds: [
				// 'I6TIKudPRah_gqWl7ib2rAOF8W99vl0K9d5yG50mtG8',
				// 'PnGfLvOuM96-ZcBrTAGw9oe7htpBFqBovDfEjIMcuNk'
			]
		}).catch(err => console.error())
		//发送订阅消息
		// await request('Demo.WxSubscribe', {}).catch(err => console.error())
		//发送统一模板消息
		// await request('Demo.WxUniform', {}).catch(err => console.error())
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx;

		.button-row {
			margin-bottom: 20rpx;
		}
	}
</style>