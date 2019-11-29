/**
 *@description 接收主平台登录后传过来的用户数据
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
  var testUri = "content://com.chinasie.vplus.context.SMOMContentProvider/context";	
  var jsonArg = { contentUri: testUri, projection: null, selection: null, selectionArgs: null, sortOrder: null };
			cordova.exec(function (obj) {
        var data = JSON.stringify(obj);       
        let _newobj={};
        obj.forEach(item=>{
          _newobj[item.key]=item.value
        })
        _this.success(_newobj)
			}, function (e) {
				alert("Error: " + e);
			}, "ContentProviderPlugin", "query", [jsonArg]);
}