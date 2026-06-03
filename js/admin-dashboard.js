(function () {
  'use strict';

  var store = window.PrimeCoreStore;
  if (!store) return;

  var state = {
    view: 'products',
    selectedId: null,
    products: [],
    packages: []
  };

  var listEl = document.getElementById('admin-list');
  var searchEl = document.getElementById('admin-search');
  var formTitle = document.getElementById('form-title');
  var toastEl = document.getElementById('admin-toast');
  var productForm = document.getElementById('product-form');
  var packageForm = document.getElementById('package-form');
  var deleteProductBtn = document.getElementById('delete-product');
  var deletePackageBtn = document.getElementById('delete-package');
  var prices = window.PrimeCorePrices;

  function byId(id) {
    return document.getElementById(id);
  }

  function value(id) {
    var el = byId(id);
    return el ? el.value.trim() : '';
  }

  function checked(id) {
    var el = byId(id);
    return Boolean(el && el.checked);
  }

  function setValue(id, nextValue) {
    var el = byId(id);
    if (el) el.value = nextValue == null ? '' : String(nextValue);
  }

  function setChecked(id, nextValue) {
    var el = byId(id);
    if (el) el.checked = Boolean(nextValue);
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toastEl.classList.remove('visible');
    }, 2200);
  }

  function getActiveItems() {
    return state.view === 'products' ? state.products : state.packages;
  }

  function getSelectedItem() {
    var items = getActiveItems();
    for (var i = 0; i < items.length; i++) {
      if (String(items[i].id) === String(state.selectedId)) return items[i];
    }
    return null;
  }

  function nextId(items) {
    var max = 0;
    for (var i = 0; i < items.length; i++) {
      max = Math.max(max, Number(items[i].id) || 0);
    }
    return max + 1;
  }

  function linesToArray(text) {
    return text
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
  }

  function arrayToLines(items) {
    return (items || []).join('\n');
  }

  function specsToText(specs) {
    if (!specs) return '';
    return Object.keys(specs).map(function (key) {
      return key + ': ' + specs[key];
    }).join('\n');
  }

  function textToSpecs(text) {
    var specs = {};
    var lines = linesToArray(text);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var colonIndex = line.indexOf(':');
      var wideColonIndex = line.indexOf('：');
      var splitIndex = colonIndex >= 0 ? colonIndex : wideColonIndex;

      if (splitIndex < 0) {
        specs[line] = '';
      } else {
        var key = line.slice(0, splitIndex).trim();
        var val = line.slice(splitIndex + 1).trim();
        if (key) specs[key] = val;
      }
    }

    return specs;
  }

  function categoryLabel(category) {
    if (category === 'laptops') return 'أجهزة';
    if (category === 'phones') return 'هواتف';
    if (category === 'accessories') return 'ملحقات';
    return category || 'منتج';
  }

  function conditionLabel(condition) {
    return condition === 'used' ? 'مستعمل' : 'جديد';
  }

  function normalizeCurrency(currency) {
    return prices ? prices.normalizeCurrency(currency) : (currency || 'SAR');
  }

  function formatPrice(amount, currency) {
    return prices ? prices.formatPrice(amount, currency) : ((Number(amount) || 0) + ' ' + normalizeCurrency(currency));
  }

  function renderTabs() {
    var tabs = document.querySelectorAll('[data-admin-view]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-admin-view') === state.view);
    }
  }

  function renderForms() {
    var isProducts = state.view === 'products';
    productForm.hidden = !isProducts;
    packageForm.hidden = isProducts;
    formTitle.textContent = isProducts ? 'بيانات المنتج' : 'بيانات الباقة';
  }

  function renderList() {
    var items = getActiveItems();
    var query = searchEl.value.trim().toLowerCase();
    var filtered = items.filter(function (item) {
      return !query || String(item.name || '').toLowerCase().indexOf(query) !== -1;
    });

    listEl.innerHTML = '';

    if (filtered.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = 'لا توجد عناصر';
      listEl.appendChild(empty);
      return;
    }

    for (var i = 0; i < filtered.length; i++) {
      var item = filtered[i];
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'admin-list-item' + (String(item.id) === String(state.selectedId) ? ' active' : '');
      button.setAttribute('data-id', item.id);

      var content = document.createElement('span');
      var name = document.createElement('span');
      name.className = 'admin-item-name';
      name.textContent = item.name || 'بدون اسم';

      var meta = document.createElement('span');
      meta.className = 'admin-item-meta';

      if (state.view === 'products') {
        meta.textContent = categoryLabel(item.category) + ' - ' + conditionLabel(item.condition) + ' - ' + formatPrice(item.price, item.currency);
      } else {
        meta.textContent = (item.speed || '-') + ' - ' + formatPrice(item.priceMonthly, item.currency);
      }

      var badge = document.createElement('span');
      badge.className = 'admin-badge';
      badge.textContent = item.active === false ? 'مخفي' : (item.featured ? 'مميز' : '#' + item.id);

      content.appendChild(name);
      content.appendChild(meta);
      button.appendChild(content);
      button.appendChild(badge);

      button.addEventListener('click', function () {
        state.selectedId = this.getAttribute('data-id');
        fillForm(getSelectedItem());
        renderList();
      });

      listEl.appendChild(button);
    }
  }

  function fillProductForm(item) {
    setValue('product-id', item ? item.id : '');
    setValue('product-name', item ? item.name : '');
    setValue('product-price', item ? item.price : '');
    setValue('product-category', item ? item.category : 'laptops');
    setValue('product-condition', item ? item.condition : 'new');
    setValue('product-currency', item ? normalizeCurrency(item.currency) : 'SAR');
    setValue('product-short', item ? item.shortDescription : '');
    setValue('product-full', item ? item.fullDescription : '');
    setValue('product-images', item ? arrayToLines(item.images) : '');
    setValue('product-specs', item ? specsToText(item.specifications) : '');
    setChecked('product-featured', item ? item.featured : false);
    setChecked('product-active', item ? item.active !== false : true);
    deleteProductBtn.disabled = !item;
  }

  function fillPackageForm(item) {
    setValue('package-id', item ? item.id : '');
    setValue('package-name', item ? item.name : '');
    setValue('package-price', item ? item.priceMonthly : '');
    setValue('package-type', item ? item.type : 'satellite');
    setValue('package-speed', item ? item.speed : '');
    setValue('package-limit', item ? item.dataLimit : 'لا محدود');
    setValue('package-currency', item ? normalizeCurrency(item.currency) : 'SAR');
    setValue('package-description', item ? item.description : '');
    setValue('package-features', item ? arrayToLines(item.features) : '');
    setChecked('package-featured', item ? item.featured : false);
    setChecked('package-active', item ? item.active !== false : true);
    deletePackageBtn.disabled = !item;
  }

  function fillForm(item) {
    if (state.view === 'products') {
      fillProductForm(item);
    } else {
      fillPackageForm(item);
    }
  }

  function newItem() {
    state.selectedId = null;
    fillForm(null);
    renderList();
  }

  function createProductFromForm(existing) {
    return {
      id: existing ? Number(existing.id) : nextId(state.products),
      name: value('product-name'),
      category: value('product-category'),
      condition: value('product-condition'),
      price: Number(value('product-price')) || 0,
      currency: normalizeCurrency(value('product-currency')),
      shortDescription: value('product-short'),
      fullDescription: value('product-full'),
      specifications: textToSpecs(value('product-specs')),
      images: linesToArray(value('product-images')),
      featured: checked('product-featured'),
      active: checked('product-active'),
      dateAdded: existing && existing.dateAdded ? existing.dateAdded : new Date().toISOString().slice(0, 10)
    };
  }

  function createPackageFromForm(existing) {
    return {
      id: existing ? Number(existing.id) : nextId(state.packages),
      name: value('package-name'),
      type: value('package-type') || 'satellite',
      speed: value('package-speed'),
      dataLimit: value('package-limit') || 'لا محدود',
      priceMonthly: Number(value('package-price')) || 0,
      currency: normalizeCurrency(value('package-currency')),
      description: value('package-description'),
      features: linesToArray(value('package-features')),
      featured: checked('package-featured'),
      active: checked('package-active')
    };
  }

  function persistAll(successMessage) {
    return store.saveOwnerData({
      products: state.products,
      packages: state.packages
    }).then(function (data) {
      state.products = data.products || [];
      state.packages = data.packages || [];
      renderList();
      showToast(successMessage);
      return data;
    }).catch(function () {
      showToast('تعذر الحفظ، تأكد من تسجيل الدخول وإعدادات التخزين');
    });
  }

  function upsertItem(items, item) {
    var updated = false;

    for (var i = 0; i < items.length; i++) {
      if (String(items[i].id) === String(item.id)) {
        items[i] = item;
        updated = true;
        break;
      }
    }

    if (!updated) items.unshift(item);
  }

  function saveProduct(event) {
    event.preventDefault();
    var existing = getSelectedItem();
    var item = createProductFromForm(existing);
    upsertItem(state.products, item);
    state.selectedId = item.id;
    persistAll('تم حفظ المنتج').then(function () {
      fillProductForm(getSelectedItem() || item);
    });
  }

  function savePackage(event) {
    event.preventDefault();
    var existing = getSelectedItem();
    var item = createPackageFromForm(existing);
    upsertItem(state.packages, item);
    state.selectedId = item.id;
    persistAll('تم حفظ الباقة').then(function () {
      fillPackageForm(getSelectedItem() || item);
    });
  }

  function deleteCurrent() {
    var item = getSelectedItem();
    if (!item) return;

    if (!window.confirm('حذف "' + item.name + '"؟')) return;

    if (state.view === 'products') {
      state.products = state.products.filter(function (product) {
        return String(product.id) !== String(item.id);
      });
      persistAll('تم حذف المنتج');
    } else {
      state.packages = state.packages.filter(function (pkg) {
        return String(pkg.id) !== String(item.id);
      });
      persistAll('تم حذف الباقة');
    }

    newItem();
  }

  function resetCurrentData() {
    var label = state.view === 'products' ? 'المنتجات' : 'الباقات';
    if (!window.confirm('استعادة ' + label + ' الأصلية؟')) return;

    if (state.view === 'products') {
      state.products = JSON.parse(JSON.stringify(store.defaultProducts || []));
    } else {
      state.packages = JSON.parse(JSON.stringify(store.defaultPackages || []));
    }

    newItem();
    persistAll('تمت الاستعادة');
  }

  function switchView(nextView) {
    state.view = nextView;
    state.selectedId = null;
    searchEl.value = '';
    renderTabs();
    renderForms();
    fillForm(null);
    renderList();
  }

  function exportData() {
    var payload = JSON.stringify({
      exportedAt: new Date().toISOString(),
      products: state.products,
      packages: state.packages
    }, null, 2);
    var blob = new Blob([payload], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'primecore-data-backup.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  function importData(file) {
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function () {
      try {
        var payload = JSON.parse(reader.result);
        state.products = Array.isArray(payload.products) ? payload.products : state.products;
        state.packages = Array.isArray(payload.packages) ? payload.packages : state.packages;
        persistAll('تم استيراد البيانات').then(newItem);
      } catch (error) {
        showToast('تعذر قراءة الملف');
      }
    };
    reader.readAsText(file);
  }

  function bindEvents() {
    var tabs = document.querySelectorAll('[data-admin-view]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        switchView(this.getAttribute('data-admin-view'));
      });
    }

    byId('new-item').addEventListener('click', newItem);
    byId('reset-current').addEventListener('click', resetCurrentData);
    searchEl.addEventListener('input', renderList);
    productForm.addEventListener('submit', saveProduct);
    packageForm.addEventListener('submit', savePackage);
    deleteProductBtn.addEventListener('click', deleteCurrent);
    deletePackageBtn.addEventListener('click', deleteCurrent);
    byId('export-data').addEventListener('click', exportData);
    byId('import-data').addEventListener('click', function () {
      byId('import-file').click();
    });
    byId('import-file').addEventListener('change', function () {
      importData(this.files[0]);
      this.value = '';
    });

    byId('owner-logout').addEventListener('click', function () {
      store.logout().then(function () {
        window.location.href = 'owner-login.html';
      });
    });
  }

  function showServerRequired() {
    listEl.innerHTML = '<div class="admin-empty">لوحة المالك تحتاج فتح الموقع عبر سيرفر أو نشره، وليس عبر file://.</div>';
    productForm.hidden = true;
    packageForm.hidden = true;
    formTitle.textContent = 'تسجيل الدخول غير متاح';
  }

  function start() {
    bindEvents();
    renderTabs();
    renderForms();

    if (!store.apiAvailable) {
      showServerRequired();
      return;
    }

    store.session().then(function (session) {
      if (!session.authenticated) {
        window.location.href = 'owner-login.html?next=/owner-dashboard.html';
        return Promise.reject(new Error('not_authenticated'));
      }

      return store.loadOwnerData();
    }).then(function (data) {
      state.products = data.products || [];
      state.packages = data.packages || [];
      renderList();
      fillForm(null);
    }).catch(function (error) {
      if (error.message === 'not_authenticated') return;
      showToast('تعذر تحميل بيانات المالك');
      renderList();
      fillForm(null);
    });
  }

  start();
})();
