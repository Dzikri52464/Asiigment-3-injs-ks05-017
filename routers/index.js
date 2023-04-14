const router = require('express').Router();
const photoR = require('./photoR');
const userR = require('./userR')

router.use('/',userR)
router.use('/',photoR)
module.exports = router;