import ctx_http_info from './ctx_http_info';
import ctx_stoken from './ctx_stoken';

import {
    ctx_csrf, ctx_assert_csrf
} from './ctx_csrf';


export default function index(app) {
    app.use(async(ctx, next) => {
        ctx_http_info(ctx);
        ctx_csrf(ctx);
        ctx_assert_csrf(ctx);

        await next();
    });
    app.use(ctx_stoken);
}
