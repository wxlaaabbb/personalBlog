const { pathToRegexp } = require("path-to-regexp");
const jwt = require('./jwt');
const fCode = require("../util/formatResult");

//需要token的路径
const needTokenApi = [
    { method: "POST", path: "/api/upload" },
    { method: "put", path: "/api/blog" },
    { method: "POST", path: "/api/blog" },
    { method: "PUT", path: "/api/everyDay" },
    { method: "GET", path: "/api/admin/whoami" },
];

module.exports = (req, res, next) => {
    // console.log( req.method, req.path)
    //排除不需要验证的
    const apis = needTokenApi.filter((api) => {
        const reg = pathToRegexp(api.path);
        const m = api.method === req.method
        const p = reg.test(req.path);
        // console.log(m,p);
        return m && p
    })
    if (apis.length === 0) {
        next();
        return;
    }
    
    const result = jwt.verify(req);
    console.log( result);
    if (result) {
        //认证通过
        req.userId = result.id; // whoami中可用到
        next();
    } else {
        //认证失败
        handleNonToken(req, res, next);
    }

}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handleNonToken(req, res, next) {
    // res.status(403).send(getErr('you dont have any token to access the api', 403));
    res.send(fCode('2', '没有登录'));
}