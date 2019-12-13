import Vue from 'vue'
export default function devLogin(vue){ 
 let promiseObj= new Promise(function(resolve, reject){
  if(window.cordova){
    Vue.prototype.$hybridApi.configHeader({show:false});//配置去掉v平台的首页
    Vue.prototype.$hybridApi.getUserInfo({
         success:obj=>{
           Vue.prototype.$vue.$store.dispatch('changeUserInfo',{attr:"url",val:"http://"+obj.requestUrl+"/Server.svc/api/invoke"});
           Vue.prototype.$vue.$store.dispatch('changeUserInfo',{attr:"userName",val:obj.loginName});
           Vue.prototype.$vue.$store.dispatch('changeUserInfo',{attr:"userId",val:obj.userId});
           Vue.prototype.$vue.$store.dispatch('changeUserInfo',{attr:"orgId",val:obj.groupId});							
           Vue.prototype.$vue.$store.dispatch('changeUserInfo',{attr:"ticket",val:obj.Ticket}); 
          //新建定時器更新ticket 2分鐘
 setInterval(function(){
  Vue.prototype.$axiosApi.changeInvOrg(obj.userId, obj.groupId).then(item=>{ 
    console.log('执行刷新了');
  })
},120000)          
          resolve(obj)
}
});

}else{
  console.log('进来了登陆接口了');
  Vue.prototype.$axiosApi.login("30000183","123456").then(res=>{

    if(res.Success){
//  console.log(res);
let orgId=res.Context.InvOrgId;
let ticket=res.Context.Ticket;
let userId=res.Result.UserId;
let userName=res.Result.UserName;
let userCode=res.Result.UserCode;
vue.$store.dispatch('changeUserInfo',{attr:'userName',val:userName});  
vue.$store.dispatch('changeUserInfo',{attr:'userCode',val:userCode});
 vue.$store.dispatch('changeUserInfo',{attr:'userId',val:userId})
vue.$store.dispatch('changeUserInfo',{attr:'ticket',val:ticket});  
vue.$store.dispatch('changeUserInfo',{attr:'orgId',val:orgId}); 
// setInterval(function(){
//   Vue.prototype.$axiosApi.changeInvOrg(userId, orgId).then(item=>{ 
//     console.log('执行刷新了');
//   })
// },10000)
resolve(res.Result)
}

 })
}
    
})
return promiseObj
}