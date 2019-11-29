/**
@param maxNum Float 默认9 
@return Array ['url1','url2']
 */
var params = {
    "isCompression" : 1200, //1200表示：宽不能超过1200像数，长度会自动根据原来的图片比例计算；0表示默认5000。
    "isServerPath" : 0,  //1 返回服务器路径  ； 0返回本地路径(返数组) ;不传默认为1
    "saveToAlbum" : 0,  //保存到相册  0:不保存, 1:保存
    "selectNums" : 9, //每次最多可选多少张图片, 1-9之间有效
    "titles":
    [
     {
     "text":"",
     //"point":"{20,20}", //位置, 默认{0,0}
     "x":20,
     "y":20,
     "font":18,  //默认14
     "bold":1, //默认为0, 不加粗
     "color":"#333333", //默认为白色
     "align":2, //文字对齐, 0:左对齐, 1:右对齐, 2:居中对齐, 3:两端对齐
     "alpha":0, //透明度,0-1, 默认1
     "position":0,//坐标原点, 0:左上角, 1:右上角, 2:右下角, 3左下角
     "centerX":1, //x坐标, 0:不居中, 1:居中, 优先于position
     "centerY":0, //y坐标, 0:不居中, 1:居中, 优先于position
     },
     
     {
     "text":"",
     //"point":"{0,60}", //位置, 默认{0,0}
     "x":0,
     "y":60,
     "font":16,  //默认14
     "alpha":0, //透明度,0-1, 默认1
     "centerX":1, //x坐标, 0:不居中, 1:居中, 优先于position
     },
     {
     "text":"",
     //"point":"{20,10}", //位置, 默认{0,0}
     "x":20,
     "y":10,
     "align":1, //文字对齐, 0:左对齐, 1:右对齐, 2:居中对齐, 3:两端对齐
     "alpha":0.2, //透明度,0-1, 默认1
     "position":2,//坐标原点, 0:左上角, 1:右上角, 2:右下角, 3左下角
     },
     ],
     
     
     "images":
     [
      {
      //"rect":"{{20,100},{100,100}}", //位置&尺寸
      "x":20,
      "y":100,
      "w":100,
      "h":100,
      "url":"", //图片地址
      //"alpha":0.1, //透明度,0-1, 默认1
      "position":0,//坐标原点, 0:左上角, 1:右上角, 2:右下角, 3左下角
      "centerX":1, //x坐标, 0:不居中, 1:居中, 优先于position
      "centerY":0, //y坐标, 0:不居中, 1:居中, 优先于position
      },
      {
      "type":"AppIcon", //暂时只支持AppIcon, 可按需求添加, App图标, 不使用url时的本地图片
      //"rect":"{{20,40},{120,120}}", //位置&尺寸
      "position":2,//坐标原点, 0:左上角, 1:右上角, 2:右下角, 3左下角
      "x":0,
      "y":40,
      "w":0,
      "h":0,
      "alpha":0, //透明度,0-1, 默认1
      },
      ],
};
export default function(obj){
    var u = navigator.userAgent;
    let _maxNum=obj.maxNum||9;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid){//安卓的接口
        
        let _success=obj.success;   
        cordova.exec(blockSelectPhoto, function (e) {
            alert("Error: " + e);
        }, "Camera", "selectPhotoWidthConfig", [{maxNum:_maxNum,showCamera:true}]);
        function blockSelectPhoto(result) {
            console.log("相册多选返回的数据",result)
            if (result) {
                // for (var i = 0; i < result.images.length; i++) {
                //     alert('第'+i+'个'+result.images[i]);
                // }
                     
          _success(result.images); //把所选的文件值写入全局
            }
        }

    }else{//ios的接口
    let _success=obj.success;   
    params.selectNums=_maxNum;
    cordova.exec(blockSelectPhoto, function (e) {
        alert("Error: " + e);
    }, "Photo", "start2", [params]);
    function blockSelectPhoto(result) {
        console.log("相册多选返回的数据",result.length)
        if (result) {
            // for (var i = 0; i < result.images.length; i++) {
            //     alert('第'+i+'个'+result.images[i]);
            // }
                 
      _success(result); //把所选的文件值写入全局
        }
        
    }
}
}