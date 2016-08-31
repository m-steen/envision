var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

// install CORS
var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200);
    }
    else {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    }
};

app.use(allowCrossDomain);

app.use(bodyParser.json());

function loadRepository(callback) {
  fs.readFile(__dirname + '/repository.json', 'utf8', function (err, data) {
    if (err) {
      var repository = {models: {}};
      callback(repository);
    }
    else {
      var repository = JSON.parse(data);
      callback(repository);
    }
  });
};

function writeRepository(repository) {
  fs.writeFileSync(__dirname + '/repository.json', JSON.stringify(repository), 'utf8');
}

app.get('/models/', function(req, res) {
  // First read existing users.
  loadRepository(function(repository) {
    var models = repository.models;
    console.log(models);
    res.end(JSON.stringify(models));
  });
});

app.get('/models/:id', function(req, res) {
  loadRepository(function(repository) {
    var modelId = req.params.id;
    var model = repository.models[modelId];
    res.end(JSON.stringify(model));
  });
});

app.put('/models/:id', function(req, res) {
  loadRepository(function(repository) {
    var model = req.body;
    var modelId = req.params.id;
    repository.models[modelId] = model;
    writeRepository(repository);
  })
});

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server started and listening at http://%s:%s", host, port);
});
