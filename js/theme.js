(function () {
  'use strict';

  var STORAGE_KEY = 'primecore_theme';
  var DEFAULT_THEME = 'dark';
  var root = document.documentElement;

  function normalizeTheme(theme) {
    return theme === 'light' ? 'light' : 'dark';
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_THEME;
    }
  }

  function getInitialTheme() {
    return getStoredTheme();
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, normalizeTheme(theme));
    } catch (error) {
      /* Storage can be unavailable in private contexts. */
    }
  }

  function applyTheme(theme, shouldSave) {
    var nextTheme = normalizeTheme(theme);
    root.setAttribute('data-theme', nextTheme);
    root.style.colorScheme = nextTheme;

    if (shouldSave) {
      saveTheme(nextTheme);
    }

    updateToggles(nextTheme);
  }

  function updateToggles(theme) {
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    var isLight = theme === 'light';

    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      toggle.setAttribute('title', isLight ? 'تفعيل الوضع الداكن' : 'تفعيل وضع النهار');
    });
  }

  function bindToggles() {
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var current = normalizeTheme(root.getAttribute('data-theme'));
        applyTheme(current === 'light' ? 'dark' : 'light', true);
      });
    });

    updateToggles(normalizeTheme(root.getAttribute('data-theme')));
  }

  applyTheme(getInitialTheme(), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggles);
  } else {
    bindToggles();
  }

  window.PrimeCoreTheme = {
    apply: function (theme) {
      applyTheme(theme, true);
    },
    current: function () {
      return normalizeTheme(root.getAttribute('data-theme'));
    },
    storageKey: STORAGE_KEY
  };
})();
