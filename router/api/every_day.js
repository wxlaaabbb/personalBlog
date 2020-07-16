const express = require('express');
const fCode = require("../../util/formatResult");

const {addEveryDay, getLastEveryDay} = require('../../service/every_day_Service');
const router = express.Router()

router.get('/', async function (req, res) {
    const result = await getLastEveryDay();
    res.send( fCode('0','查询成功',result) )
})

router.put('/', async function (req, res) {
    const content = req.body.content;
    const result = await addEveryDay( content);
    res.send( fCode('0','添加成功',result) )
})

module.exports = router