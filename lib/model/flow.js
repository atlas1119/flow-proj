import mongoose from '../db';
// import {NodeSchema} from './node';
var Schema = mongoose.Schema;

var FlowSchema = new Schema({
    flow_name: { type: String, required: true },
    flow_type: { type: String, required: true}, // 类型
    flow_breed: { type: String, required: true}, // 品种
    start_time: { type: Date, require: true},
    flow_state: { type: Number, require: true, default: 0}, //0 处理中，1 完成 2 审核未通过
    flow_nodes: [{ type: Schema.ObjectId, ref: 'TemplateNode' }],
    create_user_id: { type: Schema.Types.ObjectId },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

FlowSchema.index({flow_name: 1});

module.exports = mongoose.model('Flow', FlowSchema);
