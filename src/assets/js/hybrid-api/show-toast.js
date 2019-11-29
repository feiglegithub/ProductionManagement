/**
 * 使用此方法前cordova需先安装相应插件
 * cordova plugin add cordova-plugin-x-toast
 * @param {String} title 
 * @param {Number} during  //待完善
 * @param {String} position //待完善
 * @example  hybridApi.showToast("提示信息")
 */

export default function(obj){
    let content=obj.content;
   let success=obj.success;
    console.log("封装的里面被调用了");
    setTimeout(() => {
        success()
    }, 4000);
    
 
}