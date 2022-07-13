export default {
	data() {
		return {
			is_init_loading: true,
			data_list: [],
			per_page: 20,
			last_page: 0,
			page: 1,
		}
	},
	methods: {
		currentChangeEvent(e) {
			this.page = e
			this.GetList()
		},
		handRes({
			data,
			current_page,
			last_page,
			per_page
		}) {
			if (current_page > 1) {
				this.data_list = [...this.data_list, ...data]
			} else {
				this.data_list = data
			}
			this.per_page = per_page;
			this.last_page = last_page
			this.page = current_page
		}
	},
	onLoad() {
		if (this.is_init_loading) {
			this.GetList()
		}
	},
	onReachBottom() {
		if (this.page < this.last_page) {
			this.page =
				this.currentChangeEvent(parseInt(this.page) + 1)
		}
	},
	onPullDownRefresh() {
		this.currentChangeEvent(1)
	}
}
