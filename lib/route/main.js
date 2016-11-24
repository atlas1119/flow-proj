var router = require('koa-router')();

import {User,Flow, Node, WorkNode ,TemplateNode} from '../model';
// import _ from 'lodash';

router.get('/', async(ctx, next)=>{
    var sess = ctx.session, flows;
    if(sess && sess.user){
        var {state} = ctx.request.query;
        if(!state || state == 1){
            // flows = await Node.find({flow_state: 0});
            flows = await Flow.find({'create_user_id': sess.user.id});
            // var ids = _.map(nodes, 'flow_id');
            // flows = await Flow.find({"_id":{"$in":ids}});
        }else if(state == 2){
            flows = await Flow.find({flow_state: 0});
        }else if(state == 3){
            flows = await Flow.find({flow_state: 1});
        }

        await ctx.view('index',{state,flows});
    }else{
        ctx.redirect('/login');
    }

});

router.get('/login', async(ctx, next)=>{

    await ctx.view('login',{data:0});
});

router.get('/createtemplate', async(ctx, next)=>{

    await ctx.view('create_template',{});
});

router.get('/logout', async(ctx, next)=>{
    ctx.session = null;
    ctx.redirect('/');
});

router.post('/login', async(ctx, next)=>{
    var data = ctx.request.body;

    var userInfo = await User.findOne({name: data.name}).exec();

    if (!userInfo || (userInfo.password !== data.password)) {
      ctx.body = {error: '用户名或密码错误!'};
    //   return ctx.redirect('back');
      return;
    }

    ctx.session.user = {
      name: userInfo.name,
      id: userInfo._id,
      email: userInfo.email,
      phone: userInfo.phone,
      department: userInfo.department,
      role: userInfo.role
    };

    ctx.body = {error: null};

});

router.post('/createflow', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session){
        data.create_user_id = ctx.session.user.id;
        var flow = await Flow.create(data);
        ctx.body = {success: true};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.get('/getworknodes', async(ctx, next)=>{

    if(ctx.session){
        var nodes = await WorkNode.find({});
        ctx.body = {success:true, nodes:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.get('/gettemplatenodes', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var nodes = await TemplateNode.find({work_node_id:id});
        ctx.body = {success:true, nodes:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.post('/createworknodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session){
        data.create_user_id = ctx.session.user.id;
        var work_node = await WorkNode.create(data);
        ctx.body = {success: true, node:work_node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/createtemplatenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session){
        data.create_user_id = ctx.session.user.id;
        var flow = await TemplateNode.create(data);
        ctx.body = {success: true};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});



export default router;
