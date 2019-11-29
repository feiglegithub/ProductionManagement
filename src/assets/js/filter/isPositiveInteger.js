    
/**
 * 
 * @scrip 用于判断數字是否为正整数
 * @param {Number}  num:待判断的數字 
 * @return {Boolean} 'true/false'
 * @example isPositiveInteger(56.4)
 * @author 曾德銘
 */
export default function isPositiveInteger(num){//是否为正整数
    var re = /^[0-9]+$/ ;
    return re.test(num)
}   