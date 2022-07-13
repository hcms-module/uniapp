export default {
	/**
	 * @param {object}  request_info 原请求信息
	 */
	"200": async (res, request_info) => {
		// console.log('返回码是200', request_info)
		return res
	},
	"500": async (res) => {
		// console.log('返回码是500')
		await uni.showToast({
			title: res.msg,
			icon: 'error'
		})
		return false
	}
}
