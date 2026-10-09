function initializeCartPage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const subtotalValue = document.getElementById('subtotalValue');
  const shippingValue = document.getElementById('shippingValue');
  const totalValue = document.getElementById('totalValue');
  const wishlistGrid = document.getElementById('wishlistGrid');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const favoriteTrigger = document.getElementById('favoriteTrigger');
  const cartTrigger = document.getElementById('cartTrigger');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!cartItemsContainer && !wishlistGrid) return;

  const cart = getCart();
  const favorites = getFavorites();

  setLoginState();
  updateHeaderCounters();

  if (favoriteTrigger) {
    favoriteTrigger.addEventListener('click', () => {
      window.location.href = 'index.html#shop';
    });
  }

  if (cartTrigger) {
    cartTrigger.addEventListener('click', () => {
      window.location.href = 'index.html#shop';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }

  if (clearCartBtn && !clearCartBtn.dataset.bound) {
    clearCartBtn.dataset.bound = 'true';
    clearCartBtn.addEventListener('click', () => {
      if (!getCart().length) return;
      saveCart([]);
      updateHeaderCounters();
      initializeCartPage();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout is a placeholder for this storefront demo.');
    });
  }

  const subtotal = getCartTotal(cart);
  const shipping = cart.length ? 12 : 0;
  const total = subtotal + shipping;

  if (subtotalValue) subtotalValue.textContent = formatCurrency(subtotal);
  if (shippingValue) shippingValue.textContent = formatCurrency(shipping);
  if (totalValue) totalValue.textContent = formatCurrency(total);

  if (cartItemsContainer) {
    if (!cart.length) {
      cartItemsContainer.innerHTML = '';
      cartItemsContainer.classList.add('hidden');
      if (cartEmptyState) cartEmptyState.classList.remove('hidden');
    } else {
      cartItemsContainer.classList.remove('hidden');
      if (cartEmptyState) cartEmptyState.classList.add('hidden');
      cartItemsContainer.innerHTML = cart.map((item) => `
        <article class="cart-item-card">
          <div class="cart-item-image">
            <img src="images/${escapeHtml(item.url)}" alt="${escapeHtml(item.name)}" />
          </div>
          <div class="cart-item-copy">
            <div class="cart-item-head">
              <div>
                <h3>${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.category)}</p>
              </div>
              <button type="button" class="remove-item" data-cart-action="remove" data-product-id="${item.id}">Remove</button>
            </div>
            <div class="cart-item-meta">
              <div class="qty-control">
                <button type="button" aria-label="Decrease quantity" data-cart-action="decrease" data-product-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button type="button" aria-label="Increase quantity" data-cart-action="increase" data-product-id="${item.id}">+</button>
              </div>
              <strong>${formatCurrency(Number(item.price) * Number(item.quantity))}</strong>
            </div>
          </div>
        </article>
      `).join('');
    }
  }

  if (wishlistGrid) {
    if (!favorites.length) {
      wishlistGrid.innerHTML = '<div class="wishlist-empty">No saved items yet.</div>';
    } else {
      wishlistGrid.innerHTML = favorites.map((item) => `
        <article class="wishlist-card">
          <div class="wishlist-image">
            <img src="images/${item.url}" alt="${escapeHtml(item.name)}" />
          </div>
          <div class="wishlist-copy">
            <h3>${escapeHtml(item.name)}</h3>
            <p>${formatCurrency(item.price)}</p>
            <div class="wishlist-actions">
              <button type="button" class="secondary-cta small" data-wishlist-action="add-cart" data-product-id="${item.id}">Add to cart</button>
              <button type="button" class="text-button" data-wishlist-action="remove" data-product-id="${item.id}">Remove</button>
            </div>
          </div>
        </article>
      `).join('');
    }
  }

  if (cartItemsContainer && !cartItemsContainer.dataset.bound) {
    cartItemsContainer.dataset.bound = 'true';
    cartItemsContainer.addEventListener('click', (event) => {
    const target = event.target.closest('[data-cart-action]');
    if (!target) return;
    const productId = Number(target.dataset.productId);
    const action = target.dataset.cartAction;

    if (action === 'remove') {
      const currentCart = getCart().filter((item) => Number(item.id) !== productId);
      saveCart(currentCart);
      updateHeaderCounters();
      initializeCartPage();
      return;
    }

    updateCartQuantity(productId, action);
    });
  }

  if (wishlistGrid && !wishlistGrid.dataset.bound) {
    wishlistGrid.dataset.bound = 'true';
    wishlistGrid.addEventListener('click', (event) => {
    const wishlistButton = event.target.closest('[data-wishlist-action]');
    if (!wishlistButton) return;
    const productId = Number(wishlistButton.dataset.productId);
    const action = wishlistButton.dataset.wishlistAction;

    if (action === 'remove') {
      const currentFavorites = getFavorites().filter((item) => Number(item.id) !== productId);
      saveFavorites(currentFavorites);
      updateHeaderCounters();
      initializeCartPage();
      return;
    }

    if (action === 'add-cart') {
      addProductToCart(productId);
    }
    });
  }
}

document.addEventListener('DOMContentLoaded', initializeCartPage);
