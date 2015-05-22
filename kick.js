//     Kick.js 0.1.0
//     (c) 2015 Xiaoguang Chen
//     Kick.js may be freely distributed under the MIT license.

(function() {

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `Kick` variable.
  var previousKick = root.Kick;

  // Create a safe reference to the Kick object for use below.
  var Kick = function() {
    if (!(this instanceof Kick)) {
      var instance = Object.create(Kick.prototype);
      return Kick.apply(instance, arguments);
    }

    this._urlComponents = [];

    var argumentLength = arguments.length;
    for (var i = 0; i < argumentLength; i++) {
      this._urlComponents.push(arguments[i].toString());
    }

    return this;
  };

  Kick.prototype.get = function(params, options) {
    return this.request('GET', params, options);
  };

  Kick.prototype.post = function(params, options) {
    return this.request('POST', params, options);
  };

  Kick.prototype.put = function(params, options) {
    return this.request('PUT', params, options);
  };

  Kick.prototype.patch = function(params, options) {
    return this.request('PATCH', params, options);
  };

  Kick.prototype.delete = function(params, options) {
    return this.request('DELETE', params, options);
  };

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  Kick.prototype.request = function(method, params, options) {
    this.options = options || {}

    var url = this._urlComponents.join('/');

    if (!this.relative_path && (!url[0] || url[0] !== "/")) {
      url = "/" + url;
    }

    var payload = {
      url: url,
      type: method,
      dataType: 'json'
    };

    if (method !== 'DELETE') {
      payload.data = params;
    }

    if (typeof params === 'object' && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      payload.contentType = 'application/json';
      payload.data = JSON.stringify(params);
    }

    // Don't process data on a non-GET request.
    if (method !== 'GET') {
      payload.processData = false;
    }

    if (payload.type === 'PATCH' && noXhrPatch) {
      payload.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    var xhr = $.ajax($.extend(payload, this.options));
    return xhr;
  };

  Kick.prototype.relative = function() {
    this.relative_path = true;
    return this;
  };

  Kick.prototype.absolute = function() {
    this.relative_path = false;
    return this;
  };

  // Export the Kick object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `Kick` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Kick;
    }
    exports.Kick = Kick;
  } else {
    root.Kick = Kick;
  }

  // Run Kick.js in *noConflict* mode, returning the `Kick` variable to its
  // previous owner. Returns a reference to the Kick object.
  Kick.noConflict = function() {
    root.Kick = previousKick;
    return this;
  };
}.call(this));
