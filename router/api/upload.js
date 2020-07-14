var express = require('express')
var multer = require('multer')
const path = require('path')
const Jimp = require('jimp');

const pp = path.resolve(__dirname, '../../dist/uploads/');
// console.log(pp)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pp)
    },
    filename: function (req, file, cb) {
        // 时间戳-6位随机字符.文件后缀
        const timeStamp = Date.now();
        const ramdomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        cb(null, `${timeStamp}-${ramdomStr}${ext}`)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        //验证文件后缀名
        const extname = path.extname(file.originalname);
        const whitelist = [".jpg", ".gif", ".png"];
        // console.log('extname',extname)
        if (whitelist.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error(`your ext name of ${extname} is not support`));
        }
    }
});

const router = express.Router();


router.post('/', upload.single('img'), async (req, res, next) => {
    // console.log('aaaaaaaaaaaa',req.file)
    const url = `/uploads/${req.file.filename}`;
    // 加水印
    const newPath = path.resolve(
        __dirname,
        "../../dist/uploads",
        req.file.filename
    );
    const waterPath = path.resolve(__dirname, '../../dist/uploads/water.png')
    await mark(waterPath, req.file.path, newPath);
    res.send({
        code: 0,
        msg: '',
        data: url
    })
})

module.exports = router;








// 给一张图片加水印
async function mark(
    waterFile,
    originFile,
    targetFile,
    proportion = 5,
    marginProportion = 0.01
) {
    const [water, origin] = await Promise.all([
        Jimp.read(waterFile),
        Jimp.read(originFile),
    ]);

    // 对水印图片进行缩放
    const curProportion = origin.bitmap.width / water.bitmap.width;
    water.scale(curProportion / proportion);

    // 计算位置
    const right = origin.bitmap.width * marginProportion;
    const bottom = origin.bitmap.height * marginProportion;
    const x = origin.bitmap.width - right - water.bitmap.width;
    const y = origin.bitmap.height - bottom - water.bitmap.height;

    // 写入水印
    origin.composite(water, x, y, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.3,
    });

    await origin.write(targetFile);
}
