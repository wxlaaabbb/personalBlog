const express = require('express');
const fCode = require("../../util/formatResult");
const admin_service = require('../../service/admin_service');
const router = express.Router();
const jwt = require('../jwt');

/** login */
router.post('/login', async function (req, res) {
    const loginName = req.body.loginName;
    const password = req.body.password;
    const result = await admin_service.login(loginName, password);
    if (result) {
        let value = result.id;
        delete result.password;
        // req.session.loginUser = result;
        // res.setHeader({authorization : result.id});
        //登录成功
        jwt.publish(res, undefined, { id: value });
        res.send(fCode('0', '登录成功',result));
    } else {
        res.send(fCode('2', '登录失败'));
    }

})
router.get("/whoami", async function(req, res) {
     const result = await admin_service.getAdminById(req.userId);
     delete result.password;
     res.send(fCode('0', '登录成功',result));
})

// router.post(
//     '/login',
//     asyncHandle( async (req, res , next )=>{
//         const result = await adminServ.login( req.body.loginId, req.body.loginPwd);
//         if( result ){
//             let value = result.id;
//             //1： cookie方式
//             //  登录成功
//             // res.cookie( 'token' , value,{
//             //     path:'/',
//             //     domain:'localhost',
//             //     maxAge:7 * 24 * 3600 * 1000, //毫秒数
//             // });
//             // res.header('authorization',value);

//             // 2： session方式
//             req.session.loginUser = result;

//             //3。jwt方式
//             // jwt.publish(res,undefined,{id:value})
//         }
//         return result;
//     }),
// )
module.exports = router
