import mongoose from '../db';
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
    node_name: { type: String, required: true },
    node_struct: { type: String },
    template_id: { type: Schema.Types.ObjectId},
    node_reviewer: { type: String, require: true},
    node_reviewer_id: { type: Schema.Types.ObjectId, require: true},
    next_worknode_id: { type: Schema.Types.ObjectId},
    review_state: { type: Number, require: true, default: 0}, // 0 审核中， 1 审核通过  2 未通过
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

NodeSchema.index({node_name: 1});

exports.NodeSchema = NodeSchema;
exports.Node = mongoose.model('Node', NodeSchema);
