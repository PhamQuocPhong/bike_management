import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthService from './services/auth'

import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Logout from './views/auth/Logout'

import LayoutBasic from './views/layouts/LayoutBasic'
import LayoutLogin from './views/layouts/LayoutLogin'
import LayoutAdmin from './views/layouts/LayoutAdmin'

import NotFoundPage from './views/errors/404.vue'
import ForbiddenPage from './views/errors/403.vue'


import Reception from './views/reception/Reception'
import ReceptionCustomerSell from './views/reception/sell/Index'
import ReceptionCustomerBuy from './views/reception/buy/Index'


import Technical from './views/technical/Technical'
import TechnicalTest from './views/technical/test/Index'
import TechnicalRepair from './views/technical/repair/Index'

// warehouse
import Warehouse from './views/warehouse/Warehouse'
import WarehouseIndex from './views/warehouse/Index'

// order 
import Order from './views/order/Order'
import OrderIndex from './views/order/Index'

// sales
import Sales from './views/sales/Sales'
import SalesIndex from './views/sales/Index'


// manage
import Manage from './views/manage/Manage'
import VehiclePurchaseManage from './views/manage/vehicle/purchase/Index'
import VehicleRepairManage from './views/manage/vehicle/repair/Index'

// dashboard
import Dashboard from './views/dashboard/Dashboard'

// Setting 
import Setting from './views/setting/Setting'
import SettingIndex from './views/setting/Index'

import VueRouterMultiguard from 'vue-router-multiguard'
import Auth from '@/services/auth'


import User from './views/user/User'
import Profile from './views/user/Profile'

import Chat from './views/chat/Chat'
import ChatIndex from './views/chat/Index'
import Room from './views/chat/room/Room'
import RoomIndex from './views/chat/room/Index'

import store from './store/index'


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
				component: Logout,
				name:'logout'
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
				meta: { requireAuth: true, permission: 'admin', breadCrumb: 'Warehouse' },
				children: [
					{
						path: '/',
						component: WarehouseIndex,
						name: 'warehouseIndex',
					}
				]
			},

			{
				path: 'orders',
				component: Order,
				meta: { requireAuth: true, permission: 'admin', breadCrumb: 'Orders' },
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
				meta: { requireAuth: true,  breadCrumb: 'Sales' },
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
				meta: { requireAuth: true, breadCrumb: 'Technical' },
				children: [
					{
						path: 'test',
						component: TechnicalTest,
						name: 'technicalTest',
						meta: {
							breadCrumb: 'Technical Test'
						}
					},

					{
						path: 'repair',
						component: TechnicalRepair,
						name: 'technicalRepair',
						meta: {
							breadCrumb: 'Technical Repair'
						}
					}
				]
			},


			{
				path: 'manage',
				component: Manage,
				meta: {
					breadCrumb: 'Manage'
				},
				children: [
					{
						path: 'vehicle-purchase',
						component: VehiclePurchaseManage,
						name: 'vehiclePurchase',
						meta: {
							breadCrumb: 'Vehicle Purchase'
						},
					},
					{
						path: 'vehicle-repair',
						component: VehicleRepairManage,
						name: 'vehicleRepair',
						meta: {
							breadCrumb: 'Vehicle Repair'
						},
					},

				]
			},

			{
				path: 'settings',
				component: Setting,
				meta: {
					breadCrumb: 'Setting'
				},
				children: [
					{
						path: '/',
						component: SettingIndex,
						name: 'settingIndex',
					},
				]
			},

			{
				path: 'user',
				component: User,
				meta: {
					breadCrumb: 'user'
				},
				children: [
					{
						path: 'profile',
						component: Profile,
						name: 'profile',
					},
				]
			},

			{
				path: 'chat',
				component: Chat,
				meta: {
					breadCrumb: 'Chat'
				},
				name: 'chat',
				children: [
					{
						path: '/',
						component: ChatIndex,
						name: 'chatIndex',
						meta: {
							breadCrumb: 'List Room'
						},
					},

					{
						path: 'room',
						component: Room,
						name: 'room',

						meta: {
							breadCrumb: 'Room'
						},

						children: [
							{
								path: ':id',
								component: RoomIndex,
							}
						]
					},
				]
			}
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

		if (to.name !== 'login' && !tokenUser) {
			$cookies.remove('accessToken')
			$cookies.remove('dataUser')
			store.dispatch('SOCKET_REMOVE_USER')
			next({ name: 'login' })
		}
	  	else{
	  		next()
	  	}
	}
	return next()
})

export default router