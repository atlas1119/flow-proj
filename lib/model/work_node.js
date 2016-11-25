import mongoose from '../db';
var Schema = mongoose.Schema;

var WorkNodeSchema = new Schema({
    work_name: { type: String, required: true },
    work_templates: [{ type: Schema.ObjectId, ref: 'TemplateNode', default: null}],
    create_user_id: { type: Schema.Types.ObjectId },
    person_manage_id: { type: Schema.Types.ObjectId }, //工作节点对接人，默认是创建人
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

WorkNodeSchema.index({work_name: 1});

module.exports = mongoose.model('WorkNode', WorkNodeSchema);
