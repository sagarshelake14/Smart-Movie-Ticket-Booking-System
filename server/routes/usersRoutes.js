const router = require('express').Router();
const users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register a new user

router.post('/register', async (req, res)=>{

         try {
                 //Check is user is already exist bor not
                 const userExists = await users.findOne({email: req.body.email});
                 if(!userExists){
                           return res.send({
                                    success: false,
                                    message: "User already exists",
                           });
                 }
                 //Hash the password
                 const salt = await bcrypt.genSalt(10);
                 const hashedPassword = await bcrypt.hash(req.body.password, salt);
                 req.body.password = hashedPassword;

                 // create a new user  || save the user
                 const newUser = new users(req.body);
                 await newUser.save();

                 res.send({
                           success: true,
                           message: "User created successfully",
                 });

         } catch (error) {
                  res.send({
                           success: false,
                           message: error.message,
                  });
         }

})

router.post('/login', async (req, res)=>{

         try {
                  // check if  user exits
                  const user = await users.findOne({email: req.body.email});
                  if(!user){
                          return res.send({
                                    success: false,
                                    message: "User does not exist",
                          });
                  }
                  //check if password is correct
                  const validPassword = await bcrypt.compare(
                           req.body.password,
                           user.password
                  );
                  if(!validPassword){
                           return res.send({
                                    success: false, 
                                    message: "Invalid Password",
                           })
                  }

                  // create and assign a token
                  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
                           expiresIn: "1d",
                  });

                  user.send({ success: true, message: "User logged in successFully", data: token})
                  
         } catch (error) {
                  res.send({
                           success: false,
                           message: error.message,
                  });
         }

})

module.exports = router;