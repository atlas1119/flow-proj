import mongoose from '../db';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, require: true},
    password: { type: String, required: true },
    department: { type: String, required: true },
    employee_id: { type: String, required: true },
    role: { type: Number, required: true, default: 1 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

UserSchema.index({name: 1, department: 1});

module.exports = mongoose.model('User', UserSchema);
