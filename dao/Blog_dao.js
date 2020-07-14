const db = require('./db');

/**
 * add blog
 * @param {*} blogObj 
 * @param {*} ctime 
 */
async function add(blogObj) {
    const sql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`) values (?, ?, ?, ?, ?)";
    const values = [blogObj.title, blogObj.content, blogObj.tags, 0, blogObj.ctime];
    const result = await db.query(sql, values);
    return { insertId: result[0].insertId }
}
/**
 * query blog
 * @param {*} id 
 * @returns json
 */
async function query(id) {
    const sql = "select * from blog where id=?";
    const values = [id]
    const result = await db.query(sql, values);
    return JSON.stringify(result[0][0]);
}
/**
 * query blogList
 * @param {Number} page 
 * @param {Number} pageSize
 * @param {bids: Array, content: Number} arg 
 */
async function queryList(page = 1, pageSize = 10, arg ) {
    let sqlWere = " where 1=1 ";
    const values = [];
    //
    if( arg && arg.bids ){
        sqlWere += `and id in (?)`;
        if( arg.bids.length > 0){
            values.push(arg.bids);
        }else{
            values.push([-1]); // 没有博文
        }
    }
    // 
    if( arg && arg.content ){
        sqlWere += `and content like ?`;
        values.push(`%${arg.content}%`);
    } 
    const sql = `select * from blog ${sqlWere} order by id desc limit ?,?`;
    values.push((page -1) * pageSize);
    values.push(+pageSize);
    const result = await db.query(sql, values);
    return result[0] // JSON.stringify(result[0]);
}
/**
 * query count
   @param {bids: Array, content: String} arg 
 */
async function count(arg) {
    let sqlWere = " where 1=1 ";
    const values = [];
    //
    if( arg && arg.bids ){
        sqlWere += `and id in (?)`;
        if( arg.bids.length > 0){
            values.push(arg.bids);
        }else{
            values.push([-1]); // 没有博文
        }
    }
    // 
    if( arg && arg.content ){
        sqlWere += `and content like ?`;
        values.push(`%${arg.content}%`);
    } 
    const sql = `select count(id) as count from blog ${sqlWere}`
    const result = await db.query(sql, values);
    return JSON.stringify( result[0][0].count);
}


/**
 * update blog
 * @param {*} blogObj 
 * @param {*} ctime 
 */
async function update(blogObj) {
    const sql = "update blog set title=?, content=?, tags=?, utime=? where id = ?";
    const values = [blogObj.title, blogObj.content, blogObj.tags, blogObj.utime, blogObj.id];
    const result = await db.query(sql, values);
    return { insertId: result[0] }
}
/**
 * 
 * @param {Number} id 
 */
async function views(id) {
    const sql = "update blog set views=views+1 where id = ?";
    const result = await db.query(sql, [id]);
    return { insertId: result[0] }
}
/**
 * query hot blog
 * @param {Number} size 
 */
async function queryHotBlog(size) {
    var sql = "select * from blog order by views desc limit ?;";
    const result = await db.query(sql, [size]);
    return result[0];
}


module.exports.add = add;
module.exports.query = query;
module.exports.queryList = queryList;
module.exports.count = count;
module.exports.update = update;
module.exports.views = views;
module.exports.queryHotBlog = queryHotBlog;


/*************************************************************************
 * test function
 */
async function testAdd() {
    const blogObj = {
        title: 'test', content: 'abc', tags: 1, views: 199, ctime: '12312', utime: '12312'
    }
    const result = await add(blogObj);
    console.log(result);
}

async function testQuery() {
    const result = await query(1);
    console.log(result);
}

async function testQueryList() {
    let arg = {
        bids:[1,2,3],
        // content:'欢迎'
    }
    const result = await queryList(1,5,arg);

    console.log(result);
}
async function testUpdate() {
    const blogObj = {
        id: 4, title: 'test3', content: '<p>test3</p>', tags: 1, utime: '33'
    }
    const result = await update(blogObj);
    console.log(result);
}
// testQueryList();

