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

    var expression = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*)?|\b(0|1|true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
    var jshl = function (content) {
      content = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return content.replace(expression,
        function (match) {
          var type = 'number';
          if (/^"/.test(match)) {
            type = 'string';
          } else if (/0|1|true|false|undefined/.test(match)) {
            type = 'boolean';
          } else if (/null/.test(match)) {
            type = 'null';
          }
          return '<span class="' + type + '">' + match + '</span>';
        }
      );
    };

    var focus = function(selector) {
      $(selector).select();
    };

    var draw = function(selector, template) {
      $(selector).html(template);
    };

    return {
      jshl: jshl,
      draw: draw,
      focus: focus,
      model: model
    };
  }
]);
