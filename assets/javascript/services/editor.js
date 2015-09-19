window.app.service('Editor', ['$rootScope',
  function($rootScope) {
    var model = function() {
      var search = window.location.search;
      if(search.indexOf('?model=') !== -1) {
        var name = search.replace('?model=', '');
        return decodeURIComponent(name);
      }
      return '';
    };

    var expression = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*)?|\b(true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
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
          } else if (/true|false|undefined/.test(match)) {
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

    var tabs = function(selector) {
      $('a[href="' + selector + '"]').click();
      $(selector).tab('show');
    };

    var nav = function() {
      $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
        if(e.target.hash=='#keys') {
          focus('[ng-model="name"]');
        }
        if(e.target.hash=='#preview') {
          $rootScope.$emit('editor::draw');
        }
      });
    };

    return {
      nav: nav,
      jshl: jshl,
      draw: draw,
      tabs: tabs,
      focus: focus,
      model: model
    };
  }
]);
