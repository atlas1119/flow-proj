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

    await ctx.view('login',{});
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

//-------------------------------- 流程页面 ---------------------------//

router.get('/getworknodes', async(ctx, next)=>{
    if(ctx.session){
        var nodes = await WorkNode.find({});
        ctx.body = {success:true, nodes:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.get('/getworknodebyid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var node = await WorkNode.findById(id);
        ctx.body = {success:true, node:node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.get('/createtemplate', async(ctx, next)=>{
    var {id} = ctx.request.query;
    await ctx.view('create_template',{work_node_id:id});
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

// 根据temp id 获取模板
router.get('/gettemplatebyid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var nodes = await TemplateNode.findById(id).exec();
        ctx.body = {success:true, node:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

// 根据用户id 来获取 user info
router.get('/getuserid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var user = await User.findById(id).exec();
        ctx.body = {success:true, user};
    }else {
        ctx.body = {success:false, error:'token失效'};
    }
});

// 获取详情
router.get('/flow/detail', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var flow = await Flow.findById(id).exec();
        if(flow.flow_nodes.length == 0){
            var work_nodes = await WorkNode.find({}).exec();
            // 根据user id来获取代码
            var manage_first_user = await User.findById(work_nodes[0].person_manage_id);
            await ctx.view('detail',{flow,work_nodes,manage_first_user});
        }else {
            // var nodes = await Node.find(id:{"$in":flow.flow_nodes}).exec();
            await ctx.view('detail',{flow});
        }

    }else {
        ctx.body = {error:'token失效'};
    }
});

// 增加节点
router.get('/flow/addnode', async(ctx, next)=>{
    var {id,tplid} = ctx.request.query;
    if(ctx.session){
        var flow = await Flow.findById(id).exec();
        var work_nodes = await WorkNode.find({}).exec();
        // 根据user id来获取代码
        var manage_first_user = await User.findById(work_nodes[0].person_manage_id);
        await ctx.view('addnode',{flow,work_nodes,manage_first_user,tplid});

    }else {
        ctx.body = {error:'token失效'};
    }
});

// 根据flow id 获取 node list
router.get('/flow/nodelist', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session){
        var flow = await Flow.findById(id).exec();
        var nodes = await Node.find(id:{"$in":flow.flow_nodes}).exec();
        ctx.body = {success: true, nodes};

    }else {
        ctx.body = {error:'token失效'};
    }
});

router.post('/createflow', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session){
        data.create_user_id = ctx.session.user.id;
        var flow = await Flow.create(data);
        ctx.body = {success: true, flow};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

// 第一次保存工作节点
router.post('/savenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session){
        var tpl = await TemplateNode.findById(data.template_id);
        var work_node = await WorkNode.findById(tpl.work_node_id);
        data.node_name = work_node.work_name;

        var node = await Node.create(data);
        var flow = await Flow.update({'$addToSet':{'flow_nodes':node._id}});
        ctx.body = {success: true, node};
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
        var template = await TemplateNode.create(data);
        ctx.body = {success: true, template};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});



export default router;