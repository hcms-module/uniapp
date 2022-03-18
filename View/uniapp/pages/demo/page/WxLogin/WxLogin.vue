<template>
	<view class="container">
		<view class="button-row">
			<button @click="login">静默授权</button>
		</view>
		<view class="button-row">
			<button open-type="getPhoneNumber" @getphonenumber="phone">获取手机号码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			async phone(e) {
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

				let result = await this.$request('Demo.WxPhone', {
					code
				}).then().catch(err => {})
				console.log('result', result)
			},
			async login() {
				let res = await uni.login({}).catch(err => {})
				let {
					code = ''
				} = res
				let result = await this.$request('Demo.WxLogin', {
					code
				}).then().catch(err => {})
				//这里会获取token，来作为登录凭证
				console.log('result', result)
			}
		},
		async onLoad() {

		}
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
