const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/usersModel');

const protect = asyncHandler(async(req, res, next) => {
    let token;
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from Headers
            token = req.headers.authorization.split(" ")[1];

            // Verfy token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user by token
            req.user = await Users.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Un-Authorized!')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Auth-Token not found!')
    }
})

module.exports = { protect }