from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / "docs" / "PROJECT_DOCUMENTATION.md"
MARKER = "# APPENDIX D: SOURCE CODE AND REPOSITORY INVENTORY"


def code_listing(path: Path, title: str, limit: int | None = None) -> str:
    text = path.read_text(encoding="utf-8", errors="replace")
    if limit is not None:
        lines = text.splitlines()
        text = "\n".join(lines[:limit])
        if len(lines) > limit:
            text += "\n\n// Listing shortened here; the complete source remains in the repository.\n"
    language = "javascript" if path.suffix in {".js", ".jsx"} else "json"
    return f"\n## {title}\n\nSource: `{path.relative_to(ROOT)}`\n\n```{language}\n{text}\n```\n"


def build():
    base = DOC.read_text(encoding="utf-8")
    if MARKER in base:
        base = base.split(MARKER, 1)[0].rstrip() + "\n"

    appendix = f"""

{MARKER}

This appendix records the implementation evidence used to prepare the report. It is included to provide the same source-code and technical-documentation depth expected in the reference report. The listings are intentionally tied to the current repository and should be regenerated after major source changes.

## D.1 Repository File Inventory

| Area | Files | Responsibility |
|---|---|---|
| Backend | `backend/server.js` | Express application, authentication, catalogue, delivery, orders, seller, admin and reviews |
| Backend data | `backend/data.json` | Prototype categories, products, users, orders, reviews and settings |
| Backend assets | `backend/images/` | Locally served product images |
| Frontend shell | `frontend/src/main.jsx`, `frontend/src/App.jsx` | Browser entry point, providers and view selection |
| Frontend state | `frontend/src/context/*.jsx` | Authentication, catalogue and shopping state |
| Frontend components | `frontend/src/components/*.jsx` | Catalogue, cart, checkout, map, dashboards and modals |
| Frontend pages | `frontend/src/pages/LoginPage.jsx` | Login and registration experience |
| Styles | `frontend/src/index.css` | Global visual rules and Tailwind integration |
| Catalogue generator | `scripts/build_mega_catalog_complete.js` | Categories, image sources and product seed data |

## D.2 Current Repository Measurements

The current data file contains six categories, 140 products, three orders, one review and four users. The product schema includes identity, pricing, discount, rating, stock, delivery, image, nursery and plant-care fields. Orders include customer contact, address, coordinates, item snapshots, totals, payment information, status and tracking history.

The frontend contains the following major components: `AdminDashboard`, `CareGuideBadge`, `CartDrawer`, `CheckoutModal`, `DeliveryMap`, `Footer`, `HeroBanner`, `LocationPickerModal`, `LoginModal`, `Navbar`, `OrderTrackingModal`, `ProductCard`, `ProductDetailModal`, `SellerDashboard` and `VivaGuideModal`.

## D.3 Backend Source Listing: Server Entry and Helpers
"""

    source_files = [
        (ROOT / "backend" / "server.js", "D.3 Backend Server", None),
        (ROOT / "frontend" / "src" / "App.jsx", "D.4 React Application Shell", None),
        (ROOT / "frontend" / "src" / "context" / "AuthContext.jsx", "D.5 Authentication Context", None),
        (ROOT / "frontend" / "src" / "context" / "ProductContext.jsx", "D.6 Product Context", None),
        (ROOT / "frontend" / "src" / "context" / "CartContext.jsx", "D.7 Cart and Pricing Context", None),
        (ROOT / "frontend" / "src" / "components" / "CheckoutModal.jsx", "D.8 Checkout Implementation", 360),
        (ROOT / "frontend" / "src" / "components" / "DeliveryMap.jsx", "D.9 Delivery Map Implementation", 340),
        (ROOT / "frontend" / "src" / "components" / "SellerDashboard.jsx", "D.10 Seller Dashboard", 360),
        (ROOT / "frontend" / "src" / "components" / "AdminDashboard.jsx", "D.11 Admin Dashboard", 360),
        (ROOT / "frontend" / "src" / "components" / "ProductCard.jsx", "D.12 Product Card", None),
        (ROOT / "frontend" / "src" / "components" / "ProductDetailModal.jsx", "D.13 Product Detail Modal", None),
        (ROOT / "frontend" / "src" / "components" / "CartDrawer.jsx", "D.14 Cart Drawer", 420),
        (ROOT / "frontend" / "src" / "components" / "OrderTrackingModal.jsx", "D.15 Order Tracking Modal", 420),
        (ROOT / "frontend" / "src" / "components" / "Navbar.jsx", "D.16 Navigation Bar", None),
        (ROOT / "frontend" / "src" / "pages" / "LoginPage.jsx", "D.17 Login Page", None),
        (ROOT / "frontend" / "src" / "main.jsx", "D.18 Frontend Entry Point", None),
        (ROOT / "frontend" / "src" / "index.css", "D.19 Global Styles", 500),
        (ROOT / "backend" / "package.json", "D.20 Backend Package Manifest", None),
        (ROOT / "frontend" / "package.json", "D.21 Frontend Package Manifest", None),
    ]
    for path, title, limit in source_files:
        if path.exists():
            appendix += code_listing(path, title, limit)

    appendix += """

## D.12 API Error and Status Catalogue

| Status | Meaning in Vruksha |
|---|---|
| 200 | Read or update completed |
| 201 | Registration, order, product or review created |
| 400 | Missing, invalid or incomplete input |
| 401 | Missing or invalid authentication |
| 404 | Product, order or resource not found |
| 503 | Optional external integration is not configured |

## D.13 Operational Workflow Narratives

### Customer purchase workflow

The customer enters through the login page, where an existing profile can be restored from local storage. After authentication, `ProductProvider` loads categories and products. A search term is encoded into the catalogue request and the backend searches name, description and nursery fields. Category, price, sunlight, water and sort controls are sent as query parameters. The resulting cards are rendered in a responsive grid.

The product modal reads the selected product from shared context and exposes its care information. Adding an item calls `addToCart`, which merges an existing item or creates a new cart line. The cart context immediately recalculates subtotal and category-specific handling. The checkout modal then adds distance and service rules, checks serviceability and submits the order.

### Seller fulfilment workflow

The seller dashboard loads the current catalogue and order list. The product tab gives a compact inventory view. The add tab sends a product payload to the seller product endpoint. The orders tab displays customer and shipping information, including distance, plantation selection and total. A status change sends a PUT request and appends a tracking history item on the server.

### Administrative workflow

The admin dashboard loads settings and orders in parallel. Product pricing uses a per-product edit state. Delivery configuration is represented as nested office, delivery and hubs objects. Saving settings sends the complete object to the admin settings endpoint. Product deletion and order status operations refresh the visible state after a successful response.

## D.14 Design Decisions

1. A single Express server was chosen for the academic prototype so that the API can be started with one command.
2. JSON persistence was chosen to reduce installation friction and make demo data inspectable.
3. React Context was chosen because authentication, products and cart state are shared across many components.
4. Leaflet was chosen because the project needs markers, route lines, draggable points and distance display without a proprietary map SDK.
5. Delivery pricing is duplicated in client and server calculations so that the interface is responsive while the persisted order is calculated on the server.
6. A fallback order is retained for demonstration resilience, but production should replace it with a retry and reconciliation design.
7. Care information is stored as structured fields so it can later support reminders, recommendations and plant-health workflows.

## D.15 Traceability Matrix

| Requirement | Frontend evidence | Backend evidence |
|---|---|---|
| Product search | `ProductContext`, navbar search | `GET /api/products` |
| Care information | `ProductDetailModal`, `CareGuideBadge` | Product `careGuide` fields |
| Persistent cart | `CartContext` local storage effects | Order receives item snapshot |
| Serviceability | `CheckoutModal` branch panel | `GET /api/delivery/serviceability` |
| Distance pricing | `DeliveryMap`, `CartContext` | Order calculation in `server.js` |
| Checkout | `CheckoutModal` | `POST /api/orders` |
| Tracking | `OrderTrackingModal` | `GET /api/orders/:id` |
| Seller products | `SellerDashboard` | `POST /api/seller/products` |
| Seller fulfilment | Seller order selector | `PUT /api/seller/orders/:id/status` |
| Admin controls | `AdminDashboard` tabs | Admin product/settings endpoints |
| Reviews | Product detail review flow | Review GET and POST endpoints |

## D.16 Recommended Evidence to Add Before Submission

The running application should be captured at the following sizes before academic submission: login page, catalogue page, product details, cart, checkout with serviceability, map location picker, order confirmation, order tracking, seller inventory, seller order management, admin catalogue, admin delivery settings and admin hub management. Each screenshot should be numbered and referenced in Chapter 7. The student identity, institution, guide, certificate signatures and declaration dates should also be filled before printing.
"""
    DOC.write_text(base + appendix, encoding="utf-8")


if __name__ == "__main__":
    build()
