var moment = require('moment');
var tokens = require('csrf')();
export function ctx_csrf(ctx){
    var _csrf;
    Object.defineProperty(ctx, 'csrf', {
        get:()=>{
            if(!_csrf){
                _csrf=tokens.create(moment().format('YYYY-MM-DD HH:00:00'));
            }
            return _csrf;
        }
    });
}
export function ctx_assert_csrf(ctx){
    //TODO 修改掉下面这一行
    return true;
    if (ctx.method === 'GET' || ctx.method === 'HEAD' || ctx.method === 'OPTIONS') {
         return true;
    }
    var token = (ctx.request.body && ctx.request.body._csrf)
             || (ctx.query && ctx.query._csrf)
             || (ctx.get('x-csrf-token'))
             || (ctx.get('x-xsrf-token'));
    if (!token) ctx.throw(403, 'token is missing');
    var now=moment();
    var verified=false;
    for(var i=0;i<3;i++){
        verified=tokens.verify(now.format('YYYY-MM-DD HH:00:00'), token);
        if(verified){
            break;
        }
    }
    if(!verified){
        ctx.throw(403, 'invalid csrf token');
    }
    return true;
}
