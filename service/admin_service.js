
const admin_dao = require('../dao/admin_dao');

async function login(loginName, password ) {
    const result = await admin_dao.login(loginName, password);
    return result;
}
async function getAdminById(id) {
    const result = await admin_dao.getAdminById(id);
    return result;
}
module.exports.login = login;
module.exports.getAdminById = getAdminById;