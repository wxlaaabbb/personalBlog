const express = require('express');
const fCode = require("../../util/formatResult");

const {queryTagAll} = require('../../service/TagsCloud_service');
const {queryAll}= require('../../service/tag_service');
const router = express.Router();

router.get('/', async function (req, res) {
    const result = await queryTagAll();
    res.send( fCode('0','查询成功',result) )
})
router.get('/all', async function (req, res) {
    const result = await queryAll();
    res.send( fCode('0','查询成功',result) )
})
module.exports = router