var api = {
  GET: [
    {
      route: "analize",
      fn: require('./api/wizard').analize,
      params: {}
    }
  ],
  POST: [
    {
      route: "generate",
      fn: require('./api/wizard').generate,
      params: {}
    },
    {
      route: "destroy",
      fn: require('./api/wizard').destroy,
      params: {}
    }
  ]
};
var web = {};
var sio = {};
var tests = {};
var assets = {};
var helpers = {};

module.exports.api = api;
module.exports.web = web;
module.exports.sio = sio;
module.exports.tests = tests;
module.exports.assets = assets;
module.exports.helpers = helpers;
