# routers

**routers** 目录内放置系统路由。

系统模块对应的路由，以 `.js` 文件形式区分，例如：

- routers/user.js
- routers/system.js
- routers/points.js

## 路由定义

路由定义时，以大驼峰命名方式指定 **路由名称**，并根据模块进行合理的路由划分，例如：

```javascript
// routers/about.js

export default [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@views/About.vue')
  }
]
```

我们在 `routers/about.js` 中定义 `about` 模块的路由，然后在 `routers/index.js` 中进行统一配置。

```javascript
// routers/index.js

// 导入 about 模块路由
import AboutRouter from './about'

/* ... */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    // 引入 about 模块路由
    ...AboutRouter
  ]
})
```

## 页面路由

页面中的路由跳转以 name 的形式进行，例如：

```javascript
  router.push({ name: 'routeName', /* ... */})
  
  router.replace({ name: 'routeName', /* ... */ })
```

