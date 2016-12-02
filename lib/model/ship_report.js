import mongoose from '../db';
var Schema = mongoose.Schema;

var ShipReportSchema = new Schema({
    work_path: { type: String, required: true },
    en_name: { type: String },
    cn_name: { type: String },
    ton_amount: { type: Number },
    load_date: { type: Date },
    load_location: { type: String },
    unload_location: { type: String },
    arrive_data: {type: Date},
    start_unload_date: {type: Date},
    finish_unload_date: {type: Date},
    remark: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

ShipReportSchema.index({work_path: 1});

module.exports = mongoose.model('ShipReport', ShipReportSchema);
