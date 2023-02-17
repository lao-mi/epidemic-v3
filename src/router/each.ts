import router from './index'

router.beforeEach((to,from)=>{
  if(to.meta.requiresAuth && localStorage.getItem('123')){

  }
})