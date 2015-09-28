var controllers = require('../../../api/controllers');
var review = require('../../../helpers/manager').review;
var manager = require('../../../helpers/manager').response;

var targets = function(req, res){
  review({ req: req, res: res, admin: true}, function(err, opt){
    var P = '/plugins';
    var C = '/config.json';
    var all = [];
    var main = __dirname;
    main = main.substring(0, main.indexOf('/plugins')) + '/config.json';
    all.push({name: 'Main', dir: main});
    var list = require(main).plugins;
    for(var p in list){
      var name = list[p];
      all.push({
        name: name,
        dir: main + '/' + name + P
      });
    }
    manager({req: req, res: res, err: err, rsp: all});
  });
};

module.exports.targets = targets;

