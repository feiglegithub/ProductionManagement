/**
 
 */

export default function(obj){
    cordova.exec(function (msg) {
        alert(msg);
    }, function (e) {
        alert("Error: " + e);
    }, "Activity", "closeApp", [""]);

}