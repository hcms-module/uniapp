import {
	nav,
	store
} from '@/pages/index.js'
import tool from '@/libs/tool/index.js'
import {
	request
} from '@/libs/request/index.js'


import {
	createSSRApp
} from 'vue'
import {
	createStore
} from 'vuex'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$nav = nav
	app.config.globalProperties.$t = tool
	app.config.globalProperties.$request = request
	//vuex
	app.use(createStore({
		modules: store
	}))
	return {
		app
	}
}