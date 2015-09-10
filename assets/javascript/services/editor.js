window.app.service('Editor', [
  function() {
    var focus = function(selector) {
      $(selector).select();
    };

    return {focus: focus};
  }
]);
