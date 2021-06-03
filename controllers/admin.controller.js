var mongoose = require('mongoose');
var multer = require('multer');
var sp = require("../models/sanpham");
var dm = require("../models/danhmuc");

var perpage = 10;

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        //Kiem tra file nao dc upload
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("spImage");
module.exports.savetodb = function (req, res) {
    //Upload file
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
        } else if (err) {
            res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
        } else {
            //save Mongo
            var sanpham = sp({
                Name: req.body.tensp,
                Image: req.file.filename,
                Cost: req.body.txtgia,
                Mota: req.body.txtmota,
                Category_id: mongoose.Types.ObjectId(req.body.danhmuc)
            });
            sanpham.save(function (err) {
                if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    /*dm.findByIdAndUpdate(req.body.danhmuc, {
                        $push: { List: sanpham._id }
                    }, function (err) {
                        if (err) {
                            res.json(err);
                        } else {*/
                    res.redirect('/admin/product/');
                    // }
                    // });
                }
            })
        }
    });
};
module.exports.upd = function (req, res) {
    upload(req, res, function (err) {
        if (!req.file) {
            sp.updateOne({ _id: req.params.id }, {
                Name: req.body.tensp,
                Cost: req.body.txtgia,
                Mota: req.body.txtmota,
                Category_id: mongoose.Types.ObjectId(req.body.danhmuc)
            })
                .then(() => res.redirect('/admin/product/'))
        } else {
            if (err instanceof multer.MulterError) {
                res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
            } else {
                sp.updateOne({ _id: req.params.id }, {
                    Name: req.body.tensp,
                    Image: req.file.filename,
                    Cost: req.body.txtgia,
                    Mota: req.body.txtmota,
                    Category_id: mongoose.Types.ObjectId(req.body.danhmuc)
                })
                    .then(() => res.redirect('/admin/product/'))
            }
        }
    });

};
module.exports.del = function (req, res) {
    sp.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.json(err);
        }
    })
    res.redirect('/admin/product/');
};
module.exports.xuatsp = function (req, res) {
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    sp.find().skip(skip).limit(perpage).exec(function (err, data) {
        sp.countDocuments((err, count) => {
            if (err) {
                res.json(err);
            }
            else {
                res.render('adminpage/quanly', {
                    title: "Quan li san pham", page: "table_sp",
                    current: page,
                    pages: Math.ceil(count / perpage),
                    danhsach: data
                });
            }
        });
    });
};
module.exports.search = function (req, res) {
    var f = req.query.f;
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    sp.find({ Name: { $regex: f } }).skip(skip).limit(perpage).exec(function (err, data2) {
        sp.countDocuments((err, count) => {
            if (err) {
                res.json(err);
            }
            else {
                res.render('adminpage/quanly', {
                    title: "Quan li san pham", page: "table_sp",
                    current: page,
                    pages: Math.ceil(count / perpage),
                    danhsach: data2
                });
            }
        });
    });
};
module.exports.xuatsptheoCat = function (req, res) {
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    sp.find({ Category_id: req.params.id_dm}).skip(skip).limit(perpage).exec(function (err, data) {
        sp.countDocuments((err, count) => {
            if (err) {
                res.json(err);
            }
            else {
                res.render('adminpage/quanly', {
                    title: "San pham", page: "table_sp",
                    current: page,
                    pages: Math.ceil(count / perpage),
                    danhsach: data
                });
            }
        });
    });
};