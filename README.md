# Luna & Loom - Accessories Store

Luna & Loom is a responsive front-end e-commerce project for browsing and shopping for fashion accessories. It is built with HTML, CSS, and vanilla JavaScript, with locally stored product images and browser `localStorage` for cart and wishlist data.

## Live website

[https://as-0607.github.io/accessories_site/](https://as-0607.github.io/accessories_site/)

## Features

- Responsive storefront with a text-only Luna & Loom wordmark.
- Homepage hero, category links, featured products, and product catalog.
- Live product search, category and price filters, stock filter, sorting, active filter chips, and load more.
- Product detail dialogs and product cards with wishlist and add-to-cart controls.
- Persistent cart with quantity controls, item removal, subtotal, shipping, and total calculations.
- Persistent wishlist and live cart/wishlist counts.
- Registration and login demo pages.
- Mobile navigation, keyboard focus styles, semantic labels, and reduced-motion support.
- Checkout demo placeholder; no real order or payment is processed.

## Run locally

Run a static web server from the project directory. For example:

```powershell
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). You can also use the VS Code Live Server extension. Use a local server instead of opening `index.html` directly as a `file://` URL so the browser can share `localStorage` across pages.

No build step or package installation is required.

## Project structure

- `index.html` - storefront homepage and catalog
- `cart.html` - shopping cart and wishlist
- `login.html` / `register.html` - local account demo
- `css/` - storefront styles and bundled stylesheets
- `JS/` - catalog, shared storage, cart, and account scripts
- `images/` - product photography

## Limitations

Account details and shopping data are stored in the current browser only. Authentication is for demonstration and is not secure. Checkout is a frontend placeholder; the project has no backend, database, or payment integration.
