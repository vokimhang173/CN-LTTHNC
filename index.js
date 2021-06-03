var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var port = 3000;
var url = 'mongodb+srv://admin:admin@cluster0.b0yjk.mongodb.net/btlon';

mongoose.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then((db)=> console.log("db is connected"))
    .catch((err) =>console.log(err));
var app = express();
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static("public"));
app.use(cookieParser());
var home = require('./routes/pageRoute');
var adRoute = require('./routes/admin/qlProductRoute');
var dmRoute = require('./routes/admin/danhmucRoute');
var authRoute = require('./routes/authRoute');
var adminRoute = require('./routes/adminRoute');
var auth = require('./middleware/auth.middleware');
app.use('/', home);
app.use('/admin/',auth.isAdminLoggedin ,adminRoute);
app.use('/admin/product/',auth.isAdminLoggedin, adRoute);
app.use('/admin/danhmuc/',auth.isAdminLoggedin, dmRoute);
app.use('/adminlogin/', authRoute);

app.listen(port, function () {
    console.log("Server listening on port " + port);
});
