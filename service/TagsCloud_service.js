const Tab_dao = require('../dao/Tag_dao');
/**
 * query all Tag and random sort
 */
async function queryTagAll() {
    const result = await Tab_dao.queryAll();
    const f = JSON.parse( JSON.stringify(result));
    // console.log('rr',f.sort(function(){
    //     return Math.random() - 0.5
    // }));
    f.sort(function(){
        return Math.random() - 0.5
    });
    return JSON.stringify(f);
}


module.exports.queryTagAll = queryTagAll;
