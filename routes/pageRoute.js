var express = require('express');
var router = express.Router();
var sp = require("../models/sanpham");
var dm = require("../models/danhmuc");
var ctl = require("../controllers/page.controller")

router.get('/', ctl.index);
router.get('/search', ctl.search);
router.get('/danhmuc/:id', ctl.xuattheoCat);
//  Chi Tiet
router.get('/detail/:_id', function (req, res) {
    dm.find(function(err, data1){
        if(err){
            res.json(err);
        }
        else{
            sp.findById(req.params._id, function (err, data) {
                if(err){
                    res.json(err);
                }
                else {
                    res.render('page/home', { title: "Chi Tiet san pham",page:"product_detail", sanpham: data,danhmuc: data1 });
                    console.log(data)
                }
            });
        }
    });  
    
});
router.get('/gioithieu', function (req, res) {
    dm.find(function(err, data1){
        if(err){
            res.json(err);
        }else{
            res.render('page/home', { title: "Gioi thieu",page:"gioithieu", danhmuc: data1});
        }
    });
});
router.get('/beauty_tips', function (req, res) {
    dm.find(function(err, data1){
        if(err){
            res.json(err);
        }else{
            res.render('page/home', { title: "Beauty tips",page:"beautytips", danhmuc: data1});
        }
    });
});
router.get('/beauty_tips/:beauty', ctl.beauty);
router.get('/login', function (req, res) {
    res.render('page/login', { title: "Dang nhap" });
});
router.get('/dangki', function (req, res) {
    res.render('page/dangki', { title: "Dang ki tai khoan" });
});

module.exports = router;
