<template>
<div>
	 <v-skeleton-loader
    ref="skeleton"
    :type="type"
    class="mx-auto"
  ></v-skeleton-loader>
</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: "table-tbody"
		}
	}
}	
</script>