var express = require("express")
var session = require('express-session');

var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

var logfmt = require("logfmt")
var cons = require("consolidate");

var viewers = require("./handlers/viewers")
app = express();

app.use(logfmt.requestLogger());
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'coyg', cookie: { maxAge:24*60*60*1000}}));


app.get('/viewers', viewers.getViewers);

app.post('/addViewer', viewers.addViewer);

app.post('/removeViewer', viewers.removeViewer);

var port = Number(process.env.PORT || 5050);
app.listen(port, function() {
  console.log("Listening on " + port);
});


