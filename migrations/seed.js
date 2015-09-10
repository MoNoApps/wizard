var db = require('../../../helpers/models');

// clean wizard menu
db.settings.Update(
  {"type" : "properties"},
  { $pull: { "data.admin": "wizard"} },
  {w: 1}, function() {
    // clean editor menu
    db.settings.Update(
      {"type" : "properties"},
      { $pull: { "data.admin": "editor"} },
      {w: 1}, function() {
        // add new menues
        db.settings.Update(
          {"type" : "properties"},
          { $push: { "data.admin": "wizard"} }
        );
        db.settings.Update(
          {"type" : "properties"},
          { $push: { "data.admin": "editor"} }
        );
    });
});
