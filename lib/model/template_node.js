import mongoose from '../db';
var Schema = mongoose.Schema;

var TemplateNodeSchema = new Schema({
    node_name: { type: String, required: true },
    node_type: { type: String, required: true },
    node_struct: { type: String },
    create_user_id: { type: Schema.Types.ObjectId },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

TemplateNodeSchema.index({node_name: 1});

module.exports = mongoose.model('TemplateNode', TemplateNodeSchema);
