# Fund_Connect

IGATES platform built with Next.js, Tailwind CSS, and a Firebase-ready architecture for connecting fund managers with qualified investors.

## Run the app locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Available endpoints

- `GET /api/health` – simple service status.
- `GET /api/funds` – sample curated fund universe for featured cards.
- `GET /api/insights` – market and platform intelligence feed.

## Development notes

- Static assets live in `/public` and are served by Next.js.
- Tailwind styles are configured via `tailwind.config.js` and applied in `src/styles/globals.css`.
