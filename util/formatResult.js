

/**
 * 返回统一的格式
 * @param {*} code 
 * @param {*} msg 
 * @param {*} result 
 */
function fCode(code, msg , result){
    return     {
        code:code,
        msg:msg,
        data:result
    }
}

module.exports = fCode;