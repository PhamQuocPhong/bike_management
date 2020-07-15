<template>
<div class="container">
	<v-row>
		<h2>Dashboard</h2>
	</v-row>
	<v-row>
		<v-col cols="12" :class="`${responsive}`">
			<v-card class="block-cart" dark>
				<div class="d-flex align-center">
					<v-card-text>Total orders</v-card-text>
					<v-spacer></v-spacer>
					<v-icon class="text-right pr-2">mdi-cart-outline</v-icon>
				</div>
				<v-card-title primary-title>
				  19,000
				</v-card-title>
			</v-card>
		</v-col>

		<v-col cols="12" :class="`${responsive}`">
			<v-card class="block-bike" dark>
				<div class="d-flex align-center" >
					<v-card-text>Total sold vehicles</v-card-text>	
					<v-spacer></v-spacer>
					<v-icon class="text-right pr-2">mdi-moped</v-icon>
				</div>
				<v-card-title primary-title>
				  210
				</v-card-title>
			</v-card>
		</v-col>

		<v-col cols="12" :class="`${responsive}`">
			<v-card class="block-customer" dark>
				<div class="d-flex align-center">
					<v-card-text>Total customers</v-card-text>	
					<v-spacer></v-spacer>
					<v-icon class="text-right pr-2">mdi-account</v-icon>
				</div>
				<v-card-title primary-title>
				  19,000
				</v-card-title>
			</v-card>
		</v-col>

		<v-col cols="12" :class="`${responsive}`">
			<v-card class="block-revenue" dark>
				<div class="d-flex align-center">
					<v-card-text>Renevue / month</v-card-text>	
					<v-spacer></v-spacer>
					<v-icon class="text-right pr-2">mdi-currency-usd</v-icon>
				</div>
				<v-card-title primary-title>
				  19,000
				</v-card-title>
			</v-card>
		</v-col>
	</v-row>

	<v-row>
		<v-col cols="8" >
			<v-card>
				<revenue-chart :data="dataRevenue" :options="optionRevenues"></revenue-chart>
			</v-card>
		</v-col>

		<v-col cols="4">
			<v-card class="pl-2 pr-2">
				<analys-vehicle
				>
				</analys-vehicle>
			</v-card>
		</v-col>
	</v-row>

	<v-row>
		<v-col cols="4">
			<v-card >
				<v-card-title primary-title>
				  Facebook
				</v-card-title>

				<v-divider></v-divider>

				<v-card-subtitle class="text-center">
					<span> 10K Follows </span> 
					<v-divider 
				    	class="mx-4 vertical"
				    	inset
				    	vertical

      				></v-divider>
					<span> 200 Writes</span>
				</v-card-subtitle>
			</v-card>
		</v-col>

		<v-col cols="4">
			<v-card >
				<v-card-title primary-title>
				  Twitter
				</v-card-title>

				<v-divider></v-divider>

				<v-card-subtitle class="text-center">
					<span> 13K Follows </span> 
					<v-divider 
				    	class="mx-4 vertical"
				    	inset
				    	vertical

      				></v-divider>
					<span> 200 Writes</span>
				</v-card-subtitle>
			</v-card>
		</v-col>

		<v-col cols="4">
			<v-card >
				<v-card-title primary-title>
				  Ins
				</v-card-title>

				<v-divider></v-divider>

				<v-card-subtitle class="text-center">
					<span> 30K Follows </span> 
					<v-divider 
				    	class="mx-4 vertical"
				    	inset
				    	vertical

      				></v-divider>
					<span> 200 Feeds</span>
				</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>

	<v-row>
		<v-col cols="6">
			<v-card>
				<v-card-title primary-title>
					Top customers
				</v-card-title>
				<v-simple-table>
					<thead>
						<th>STT</th>
						<th>Rank</th>
						<th>Name</th>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
					</tbody>
				</v-simple-table>
			</v-card>
		</v-col>

		<v-col cols="6">
			<v-card>
				<v-card-title>
					Top products
				</v-card-title>

				<v-simple-table>
					<thead>
						<th>STT</th>
						<th>Rank</th>
						<th>Name</th>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Gold</td>
							<td>Phong</td>
						</tr>
					</tbody>
				</v-simple-table>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<style type="text/css">
.block-cart{
	background: rgb(5,0,98);
	background: linear-gradient(90deg, rgba(5,0,98,1) 0%, rgba(47,47,161,1) 41%, rgba(0,212,255,1) 100%);
}

.block-bike{
	background: rgb(191,25,25);
	background: linear-gradient(90deg, rgba(191,25,25,1) 0%, rgba(212,29,29,1) 41%, rgba(240,119,119,1) 100%);
}

.block-customer{
	background: rgb(11,46,0);
	background: linear-gradient(90deg, rgba(11,46,0,1) 0%, rgba(51,130,0,1) 41%, rgba(113,241,117,1) 100%);
}

.block-revenue{
	background: rgb(244,120,86);
	background: linear-gradient(90deg, rgba(244,120,86,1) 0%, rgba(247,180,70,1) 41%, rgba(242,198,148,1) 100%);
}

.v-divider.vertical{
	min-height: 16px;
}
</style>

<script type="text/javascript">
import LineChart from '@/components/custom/chart/Line.vue'
import PieChart from '@/components/custom/chart/Pie.vue'
export default {

	components: {
		'revenue-chart': LineChart,
		'analys-vehicle': PieChart
	},

	mounted(){
		console.log(this.$vuetify.breakpoint)
	},


	data(){
		return {
			dataRevenue: {
				labels: [
		          "January",
		          "February",
		          "March",
		          "April",
		          "May",
		          "June",
		          "July",
		          "August",
		          "September",
		          "October",
		          "November",
		          "December"
		        ],
		        datasets: [
			        {
			            label: "Revenue",
			            data: [2, 10, 5, 9, 0, 6, 20, 15, 7, 8, 9, 11].map(item => item * 10),
			            backgroundColor: "transparent",
			            borderColor: "rgba(1, 116, 188, 0.50)",
			            pointBackgroundColor: "rgba(171, 71, 188, 1)"
			        },

			         {
			            label: "Expenditure",
			            data: [4, 7, 3, 10, 5, 10, 25, 11, 7, 4, 10, 11].map(item => item * 10),
			            backgroundColor: "transparent",
			            borderColor: "rgba(1, 116, 188, 0.50)",
			            pointBackgroundColor: "rgba(171, 71, 188, 1)"
			        }
		        ]
			},

			optionRevenues: {
				responsive: true,
		        maintainAspectRatio: false,
		        title: {
		          display: true,
		          text: "Analys revenue"
		        }
			},

			dataVehicle: {
				labels: ["Books", "Magazines", "Newspapers"],
		        datasets: [
		          {
		            backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
		            data: [40, 20, 10]
		          }
		        ]
			},

			optionVehicles: {
				responsive: true, 
				maintainAspectRatio: false
			}
		}
	},

	computed: {
		responsive(){
			switch (this.$vuetify.breakpoint.name){
				case 'xs':
					return 'col-xs-12'
				case 'sm':
					return 'col-sm-6'
				case 'md':
					return 'col-md-3'
				case 'lg':
					return 'col-lg-3'
			}
		}
	}



}
</script>

