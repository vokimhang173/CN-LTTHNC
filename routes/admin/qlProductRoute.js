var express = require('express');

var router = express.Router();

var ctl = require("../../controllers/admin.controller");
var sp = require("../../models/sanpham");
var dm = require("../../models/danhmuc");
/*router.get('/', function (req, res) {
    var ds = dm.aggregate([{
        $lookup: {
            from: "products",
            localField: "List",
            foreignField: "_id",
            as: "DSSP"
        }
    }], function(err, data){
        if(err){
            res.json(err);
        }
        else{
            res.render('adminpage/quanly', { title: "Quan li san pham",page:"table_sp", danhsach: data });
        }
    });
});*/
router.get('/',ctl.xuatsp);
//Them

router.get('/add', function (req, res) {
    dm.find(function(err, data){
        if(err){
            res.json(err);
        }
        else{
            res.render('adminpage/quanly', { title: "Them san pham",page:"form_add", danhmuc: data});
        }
    });
});
router.post('/add', ctl.savetodb);
//Sua
router.get('/edit/:id', function (req, res) {
    sp.findById(req.params.id, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            dm.find(function(err, data1){
                if(err){
                    res.json(err);
                }
                else{
                    console.log(data)
                    res.render('adminpage/quanly', {
                        title: "Sua san pham", page:"form_edit",
                        sanpham: data,
                        danhmuc: data1
                    });
                }
            }); 
        }
    });
});
router.post('/edit/:id', ctl.upd);
//Sua
router.get('/delete/:id', ctl.del);
router.get('/search',ctl.search);
router.get('/:id_dm',ctl.xuatsptheoCat);
module.exports = router;
