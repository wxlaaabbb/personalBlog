const db = require('./db');

async function add(content , ctime) {
    const sql = "insert into every_day( content,ctime ) values(?,?)";
    const values = [content, ctime];
    const result = await db.query(sql, values);
    // console.log(result[0].insertId);
    return  {insertId:result[0].insertId}
}

async function get(){
    const sql = "select * from every_day order by id desc limit 1  ";
    const result = await db.query(sql);
    return JSON.stringify( result[0][0]);
}

module.exports.add = add;
module.exports.get = get;







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