import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/Home', component: Home }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫（beforeEach）
router.beforeEach((to, from, next) => {
  // to 将要访问的路径（即将要进入的目标）
  // from 代表从哪个路径跳转而来（当前导航正要离开的路由）
  // next 表示一个函数，表示放行  next() 表示放行   next('/login) 强制跳转页面
  // 如果用户访问的是登录页，直接放行
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有 token ，强制跳转到登录页
  if (!tokenStr) return next('/login')
  // 有 token ，放行
  next()
})

export default router
