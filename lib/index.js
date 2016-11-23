'use strict';

import koa from 'koa';

var app = new koa();
app.keys = ['project flow-proj secret'];

app.use(require('koa-bodyparser')());
app.use(require('koa-logger')());

require('./middleware').default(app);

require('./view').default(app);

require('./route').default(app);

export default app;
