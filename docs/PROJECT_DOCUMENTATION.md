# A Project Report

## On

# Vruksha E-Commerce

**An Online Plants, Seeds, Fertilizers and Gardening Supplies Marketplace**

Submitted in partial fulfilment of the requirements for the award of the degree of  
**BACHELOR OF COMPUTER APPLICATIONS**

**Student:** [Student Name]  
**Register Number:** [Register Number]  
**Guide:** [Guide Name]  
**Institution:** [Institution Name]  
**Academic Year:** 2026–2027

---

## CERTIFICATE

This is to certify that the project work entitled **“Vruksha E-Commerce”**, submitted in partial fulfilment of the requirements for the award of the degree of Bachelor of Computer Applications, is a bonafide work carried out by **[Student Name]**, bearing Register Number **[Register Number]**, during the academic year 2026–2027 under the guidance of **[Guide Name]**.

**Signature of the Guide:** ____________________  
**Signature of the Head of Department:** ____________________

## DECLARATION

I, **[Student Name]**, declare that the project entitled **“Vruksha E-Commerce”** has been carried out by me under the guidance of **[Guide Name]** and is submitted in partial fulfilment of the requirements for the award of the degree of Bachelor of Computer Applications. This report has not been submitted to any other institution for the award of a degree or certificate.

**Date:** ____________________  
**Place:** ____________________  
**Signature:** ____________________

## ACKNOWLEDGEMENT

I express my sincere gratitude to the institution, department, project guide, teaching staff, colleagues and family members who supported the successful completion of the Vruksha E-Commerce project. Their suggestions, encouragement and technical feedback helped shape the requirements, implementation, testing and documentation of the system.

I especially thank the project guide for reviewing the architecture, user workflows, database decisions and security considerations. I also acknowledge the open-source communities behind React, Vite, Express, Leaflet, Lucide React, Node.js and the supporting packages used by the application.

## ABSTRACT

Vruksha E-Commerce is a full-stack web marketplace for plants, seeds, fertilizers, pots, gardening tools and related services. The system combines product discovery, horticultural care information, shopping-cart management, address serviceability, distance-based delivery pricing, checkout, multiple payment options, order tracking, nursery-vendor operations and platform administration in one responsive application.

The client application is built with React 18 and Vite. It uses React Context providers for authentication, products and cart state, Tailwind CSS for styling, Lucide React for icons and Leaflet for maps. The server is an Express application running on Node.js. Its REST endpoints provide authentication, catalogue search, order creation, delivery serviceability, seller operations, reviews, administration and health checks. The current storage layer is a JSON file (`backend/data.json`), while authentication sessions and one-time passwords are held in memory.

Customers can register or sign in with email or mobile credentials, use email OTP verification, or use the Google-login integration point. They can browse six catalogue categories, search products, filter by price, sunlight and watering needs, inspect product details and care guides, maintain a wishlist, add items to a cart, select a delivery location on a Leaflet map, request an expert plantation service and complete checkout with UPI, card or cash-on-delivery choices. A completed order receives a tracking identifier and a timeline that can be updated by the nursery or administrator.

Seller users can add products, review the product catalogue, view incoming orders and update fulfilment status. Administrators can edit or remove products, add catalogue items, update delivery rates, configure office and dispatch hubs, inspect orders and view operational metrics. The backend calculates category-specific packaging, distance-based delivery, free-delivery eligibility, plantation service charges and payment adjustments.

The report presents the problem definition, requirements, feasibility study, architecture, data design, API design, user-interface design, source-code structure, implementation, testing, security review, limitations, future scope and references for Vruksha E-Commerce.

**Keywords:** E-commerce, Nursery Marketplace, Plants, Seeds, Gardening, React, Vite, Express, Node.js, Leaflet, Delivery Tracking, Order Management, REST API.

---

# CHAPTER 1
# INTRODUCTION TO VRUKSHA E-COMMERCE

## 1.1 Introduction

Buying plants and gardening supplies traditionally involves visiting several nurseries, comparing prices manually, asking separate sellers about care requirements and arranging delivery over phone calls. Customers may not know whether a plant is suitable for the available sunlight, how often it should be watered, whether an item can be delivered to their address, or where an order currently is after purchase. Small nurseries face a similar problem: their products, orders, stock and delivery coordination are often managed through spreadsheets or messaging applications.

Vruksha E-Commerce addresses this problem through a single web application. It gives customers a searchable catalogue, structured horticultural information, cart and checkout facilities, delivery-location support and order tracking. It also gives nursery partners tools to add products and process orders, while administrators control prices, delivery configuration, inventory and dispatch hubs.

The application is designed for Indian customers and uses Indian rupees, Indian pincodes, UPI and COD terminology, distance in kilometres and nursery branches located in Indian cities. It includes a Bengaluru-based central dispatch hub and deterministic serviceability logic that maps a valid pincode or address to a branch and estimated delivery time.

## 1.2 Problem Statement

The existing gardening purchase process is fragmented:

1. Product discovery is spread across local nurseries, social-media pages and general marketplaces.
2. Product details often omit care information such as sunlight, watering schedule, pot size and sowing season.
3. Customers cannot easily compare products by category, price, plant care or rating.
4. Delivery fees are frequently calculated manually and do not reflect distance, product type or service requirements.
5. Order status is often communicated through calls or messages rather than a persistent timeline.
6. Nursery staff need a simple way to add products, process orders and update fulfilment status.
7. Administrators require central control over pricing, catalogue records, delivery rates and logistics hubs.

The project problem is therefore to build an integrated, usable and extensible marketplace that supports the complete journey from gardening-product discovery to delivery and post-purchase tracking.

## 1.3 Motivation

The motivation for Vruksha comes from the growth of home gardening, balcony gardening, indoor plants and small-scale urban cultivation. Customers increasingly expect online shopping experiences that include reliable product information, convenient payment, location-aware delivery and transparent order status. At the same time, plant products require information and logistics that differ from ordinary retail: live plants need protective packaging, pots may be fragile, fertilizers may be heavy, and customers may request planting assistance.

The project demonstrates how a modern component-based frontend and a lightweight REST backend can support these requirements without requiring a large enterprise platform. The design also keeps the domain understandable for academic study: the client, server, data store, business rules and operational dashboards are separated into visible modules.

## 1.4 Objectives

The main objectives are:

* To create a centralised marketplace for plants, seeds, fertilizers, pots and gardening tools.
* To provide category navigation, text search, sorting and horticultural filters.
* To show useful plant-care information with each product.
* To support registration, login, OTP verification and session-based access.
* To provide a persistent cart and wishlist in the browser.
* To calculate delivery charges using item type, distance and configurable rules.
* To provide delivery serviceability information from an Indian pincode or address.
* To offer UPI, card and cash-on-delivery checkout choices.
* To create order records with payment status, fulfilment status and tracking history.
* To provide live-style delivery maps using Leaflet and Haversine distance calculations.
* To allow nursery sellers to add products and update order statuses.
* To allow administrators to edit products, manage prices, configure delivery settings and maintain hubs.
* To provide review endpoints and a basis for future customer feedback features.
* To document the implementation, tests, limitations and future improvements.

## 1.5 Existing System

In the existing manual approach, a customer may identify a plant from a social-media post, contact a nursery by phone, receive an informal price, send an address through a messaging application, pay through an independent method and ask for delivery updates later. Product care instructions are inconsistent, stock may not be current, and there is no shared order history.

Nurseries also maintain separate lists for catalogue items and orders. Delivery rates are often estimated using distance, vehicle availability and product weight without a transparent rule. Managers cannot see catalogue, delivery and fulfilment data in one control panel.

## 1.6 Limitations of the Existing System

* Manual product discovery and price comparison.
* No structured care guide for every product.
* No unified cart, checkout and order tracking flow.
* Unclear delivery fee calculation.
* Limited visibility of nursery inventory and order workload.
* No central administrative settings for delivery hubs and rates.
* High dependence on telephone calls and messaging applications.
* Difficult reporting and auditing because records are distributed.

## 1.7 Proposed System

The proposed system is a responsive React/Vite client connected to an Express REST API. Product and order records are stored in a JSON database file for the current prototype. Context providers coordinate authentication, catalogue state and cart state in the browser. The server applies the domain rules for authentication, product search, order totals, serviceability, seller operations and administrative changes.

The customer workflow is:

1. Sign in or register.
2. Browse categories or search by product name, description or nursery.
3. Filter by price, sunlight and water requirement.
4. Open a product detail view and read the care guide.
5. Add the product to the cart or wishlist.
6. Review delivery distance, serviceability and charges.
7. Optionally request plantation service.
8. Select a payment mode and place the order.
9. Receive an order identifier and use the tracking view.

## 1.8 Advantages of the Proposed System

* A single catalogue for nursery products and gardening supplies.
* Better decisions through care guides and product attributes.
* Search, category filters and price sorting in one interface.
* Persistent cart and wishlist state.
* Location-aware delivery calculation and branch information.
* Order records with status history and delivery coordinates.
* Seller and administrator workflows in the same application.
* Configurable delivery fees and dispatch hubs.
* Open-source technology stack suitable for academic and prototype deployment.

## 1.9 Modules and Features

| Module | Main features |
|---|---|
| Authentication | Registration, password login, OTP verification, Google integration point, current-user lookup |
| Catalogue | Categories, product search, price filtering, sunlight filtering, watering filtering, sorting |
| Product detail | Images, nursery, price, discount, stock, rating, care guide, delivery estimate |
| Cart and wishlist | Add, remove, quantity update, clear cart, wishlist toggle, browser persistence |
| Checkout | Address, pincode, serviceability, map coordinates, payment choice, plantation service |
| Delivery | Haversine distance, branch assignment, base fee, per-kilometre fee, free delivery rule |
| Orders | Creation, payment state, fulfilment state, tracking history and order lookup |
| Seller portal | Product creation, inventory view, incoming orders, status updates |
| Admin portal | Product price editing, product deletion, product creation, delivery settings, hubs and orders |
| Reviews | Product review retrieval and submission |
| Operational support | Health endpoint, images, configurable SMTP email transport and local fallback behavior |

## 1.10 Organisation of the Report

Chapter 1 introduces Vruksha E-Commerce and its objectives. Chapter 2 describes requirements, hardware, software and technology choices. Chapter 3 presents system analysis, functional requirements, non-functional requirements, feasibility and use cases. Chapter 4 explains the architecture, data design, API design, workflows, security and interface design. Chapter 5 presents implementation details and source-code excerpts. Chapter 6 covers implementation validation and system testing. Chapter 7 describes the screens and operational flows. Chapter 8 concludes the project. Chapter 9 describes scope and future enhancements. Chapter 10 lists references.

## 1.11 Key Terms

| Term | Meaning |
|---|---|
| Catalogue | The collection of products available for browsing and sale |
| Nursery | A partner or dispatch source that supplies plant products |
| Care guide | Structured light, water, fertilizer and repotting advice |
| Serviceability | Whether a pincode or address can be mapped to a delivery branch |
| Haversine formula | A geographic formula used to estimate distance between two coordinates |
| Plantation service | Optional expert planting, soil-mix and gardener-travel service |
| Tracking history | A chronological list of order status changes |
| Seller | Nursery or partner user who adds products and processes orders |
| Admin | User responsible for catalogue, pricing, settings and operations |
| JSON persistence | Storage of application records in a JSON file |

---

# CHAPTER 2
# REQUIREMENT SPECIFICATION

## 2.1 Hardware Configuration

| Use | Recommended configuration |
|---|---|
| Customer device | Dual-core processor, 4 GB RAM, modern browser, internet connection |
| Development machine | Quad-core processor, 8 GB RAM, 10 GB free storage, Node.js 18 or newer |
| Development display | 1366 × 768 or higher; responsive testing at mobile and tablet widths |
| Server for prototype | 1 vCPU, 1 GB RAM, Node.js runtime and writable local storage |
| Production server | Managed Node.js host, persistent database, TLS certificate and media storage |

## 2.2 Software Requirements

### Client side

* Windows, macOS, Linux, Android or iOS.
* Chrome, Edge, Firefox or Safari with JavaScript enabled.
* Local storage and cookies enabled for session, cart and wishlist persistence.
* Internet access for remote images, OpenStreetMap tiles and geocoding.

### Development and server side

* Node.js 18 or newer.
* npm.
* React 18.3.1.
* Vite 5.2.11.
* Express 4.19.2.
* CORS 2.8.5.
* Nodemailer 10.x.
* Leaflet 1.9.4 and React Leaflet 4.2.1.
* Lucide React 0.380.0.
* Tailwind CSS 4 and its Vite plugin.
* A code editor such as Visual Studio Code.

## 2.3 React

React is the component library used for the user interface. Vruksha uses functional components and hooks. `App.jsx` composes `AuthProvider`, `CartProvider` and `ProductProvider`, then renders the login page, storefront, seller dashboard, admin dashboard, global modals and footer. This structure lets catalogue, authentication and cart state be shared without prop drilling.

## 2.4 Vite

Vite provides the development server and production bundler for the frontend. The frontend is started with `npm run dev --prefix frontend` and built with `npm run build --prefix frontend`. Vite provides fast module replacement during development and emits the compiled assets in `frontend/dist`.

## 2.5 Express and Node.js

The backend is a CommonJS Express application in `backend/server.js`. It parses JSON requests, enables CORS, serves the `backend/images` directory, defines REST endpoints and starts on port 5000 unless `PORT` is supplied. The frontend development server proxies `/api` requests to this service.

## 2.6 JSON Data Store

The current prototype stores categories, products, users, orders, reviews and settings in `backend/data.json`. `readDB()` parses the file and supplies safe defaults for missing arrays and settings. `writeDB()` serialises changes with indentation. This approach makes the project easy to run without database installation, but it is not suitable for concurrent production writes or large-scale querying.

## 2.7 Leaflet and OpenStreetMap

Leaflet renders the dispatch-origin and delivery-location map. The `DeliveryMap` component creates custom markers, draws a route line, allows the user to drag or click to select a delivery location, calculates distance and can animate a driver marker. Nominatim is used for address search. The map uses OpenStreetMap tiles and attribution.

## 2.8 Cryptography and Authentication

Passwords are hashed with Node.js `crypto.scryptSync`, and verification uses `crypto.timingSafeEqual` for stored scrypt hashes. The server creates random session tokens and stores them in an in-memory session map with a seven-day expiry. The frontend stores the token and public user profile in local storage and sends the token in an `Authorization: Bearer` header for authenticated requests.

OTP records are stored in memory with a ten-minute expiry and a five-attempt limit. When SMTP configuration is available, Nodemailer sends the verification code; otherwise the backend logs the code for development demonstration.

## 2.9 Technology Choice

| Requirement | Selected technology | Reason |
|---|---|---|
| Interactive UI | React | Reusable components and stateful workflows |
| Build tooling | Vite | Fast development and simple production bundling |
| API server | Express | Minimal REST framework with a familiar middleware model |
| Runtime | Node.js | Same language across frontend tooling and backend |
| Prototype storage | JSON file | No database setup required for demonstration |
| Maps | Leaflet | Open-source interactive maps and markers |
| Icons | Lucide React | Consistent, lightweight icon components |
| Styling | Tailwind CSS | Utility classes and responsive layouts |
| Email | Nodemailer | Optional SMTP support for OTP delivery |

## 2.10 Development Tools

Visual Studio Code can be used for editing JSX, JavaScript, JSON and CSS. npm installs dependencies and runs scripts. Browser developer tools inspect network calls, local storage, console errors and responsive layouts. The Node runtime is used to start the API and execute catalogue generation scripts.

## 2.11 Browser Support

The application targets modern browsers supporting ES modules, React 18, Fetch, local storage, CSS grid, CSS flexbox and the browser APIs used by Leaflet. Maps require network access to the configured tile and geocoding services.

---

# CHAPTER 3
# SYSTEM ANALYSIS

## 3.1 System Analysis

The system has three main user roles:

* **Customer:** browses products, manages the cart and wishlist, checks delivery information, places orders and tracks them.
* **Seller or nursery partner:** adds products, views the catalogue, sees orders and updates fulfilment status.
* **Administrator:** controls products, prices, settings, delivery rules, hubs and order operations.

External actors include the email service used by OTP delivery, OpenStreetMap/Nominatim services used by the map, and the browser local-storage subsystem used for client persistence.

## 3.2 Functional Requirements

### Authentication

1. Register a user with name, email or phone and password.
2. Prevent duplicate registration by email or phone.
3. Sign in with an email or phone identifier.
4. Send and verify email OTP codes.
5. Support a Google-login endpoint and configurable redirect entry point.
6. Retrieve the current authenticated profile.
7. Log out by clearing browser-side credentials.

### Catalogue

1. Load categories.
2. Load all products.
3. Search product name, description and nursery.
4. Filter by category, minimum price, maximum price, sunlight and water.
5. Sort by price or rating.
6. Open a product by identifier.
7. Display stock, discount, rating, delivery estimate and care guide.

### Cart and wishlist

1. Add a product with a quantity.
2. Merge duplicate product additions.
3. Change quantity or remove an item.
4. Clear the cart.
5. Toggle wishlist membership.
6. Persist cart and wishlist in local storage.
7. Calculate subtotal and item-specific handling charges.

### Delivery and checkout

1. Enter customer and address information.
2. Check serviceability using pincode or address.
3. Show branch and estimated delivery time.
4. Select or adjust a map location.
5. Calculate distance and delivery fees.
6. Apply free-delivery threshold where eligible.
7. Add optional plantation service charges.
8. Select UPI, card or COD.
9. Create a persistent order record.
10. Provide a local browser fallback during API unavailability.

### Order operations

1. Retrieve an order by identifier.
2. Show order items, amount, payment state and delivery coordinates.
3. Update status through Placed, Packed, Shipped, Out for Delivery and Delivered.
4. Append each status change to tracking history.
5. Allow seller and admin views to inspect incoming orders.

### Administration

1. Edit product price, original price and inventory fields.
2. Delete products.
3. Add products to the catalogue.
4. Read and update office location, delivery configuration and hubs.
5. Review order totals and operational metrics.

### Reviews

1. Retrieve reviews for a product.
2. Submit a review with rating and comment.

## 3.3 Non-Functional Requirements

* **Usability:** workflows must be understandable on mobile, tablet and desktop.
* **Performance:** catalogue filtering should avoid unnecessary page reloads and use lightweight JSON responses.
* **Reliability:** clear status responses and local checkout fallback should prevent loss of a customer order during temporary API failure.
* **Security:** passwords must not be returned in public profiles; sessions must expire; OTP attempts must be limited.
* **Maintainability:** frontend contexts, components and backend helpers should remain separated.
* **Scalability:** storage and session implementations should be replaceable with a database and external session store.
* **Compatibility:** the application should run with Node.js and npm without a separate database installation.
* **Accessibility:** controls should have labels, visible states and sufficiently clear contrast.

## 3.4 Feasibility Study

### Technical feasibility

The system is technically feasible because React, Vite, Express, Node.js and Leaflet are established technologies with broad documentation. The prototype can run on a normal development computer. The JSON store reduces infrastructure requirements while the API boundary leaves room for migration to a relational database.

### Economic feasibility

The main software dependencies are open-source. A demonstration can run locally without paid infrastructure. Production operation would require hosting, a database, persistent image storage, a transactional email provider, map-service usage and a payment gateway.

### Operational feasibility

Customers follow familiar shopping actions. Sellers use a focused dashboard for products and orders. Administrators use tabs for prices, delivery settings, orders, analytics and hubs. These role-specific views reduce training requirements.

### Schedule feasibility

The system is divided into independent modules: authentication, catalogue, cart, checkout, delivery map, orders, seller dashboard and admin dashboard. This makes incremental development and testing practical within an academic project schedule.

## 3.5 Input Analysis

| Input | Source | Validation or use |
|---|---|---|
| Name, email, phone, password | Registration form | Required name/password and email or phone |
| Identifier and password | Login form | Required identifier and password |
| OTP | Email verification form | Expiry and attempt count |
| Search text | Navbar/catalogue | Case-insensitive product, description and nursery matching |
| Category and filters | Product controls | Category, price, sunlight and water conditions |
| Quantity | Cart | Positive integer; zero removes item |
| Address and pincode | Checkout | Pincode or address required for serviceability |
| Map coordinates | Leaflet map | Used for distance and order delivery location |
| Payment mode | Checkout | UPI, card or COD display and payment status |
| Product details | Seller/admin forms | Name, category and price required |
| Order status | Seller/admin controls | Added to tracking history |
| Delivery settings | Admin form | Base fee, per-kilometre rate and thresholds |

## 3.6 Output Analysis

* Product cards and filtered catalogue results.
* Product detail modal with care guide and stock information.
* Cart subtotal, packaging charges, delivery fee and plantation fee.
* Branch assignment and estimated delivery period.
* Checkout confirmation with order identifier.
* Order tracking timeline.
* Seller inventory and order statistics.
* Admin catalogue and delivery settings.
* Map markers, route line, distance and animated driver marker.
* API error messages and validation messages.

## 3.7 Constraints and Assumptions

* The prototype uses JSON file persistence, not a transactional database.
* Session tokens and OTP records are lost when the backend restarts.
* The frontend stores authentication tokens in local storage.
* Google authentication requires an externally supplied redirect URL.
* Email delivery requires SMTP environment variables.
* Payment options are represented as checkout choices; the current version does not integrate a payment processor.
* Delivery distance from free-form addresses is estimated by known locality rules or a fallback heuristic.
* Nominatim and OpenStreetMap usage depends on network availability and provider policy.
* Images may be served from remote URLs and require a working internet connection.

## 3.8 Use Case Descriptions

### Use Case 3.1: Register

| Item | Description |
|---|---|
| Actor | Customer, seller or other public user |
| Precondition | User is not registered with the same identifier |
| Main flow | Enter details, submit, validate, hash password, create user, issue token |
| Alternative flow | Existing identifier returns an error |
| Postcondition | User receives a public profile and session token |

### Use Case 3.2: Search Catalogue

| Item | Description |
|---|---|
| Actor | Customer |
| Precondition | Catalogue page is open |
| Main flow | Choose category, text, price, sunlight, water and sort options |
| Alternative flow | No products match; empty-state message is shown |
| Postcondition | Filtered product cards are displayed |

### Use Case 3.3: Place Order

| Item | Description |
|---|---|
| Actor | Customer |
| Precondition | Cart contains at least one product |
| Main flow | Enter address, check branch, select location and payment mode, submit |
| Alternative flow | API failure stores a browser-local fallback order |
| Postcondition | Order is created and tracking identifier is displayed |

### Use Case 3.4: Update Order

| Item | Description |
|---|---|
| Actor | Seller or administrator |
| Precondition | Order exists |
| Main flow | Select a new status and save |
| Alternative flow | Unknown order returns HTTP 404 |
| Postcondition | Order status and tracking history are updated |

### Use Case 3.5: Manage Catalogue

| Item | Description |
|---|---|
| Actor | Seller or administrator |
| Precondition | Dashboard is open |
| Main flow | Add, edit or delete a product |
| Alternative flow | Missing name/category/price returns HTTP 400 |
| Postcondition | Catalogue is refreshed |

### Use Case 3.6: Configure Delivery

| Item | Description |
|---|---|
| Actor | Administrator |
| Precondition | Admin settings view is open |
| Main flow | Edit office, rates or hubs and save |
| Alternative flow | Network or write error displays an error state |
| Postcondition | New settings are returned by `/api/settings` |

---

# CHAPTER 4
# SYSTEM DESIGN

## 4.1 Architecture

Vruksha uses a two-tier web architecture with a browser client and an Express API. The browser contains presentation components, client state and interactive map logic. The API contains authentication helpers, request validation, business calculations and file persistence.

```text
+------------------------+
| Customer / Seller /    |
| Admin Web Browser      |
| React + Vite + Context |
+-----------+------------+
            |
            | HTTP JSON / Bearer token
            v
+------------------------+
| Express REST API       |
| Auth, Products, Orders |
| Delivery, Admin, Review|
+-----------+------------+
            |
            +-------------------+
            |                   |
            v                   v
  backend/data.json      In-memory sessions/OTP
            |
            v
     backend/images
```

The development environment runs the API on port 5000 and the Vite frontend on port 5173. The frontend proxy routes `/api` requests to the backend.

## 4.2 Component Design

### Application composition

`App.jsx` wraps the application in three providers:

1. `AuthProvider` supplies user, token and authentication actions.
2. `CartProvider` supplies cart, wishlist, pricing and delivery state.
3. `ProductProvider` supplies products, categories, filters and active views.

`MainContent` decides whether to render `LoginPage`, `ShopContent`, `SellerDashboard` or `AdminDashboard`. Global modals include product details, cart, order tracking and the gardening guide.

### Backend layers

* **Transport layer:** Express route declarations and JSON responses.
* **Authentication layer:** identifier normalisation, password hashing, token issuance and current-user lookup.
* **Domain layer:** delivery context, order totals, category-specific handling and tracking updates.
* **Persistence layer:** `readDB()` and `writeDB()` for JSON data.
* **Integration layer:** Nodemailer, OpenStreetMap/Nominatim and static image serving.

## 4.3 Data Design

The current JSON store contains the following logical entities.

### User

| Field | Type | Description |
|---|---|---|
| id | String | Unique user identifier |
| name | String | Display name |
| email | String | Normalised email |
| phone | String | Optional mobile number |
| passwordHash | String | Scrypt password record |
| role | String | Customer, seller or admin |
| address | String | Saved address |
| pincode | String | Indian pincode |
| createdAt | ISO date | Registration time |

### Category

| Field | Type | Description |
|---|---|---|
| id | String | Category identifier |
| name | String | Display name |
| icon | String | Emoji or visual symbol |
| description | String | Category explanation |

### Product

| Field | Type | Description |
|---|---|---|
| id | String | Product identifier |
| name | String | Product name |
| category | String | Category identifier |
| price | Number | Selling price |
| originalPrice | Number | Reference price |
| discount | Number | Discount percentage |
| rating | Number | Average rating |
| reviewCount | Number | Number of ratings |
| inStock | Boolean | Availability flag |
| stockCount | Number | Inventory quantity |
| image | String | Image URL or asset path |
| nursery | String | Supplier or nursery |
| sunlight | String | Required light |
| water | String | Watering schedule |
| potSize | String | Pot or package size |
| sowingSeason | String | Seed season |
| description | String | Product description |
| careGuide | Object | Light, water, fertilizer and repotting advice |

### Order

| Field | Type | Description |
|---|---|---|
| id | String | VRK-prefixed identifier |
| customerName | String | Customer name |
| phone/email | String | Contact information |
| shippingAddress | String | Delivery address |
| deliveryLat/deliveryLng | Number | Map coordinates |
| orderDate | ISO date | Creation time |
| items | Array | Product, price and quantity snapshot |
| subtotal | Number | Item total |
| distanceKm | Number | Delivery distance |
| deliveryFee | Number | Delivery and handling charges |
| plantationFee | Number | Optional service fee |
| total | Number | Final amount |
| paymentMethod | String | UPI, card or COD |
| paymentStatus | String | Paid or pending |
| status | String | Current fulfilment status |
| trackingHistory | Array | Status, time and detail entries |

### Review

Reviews contain an identifier, product identifier, reviewer name, rating, date and comment.

### Settings

Settings contain office location, delivery rates, free-delivery threshold, plantation pricing and active hubs. The seed data includes Bengaluru, Hyderabad, Mumbai and Delhi logistics hubs.

## 4.4 API Design

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/settings` | Read delivery and hub settings |
| PUT | `/api/admin/settings` | Update settings |
| GET | `/api/categories` | List categories |
| GET | `/api/products` | Search and filter products |
| GET | `/api/products/:id` | Read one product |
| PUT | `/api/admin/products/:id` | Edit product |
| DELETE | `/api/admin/products/:id` | Delete product |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login with credentials |
| POST | `/api/auth/send-otp` | Create OTP |
| POST | `/api/auth/verify-otp` | Verify OTP and sign in |
| POST | `/api/auth/google/login` | Google profile login |
| GET | `/api/auth/google/start` | Configured Google redirect |
| GET | `/api/auth/me` | Current user |
| GET | `/api/delivery/serviceability` | Resolve branch and delivery estimate |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Read order |
| GET | `/api/seller/orders` | List orders for operations |
| PUT | `/api/seller/orders/:id/status` | Update fulfilment status |
| POST | `/api/seller/products` | Add product |
| GET | `/api/reviews/:productId` | List product reviews |
| POST | `/api/reviews` | Add review |

## 4.5 Order Calculation Design

For every order, the server first calculates the item subtotal:

`subtotal = sum(item.price × item.quantity)`

Category-specific handling is then added:

* Live plants: ₹20 per item.
* Seeds: ₹5 per item.
* Fertilizers or compost: ₹15 per item.
* Pots and tools: ₹25 per item.
* Other products: ₹10 per item.

The branch transit charge is:

`branchDistanceFee = baseFee + distanceKm × perKmRate`

The standard delivery fee is the sum of item handling and branch distance. It becomes zero when the subtotal reaches the configured threshold and the distance is within the configured free-delivery radius.

Plantation service is calculated only when requested and when the order contains a plant:

`plantationFee = plantationBaseFee + plantCount × perPlantFee + distanceKm × plantationPerKmRate`

The final order total is:

`total = subtotal + deliveryFee + plantationFee`

## 4.6 Delivery Map Design

`DeliveryMap.jsx` uses the Haversine formula:

```text
R = 6371 km
dLat = radians(lat2 - lat1)
dLon = radians(lon2 - lon1)
a = sin²(dLat/2) + cos(lat1) × cos(lat2) × sin²(dLon/2)
c = 2 × atan2(sqrt(a), sqrt(1-a))
distance = R × c
```

The map displays:

* A green dispatch-hub marker.
* A red delivery marker.
* A dashed route line.
* A draggable destination marker.
* A moving driver marker when tracking simulation is enabled.
* Distance and delivery charge information.

## 4.7 Authentication Flow

1. The user submits registration details.
2. The API validates required fields and checks duplicate email or phone.
3. The password is converted to a scrypt record.
4. The user is written to the JSON database.
5. A random session token is created with a seven-day expiry.
6. The public user profile and token are returned.
7. The frontend stores them in local storage.
8. Authenticated requests send the bearer token.

The login flow reads the user by email or phone, verifies the password, creates a token and returns a profile without password fields.

## 4.8 Order State Flow

```text
Cart
  |
  v
Placed --> Packed --> Shipped --> Out for Delivery --> Delivered
```

Each transition appends a tracking-history record. The current prototype does not enforce a strict transition graph, so an operator can set any displayed status. A production version should validate permitted transitions and record the actor.

## 4.9 User Interface Design

The interface uses a light storefront palette with emerald as the primary action colour, slate for text and panels, amber for seasonal messaging and red for selected warnings. Rounded cards, responsive grids, clear badges and icon-supported labels make the catalogue approachable.

| UI element | Purpose |
|---|---|
| Navbar | Brand, search, category navigation, account and cart access |
| Hero banner | Product discovery and seasonal gardening promotion |
| Filter sidebar | Price, sunlight, water and reset controls |
| Product card | Image, name, rating, price, stock and quick actions |
| Product modal | Full description, care guide and add-to-cart action |
| Cart drawer | Items, quantities, fees, wishlist and checkout action |
| Checkout modal | Address, pincode, map, payment and confirmation |
| Tracking modal | Order status timeline and delivery map |
| Seller dashboard | Inventory, orders and add-product form |
| Admin dashboard | Prices, delivery, orders, analytics and hubs |

## 4.10 Page and View Inventory

| View | User |
|---|---|
| Login page | Unauthenticated visitor |
| Shop/catalogue | Customer, seller and admin |
| Product detail modal | Any authenticated user |
| Cart drawer | Customer |
| Checkout modal | Customer |
| Order tracking modal | Customer and operations users |
| Seller dashboard | Seller or operations user |
| Admin dashboard | Administrator |
| Gardening guide modal | Any authenticated user |

---

# CHAPTER 5
# IMPLEMENTATION (SOURCE CODE)

## 5.1 Project Structure

```text
vruksha-ecommerce/
├── backend/
│   ├── data.json
│   ├── images/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/images/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── scripts/
│   └── build_mega_catalog_complete.js
├── scratch/
├── package.json
└── README.md
```

## 5.2 Application Entry Point

The `main.jsx` file mounts the React application into the browser root. `App.jsx` supplies providers and composes the main experience. The `MainContent` function checks authentication and selects the requested view.

## 5.3 Authentication Context

`AuthContext.jsx` provides:

* `user` and `token`.
* `registerUser()`.
* `loginWithCredentials()`.
* `loginWithOTP()`.
* `loginWithGoogle()`.
* `logout()`.
* Login modal state.

The context loads prior state from local storage and synchronises changes back to local storage with effects.

## 5.4 Product Context

`ProductContext.jsx` owns catalogue state. It constructs `/api/products` query parameters from category, text, price, sunlight, water and sorting state. It also provides selected product, tracking order identifier and active view state.

## 5.5 Cart Context

`CartContext.jsx` contains the core shopping rules:

* Initial cart restoration.
* Product merging and quantity changes.
* Wishlist toggle.
* Item subtotal.
* Category-specific handling charges.
* Distance fee and free-delivery rule.
* Plantation fee.
* UPI discount and COD surcharge.

The context deliberately keeps pricing visible to the frontend for immediate feedback. The backend repeats the essential order calculation so that the persisted order has server-side totals.

## 5.6 Backend Persistence Helpers

The backend uses:

```javascript
function readDB() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  if (!parsed.users) parsed.users = [];
  if (!Array.isArray(parsed.orders)) parsed.orders = [];
  return parsed;
}

function writeDB(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}
```

The implementation catches file errors and returns safe empty structures. Production code should surface persistence failures to the caller rather than returning success-shaped responses.

## 5.7 Password and Session Implementation

Passwords use a `scrypt:salt:hash` representation. A random 16-byte salt is generated for new passwords. Sessions use random 32-byte tokens stored with an expiry timestamp. The public profile helper removes `password` and `passwordHash` before returning user data.

## 5.8 Product Search

The product endpoint applies filters in this order:

1. Category.
2. Search term against name, description and nursery.
3. Minimum price.
4. Maximum price.
5. Sunlight.
6. Water requirement.
7. Sorting.

The endpoint returns the resulting product array as JSON.

## 5.9 Checkout Implementation

`CheckoutModal.jsx` collects delivery information and calls the serviceability endpoint before placing an order. It sends customer information, coordinates, items, payment method and optional service flags to `/api/orders`.

If the API returns a valid order, the modal shows the server order. If the API responds with an unexpected format or fails, the component creates a local fallback order and stores it under an order-specific local-storage key. This ensures that a demonstration can continue even when the proxy or API is unavailable, but the behavior must be replaced with explicit retry and failure handling in a production release.

## 5.10 Seller Implementation

`SellerDashboard.jsx` displays catalogue items, fetches `/api/seller/orders`, posts new products to `/api/seller/products` and updates statuses through `/api/seller/orders/:id/status`. The dashboard computes a total-sales figure from the order list and provides a tracking-view action.

## 5.11 Admin Implementation

`AdminDashboard.jsx` loads settings and orders in parallel. Its tabs support:

* Product price and inventory edits.
* Product deletion.
* Product creation.
* Delivery pricing configuration.
* Office location and dispatch hubs.
* Order fulfilment.
* Analytics and route map views.

## 5.12 Seed and Catalogue Generation

The `scripts/build_mega_catalog_complete.js` script defines categories, verified plant and seed image URLs and product records. Running `npm run seed` generates or updates the catalogue data used by the application. The current data file contains six categories, 140 products, three orders, one review and four users at the time of documentation.

## 5.13 REST Response Conventions

Successful write operations generally return:

```json
{
  "success": true,
  "message": "Operation completed",
  "product": {}
}
```

Validation and missing-resource failures return an `error` field with an HTTP status such as 400, 401, 404 or 503.

---

# CHAPTER 6
# IMPLEMENTATION AND SYSTEM TESTING

## 6.1 Implementation Environment

| Item | Value |
|---|---|
| Operating system | Windows development environment |
| Runtime | Node.js 18 or newer |
| Frontend | React 18.3.1, Vite 5.2.11 |
| Backend | Express 4.19.2 |
| Storage | `backend/data.json` |
| API port | 5000 by default |
| Frontend port | 5173 by default |
| Map provider | OpenStreetMap tiles and Nominatim search |

## 6.2 Installation

```powershell
npm install
npm install --prefix frontend
npm install --prefix backend
```

## 6.3 Running the System

Start the backend:

```powershell
npm run backend
```

Start the frontend in another terminal:

```powershell
npm run frontend
```

Build the frontend:

```powershell
npm run build --prefix frontend
```

Generate or refresh the catalogue:

```powershell
npm run seed
```

## 6.4 Test Strategy

Testing is divided into:

1. Unit-level checks for delivery calculations, input normalisation and password functions.
2. API tests for status codes, JSON shape and persistence behavior.
3. Component tests for filters, cart quantity controls and modal transitions.
4. Integration tests for checkout, order tracking and dashboard actions.
5. Responsive and usability tests in browser developer tools.
6. Build validation for frontend bundling and import consistency.

## 6.5 Functional Test Cases

| Test ID | Test | Expected result |
|---|---|---|
| T01 | Open `/api/health` | HTTP 200 and status OK |
| T02 | Load categories | Six catalogue categories are returned |
| T03 | Search “money plant” | Matching product records are returned |
| T04 | Filter by max price | Products above the limit are excluded |
| T05 | Filter by sunlight | Only matching light requirements remain |
| T06 | Register with missing name | HTTP 400 |
| T07 | Register duplicate email | HTTP 400 |
| T08 | Login with incorrect password | HTTP 401 |
| T09 | Send OTP with invalid email | HTTP 400 |
| T10 | Verify expired OTP | HTTP 400 |
| T11 | Serviceability with valid pincode | Branch, district and ETA are returned |
| T12 | Serviceability with no input | HTTP 400 |
| T13 | Create order with empty cart | HTTP 400 |
| T14 | Create valid order | HTTP 201 and VRK order identifier |
| T15 | Read an unknown order | HTTP 404 |
| T16 | Update existing order status | Status and history are changed |
| T17 | Add product without price | HTTP 400 |
| T18 | Edit unknown product | HTTP 404 |
| T19 | Delete existing product | Product is removed |
| T20 | Submit review | HTTP 201 and review record |
| T21 | Use cart quantity zero | Item is removed |
| T22 | Request plantation without plants | No plantation fee is added |
| T23 | Eligible free delivery | Delivery fee is zero |
| T24 | Map marker drag | Coordinates and distance update |

## 6.6 Security Review

Positive controls:

* Password hashes, rather than plaintext passwords, are stored for newly registered users.
* Password comparisons use timing-safe comparison for scrypt records.
* Public user responses remove password fields.
* OTP codes expire after ten minutes and are limited to five attempts.
* Session tokens expire after seven days.
* Unknown products and orders return 404 responses.
* Input requirements are checked for registration, login, serviceability, order and product creation.

Important hardening findings:

1. The frontend stores bearer tokens in local storage, which increases impact if an XSS issue is introduced. An HTTP-only secure cookie is preferable.
2. Several administrative and seller routes do not perform server-side role checks. Authorisation should be enforced in middleware or route guards.
3. `/api/seller/orders` exposes all orders without authentication in the current implementation.
4. `/api/admin/settings`, product administration routes and seller routes should require authenticated roles.
5. The OTP code is logged when SMTP is unavailable; this must be disabled outside development.
6. JSON file writes are not atomic and can lose updates under concurrent access.
7. Request bodies need stronger schema validation, length limits and numeric bounds.
8. CORS is open by default; production should allow only the deployed frontend origin.
9. Rate limiting is needed for login, OTP, reviews and order creation.
10. Payment modes are labels, not verified payment transactions.

## 6.7 Reliability Review

The local checkout fallback improves demonstration resilience but can create an order that is not present in the backend. The user interface should clearly label fallback orders and provide a retry or reconciliation flow. Database write failures should return an error rather than silently proceeding as if persistence succeeded.

## 6.8 Performance Review

The catalogue is small enough for JSON filtering. For a larger catalogue, filtering and sorting should move into a database query layer with indexes. Product images should be resized and served through an image CDN. Order and review lists should be paginated.

## 6.9 Usability Review

The application provides responsive cards, filters, clear success states and modals. Improvements should include accessible labels for icon-only buttons, keyboard focus management for modals, visible loading/error states for every request, screen-reader announcements for cart updates and a consistent currency-formatting helper.

---

# CHAPTER 7
# IMPLEMENTATION (SCREENS AND WORKFLOWS)

## 7.1 Login and Registration

The login page is the entry point for unauthenticated users. It supports credential login and the OTP workflow. Registration collects a name, contact identifier and password, and can save address information for checkout.

**Suggested screenshot:** Login page showing email/mobile input, password input, sign-in button, registration link and OTP option.

## 7.2 Home and Catalogue

The home screen contains the Vruksha brand, hero banner, category navigation, catalogue title, search controls, sort controls, smart filters and product cards. The filter sidebar includes maximum price, sunlight and watering requirement.

**Suggested screenshot:** Catalogue with indoor plants selected, filter panel visible and product cards showing prices and ratings.

## 7.3 Product Detail

Selecting a product opens its detail modal. The modal presents the image, name, nursery, price, discount, stock, delivery estimate, description and care guide. Customers can add a quantity to the cart or toggle the wishlist.

**Suggested screenshot:** Product detail modal with care-guide sections and add-to-cart action.

## 7.4 Cart Drawer

The cart drawer lists selected products, quantities and calculated subtotal. It exposes removal, quantity changes, wishlist actions and checkout. It displays the effect of packaging, delivery, UPI discount, COD surcharge and plantation service.

**Suggested screenshot:** Cart drawer showing itemized charges and checkout button.

## 7.5 Checkout

Checkout collects name, mobile number, email, address and pincode. The user can check the assigned branch and estimated delivery time, adjust a map pin, select UPI/card/COD and request plantation service. After submission, the confirmation state displays the order identifier, amount, distance, service and payment mode.

**Suggested screenshot:** Checkout modal with map, branch result and payment options.

## 7.6 Order Tracking

The tracking view retrieves the order by its identifier. It shows current status, tracking history, shipping address, item summary and map information. A moving driver marker can simulate progress between the dispatch hub and delivery location.

**Suggested screenshot:** Tracking modal with status timeline and route map.

## 7.7 Seller Dashboard

The seller dashboard has product inventory, customer orders and add-product tabs. Inventory shows product image, category, price, nursery, care specifications and stock. Orders show customer details, distance, plantation request, amount, items, address and status selector.

**Suggested screenshot:** Seller dashboard with incoming order and status dropdown.

## 7.8 Admin Dashboard

The admin dashboard is styled as an operations control centre. Product controls allow price edits and deletion. Delivery settings contain base fee, per-kilometre rate, free-delivery threshold and plantation rates. Other tabs support order fulfilment, analytics and dispatch hubs.

**Suggested screenshot:** Admin dashboard showing metrics, delivery configuration and hub list.

## 7.9 Responsive Layout

The catalogue changes from a sidebar-and-grid layout on large screens to a single-column mobile layout. Modals use scrollable panels on small screens. Dashboard tables are horizontally scrollable, and controls wrap when the viewport is narrow.

---

# CHAPTER 8
# CONCLUSION

Vruksha E-Commerce successfully demonstrates an end-to-end gardening marketplace built with React, Vite, Express and Node.js. The system brings product discovery, care information, cart management, location-aware delivery, checkout, orders, seller operations and administration into one application.

The project shows that a lightweight JSON-backed REST API can support a complete academic prototype while keeping the code easy to run and inspect. The frontend contexts provide a clear separation of authentication, catalogue and shopping state. The delivery module extends ordinary e-commerce behavior with category-specific handling, distance calculation, serviceability and optional plantation support.

The implementation also identifies the boundary between a demonstration prototype and a production platform. Authentication, authorisation, persistent storage, payments, stock reservation, email security, concurrency and audit logging require further work before real commercial use. These findings are documented rather than hidden so that the next version can improve the system systematically.

---

# CHAPTER 9
# SCOPE OF THE PROJECT

## 9.1 Current Scope

| Module | Included now | Outside current scope |
|---|---|---|
| Catalogue | Categories, search, filters, sorting, product details | Personalised recommendations and supplier procurement |
| Product care | Light, water, fertilizer and repotting guide | Expert diagnosis from plant photographs |
| Cart | Quantity, subtotal, wishlist and local persistence | Cross-device synchronisation |
| Checkout | Address, branch, map, payment choice and order creation | Real payment capture and refund |
| Delivery | Distance, rates, hubs, map and tracking simulation | Live GPS driver integration |
| Orders | Status, history and lookup | Returns, cancellations and replacement workflow |
| Seller | Add products and update orders | Multi-vendor settlement and commission |
| Admin | Price, products, settings, hubs and operations | Full audit history and fine-grained permissions |
| Reviews | Read and submit reviews | Verified-purchase moderation |
| Storage | JSON file | Relational or document database with transactions |

## 9.2 Future Enhancements

1. Migrate products, users, orders and reviews to PostgreSQL or MongoDB.
2. Add database transactions and stock reservation during checkout.
3. Use secure HTTP-only, SameSite cookies for sessions.
4. Add server-side role and permission middleware to every protected endpoint.
5. Integrate Razorpay, Stripe or another payment provider.
6. Add order cancellation, return, refund and replacement workflows.
7. Add real-time tracking using a driver application and WebSocket updates.
8. Introduce a proper geocoding and routing service with usage controls.
9. Add image upload, validation, resizing and malware scanning.
10. Add product recommendation and plant-diagnosis services.
11. Add verified reviews, moderation and seller ratings.
12. Add inventory alerts, purchase orders and supplier management.
13. Add multilingual support for Indian languages.
14. Add accessibility testing and a formal design system.
15. Add automated unit, API, integration and end-to-end test suites.
16. Add rate limiting, CSRF protection, security headers and structured logging.
17. Add analytics dashboards for conversion, revenue, repeat purchase and delivery performance.
18. Add scheduled notifications through email, SMS, WhatsApp or push messaging.

## 9.3 Production Readiness Roadmap

### Phase 1: Security and data integrity

Replace local-storage bearer tokens, enforce role checks, validate schemas, disable OTP logging, restrict CORS, add rate limits and introduce an atomic database.

### Phase 2: Commerce

Integrate a payment gateway, reserve stock, support coupons, invoices, cancellations, refunds and tax calculations.

### Phase 3: Logistics

Introduce route optimisation, driver assignment, GPS tracking, delivery proof and hub-level inventory.

### Phase 4: Intelligence and growth

Add recommendations, plant-health guidance, multilingual search, marketing campaigns, loyalty and supplier analytics.

---

# CHAPTER 10
# BIBLIOGRAPHY

1. React Documentation, https://react.dev/
2. Vite Documentation, https://vite.dev/guide/
3. Express Documentation, https://expressjs.com/
4. Node.js Documentation, https://nodejs.org/docs/latest/api/
5. Leaflet Documentation, https://leafletjs.com/reference.html
6. React Leaflet Documentation, https://react-leaflet.js.org/
7. Tailwind CSS Documentation, https://tailwindcss.com/docs
8. Lucide React Documentation, https://lucide.dev/guide/packages/lucide-react
9. Nodemailer Documentation, https://nodemailer.com/
10. OpenStreetMap Contributors, https://www.openstreetmap.org/
11. Nominatim Documentation, https://nominatim.org/release-docs/latest/
12. OWASP Application Security Verification Standard, https://owasp.org/www-project-application-security-verification-standard/
13. OWASP Password Storage Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
14. RFC 8018: PKCS #5: Password-Based Cryptography Specification, https://www.rfc-editor.org/rfc/rfc8018
15. MDN Web Docs, Web Storage API, https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
16. MDN Web Docs, Fetch API, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
17. Vruksha E-Commerce source repository, files listed in Chapter 5.

---

# APPENDIX A: API EXAMPLES

## Product search

```http
GET /api/products?category=indoor-plants&maxPrice=500&sunlight=Indirect%20Light&sortBy=rating
```

## Serviceability

```http
GET /api/delivery/serviceability?pincode=560038&address=Indiranagar%2C%20Bengaluru
```

## Create order

```json
{
  "customerName": "Example Customer",
  "phone": "+91 9876543210",
  "email": "customer@example.com",
  "shippingAddress": "Indiranagar, Bengaluru",
  "pincode": "560038",
  "distanceKm": 5,
  "paymentMethod": "UPI (Google Pay)",
  "isPlantationRequested": false,
  "items": [
    {
      "id": "p1",
      "name": "Money Plant",
      "category": "indoor-plants",
      "price": 149,
      "quantity": 1
    }
  ]
}
```

## Order response shape

```json
{
  "success": true,
  "order": {
    "id": "VRK-12345",
    "status": "Placed",
    "subtotal": 149,
    "deliveryFee": 84,
    "plantationFee": 0,
    "total": 233,
    "trackingHistory": []
  }
}
```

# APPENDIX B: CONFIGURATION

| Variable | Purpose |
|---|---|
| `PORT` | Express listening port |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_SECURE` | SMTP TLS mode |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | OTP sender address |
| `GOOGLE_AUTH_URL` | External Google-auth redirect URL |

# APPENDIX C: DOCUMENTATION BASIS

This report is based on the uploaded PropAI Estate report's academic structure and chapter sequence, adapted to the Vruksha E-Commerce repository. Product counts and data fields are derived from the current `backend/data.json`; API behavior is derived from `backend/server.js`; frontend workflows are derived from `frontend/src/App.jsx`, the context providers and the catalogue, checkout, map, seller and admin components. Placeholder academic identity fields are intentionally retained where the repository does not provide verified student or institution information.


# APPENDIX D: SOURCE CODE AND REPOSITORY INVENTORY

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

## D.3 Backend Server

Source: `backend\server.js`

```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');
const otpStore = new Map();
const sessionStore = new Map();
const mailTransport = process.env.SMTP_HOST ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
}) : null;

function normalizeIdentifier(identifier) {
  const value = String(identifier || '').trim();
  return value.includes('@') ? value.toLowerCase() : value.replace(/\D/g, '').slice(-10);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  if (!storedPassword.startsWith('scrypt:')) return storedPassword === password;
  const [, salt, expected] = storedPassword.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function issueToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  sessionStore.set(token, { userId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return token;
}

function findUser(users, identifier) {
  const normalized = normalizeIdentifier(identifier);
  return users.find(user => normalizeIdentifier(user.email) === normalized || normalizeIdentifier(user.phone) === normalized);
}

function publicUser(user) {
  const { password: _, passwordHash: __, ...profile } = user;
  return profile;
}

const knownRegions = {
  '110': ['Delhi', 'New Delhi'], '400': ['Maharashtra', 'Mumbai'], '411': ['Maharashtra', 'Pune'],
  '500': ['Telangana', 'Hyderabad'], '560': ['Karnataka', 'Bengaluru'], '600': ['Tamil Nadu', 'Chennai'],
  '700': ['West Bengal', 'Kolkata'], '380': ['Gujarat', 'Ahmedabad'], '302': ['Rajasthan', 'Jaipur'],
  '226': ['Uttar Pradesh', 'Lucknow'], '201': ['Uttar Pradesh', 'Ghaziabad'], '682': ['Kerala', 'Kochi'],
  '751': ['Odisha', 'Bhubaneswar'], '781': ['Assam', 'Guwahati'], '800': ['Bihar', 'Patna'],
  '160': ['Chandigarh', 'Chandigarh'], '180': ['Jammu and Kashmir', 'Jammu'], '171': ['Himachal Pradesh', 'Shimla'],
  '560': ['Karnataka', 'Bengaluru'], '530': ['Karnataka', 'Bengaluru'], '577': ['Karnataka', 'Mysuru']
};

function buildDeliveryContext({ pincode = '', address = '', fallbackAddress = '' } = {}) {
  const cleanedPincode = String(pincode || '').trim();
  const addressText = String(address || fallbackAddress || '').trim();
  const lowerAddress = addressText.toLowerCase();

  let state = 'India';
  let district = 'Your City';

  if (/^\d{6}$/.test(cleanedPincode)) {
    const prefix = cleanedPincode.slice(0, 3);
    const region = knownRegions[prefix] || ['India', `District ${prefix}`];
    state = region[0];
    district = region[1];
  } else {
    if (lowerAddress.includes('indiranagar') || lowerAddress.includes('domlur') || lowerAddress.includes('hal')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('koramangala') || lowerAddress.includes('mg road') || lowerAddress.includes('richmond')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('whitefield') || lowerAddress.includes('marathahalli') || lowerAddress.includes('bellandur')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('mysuru') || lowerAddress.includes('mysore')) {
      state = 'Karnataka'; district = 'Mysuru';
    } else if (lowerAddress.includes('mumbai') || lowerAddress.includes('pune')) {
      state = lowerAddress.includes('mumbai') ? 'Maharashtra' : 'Maharashtra'; district = lowerAddress.includes('mumbai') ? 'Mumbai' : 'Pune';
    } else if (lowerAddress.includes('hyderabad')) {
      state = 'Telangana'; district = 'Hyderabad';
    } else if (lowerAddress.includes('chennai')) {
      state = 'Tamil Nadu'; district = 'Chennai';
    } else if (lowerAddress.includes('delhi') || lowerAddress.includes('new delhi')) {
      state = 'Delhi'; district = 'New Delhi';
    }
  }

  const branchCode = `VRK-${state.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase()}-${cleanedPincode || '000000'}`;
  const branchName = `${district} Branch`;
  const searchQuery = addressText || `${district}, ${state}, India`;

  return {
    serviceable: true,
    pincode: cleanedPincode || '000000',
    state,
    district,
    branch: { code: branchCode, name: `Vruksha ${branchName}`, address: `${district}, ${state}, India` },
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`,
    estimatedDays: state === 'India' ? '4-7 days' : '2-5 days'
  };
}

function getAuthenticatedUser(req, db) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const session = sessionStore.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  return (db.users || []).find(user => user.id === session.userId) || null;
}

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helper function to read DB
function readDB() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.users) parsed.users = [];
    if (!Array.isArray(parsed.orders)) parsed.orders = [];
    if (!parsed.settings) {
      parsed.settings = {
        officeLocation: {
          name: "Vruksha HQ & Central Dispatch Hub",
          address: "100 Feet Road, Indiranagar, MG Road, Bengaluru, Karnataka 560038",
          city: "Bengaluru",
          state: "Karnataka",
          lat: 12.9716,
          lng: 77.5946,
          phone: "+91 80 4567 8900"
        },
        delivery: {
          baseFee: 30,
          perKmRate: 8,
          freeDeliveryThreshold: 499,
          maxFreeDeliveryKm: 10,
          plantationBaseFee: 100,
          plantationPerKmRate: 10
        },
        hubs: [
          { id: 'hub-blr', name: 'Bengaluru Main Hub (HQ)', city: 'Bengaluru', address: '100 Feet Road, Indiranagar, Bengaluru - 560038', lat: 12.9716, lng: 77.5946, active: true },
          { id: 'hub-hyd', name: 'Hyderabad Logistics Hub', city: 'Hyderabad', address: 'Hitech City Road, Madhapur, Hyderabad - 500081', lat: 17.4483, lng: 78.3741, active: true },
          { id: 'hub-mum', name: 'Mumbai Metro Hub', city: 'Mumbai', address: 'BKC Annexe, Bandra East, Mumbai - 400051', lat: 19.0607, lng: 72.8647, active: true },
          { id: 'hub-del', name: 'Delhi NCR Dispatch Center', city: 'Delhi', address: 'Connaught Place Outer Ring, New Delhi - 110001', lat: 28.6315, lng: 77.2167, active: true }
        ]
      };
    }
    return parsed;
  } catch (err) {
    console.error('Error reading database:', err);
    return { categories: [], products: [], orders: [], reviews: [], users: [], settings: {} };
  }
}

// Helper function to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

// --- REST API ENDPOINTS ---

// Public/Admin Settings
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings || {});
});

// Admin Settings Update (Office Location, Delivery Pricing per KM, Hubs)
app.put('/api/admin/settings', (req, res) => {
  const db = readDB();
  const { officeLocation, delivery, hubs } = req.body;

  if (officeLocation) {
    db.settings.officeLocation = { ...db.settings.officeLocation, ...officeLocation };
  }
  if (delivery) {
    db.settings.delivery = { ...db.settings.delivery, ...delivery };
  }
  if (hubs) {
    db.settings.hubs = hubs;
  }

  writeDB(db);
  res.json({ success: true, message: 'Settings updated successfully', settings: db.settings });
});

// Admin Product Edit (Price, Original Price, Stock, Category, etc.)
app.put('/api/admin/products/:id', (req, res) => {
  const db = readDB();
  const index = (db.products || []).findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existing = db.products[index];
  const updated = { ...existing, ...req.body };

  // Recalculate discount if price or originalPrice changed
  if (req.body.price || req.body.originalPrice) {
    const p = Number(updated.price);
    const op = Number(updated.originalPrice || p * 1.3);
    updated.price = p;
    updated.originalPrice = op;
    updated.discount = Math.max(0, Math.round(((op - p) / op) * 100));
  }

  db.products[index] = updated;
  writeDB(db);
  res.json({ success: true, product: updated });
});

// Admin Product Delete
app.delete('/api/admin/products/:id', (req, res) => {
  const db = readDB();
  const initialLen = db.products.length;
  db.products = db.products.filter(p => p.id !== req.params.id);
  if (db.products.length === initialLen) {
    return res.status(404).json({ error: 'Product not found' });
  }
  writeDB(db);
  res.json({ success: true, message: 'Product deleted successfully' });
});


// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vruksha E-Commerce API is running running', timestamp: new Date().toISOString() });
});

// Categories
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories || []);
});

// Products (with filter & search)
app.get('/api/products', (req, res) => {
  const db = readDB();
  let products = db.products || [];
  const { category, search, minPrice, maxPrice, sunlight, water, sortBy } = req.query;

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.nursery.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sunlight && sunlight !== 'all') {
    products = products.filter(p => p.sunlight.toLowerCase().includes(sunlight.toLowerCase()));
  }

  if (water && water !== 'all') {
    products = products.filter(p => p.water.toLowerCase().includes(water.toLowerCase()));
  }

  if (sortBy) {
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }
  }

  res.json(products);
});

// Single Product Details
app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = (db.products || []).find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Authentication - Register New User
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { name, email, phone, password, role, address, pincode } = req.body;

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ error: 'Name, Password, and Email or Phone are required for registration.' });
  }

  // Check if user already exists
  const existing = (db.users || []).find(u => 
    (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
    (phone && u.phone && u.phone === phone)
  );

  if (existing) {
    return res.status(400).json({ error: 'User already exists with this email or mobile number. Please Sign In.' });
  }

  const newUser = {
    id: 'u_' + Date.now(),
    name: name.trim(),
    email: email ? email.trim().toLowerCase() : '',
    phone: phone ? phone.trim() : '',
    passwordHash: hashPassword(password),
    role: role || 'customer',
    address: address || '',
    pincode: pincode || '',
    createdAt: new Date().toISOString()
  };

  db.users.unshift(newUser);
  writeDB(db);

  // Omit password in response profile
  const { password: _, ...userProfile } = newUser;
  const token = issueToken(newUser.id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: publicUser(newUser),
    token
  });
});

// Authentication - Sign In (Login) with Credentials
app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Mobile number and password are required.' });
  }

  const user = findUser(db.users || [], identifier);

  if (!user) {
    return res.status(404).json({ error: 'Account not found. Please register as a new user first.' });
  }

  if (!verifyPassword(password, user.passwordHash || user.password)) {
    return res.status(401).json({ error: 'Incorrect password. Please try again.' });
  }

  if (!user.passwordHash) {
    user.passwordHash = hashPassword(password);
    delete user.password;
    writeDB(db);
  }
  const token = issueToken(user.id);

  res.json({
    success: true,
    message: 'Login successful!',
    user: publicUser(user),
    token
  });
});

// Authentication - Send Email OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { identifier, email } = req.body;
  const targetEmail = email || identifier;

  if (!targetEmail || !targetEmail.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const normalized = targetEmail.trim().toLowerCase();
  const otp = String(crypto.randomInt(100000, 1000000));
  otpStore.set(normalized, { otp, expiresAt: Date.now() + 10 * 60 * 1000, attempts: 0 });

  console.log(`[EMAIL OTP] Sent code ${otp} to ${normalized}`);

  if (mailTransport) {
    try {
      await mailTransport.sendMail({
        from: process.env.SMTP_FROM || '"Vruksha Verification" <noreply@vruksha.com>',
        to: normalized,
        subject: `Your Vruksha Email Verification Code: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #061712; color: #ffffff; border-radius: 16px;">
            <h2 style="color: #10b981; margin-top: 0;">🌿 Vruksha Nursery & Logistics</h2>
            <p style="color: #cbd5e1; font-size: 14px;">Your 6-digit email security verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #34d399; margin: 20px 0; padding: 12px; background: #0b261d; border-radius: 12px; text-align: center;">${otp}</div>
            <p style="font-size: 12px; color: #94a3b8;">This code expires in 10 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        `
      });
    } catch (err) {
      console.error('SMTP Email dispatch failed:', err.message);
    }
  }

  res.json({
    success: true,
    message: `Verification code sent to ${normalized}! Check your inbox.`
  });
});

// Google Sign-In Endpoint
app.post('/api/auth/google/login', (req, res) => {
  const db = readDB();
  const { email, name, picture } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid Google email is required' });
  }

  const normalized = email.trim().toLowerCase();
  let user = findUser(db.users || [], normalized);

  if (!user) {
    user = {
      id: 'u_g_' + Date.now(),
      name: name || normalized.split('@')[0],
      email: normalized,
      phone: '',
      role: normalized.includes('admin') ? 'admin' : 'customer',
      address: 'Bengaluru, Karnataka',
      pincode: '560038',
      avatar: picture || '',
      createdAt: new Date().toISOString()
    };
    db.users.unshift(user);
    writeDB(db);
  }

  const token = issueToken(user.id);
  res.json({
    success: true,
    message: `Logged in with Google as ${user.name}!`,
    user: publicUser(user),
    token
  });
});

app.get('/api/auth/google/start', (req, res) => {
  if (!process.env.GOOGLE_AUTH_URL) {
    return res.status(503).json({ error: 'Google sign-in is not configured. Use email and password or OTP.' });
  }
  res.redirect(process.env.GOOGLE_AUTH_URL);
});

// Authentication - Verify OTP & auto-register a verified identifier.
app.post('/api/auth/verify-otp', (req, res) => {
  const db = readDB();
  const { identifier, email, otp, name, address, pincode } = req.body;
  const targetEmail = email || identifier;

  if (!targetEmail) {
    return res.status(400).json({ error: 'Email address is required' });
  }
  
  const normalized = targetEmail.trim().toLowerCase();
  const pending = otpStore.get(normalized);
  if (!pending || pending.expiresAt < Date.now()) {
    return res.status(400).json({ error: 'OTP expired. Please request a new verification code.' });
  }
  if (++pending.attempts > 5 || String(otp).trim() !== pending.otp) {
    return res.status(400).json({ error: 'Invalid OTP code. Please check the latest email code and try again.' });
  }
  otpStore.delete(normalized);

  let user = findUser(db.users || [], normalized);

  if (!user) {
    // Register new user via OTP automatically
    user = {
      id: 'u_' + Date.now(),
      name: name || normalized.split('@')[0],
      email: normalized,
      phone: '',
      role: 'customer',
      address: address || 'Indiranagar, Bengaluru',
      pincode: pincode || '560038',
      createdAt: new Date().toISOString()
    };
    db.users.unshift(user);
    writeDB(db);
  } else {
    if (address) user.address = address;
    if (pincode) user.pincode = pincode;
    writeDB(db);
  }

  const token = issueToken(user.id);

  res.json({ success: true, user: publicUser(user), token });
});

// Authentication - Get Current User Profile
app.get('/api/auth/me', (req, res) => {
  const db = readDB();
  const user = getAuthenticatedUser(req, db);
  if (!user) {
    return res.status(401).json({ error: 'No auth token provided' });
  }
  res.json({ success: true, user: publicUser(user) });
});

// Delivery serviceability. Every valid Indian pincode is assigned to one deterministic district branch.
app.get('/api/delivery/serviceability', (req, res) => {
  const pincode = String(req.query.pincode || '').trim();
  const address = String(req.query.address || '').trim();
  const label = buildDeliveryContext({ pincode, address });

  if (!/^\d{6}$/.test(pincode) && !address) {
    return res.status(400).json({ error: 'Enter a valid 6-digit Indian pincode or delivery address.' });
  }

  res.json(label);
});

// Create Order
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const user = getAuthenticatedUser(req, db);
  const { customerName, phone, email, shippingAddress, items, paymentMethod, distanceKm, isPlantationRequested } = req.body;
  const latNum = Number(req.body.deliveryLat);
  const lngNum = Number(req.body.deliveryLng);
  const hasCoords = req.body.deliveryLat != null && req.body.deliveryLng != null && Number.isFinite(latNum) && Number.isFinite(lngNum);

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart items cannot be empty' });
  }

  const resolvedName = customerName || user?.name || 'Valued Customer';
  const resolvedPhone = phone || user?.phone || '+91 9876543210';
  const resolvedEmail = email || user?.email || 'customer@vruksha.com';
  const resolvedAddress = shippingAddress || user?.address || '123 Garden Lane, MG Road, Bengaluru';

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const distance = Number(distanceKm) > 0 ? Number(distanceKm) : 5;
  const isPlantation = Boolean(isPlantationRequested);

  // Per-Product Category Handling & Delivery Pricing
  let itemizedDeliveryFee = 0;
  let itemizedPlantationFee = 0;
  let plantItemCount = 0;

  items.forEach(item => {
    const qty = Number(item.quantity) || 1;
    const cat = (item.category || '').toLowerCase();

    if (cat.includes('plant') || item.name.toLowerCase().includes('plant')) {
      itemizedDeliveryFee += qty * 20; // Live plant protective transit box charge per item
      plantItemCount += qty;
      if (isPlantation) {
        itemizedPlantationFee += qty * 40; // Expert planting labor & organic potting soil mix
      }
    } else if (cat === 'seeds' || item.name.toLowerCase().includes('seed')) {
      itemizedDeliveryFee += qty * 5; // Compact seed pouch delivery
    } else if (cat === 'fertilizers' || item.name.toLowerCase().includes('fertilizer') || item.name.toLowerCase().includes('compost')) {
      itemizedDeliveryFee += qty * 15; // Heavy organic compost handling charge
    } else if (cat === 'tools-pots' || item.name.toLowerCase().includes('pot')) {
      itemizedDeliveryFee += qty * 25; // Fragile pot bubble-wrap packaging
    } else {
      itemizedDeliveryFee += qty * 10;
    }
  });

  // Admin Configurable Delivery Settings
  const deliveryConfig = db.settings?.delivery || {
    baseFee: 30,
    perKmRate: 8,
    freeDeliveryThreshold: 499,
    maxFreeDeliveryKm: 10,
    plantationBaseFee: 100,
    plantationPerKmRate: 10
  };

  // Branch Distance Transit Charge: Base + (Distance KM * Per KM Rate)
  const branchDistanceFee = Number(deliveryConfig.baseFee) + (distance * Number(deliveryConfig.perKmRate));
  let calculatedDeliveryFee = itemizedDeliveryFee + branchDistanceFee;

  if (subtotal >= Number(deliveryConfig.freeDeliveryThreshold || 499) && distance <= Number(deliveryConfig.maxFreeDeliveryKm || 10)) {
    calculatedDeliveryFee = 0; // FREE Delivery threshold met
  }

  // Plantation Service Fee: Base dispatch + per-plant planting fee + Per KM gardener travel
  let calculatedPlantationFee = 0;
  if (isPlantation && plantItemCount > 0) {
    calculatedPlantationFee = Number(deliveryConfig.plantationBaseFee || 100) + itemizedPlantationFee + (distance * Number(deliveryConfig.plantationPerKmRate || 10));
  }

  const deliveryFee = req.body.deliveryFee !== undefined ? Number(req.body.deliveryFee) : calculatedDeliveryFee;
  const plantationFee = req.body.plantationFee !== undefined ? Number(req.body.plantationFee) : calculatedPlantationFee;
  const total = subtotal + deliveryFee + plantationFee;

  const newOrder = {
    id: 'VRK-' + Math.floor(10000 + Math.random() * 90000),
    customerName: resolvedName,
    phone: resolvedPhone,
    email: resolvedEmail,
    shippingAddress: resolvedAddress,
    ...(hasCoords ? { deliveryLat: latNum, deliveryLng: lngNum } : {}),
    orderDate: new Date().toISOString(),
    items,
    subtotal,
    distanceKm: distance,
    isPlantationRequested: isPlantation,
    plantationFee,
    deliveryFee,
    total,
    paymentMethod: paymentMethod || 'COD',
    paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'Paid',
    status: 'Placed',
    trackingHistory: [
      {
        status: 'Placed',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        detail: `Order placed successfully. Delivery distance: ${distance} KM. ${isPlantation ? 'Expert Plantation Service included!' : 'Standard delivery requested.'}`
      }
    ]
  };

  db.orders.unshift(newOrder);
  writeDB(db);

  res.status(201).json({ success: true, order: newOrder });
});

// Get Order details for tracking
app.get('/api/orders/:id', (req, res) => {
  const db = readDB();
  const order = (db.orders || []).find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Get all orders (for Seller / Nursery Dashboard)
app.get('/api/seller/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

// Update Order Status (Seller Dashboard)
app.put('/api/seller/orders/:id/status', (req, res) => {
  const db = readDB();
  const { status, detail } = req.body;
  const order = (db.orders || []).find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
  order.trackingHistory.push({
    status,
    time: timeStr,
    detail: detail || `Order status updated to ${status} by Nursery.`
  });

  writeDB(db);
  res.json({ success: true, order });
});

// Add New Product (Seller Dashboard)
app.post('/api/seller/products', (req, res) => {
  const db = readDB();
  const { name, category, price, originalPrice, nursery, sunlight, water, potSize, description, image } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, Category, and Price are required' });
  }

  const newProduct = {
    id: 'p' + (db.products.length + 1) + '_' + Date.now().toString().slice(-4),
    name,
    category,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.3),
    discount: originalPrice ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100) : 25,
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    stockCount: 50,
    deliveryFee: 40,
    deliveryEstimate: '2-3 Days',
    image: image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    nursery: nursery || 'Green Partner Nursery',
    sunlight: sunlight || 'Indirect Light',
    water: water || 'Twice a week',
    potSize: potSize || '6 inch pot',
    sowingSeason: 'All Season',
    description: description || 'Fresh high-grade plant directly from partner nursery.',
    careGuide: {
      light: 'Place in bright indirect light.',
      water: 'Water when top soil feels dry.',
      fertilizer: 'Add organic fertilizer once a month.',
      repotting: 'Repot as root grows.'
    }
  };

  db.products.unshift(newProduct);
  writeDB(db);
  res.status(201).json({ success: true, product: newProduct });
});

// Get Reviews for a Product
app.get('/api/reviews/:productId', (req, res) => {
  const db = readDB();
  const reviews = (db.reviews || []).filter(r => r.productId === req.params.productId);
  res.json(reviews);
});

// Submit Review
app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const { productId, userName, rating, comment } = req.body;
  
  const newReview = {
    id: 'r_' + Date.now(),
    productId,
    userName: userName || 'Gardening Enthusiast',
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    comment: comment || 'Very good quality product!'
  };

  db.reviews.unshift(newReview);
  writeDB(db);
  res.status(201).json({ success: true, review: newReview });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌿 Vruksha Server running on http://localhost:${PORT}`);
  });
}

module.exports = {
  app,
  buildDeliveryContext
};

```

## D.4 React Application Shell

Source: `frontend\src\App.jsx`

```javascript
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider, useProducts } from './context/ProductContext';

import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import OrderTrackingModal from './components/OrderTrackingModal';
import AdminDashboard from './components/AdminDashboard';
import SellerDashboard from './components/SellerDashboard';
import VivaGuideModal from './components/VivaGuideModal';
import Footer from './components/Footer';

import { SlidersHorizontal, Sun, Droplets, Sparkles } from 'lucide-react';

function ShopContent() {
  const { 
    products, 
    loading, 
    activeCategory, 
    setActiveCategory, 
    categories, 
    filters, 
    setFilters 
  } = useProducts();

  const currentCategoryObj = categories.find(c => c.id === activeCategory);

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Catalog & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {activeCategory === 'all' ? 'All Products' : currentCategoryObj?.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-1">
              {activeCategory === 'all' ? 'Explore Nursery Plants, Seeds & Fertilizers' : currentCategoryObj?.description}
            </h2>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <label className="text-slate-500">Sort By:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Smart Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Smart Filters</span>
                </h3>
                <button
                  onClick={() => setFilters({ maxPrice: 500, sunlight: 'all', water: 'all', sortBy: 'popular' })}
                  className="text-[11px] text-emerald-700 font-semibold hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Max Price</span>
                  <span className="text-emerald-800 font-serif">Up to ₹{filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Sunlight Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sunlight Needed</span>
                </label>
                <select
                  value={filters.sunlight}
                  onChange={(e) => setFilters(prev => ({ ...prev, sunlight: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="all">All Sunlight Types</option>
                  <option value="Indirect Light">Indirect Light / Shade</option>
                  <option value="Low to Bright Light">Low Light Compatible</option>
                  <option value="Full Sunlight">Full Direct Sun (6+ hrs)</option>
                </select>
              </div>

              {/* Water Need Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>Water Requirement</span>
                </label>
                <select
                  value={filters.water}
                  onChange={(e) => setFilters(prev => ({ ...prev, water: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="all">All Water Schedules</option>
                  <option value="Once a week">Low Water (Once a week)</option>
                  <option value="Alternate days">Moderate (Alternate days)</option>
                  <option value="Daily">Daily Watering</option>
                </select>
              </div>

            </div>

            {/* Sowing Season Feature Banner */}
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white p-5 rounded-2xl shadow-md space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Seasonal Sowing Alert</span>
              </div>
              <h4 className="font-extrabold text-sm leading-tight">Monsoon Vegetable & Flower Sowing</h4>
              <p className="text-xs text-amber-50 leading-relaxed">
                August is the best time to sow Tomato, Chilli, and Marigold seeds!
              </p>
              <button
                onClick={() => setActiveCategory('seeds')}
                className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors mt-2"
              >
                View Seasonal Seeds ➔
              </button>
            </div>
          </div>

          {/* Right Area: Products Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200 h-80 animate-pulse space-y-3">
                    <div className="bg-slate-200 rounded-xl h-44 w-full"></div>
                    <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                    <div className="bg-slate-200 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <p className="text-slate-500 font-bold text-sm">No products found matching your active filters.</p>
                <button
                  onClick={() => { setActiveCategory('all'); setFilters({ maxPrice: 500, sunlight: 'all', water: 'all', sortBy: 'popular' }); }}
                  className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}

function MainContent() {
  const { user } = useAuth();
  const { activeView } = useProducts();

  // 1. If not authenticated, force redirect to LoginPage first!
  if (!user) {
    return <LoginPage />;
  }

  // 2. If user is logged in, show requested view or role view
  const renderView = () => {
    if (activeView === 'admin' || (user.role === 'admin' && activeView !== 'shop' && activeView !== 'seller')) {
      return <AdminDashboard />;
    }
    if (activeView === 'seller') {
      return <SellerDashboard />;
    }
    return <ShopContent />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      {renderView()}

      <Footer />

      {/* Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <VivaGuideModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <MainContent />
          <OrderTrackingModal />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

```

## D.5 Authentication Context

Source: `frontend\src\context\AuthContext.jsx`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vruksha_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('vruksha_token') || null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vruksha_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vruksha_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('vruksha_token', token);
    } else {
      localStorage.removeItem('vruksha_token');
    }
  }, [token]);

  const registerUser = async ({ name, email, phone, password, address, pincode }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, address, pincode })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Registration failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithCredentials = async ({ identifier, password }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid credentials');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithOTP = async (identifier, name, otp, extra = {}) => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, otp, name, ...extra })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'OTP verification failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithGoogle = async (googleProfile) => {
    const res = await fetch('/api/auth/google/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleProfile)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Google authentication failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      registerUser,
      loginWithCredentials,
      loginWithOTP,
      loginWithGoogle,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


```

## D.6 Product Context

Source: `frontend\src\context\ProductContext.jsx`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [activeView, setActiveView] = useState('shop'); // 'shop' | 'seller' | 'viva'

  const [filters, setFilters] = useState({
    maxPrice: 500,
    sunlight: 'all',
    water: 'all',
    sortBy: 'popular'
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?';
      if (activeCategory !== 'all') url += `category=${activeCategory}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
      if (filters.sunlight !== 'all') url += `sunlight=${filters.sunlight}&`;
      if (filters.water !== 'all') url += `water=${filters.water}&`;
      if (filters.sortBy) url += `sortBy=${filters.sortBy}&`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, searchQuery, filters]);

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      setSelectedProduct,
      trackingOrderId,
      setTrackingOrderId,
      activeView,
      setActiveView,
      filters,
      setFilters,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);

```

## D.7 Cart and Pricing Context

Source: `frontend\src\context\CartContext.jsx`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('vruksha_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: {
          id: "p1",
          name: "Money Plant (Golden Pothos)",
          price: 149,
          originalPrice: 249,
          category: "indoor-plants",
          image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
          nursery: "Green Thumb Nursery, Bangalore"
        },
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('vruksha_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [distanceKm, setDistanceKm] = useState(5);
  const [isPlantationRequested, setIsPlantationRequested] = useState(false);

  useEffect(() => {
    localStorage.setItem('vruksha_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('vruksha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Calculate plant count and itemized per-product handling
  let plantItemCount = 0;
  let seedItemCount = 0;
  let fertilizerItemCount = 0;
  let potItemCount = 0;
  let itemizedHandlingFee = 0;

  cartItems.forEach(({ product, quantity }) => {
    const qty = quantity || 1;
    const cat = (product.category || '').toLowerCase();
    const pName = (product.name || '').toLowerCase();

    if (cat.includes('plant') || pName.includes('plant')) {
      plantItemCount += qty;
      itemizedHandlingFee += qty * 20; // live plant safe packaging
    } else if (cat === 'seeds' || pName.includes('seed')) {
      seedItemCount += qty;
      itemizedHandlingFee += qty * 5; // seed pouch packaging
    } else if (cat === 'fertilizers' || pName.includes('fertilizer') || pName.includes('compost')) {
      fertilizerItemCount += qty;
      itemizedHandlingFee += qty * 15; // heavy compost handling
    } else if (cat === 'tools-pots' || pName.includes('pot')) {
      potItemCount += qty;
      itemizedHandlingFee += qty * 25; // fragile ceramic packaging
    } else {
      itemizedHandlingFee += qty * 10;
    }
  });

  const FREE_DELIVERY_THRESHOLD = 499;
  
  // Branch Distance Fee: Base ₹30 + ₹8 per KM from Vruksha Main Nursery Hub (Indiranagar)
  let deliveryFee = 0;
  if (cartItems.length > 0) {
    const branchTransitFee = 30 + (distanceKm * 8);
    deliveryFee = itemizedHandlingFee + branchTransitFee;

    if (subtotal >= FREE_DELIVERY_THRESHOLD && distanceKm <= 10) {
      deliveryFee = 0; // FREE Delivery unlock
    }
  }

  // Plantation Service Fee: Base ₹100 dispatch + ₹40/plant planting labor & soil mix + ₹10/KM gardener travel
  let plantationFee = 0;
  if (cartItems.length > 0 && isPlantationRequested && plantItemCount > 0) {
    plantationFee = 100 + (plantItemCount * 40) + (distanceKm * 10);
  }

  // Payment method calculations
  const upiDiscountAmount = Math.round(subtotal * 0.05); // 5% Instant UPI Discount
  const codSurchargeAmount = 30; // ₹30 COD Handling Surcharge

  // Address-to-KM Distance Estimator Helper
  const calculateDistanceFromAddress = (addressStr) => {
    if (!addressStr) return 5;
    const addr = addressStr.toLowerCase();
    if (addr.includes('indiranagar') || addr.includes('domlur') || addr.includes('hal')) return 2;
    if (addr.includes('koramangala') || addr.includes('mg road') || addr.includes('richmond')) return 6;
    if (addr.includes('whitefield') || addr.includes('marathahalli') || addr.includes('bellandur')) return 14;
    if (addr.includes('electronic city') || addr.includes('bannerghatta')) return 22;
    if (addr.includes('yelahanka') || addr.includes('hebbal') || addr.includes('airport')) return 28;
    return Math.min(50, Math.max(3, Math.floor(addr.length / 4)));
  };

  const totalAmount = subtotal + deliveryFee + plantationFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      subtotal,
      distanceKm,
      setDistanceKm,
      isPlantationRequested,
      setIsPlantationRequested,
      plantItemCount,
      seedItemCount,
      fertilizerItemCount,
      potItemCount,
      calculateDistanceFromAddress,
      deliveryFee,
      plantationFee,
      totalAmount,
      upiDiscountAmount,
      codSurchargeAmount,
      FREE_DELIVERY_THRESHOLD,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

```

## D.8 Checkout Implementation

Source: `frontend\src\components\CheckoutModal.jsx`

```javascript
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import DeliveryMap from './DeliveryMap';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Banknote, Building2, Truck, ArrowRight, MapPin, Sprout, Navigation } from 'lucide-react';

export default function CheckoutModal({ onClose }) {
  const { 
    cartItems, 
    subtotal, 
    distanceKm, 
    setDistanceKm, 
    isPlantationRequested, 
    calculateDistanceFromAddress, 
    deliveryFee, 
    plantationFee, 
    upiDiscountAmount,
    codSurchargeAmount,
    clearCart, 
    setIsCartOpen 
  } = useCart();

  const { user, token } = useAuth();
  const { setTrackingOrderId } = useProducts();

  const [name, setName] = useState(user ? user.name : 'Rohan Sharma');
  const [phone, setPhone] = useState(user ? (user.phone || user.identifier || '+91 9876543210') : '+91 9876543210');
  const [email, setEmail] = useState(user ? (user.email || 'rohan.sharma@example.com') : 'rohan.sharma@example.com');
  const [address, setAddress] = useState(user?.address || 'Flat 402, Green Valley Apartments, Indiranagar, Bengaluru - 560038');
  const [pincode, setPincode] = useState(user?.pincode || '560038');
  const [mapLocation, setMapLocation] = useState({ lat: 12.9352, lng: 77.6245, address: address });
  const [branchInfo, setBranchInfo] = useState(null);
  const [serviceabilityError, setServiceabilityError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod' | 'netbanking'
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const upiDiscount = paymentMethod === 'upi' ? (upiDiscountAmount || 0) : 0;
  const codFee = paymentMethod === 'cod' ? (codSurchargeAmount || 0) : 0;
  const finalPayableTotal = Math.max(0, subtotal - upiDiscount + deliveryFee + plantationFee + codFee);

  const handleAddressChange = (newAddr) => {
    setAddress(newAddr);
    if (calculateDistanceFromAddress) {
      const calculatedKm = calculateDistanceFromAddress(newAddr);
      setDistanceKm(calculatedKm);
    }
  };

  const checkServiceability = async () => {
    setServiceabilityError('');
    setBranchInfo(null);
    try {
      const query = new URLSearchParams({ pincode, address });
      const res = await fetch(`/api/delivery/serviceability?${query.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Serviceability check failed');
      setBranchInfo(data);
      const estimated = data.state === 'India' ? 40 : Math.max(Number(distanceKm) || 5, 5);
      setDistanceKm(estimated);
    } catch (err) {
      setServiceabilityError(err.message);
    }
  };

  // Offline fallback: keep the order in this browser so Track Order can still find it
  const saveLocalOrder = (order) => {
    try { localStorage.setItem(`vruksha_order_${order.id}`, JSON.stringify(order)); } catch (e) {}
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackOrder = {
      id: 'VRK-' + Math.floor(10000 + Math.random() * 90000),
      customerName: name || 'Valued Customer',
      phone: phone || '+91 9876543210',
      email: email || 'customer@vruksha.com',
      shippingAddress: address,
      deliveryLat: mapLocation.lat,
      deliveryLng: mapLocation.lng,
      orderDate: new Date().toISOString(),
      items: cartItems.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      subtotal,
      distanceKm: distanceKm || 5,
      isPlantationRequested: Boolean(isPlantationRequested),
      plantationFee,
      deliveryFee,
      total: finalPayableTotal,
      paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay)' : paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit Card',
      paymentStatus: paymentMethod === 'cod' ? 'Pending (COD)' : 'Paid',
      status: 'Placed',
      trackingHistory: [
        {
          status: 'Placed',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detail: `Order placed successfully. Delivery distance: ${distanceKm || 5} KM.`
        }
      ]
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          customerName: name,
          phone,
          email,
          shippingAddress: address,
          deliveryLat: mapLocation.lat,
          deliveryLng: mapLocation.lng,
          pincode,
          distanceKm,
          isPlantationRequested,
          deliveryFee,
          plantationFee,
          paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay)' : paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit Card',
          items: cartItems.map(i => ({
            id: i.product.id,
            name: i.product.name,
            category: i.product.category,
            price: i.product.price,
            quantity: i.quantity
          }))
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data = null;
      if (contentType.includes('application/json')) {
        data = await res.json();
      }

      if (res.ok && data && data.success && data.order) {
        setPlacedOrder(data.order);
        localStorage.setItem('vruksha_latest_order_id', data.order.id);
        clearCart();
      } else {
        // Safe fallback so checkout never fails on proxy 404 HTML response
        const finalOrder = data?.order || fallbackOrder;
        if (!data?.order) saveLocalOrder(finalOrder);
        setPlacedOrder(finalOrder);
        localStorage.setItem('vruksha_latest_order_id', finalOrder.id);
        clearCart();
      }
    } catch (err) {
      console.error('Order placement API error, using fallback:', err);
      saveLocalOrder(fallbackOrder);
      setPlacedOrder(fallbackOrder);
      localStorage.setItem('vruksha_latest_order_id', fallbackOrder.id);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToTracking = (orderId) => {
    const idToTrack = orderId || placedOrder?.id || localStorage.getItem('vruksha_latest_order_id');
    if (idToTrack) {
      setTrackingOrderId(idToTrack);
    }
    onClose();
    setIsCartOpen(false);
  };

  if (placedOrder) {
    return (
      <div className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 font-serif">Order Confirmed! 🎉</h2>
            <p className="text-xs text-slate-500">Thank you for ordering with Vruksha. Your nursery partner has been notified.</p>
            <div className="bg-slate-100 p-3 rounded-xl inline-block text-xs font-mono font-bold text-emerald-900 border border-slate-200 mt-2">
              Order ID: {placedOrder.id}
            </div>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 text-xs text-left space-y-2">
            <div className="flex justify-between text-emerald-950 font-bold">
              <span>Amount Paid:</span>
              <span>₹{placedOrder.total}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Distance:</span>
              <span className="font-bold text-slate-800">{placedOrder.distanceKm || distanceKm} KM</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Plantation Service:</span>
              <span className="font-bold text-emerald-700">
                {placedOrder.isPlantationRequested ? 'Yes (Expert Gardener Scheduled)' : 'No'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <span>{placedOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleGoToTracking(placedOrder.id)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Order Status ➔</span>
            </button>

            <button
              onClick={() => { onClose(); setIsCartOpen(false); }}
              className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700 py-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h2 className="font-black text-slate-900 text-lg font-serif">Checkout & Payment</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="py-4 space-y-6">
          
          {/* Section 1: Customer Details & Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">1. Delivery Address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600">Complete Address (Distance auto-calculated from Vruksha Branch)</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="text-[11px] font-bold text-slate-600">Indian Pincode</label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <button type="button" onClick={checkServiceability} className="bg-slate-900 text-white rounded-xl px-4 py-2 text-xs font-bold">Check branch</button>
            </div>
            {branchInfo && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700">
                <p className="font-bold text-emerald-800">{branchInfo.branch.name}</p>
                <p>{branchInfo.district}, {branchInfo.state} · Delivery in {branchInfo.estimatedDays}</p>
                <a href={branchInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">Open branch in Google Maps</a>
              </div>
            )}
            {/* Live Interactive Delivery Map */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Route Map (Office HQ to Delivery Location)</span>
              </label>
              <DeliveryMap
                officeLocation={{ lat: 12.9716, lng: 77.5946, name: 'Vruksha Main HQ' }}
                deliveryLocation={mapLocation}
                onLocationChange={(newLoc) => {
                  setMapLocation(newLoc);
                  if (newLoc.distanceKm) {
                    setDistanceKm(newLoc.distanceKm);
                  }
                }}
                height="220px"
                interactive={true}
                cartSubtotal={subtotal}
              />
            </div>
          </div>

          {/* Service Summary Card (Distance & Plantation) */}
          <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-slate-700 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Delivery Distance:</span>
              </span>
              <span className="font-bold text-emerald-950">{distanceKm} KM (Calculated Delivery: {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`})</span>
            </div>
            {isPlantationRequested ? (
              <div className="flex justify-between items-center text-emerald-900 font-bold pt-1 border-t border-emerald-200">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>On-Site Plantation Service:</span>
                </span>
                <span>Included (₹{plantationFee})</span>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 pt-1 border-t border-emerald-100 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-slate-400" />
                <span>Plantation Service: Not requested (Delivery only)</span>
              </div>
            )}
          </div>

          {/* Section 2: Payment Options */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">2. Select Payment Option</h3>

            <div className="grid grid-cols-2 gap-2">
              <label className={`border p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-2.5 relative ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-400' : 'border-slate-200 text-slate-700'}`}>
                <input type="radio" name="pay" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                <QrCode className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold flex items-center gap-1">
                    <span>UPI / GPay</span>
                    <span className="text-[9px] bg-emerald-600 text-white font-black px-1.5 py-0.2 rounded-full">5% OFF</span>
                  </p>

// Listing shortened here; the complete source remains in the repository.

```

## D.9 Delivery Map Implementation

Source: `frontend\src\components\DeliveryMap.jsx`

```javascript
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Compass, Truck, Building2, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Calculate distance using Haversine formula
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Helper to create custom Leaflet marker icon
const createCustomIcon = (color, labelText) => {
  try {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="36" height="48">
        <path fill="${color}" stroke="#ffffff" stroke-width="20" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 0 1-35.464 0z"/>
        <circle cx="192" cy="192" r="70" fill="#ffffff"/>
      </svg>
    `;
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="relative group">
              <div class="drop-shadow-md">${svg}</div>
              <span class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm opacity-90">${labelText}</span>
            </div>`,
      iconSize: [36, 48],
      iconAnchor: [18, 48],
      popupAnchor: [0, -48]
    });
  } catch (e) {
    return null;
  }
};

export default function DeliveryMap({
  officeLocation = { lat: 12.9716, lng: 77.5946, name: 'Vruksha HQ, Bengaluru' },
  deliveryLocation = { lat: 12.9352, lng: 77.6245, address: 'Koramangala, Bengaluru' },
  onLocationChange,
  deliveryConfig = { baseFee: 30, perKmRate: 8, freeDeliveryThreshold: 499 },
  height = '360px',
  interactive = true,
  cartSubtotal = 0,
  movingDriver = false
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const deliveryMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const driverMarkerRef = useRef(null);

  const [currentDelivery, setCurrentDelivery] = useState(deliveryLocation);
  const [distanceKm, setDistanceKm] = useState(() =>
    calculateHaversineDistance(officeLocation.lat, officeLocation.lng, deliveryLocation.lat, deliveryLocation.lng)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Sync state if prop changes
  useEffect(() => {
    if (deliveryLocation.lat && deliveryLocation.lng) {
      setCurrentDelivery(deliveryLocation);
      const dist = calculateHaversineDistance(
        officeLocation.lat,
        officeLocation.lng,
        deliveryLocation.lat,
        deliveryLocation.lng
      );
      setDistanceKm(dist);
    }
  }, [deliveryLocation.lat, deliveryLocation.lng, officeLocation.lat, officeLocation.lng]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [(officeLocation.lat + currentDelivery.lat) / 2, (officeLocation.lng + currentDelivery.lng) / 2],
          zoom: 12,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const officeIcon = createCustomIcon('#059669', 'Vruksha HQ');
        const deliveryIcon = createCustomIcon('#dc2626', 'Delivery Point');

        // Add HQ Marker
        const hqMarker = officeIcon 
          ? L.marker([officeLocation.lat, officeLocation.lng], { icon: officeIcon })
          : L.marker([officeLocation.lat, officeLocation.lng]);
        hqMarker.addTo(map).bindPopup(`<b>🏢 ${officeLocation.name || 'Vruksha Dispatch HQ'}</b><br/>Dispatch Origin Hub`);

        // Add Delivery Marker
        const delMarkerOptions = { draggable: interactive };
        if (deliveryIcon) delMarkerOptions.icon = deliveryIcon;
        const delMarker = L.marker([currentDelivery.lat, currentDelivery.lng], delMarkerOptions).addTo(map);

        delMarker.bindPopup(`<b>📍 Delivery Destination</b><br/>${currentDelivery.address || 'Selected Delivery Location'}`);

        if (interactive) {
          delMarker.on('dragend', (e) => {
            const newPos = e.target.getLatLng();
            const newLat = Number(newPos.lat.toFixed(4));
            const newLng = Number(newPos.lng.toFixed(4));
            const updatedLoc = { lat: newLat, lng: newLng, address: `Lat: ${newLat}, Lng: ${newLng}` };
            setCurrentDelivery(updatedLoc);
            const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
            setDistanceKm(dist);
            if (onLocationChange) {
              onLocationChange({ ...updatedLoc, distanceKm: dist });
            }
          });

          // Click map to reposition pin
          map.on('click', (e) => {
            const newLat = Number(e.latlng.lat.toFixed(4));
            const newLng = Number(e.latlng.lng.toFixed(4));
            delMarker.setLatLng([newLat, newLng]);
            const updatedLoc = { lat: newLat, lng: newLng, address: `Selected Pin (${newLat}, ${newLng})` };
            setCurrentDelivery(updatedLoc);
            const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
            setDistanceKm(dist);
            if (onLocationChange) {
              onLocationChange({ ...updatedLoc, distanceKm: dist });
            }
          });
        }

        deliveryMarkerRef.current = delMarker;

        // Polyline (Route line)
        const line = L.polyline(
          [
            [officeLocation.lat, officeLocation.lng],
            [currentDelivery.lat, currentDelivery.lng]
          ],
          { color: '#059669', weight: 4, dashArray: '8, 8', opacity: 0.85 }
        ).addTo(map);
        polylineRef.current = line;

        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.error('Leaflet map initialization error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map polyline and marker on location update
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (deliveryMarkerRef.current) {
      deliveryMarkerRef.current.setLatLng([currentDelivery.lat, currentDelivery.lng]);
    }

    if (polylineRef.current) {
      polylineRef.current.setLatLngs([
        [officeLocation.lat, officeLocation.lng],
        [currentDelivery.lat, currentDelivery.lng]
      ]);
    }

    // Fit bounds smoothly
    const bounds = L.latLngBounds([
      [officeLocation.lat, officeLocation.lng],
      [currentDelivery.lat, currentDelivery.lng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  }, [currentDelivery.lat, currentDelivery.lng, officeLocation.lat, officeLocation.lng]);

  // Handle Animated Delivery Driver Movement
  useEffect(() => {
    if (!movingDriver || !mapInstanceRef.current) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress > 1) progress = 0;

      const currentLat = officeLocation.lat + (currentDelivery.lat - officeLocation.lat) * progress;
      const currentLng = officeLocation.lng + (currentDelivery.lng - officeLocation.lng) * progress;

      if (!driverMarkerRef.current) {
        const driverIcon = L.divIcon({
          className: 'driver-marker',
          html: `<div class="bg-amber-500 text-slate-950 p-2 rounded-full shadow-lg border-2 border-white animate-bounce"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        driverMarkerRef.current = L.marker([currentLat, currentLng], { icon: driverIcon }).addTo(mapInstanceRef.current);
      } else {
        driverMarkerRef.current.setLatLng([currentLat, currentLng]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [movingDriver, officeLocation, currentDelivery]);

  // Calculate pricing
  const baseFee = Number(deliveryConfig.baseFee || 30);
  const perKmRate = Number(deliveryConfig.perKmRate || 8);
  const distFee = Math.round(distanceKm * perKmRate);
  const rawDeliveryCharge = baseFee + distFee;

  const isFreeDelivery = cartSubtotal >= (deliveryConfig.freeDeliveryThreshold || 499) && distanceKm <= 10;
  const finalDeliveryCharge = isFreeDelivery ? 0 : rawDeliveryCharge;

  // Search Address Location via Nominatim OpenStreetMap Geocoding API
  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', India')}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const first = data[0];
        const newLat = Number(parseFloat(first.lat).toFixed(4));
        const newLng = Number(parseFloat(first.lon).toFixed(4));
        const updatedLoc = { lat: newLat, lng: newLng, address: first.display_name };
        setCurrentDelivery(updatedLoc);
        const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
        setDistanceKm(dist);
        if (onLocationChange) {
          onLocationChange({ ...updatedLoc, distanceKm: dist });
        }
      } else {
        alert('Location not found. Try dragging the marker on the map directly.');
      }
    } catch (err) {
      console.error('Location search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-0">
      
      {/* Search Bar & Address Header */}
      {interactive && (
        <div className="p-3 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Compass className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Select Delivery Location on Map</span>
          </div>

          <form onSubmit={handleSearchLocation} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search area, city or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap"
            >
              {isSearching ? 'Locating...' : 'Search Location'}
            </button>
          </form>
        </div>
      )}

      {/* Map Display Container */}
      <div className="relative w-full" style={{ height }}>
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Real-time HUD */}
        <div className="absolute top-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700 max-w-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
              <Truck className="w-4 h-4" />
              <span>Route & Distance</span>
            </div>
            <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/50">
              {distanceKm} KM
            </span>
          </div>

          <div className="text-[11px] space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>Office HQ Origin:</span>
              <span className="font-bold text-slate-100">{officeLocation.city || 'Bengaluru HQ'}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Rate:</span>
              <span className="font-bold text-slate-100">₹{baseFee} + ₹{perKmRate}/KM</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1 font-bold text-xs">
              <span className="text-slate-200">Delivery Charge:</span>
              <span className={isFreeDelivery ? 'text-emerald-400 font-extrabold' : 'text-emerald-400'}>
                {isFreeDelivery ? 'FREE (Special Offer)' : `₹${finalDeliveryCharge}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Badge */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span>Origin: <b>{officeLocation.name || 'Vruksha Main HQ'}</b></span>
        </div>
        <div className="flex items-center gap-2 font-medium text-slate-600">
          <MapPin className="w-4 h-4 text-red-600" />
          <span className="truncate max-w-xs">Destination: <b>{currentDelivery.address}</b></span>
        </div>
      </div>


// Listing shortened here; the complete source remains in the repository.

```

## D.10 Seller Dashboard

Source: `frontend\src\components\SellerDashboard.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Store, Plus, Package, Truck, DollarSign, CheckCircle2, AlertCircle, Image, RefreshCw } from 'lucide-react';

export default function SellerDashboard() {
  const { products, refreshProducts, setTrackingOrderId } = useProducts();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'add'

  // Add Product Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('indoor-plants');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [nursery, setNursery] = useState('Green Paradise Nursery, Bengaluru');
  const [sunlight, setSunlight] = useState('Indirect Light');
  const [water, setWater] = useState('Twice a week');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/seller/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price,
          originalPrice,
          nursery,
          sunlight,
          water,
          description,
          image: image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Product added successfully to nursery catalog!');
        setName('');
        setPrice('');
        setOriginalPrice('');
        setDescription('');
        setImage('');
        refreshProducts();
        setActiveTab('products');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to add product');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/seller/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          detail: `Status updated to ${newStatus} by Nursery Admin`
        })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Partner Vendor Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif">Nursery & Seed Vendor Dashboard</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl">
              List plants, manage organic seed inventory, process customer dispatches, and track daily sales analytics.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Catalog Items</p>
              <p className="text-xl font-black text-white">{products.length}</p>
            </div>
            <div className="border-x border-white/10 px-3">
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Live Orders</p>
              <p className="text-xl font-black text-amber-300">{orders.length}</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Total Sales</p>
              <p className="text-xl font-black text-emerald-300">₹{totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 text-xs font-bold pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'add'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* TAB 1: Product Inventory */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 text-sm">Listed Nursery Products</h3>
            <button
              onClick={() => setActiveTab('add')}
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Nursery Partner</th>
                  <th className="p-3">Care Specs</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div>
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400">ID: {p.id}</p>
                      </div>
                    </td>
                    <td className="p-3 capitalize font-semibold text-emerald-700">{p.category}</td>
                    <td className="p-3 font-bold font-serif text-slate-900">₹{p.price}</td>
                    <td className="p-3 text-slate-600">{p.nursery}</td>
                    <td className="p-3 text-[11px] text-slate-500">{p.sunlight} | {p.water}</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        In Stock ({p.stockCount || 50})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Incoming Customer Orders</h3>
            <button 
              onClick={fetchOrders}
              className="text-xs text-emerald-700 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Orders</span>
            </button>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Order ID</span>
                    <h4 className="font-black text-slate-900 font-mono text-sm">{order.id}</h4>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Customer</span>
                    <p className="font-bold text-slate-800">{order.customerName} ({order.phone})</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Distance</span>
                    <p className="font-bold text-emerald-800">{order.distanceKm || 5} KM</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Plantation Service</span>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.isPlantationRequested 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {order.isPlantationRequested ? 'Requested (₹' + (order.plantationFee || 0) + ')' : 'No'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total Bill</span>
                    <p className="font-black text-emerald-950 font-serif text-sm">₹{order.total}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Update Status</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-bold text-slate-700 mb-1">Items Ordered:</p>
                    <ul className="space-y-1 text-slate-600">
                      {order.items?.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.name} x {item.quantity}</span>
                          <span className="font-bold">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-700 mb-1">Shipping Address:</p>
                    <p className="text-slate-600 leading-tight text-[11px]">{order.shippingAddress}</p>
                    <button
                      onClick={() => setTrackingOrderId(order.id)}
                      className="mt-2 text-emerald-700 font-bold text-[11px] underline"
                    >
                      Open Live Tracking View ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Add New Product Form */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-900 text-base font-serif">Add New Product to Vruksha Catalog</h3>
            <p className="text-xs text-slate-500">List plants, seeds, fertilizers, or pots with care guidelines.</p>
          </div>

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl font-bold text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Neem Oil Spray (500 ml)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="indoor-plants">Indoor Plants</option>

// Listing shortened here; the complete source remains in the repository.

```

## D.11 Admin Dashboard

Source: `frontend\src\components\AdminDashboard.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import DeliveryMap from './DeliveryMap';
import { 
  ShieldCheck, 
  DollarSign, 
  Navigation, 
  Package, 
  MapPin, 
  Truck, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  Building2, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const { products, refreshProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('prices'); // 'prices' | 'delivery' | 'orders' | 'hubs'
  const [settings, setSettings] = useState({
    officeLocation: {
      name: 'Vruksha HQ & Central Dispatch Hub',
      address: '100 Feet Road, Indiranagar, MG Road, Bengaluru, Karnataka 560038',
      city: 'Bengaluru',
      state: 'Karnataka',
      lat: 12.9716,
      lng: 77.5946,
      phone: '+91 80 4567 8900'
    },
    delivery: {
      baseFee: 30,
      perKmRate: 8,
      freeDeliveryThreshold: 499,
      maxFreeDeliveryKm: 10,
      plantationBaseFee: 100,
      plantationPerKmRate: 10
    },
    hubs: []
  });

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Editing state for Product prices & filter
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('all');
  const [editingPrice, setEditingPrice] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'indoor-plants',
    price: 199,
    originalPrice: 299,
    nursery: 'Vruksha Main HQ Nursery',
    sunlight: 'Indirect Light',
    water: 'Once a week',
    description: 'Fresh quality healthy plant.'
  });

  // Selected Order for Route Map Modal
  const [selectedOrderForMap, setSelectedOrderForMap] = useState(null);

  // Fetch Settings & Orders
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [resSet, resOrd] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/seller/orders')
      ]);
      const dataSet = await resSet.json();
      const dataOrd = await resOrd.json();

      if (dataSet && dataSet.delivery) {
        setSettings(dataSet);
      }
      if (Array.isArray(dataOrd)) {
        setOrders(dataOrd);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Handle Save Delivery Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving settings...');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Settings updated successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      setSaveStatus('Error updating settings');
    }
  };

  // Handle Product Price Update
  const handleSaveProductPrice = async (productId) => {
    const edit = editingPrice[productId];
    if (!edit) return;

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(edit.price),
          originalPrice: Number(edit.originalPrice || edit.price * 1.3),
          inStock: edit.inStock !== undefined ? edit.inStock : true,
          stockCount: Number(edit.stockCount || 20)
        })
      });
      const data = await res.json();
      if (data.success) {
        refreshProducts();
        setSaveStatus(`Updated price for product ${productId}`);
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      alert('Failed to update product price');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        refreshProducts();
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Handle Add Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        refreshProducts();
        setShowAddProduct(false);
        setNewProduct({
          name: '',
          category: 'indoor-plants',
          price: 199,
          originalPrice: 299,
          nursery: 'Vruksha Main HQ Nursery',
          sunlight: 'Indirect Light',
          water: 'Once a week',
          description: 'Fresh quality healthy plant.'
        });
      }
    } catch (err) {
      alert('Failed to add product');
    }
  };

  // Handle Order Status Update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/seller/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, detail: `Status changed to ${newStatus} by Admin` })
      });
      const data = await res.json();
      if (data.success) {
        loadAdminData();
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
              Admin Access Control Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-serif mt-1 flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <span>Vruksha Platform Administration</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Control product pricing, delivery rate per KM, dispatch hubs & live order fulfillment routes.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Products</span>
              <p className="text-lg font-black text-emerald-400">{products.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Active Orders</span>
              <p className="text-lg font-black text-amber-400">{orders.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[110px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Per KM Rate</span>
              <p className="text-lg font-black text-blue-400">₹{settings.delivery?.perKmRate}/km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prices'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Product Prices & Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'delivery'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Delivery Rates (Per KM), UPI & COD Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Order Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Revenue & Inventory Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('hubs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hubs'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Dispatch Hubs</span>
          </button>
        </div>

        {saveStatus && (
          <div className="bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* TAB 1: PRODUCT PRICES & CATALOG */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Product Catalog & Price Control ({products.length} Items)</h2>
                <p className="text-xs text-slate-400">Search products, edit prices, stock, or add new plants & seeds.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
                />

                <select
                  value={adminCategoryFilter}
                  onChange={(e) => setAdminCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 px-3 py-2 rounded-xl focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="indoor-plants">Indoor Plants</option>
                  <option value="outdoor-plants">Outdoor Plants</option>
                  <option value="rare-species">Rare & Exotic (💎)</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="tools-pots">Tools & Pots</option>
                </select>

                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Add Product Drawer Form */}
            {showAddProduct && (

// Listing shortened here; the complete source remains in the repository.

```

## D.12 Product Card

Source: `frontend\src\components\ProductCard.jsx`

```javascript
import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import CareGuideBadge from './CareGuideBadge';
import { Star, Heart, ShoppingCart, Eye, Store } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { setSelectedProduct } = useProducts();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted 
                ? 'bg-rose-50 text-rose-600 shadow-sm' 
                : 'bg-white/80 text-slate-600 hover:text-rose-500'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              Quick View
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Nursery Tag */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Store className="w-3 h-3 text-emerald-600" />
            <span className="truncate">{product.nursery}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-slate-900 text-sm leading-snug hover:text-emerald-700 cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Care Badges (Sunlight & Water) */}
          <div className="pt-1">
            <CareGuideBadge sunlight={product.sunlight} water={product.water} compact={true} />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs pt-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[11px]">({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-emerald-950 font-serif">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <p className="text-[10px] text-emerald-700 font-medium">Free delivery over ₹399</p>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-200 hover:shadow-lg active:scale-95 flex items-center gap-1.5 text-xs font-bold"
          title="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}

```

## D.13 Product Detail Modal

Source: `frontend\src\components\ProductDetailModal.jsx`

```javascript
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import CareGuideBadge from './CareGuideBadge';
import { X, Star, ShoppingCart, Truck, ShieldCheck, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();

  const [pincode, setPincode] = useState('560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care'); // 'care' | 'reviews'

  if (!selectedProduct) return null;

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Delivery Estimator */}
          <div className="p-6 bg-slate-50 border-r border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {selectedProduct.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {selectedProduct.discount}% OFF
                  </span>
                )}
              </div>

              {/* Nursery Source Badge */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Partner Nursery Sourced</p>
                  <p className="text-[11px] text-emerald-700">{selectedProduct.nursery}</p>
                </div>
              </div>
            </div>

            {/* Pincode & Delivery Date Estimator */}
            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Check Delivery Date & Availability</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value); setPincodeChecked(false); }}
                  placeholder="Enter Pincode"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="bg-emerald-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Delivery available by <strong>2-3 Business Days</strong> with eco-protective transit box.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details, Care Instructions & Purchase */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400 font-normal">({selectedProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-xl font-black text-slate-900 font-serif leading-tight">{selectedProduct.name}</h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-black text-emerald-950 font-serif">₹{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">₹{selectedProduct.originalPrice}</span>
                  )}
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Inclusive of all taxes. Free delivery on orders above ₹399.</p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>

              {/* Tabs: Plant Care Guide vs Reviews */}
              <div className="border-b border-slate-200 flex gap-4 text-xs font-bold pt-2">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'care' 
                      ? 'border-emerald-600 text-emerald-700' 
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  🌿 Plant Care Instructions
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'reviews' 
                      ? 'border-emerald-600 text-emerald-700' 
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  ⭐ Reviews & Ratings
                </button>
              </div>

              {/* Tab Content: Care Instructions */}
              {activeTab === 'care' && (
                <div className="space-y-3">
                  <CareGuideBadge sunlight={selectedProduct.sunlight} water={selectedProduct.water} />

                  {selectedProduct.careGuide && (
                    <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1.5 border border-slate-200">
                      <p><strong>💡 Light:</strong> {selectedProduct.careGuide.light}</p>
                      <p><strong>💧 Water:</strong> {selectedProduct.careGuide.water}</p>
                      <p><strong>🌾 Fertilizer:</strong> {selectedProduct.careGuide.fertilizer}</p>
                      <p><strong>🪴 Potting:</strong> {selectedProduct.careGuide.repotting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Ananya Rao (Verified Buyer)</span>
                      <span className="text-amber-500">★★★★★</span>
                    </div>
                    <p className="text-slate-600">"Arrived in brilliant condition! The plant wrap kept the soil intact during 3 days transit."</p>
                  </div>

                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Kavita Sharma</span>
                      <span className="text-amber-500">★★★★★</span>
                    </div>
                    <p className="text-slate-600">"Very useful care guide included with sunlight and water details."</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Select Quantity</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden text-xs">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-bold text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { addToCart(selectedProduct, quantity); setSelectedProduct(null); }}
                  className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-200"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

```

## D.14 Cart Drawer

Source: `frontend\src\components\CartDrawer.jsx`

```javascript
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck, MapPin, Sprout } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    distanceKm,
    setDistanceKm,
    isPlantationRequested,
    setIsPlantationRequested,
    totalPlantCount,
    deliveryFee, 
    plantationFee,
    totalAmount, 
    FREE_DELIVERY_THRESHOLD,
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryDiff = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end">
        <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250 border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-base font-serif">Your Shopping Cart</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Bar */}
          <div className="bg-emerald-50 p-3 border-b border-emerald-100 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-emerald-900 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {freeDeliveryDiff > 0 ? (
                  <span>Add <strong>₹{freeDeliveryDiff}</strong> more for <strong>FREE Delivery (≤10 KM)</strong></span>
                ) : (
                  <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Delivery (up to 10 KM)!</span>
                )}
              </span>
            </div>
            <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List & Delivery/Plantation Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-sm">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Explore our wide range of plants, organic seeds, and fertilizers!</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map(({ product, quantity }) => (
                    <div 
                      key={product.id}
                      className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-center justify-between"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{product.nursery}</p>
                        <p className="text-xs font-black text-emerald-950 mt-1 font-serif">₹{product.price}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 hover:bg-slate-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-slate-800">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 hover:bg-slate-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plantation Service Card Option */}
                <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
                  isPlantationRequested 
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPlantationRequested}
                      onChange={(e) => setIsPlantationRequested(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Sprout className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">Add Professional Plantation Service</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Expert gardener comes to your doorstep with soil mix & pots to plant all {totalPlantCount} item(s).
                      </p>
                    </div>
                  </label>

                  {isPlantationRequested && (
                    <div className="text-[11px] bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-950 font-medium space-y-1">
                      <div className="flex justify-between">
                        <span>Plantation Setup Charge:</span>
                        <span className="font-bold">₹100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plant Planting Fee ({totalPlantCount} plants × ₹40):</span>
                        <span className="font-bold">₹{totalPlantCount * 40}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gardener Travel ({distanceKm} KM × ₹10):</span>
                        <span className="font-bold">₹{distanceKm * 10}</span>
                      </div>
                      <div className="flex justify-between font-bold text-emerald-800 pt-1 border-t border-emerald-100">
                        <span>Total Plantation Cost:</span>
                        <span>₹{plantationFee}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Express Nursery Delivery</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {isPlantationRequested && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Plantation Service Charges</span>
                    <span className="font-bold">₹{plantationFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100 font-serif">
                  <span>Total Amount</span>
                  <span className="text-emerald-950">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout (₹{totalAmount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe Transit Guarantee & Direct Nursery Packaging</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
```

## D.15 Order Tracking Modal

Source: `frontend\src\components\OrderTrackingModal.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import DeliveryMap from './DeliveryMap';
import { X, Truck, MapPin, PhoneCall, Sprout, Navigation } from 'lucide-react';

const STATUS_STEPS = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const STEP_DETAILS = {
  "Placed": "Order placed successfully. Nursery team notified.",
  "Packed": "Packed with eco-friendly protective plant wrap.",
  "Shipped": "Handed over to Express Agri Delivery partner.",
  "Out for Delivery": "Delivery executive Sunil Kumar & Expert Gardener are out for delivery.",
  "Delivered": "Order successfully delivered & plantation completed!"
};

export default function OrderTrackingModal() {
  const { trackingOrderId, setTrackingOrderId } = useProducts();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch or initialize order details
  useEffect(() => {
    if (!trackingOrderId) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/orders/${trackingOrderId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!isMounted) return;
        if (data && data.id) {
          setOrder(data);
        } else {
          // Default fallback order data starting from "Placed" for auto simulation
          setOrder({
            id: trackingOrderId,
            customerName: "Rohan Sharma",
            phone: "+91 9876543210",
            shippingAddress: "#42, 4th Cross, Indiranagar, Bengaluru - 560038",
            orderDate: new Date().toISOString(),
            distanceKm: 5.4,
            isPlantationRequested: true,
            total: 597,
            status: "Placed",
            trackingHistory: [
              { 
                status: "Placed", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                detail: STEP_DETAILS["Placed"]
              }
            ]
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setOrder({
            id: trackingOrderId,
            customerName: "Rohan Sharma",
            phone: "+91 9876543210",
            shippingAddress: "#42, 4th Cross, Indiranagar, Bengaluru - 560038",
            orderDate: new Date().toISOString(),
            distanceKm: 5.4,
            isPlantationRequested: true,
            total: 597,
            status: "Placed",
            trackingHistory: [
              { 
                status: "Placed", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                detail: STEP_DETAILS["Placed"]
              }
            ]
          });
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [trackingOrderId]);

  // 2. Automated status transition timer: Advances to next status step every 4 seconds
  useEffect(() => {
    if (!order || !order.status) return;

    const currentIdx = STATUS_STEPS.indexOf(order.status);
    if (currentIdx >= 0 && currentIdx < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentIdx + 1];
      const timer = setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const detailText = STEP_DETAILS[nextStatus] || `Order is now ${nextStatus}.`;

        setOrder(prev => {
          if (!prev) return prev;
          const currentHistory = prev.trackingHistory || [];
          const exists = currentHistory.some(h => h.status === nextStatus);

          return {
            ...prev,
            status: nextStatus,
            trackingHistory: exists 
              ? currentHistory 
              : [...currentHistory, { status: nextStatus, time: timeNow, detail: detailText }]
          };
        });

        // Optionally inform backend about status update
        if (order.id) {
          fetch(`/api/seller/orders/${order.id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus, detail: detailText })
          }).catch(() => {});
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [order?.status, order?.id]);

  if (!trackingOrderId) return null;

  const currentIdx = order ? Math.max(0, STATUS_STEPS.indexOf(order.status)) : 0;
  const isDelivered = order?.status === 'Delivered';

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-black text-slate-900 text-base font-serif">Order Tracking</h2>
          </div>
          <button 
            onClick={() => setTrackingOrderId(null)} 
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-xs font-medium">
            Loading order details...
          </div>
        ) : order ? (
          <div className="py-4 space-y-5">
            
            {/* Order Brief Box */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Order ID</span>
                <h3 className="font-black text-emerald-400 text-sm font-mono">{order.id}</h3>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Distance</span>
                <p className="font-extrabold text-amber-400">{order.distanceKm || 5.4} KM</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Plantation</span>
                <p className="font-bold text-emerald-300">{order.isPlantationRequested ? 'Requested' : 'No'}</p>
              </div>
              <div className={`font-black px-3 py-1 rounded-full text-[11px] transition-colors ${
                isDelivered ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
              }`}>
                Status: {order.status}
              </div>
            </div>

            {/* Live Animated Map */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-700 font-bold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Route Map</span>
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border transition-all ${
                  isDelivered 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {isDelivered ? '✅ Order Delivered' : '🚚 Vehicle In Transit (Live)'}
                </span>
              </div>

              <DeliveryMap
                officeLocation={{ lat: 12.9716, lng: 77.5946, name: 'Vruksha Main HQ' }}
                deliveryLocation={{
                  lat: 12.9352,
                  lng: 77.6245,
                  address: order.shippingAddress
                }}
                height="240px"
                interactive={false}
                movingDriver={!isDelivered}
              />
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Delivery Status</h3>
                {!isDelivered && (
                  <span className="text-[10px] font-semibold text-emerald-600 animate-pulse">
                    Auto-advancing stages...
                  </span>
                )}
              </div>
              
              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-4 py-1">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="relative group">
                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-950 font-black' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step}
                          </h4>
                          {isCurrent && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                              Active Step
                            </span>
                          )}
                        </div>

                        {isDone && (
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {order.trackingHistory?.find(h => h.status === step)?.detail || STEP_DETAILS[step] || `Step ${step} completed.`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Agent & Address Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Destination Address</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{order.shippingAddress}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Logistics Partner</span>
                </div>
                <p className="text-[11px] text-slate-600">Sunil Kumar (+91 9811223344)</p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  {order.isPlantationRequested ? (
                    <>
                      <Sprout className="w-3 h-3 text-emerald-600" />
                      <span>Gardener Ramesh assigned for plantation</span>
                    </>
                  ) : (
                    <span>Green Express Delivery Partner</span>
                  )}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setTrackingOrderId(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
```

## D.16 Navigation Bar

Source: `frontend\src\components\Navbar.jsx`

```javascript
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import LocationPickerModal from './LocationPickerModal';
import { 
  Sprout, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Store, 
  BookOpen, 
  Truck, 
  LogOut,
  Sparkles,
  MapPin,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, setIsLoginModalOpen } = useAuth();
  const { cartItems, wishlist, setIsCartOpen, distanceKm } = useCart();
  const { 
    categories, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    setTrackingOrderId,
    activeView,
    setActiveView 
  } = useProducts();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-emerald-100">
        
        {/* Top Announcement & Location Bar */}
        <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Monsoon Sowing Special: Free Express Nursery Delivery on orders &gt; ₹499!</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 transition-colors text-[11px]"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Route Map ({distanceKm || 5.2} KM)</span>
            </button>

            {isAdmin && (
              <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
                ADMIN LOGGED IN
              </span>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <div 
              onClick={() => { setActiveView('shop'); setActiveCategory('all'); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-emerald-950 font-serif">VRUKSHA</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">AGRI-TECH</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium -mt-1 italic">Real-Time Plants & Logistics</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search plants, organic seeds, NPK fertilizers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 text-slate-800 pl-10 pr-4 py-2 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all border border-transparent"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Admin Control Dashboard Toggle (if Admin) */}
              {isAdmin && (
                <button
                  onClick={() => setActiveView(activeView === 'admin' ? 'shop' : 'admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    activeView === 'admin' 
                      ? 'bg-emerald-600 text-slate-950 font-black' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{activeView === 'admin' ? 'Store Front' : 'Admin Controls'}</span>
                </button>
              )}

              {/* Delivery Route Map Modal Trigger */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border border-slate-200"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Delivery Map</span>
              </button>

              {/* Order Tracking */}
              <button
                onClick={() => {
                  const latestId = localStorage.getItem('vruksha_latest_order_id') || trackingOrderId || 'VRK-80921';
                  setTrackingOrderId(latestId);
                }}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                title="Track order status"
              >
                <Truck className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">Track Order</span>
              </button>

              {/* Cart Drawer */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-200"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {totalCartCount > 0 && (
                  <span className="bg-white text-emerald-800 text-[11px] font-black px-1.5 py-0.2 rounded-full min-w-5 text-center">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* User Account / Logout */}
              {user ? (
                <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <p className="font-bold text-slate-800 leading-tight truncate max-w-[100px]">{user.name}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold capitalize">{user.role || 'customer'}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Login</span>
                </button>
              )}

            </div>
          </div>
        </div>

        {/* Sub-navbar Category Links */}
        <div className="bg-slate-50 border-t border-slate-200/80 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-6 overflow-x-auto py-2.5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => { setActiveView('shop'); setActiveCategory('all'); }}
              className={`px-3.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === 'all' && activeView === 'shop'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              🌿 All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveView('shop'); setActiveCategory(cat.id); }}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat.id && activeView === 'shop'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}

```

## D.17 Login Page

Source: `frontend\src\pages\LoginPage.jsx`

```javascript
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Leaf, 
  CheckCircle2, 
  KeyRound, 
  UserCheck,
  Send,
  X,
  MapPin,
  Phone
} from 'lucide-react';

export default function LoginPage() {
  const { loginWithCredentials, registerUser, loginWithOTP, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState('signin'); // 'signin' | 'register' | 'otp'
  const [otpStep, setOtpStep] = useState(1);
  const [otpCode, setOtpCode] = useState('');

  // Form fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  // Google Sign In Handler
  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithGoogle({ email: googleEmail.trim().toLowerCase(), name: googleName.trim() || googleEmail.split('@')[0] });
      setSuccess('Successfully authenticated with Google!');
      setShowGoogleModal(false);
    } catch (err) {
      setError('Google Sign-In failed: ' + (err.message || 'Authentication error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your email address/mobile and password.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithCredentials({ identifier: identifier.trim(), password });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please provide your full name, email address, and password.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await registerUser({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password, address: address.trim(), pincode: pincode.trim() });
      setSuccess('Account created successfully! Logging you in...');
    } catch (err) {
      setError(err.message || 'Registration failed. User may already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailOTP = async (e) => {
    e.preventDefault();
    const targetEmail = email || identifier;
    if (!targetEmail || !targetEmail.includes('@')) {
      setError('Please enter a valid email address to receive a verification code.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail.trim().toLowerCase(), identifier: targetEmail.trim().toLowerCase() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpStep(2);
        setOtpCode('');
        setSuccess(`Verification code sent to ${targetEmail}! Please check your email inbox.`);
      } else {
        setError(data.error || 'Failed to send OTP code to email.');
      }
    } catch (err) {
      setError('Email verification service connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    const targetEmail = email || identifier;
    if (!targetEmail || !otpCode) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      await loginWithOTP(targetEmail.trim().toLowerCase(), name.trim() || targetEmail.split('@')[0], otpCode.trim(), { address: address.trim(), pincode: pincode.trim() });
    } catch (err) {
      setError(err.message || 'Email verification code invalid or expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header / Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-green-400 shadow-xl shadow-emerald-950 border border-emerald-400/30">
          <Leaf className="w-9 h-9 text-slate-950" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white font-serif">
          Vruksha Nursery & Logistics
        </h1>
        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 border border-emerald-800/50 py-1 px-3 rounded-full inline-block">
          Plants, Seeds & Live Logistics Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-10 px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 space-y-6">

          {/* GOOGLE SIGN IN BUTTON */}
          <div>
            <button
              onClick={() => { setShowGoogleModal(true); resetMessages(); }}
              disabled={isLoading}
              type="button"
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-3 shadow-sm hover:border-emerald-500/50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google Account</span>
            </button>
          </div>

          {/* DIVIDER */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Or sign in with email</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-800 font-semibold text-xs">
            <button
              onClick={() => { setMode('signin'); resetMessages(); }}
              className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                mode === 'signin'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); resetMessages(); }}
              className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                mode === 'register'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setMode('otp'); resetMessages(); setOtpStep(1); }}
              className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                mode === 'otp'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Email OTP
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-950/80 border border-red-800 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="your.email@example.com or 9876543210"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In to Vruksha Portal ➔'}</span>
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Delivery Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Street Address, City, State"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Pincode</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit Pincode (e.g. 560038)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create New Account ➔'}</span>
              </button>
            </form>
          )}

          {/* EMAIL OTP FORM */}
          {mode === 'otp' && (
            <div className="space-y-4">
              {otpStep === 1 ? (
                <form onSubmit={handleSendEmailOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Enter Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={email || identifier}
                        onChange={(e) => { setEmail(e.target.value); setIdentifier(e.target.value); }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Verification Code to Email ➔</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyEmailOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-center tracking-widest text-lg font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Verify Code & Access Store ➔</span>
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            🌿 Vruksha Real-Time Logistics & Organic Nursery System
          </div>

        </div>
      </div>

      {/* GOOGLE AUTHENTICATION MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="font-bold text-white text-sm">Google Authentication</h3>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Google Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.google@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2 rounded-xl text-xs"
                >
                  {isLoading ? 'Connecting...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

```

## D.18 Frontend Entry Point

Source: `frontend\src\main.jsx`

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```

## D.19 Global Styles

Source: `frontend\src\index.css`

```json
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
}

/* Custom smooth transitions */
.transition-custom {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

## D.20 Backend Package Manifest

Source: `backend\package.json`

```json
{
  "name": "vruksha-backend",
  "version": "1.0.0",
  "description": "Backend API for Vruksha - Online Plants, Seeds & Fertilizers Delivery Platform",
  "main": "server.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "nodemailer": "^10.0.10"
  }
}

```

## D.21 Frontend Package Manifest

Source: `frontend\package.json`

```json
{
  "name": "vruksha-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "leaflet": "^1.9.4",
    "lucide-react": "^0.380.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.0.0",
    "vite": "^5.2.11"
  }
}

```


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
