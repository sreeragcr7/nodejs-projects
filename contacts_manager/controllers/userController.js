const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register user
// @route POST /api/users/register
// @access public

const userRegister = asyncHandler( async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new Error('All fields are manditory!');
    }
    
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User alredy taken!');
    }
    
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Hashed Password: ', hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log("User registered!", user);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error('User not registered!');
    }
    res.status(201).json(user);

});


// User Login
// @route POST /api/users/login
// @access public

const userLogin = asyncHandler( async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const user = await User.findOne({ email });

    //Comparing password
    if(user && ( await bcrypt.compare( password, user.password ) )){
        const accessToken = await jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:"30m" }
    );
    res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error('Email or password not valid!')
    }
    console.log("Login user!")
});


// Current user info
// @route GET /api/users/current
// @access private

const currentUser = asyncHandler( async (req,res) => {
    console.log("Current user info!")
    // const user = await User
    res.status(200).json(req.user);

});


module.exports = {userRegister, userLogin, currentUser};