import mongoose from '../db';
var Schema = mongoose.Schema;

var ChainSchema = new Schema({
    chain_at: { type: Date, required: true },
    company_name: { type: String },
    flow_id: { type: Schema.Types.ObjectId},
    create_user_id: { type: Schema.Types.ObjectId},
    cost_value: { type: Number, require: true},
    sales_value: { type: Number, require: true},
    profit_value: { type: Number, require: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

ChainSchema.index({company_name: 1});

module.exports = mongoose.model('Chain', ChainSchema);
