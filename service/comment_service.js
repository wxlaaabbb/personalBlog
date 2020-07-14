const comment_dao = require('../dao/comment_dao');
const { getNow, formatDateTime } = require('../util/TimeUtile')

/**
 * add blog
 * @param {*} commentObj 
 * @param {*} ctime 
 */
async function add(commentObj) {
    commentObj.utime = getNow();
    const result = await comment_dao.add(commentObj);
    return result;
}
/**
 * query comments
 * @param {*} bid
 */
async function queryList(bid) {
    const result = await comment_dao.queryList(bid);
    const r = result.map(item=>{
        item.utime = formatDateTime(item.utime * 1000 );
        item.child = item.child.map(it=>{
            it.utime = formatDateTime(it.utime * 1000 );
            return it;
        })
        return item;
    })
    return r ;//JSON.stringify(r);
}
/**
 * query count
 * @param {Number} bid
 */
async function count(bid) {
    const result = await comment_dao.count(bid);
    return result; //JSON.stringify(result);
}
/**
 * query latest comments
 * @param {Number} size 
 */
async function queryLatestCommentsList(size) {
    const result = await comment_dao.queryLatestCommentsList(size);
    const r = result.map(item=>{
        item.utime = formatDateTime(item.utime * 1000 );
        return item;
    })
    return r; //JSON.stringify(result);
}

module.exports.add= add;
module.exports.queryList = queryList;
module.exports.count = count;
module.exports.queryLatestCommentsList = queryLatestCommentsList;