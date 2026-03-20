const express = require('express');
const router = express.Router();
const { 
    login,
    signup,
    getAllUsers,
    deleteUsers,
    approveUser,
    pendingUser
 } = require('../controllers/user.controller');
const { auth } = require('../middleware/jwt.auth')

router.post('/login', login);

router.post('/register', signup);

router.get('/getUser',auth, getAllUsers) // for admin

router.delete('/delete-user/:id',auth, deleteUsers) // for admin

router.put('/validate-user/:id', auth, approveUser)

router.get('/pending-users',auth, pendingUser)

module.exports = router;