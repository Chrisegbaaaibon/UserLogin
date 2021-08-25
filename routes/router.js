const  express  = require("express")

const route = express.Router()

const User = require('../database/schema')

route.get('/', (req, res, next)=>{
   return res.render('index.ejs')
});

route.post('/create-user',  (req, res) => {
   const {
       userName, firstName, lastName, email, password, role, confirm_password
   } = req.body
   console.log({
       userName, firstName, lastName, email, password, role, confirm_password
   })

   if(!userName, !firstName, !lastName, !email, !password, !role, !confirm_password){
      res.send();
   } else{
      if(password == confirm_password){
         User.findOne({email: email}, (err, data)=>{
            if(!data){
               let c;
               User.findOne({}, (err, data)=>{
                  if (data){
                     c = data.unique_id + 1;
                  }else{
                     c = 1;
                  }

                  const newPerson = new User({
                     // unique_id: c,
                     email: email,
                     firstName: firstName,
                     lastName:lastName,
                     userName:userName,
                     role: role,
                     password: password,
                     confirm_password: confirm_password
                  });

                  newPerson.save((err, Person)=>{
                     if(err)
                        console.log(err);
                     else
                        console.log('Success')
                  })
               }).sort({_id: -1}).limit(1);
               res.send('Success')
            }else{
               res.send('Email already used')
            }
         })
      }else{
         res.send('Passwords do not match')
      }
   }
});

route.get('/login', (req, res, next)=>{
   return res.render('login.ejs');
})

route.get('/login', (req, res, next) => {
   User.findOne({email:req.body.email}, (err, data)=>{
      if(data){
         if(data.password == req.body.password){
            req.session.userId = data.unique_id
            res.send('Success!')
         }else{
            res.send('Wrong password!')
         }
      }else
   res.send('This Email is not registered!')
   });
});

route.get('/profile', (req, res) => {
   User.findOne({unique_id:req.session.userId}, (err, data)=>{
      console.log('data')
      console.log(data);
      if(!data){
         res.redirect('/');
      }else{
         return res.render('data.ejs', {"name":data.userName, "email":data.email});
      }
   });
});

route.get('/logout', (req, res, next)=>{
   if(req.session){
      req.session.destroy((err)=>{
         if(err){
            return next(err)
         }else{
            return res.redirect('/')
         }
      });
   }
});


module.exports= route