import {
	apis
} from "@/pages/index.js"

import Request from './luch-request'
import Config from '../config.js'
import CodeHandle from './handle/code-handle.js'

let getCommonHeader = () => {
	//获取公共的header，这里用来加入登录凭证
	return {
		...(Config['header'] || {})
	}
}

export const request = async (api_name, data = {}, options = {}) => {
	let api = apis[api_name]
	if (api) {
		let method = (api['method'] || "GET").toUpperCase()
		let {
			header = {},
				code_handle = {}
		} = options

		// 请求header优先级：传入>api>公共
		header = {
			...getCommonHeader(),
			...(api['header'] || {}),
			...header,
		}

		//参数
		data = {
			...(api['params'] || {}),
			...data
		}
		let url = api['url'] || ''
		//请求全局配置
		let request_config = {
			url,
			header,
			dataType: 'json',
			method
		}
		if (method === 'GET') {
			request_config = {
				...request_config,
				...{
					params: data
				}
			}
		} else {
			request_config = {
				...request_config,
				data
			}
		}

		let http_request = new Request({
			baseURL: Config.getBaseUrl(),
			responseType: "json"
		})
		let res = await http_request.request(request_config).catch(errorFunction)
		let {
			code = 200
		} = res.data

		//获取处理方法
		code_handle = {
			...CodeHandle,
			...code_handle
		}
		if (typeof code_handle[code] === 'function') {
			let handle_res = await code_handle[code](res.data, {
				api_name,
				data,
				options
			})
			if (!handle_res) {
				//如果处理返回false，就需要抛出异常
				throw res.data
			}
		}

		return res.data
		console.log('api', api)
	} else {
		console.error('找不到该api')
	}
}

/**
 * 处理请求错误
 */
let errorFunction = (res) => {
	let {
		statusCode = 0
	} = res
	if (statusCode !== 0) {
		uni.showToast({
			title: '系统错误' + statusCode,
			duration: 2000,
			icon: 'none'
		})
	}
	//这里是详细的请求记录，可以及日志保留
	console.error('err', res)
}
