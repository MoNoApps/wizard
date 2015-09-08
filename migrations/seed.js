var db = require('../../../helpers/models');

// add menu
db.settings.Update(
  {"type" : "properties"},
  { $pull: { "data.admin": "wizard"} }
  {w: 1}, function() {
    db.settings.Update(
      {"type" : "properties"},
      { $push: { "data.admin": "wizard"} }
    );
});
