const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    retrieveUser
 } = require('../controllers/usersController');
 const { protect } = require('../middleWare/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', protect, retrieveUser);




module.exports = router