const router = require('express').Router();
const UserControll = require('../controllers/userController');

//user
router.post('/users/register', UserControll.register)
router.post('/users/login', UserControll.login)


module.exports = router