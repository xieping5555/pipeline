import Home from './components/Home.vue';
//入库
import Warehouse from './components/Warehouse.vue';
import Warehouse_input from './components/Warehouse_input.vue';
import Warehouse_detail from './components/Warehouse_detail.vue';
//出库
import Out from './components/Out.vue';
import Out_input from './components/Out_input.vue';
import Out_detail from './components/Out_detail.vue';
//出货
import Sale from './components/Sale.vue';
import Sale_input from './components/Sale_input.vue';
import Sale_detail from './components/Sale_detail.vue';
//兑车
import Carpush from './components/Carpush.vue';
import Carpush_input from './components/Carpush_input.vue';
import Carpush_detail from './components/Carpush_detail.vue';
//回填
import Backfill from './components/Backfill.vue';
import Backfill_input from './components/Backfill_input.vue';
import Backfill_detail from './components/Backfill_detail.vue';
//流水线实时查看
import Screen from './components/Screen.vue';
import Arrange from './components/Arrange.vue';
//登陆页面
import Login from './components/Login.vue';
//主页
import Content from './components/Content.vue';
//数据字典管理界面
import Datamanage from './components/Datamanage.vue';
import WarehouseManage from './components/WarehouseManage.vue';
import StorehouseManage from './components/StorehouseManage.vue';
import MaterialManage from  './components/MaterialManage.vue';
import ClassesManage from './components/ClassesManage.vue';
import GroupManage from './components/GroupManage.vue';
export default [
	{path:'/login',component:Login},
	{
		path:'/index',
		component:Content,
		children:[
			{path:'home',component:Home},
			{
				path:'warehouse',
				component:Warehouse,
				children:[
					{path:'warehouse_input',component:Warehouse_input},
					{path:'warehouse_detail',component:Warehouse_detail}
				]
			},
			{
				path:'out',
				component:Out,
				children:[
					{path:'out_input',component:Out_input},
					{path:'out_detail',component:Out_detail}
				]
			},
			{
				path:'sale',
				component:Sale,
				children:[
					{path:'sale_input',component:Sale_input},
					{path:'sale_detail',component:Sale_detail}
				]
			},
			{
				path:'carpush',
				component:Carpush,
				children:[
					{path:'carpush_input',component:Carpush_input},
					{path:'carpush_detail',component:Carpush_detail}
				]
			},
			{
				path:'backfill',
				component:Backfill,
				children:[
					{path:'backfill_input',component:Backfill_input},
					{path:'Backfill_detail',component:Backfill_detail}
				]
			},
			{
				path:'datamanage',
				component:Datamanage,
				children:[
					{path:'warehousemanage',component:WarehouseManage},
					{path:'storehousemanage',component:StorehouseManage},
					{path:'materialmanage',component:MaterialManage},
					{path:'classesemanage',component:ClassesManage},
					{path:'groupmanage',component:GroupManage}
				]
			},
			{path:'arrange',component:Arrange},
			{path:'screen',component:Screen},
		]
	},
	{path:'/',redirect:'/Login'},
	{path:'/index',redirect:'/index/home'}
];
