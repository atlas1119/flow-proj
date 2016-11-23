import serve from 'koa-static';
import path from 'path';
import nunjucks from 'nunjucks';
import views from 'koa-views';
import mount from 'koa-mount';
import dateFilter from 'nunjucks-date-filter';
import {dev} from './config';
import pagelet from './ext/pagelet';
// import captcha from './middleware/captcha';

let static_main_name = '';
let publicDir = '';

export var request = {path:''};

export var view_path = path.resolve(__dirname, `../dist/static/html`);

if(dev){
    view_path = path.resolve(__dirname, `../static/html`);
    publicDir = `/static`;
} else {
    publicDir = `/dist/static`;
}

var nunjucks_env = nunjucks.configure(view_path, { autoescape: true , watch:true});

// 配置 pagelet
pagelet.configure({
  root: view_path,
  manifest: path.join(view_path, 'manifest.json'),
  cache: true
});

// 注册 Tag 到 nunjucks
pagelet.register(nunjucks_env);
require("./helper/filter").default(nunjucks_env);
require("./helper/tag").default(nunjucks_env);

export default function(app){

    app.use(serve(__dirname+ '/'+ '../dist'));
    app.use(mount('/static/script', serve(__dirname+ '/'+ '../node_modules/jquery/dist')));
    app.use(mount('/static', serve(__dirname+ '/'+ '../static')));

    app.use(views(view_path, {
        extension:'tpl',
        cache:false,
        map: { tpl: 'nunjucks'}
    }));

    app.use(async (ctx, next)=>{
        request = ctx.request;

        ctx.view = async function(tpl, data){
            tpl=tpl+'.tpl';

            var view_context=ctx.__view||{};
            return await ctx.render(tpl, {...view_context, ...data, _csrf:ctx.csrf,session:ctx.session, publicDir});
        };

        await next();
    });
}
