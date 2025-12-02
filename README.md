# Fund_Connect

Static landing page concept for **IGATES**, an institutional fintech bridge between fund managers and qualified investors. The design leans on a black + royal purple gradient palette, glassmorphism cards, and typography that pairs **Poppins** (headings) with **Inter** (body).

## Run the full experience

1. Start the backend + static server (no external dependencies required):
   ```bash
   npm start
   ```
2. Visit http://localhost:4000 to browse the site. Featured funds, insights, and the contact form all talk to the API under `/api/*`.

> If you only want the static page, open `public/index.html` directly in your browser.

## Available endpoints

- `GET /api/health` – simple service status.
- `GET /api/funds` – sample curated fund universe for the cards on the homepage.
- `GET /api/insights` – market and platform intelligence feed.
- `POST /api/contact` – accepts `{ name, email, role, message }` and stores the request in-memory.

## Development notes

- Static assets live in `/public` and are served by the built-in Node HTTP server.
- `/public/main.js` fetches API data and handles the contact form submission UX.
- Styling lives in `/public/styles.css` and follows the gradient + glassmorphism system used across the layout.
