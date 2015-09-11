window.app.service('Editor', [
  function() {
    var model = function() {
      var search = window.location.search;
      if(search.indexOf('?model=') !== -1) {
        var name = search.replace('?model=', '');
        return decodeURIComponent(name);
      }
      return '';
    };

    var focus = function(selector) {
      $(selector).select();
    };

    return {
      focus: focus,
      model: model
    };
  }
]);
