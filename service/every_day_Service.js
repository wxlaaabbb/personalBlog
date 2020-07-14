const {add , get} = require('../dao/every_day_dao');
const {getNow} = require('../util/TimeUtile')

async function addEveryDay (content){
    const result = await add(content , getNow());
    return result;
}

async function getLastEveryDay(){
    const result = await get();
    return result;
}

module.exports.addEveryDay= addEveryDay;
module.exports.getLastEveryDay = getLastEveryDay;





//一下是 测试代码


async function testGtLastEveryDay(){
    const result = await getLastEveryDay(' 不能转下标非1,2,3这种数字的数组,');
    console.log(result);
}

async function testAddEveryDay(){
    const result = await addEveryDay(' 不能转下标非1,2,3这种数字的数组,');
    console.log(result.insertId);
}
// testGtLastEveryDay();