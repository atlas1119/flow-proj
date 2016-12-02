import mongoose from '../db';
var Schema = mongoose.Schema;

var ProfitReportSchema = new Schema({
    shiping_ton: { type: Number },
    balance_ton: { type: Number },
    not_tax_income: { type: Number },
    not_tax_cost: { type: Number },
    taxes_add: { type: Number },
    market_cost: { type: Number },
    manage_cost: { type: Number },
    finance_cost: { type: Number },
    gap_cost: { type: Number },
    net_profit: { type: Number },
    gross_profit: { type: Number },
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

ProfitReportSchema.index({node_name: 1});

module.exports = mongoose.model('ProfitReport', ProfitReportSchema);
