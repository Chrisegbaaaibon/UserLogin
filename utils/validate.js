// Validate User
const Joi = require('joi');

const schema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirm_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io', 'org', 'au'] } })
        .required(),
    role: Joi.string()
        .valid('admin', 'user')
        .required(),
})
    .with('password', 'confirm_password');
exports.validateUser = (userName, firstName, lastName, email, password, role, confirm_password) => {
        const data = {
        userName, firstName, lastName, email, password, role, confirm_password
    }
    const {error, value} = schema.validate(data);
    if (error) {
        throw new Error(error);
    }
    return value;
}

// Harsh Paasword -- Using Bcrypt.js
const bcrypt = require('bcrypt');
const saltSounds = 10;
var pwd = 'Fk^g2h8$$'; //Original password
var pwd2 = 'jt1*7%haD'
bcrypt.hash = ( pwd,saltSounds, (err, hash) =>{ // Salt & Hash
    bcrypt.compare(pwd2, hash, (err, result)=>{  //Compare
        // if password match
        if(result){
        console.log('It matches!')
        }
        // if it does not match
        else{
            console.log('Invalid Password')
        }
    })
})
module.exports = bcrypt