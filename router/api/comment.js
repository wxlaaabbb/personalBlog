const express = require('express');
const fCode = require("../../util/formatResult");
const TimeUtile = require('../../util/TimeUtile');
const comment_service = require('../../service/comment_service');
const router = express.Router();

router.get('/', async function (req, res) {
    const bid = req.query.bid;
    const result = await comment_service.queryList( bid );
    const count = await comment_service.count(bid);
    const r ={ 
        count:count,
        data:result
    }
    res.send( fCode(0,'',r) )
})
/**The latest comments*/
router.get('/latestComments', async function (req, res) {
    const size = req.query.size;
    if(size === 'undefined' || !size){
        res.send( fCode('3','参数错误',size) );
    }else{
        const result = await comment_service.queryLatestCommentsList( +size );
        res.send( fCode(0,'',result) );
    }

})

/** add a comment */
router.put('/', async function (req, res) {

    const commentObj = req.body;
    // console.log('commentObj',commentObj);
    commentObj['utime'] = +TimeUtile.getNow();
    const result = await comment_service.add( commentObj);
    res.send( fCode(0,'发表成功',result) );
});

module.exports = router