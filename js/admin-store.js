(function (global) {
  'use strict';

  var defaultProducts = clone(typeof products !== 'undefined' ? products : []);
  var defaultPackages = clone(typeof packages !== 'undefined' ? packages : []);
  var apiAvailable = global.location && global.location.protocol !== 'file:';

  function clone(value) {
    return JSON.parse(JSON.stringify(value || []));
  }

  function applyData(data) {
    if (data && Array.isArray(data.products) && typeof products !== 'undefined') {
      products = clone(data.products);
    }

    if (data && Array.isArray(data.packages) && typeof packages !== 'undefined') {
      packages = clone(data.packages);
    }
  }

  function fallbackData() {
    return {
      products: clone(defaultProducts).filter(function (item) {
        return item.active !== false;
      }),
      packages: clone(defaultPackages).filter(function (item) {
        return item.active !== false;
      })
    };
  }

  function requestJson(path, options) {
    var requestOptions = options || {};
    requestOptions.credentials = 'same-origin';
    requestOptions.headers = Object.assign(
      { 'Content-Type': 'application/json' },
      requestOptions.headers || {}
    );

    return fetch(path, requestOptions).then(function (response) {
      return response.json().catch(function () {
        return {};
      }).then(function (body) {
        if (!response.ok) {
          var error = new Error(body.error || 'request_failed');
          error.status = response.status;
          throw error;
        }

        return body;
      });
    });
  }

  function loadPublicData() {
    if (!apiAvailable) {
      var localData = fallbackData();
      applyData(localData);
      return Promise.resolve(localData);
    }

    return requestJson('/api/public-data')
      .then(function (data) {
        applyData(data);
        return data;
      })
      .catch(function () {
        var localData = fallbackData();
        applyData(localData);
        return localData;
      });
  }

  function loadOwnerData() {
    if (!apiAvailable) {
      return Promise.reject(new Error('owner_api_requires_server'));
    }

    return requestJson('/api/admin-data').then(function (data) {
      applyData(data);
      return data;
    });
  }

  function saveOwnerData(data) {
    if (!apiAvailable) {
      return Promise.reject(new Error('owner_api_requires_server'));
    }

    return requestJson('/api/admin-data', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(function (savedData) {
      applyData(savedData);
      return savedData;
    });
  }

  function login(password) {
    if (!apiAvailable) {
      return Promise.reject(new Error('login_requires_server'));
    }

    return requestJson('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password: password })
    });
  }

  function logout() {
    if (!apiAvailable) {
      return Promise.resolve({ ok: true });
    }

    return requestJson('/api/logout', { method: 'POST' });
  }

  function session() {
    if (!apiAvailable) {
      return Promise.resolve({ authenticated: false });
    }

    return requestJson('/api/session').catch(function () {
      return { authenticated: false };
    });
  }

  global.PrimeCoreStore = {
    apiAvailable: apiAvailable,
    defaultPackages: clone(defaultPackages),
    defaultProducts: clone(defaultProducts),
    loadOwnerData: loadOwnerData,
    loadPublicData: loadPublicData,
    login: login,
    logout: logout,
    ready: loadPublicData(),
    saveOwnerData: saveOwnerData,
    session: session
  };
})(window);
