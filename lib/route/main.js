var router = require('koa-router')();

import {User,Flow, Node, WorkNode ,TemplateNode, Chain, ProfitReport, CaigouNode, ProfitDetail, CostInfo} from '../model';
// import _ from 'lodash';

router.get('/', async(ctx, next)=>{
    var sess = ctx.session, flows;
    // var path = ctx.request.path;
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

router.get('/model', async(ctx, next)=>{
    var sess = ctx.session, flows;
    // var path = ctx.request.path;
    if(sess && sess.user){
        var nodes = await TemplateNode.find({}).exec();
        for (var i = 0; i < nodes.length; i++) {
            var user = await User.findById(nodes[i].create_user_id).exec();
            var work = await WorkNode.findById(nodes[i].work_node_id).exec();
            nodes[i].user = user;
            nodes[i].work = work;
        }

        var work_nodes = await WorkNode.find({}).exec();
        await ctx.view('model',{nodes,work_nodes});
    }else{
        ctx.redirect('/login');
    }

});

router.get('/report', async(ctx, next)=>{
    var sess = ctx.session, profitdata = [];
    var shiping_ton = 0,balance_ton = 0,
    not_tax_income = 0,not_tax_cost = 0,taxes_add = 0,
    market_cost = 0,manage_cost = 0,finance_cost = 0,
    gap_cost = 0,net_profit = 0,gross_profit = 0;

    if(sess && sess.user){

        var {date,ship_name,
            xiaoshou_department,
            up_provider,
            down_xiaoshou_person,
            worker_name,work_type} = ctx.request.query;
        var param ={};
        if(date){
            var start_time = new Date(date.split(':')[0].replace(/-/,"/")),
                end_time = new Date(date.split(':')[1].replace(/-/,"/"));
            param.balance_date = {$gte: start_time, $lt: end_time};
        }

        if(ship_name){
            param.ship_name = ship_name;
        }
        if(xiaoshou_department){
            param.xiaoshou_department = xiaoshou_department;
        }
        if(up_provider){
            param.up_provider = up_provider;
        }
        if(down_xiaoshou_person){
            param.down_xiaoshou_person = down_xiaoshou_person;
        }
        if(worker_name){
            param.worker_name = worker_name;
        }
        if(work_type){
            param.work_type = work_type;
        }

        var profits = await ProfitDetail.find(param).exec();


        for (var i = 0; i < profits.length; i++) {
            shiping_ton += profits[i].up_balance_ton / 10000;
            balance_ton += profits[i].down_balance_ton / 10000;
            not_tax_income += profits[i].xiaoshou_tax_total / 1.17 / 10000;
            not_tax_cost += profits[i].caigou_total / 10000;
            taxes_add += profits[i].yingyeshuijin_add / 10000;
            market_cost += ((profits[i].haiyunfei + profits[i].baoxian+ profits[i].gangjianfei + profits[i].jianyifei +
                profits[i].yewufei + profits[i].zhiqisuqianfei + profits[i].jianguanfei)+
                (profits[i].daidaifeiyong + profits[i].guangwufei + profits[i].zhuangxiefei + profits[i].jianyanfei)/1.06+profits[i].guoneiyunfei/1.11)/10000;

            manage_cost += (profits[i].yinhuashui + profits[i].richangbaoxiaofentan)/10000;
            finance_cost += (profits[i].kaizhengfei + profits[i].chengshuifei + profits[i].duandaifei + profits[i].tiexianfei + profits[i].huishuisunyi + profits[i].qitafeiyong)/10000;
            gap_cost += (profits[i].guoliang_huanhui_diff + profits[i].rongziguoliang_interest) / 1.17 / 10000;
        }

        net_profit = not_tax_income - not_tax_cost - taxes_add - market_cost - manage_cost - finance_cost - gap_cost;
        gross_profit = net_profit + finance_cost + manage_cost;

        profitdata.push({
            shiping_ton:shiping_ton.toFixed(4),
            balance_ton:balance_ton.toFixed(4),
            not_tax_income:not_tax_income.toFixed(4),
            not_tax_cost:not_tax_cost.toFixed(4),
            taxes_add:taxes_add.toFixed(4),
            market_cost:market_cost.toFixed(4),
            manage_cost:manage_cost.toFixed(4),
            finance_cost:finance_cost.toFixed(4),
            gap_cost:gap_cost.toFixed(4),
            net_profit:net_profit.toFixed(4),
            gross_profit:gross_profit.toFixed(4)
        });

        // var profits = await ProfitReport.find({}).exec();
        await ctx.view('report',{profitdata,profits,param});
    }else{
        ctx.redirect('/login');
    }

});

router.get('/report/detail', async(ctx, next)=>{
    var sess = ctx.session, flows;
    if(sess && sess.user){
        var {date,ship_name,
            xiaoshou_department,
            up_provider,
            down_xiaoshou_person,
            worker_name,work_type} = ctx.request.query;
        var param ={};
        if(date){
            var start_time = new Date(date.split(':')[0].replace(/-/,"/")),
                end_time = new Date(date.split(':')[1].replace(/-/,"/"));
            param.balance_date = {$gte: start_time, $lt: end_time};
        }

        if(ship_name){
            param.ship_name = ship_name;
        }
        if(xiaoshou_department){
            param.xiaoshou_department = xiaoshou_department;
        }
        if(up_provider){
            param.up_provider = up_provider;
        }
        if(down_xiaoshou_person){
            param.down_xiaoshou_person = down_xiaoshou_person;
        }
        if(worker_name){
            param.worker_name = worker_name;
        }
        if(work_type){
            param.work_type = work_type;
        }

        var profits = await ProfitDetail.find(param).exec();
        await ctx.view('report_detail',{profits,param});
    }else{
        ctx.redirect('/login');
    }

});

router.get('/staff', async(ctx, next)=>{
    var sess = ctx.session, users;
    var {department} = ctx.request.query;
    if(sess && sess.user){
        if(department){
            var dp = department.split('-')[1];
            // console.log("###",dp);
            users = await User.find({department:{$regex: dp}}).exec();
        }else{
            users = await User.find({});
        }

        await ctx.view('staff',{users});
    }else{
        ctx.redirect('/login');
    }

});

router.get('/model/createtemplate', async(ctx, next)=>{
    var {id} = ctx.request.query;
    // console.log("###", ctx.headers);

    await ctx.view('create_template',{work_node_id:id, referUrl: ctx.headers.referer});
});

router.get('/flow/cost_info', async(ctx, next)=>{
    var {id} = ctx.request.query;
    var data = {};
    if(id){
        // data.flow_id = id;
        // var flow = await Flow.findById(id).exec();

    }

    await ctx.view('cost_info',{flow_id:id});
});

// 编辑模板
router.get('/model/edittemplate', async(ctx, next)=>{
    var {id} = ctx.request.query;
    var tplNode = await TemplateNode.findById(id).exec();

    await ctx.view('edit_template',{tplNode});
});


// 获取详情
router.get('/flow/detail', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var flow = await Flow.findById(id).exec();
        var user_info = await User.findById(flow.create_user_id);

        if(flow.flow_nodes.length == 0){
            var work_nodes = await WorkNode.find({}).exec();
            // 根据user id来获取代码
            var manage_first_user = await User.findById(work_nodes[0].person_manage_id);
            await ctx.view('detail',{flow,work_nodes,manage_first_user,user_info});
        }else {
            // var nodes = await Node.find(id:{"$in":flow.flow_nodes}).exec();
            var costs = await CostInfo.find({'flow_id': id});
            var chains = await Chain.find({'flow_id': id});

            await ctx.view('detail',{flow,user_info,costs,chains});
        }

    }else {
        // ctx.body = {error:'token失效'};
        ctx.redirect('/login');
    }
});

// 增加节点
router.get('/flow/addnode', async(ctx, next)=>{
    var {id,tplid} = ctx.request.query;
    if(ctx.session.user){
        var flow = await Flow.findById(id).exec();
        var work_nodes = await WorkNode.find({}).exec();
        // 根据user id来获取代码
        var manage_first_user = await User.findById(work_nodes[0].person_manage_id);
        await ctx.view('addnode',{flow,work_nodes,manage_first_user,tplid});

    }else {
        // ctx.body = {error:'token失效'};
        ctx.redirect('/login');
    }
});

// 编辑节点
router.get('/flow/editnode', async(ctx, next)=>{
    var {id,edit} = ctx.request.query;
    if(ctx.session.user){
        var node = await Node.findById(id).exec();
        var selected_work_node = await WorkNode.findById(node.next_worknode_id).exec();
        var work_nodes = await WorkNode.find({}).exec();
        // 根据user id来获取代码
        var manage_first_user = await User.findById(selected_work_node.person_manage_id);
        await ctx.view('editnode',{edit,node,work_nodes,manage_first_user,selected_work_node});

    }else {
        // ctx.body = {error:'token失效'};
        ctx.redirect('/login');
    }
});

// 增加业务节点
router.get('/business/addnode', async(ctx, next)=>{
    var {id,tplid} = ctx.request.query;
    if(ctx.session.user){
        var flow = await Flow.findById(id).exec();
        var work_nodes = await WorkNode.find({}).exec();
        // 根据user id来获取代码
        var manage_first_user = await User.findById(work_nodes[0].person_manage_id);
        await ctx.view('add_business_manage',{flow,work_nodes,manage_first_user,tplid});

    }else {
        // ctx.body = {error:'token失效'};
        ctx.redirect('/login');
    }
});

// 编辑业务类型节点
router.get('/business/editnode', async(ctx, next)=>{
    var {id,edit} = ctx.request.query;
    if(ctx.session.user){
        var node = await Node.findById(id).exec();
        var selected_work_node = await WorkNode.findById(node.next_worknode_id).exec();
        var work_nodes = await WorkNode.find({}).exec();
        // 根据user id来获取代码
        var manage_first_user = await User.findById(selected_work_node.person_manage_id);
        var caigou_node = await CaigouNode.find({node_id:id}).exec();

        // console.log("###", caigou_node);

        await ctx.view('business_manage',{edit,node,work_nodes,manage_first_user,selected_work_node,caigou_node});

    }else {
        // ctx.body = {error:'token失效'};
        ctx.redirect('/login');
    }
});

//------------------------- ajax --------------------------//

router.get('/getworknodes', async(ctx, next)=>{
    if(ctx.session.user){
        var nodes = await WorkNode.find({});
        ctx.body = {success:true, nodes:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.get('/getworknodebyid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var node = await WorkNode.findById(id);
        ctx.body = {success:true, node:node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.get('/gettemplatenodes', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var nodes = await TemplateNode.find({work_node_id:id});
        ctx.body = {success:true, nodes:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

// 根据temp id 获取模板
router.get('/gettemplatebyid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var nodes = await TemplateNode.findById(id).exec();
        ctx.body = {success:true, node:nodes};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

// 根据用户id 来获取 user info
router.get('/getuserid', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var user = await User.findById(id).exec();
        ctx.body = {success:true, user};
    }else {
        ctx.body = {success:false, error:'token失效'};
    }
});

// 根据flow id 获取 node list
router.get('/flow/nodelist', async(ctx, next)=>{
    var {id} = ctx.request.query;
    if(ctx.session.user){
        var flow = await Flow.findById(id).exec();
        var nodes = await Node.find({"_id":{$in:flow.flow_nodes}}).exec();
        var tpls = [];
        for (var i = 0; i < nodes.length; i++) {
            // 代码写的很垃圾，很影响性能
            // tplids.push(nodes[i].template_id);
            var tpl = await TemplateNode.findById(nodes[i].template_id).exec();
            tpls.push(tpl);
        }

        ctx.body = {success: true, nodes, tpls};

    }else {
        ctx.body = {error:'token失效'};
        // ctx.redirect('/login');
    }
});

router.post('/createflow', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        data.create_user_id = ctx.session.user.id;
        var flow = await Flow.create(data);
        ctx.body = {success: true, flow};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

// 保存编辑后的工作节点
router.post('/saveeditnode', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        var node = await Node.findByIdAndUpdate(data.id,{
            node_struct: data.node_struct,
            node_reviewer: data.node_reviewer,
            node_reviewer_id: data.node_reviewer_id,
            next_worknode_id: data.next_worknode_id,
        });

        var flow = await Flow.find({'flow_nodes':{'$in':[data.id]}});
        ctx.body = {success: true, node, flow};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

// 第一次保存工作节点
router.post('/savenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        var tpl = await TemplateNode.findById(data.template_id);
        var work_node = await WorkNode.findById(tpl.work_node_id);
        data.node_name = work_node.work_name;

        var node = await Node.create(data);
        var flow = await Flow.findByIdAndUpdate(data.fid, {'$addToSet':{'flow_nodes':node._id}});
        if(data.node_name == "采购"){//采购做特别处理
            var pdetail = await ProfitDetail.create({
                "flow_id":data.fid,
                "ship_name" : "鹏德",
                "worker_name" : ctx.session.user.name,
                "work_type" : data.node_name,
                "fayun_department" : "内贸煤公司",
                "up_provider" : "神华销售集团有限公司",
                "xiaoshou_department" : ctx.session.user.department,
                "down_xiaoshou_person" : "江西贝汐能源有限公司",
                "work_line" : "神华-和辉-江西贝汐",
                "up_balance_ton" : data.hetongshuliang,
                "up_balance_zhi" : data.rezhi,
                "down_balance_ton" : 26705.1,
                "down_balance_zhi" : 5345.0,
                "chao_ton" : 0.1,
                "chao_card" : 0,
                "net_profit" : -29235.38,
                "xiaoshou_tax_cost" : 377.44,
                "xiaoshou_tax_total" : 10123373.45,
                "caigou_cost" : data.hetongjine,
                "kaizheng_cost" : 0,
                "fayun_huilv" : 1,
                "caiwu_model_huilv" : 0,
                "huankuang_huilv" : 1,
                "caigou_total" : 8614987.35,
                "guoliang_huanhui_diff" : 0,
                "rongziguoliang_interest" : 0.0,
                "dangdun_jingli" : -1.09,
                "kuisun_seazon" : "无",
                "huanjie_duijieren" : "无",
                "remark" : "无",
                "jinkou_zengzhishui" : 0,
                "zengzhishui" : 6369.66,
                "yingyeshuijin_add" : 636.97,
                "haiyunfei" : 0,
                "baoxian" : 0,
                "gangjianfei" : 0.0,
                "jianyifei" : 0.0,
                "yewufei" : 0.0,
                "zhiqisuqianfei" : 0,
                "jianguanfei" : 0.0,
                "guoneiyunfei" : 0.0,
                "daidaifeiyong" : 0,
                "guangwufei" : 0.0,
                "zhuangxiefei" : 0,
                "jianyanfei" : 0,
                "yinhuashui" : 5180.23,
                "richangbaoxiaofentan" : 60886.77,
                "kaizhengfei" : 0,
                "chengshuifei" : 0,
                "duandaifei" : 0,
                "tiexianfei" : 0,
                "huishuisunyi" : 0,
                "qitafeiyong" : 0.0,
                "shifoujiewan" : "是"
            });
            data.node_id = node._id;
            var node = await CaigouNode.create(data);
        }

        ctx.body = {success: true, node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

// save
router.post('/business/savenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        var tpl = await TemplateNode.findById(data.template_id);
        var work_node = await WorkNode.findById(tpl.work_node_id);
        data.node_name = work_node.work_name;

        var node = await Node.create(data);
        var flow = await Flow.findByIdAndUpdate(data.fid, {'$addToSet':{'flow_nodes':node._id}});

        if(data.node_name == "采购"){//采购做特别处理
            var pdetail = await ProfitDetail.create({
                "flow_id":data.fid,
                "ship_name" : "鹏德",
                "worker_name" : ctx.session.user.name,
                "work_type" : data.node_name,
                "fayun_department" : "内贸煤公司",
                "up_provider" : "神华销售集团有限公司",
                "xiaoshou_department" : ctx.session.user.department,
                "down_xiaoshou_person" : "江西贝汐能源有限公司",
                "work_line" : "神华-和辉-江西贝汐",
                "up_balance_ton" : data.hetongshuliang,
                "up_balance_zhi" : data.rezhi,
                "down_balance_ton" : 26705.1,
                "down_balance_zhi" : 5345.0,
                "chao_ton" : 0.1,
                "chao_card" : 0,
                "net_profit" : -29235.38,
                "xiaoshou_tax_cost" : 377.44,
                "xiaoshou_tax_total" : 10123373.45,
                "caigou_cost" : data.hetongjine,
                "kaizheng_cost" : 0,
                "fayun_huilv" : 1,
                "caiwu_model_huilv" : 0,
                "huankuang_huilv" : 1,
                "caigou_total" : 8614987.35,
                "guoliang_huanhui_diff" : 0,
                "rongziguoliang_interest" : 0.0,
                "dangdun_jingli" : -1.09,
                "kuisun_seazon" : "无",
                "huanjie_duijieren" : "无",
                "remark" : "无",
                "jinkou_zengzhishui" : 1464547.85,
                "zengzhishui" : 6369.66,
                "yingyeshuijin_add" : 636.97,
                "haiyunfei" : 0,
                "baoxian" : 0,
                "gangjianfei" : 0.0,
                "jianyifei" : 0.0,
                "yewufei" : 0.0,
                "zhiqisuqianfei" : 0,
                "jianguanfei" : 0.0,
                "guoneiyunfei" : 0.0,
                "daidaifeiyong" : 0,
                "guangwufei" : 0.0,
                "zhuangxiefei" : 0,
                "jianyanfei" : 0,
                "yinhuashui" : 5180.23,
                "richangbaoxiaofentan" : 60886.77,
                "kaizhengfei" : 0,
                "chengshuifei" : 0,
                "duandaifei" : 0,
                "tiexianfei" : 0,
                "huishuisunyi" : 0,
                "qitafeiyong" : 0.0,
                "shifoujiewan" : "是"
            });
            data.node_id = node._id;
            var node = await CaigouNode.create(data);
        }

        ctx.body = {success: true, node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }
});

router.post('/createworknodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        data.create_user_id = ctx.session.user.id;
        var work_node = await WorkNode.create(data);
        ctx.body = {success: true, node:work_node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

// 创建费用
router.post('/createcostinfo', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        data.create_user_id = ctx.session.user.id;
        var cost_info = await CostInfo.create(data);
        ctx.body = {success: true, cost_info:cost_info};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/createuser', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        var user = await User.create(data);
        ctx.body = {success: true, user};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/saveuser', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        // delete data.id;
        var user = await User.findByIdAndUpdate(data.id,data);
        ctx.body = {success: true, user};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/deletemodel', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        // delete data.id;
        var templ = await TemplateNode.remove({'_id':data.id});
        ctx.body = {success: true, templ};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

// 审核节点信息
router.post('/verifyperson', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        // data.create_user_id = ctx.session.user.id;
        var node = await Node.findByIdAndUpdate(data.id,{review_state:data.state});
        ctx.body = {success: true, node:node};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/createchain', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        data.create_user_id = ctx.session.user.id;
        var chain = await Chain.create(data);
        var flow_node = await Flow.findById(data.flow_id);
        var nodes = await Node.find({id:{'$in':flow_node.flow_nodes}});
        var finish = true;
        for (var i = 0; i < nodes.length; i++) {
            if(nodes[i].review_state != 1){
                finish = false;
                break;
            }
        }

        if(finish){
            // 更新flow表，整个流程走完
            var flow = await Flow.findByIdAndUpdate(data.flow_id,{'$addToSet':{'flow_nodes':chain._id},'flow_state':1});
        }

        ctx.body = {success: true, node:chain};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/createtemplatenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        data.create_user_id = ctx.session.user.id;
        var template = await TemplateNode.create(data);
        ctx.body = {success: true, template};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});

router.post('/edittemplatenodes', async(ctx, next)=>{
    var data = ctx.request.body;
    if(ctx.session.user){
        // data.create_user_id = ctx.session.user.id;
        var template = await TemplateNode.findByIdAndUpdate(data.id,data);
        ctx.body = {success: true, template};
    }else {
        ctx.body = {success: false, error:'token失效'};
    }

});



export default router;
