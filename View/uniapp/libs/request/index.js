import {
	apis
} from "@/pages/index.js"

import Config from '../config.js'
import CodeHandle from './handle/code-handle.js'
import CryptoJS from "crypto-js";
let getCommonHeader = () => {
	//获取公共的header，这里用来加入登录凭证
	let login_token = uni.getStorageSync('token')
	return {
		'Authorization': `Bearer ` + login_token,
		...(Config['header'] || {})
	}
}



let getEncrypt = (data) => {
	let key = CryptoJS.enc.Utf8.parse(Config.encode_key);
	let encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}).toString();
	return {
		data: encrypted_data,
		is_encrypt: true
	}
}

let getDecrypt = (data) => {
	let key = CryptoJS.enc.Utf8.parse(Config.encode_key);
	let decrypted = CryptoJS.AES.decrypt(data, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}).toString(CryptoJS.enc.Utf8);
	return JSON.parse(decrypted)
}

export const request = async (api_name, data = {}, options = {}) => {
	//api名称不区分大小写
	api_name = api_name.toLowerCase()
	let api = apis[api_name]
	if (api) {
		let method = (api['method'] || "GET").toUpperCase()
		let {
			header = {}, code_handle = {}, is_encrypt_param = false
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
		if (is_encrypt_param && Config.env !== 'dev') {
			data = getEncrypt(data)
		}
		let url = Config.getBaseUrl() + (api['url'] || '')
		let res = null
		if (method === 'UPLOAD') {
			//上传配置
			let request_config = {
				url,
				filePath: data.file,
				name: data.file_name || 'file',
				formData: data,
				header
			}
			res = await uni.uploadFile(request_config).catch(errorFunction)
			if (typeof res.data === 'string') {
				res.data = JSON.parse(res.data)
			}
		} else {
			//请求全局配置
			let request_config = {
				url,
				data,
				header,
				dataType: 'json',
				method,
			}
			res = await uni.request(request_config).catch(errorFunction)
		}
		let response = res.data
		let {
			is_encrypt = false
		} = response
		if (is_encrypt) {
			//已经加密，需要解密
			response = getDecrypt(response.data)
		}
		let {
			code = 200
		} = (response || {})
		//获取处理方法
		code_handle = {
			...CodeHandle,
			...code_handle
		}
		if (code_handle[code] && typeof code_handle[code] === 'function') {
			let handle_res = await code_handle[code](response, {
				api_name,
				data,
				options
			})
			if (handle_res === false) {
				//如果处理返回false，就需要抛出异常
				throw response
			}
			// console.log(handle_res)
			return handle_res
		}
		return response
	} else {
		console.error('找不到该api')
		throw "找不到该api"
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