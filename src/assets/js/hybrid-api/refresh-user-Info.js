/**
 *@description 更新主平台登录后传过来的用户数据
 @param {Object} 传入参数:{
	key :"ticket"
	value : "uploadProgress" // 上传进度回调方法 function uploadProgress(e) { //e 会回调一个%数 }
}
 *@return  {Object} 
  {
"printer_name":"",
"requestUrl":"192.168.175.1:162:13/mp",
"loginName":"SysAdmin",
"userId":"1.2",
"groupId":"50",
"Ticket":"ZiemgipeEgeifefefeffscfe"
  }

 * @example  this.$hybridApi.getUserInfo({success:obj=>{
 * }})
 */
export default function(oparam){
    let _this=this;
    this.success=oparam.success;
    this.key=oparam.key;
    this.value=oparam.value;
    var testUri = "content://com.chinasie.vplus.context.SMOMContentProvider/context";
    var input = { contentUri: testUri, key: this.key, value: this.value };
    cordova.exec(function (obj) {
      var data = JSON.stringify(obj);
      _this.success(obj)
    }, function (e) {
      alert("Error: " + e);
    }, "ContentProviderPlugin", "update", [input]);
  }