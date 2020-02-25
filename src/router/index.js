import Vue from "vue"
//导入NProgress包
import  NProgress from "nprogress"
//导入NProgress css样式
import "nprogress/nprogress.css"
// 导入组件
import login from "../views/login/index.vue"
import index from "../views/index/index.vue"
import user from "../views/index/user/user.vue"
import chart from "../views/index/chart/chart.vue"
import question from "../views/index/question/question.vue"
import enterprise from "../views/index/enterprise/enterprise.vue"
import subject from "../views/index/subject/subject.vue"


// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
//这里就是路由的配制项
routes: [
 {
     path:'/login',
     component:login
 },
 {
  path:'/index',
  component:index,
  children:[
    {
      path:'user',
    component:user
  },
  {
    path:'chart',
  component:chart
},
{
  path:'question',
component:question
},
{
  path:'enterprise',
component:enterprise
},
{
  path:'subject',
component:subject
},
  ]
 }
  ]
})
//路由跳转中
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  NProgress.start()
  next();
})
//路由跳转后
router.afterEach(() => {
  // to and from are both route objects.
  NProgress.done()
})
export default router