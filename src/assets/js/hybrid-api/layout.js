/**
 *@description 相册选择图片返回本地路径
* @param {Object} 传入参数:{
*	filePaths : [ 本地路径1,本地路径2,本地路径3...无限],
*	callProgress : "uploadProgress" // 上传进度回调方法 function uploadProgress(e) { //e 会回调一个%数 }
*}@return  {Array} [
*
 * @example  this.$hybridApi.chooseImageAlbum(s)
 */
export default function(statusBarcolor){
   
    return new Promise(function(resolve, reject){
        var params = {
            "title": "布局设置", //标题
            "centerTitle": true, //是否局中 #IOS无效 只能居中不用设置
            "showToolbar": false, //顶部导航条
            "showMenu": false, //菜单按钮键
            "showTabbar": false, //底部导航条
            "showStatusbar": true, //最顶电池条  #IOS无效
            "tabTextColor": statusBarcolor, //底部导航条文字颜色
            "tabSelectedColor": statusBarcolor,//底部导航条选择后文字颜色
            "tabBarColor": "FF000000", //底部导航条背景颜色
            "statusBarColor": statusBarcolor, //电池条颜色 #IOS无效
            "toolbarColor": statusBarcolor, //顶部导航条颜色
            "progressBarColor": statusBarcolor, //进度条颜色 #IOS无效 无进度条
            "titleColor": statusBarcolor, //标题颜色
            "menuTextSize": 26, //菜单字体大小 #IOS无效
            "menuTextColor": statusBarcolor, //菜单条颜色 #IOS默认黑色背景，白色文字
            "showRefreshMenu": false, //菜单显示刷新按钮
            "showCopyLink": false, //是否显示复制链接菜单项
            "showOpenWith":false, //是否显示用浏览器打开菜单项
            "showShareMenu": false, // 是否显示分享菜单
            "webViewSupportZoom": false, // 是否支持放大缩小 #IOS无效
            "tabPosition": 0, //菜单条位置 #IOS无效
            "injectScript": "", //js注入
            "onClosePage": "", //设置后，将会执行该JS方法 但是左上角后能功能禁用
            // "menus": [{
            //     "id": 2001,
            //     "title": "查找",
            //     "icon": "0.png",
            //     "disableIcon": "1.png",
            //     "callback": "alert('您点击了菜单--查找')",
            //     "visible": true,
            //     "checkable": false,
            //     "checked": false,
            //     "enabled": true,
            //     "showAsAction": 2
            // }, {
            //     "id": 2002,
            //     "title": "保存",
            //     "icon": "0.png",
            //     "disableIcon": "1.png",
            //     "callback": "alert('您点击了菜单--保存')",
            //     "visible": true,
            //     "checkable": false,
            //     "checked": false,
            //     "enabled": true,
            //     "showAsAction": 1
            // }, {
            //     "id": 2003,
            //     "title": "提交",
            //     "icon": "0.png",
            //     "disableIcon": "1.png",
            //     "callback": "alert('您点击了菜单--保存')",
            //     "visible": true,
            //     "checkable": false,
            //     "checked": false,
            //     "enabled": true,
            //     "showAsAction": 1
            // }, {
            //     "id": 2004,
            //     "title": "删除",
            //     "icon": "0.png",
            //     "disableIcon": "1.png",
            //     "callback": "alert('您点击了菜单--保存')",
            //     "visible": true,
            //     "checkable": false,
            //     "checked": false,
            //     "enabled": true,
            //     "showAsAction": 1
            // }],
            // "tabs": [{
            //     "id": 2005,
            //     "title": "首页",
            //     "callback": "alert('首页被选中');",
            //     "icon": "3.png",
            //     "selectIcon": "3.png",
            //     "remindCount": 1,
            //     "selected": true
            // }, {
            //     "id": 2006,
            //     "title": "产品分类",
            //     "callback": "alert('产品分类');",
            //     "icon": "3.png",
            //     "selectIcon": "3.png",
            //     "remindCount": 0,
            //     "selected": false
            // }, {
            //     "id": 2007,
            //     "title": "购物车",
            //     "callback": "alert('购物车');",
            //     "icon": "3.png",
            //     "selectIcon": "3.png",
            //     "remindCount": 0,
            //     "selected": false
            // }, {
            //     "id": 2008,
            //     "title": "我的",
            //     "icon": "3.png",
            //     "selectIcon": "3.png",
            //     "remindCount": 0,
            //     "selected": false
            // }],
            "params": [{
                "key": "aaaa",
                "value": "1111"
            }, {
                "key": "bbbb",
                "value": "2222"
            }]
        };

        cordova.exec(function (msg) {
            //alert(msg);
        }, function (e) {
            alert("Error: " + e);
        }, "Layout", "initLayout", [params]);

})
}