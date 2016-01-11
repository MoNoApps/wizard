var utils = require('../../../helpers/utils');
var controllers = require('../../../api/controllers');
var review = require('../../../helpers/manager').review;
var manager = require('../../../helpers/manager').response;
var fill = require('../../../autoform/_fill');
var wizard = require('../../../autoform/_wizard');
var form = require('../../../autoform/_form');

var analize = function(req, res){
  review({ req: req, res: res, admin: true}, function(err, opt){
    wizard( function (rsp) {
      manager({req: req, res: res, err: err, rsp: rsp});
    });
  });
};

// req.params.missing is the list of models to add the missing form
var generate = function(req, res){
  review({ req: req, res: res, admin: true }, function(err, opt){
    wizard( function (rsp) {
      var models = rsp.valid;
      for (var i in req.params.missing) {
        var name = req.params.missing[i];
        form.add({
          name: name,
          resource: rsp.schemas[name]
        });
        models.push(name);
      }
      fill(models);
      manager({req: req, res: res, err: err, rsp: []});
    });
  });
};

// req.params.models is the list of models to add the missing form
var destroy = function(req, res){
  review({ req: req, res: res, admin: true }, function(err, opt){
    wizard( function (rsp) {
      for (var y in req.params.models) {
        form.destroy({
          name: req.params.models[y]
        });
      }
      manager({req: req, res: res, err: err, rsp: []});
    });
  });
};

module.exports.analize = analize;
module.exports.destroy = destroy;
module.exports.generate = generate;
