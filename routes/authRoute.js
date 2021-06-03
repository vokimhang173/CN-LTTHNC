var express = require('express');

var router = express.Router();
var ctl = require('../controllers/auth.controller');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/', ctl.login);
router.post('/', ctl.postLogin);
module.exports = router;
