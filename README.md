# Coldbru

Flavored cold brew from the upstairs café — a Shopify Hydrogen storefront for a **weekly / monthly subscription**.

Seeded from [pjmanning/shopify-template](https://github.com/pjmanning/shopify-template). Shopify wiring (Hydrogen context, Storefront API, cart, collections, product PDPs) is intact. Brand copy, flavor stubs, and the subscription PDP are Coldbru.

---

## What this is

Coldbru is the second-floor Bali shop café, bottled: pandan coconut, palm sugar vanilla, sea salt caramel, and the rest of the upstairs board. You subscribe. We pack glass. You skip a week when you fly.

This repo is the headless storefront, not a live Shopify store. Until you link one, cart and catalog talk to [mock.shop](https://mock.shop).

## Pages

| Route | What you get |
| --- | --- |
| `/` | Home — café hero, flavor strip, weekly/monthly tease, Shopify featured collection |
| `/flavors` | Flavor catalog stubs + Shopify collections underneath |
| `/flavors/:handle` | Flavor PDP stub |
| `/subscribe` | Subscription PDP stub (weekly / monthly), add-to-cart via Hydrogen |
| `/cart` | Cart page + drawer (same Hydrogen cart) |
| `/about` | Upstairs café story |
| `/collections`, `/products/:handle` | Stock Hydrogen catalog routes, still wired |

## Requirements

- Node.js **22.x or 24.x**
- npm 10+

## Local run

```bash
npm install
cp .env.example .env   # SESSION_SECRET is enough for mock.shop
npm run dev
```

Open [http://localhost:43123](http://localhost:43123) (port is set in `package.json`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Local Hydrogen / MiniOxygen server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Connect a Shopify store

Out of the box this app uses **[mock.shop](https://mock.shop)** demo catalog data (no Shopify login required).

To point at a real Coldbru store:

1. Install the [Hydrogen sales channel](https://apps.shopify.com/hydrogen) on the store.
2. From this project:

   ```bash
   npx shopify hydrogen link
   npx shopify hydrogen env pull
   ```

3. Restart `npm run dev`. Your catalog replaces mock.shop.

Create a subscription product (suggested handle: `coldbru-subscription`) with selling plans for weekly and monthly. The PDP in `app/routes/subscribe.jsx` already looks that product up, then falls back to the first catalog product so add-to-cart still works on mock.shop.

Environment variables live in `.env` (gitignored). See `.env.example`. Never commit Storefront API tokens.

Checkout / payments only work end-to-end after a real storefront is linked and Oxygen (or another host) is configured.

Docs: [Getting started with Hydrogen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started)

## Brand tokens

Edit **`app/lib/branding.js`** for name, color, and logo.

- Flavors: `app/lib/flavors.js`
- Weekly / monthly plans: `app/lib/subscription.js`

## Project map

```
app/
  lib/branding.js          ← brand tokens
  lib/flavors.js           ← flavor catalog stubs
  lib/subscription.js      ← weekly / monthly plan stubs
  routes/
    _index.jsx             ← home
    flavors.*              ← catalog + flavor PDP stubs
    subscribe.jsx          ← subscription PDP
    about.jsx              ← about
    cart.jsx               ← cart
    collections.*          ← Shopify collections
    products.$handle.jsx   ← Shopify product PDP
  routes.ts                ← React Router + Hydrogen route config
public/logo.svg
.env.example
```

## License / ownership

Internal product storefront. Replace mock.shop with a linked Hydrogen store before any public launch.
