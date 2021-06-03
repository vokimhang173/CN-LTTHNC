module.exports.isAdminLoggedin = function (req, res,next) {
    if (!req.cookies.user) {
        res.redirect('/adminlogin');
        return;
    }
    if(req.cookies.username){
        res.redirect('/');
        return;
    };
    next();
}