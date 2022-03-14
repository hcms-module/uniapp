import {
	nav,
	store
} from '@/pages/index.js'
import tool from '@/libs/tool/index.js'
import {
	request
} from '@/libs/request/index.js'

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.prototype.$nav = nav
Vue.prototype.$t = tool
Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.prototype.$store = new Vuex.Store({
	modules: store
})

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif


// #ifdef VUE3

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
// #endif
