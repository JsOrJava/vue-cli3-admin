import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import ElementUI from 'element-ui'
import filters from './filters/index'
import './directives'

import './style/base.scss'
import './style/css/layout.css'
import './style/css/color-dark.css'  /*深色主题*/
/*@import "./style/css/theme-green/color-green.css" 浅绿色主题*/

Vue.config.productionTip = false
import 'babel-polyfill'

import mixin from './mixins/index'
Vue.mixin(mixin)

Vue.use(ElementUI, {
  size: 'small'
});

// 添加过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
