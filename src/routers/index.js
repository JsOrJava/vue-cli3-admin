import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import userRouter from './user'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }), //新开的路由默认为顶部
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/index',
      component: () => import(/* webpackChunkName: "home" */ '../pages/home/index.vue'),
      meta: { title: '首页' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import(/* webpackChunkName: "404" */ '../pages/home/login.vue'),
          meta: { title: '首页' }
        }
      ]
    },
    {
      path: '/',
      name: '布局文件',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '布局文件' },
      children: [
        {
          path: '404',
          name: '404',
          component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '403',
          name: '403',
          component: () => import(/* webpackChunkName: "403" */ '../pages/403.vue'),
          meta: { title: '403' }
        },
      ]
    },
      // ... userRouter
  ]
})
//捕获权限
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.path === '/login') { //登录页面无需权限
    next()
  } else if (to.path === '/index') { //启动页无需权限
    next()
  } else if (to.path === '/403') { //无权限页面
    next()
  } else if (to.path === '/404') { //无匹配页面
    next()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
