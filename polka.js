const polka = require('polka')
  , bodyParser = require('body-parser')
  , compression = require('compression')
  , cors = require('cors')
  , sirv = require('sirv')
  , send = require('@polka/send-type')
  , morgan = require('morgan');;

// Log every request
function logger(req, res, next) {
  console.log(`~> Received ${req.method} on ${req.url}`);
  next(); // move on
}

const assets = sirv('public', {
  // maxAge: 31536000, // 1Y
  immutable: true
});

var app = polka({
  onError(err, req, res, next) {
    const http = require('http');
    console.log(err);
    let code = (res.statusCode = err.code || err.status || 500);
    res.end(err.length && err || err.message || http.STATUS_CODES[code]);
  }
});

app.use(cors());

// log all request
// app.use(logger);
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));

// compress all responses
app.use(compression());

// public assets
app.use(assets);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach your "send" method
  res.send = (data = '', headers = {}, code = 200) => {
    return send(res, code, data, headers);
  };
  next();
});


// app.all('*', (req, res, next) => {
//   console.log("req.body", req.body);
//   console.log("req.params", req.params);
//   next();
// });

app.use('auth', require('./auth'));

module.exports = app.handler;