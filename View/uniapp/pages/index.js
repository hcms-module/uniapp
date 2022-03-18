import tool from '@/libs/tool/index.js'
// route 集成
let _route = {}
// api集成
let _api = {}

let _store = {}

// #ifdef VUE3
let store_list =
	import.meta.globEager('./**/store/index.js')
// #endif

// #ifndef VUE3
let ctx = require.context('./', true, /\/(.*)\/store\/\index.js$/)
let store_list = {}
for (let fileKey of ctx.keys()) {
	store_list[fileKey] = ctx(fileKey)
}
// #endif

// console.log('store_list', store_list)
for (let index in store_list) {
	let store_item = store_list[index].default
	// 遍历收集route对象
	let modular_name_match = (index.match(/^\.\/(.+)\/store\/index/))
	if (modular_name_match) {
		let modular_name = modular_name_match[1]
		_store[modular_name] = store_item
	} else {
		console.error(index + ' store载入错误')
	}
}


// #ifdef VUE3
let api_list =
	import.meta.globEager('./**/api/api.js')
// #endif

// #ifndef VUE3
let api_ctx = require.context('./', true, /\/(.*)\/api\/\api.js$/)
let api_list = {}
for (let fileKey of api_ctx.keys()) {
	api_list[fileKey] = api_ctx(fileKey)
}
// #endif


for (let index in api_list) {
	let api_item = api_list[index].default
	// 遍历收集route对象
	let modular_name_match = (index.match(/^\.\/(.+)\/api\/api.js/))
	if (modular_name_match) {
		let modular_name = modular_name_match[1]
		for (let api_name in api_item) {
			let _api_name = `${modular_name}.${api_name}`.toLowerCase()
			_api[_api_name] = {
				...api_item[api_name]
			}
		}
	} else {
		console.error(index + ' api载入错误')
	}
}



// #ifdef VUE3
let routes =
	import.meta.globEager('./**/route/index.js')
// #endif

// #ifndef VUE3
let route_ctx = require.context('./', true, /\/(.*)\/route\/\index.js$/)
let routes = {}
for (let fileKey of route_ctx.keys()) {
	routes[fileKey] = route_ctx(fileKey)
}
// #endif

for (let index in routes) {
	let route_item = routes[index].default
	// 遍历收集route对象
	let modular_name_match = (index.match(/^\.\/(.+)\/route\/index.js/))
	if (modular_name_match) {
		let modular_name = modular_name_match[1]
		for (let page_name in route_item) {
			let route_name = `${modular_name}.${page_name}`.toLowerCase()
			_route[`${route_name}`] = {
				...route_item[page_name],
				url: `/pages/${modular_name}/page/${route_item[page_name]['include'] || page_name}/${page_name}`
			}
		}
	} else {
		console.error(index + ' route载入错误')
	}
}

/**
 * 处理路由跳转方法
 * @param {string} open_type  跳转类型有  switchTab、redirectTo、reLaunch、navigateBack、navigateTo
 */

const _nav = (route_name, query = {}, open_type = '') => {
	return new Promise((resolve, reject) => {
		route_name = route_name.toLowerCase()
		//加入点击防抖，防止卡顿时候出现多次跳转
		tool.throttle(() => {
			// 判断是否为后退
			if (route_name === 'back' || open_type === 'navigateBack') {
				const delta = JSON.stringify(query) === JSON.stringify({}) ? 1 : query
				uni.navigateBack({
					delta,
					success: () => {
						resolve('success')
					},
					fail: () => {
						resolve('fail')
					}
				})
				return
			}
			const {
				type = '',
					url
			} = _route[route_name]
			let routerQuery = _route[route_name].query || {}
			// query参数拼接
			let queryObj = {
				...routerQuery,
				...query
			}
			let queryList = []
			for (let i in queryObj) {
				queryList.push(`${i}=${queryObj[i]}`)
			}
			// 打开类型，优先级为$nav->routerConfig.openType
			const _openType = type || open_type || 'navigateTo'
			// 和页面参数拼凑后的url
			const queryUrl = _openType === 'switchTab' ? url : `${url}?${queryList.join('&')}`
			// 根据打开类型执行打开页面，switchTab不允许添加参数
			let object = {
				url: queryUrl,
				success: () => {
					resolve('success')
				},
				fail: () => {
					resolve('fail')
				}
			}
			switch (_openType) {
				case 'navigateTo':
					uni.navigateTo(object)
					break;
				case 'switchTab':
					uni.switchTab(object)
					break;
				case 'redirectTo':
					uni.redirectTo(object)
					break;
				case 'reLaunch':
					uni.reLaunch(object)
					break;
				default:
					uni.navigateTo(object)
					break;
			}
		}, 1000) //一秒钟的防抖
	})
}

export const apis = _api
export const store = _store
export const nav = _nav
