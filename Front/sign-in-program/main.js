//导入网络请求的包
import {$http} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'http://10.161.119.50:8856'

//请求拦截器
$http.beforeRequest = function(option) {
	uni.showLoading({
		title:'数据加载中'
	})
} 
 
 //响应拦截器
 $http.afterRequest = function(){
	 uni.hideLoading()
 }
 
 //封装弹框的方法
 uni.$showMsg = function(title = '数据请求失败!',duration = 1500){
	 uni.showToast({
	 	title,
		duration,
		icon:'none'
	 })
 }
 

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif