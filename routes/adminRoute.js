var express = require('express');

var router = express.Router();
var ctl = require('../controllers/auth.controller');

router.get('/', function (req, res) {
    res.render('adminpage/quanly', { title: "Quản lí", page: "welcome" });
});
router.get('/logout',ctl.logout_get);
module.exports = router;