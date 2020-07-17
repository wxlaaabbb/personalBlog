const express = require('express');
const path = require('path');
const app = express();
var session = require('express-session');
var history = require('connect-history-api-fallback');

//Middleware to proxy requests through a specified index page, 
//useful for Single Page Applications that utilise the HTML5 History API  .
app.use(history({
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function(context) {
        return  context.parsedUrl.pathname;
      }
    }
  ]
}));
//session
app.use(session({
    secret: 'keyboard cat',
    name: 'sessionid'
  }));

/**指定静态资源路径 */
// const staticRoot = path.resolve(__dirname, '../dist/');
// app.use(express.static(staticRoot, { index: 'index.html' }));
app.use(express.static("./dist/"));

app.use(express.json());

//验证
app.use(require("./tokenMiddleware"));

/**验证码 */
/** veritficationCode */
app.use('/api',require('./utilMid/verificationCode.js'));

/** 每日一句*/
app.use('/api/everyDay', require('./api/every_day.js'));

/** bolg*/
app.use('/api/blog', require('./api/blog.js'));

/** upload */
app.use('/api/upload', require('./api/upload.js'));

/**comments */
app.use('/api/comment',require('./api/comment.js'));

/**tag */
app.use('/api/tag',require('./api/tag.js'));
/** admin */
app.use('/api/admin',require('./api/admin.js'));



//port
app.listen(8808, function () {
    console.log('listen 8808')
});
