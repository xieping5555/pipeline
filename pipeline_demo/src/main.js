import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
//axios
import axios from 'axios'
Vue.prototype.$http=axios;
//vue-router
import VueRouter from 'vue-router';
import routes from './router.config.js';
Vue.use(VueRouter);

//导入ExportEXCEL插件
import ExportEXCEL from './components/exportEXCEL';
Vue.use(ExportEXCEL);
//导入打印插件
import Print from './components/print'
Vue.use(Print);
const router=new VueRouter({
	routes
});


const socket=io.connect('http://localhost:3000');
Vue.prototype.$socket=socket;                 //在实例上添加一个全局的socket对象


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
