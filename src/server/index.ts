import eaxios from './eaxios'


// 登录
const tologin:any = (loginfrom:any)=> eaxios.post('/login?'+loginfrom)
// 获取验证码
const getcode:any = ()=>eaxios.get('/captcha')
// 获取用户信息
const touser:any = ()=>eaxios.get("/userInfo")
// 获取部门院校（注册）
const getdeptlist:any = ()=>eaxios.get('/register/deptList')
// 注册
const toregister:any = (regfrom:any)=>eaxios.post('/register?'+regfrom)
// 修改密码
const uppass:any = (pass:any)=>eaxios.get('/sys/user/updatePassword',{params:pass})
// 修改用户信息
const updatainfo:any =(from:any)=>eaxios.post('/sys/user/updateInfo',from)
// 是否打卡打卡
const toclock:any = ()=>eaxios.get('/health/clock')
// 提交打卡
const tosgin:any =(from:any)=>eaxios.post('/health/clock',from)
// 获取全国疫情数据
const getchinamap:any =()=>eaxios.get('/chinaData')
// 获取新闻数据
const getnews:any = ()=>eaxios.get('/news')
// 获取风险地区
const getriskarea:any = ()=>eaxios.get('/riskarea')
// 是否提交三码
const torep:any =()=>eaxios.get('/health/report')
// 提交三码
const toreport:any = (formData:any)=>eaxios.post('/health/report', formData)
// 出入申请
const toapply:any = (form:any)=>eaxios.post('/leave/apply',form)
// 获取请假列表
const getapplylist:any = (form:any)=>eaxios.get('/leave/apply/list',{params:form})
// 提交出入申请
const getaccess:any = (form:any)=>eaxios.post('/access/register',form)
export {
  tologin,
  getcode,
  touser,
  getdeptlist,
  toregister,
  uppass,
  updatainfo,
  torep,
  toclock,
  tosgin,
  getchinamap,
  getnews,
  getriskarea,
  toreport,
  toapply,
  getapplylist,
  getaccess
}