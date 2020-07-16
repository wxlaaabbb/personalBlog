const express = require('express');
var svgCaptcha = require('svg-captcha');
const fCode = require("../../util/formatResult");

const router = express.Router();

/**验证 */
function verifitcation(req,res,next){
    const commentObj = req.body;
    const reqCaptcha = commentObj.verificationCode ? commentObj.verificationCode.toLowerCase() : ""; //用户传递的验证码
    console.log(reqCaptcha , req.session.captcha )
    // console.log(req,req.url);
    if(req.url === '/upload'){
        next();
    }else{
        if(req.session.captcha.toLowerCase() !== reqCaptcha){
            res.send( fCode('1','验证码错误') );
        }else{
            req.session.captcha = "poia";
            next();
        }
    } 

}
/** */
router.get('/verificationCode', function (req, res) {
	var captcha = svgCaptcha.create({
        size:4,
        ignoreChars:'0o1iIl',
        noise:2,
        color:true,
    });
	req.session.captcha = captcha.text;
	res.type('svg');
	res.status(200).send(captcha.data);
});

router.post('*',function(req, res , next ){
    verifitcation(req,res,next);
});
router.put('*',function(req, res , next ){
    verifitcation(req,res,next);
});

module.exports = router