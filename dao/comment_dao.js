const db = require('./db');

/**
 * add comment
 * @param {*} commentObj 
 * @param {*} ctime 
 */
async function add(commentObj) {
    const sql = "insert into comments ( blog_id,parent,user_name,comments,email,utime,replyInfo) " +
        "values (?, ?, ?, ?, ?, ?, ?)";
    const values = [commentObj.blog_id, commentObj.parent, commentObj.user_name, commentObj.comments,
    commentObj.email, commentObj.utime , commentObj.reply_info];
    const result = await db.query(sql, values);
    return { insertId: result[0].insertId }
}

/**
 * query  comments
 * @param {*} blog_id 
 */
async function queryList(blog_id) {
    const sql = `select * from comments where blog_id =? and parent = -1  order by id desc `;
    const result = await db.query(sql, [blog_id]);

    let parentId = [];
    for(item of result[0]){
        parentId.push(item.id);
        item.child = [];
    }
    // 子回复
    if(parentId.length !== 0){
        const childList = await queryChildList(parentId);
        for(item of result[0]){
            for(cItem of JSON.parse(childList)){
                if(cItem.parent == item.id){
                    item.child.push(cItem);
                } 
            }
        }
    }
    return result[0] // JSON.stringify(result[0]);
}

/**
 *The child comments
 * @param {*} blog_parentId 
 */
async function queryChildList(blog_parentId) {
    const sql = `select * from comments where parent in (?)  order by id asc `;
    const result = await db.query(sql, [blog_parentId])
    return JSON.stringify(result[0]);
}


/**
 * query count
 */
async function count(blog_id) {
    const sql = `select count(id) as count from comments where blog_id = ?`
    const result = await db.query(sql, [blog_id]);
    return JSON.stringify(result[0][0].count);
}
/**
 * query most new comments
 * @param {Number} size 
 */
async function queryLatestCommentsList(size) {
    const sql = `select * from comments order by id desc limit ? `;
    const result = await db.query(sql, [size]);
    return result[0] // JSON.stringify(result[0]);
}

module.exports.add = add;
module.exports.queryList = queryList;
module.exports.count = count;
module.exports.queryLatestCommentsList = queryLatestCommentsList;

/*************************************************************************
 * test function
 * */

async function testAdd() {
    const commentObj = {
        blog_id: 20, parent: -1, user_name: '崔莺莺', comments: '沙发', email: 'wanig@sss.xom', utime: 123
    }
    const result = await add(commentObj);
    console.log(result);
}

async function testQueryAll() {
    const result = await queryList(-1);
    console.log(JSON.parse(result));
}
// testQueryAll();
