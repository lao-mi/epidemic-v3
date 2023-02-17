import { createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> =[
  {
    path:'/',
    
    component: ()=> import('../views/Homeview/index.vue')
  },
  {
    path:'/login',
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
      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})
export default router