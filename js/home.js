(function () {
  'use strict';

  function initHome() {
    var prices = window.PrimeCorePrices;

    function formatPrice(amount, currency) {
      return prices ? prices.formatPrice(amount, currency) : ((Number(amount) || 0) + ' ' + (currency || 'SAR'));
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

    /* ===== FEATURED PRODUCTS ===== */
    var featuredGrid = document.getElementById('featured-products-grid');

    if (featuredGrid && typeof products !== 'undefined') {
      var featuredProducts = [];
      for (var i = 0; i < products.length; i++) {
        if (products[i].featured) {
          featuredProducts.push(products[i]);
        }
        if (featuredProducts.length === 4) break;
      }

      for (var j = 0; j < featuredProducts.length; j++) {
        var p = featuredProducts[j];
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

        var desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = p.shortDescription;

        var priceDiv = document.createElement('div');
        priceDiv.className = 'card-price';
        priceDiv.textContent = priceFormatted;

        var link = document.createElement('a');
        link.href = 'product-details.html?id=' + p.id;
        link.className = 'card-link';
        link.textContent = '\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u2190';

        card.appendChild(imgWrapper);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(priceDiv);
        card.appendChild(link);

        featuredGrid.appendChild(card);
      }
    }

    /* ===== FEATURED PACKAGES ===== */
    var packagesGrid = document.getElementById('featured-packages-grid');

    if (packagesGrid && typeof packages !== 'undefined') {
      var featuredPackages = [];
      for (var k = 0; k < packages.length; k++) {
        if (packages[k].featured) {
          featuredPackages.push(packages[k]);
        }
        if (featuredPackages.length === 2) break;
      }

      for (var l = 0; l < featuredPackages.length; l++) {
        var pkg = featuredPackages[l];
        var pkgCard = document.createElement('div');
        pkgCard.className = 'package-card featured';

        var pkgBadge = document.createElement('span');
        pkgBadge.className = 'pkg-badge';
        pkgBadge.textContent = '\u0628\u0627\u0642\u0629 \u0645\u0645\u064a\u0632\u0629';

        var pkgType = document.createElement('div');
        pkgType.className = 'pkg-type';
        pkgType.textContent = pkg.type;

        var pkgName = document.createElement('h3');
        pkgName.textContent = pkg.name;

        var pkgSpeed = document.createElement('div');
        pkgSpeed.className = 'pkg-speed';
        pkgSpeed.textContent = pkg.speed + ' \u2014 ' + pkg.dataLimit;

        var pkgPrice = document.createElement('div');
        pkgPrice.className = 'pkg-price';
        var pkgPriceText = document.createTextNode(formatPrice(pkg.priceMonthly, pkg.currency) + '\u00a0');
        var pkgPriceLabel = document.createElement('span');
        pkgPriceLabel.textContent = '/ \u0634\u0647\u0631';
        pkgPrice.appendChild(pkgPriceText);
        pkgPrice.appendChild(pkgPriceLabel);

        var featuresList = document.createElement('ul');
        featuresList.className = 'package-features';

        for (var m = 0; m < pkg.features.length; m++) {
          var li = document.createElement('li');
          li.textContent = pkg.features[m];
          featuresList.appendChild(li);
        }

        var pkgBtn = document.createElement('a');
        pkgBtn.href = 'https://wa.me/1234567890?text=' + encodeURIComponent(
          'Hello PrimeCore, I am interested in the ' + pkg.name + ' plan (' + pkg.speed + '). Please share more details.'
        );
        pkgBtn.target = '_blank';
        pkgBtn.rel = 'noopener noreferrer';
        pkgBtn.className = 'btn btn-gradient';
        pkgBtn.textContent = '\u0627\u0634\u062a\u0631\u0643 \u0627\u0644\u0622\u0646';

        pkgCard.appendChild(pkgBadge);
        pkgCard.appendChild(pkgType);
        pkgCard.appendChild(pkgName);
        pkgCard.appendChild(pkgSpeed);
        pkgCard.appendChild(pkgPrice);
        pkgCard.appendChild(featuresList);
        pkgCard.appendChild(pkgBtn);

        packagesGrid.appendChild(pkgCard);
      }
    }

  }

  function start() {
    var ready = window.PrimeCoreStore && window.PrimeCoreStore.ready
      ? window.PrimeCoreStore.ready
      : Promise.resolve();

    ready.then(initHome, initHome);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
