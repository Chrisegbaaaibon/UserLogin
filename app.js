const express = require('express')
const { createUser, getUsers, getUserByUsername } = require('./database/user')
const app = express();
const router = require('./routes/router')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const  MongoStore = require('connect-mongo')
const db = require('./database/database')
const bcrypt = require('./utils/validate')
const validateUser = require('./utils/validate')

app.use(validateUser, (req, res, next )=>{

})
app.use(router)
app.use(bcrypt, (req, res, next)=>{
    console.log(bcrypt)
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/views'));

app.use(session({
    secret:'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.use(( req, res, next)=>{
    const err = new Error('File Not Found')
    err.status = 500
    next(err)
})

// Catch 404
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send(err.message)
});
app.listen(3500, () => console.log('app listening on port 3500'))
