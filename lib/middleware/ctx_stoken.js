import session from '../ext/koa-generic-session';
import redisStore from '../ext/koa-redis';
var redis = redisStore({});

var sess = session({
    store: redis,
    ttl: 2 * 60 * 60 * 1000  //2个小时
});

export default sess;
