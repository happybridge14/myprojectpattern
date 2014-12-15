require.config({
  "waitSeconds": 0,
  "baseUrl": "bower_components",
  "paths": {
  },
  "packages": [
    {
      name: 'myprojectpattern',
      location: '..'
    },
    {
      name: 'when',
      main: 'when.js'
    },
    {
      name: 'jquery',
      main: 'dist/jquery.js'
    },
    {
      name: 'jquery-jsonp',
      main: 'src/jquery.jsonp.js'
    },
    {
      name: 'jquery-cookie',
      main: 'jquery.cookie.js'
    },
    {
      name: 'poly',
      main: 'poly.js'
    },
    {
      name: 'moment',
      main: 'moment.js'
    },
    {
      name: 'pystringformat',
      main: 'src/pystringformat.js'
    },
    {
      name: 'es6-shim',
      main: 'es6-shim'
    }
  ],
  "map": {
    "*": {
      "json": "poly/json",
      "text": "requirejs-text/text",
      "css": "require-css/css"
    }
  },
  "config": {
  },
  "deps": ["require"],
  "callback": function (require) {

    define('stringformat', ['pystringformat'], function () {
      return window.pystringformat;
    });

    require([
      "jquery",
      "poly/all"
    ], function ($) {
      require([
        "when",
        "poly/array-es6"
      ], function bootsrap(when) {
      });
    });
  }
});
