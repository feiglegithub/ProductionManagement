/**
 *@description 接收主平台登录后传过来的用户数据
 * @param {Object} 传入参数:{
*	show :true,//boollen控制是否显示头部导航
*	title : "标题" //标题
*}
 *@return  {Object} 
  *{
  *}
*
 * @example  this.$hybridApi.configHeader({show:true,title:"标题"})
 */
export default function(oparam){
    let _this=this;
    this.show=oparam.show||false;
    this.title=oparam.title||"";
    this.statusBarColor=oparam.statusBarColor||"#333333";
    //控制显隐
    cordova.exec(function (msg) {      
    }, function (e) {
        alert("Error: " + e);
    }, "Menu", "showToolbar", [_this.show]
);
    //配置标题
    if(this.title){       
        cordova.exec(function (msg) {            
        }, function (e) {
            alert("Error: " + e);
        }, "Menu", "setTitle", [{title:_this.title,statusBarColor:this.statusBarColor}]);
    }
  

  }