var mongoose = require('mongoose');
var sp = require("../models/sanpham");
var dm = require("../models/danhmuc");
var perpage = 6;

module.exports.index = function (req, res) {
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    dm.find(function (err, data1) {
        if (err) {
            res.json(err);
        }
        else {
            sp.find().skip(skip).limit(perpage).exec(function (err, data2) {
                sp.countDocuments((err, count) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.render('page/home', {
                            title: "Trang chu", page: "homepage",
                            current: page,
                            pages: Math.ceil(count / perpage),
                            danhsach: data2, danhmuc: data1
                        });
                    }
                });
            });
        }
    });
};
module.exports.search = function (req, res) {
    var f = req.query.f;
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    dm.find(function (err, data1) {
        if (err) {
            res.json(err);
        }
        else {
            sp.find({ Name: { $regex: f } }).skip(skip).limit(perpage).exec(function (err, data2) {
                sp.countDocuments((err, count) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.render('page/home', {
                            title: "Trang chu", page: "listsp",
                            current: page,
                            pages: Math.ceil(count / perpage),
                            danhsach: data2, danhmuc: data1
                        });
                    }
                });
            });
        }
    });
};
module.exports.xuattheoCat = function (req, res) {
    var id = req.params.id;
    var page = req.query.page || 1;
    var skip = (page - 1) * perpage;
    dm.find(function (err, data1) {
        if (err) {
            res.json(err);
        }
        else {
            sp.find({ Category_id: id }).skip(skip).limit(perpage).exec(function (err, data2) {
                if (err) {
                    res.json(err);
                } else {
                    sp.countDocuments((err, count) => {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            console.log(data2);
                            res.render('page/home', {
                                title: "Trang chu", page: "listsp",
                                current: page,
                                pages: Math.ceil(count / perpage),
                                danhsach: data2, danhmuc: data1
                            });
                        }
                    });
                }
            });
        }
    });
};
module.exports.beauty = function (req, res) {
    console.log(req.params.beauty);
    dm.find(function (err, data1) {
        if (err) {
            res.json(err);
        }
        else {
            res.render('page/home', {
                title: "Trang chu", page:req.params.beauty ,
                danhmuc: data1
            });
        }
    });
};