(function() {
  var root = this;  
  var BackboneMock = (function() {
    
    if(typeof Backbone === 'undefined') {
      throw '"Backbone" is undefined, make sure you have loaded ' + 
            'backbone.js before using this mock utility';
    } 
    // Override Backbone.sync
    // because we want to mock the requests
    // we don't care about the method here ...
    Backbone.sync = function(method, model, options) {
      var resp;
      if(urls[model.url]) {
        resp = urls[model.url];
      }
      resp ?
        setTimeout(options.success, timeout, resp) :
        setTimeout(options.error, timeout, 'This model\'s url is not mocked ...');
    };
    
    var urls = {},
        timeout = 1000;
    
    var map = function() {
      var args = [].slice.call(arguments, 0);
      var i = 0, l = args.length, options;
      for(i; i < l; i += 1) { 
        options = args[i];
        if(options.url) {
          urls[options.url] = options.response || {};
        }
      }
    };
 
    return {
      map: function() {
        var args = [].slice.call(arguments, 0);     
        map.apply(null, args);
        return this;
      }
    };      
  }());
  root.BackboneMock = BackboneMock;

}).call(this);


