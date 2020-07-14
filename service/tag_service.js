const Tab_dao = require('../dao/Tag_dao');
const { getNow } = require('../util/TimeUtile')


/**
 * add tag
 * @param {*} tag 
 */
async function addTag(tag) {
    const result = await Tab_dao.addTag(tag, getNow());
    return result;
}
/**
 * query all Tag
 */
async function queryAll() {
    const result = await Tab_dao.queryAll();
    return result //JSON.stringify(result);
}
/**
 * add tag blog mapping
 * @param {*} tag_id 
 * @param {*} blog_id 
 */
async function add_Tag_Blog_Mapping(tag_id, blog_id) {
    const result = await Tab_dao.add_Tag_Blog_Mapping(tag_id, blog_id, getNow());
    return result;
}
/**
 * query a tag mapping 
 * @param {*} id 
 */
async function query_Tag_Mapping(id) {
    const result = await Tab_dao.query_Tag_Mapping(id);
    return result;
}
/**
 * query a blog mapping 
 * @param {*} id 
 */
async function query_Blog_Mapping(id) {
    const result = await Tab_dao.query_Blog_Mapping(id);
    return result;
}
/**
 * split tags save
 * @param {String} tags 
 */
async function tagsSplitSave(tags, blogId) {
    const tagsStr = tags.replace(/ /g, "").replace("，", ",");
    var tagList = tagsStr.split(",");
    for (var i = 0; i < tagList.length; i++) {
        if (tagList[i] == "") {
            continue;
        }
        saveTagMapping(tagList[i], blogId);
    }
}
/**
 * query Tag
 * @param {String} tag 
 */
async function queryTag(tag) {
    const result = await Tab_dao.queryTag(tag);
    return result;
}
async function queryId(id) {
    const result = await Tab_dao.queryId(id);
    return result;
}
/**
 * save mapping
 * @param {String} tag 
 * @param {Number} blogId 
 */
async function saveTagMapping(tag, blogId) {
    const result = await queryTag(tag);
    let tagId = null;
    //保存标签
    if (result.length == 0) {
        const obj = await addTag(tag);
        tagId = obj.insertId;
    }else{
        tagId =result[0].id ;
    }
    //保存映射
    add_Tag_Blog_Mapping(tagId , blogId);

}
/**
 * return array bid
 * @param { tid: Array, content: String } arg 
 */
async function getBlogIdMapping(arg) {
    let argObj = {};
    if(arg && arg.tid){
        const result = await query_Tag_Mapping(arg.tid);
        // console.log('result', result)
        argObj['bids'] = result.map(item=>{
            return item.blog_id;
        })
        return Object.assign({},arg, argObj );
    }else{
        return arg;
    } 
}
module.exports.addTag = addTag;
module.exports.queryId = queryId;
module.exports.queryAll = queryAll;
module.exports.add_Tag_Blog_Mapping = add_Tag_Blog_Mapping;
module.exports.query_Tag_Mapping = query_Tag_Mapping;
module.exports.query_Blog_Mapping = query_Blog_Mapping;
module.exports.tagsSplitSave = tagsSplitSave;
module.exports.getBlogIdMapping = getBlogIdMapping;


/**
 * test function ==================================================================
 */
// testTagsSplitSave();
async function testTagsSplitSave() {
    const result = await tagsSplitSave('test,test2.js,哈哈,nini' , 18);
    console.log('testTagsSplitSave', result);
}
async function testAddTag() {
    const p = 'vue.js'
    const result = await addTag(p);
    console.log('testaddTag', result);
}
async function testQueryAll() {
    const result = await queryAll();
    console.log('testQueryAll', result);
}
async function testAdd_Tag_Blog_Mapping() {
    const result = await add_Tag_Blog_Mapping(1, 21);
    console.log('testAdd_Tag_Blog_Mapping', result);
}
async function testQuery_Tag_Mapping() {
    const result = await query_Tag_Mapping(1);
    console.log('testQueryAll', result);
}
async function testQuery_Blog_Mapping() {
    const result = await query_Blog_Mapping(2);
    console.log('testQueryAll', result);
}
// testQuery_Tag_Mapping();