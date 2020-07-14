const express = require('express');
const fCode = require("../../util/formatResult");
const blog_service = require('../../service/blog_service');
const tag_service = require('../../service/tag_service');
const router = express.Router()



/**get blog list */
router.get('/', async function (req, res) {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const arg = JSON.parse(req.query.arg);  // {tid: ,content: }
    // console.log('blog',arg);
    const result = await blog_service.queryList( page , pageSize, arg );
    // const count = await blog_service.count(arg);
    // const r ={ 
    //     count:count,
    //     data:result
    // }
    res.send( fCode('0','',result) )
})
/** get hot blogs */
router.get('/hot', async function (req, res) {
    // console.log(" get a blog",req.params)
    const size = req.query.size;
    if(size === 'undefined' || !size){
        res.send( fCode('3','参数错误',size) );
    }else{
        const result = await blog_service.queryHotBlog(+size);
        res.send( fCode('0','',result) )
    }

})
/** get a blog */
router.get('/:id', async function (req, res) {
    const id = req.params.id;
    const result = await blog_service.query(id);
    // result.map(item =>{
    //     item['url'] = '/blog/'+result.id;
    //     return  item;
    // })
    blog_service.views(id);
    res.send( fCode('0','',result) )
})
/** add a bolg */
router.put('/', async function (req, res) {
    const blogObj = req.body;
    const result = await blog_service.add( blogObj);
    tag_service.tagsSplitSave(blogObj.tags, result.insertId);
    res.send( fCode('0','文章发表成功',result) );
})
/** edit a bolg */
router.post('/', async function (req, res) {
    const blogObj = req.body;
    const result = await blog_service.update( blogObj );
    res.send( fCode('0','',result) );
})

module.exports = router