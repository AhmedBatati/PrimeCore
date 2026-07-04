# PrimeCore

PrimeCore is a premium Arabic-first, RTL technology storefront for curated products, internet packages, Starlink/fiber solutions, and local technical services. The public website is built with Vanilla HTML, CSS, and JavaScript, with a protected owner dashboard for managing products and packages.

## Features

- Arabic RTL public storefront with Dark Mode and Light Mode.
- Responsive pages for desktop, tablet, and mobile.
- Product catalog with product details pages.
- Internet packages page with package pricing and WhatsApp contact actions.
- Technical services page for repairs, maintenance, upgrades, and consultation.
- Owner dashboard for adding, editing, activating, and deleting products/packages.
- Per-item currency support: SAR, USD, and YER.
- Persistent production storage through Vercel-compatible KV/Redis REST variables.
- Owner authentication with signed HttpOnly sessions, CSRF protection, same-origin checks, and login rate limiting.
- Security headers and no-store cache headers for owner/admin surfaces.

## Tech Stack

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- Node.js serverless API routes for Vercel
- Optional local development server in `scripts/dev-server.js`
- KV/Redis REST storage for production persistence

No React, Next.js, Tailwind, Bootstrap, or frontend framework is required.

## Project Structure

```text
.
|-- index.html                 # Homepage
|-- products.html              # Product listing
|-- product-details.html       # Product details
|-- packages.html              # Internet packages
|-- services.html              # Technical services
|-- about.html                 # Brand/about page
|-- contact.html               # Contact page
|-- owner-login.html           # Owner login
|-- owner-dashboard.html       # Owner dashboard
|-- api/                       # Vercel serverless API routes
|-- server/                    # Shared server-side auth/storage logic
|-- js/                        # Public and admin JavaScript
|-- css/                       # Styles and animations
|-- data/                      # Local development data fallback
|-- scripts/dev-server.js      # Local development server
|-- middleware.ts              # Vercel middleware protection
`-- vercel.json                # Security headers and Vercel config
```

## Public Pages

- `index.html`
- `products.html`
- `product-details.html?id=PRODUCT_ID`
- `packages.html`
- `services.html`
- `about.html`
- `contact.html`

## Owner Dashboard

The owner dashboard is available at:

```text
/owner-login.html
/owner-dashboard.html
```

The dashboard requires environment variables before login works. Do not hard-code the owner password in JavaScript or commit it to Git.

## Environment Variables

Create `.env.local` for local development, or configure these variables in Vercel Project Settings.

```env
OWNER_PASSWORD=replace-with-a-strong-password
OWNER_SESSION_SECRET=replace-with-a-long-random-secret
KV_REST_API_URL=your-kv-rest-api-url
KV_REST_API_TOKEN=your-kv-rest-api-token
```

Notes:

- `OWNER_PASSWORD` is the password used on `owner-login.html`.
- `OWNER_SESSION_SECRET` signs owner sessions and CSRF tokens.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` are required for persistent production saves on Vercel.
- Local development can fall back to `data/primecore-data.json` when KV variables are not configured.
- Never commit `.env.local`.

## Local Development

Install Node.js, then run:

```bash
npm run dev
```

The server prints local URLs similar to:

```text
PrimeCore local server: http://127.0.0.1:3000
Owner login: http://127.0.0.1:3000/owner-login.html
```

If you need a custom port:

```bash
PORT=4182 npm run dev
```

On Windows PowerShell:

```powershell
$env:PORT='4182'; npm run dev
```

## Editing Products and Packages

1. Open `owner-login.html`.
2. Log in using `OWNER_PASSWORD`.
3. Open `owner-dashboard.html`.
4. Add, edit, activate/deactivate, or delete products and packages.
5. Save changes.

Only active products and packages are shown to public visitors.

## Deployment on Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add the required environment variables:
   - `OWNER_PASSWORD`
   - `OWNER_SESSION_SECRET`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
4. Deploy.
5. Open `/owner-login.html` and confirm login works.
6. Open `/api/admin-data` without a valid session and confirm it does not expose admin data.

## Security Notes

- Owner sessions are stored in signed HttpOnly cookies.
- Admin state-changing requests require CSRF validation.
- Owner/admin pages and admin API routes use `Cache-Control: no-store`.
- `vercel.json` defines security headers including CSP, HSTS, Referrer-Policy, and Permissions-Policy.
- `.vercelignore` prevents local-only files and internal project files from being deployed.
- Keep `.env.local`, production secrets, and deployment credentials private.

## Checks

Useful lightweight checks before publishing:

```bash
git diff --check
node --check js/home.js
node --check js/products.js
node --check js/product-details.js
node --check js/admin-dashboard.js
```

## License

No license has been selected yet. Add a license before publishing if you want to define reuse permissions.
