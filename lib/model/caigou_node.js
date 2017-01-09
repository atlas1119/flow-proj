import mongoose from '../db';
var Schema = mongoose.Schema;

var CaigouSchema = new Schema({
    node_name: { type: String, required: true },
    node_id: { type: Schema.Types.ObjectId },

    rezhi: { type: Number, default: 0},
    rezhijitai: { type: Number, default: 0},
    liufen:{ type: Number, default: 0},
    liufenjitai:{ type: Number, default: 0},
    hetongshuliang:{ type: Number, default: 0},
    rongrendu:{ type: Number, default: 0},
    maoyifangshi:{ type: Number, default: 0},
    fukuangfangshi:{ type: Number, default: 0},
    zhuanggangjigou:{ type: Number, default: 0},
    zhuanggangbiaozhun:{ type: Number, default: 0},
    shouzaiqi:{ type: Number, default: 0},
    zhuanggang:{ type: Number, default: 0},

    hetonghao:{ type: String },
    qiandingriqi:{ type: Date },
    hetongdanjia:{ type: Number, default: 0},
    hetongjine:{ type: Number, default: 0},
    buy_gongsi:{ type: String },
    sell_gongsi:{ type: String },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CaigouSchema.index({node_name: 1});

module.exports = mongoose.model('CaigouNode', CaigouSchema);
