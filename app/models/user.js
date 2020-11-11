const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  empID: { type: Number, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
