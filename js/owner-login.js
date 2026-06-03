(function () {
  'use strict';

  var form = document.getElementById('owner-login-form');
  var password = document.getElementById('owner-password');
  var error = document.getElementById('login-error');
  var store = window.PrimeCoreStore;

  function setError(message) {
    if (error) error.textContent = message || '';
  }

  function getNextUrl() {
    var params = new URLSearchParams(window.location.search);
    var next = params.get('next') || 'owner-dashboard.html';

    if (next.charAt(0) === '/') {
      return next;
    }

    return 'owner-dashboard.html';
  }

  function submit(event) {
    event.preventDefault();
    setError('');

    if (!store || !store.apiAvailable) {
      setError('تسجيل الدخول يحتاج تشغيل الموقع عبر سيرفر أو نشره، وليس فتح الملف مباشرة.');
      return;
    }

    store.login(password.value).then(function () {
      window.location.href = getNextUrl();
    }).catch(function (requestError) {
      if (requestError.status === 500) {
        setError('إعدادات المالك غير مكتملة على الخادم.');
      } else {
        setError('كلمة المرور غير صحيحة.');
      }
    });
  }

  if (store && store.apiAvailable) {
    store.session().then(function (session) {
      if (session.authenticated) {
        window.location.href = getNextUrl();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', submit);
  }
})();
