const {User} = require('./database');
const {validateUser} = require('../utils/validate');

exports.createUser = async (userName, firstName, lastName, email, password, role, confirm_password) => {
    try {
        const validated = validateUser(userName, firstName, lastName, email, password, role, confirm_password);
        console.log(validated)
        const user = new User({
            userName, firstName, lastName, email, password, role
        });
        let result =  await user.save();
        return result
    } catch (err) {
        console.log(err)
        return err.message
    }
};

exports.getUsers = async () => {
    return await User.find()
}

exports.getUserByUsername = async userName => {
    return await User.findOne({userName})
}


