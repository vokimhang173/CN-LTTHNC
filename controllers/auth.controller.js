var acc = require("../models/user");
module.exports.login = function (req, res) {
    res.render('adminpage/login', { title: "Login"});
}
module.exports.postLogin = function (req, res) {
    var username = req.body.username;
    var password = req.body.inputPassword;
    acc.findOne({
        Username: username,
        Password: password
    })
    .then(user=>{
        if(user){
            res.cookie('user', username);
            res.redirect('/admin');
        }else{
            res.json({message: "no user found"});
        }
    })
}
module.exports.logout_get = (req, res) => {
    res.cookie('user', '', { maxAge: 1 });
    res.redirect('/');
}