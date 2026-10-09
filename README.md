# Luna & Loom

A responsive accessories storefront built with HTML, CSS, and vanilla JavaScript.

## Run locally

Serve the project directory with a static file server, then open its `index.html` URL. For example, run `python -m http.server 8000` from the project directory and visit `http://localhost:8000`. Avoid opening the HTML files directly as `file://` URLs: browsers can isolate `localStorage` between separate files, which prevents the cart and wishlist from being shared across pages. No build step or package installation is required.

## Features

- Responsive home page, category cards, featured products, and product catalog.
- Product search, category and price filters, stock filter, sorting, active filter chips, and load more.
- Product details dialog and local product photography.
- Persistent shopping cart and wishlist using `localStorage`.
- Cart quantity controls, removal, order summary, and demo checkout message.
- Local registration and login demo using browser storage.
- Mobile navigation, keyboard focus styles, semantic labels, and reduced-motion support.

## Notes

Account and checkout flows are frontend demos. They do not use a server, secure authentication, or payment processing. Product photos are stored in `images/` and are loaded locally. Google Fonts are an optional external font enhancement; system fallbacks are defined in the stylesheet.
