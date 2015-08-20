var utils = require('../../../helpers/utils');
var controllers = require('../../../api/controllers');
var review = require('../../../helpers/manager').review;
var manager = require('../../../helpers/manager').response;
var wizard = require('../../../core/_wizard');
var form = require('../../../core/_form');

var analize = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    wizard( function (rsp) {
      manager({req: req, res: res, err: err, rsp: rsp});
    });
  });
};

var generate = function(req, res){
  review({ req: req, res: res }, function(err, opt){
    for (var i in req.params.missing) {
      form.add({name: res.missing[i], resource: res.resources[res.missing[i]]});
    }
    manager({req: req, res: res, err: err, rsp: []});
  });
};

module.exports.generate = generate;
module.exports.analize = analize;
