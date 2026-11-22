# Vruksha E-Commerce

Vruksha is a plant, seed, fertilizer, and gardening supplies marketplace with delivery logistics, checkout, order tracking, nursery/vendor tools, and platform administration.

## Quick start

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```powershell
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Start the backend

```powershell
npm run backend
```

The API starts at `http://localhost:5000`.

### Start the frontend

In another terminal:

```powershell
npm run frontend
```

The Vite application starts at `http://localhost:5173` and proxies `/api` requests to the backend.

## Documentation

See [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) for the complete project documentation, including architecture, setup, features, API reference, data models, configuration, workflows, and troubleshooting.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run backend` | Start the Express API |
| `npm run frontend` | Start the Vite development server |
| `npm start` | Start the backend |
| `npm run seed` | Run the catalog generation script |
| `npm run build --prefix frontend` | Create a production frontend build |

## Current storage model

The backend uses `backend/data.json` as its database. Product images are served from `backend/images` through `/images`. Authentication sessions and OTP records are held in memory and are lost when the backend restarts.
