import mongoose from '../db';
var Schema = mongoose.Schema;

var ProfitDetailSchema = new Schema({
    balance_date: { type: Date },
    fachuan_date: { type: Date },
    ship_name: { type: String },
    worker_name: { type: String },
    work_type: { type: String },
    fayun_department: { type: String },
    up_provider: { type: String },
    xiaoshou_department: { type: String },
    down_xiaoshou_person: { type: String },
    work_line: { type: String },
    up_balance_ton: { type: Number },
    up_balance_zhi: { type: Number },
    chao_ton: { type: Number },
    chao_card: { type: Number },
    net_profit: { type: Number },
    xiaoshou_tax_cost: { type: Number },
    xiaoshou_tax_total: { type: Number },
    caigou_cost: { type: Number },

    kaizheng_cost: { type: Number },
    fayun_huilv: { type: Number },
    caiwu_model_huilv: { type: Number },
    huankuang_huilv: { type: Number },
    caigou_total: { type: Number },
    guoliang_huanhui_diff: { type: Number },
    rongziguoliang_interest:{ type: Number },
    dangdun_jingli:{ type: Number },

    kuisun_seazon:{ type: String },
    huanjie_duijieren:{ type: String },
    remark:{ type: String },
    jinkou_zengzhishui:{ type: Number },
    zengzhishui:{ type: Number },
    yingyeshuijin_add:{ type: Number },
    haiyunfei:{ type: Number },
    baoxian:{ type: Number },
    gangjianfei:{ type: Number },
    jianyifei:{ type: Number },
    yewufei:{ type: Number },
    zhiqisuqianfei:{ type: Number },

    jianguanfei:{ type: Number },
    guoneiyunfei:{ type: Number },
    daidaifeiyong:{ type: Number },
    guangwufei:{ type: Number },
    zhuangxiefei:{ type: Number },
    jianyanfei:{ type: Number },
    yinhuashui:{ type: Number },
    richangbaoxiaofentan:{ type: Number },
    kaizhengfei:{ type: Number },
    chengshuifei:{ type: Number },
    duandaifei:{ type: Number },
    tiexianfei:{ type: Number },
    huishuisunyi:{ type: Number },
    qitafeiyong:{ type: Number },
    shifoujiewan:{ type: String },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

ProfitDetailSchema.index({node_name: 1});

module.exports = mongoose.model('ProfitDetail', ProfitDetailSchema);
