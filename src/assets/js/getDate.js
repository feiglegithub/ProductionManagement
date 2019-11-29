export default function(mydate){
    let TDate= mydate.getFullYear() + "-" +((mydate.getMonth())+1)  + "-" + mydate.getDate()+ ' '+ mydate.getHours() + ":" + mydate.getMinutes()+ ":" + mydate.getSeconds();
    return TDate
}