/**
 * 数值计算
 * 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * math.add(0.1, 0.2) >> 0.3
 * math.multiply(19.9, 100) >> 1990
 * 
 */


/**
 * 判断是否为一个整数
 * @param {object} obj 字符串
 * @return {boolean} true/false
 */
export function isInteger(obj) {
    return Math.floor(obj) === obj;
}

/**
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param {object} floatNum 小数
 * @return {object} {times:100, num: 314}
 */
export function toInteger(floatNum) {
    var ret = { times: 1, num: 0 }
    var isNegative = floatNum < 0
    if (isInteger(floatNum)) {
        ret.num = floatNum
        return ret
    }
    var strfi = floatNum + ''
    var dotPos = strfi.indexOf('.')
    var len = strfi.substr(dotPos + 1).length
    var times = Math.pow(10, len)
    var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
    ret.times = times
    if (isNegative) {
        intNum = -intNum
    }
    ret.num = intNum
    return ret
}

/**
 * 浮点型数字运算精度丢失修复
 * @param {object} num 小数
 * @param {number} s 小数位数
 * @return {object} s位小数
 */
export function toFixed(num, s) {
    var times = Math.pow(10, s);
    var des = num * times + 0.5;
    des = (parseInt(des, 10) / times) + '';

    var pos_decimal = des.indexOf('.');
    if (pos_decimal > 0) {
        while (des.length <= pos_decimal + s) {
            des += '0';
        }
    }

    return des;
}

/**
 * 浮点型数字运算精度丢失修复
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param dig {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 * @return {object} dig位小数
 */
function operation(a, b, dig, op) {
    var o1 = toInteger(a)
    var o2 = toInteger(b)
    var n1 = o1.num
    var n2 = o2.num
    var t1 = o1.times
    var t2 = o2.times
    var max = t1 > t2 ? t1 : t2
    var result = null
    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return toFixed(result / max, dig)
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return toFixed(result / max, dig)
        case 'multiply':
            result = (n1 * n2) / (t1 * t2)
            return toFixed(result, dig)
        case 'divide':
            if (n2 === 0)
                result = 0
            else
                result = (n1 / n2) * (t2 / t1)
            return toFixed(result, dig)
    }
}

/**
 * 加法
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @return {object} s位小数
 */
export function add(a, b, s) {
    return operation(a, b, (s | 2), 'add')
}

/**
 * 减法
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @return {object} s位小数
 */
export function subtract(a, b, s) {
    return operation(a, b, (s | 2), 'subtract')
}

/**
 * 乘法
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @return {object} s位小数
 */
export function multiply(a, b, s) {
    return operation(a, b, (s | 2), 'multiply')
}

/**
 * 除法
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @return {object} s位小数
 */
export function divide(a, b, s) {
    return operation(a, b, (s | 2), 'divide')
}