<template>
	<v-select
		:items="employees"
		:label="label"
		item-text="fullName"
		return-object
		v-model="getEmployee"
	></v-select>
</template>

<script type="text/javascript">
import Employee from '@/store/models/employee'  

export default {

	props: ['positionId', 'employee', 'label'],

	data(){
		return {
			employees: [],
			getEmployee: this.employee
		}
	},

	async created(){
		const res = await Employee.api().getByPostion(this.positionId)
		if(res.response.status === 200){
			this.employees = res.response.data.data

		}
	},

	watch: {
		getEmployee(val){
			this.$emit('update:employee', this.getEmployee)
		}
	},


}
</script>