(function () {
  'use strict';

  var prices = window.PrimeCorePrices;

  function formatPrice(amount, currency) {
    return prices ? prices.formatPrice(amount, currency) : ((Number(amount) || 0) + ' ' + (currency || 'SAR'));
  }

  /* ===== URL ID PARSING ===== */
  function getProductId() {
    var query = window.location.search.substring(1);
    if (!query) return null;
    var parts = query.split('&');
    for (var i = 0; i < parts.length; i++) {
      var pair = parts[i].split('=');
      if (decodeURIComponent(pair[0]) === 'id' && pair.length > 1) {
        var val = parseInt(decodeURIComponent(pair[1]), 10);
        return isNaN(val) ? null : val;
      }
    }
    return null;
  }

  function getCategoryLabel(category) {
    if (category === 'laptops') return '\u0623\u062c\u0647\u0632\u0629';
    if (category === 'phones') return '\u0647\u0648\u0627\u062a\u0641';
    if (category === 'accessories') return '\u0645\u0644\u062d\u0642\u0627\u062a';
    return 'PrimeCore';
  }

  function attachImageFallback(img, wrapper, product) {
    img.onerror = function () {
      if (wrapper.querySelector('.product-image-fallback')) return;

      wrapper.classList.add('is-image-missing');

      var fallback = document.createElement('div');
      fallback.className = 'product-image-fallback';

      var kicker = document.createElement('span');
      kicker.className = 'fallback-kicker';
      kicker.textContent = getCategoryLabel(product.category);

      var name = document.createElement('span');
      name.className = 'fallback-name';
      name.textContent = product.name;

      fallback.appendChild(kicker);
      fallback.appendChild(name);
      wrapper.appendChild(fallback);
    };

    if (!img.getAttribute('src')) {
      img.onerror();
    }
  }

  /* ===== WHATSAPP URL GENERATOR ===== */
  function generateWhatsAppUrl(product) {
    var base = 'https://wa.me/1234567890';
    var priceFormatted = formatPrice(product.price, product.currency);
    var conditionLabel = product.condition === 'new' ? '\u062c\u062f\u064a\u062f' : '\u0645\u0633\u062a\u0639\u0645\u0644';
    var message = '\u0645\u0631\u062d\u0628\u0627 PrimeCore\u060c \u0623\u0631\u063a\u0628 \u0628\u0645\u0639\u0631\u0641\u0629 \u062a\u0641\u0627\u0635\u064a\u0644 \u062a\u0648\u0641\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c: ' +
                  product.name + ' (\u0627\u0644\u062d\u0627\u0644\u0629: ' + conditionLabel + '\u060c \u0627\u0644\u0633\u0639\u0631: ' + priceFormatted + ').';
    return base + '?text=' + encodeURIComponent(message);
  }

  /* ===== RENDER PRODUCT DETAILS ===== */
  function renderProduct(product) {
    var content = document.getElementById('product-content');
    var notFound = document.getElementById('not-found');

    if (!content || !notFound) return;

    // Hide 404, show content
    notFound.classList.remove('visible');
    content.style.display = 'block';

    // Document title
    document.title = product.name + ' — PrimeCore';

    // Canonical URL (A7 — SEO)
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.primecore.com/product-details.html?id=' + product.id;

    // Breadcrumb
    var bcCurrent = document.getElementById('breadcrumb-current');
    if (bcCurrent) {
      bcCurrent.textContent = product.name;
      bcCurrent.setAttribute('aria-current', 'page');
    }

    // Category label
    var categoryLabel = document.getElementById('meta-category');
    if (categoryLabel) categoryLabel.textContent = product.category;

    // Title
    var title = document.getElementById('meta-title');
    if (title) title.textContent = product.name;

    // Condition badge
    var badge = document.getElementById('meta-badge');
    if (badge) {
      badge.textContent = product.condition === 'new' ? '\u062c\u062f\u064a\u062f' : '\u0645\u0633\u062a\u0639\u0645\u0644';
      badge.className = 'condition-badge ' + (product.condition === 'new' ? 'new' : 'used');
    }

    var priceDiv = document.getElementById('meta-price');
    if (priceDiv) {
      priceDiv.innerHTML = '';
      priceDiv.textContent = formatPrice(product.price, product.currency);
    }

    // Short description
    var desc = document.getElementById('meta-desc');
    if (desc) desc.textContent = product.shortDescription;

    // WhatsApp CTA
    var cta = document.getElementById('cta-whatsapp');
    if (cta) cta.href = generateWhatsAppUrl(product);

    // Gallery
    var galleryImg = document.getElementById('gallery-img');
    var galleryThumbs = document.getElementById('gallery-thumbs');

    if (galleryImg && product.images && product.images.length > 0) {
      galleryImg.alt = product.name;
      var galleryMain = galleryImg.closest('.gallery-main');
      if (galleryMain) attachImageFallback(galleryImg, galleryMain, product);
      galleryImg.src = product.images[0];
    }

    if (galleryThumbs && product.images) {
      galleryThumbs.innerHTML = '';

      for (var i = 0; i < product.images.length; i++) {
        (function (index) {
          var thumb = document.createElement('div');
          thumb.className = 'thumb' + (index === 0 ? ' active' : '');

          var thumbImg = document.createElement('img');
          thumbImg.src = product.images[index];
          thumbImg.alt = product.name + ' thumbnail ' + (index + 1);
          thumbImg.loading = 'lazy';
          thumbImg.onerror = function () {
            thumb.style.display = 'none';
          };

          thumb.appendChild(thumbImg);

          thumb.addEventListener('click', function () {
            if (galleryImg) galleryImg.src = product.images[index];

            var allThumbs = galleryThumbs.querySelectorAll('.thumb');
            for (var t = 0; t < allThumbs.length; t++) {
              allThumbs[t].classList.remove('active');
            }
            thumb.classList.add('active');
          });

          galleryThumbs.appendChild(thumb);
        })(i);
      }
    }

    // Specifications table
    var specsBody = document.getElementById('specs-body');
    if (specsBody && product.specifications) {
      specsBody.innerHTML = '';
      var specKeys = Object.keys(product.specifications);

      for (var j = 0; j < specKeys.length; j++) {
        var key = specKeys[j];
        var value = product.specifications[key];

        var tr = document.createElement('tr');

        var tdKey = document.createElement('th');
        tdKey.scope = 'row';
        tdKey.className = 'spec-key';
        tdKey.textContent = key;

        var tdValue = document.createElement('td');
        tdValue.className = 'spec-value';
        tdValue.textContent = value;

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        specsBody.appendChild(tr);
      }
    }

    // Full description
    var descBox = document.getElementById('description-box');
    if (descBox) descBox.textContent = product.fullDescription;

    // Related products
    var relatedGrid = document.getElementById('related-products-grid');
    var relatedLabel = document.getElementById('related-category-label');

    if (relatedGrid) {
      relatedGrid.innerHTML = '';

      var related = [];
      for (var k = 0; k < products.length; k++) {
        if (products[k].category === product.category && products[k].id !== product.id) {
          related.push(products[k]);
        }
        if (related.length === 4) break;
      }

      if (relatedLabel) {
        var catDisplay = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        relatedLabel.textContent = catDisplay;
      }

      for (var r = 0; r < related.length; r++) {
        var p = related[r];
        var priceFormatted = formatPrice(p.price, p.currency);
        var imgSrc = p.images && p.images.length > 0 ? p.images[0] : '';
        var conditionClass = p.condition === 'new' ? 'new' : 'used';
        var conditionLabel = p.condition === 'new' ? '\u062c\u062f\u064a\u062f' : '\u0645\u0633\u062a\u0639\u0645\u0644';

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
        attachImageFallback(img, imgWrapper, p);

        var badge = document.createElement('span');
        badge.className = 'condition-badge ' + conditionClass;
        badge.textContent = conditionLabel;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(badge);

        var title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = p.name;

        var desc2 = document.createElement('p');
        desc2.className = 'card-text';
        desc2.textContent = p.shortDescription;

        var priceDiv = document.createElement('div');
        priceDiv.className = 'card-price';
        priceDiv.textContent = priceFormatted;

        var link = document.createElement('a');
        link.href = 'product-details.html?id=' + p.id;
        link.className = 'card-link';
        link.textContent = '\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u2190';

        card.appendChild(imgWrapper);
        card.appendChild(title);
        card.appendChild(desc2);
        card.appendChild(priceDiv);
        card.appendChild(link);

        relatedGrid.appendChild(card);
      }
    }
  }

  /* ===== INIT ===== */
  function init() {
    var content = document.getElementById('product-content');
    var notFound = document.getElementById('not-found');

    if (content) content.style.display = 'none';

    var id = getProductId();

    if (id === null || typeof products === 'undefined') {
      if (notFound) notFound.classList.add('visible');
      return;
    }

    var product = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        product = products[i];
        break;
      }
    }

    if (!product) {
      if (notFound) notFound.classList.add('visible');
      return;
    }

    renderProduct(product);
  }

  function start() {
    var ready = window.PrimeCoreStore && window.PrimeCoreStore.ready
      ? window.PrimeCoreStore.ready
      : Promise.resolve();

    ready.then(init, init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
