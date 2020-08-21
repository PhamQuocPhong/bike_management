<template>
	<v-btn
		:outlined="outlined"
		:size="size"
	>
		{{title}}
	</v-btn>
</template>

<script type="text/javascript">
export default {
		props: {
			outlined: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: "Edit"
			}

		},

		data() {
			return {
				userInfo: this.$cookies.get('dataUser')
			}
		}

		mounted(){
			console.log(this.userInfo)
		}

		methods: {
			checkRole(){

			}
		}
}
</script>