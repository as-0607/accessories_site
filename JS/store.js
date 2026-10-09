const STORAGE_KEYS = {
  cart: "ProductsInCart",
  favorites: "favorites",
  counter: "counter",
  totalPrice: "totalPrice",
  user: "firstName",
  email: "email"
};

function safeParseJSON(value, fallback) {
  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function formatCurrency(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCart() {
  const value = safeParseJSON(localStorage.getItem(STORAGE_KEYS.cart), []);
  return Array.isArray(value) ? value : [];
}

function saveCart(cartItems) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
  const totalQty = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  localStorage.setItem(STORAGE_KEYS.counter, String(totalQty));
  localStorage.setItem(STORAGE_KEYS.totalPrice, String(getCartTotal(cartItems)));
}

function getCartTotal(cartItems = getCart()) {
  return cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
}

function getFavorites() {
  const value = safeParseJSON(localStorage.getItem(STORAGE_KEYS.favorites), []);
  return Array.isArray(value) ? value : [];
}

function saveFavorites(items) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(items));
}

function updateHeaderCounters() {
  const cartCount = document.getElementById("cartCount");
  const favoriteCount = document.getElementById("favoriteCount");
  const cart = getCart();
  const favorites = getFavorites();

  if (cartCount) {
    cartCount.textContent = String(cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
  }
  if (favoriteCount) favoriteCount.textContent = String(favorites.length);
  setLoginState();
}

function addProductToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => Number(item.id) === Number(productId));
  const catalogProduct = typeof productCatalog !== "undefined"
    ? productCatalog.find((item) => Number(item.id) === Number(productId))
    : null;
  const favoriteProduct = getFavorites().find((item) => Number(item.id) === Number(productId));
  const product = catalogProduct || favoriteProduct;

  if (!product || product.inStock === false) return;

  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateHeaderCounters();
  if (typeof renderCatalog === "function") renderCatalog();
  if (typeof renderMiniCart === "function") renderMiniCart();
  if (typeof initializeCartPage === "function") initializeCartPage();
}

function updateCartQuantity(productId, action) {
  const cart = getCart();
  const selectedItem = cart.find((item) => Number(item.id) === Number(productId));
  if (!selectedItem) return;

  if (action === "increase") {
    selectedItem.quantity = Number(selectedItem.quantity || 1) + 1;
  } else if (action === "decrease") {
    selectedItem.quantity = Number(selectedItem.quantity || 1) - 1;
    if (selectedItem.quantity <= 0) {
      saveCart(cart.filter((item) => Number(item.id) !== Number(productId)));
      updateHeaderCounters();
      if (typeof renderMiniCart === "function") renderMiniCart();
      if (typeof initializeCartPage === "function") initializeCartPage();
      return;
    }
  } else {
    return;
  }

  saveCart(cart);
  updateHeaderCounters();
  if (typeof renderMiniCart === "function") renderMiniCart();
  if (typeof initializeCartPage === "function") initializeCartPage();
}

function getCurrentUser() {
  return localStorage.getItem(STORAGE_KEYS.user) || "";
}

function setLoginState() {
  const userName = getCurrentUser();
  const userBadge = document.getElementById("userBadge");
  const authControls = document.getElementById("authControls");

  if (!userName) {
    if (authControls) authControls.classList.remove("hidden");
    if (userBadge) userBadge.classList.add("hidden");
    return false;
  }

  if (authControls) authControls.classList.add("hidden");
  if (userBadge) {
    const usernameLabel = document.getElementById("usernameLabel");
    if (usernameLabel) usernameLabel.textContent = `Hello, ${userName}`;
    userBadge.classList.remove("hidden");
  }

  return true;
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.email);
  localStorage.removeItem(STORAGE_KEYS.totalPrice);
  localStorage.removeItem(STORAGE_KEYS.counter);
  localStorage.removeItem(STORAGE_KEYS.cart);
  localStorage.removeItem(STORAGE_KEYS.favorites);
  window.location.href = "login.html";
}
