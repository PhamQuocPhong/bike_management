<template>
	<v-btn
		:outlined="outlined"
		:small="checkSmall"
		:color="color"
		:class="classProp"
		@click="emitClick()"
	>	
		{{title}}
		<v-icon v-if="icon">{{icon}}</v-icon>
	</v-btn>
</template>

<script type="text/javascript">


export default {
		props: {
			title: {
				type: String,
			},

			icon: {
				type: String,
				default: ""
			},
			small: {
				type: Boolean,
				default: true
			},

			classProp: {
				type: String,
			},
			color: {
				type: String,
				default: "white"
			},

			outlined: {
				type: Boolean,
				default: false
			},

			type: {
				type: String,
				required: true
			}
		},

		data() {
			return {
				userInfo: this.$cookies.get('dataUser'),
				roles: this.$appConfig.roles,
				checkSmall: this.small 	
			}
		},
		mounted(){
			this.checkSizeBtn()
		},

		methods: {
			checkSizeBtn(){
				switch(this.type){
					case "upload":
					case "save":
					case "close": 
						this.checkSmall = false
				}		
			},

			emitClick(){

				switch(this.type) {
					case "export":
					case "save":
					case "create":
					case "delete": 
						if(this.userInfo.roleId === this.roles.GUEST) {
							toastr.warning("Please contact administrator to do this", "Warning!", {
				          timeOut: 700
				      });

						}else{
							this.$emit('action')
						}
						break;
					case "edit":
					case "upload":
					case "close":
						this.$emit('action')
						break;

					default:
						break;
				}
			},
		},


}
</script>