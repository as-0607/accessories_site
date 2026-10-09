const productCatalog = [
  { id: 1, name: 'Golden Timepiece', price: 400, category: 'watches', url: 'prod1.png', description: 'Classic gold finish with an elegant silhouette built for elevated everyday styling.', inStock: true, originalPrice: 480, badge: 'Best seller' },
  { id: 2, name: 'Silver Halo Necklace', price: 150, category: 'Necklace', url: 'prod2.png', description: 'A lightweight layered necklace with a refined luminous finish and versatile styling.', inStock: true, originalPrice: 190, badge: 'New' },
  { id: 3, name: 'Gold Bloom Earrings', price: 200, category: 'Earrings', url: 'prod3.png', description: 'Statement earrings designed to add subtle sparkle to work-day and evening looks.', inStock: false, originalPrice: 240, badge: 'Limited' },
  { id: 4, name: 'Midnight Chronograph', price: 350, category: 'watches', url: 'prod4.png', description: 'A sleek dark leather watch with precision details for polished everyday wear.', inStock: true, originalPrice: 420, badge: 'Sale' },
  { id: 5, name: 'Silver Set Rings', price: 580, category: 'Rings', url: 'prod5.png', description: 'Matching ring silhouettes with a luxe, stackable finish for statement styling.', inStock: true, originalPrice: 640, badge: 'Featured' },
  { id: 6, name: 'Pearl Charm Necklace', price: 180, category: 'Necklace', url: 'prod6.png', description: 'A soft pearl-inspired necklace that brings subtle elegance to any outfit.', inStock: true, originalPrice: 230, badge: 'Fresh drop' },
  { id: 7, name: 'Onyx Cuff Bracelet', price: 100, category: 'Bracelet', url: 'prod7.png', description: 'A refined bracelet with a dark polished finish for everyday sophistication.', inStock: true, originalPrice: 130, badge: 'Bestseller' },
  { id: 8, name: 'Luna Layered Set', price: 500, category: 'Necklace', url: 'prod8.png', description: 'A thoughtfully layered jewel set made to anchor dresses, blazers, and casual pieces.', inStock: true, originalPrice: 620, badge: 'Luxury' },
  { id: 9, name: 'Gold Link Bracelet', price: 300, category: 'Bracelet', url: 'prod9.png', description: 'Warm gold tones with a contemporary chain design that works from day to night.', inStock: true, originalPrice: 360, badge: 'Trending' }
];

const catalogState = {
  search: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
  stockOnly: false,
  sort: 'featured',
  visibleCount: 6
};

function initializeCatalogPage() {
  if (!document.getElementById('productGrid')) return;
  bindCatalogEvents();
  setLoginState();
  initHeaderButtons();
  renderCatalog();
  renderMiniCart();
  updateHeaderCounters();
}

function bindCatalogEvents() {
  const headerSearch = document.getElementById('headerSearch');
  const catalogSearch = document.getElementById('catalogSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const stockOnly = document.getElementById('stockOnly');
  const sortSelect = document.getElementById('sortSelect');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const clearFiltersBtn = document.getElementById('clearFilters');
  const clearSearchBtn = document.getElementById('clearSearch');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const cartTrigger = document.getElementById('cartTrigger');
  const closeCartDrawer = document.getElementById('closeCartDrawer');
  const cartDrawer = document.getElementById('cartDrawer');
  const favoriteTrigger = document.getElementById('favoriteTrigger');
  const modal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');

  if (headerSearch) {
    headerSearch.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      catalogState.search = value;
      if (catalogSearch) catalogSearch.value = value;
      renderCatalog();
    });
  }

  if (catalogSearch) {
    catalogSearch.addEventListener('input', (event) => {
      catalogState.search = event.target.value.trim();
      if (headerSearch) headerSearch.value = catalogState.search;
      renderCatalog();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (event) => {
      catalogState.category = event.target.value;
      renderCatalog();
    });
  }

  if (minPrice) {
    minPrice.addEventListener('input', (event) => {
      catalogState.minPrice = event.target.value;
      renderCatalog();
    });
  }

  if (maxPrice) {
    maxPrice.addEventListener('input', (event) => {
      catalogState.maxPrice = event.target.value;
      renderCatalog();
    });
  }

  if (stockOnly) {
    stockOnly.addEventListener('change', (event) => {
      catalogState.stockOnly = event.target.checked;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
      catalogState.sort = event.target.value;
      renderCatalog();
    });
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      catalogState.search = '';
      catalogState.category = 'all';
      catalogState.minPrice = '';
      catalogState.maxPrice = '';
      catalogState.stockOnly = false;
      catalogState.sort = 'featured';
      catalogState.visibleCount = 6;
      applyFilterControls();
      renderCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      catalogState.search = '';
      applyFilterControls();
      renderCatalog();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      catalogState.visibleCount += 6;
      renderCatalog();
    });
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      if (nav) nav.classList.toggle('mobile-open');
      mobileMenuButton.classList.toggle('open');
    });
  }

  if (cartTrigger) {
    cartTrigger.addEventListener('click', () => {
      if (cartDrawer) cartDrawer.classList.toggle('open');
    });
  }

  if (closeCartDrawer) {
    closeCartDrawer.addEventListener('click', () => {
      if (cartDrawer) cartDrawer.classList.remove('open');
    });
  }

  if (favoriteTrigger) {
    favoriteTrigger.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target.dataset.closeModal === 'true') {
        modal.classList.add('hidden');
      }
    });
  }

  document.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-product-action]');
    if (!actionButton) return;

    const productId = Number(actionButton.dataset.productId);
    const action = actionButton.dataset.productAction;

    if (action === 'favorite') {
      toggleFavorite(productId);
      return;
    }

    if (action === 'details') {
      openProductModal(productId);
      return;
    }

    if (action === 'add-cart') {
      addProductToCart(productId);
    }
  });

  document.addEventListener('click', (event) => {
    const cartControl = event.target.closest('[data-cart-action]');
    if (!cartControl) return;
    updateCartQuantity(Number(cartControl.dataset.productId), cartControl.dataset.cartAction);
  });

  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      catalogState.category = card.dataset.category;
      applyFilterControls();
      renderCatalog();
    });
  });
}

function applyFilterControls() {
  const categoryFilter = document.getElementById('categoryFilter');
  const catalogSearch = document.getElementById('catalogSearch');
  const headerSearch = document.getElementById('headerSearch');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const stockOnly = document.getElementById('stockOnly');
  const sortSelect = document.getElementById('sortSelect');

  if (categoryFilter) categoryFilter.value = catalogState.category;
  if (catalogSearch) catalogSearch.value = catalogState.search;
  if (headerSearch) headerSearch.value = catalogState.search;
  if (minPrice) minPrice.value = catalogState.minPrice;
  if (maxPrice) maxPrice.value = catalogState.maxPrice;
  if (stockOnly) stockOnly.checked = catalogState.stockOnly;
  if (sortSelect) sortSelect.value = catalogState.sort;
}

function getFilteredProducts() {
  let filtered = [...productCatalog];
  const searchTerm = catalogState.search.toLowerCase();

  if (searchTerm) {
    filtered = filtered.filter((product) => {
      const haystack = [product.name, product.category, product.description].join(' ').toLowerCase();
      return haystack.includes(searchTerm);
    });
  }

  if (catalogState.category !== 'all') {
    filtered = filtered.filter((product) => product.category === catalogState.category);
  }

  const min = Number(catalogState.minPrice || 0);
  const max = Number(catalogState.maxPrice || Number.MAX_SAFE_INTEGER);
  filtered = filtered.filter((product) => product.price >= min && product.price <= max);

  if (catalogState.stockOnly) {
    filtered = filtered.filter((product) => product.inStock);
  }

  switch (catalogState.sort) {
    case 'low-high':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
    default:
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
      break;
  }

  return filtered;
}

function renderCatalog() {
  const productGrid = document.getElementById('productGrid');
  const resultsCount = document.getElementById('resultsCount');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const activeFilters = document.getElementById('activeFilters');

  applyFilterControls();
  if (loadingState) loadingState.classList.remove('hidden');

  setTimeout(() => {
    if (loadingState) loadingState.classList.add('hidden');
    const filteredProducts = getFilteredProducts();
    const visibleProducts = filteredProducts.slice(0, catalogState.visibleCount);

    if (resultsCount) resultsCount.textContent = String(filteredProducts.length);
    if (productGrid) productGrid.innerHTML = visibleProducts.length ? visibleProducts.map(createProductCard).join('') : '';
    if (emptyState) emptyState.classList.toggle('hidden', visibleProducts.length > 0);
    if (loadMoreBtn) loadMoreBtn.classList.toggle('hidden', filteredProducts.length <= visibleProducts.length);

    if (activeFilters) {
      activeFilters.innerHTML = buildActiveFilterChips();
      activeFilters.querySelectorAll('button[data-remove-filter]').forEach((button) => {
        button.addEventListener('click', () => {
          const filterType = button.dataset.removeFilter;
          if (filterType === 'search') catalogState.search = '';
          if (filterType === 'category') catalogState.category = 'all';
          if (filterType === 'min') catalogState.minPrice = '';
          if (filterType === 'max') catalogState.maxPrice = '';
          if (filterType === 'stock') catalogState.stockOnly = false;
          applyFilterControls();
          renderCatalog();
        });
      });
    }
  }, 150);
}

function buildActiveFilterChips() {
  const chips = [];
  if (catalogState.search) chips.push(`<button type="button" class="filter-chip" data-remove-filter="search">Search: ${escapeHtml(catalogState.search)} ×</button>`);
  if (catalogState.category !== 'all') chips.push(`<button type="button" class="filter-chip" data-remove-filter="category">Category: ${escapeHtml(catalogState.category)} ×</button>`);
  if (catalogState.minPrice) chips.push(`<button type="button" class="filter-chip" data-remove-filter="min">Min: ${escapeHtml(catalogState.minPrice)} ×</button>`);
  if (catalogState.maxPrice) chips.push(`<button type="button" class="filter-chip" data-remove-filter="max">Max: ${escapeHtml(catalogState.maxPrice)} ×</button>`);
  if (catalogState.stockOnly) chips.push('<button type="button" class="filter-chip" data-remove-filter="stock">In stock ×</button>');
  return chips.length ? chips.join('') : '<span class="filter-none">No active filters</span>';
}

function createProductCard(product) {
  const isFavorite = getFavorites().some((item) => Number(item.id) === Number(product.id));
  const isInCart = getCart().some((item) => Number(item.id) === Number(product.id));
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return `
    <article class="product-card">
      <div class="product-card-image-wrap">
        ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ''}
        ${discount > 0 ? `<span class="product-badge sale-badge">-${discount}%</span>` : ''}
        <img src="images/${product.url}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <div class="product-topline">
          <span class="category-label">${escapeHtml(product.category)}</span>
          <button type="button" class="favorite-toggle ${isFavorite ? 'active' : ''}" data-product-action="favorite" data-product-id="${product.id}" aria-label="${isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <div class="product-price-row">
          <div>
            <span class="current-price">${formatCurrency(product.price)}</span>
            ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
          </div>
          <span class="stock-pill ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? 'In stock' : 'Sold out'}</span>
        </div>
        <div class="product-actions">
          <button type="button" class="add-cart-button ${isInCart ? 'in-cart' : ''}" data-product-action="add-cart" data-product-id="${product.id}" ${product.inStock ? '' : 'disabled'}>${product.inStock ? (isInCart ? 'Added' : 'Add to cart') : 'Sold out'}</button>
          <button type="button" class="details-button" data-product-action="details" data-product-id="${product.id}">Details</button>
        </div>
      </div>
    </article>
  `;
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const match = favorites.some((item) => Number(item.id) === Number(productId));
  const product = productCatalog.find((item) => Number(item.id) === Number(productId));

  const updatedFavorites = match
    ? favorites.filter((item) => Number(item.id) !== Number(productId))
    : [...favorites, product].filter(Boolean);

  saveFavorites(updatedFavorites);
  updateHeaderCounters();
  renderCatalog();
  renderMiniCart();
}

function renderMiniCart() {
  const miniCartItems = document.getElementById('miniCartItems');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const cartDrawer = document.getElementById('cartDrawer');
  const cart = getCart();

  if (drawerSubtotal) drawerSubtotal.textContent = formatCurrency(getCartTotal(cart));
  if (!miniCartItems) return;

  if (!cart.length) {
    miniCartItems.innerHTML = '<p class="mini-cart-empty">Your cart is empty.</p>';
    if (cartDrawer) cartDrawer.classList.remove('open');
    return;
  }

  miniCartItems.innerHTML = cart.map((item) => `
    <div class="mini-cart-item">
      <div class="mini-cart-image"><img src="images/${item.url}" alt="${escapeHtml(item.name)}" /></div>
      <div class="mini-cart-info">
        <h4>${escapeHtml(item.name)}</h4>
        <p>${formatCurrency(item.price)} each</p>
        <div class="mini-cart-controls">
          <button type="button" data-cart-action="decrease" data-product-id="${item.id}" aria-label="Decrease quantity">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-action="increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function initHeaderButtons() {
  const navLogin = document.querySelector('[data-nav="login"]');
  const navRegister = document.querySelector('[data-nav="register"]');
  const logoutBtn = document.getElementById('logoutBtn');

  if (navLogin) navLogin.addEventListener('click', () => (window.location.href = 'login.html'));
  if (navRegister) navRegister.addEventListener('click', () => (window.location.href = 'register.html'));
  if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
}

function openProductModal(productId) {
  const product = productCatalog.find((item) => Number(item.id) === Number(productId));
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  if (!product || !modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-image-wrap"><img src="images/${product.url}" alt="${escapeHtml(product.name)}" /></div>
    <div class="modal-copy">
      <span class="modal-category">${escapeHtml(product.category)}</span>
      <h3 id="modalTitle">${escapeHtml(product.name)}</h3>
      <div class="price-meta"><span>${formatCurrency(product.price)}</span>${product.originalPrice ? `<small>${formatCurrency(product.originalPrice)}</small>` : ''}</div>
      <p>${escapeHtml(product.description)}</p>
      <div class="modal-meta-row">
        <span class="stock-pill ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? 'Available now' : 'Sold out'}</span>
        ${product.badge ? `<span class="modal-badge">${escapeHtml(product.badge)}</span>` : ''}
      </div>
      <button type="button" class="add-cart-button modal-action" data-product-action="add-cart" data-product-id="${product.id}">Add to cart</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', initializeCatalogPage);
