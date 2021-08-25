const  mongoose = require('mongoose');

const Schema  = mongoose.Schema;

   userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] }
}, { timestamps: true }); 

User = mongoose.model('User', userSchema)

module.exports= User;