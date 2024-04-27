export default {
	env: 'pro',
	host: {
		dev: 'http://127.0.0.1:9501',
		pro: ''
	},
	// 公共请求头
	header: {},
	//项目版本号
	version: "0.1.2",
	encode_key: '2c1dc1975775ee38',

	getBaseUrl() {
		return this.host[this.env] || '/'
	}
}