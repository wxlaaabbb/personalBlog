const db = require('./db');

async function login(loginName,password) {
    const sql = "select * from admin where admin= ? and password = ?";
    const values = [loginName, password];
    const result = await db.query(sql, values);
    return result[0][0];
}

async function getAdminById(id) {
    const sql = "select * from admin where id= ?";
    const result = await db.query(sql, [id]);
    return result[0][0];
}
module.exports.login = login;
module.exports.getAdminById = getAdminById;