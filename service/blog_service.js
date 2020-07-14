const Blog_dao = require('../dao/Blog_dao');
const tag_service = require('./tag_service');
const TagsCloud_service = require('./TagsCloud_service');
const { getNow, formatDateTime } = require('../util/TimeUtile')

/**
 * add blog
 * @param {*} blogObj 
 * @param {*} ctime 
 */
async function add(blogObj) {
    blogObj.ctime = getNow();
    blogObj.tags =  blogObj.tags.replace(/ /g, "").replace("，", ",");
    const result = await Blog_dao.add(blogObj);
    return result;
}
/**
 * query blog
 * @param {*} id 
 * @returns json
 */
async function query(id) {
    const result = await Blog_dao.query(id);
    const r = JSON.parse(result);
    r.ctime = formatDateTime(r.ctime * 1000 );
    return JSON.stringify(r);
}
/**
 * query blogList
 * @param {Number} page 
 * @param {Number} pageSize 
 * @param { tid: Array, content: String } arg 
 */
async function queryList(page, pageSize, arg ) {
    const t = await tag_service.getBlogIdMapping(arg);
    const result = await Blog_dao.queryList(page,pageSize, t);
    const co = await count(t);
    const removeImg = result.map(item=>{
        item.content = item.content.replace(/<img[\w\W]*>/,'');//
        item.ctime = formatDateTime(item.ctime * 1000 );
        if(item.content.length >= 300){
            item.content = item.content.substring(0 , 260) + '......';
        }
        return item;
    })
    const r ={ 
        count:co,
        data:removeImg
    }
    // console.log('queryList',removeImg)
    return r // JSON.stringify(removeImg);
}
/**
 * query count
 * @param {bids: Array, content: Number} arg 
 */
async function count(arg) {
    const result = await Blog_dao.count(arg);
    return result //JSON.stringify(result);
}
/**
 * update blog
 * @param {*} blogObj 
 * @param {*} ctime 
 */
async function update(blogObj) {
    blogObj.utime = getNow();
    const result = await Blog_dao.update(blogObj);
    return result;
}
/**
 * views 增加浏览次数
 * @param {Number} id 
 */
async function views(id) {
    const result = await Blog_dao.views(id);
    return result;
}
/**
 * query hot blog
 * @param {Number} size  
 */
async function queryHotBlog(size) {
    const result = await Blog_dao.queryHotBlog(size);
    return JSON.stringify(result);
}
module.exports.add = add;
module.exports.query = query;
module.exports.queryList = queryList;
module.exports.count = count;
module.exports.update = update;
module.exports.views = views;
module.exports.queryHotBlog = queryHotBlog;

/**
 * test function
 */
// testAdd();
// async function testAdd() {
//     const blogObj = {
//         title: 'server test', content: 'rtyuilvbnm,ghjk', tags: 1
//     }
//     const result = await add(blogObj);
//     console.log('testAdd',result);
// }

// async function testQuery() {
//     const result = await query(100);
//     console.log(result);
// }

// async function testQueryList() {
//     const result = await queryList();
//     console.log(result);
// }
// async function testUpdate() {
//     const blogObj = {
//         id: 70, title: 'test3', content: '<p>test3</p>', tags: 1, utime: '33'
//     }
//     const result = await update(blogObj);
//     console.log(result);
// }
// testUpdate();