const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
//const { response } = require('express');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middlewares/authmiddleware');

// register a new user

router.post('/register', async (req, res)=>{

         try {
                 //Check is user is already exist bor not
                 const userExists = await User.findOne({email: req.body.email});
                 if(userExists){
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
                 const newUser = new User(req.body);
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
                  const user = await User.findOne({email: req.body.email});
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
                 const token = jwt.sign(
                        { userId: user._id },
                        process.env.jwt_secret,
                        {
                                expiresIn: "1d",
                        }
                );

                res.send({ 
                        success: true, 
                        message: "User logged in successFully", 
                        data: token
                });
                  
         } catch (error) {
                  res.send({
                           success: false,
                           message: error.message,
                  });
         }

})



// get user details by id
// router.get('/get-current-user', authmiddleware, async (req, res)=>{
//         try {
//                 const user = await User.findById(req.body.userId).select('-password');
//                 res.send({
//                         success: true, 
//                         message: "User details fetched successfully",
//                         data: user,
//                 });

//         } catch (error) {
//                 res.send({
//                         success: false,
//                         message: error.message,
//                 });
//         }
// })

// Example of your GET route
router.get("/get-current-user", authmiddleware, async (req, res) => {
    try {
        // FIX: Change req.body.userId to req.userId
        const user = await User.findById(req.userId); 
        
        if (!user) {
            return res.send({ success: false, message: "User does not exist" });
        }
        
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;

