<template>
	 <v-select
	 		:label="label"
      :items="itemsPerPageList"
      v-model="getItemsPerPage"
      :class="propClass"
      @change="changePerPage()"
    ></v-select>
</template>

<script type="text/javascript">


export default {
		props: {
			title: {
				type: String,
			},
			label: {
				type: String,
				default: "Items per page"
			},
			
			propClass: {
				type: String, 
				default: "ml-4"
			},

			itemsPerPage: {
				type: Number,
				default: 5
			}
		},

		data(){
			return {
				getItemsPerPage: this.itemsPerPage,
				itemsPerPageList: [5, 10, 15],

			}
		},

		mounted(){
			console.log(this.getItemsPerPage)
		},

		methods: {
			changePerPage(){

				this.$emit('sortItem')
				this.$emit('itemsPerPage:update', this.getItemsPerPage)
			}
		},



}
</script>