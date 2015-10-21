var controllers = require('../../../api/controllers');
var review = require('../../../helpers/manager').review;
var manager = require('../../../helpers/manager').response;

var targets = function(req, res){
  review({ req: req, res: res, admin: true}, function(err, opt){
    var P = '/plugins';
    var C = '/config.json';
    var all = [];
    var dir = __dirname;
    dir = dir.substring(0, dir.indexOf(P));
    var main = dir + C;
    all.push({name: 'main', dir: main});
    var list = require(main).plugins;
    for(var p in list){
      var name = list[p];
      all.push({
        name: name,
        dir: dir + P + '/' + name + C
      });
    }
    manager({req: req, res: res, err: err, rsp: all});
  });
};

module.exports.targets = targets;

