const db = require('./db');

async function addTag(tag , ctime) {
    const sql = "insert into tags( tag,ctime ) values(?,?)";
    const values = [tag, ctime];
    const result = await db.query(sql, values);
    // console.log(result[0].insertId);
    return  {insertId:result[0].insertId}
}
async function queryAll(){
    const sql = "select id,tag from tags ";
    const result = await db.query(sql);
    return result[0] // JSON.stringify( result[0]);
}
async function queryId(id){
    const sql = "select * from tags where id = ? ";
    const result = await db.query(sql, [id]);
    return  result[0];
}
async function queryTag(tag){
    const sql = "select * from tags where tag = ? ";
    const result = await db.query(sql, [tag]);
    return  result[0] // JSON.stringify( result[0]);
}

async function add_Tag_Blog_Mapping(tag_id, blog_id, ctime) {
    const sql = "insert into tag_blog_mapping( tag_id, blog_id, ctime ) values(?, ?, ?)";
    const values = [tag_id, blog_id, ctime];
    const result = await db.query(sql, values);
    // console.log(result[0].insertId);
    return  {insertId:result[0].insertId}
}

async function query_Tag_Mapping(id){
    const sql = "select * from tag_blog_mapping where tag_id = ? ";
    const result = await db.query(sql, [id]);
    return result[0] // JSON.stringify( result[0]);
}

async function query_Blog_Mapping(id){
    const sql = "select * from tag_blog_mapping where blog_id = ? ";
    const result = await db.query(sql, [id]);
    return JSON.stringify( result[0][0]);
}

module.exports.addTag = addTag;
module.exports.queryAll = queryAll;
module.exports.queryId = queryId;
module.exports.queryTag = queryTag;
module.exports.add_Tag_Blog_Mapping = add_Tag_Blog_Mapping;
module.exports.query_Blog_Mapping = query_Blog_Mapping;
module.exports.query_Tag_Mapping = query_Tag_Mapping;

// const r =  add('The second form .query(sqlString, values, callback) comes when using placeholder values (see escaping query values):');
// r.then(resp=>{
//     console.log(resp);
// })

// connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results.insertId);
//   });

// async function test(id) {
//     // 创建一个数据库连接
//     const sql = `select * from employee where \`name\` like concat('%', ?, '%') ;`;
//     const [results] = await pool.execute(sql, [id]);
//     console.log(results);
//   }
//   test("袁");