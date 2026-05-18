(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

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
        pkgBadge.textContent = 'Featured Plan';

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
        var pkgPriceText = document.createTextNode('$' + pkg.priceMonthly + '\u00a0');
        var pkgPriceLabel = document.createElement('span');
        pkgPriceLabel.textContent = '/ month';
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
        pkgBtn.textContent = 'Subscribe Now';

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

  });

})();
