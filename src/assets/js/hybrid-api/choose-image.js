/**
 
 */
export default function(obj){
    let _success=obj.success;
    var params = {
        "isCompression": false //默认为true 为开启压缩 ; false不开启压缩
    };

    cordova.exec(blockSelectPhoto, function (e) {
        alert("Error: " + e);
    }, "Camera", "takePhoto", [params]);
    function blockSelectPhoto(result) {
        if (result && result.images) {
       let strSelectPhotoUrl = result.images[0]; //把所选的文件值写入全局       
      _success(strSelectPhotoUrl)
    }
    }

}