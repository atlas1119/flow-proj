import mongoose from '../db';
var Schema = mongoose.Schema;

var CostInfoSchema = new Schema({
    flow_id: { type: Schema.Types.ObjectId},

    jinkou_zengzhishui:{ type: Number },
    zengzhishui:{ type: Number },
    yingyeshuijin_add:{ type: Number },
    haiyunfei:{ type: Number },
    baoxian:{ type: Number },
    gangjianfei:{ type: Number },
    yewufei:{ type: Number },
    zhiqisuqianfei:{ type: Number },
    jianguanfei:{ type: Number },

    yinhuashui:{ type: Number },
    kaizhengfei:{ type: Number },
    chengshuifei:{ type: Number },

    company_jinkou_zengzhishui: { type: String },
    company_zengzhishui: { type: String },
    company_yingyeshuijin_add: { type: String },
    company_haiyunfei: { type: String },
    company_baoxian: { type: String },
    company_gangjianfei: { type: String },
    company_yewufei: { type: String },
    company_zhiqisuqianfei: { type: String },
    company_jianguanfei: { type: String },
    company_yinhuashui: { type: String },
    company_kaizhengfei: { type: String },
    company_chengshuifei: { type: String },

    create_user_id: { type: Schema.Types.ObjectId},

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CostInfoSchema.index({node_name: 1});

module.exports = mongoose.model('CostInfo', CostInfoSchema);
