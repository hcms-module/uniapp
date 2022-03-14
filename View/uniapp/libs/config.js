export default {
	env: 'dev',
	host: {
		dev: 'http://127.0.0.1:9501',
		pro: ''
	},
	// 公共请求头
	header: {},
	//项目版本号
	version: "0.1.0",
	getBaseUrl() {
		return this.host[this.env] || '/'
	}
}
