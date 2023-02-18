import { createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'


const routes:Array<RouteRecordRaw> =[
  {
    path:'/',
    component: ()=> import('../views/Homeview/index.vue')
  },
  {
    path:'/elogin',
    component:()=> import('@/views/Login/index.vue')
  },
  {
    path: '/register',
    component: ()=> import('@/views/register/index.vue')
  },
  {
    path: '/explorer',
    component: ()=> import('@/views/explorer/index.vue'),
    children: [
      {
        path: 'news',
        component: ()=> import('@/components/menu/news/index.vue')
      },
      {
        path: 'notice',
        component: ()=> import('@/components/menu/notice/index.vue')
      },
      {
        path: 'detailed/:id',
        name: 'deta',
        component: ()=> import('@/components/menu/news/detailed.vue')
      },
      {
        path: 'sign',
        component: ()=> import('@/components/menu/sgin/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'sfrom',
        component: ()=> import('@/components/menu/sgin/sfrom.vue')
      }
      ,
      {
        path: 'apply',
        component: ()=> import('@/components/menu/apply/index.vue')
      },
      {
        path:'applys',
        component: ()=>import('@/components/menu/apply/applys.vue')
      },
      {
        path: 'report',
        component: ()=> import('@/components/menu/report/index.vue')
      },
      {
        path: 'reports',
        component : ()=> import('@/components/menu/report/repform.vue')
      },
      {
        path: 'access',
        component: ()=> import('@/components/menu/access/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: ()=> import('@/views/user/index.vue')
  },{
    path: '/change',
    component: ()=>import('@/views/user/change.vue')
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  nprogress.start()
  console.log(to,from);
  
  next()
})
router.afterEach(()=>{
  nprogress.done()
})
export default router