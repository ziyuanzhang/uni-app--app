

const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();  //注意：引入的方式
let bodyParser = require('koa-bodyparser');
const app = new Koa();
const static = require('koa-static');
app.use(bodyParser());

let appVersion = "3.1.1";
//1.0.0  1
//1.0.1  2
//2.0.0  30




router.post('/checkUpdate', function (ctx, next) {
    //console.log("checkUpdate:", JSON.stringify(ctx.request, null, 4))
    console.log("checkUpdate:", JSON.stringify(ctx.request.body, null, 4))
    var currentVersions = ctx.request.body.version.split('.');
    var serverVersions = appVersion.split('.');

    if (serverVersions[0] > currentVersions[0]) {
        // 说明有大版本更新 
        if (ctx.request.body.phoneType == "iOS") {
            ctx.body = {
                isUpdate: true,
                msg: "有较大版本更新\n 1.ios--ios\n2.IOS--IOS",
                openUrl: "https://fir.im/e5jy?release_id=5de9c960b2eb4609ad207d66"
            };
        } else {
            ctx.body = {
                isUpdate: true,
                selfUrl: '/download/__UNI__8B016FC_1205170735.apk',
                msg: "有较大版本更新\n 1.android--android\n2.2222----"
            };
        }
    } else if ((serverVersions[0] == currentVersions[0] && serverVersions[1] > currentVersions[1]) || (serverVersions[0] == currentVersions[0] && serverVersions[1] == currentVersions[1] && serverVersions[2] > currentVersions[2])) {
        // 说明有小版本更新  
        ctx.body = {
            isUpdate: true,
            selfUrl: '/download/__UNI__8B016FC.wgt',
            msg: "有小版本更新\n 1.11\n2.222222----"
        };
    } else {
        ctx.body = {
            isUpdate: false,
            msg: "已经是最新版本"
        }
    }
})
router.get('/', function (ctx, next) {
    ctx.body = "Hello koa";
})

router.get('/news', (ctx, next) => {
    ctx.body = "新闻page"
});

app.use(static(
    path.join(__dirname, 'public')
))
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000, () => {
    console.log('starting at port 3000  http://192.168.1.6:3000/');
});



