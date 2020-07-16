import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthService from './services/auth'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

import LayoutBasic from './components/layouts/LayoutBasic'
import LayoutLogin from './components/layouts/LayoutLogin'
import LayoutAdmin from './components/layouts/LayoutAdmin'

import NotFoundPage from './components/errors/404.vue'
import ForbiddenPage from './components/errors/403.vue'


import Reception from './components/reception/Reception'
import ReceptionCustomerSell from './components/reception/sell/Index'
import ReceptionCustomerBuy from './components/reception/buy/Index'


import Technical from './components/technical/Technical'
import TechnicalTest from './components/technical/test/Index'
import TechnicalRepair from './components/technical/repair/Index'

// warehouse
import Warehouse from './components/warehouse/Warehouse'
import WarehouseIndex from './components/warehouse/Index'

// order 
import Order from './components/order/Order'
import OrderIndex from './components/order/Index'

// sales
import Sales from './components/sales/Sales'
import SalesIndex from './components/sales/Index'


// manage
import Manage from './components/manage/Manage'
import VehiclePurchaseManage from './components/manage/vehicle/purchase/Index'
import VehicleRepairManage from './components/manage/vehicle/repair/Index'

// dashboard

import Dashboard from './components/dashboard/Dashboard'


import VueRouterMultiguard from 'vue-router-multiguard'
import Auth from '@/services/auth'




Vue.use(VueRouter)


const routes = [
	
	{
		path: '/auth',
		component: LayoutLogin,
		meta: { requireAuth: true },
		name: 'auth',
		children: [
			{
				path: 'login',
				component: Login,
				name: 'login'
			},
			{
				path: 'register',
				component: Register,
				name: 'register'
			},
			{
				path: 'logout',
				component: Logout
			},
			{
				path: 'forbidden',
				component: ForbiddenPage,
				name: 'forbidden',
			}
		]
	},

	{
		path: '/',
		component: LayoutAdmin,
		name: 'root',
		meta: { 
			requireAuth: true,
			breadCrumb: 'Reception'
		},
		children: [
			{
				path: 'dashboard',
				component: Dashboard,
				name: 'dashboard',
			},

			{
				path: 'reception',
				component: Reception,
				meta: { 
					requireAuth: true,
					breadCrumb: 'Reception'
				},
				children: [
					{
						path: 'customer-sell',
						component: ReceptionCustomerSell,
						name: 'receptionCustomerSell',
						meta: {
							breadCrumb: 'Customer Sell'
						}
						
					},

					{
						path: 'customer-buy',
						component: ReceptionCustomerBuy,
						name: 'receptionCustomerBuy',
						meta: {
							breadCrumb: 'Customer Buy'
						}
					}
				]
			},

			{
				path: 'warehouse',
				component: Warehouse,
				meta: { requireAuth: true, permission: 'admin' },
				children: [
					{
						path: '/',
						component: WarehouseIndex,
						name: 'warehouseIndex'
					}
				]
			},

			{
				path: 'orders',
				component: Order,
				meta: { requireAuth: true, permission: 'admin' },
				children: [
					{
						path: '/',
						component: OrderIndex,
						name: 'orderIndex'
					}
				]
			},


			{
				path: 'sales',
				component: Sales,
				meta: { requireAuth: true, permission: 'user' },
				children: [
					{
						path: '/',
						component: SalesIndex,
						name: 'salesIndex'
					}
				]
			},

			{
				path: 'technical',
				component: Technical,
				children: [
					{
						path: 'test',
						component: TechnicalTest,
						name: 'technicalTest'
					},

					{
						path: 'repair',
						component: TechnicalRepair,
						name: 'technicalRepair'
					}
				]
			},


			{
				path: 'manage',
				component: Manage,
				children: [
					{
						path: 'vehicle-purchase',
						component: VehiclePurchaseManage,
						name: 'vehiclePurchase'
					},
					{
						path: 'vehicle-repair',
						component: VehicleRepairManage,
						name: 'vehicleRepair'
					},

				]
			},
		]
	},

	{ path: '*',  component:  NotFoundPage },


]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})



router.beforeEach((to, from, next) => {
	const tokenUser = $cookies.get('accessToken')


	if(to.matched.some(m => m.meta.requireAuth)){


		if (to.name !== 'login' && !tokenUser) 
			next({ name: 'login' })
	  	else{

	  		// to.matched.some(m => {
	  		// 	switch(m.meta.permission){
	  		// 		case 'admin':
	  		// 			break
	  		// 		case 'user': 
	  		// 			router.push('/forbidden')
	  		// 			break
	  		// 	}
	  		// })
	  		next()
	  	}
	}
	return next()
})

export default router