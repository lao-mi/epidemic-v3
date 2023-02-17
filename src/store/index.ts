import { defineStore } from 'pinia'

export const useStore = defineStore('main',{
  state:()=>({
      name:'wwy'
  }),
  actions:{
    test(abc:any){
      console.log(abc);
      
    }
  },
  getters:{
    leth(state){
      return state.name.length
    }
  }
})