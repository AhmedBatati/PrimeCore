(function () {
  'use strict';

  var activeCategory = 'all';
  var activeCondition = 'all';

  var catalogGrid = document.getElementById('catalog-grid');
  var resultsCounter = document.getElementById('results-counter');
  var emptyState = document.getElementById('empty-state');

  /* ===== URL PARAMETER PARSER ===== */
  function getQueryParams() {
    var params = {};
    var query = window.location.search.substring(1);
    if (!query) return params;
    var parts = query.split('&');
    for (var i = 0; i < parts.length; i++) {
      var pair = parts[i].split('=');
      var key = decodeURIComponent(pair[0]);
      var val = pair.length > 1 ? decodeURIComponent(pair[1]) : '';
      params[key] = val;
    }
    return params;
  }

  /* ===== APPLY QUERY PARAMS TO FILTER BUTTONS ===== */
  function applyQueryParams() {
    var params = getQueryParams();

    if (params.category) {
      var validCategories = ['laptops', 'phones', 'accessories'];
      if (validCategories.indexOf(params.category) !== -1) {
        activeCategory = params.category;
      }
    }

    if (params.condition) {
      var validConditions = ['new', 'used'];
      if (validConditions.indexOf(params.condition) !== -1) {
        activeCondition = params.condition;
      }
    }

    var catBtns = document.querySelectorAll('[data-category]');
    for (var i = 0; i < catBtns.length; i++) {
      var btn = catBtns[i];
      if (btn.getAttribute('data-category') === activeCategory) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    var condBtns = document.querySelectorAll('[data-condition]');
    for (var j = 0; j < condBtns.length; j++) {
      var btn2 = condBtns[j];
      if (btn2.getAttribute('data-condition') === activeCondition) {
        btn2.classList.add('active');
        btn2.setAttribute('aria-pressed', 'true');
      } else {
        btn2.classList.remove('active');
        btn2.setAttribute('aria-pressed', 'false');
      }
    }
  }

  /* ===== RENDER CATALOG ===== */
  function renderCatalog() {
    if (!catalogGrid || typeof products === 'undefined') return;

    var filtered = [];

    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var matchCategory = activeCategory === 'all' || p.category === activeCategory;
      var matchCondition = activeCondition === 'all' || p.condition === activeCondition;

      if (matchCategory && matchCondition) {
        filtered.push(p);
      }
    }

    catalogGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.add('visible');
      if (resultsCounter) resultsCounter.textContent = 'Showing 0 of ' + products.length + ' products';
      return;
    }

    if (emptyState) emptyState.classList.remove('visible');

    if (resultsCounter) {
      resultsCounter.textContent = 'Showing ' + filtered.length + ' of ' + products.length + ' products';
    }

    for (var j = 0; j < filtered.length; j++) {
      var p = filtered[j];
      var priceFormatted = '$' + p.price.toLocaleString('en-US');
      var imgSrc = p.images && p.images.length > 0 ? p.images[0] : '';
      var conditionClass = p.condition === 'new' ? 'new' : 'used';
      var conditionLabel = p.condition === 'new' ? 'New' : 'Used';

      var card = document.createElement('div');
      card.className = 'pc-card';

      var imgWrapper = document.createElement('div');
      imgWrapper.className = 'card-img-wrapper';

      var img = document.createElement('img');
      img.src = imgSrc;
      img.alt = p.name;
      img.loading = 'lazy';
      img.width = 400;
      img.height = 250;

      var badge = document.createElement('span');
      badge.className = 'condition-badge ' + conditionClass;
      badge.textContent = conditionLabel;

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(badge);

      var title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = p.name;

      var desc = document.createElement('p');
      desc.className = 'card-text';
      desc.textContent = p.shortDescription;

      var priceDiv = document.createElement('div');
      priceDiv.className = 'card-price';
      var priceText = document.createTextNode(priceFormatted + '\u00a0');
      var priceLabel = document.createElement('span');
      priceLabel.className = 'price-label';
      priceLabel.textContent = 'USD';
      priceDiv.appendChild(priceText);
      priceDiv.appendChild(priceLabel);

      var link = document.createElement('a');
      link.href = 'product-details.html?id=' + p.id;
      link.className = 'card-link';
      link.textContent = 'View Details \u2192';

      card.appendChild(imgWrapper);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(priceDiv);
      card.appendChild(link);

      catalogGrid.appendChild(card);
    }
  }

  /* ===== SETUP FILTER BUTTON CLICK HANDLERS ===== */
  function setupFilters() {
    var catBtns = document.querySelectorAll('[data-category]');
    for (var i = 0; i < catBtns.length; i++) {
      catBtns[i].addEventListener('click', function () {
        var cat = this.getAttribute('data-category');
        if (cat === activeCategory) return;

        activeCategory = cat;

        var siblings = document.querySelectorAll('[data-category]');
        for (var s = 0; s < siblings.length; s++) {
          siblings[s].classList.remove('active');
          siblings[s].setAttribute('aria-pressed', 'false');
        }
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        renderCatalog();
      });
    }

    var condBtns = document.querySelectorAll('[data-condition]');
    for (var j = 0; j < condBtns.length; j++) {
      condBtns[j].addEventListener('click', function () {
        var cond = this.getAttribute('data-condition');
        if (cond === activeCondition) return;

        activeCondition = cond;

        var siblings = document.querySelectorAll('[data-condition]');
        for (var s = 0; s < siblings.length; s++) {
          siblings[s].classList.remove('active');
        }
        this.classList.add('active');

        renderCatalog();
      });
    }
  }

  /* ===== INIT ===== */
  function init() {
    applyQueryParams();
    setupFilters();
    renderCatalog();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
