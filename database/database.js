const mongoose= require('mongoose')
const {userSchema} = require('./schema');

mongoose.connect( 'mongodb+srv://Ghostcod3r:<password>@cluster0.axd8g.mongodb.net/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

mongoose.connection.on("open", () => {
    console.log("Mongoose connected successfully")
});

exports.db = mongoose.connection;
exports.User = mongoose.model('User', userSchema);
