const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Users = require('../models/usersModel')

// @desc    Register new user 
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    console.log('Register request body:', req.body);
    const { name, email, password } = req.body;
    // Check for all required fields
    if(!name || !email || !password){
        res.status(400)
        throw new Error('All fields are required *')
    }
    // Check if user already exists
    const userExists = await Users.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists!')
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create User
    const user = await Users.create({
        name,
        email,
        password: hashedPassword
    })
    
    if(user){
        // const token = generateToken(user.id);
        // console.log('Generated token:', token);

        res.status(201).json({
            status: true,
            message: "User registered successfully!",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            }
        });
    }else{
        res.status(400).json({
            status: false,
            message: "Invalid data!",
            data: null
        });
    }
})

// @desc    Authenticate a user and Login
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // Find User
    const user = await Users.findOne({email});

    // Check if user password matches
    if(user && (await bcrypt.compare(password, user.password))){
       return res.status(201).json({
            success: true,
            message: `${user.name} has successfully logged In!`,
            data: {
                token: generateToken(user.id)
            }
        });
    }else{
       return res.status(404).json({
            success: false,
            message: "Invalid credentials",
            data: null
        });
    }

    res.status(201).json({
        status: true,
        message: "User login successful!",
    });
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const retrieveUser = asyncHandler(async(req, res) => {
    const { _id, name, email} = await Users.findById(req.user.id)
    res.status(200).json({
        status: true,
        message: "User data successfully fetched!",
        data:{
            id: _id,
            name,
            email,
        }
    });
})

// Generate Token
const generateToken = (id) => {
return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d'
})
}


module.exports = {
    registerUser,
    loginUser,
    retrieveUser
}