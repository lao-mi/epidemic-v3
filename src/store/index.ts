import { defineStore } from 'pinia'
import {tologin,touser,toregister} from '@/server'

export const useloginStore = defineStore('main',{
  state:()=>({
      user: {},
      token:'',
      userinfo:{
        avatar:'',
        username:''
      },
      userimg:{},
      news:[],
      notice:{
        middle:[],
        high:[ ]
      },
      applylist:[]
  }),
  actions:{
    async getuser(){
      await touser().then((res:any)=>{
        this.userinfo=res.data.data.user
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo))
      })
    },
    getlogin(res:any){
      this.token=res.headers['authorization']
      this.user = res.data
      localStorage.setItem('token', this.token)
    },
    changenotice(high:any,middle:any){
      this.notice.high=[]
      this.notice.middle=[]
      this.notice.high = high
      this.notice.middle = middle
    }
  },
  getters:{
  }
})