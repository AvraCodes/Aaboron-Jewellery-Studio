# Handover: Aaboron Jewellery Studio — E-Commerce Conversion

## Project Location
```
/Users/avra/Aaboron Jewellery Studio
(symlinked from /Users/avra/Artisnal gallery)
```
Package manager: **pnpm**. Dev server: `./node_modules/.bin/next dev --port 3000`.

---

## What This Project Is

A **Next.js 16 + Tailwind CSS v4 + shadcn/ui** project originally built as a skincare brand template called "Boty". It has been fully converted into an e-commerce site for **Aaboron Jewellery Studio** (আভরণ), a handmade jewellery brand rooted in Bengali craft traditions. The visual identity, design tokens, animations and layout structure of the original template have been preserved, with custom brand typography and real product photography integrated.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (config via `@theme inline` in `app/globals.css`, no `tailwind.config.*` file) |
| Component library | shadcn/ui (New York style, 57 primitives in `components/ui/`) |
| Fonts | DM Sans (body), SugarMagicSerif (display), Vielotta (editorial serif), Ypsilanti (signature script), Lipi Palash Unicode (Bengali), Adriana Gabrielle (editorial accent) |
| Repository | `https://github.com/AvraCodes/Aaboron-Jewellery-Studio.git` (main branch) |
| Icons | lucide-react |
| Cart state | React Context + localStorage persistence |
| Forms | react-hook-form + zod (installed, not yet wired to form pages) |
| Payment | Razorpay Standard Checkout (public-key-only flow, needs hardening) |
| Analytics | @vercel/analytics (already in layout) |
| Carousel | embla-carousel-react (installed, not yet used) |

---

## Design Tokens (DO NOT CHANGE — preserved from original template)

All tokens live in `app/globals.css` inside `:root {}` and `.dark {}`. The `@theme inline` block maps them to Tailwind utility classes.

| Token | Value | Role |
|---|---|---|
| `--background` | `#F7F4EF` | Warm cream — page background |
| `--foreground` | `#2C2C2C` | Near-black charcoal — body text |
| `--card` | `#EDE6DC` | Sand — card surfaces |
| `--primary` | `#4F5B3A` | Olive green — CTAs, accents |
| `--primary-foreground` | `#F7F4EF` | Text on primary |
| `--secondary` | `#D8CFC4` | Warm beige |
| `--muted` | `#EDE6DC` | Sand |
| `--accent` | `#B8ADA3` | Soft taupe |
| `--border` | `#D8CFC4` | |
| `--radius` | `1rem` | Cards use `rounded-3xl` |
| `--font-sans` | DM Sans | Clean UI & body copy |
| `--font-serif` | Vielotta-Regular | Editorial serif for product names & content |
| `--font-display` | SugarMagicSerif-Medium | Distinctive display serif for brand wordmark & section titles |
| `--font-script` | Ypsilanti-Signature | Handwritten signature script for artisanal accents |

Custom CSS utilities (also in `app/globals.css`, must not be deleted):
- `.boty-shadow` — layered soft shadow (used on cards, buttons, drawer)
- `.boty-transition` — `all 0.4s cubic-bezier(0.4,0,0.2,1)`
- `.animate-blur-in` — opacity + blur + translateY entrance (used on hero, section headers)
- `.animate-scale-fade-in` — opacity + scale entrance (used on header nav)

The `components/boty/` folder name and the `.boty-*` class names are kept as-is from the original template. They are not skincare references — they are just the original CSS utility names.

---

## Current Route Structure

```
app/
  layout.tsx              — root layout: DM Sans + Playfair Display fonts, CartProvider, Analytics
  globals.css             — design tokens (active file)
  page.tsx                — home page (composes all section components)
  shop/
    page.tsx              — all-products shop/gallery page with category filter
  product/
    [id]/
      page.tsx            — product detail page (dynamic, reads from lib/products.ts)
  checkout/
    page.tsx              — Razorpay checkout page
  contact/
    page.tsx              — contact form (submission not yet wired)
  care/
    page.tsx              — care guide (all placeholder content)
  shipping/
    page.tsx              — shipping & returns (all placeholder content)
  custom-orders/
    page.tsx              — custom orders enquiry form (submission not yet wired)
  about/
    page.tsx              — maker story / about page

styles/
  globals.css             — shadcn default tokens (NOT the active file, not imported anywhere, kept intentionally)
```

---

## Component Structure

### `components/boty/` — brand components (all updated for jewellery)

| File | Purpose | Status |
|---|---|---|
| `header.tsx` | Fixed nav: "Artisnal Gallery" logo text, Shop / About / Contact links, cart icon with badge | Done |
| `hero.tsx` | Full-screen video hero with jewellery copy. Video `src` is empty — needs real video | Done (placeholder video) |
| `trust-badges.tsx` | 4-up trust strip: Handcrafted / Made to Order / Secure Checkout / Gift Ready | Done |
| `product-grid.tsx` | Home page: segmented category tabs + 4-col product grid. Data from `lib/products.ts` | Done |
| `feature-section.tsx` | Bento grid (layout kept exactly as original) + maker story two-column section. Videos/image placeholders | Done |
| `testimonials.tsx` | 3-col scrolling animation (kept exactly). 9 placeholder review objects | Done |
| `cta-banner.tsx` | Full-bleed banner → custom orders CTA with link to `/custom-orders` | Done |
| `newsletter.tsx` | Email subscribe section with jewellery copy | Done |
| `cart-context.tsx` | Cart state: React Context, localStorage persistence, `variant` field on CartItem | Done |
| `cart-drawer.tsx` | Right-side drawer: ₹ currency, variant line, "Proceed to Checkout" → `/checkout` | Done |
| `footer.tsx` | Brand name "Artisnal Gallery", shop category links, help links (Care / Shipping / Custom Orders / Contact), About | Done |

### `components/ui/` — 57 shadcn/ui primitives
Brand-agnostic. No changes made. Do not modify unless a specific component needs fixing.

### `components/theme-provider.tsx`
Present but not used in `app/layout.tsx`. Dark mode is not wired to a toggle.

---

## Product Data (`lib/products.ts`)

This is the **single source of truth** for all product data. Both the shop page and product detail page import from here.

### `Product` interface
```ts
interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number           // INR, integer, no decimals
  originalPrice?: number  // for sale pricing
  image: string           // path relative to /public, e.g. '/images/products/pendant-01.jpg'
  category: 'clay-pendants' | 'clay-earrings' | 'handmade-jewellery' | 'oxidised-earrings'
  badge?: 'New' | 'Bestseller'
  variants: string[]      // empty = no picker shown. e.g. ['16in chain', '18in chain']
  materials: string
  dimensions: string
  care: string
  leadTime: string        // shown on product page below price
  isActive: boolean       // false = hidden everywhere without deleting
}
```

### Current state
Four placeholder products exist (one per category). All fields are `[PLACEHOLDER: ...]` strings and price is `0`. The owner will fill these in when they have real product data.

### Helper functions exported
- `getProductById(id)` — used by product detail page
- `getProductsByCategory(category)` — available if needed
- `CATEGORIES` — array of `{ value, label }` used by shop page and product grid tabs

---

## Cart System

- **Context**: `components/boty/cart-context.tsx`
- **CartItem** fields: `id`, `name`, `description`, `price`, `quantity`, `image`, `variant?`
- **Persistence**: localStorage under key `artisnal-gallery-cart`. Hydrates on mount, saves on every item change.
- **Variant-aware**: `removeItem(id, variant?)` and `updateQuantity(id, quantity, variant?)` match on both id and variant to allow the same product in different variants as separate line items.
- Cart opens as a right-side drawer (`components/ui/drawer.tsx` from shadcn, powered by vaul).

---

## Checkout (Razorpay)

**File**: `app/checkout/page.tsx`

**Current flow** (public-key-only, suitable for testing):
1. Loads Razorpay checkout.js script on mount.
2. Shows order summary from cart + contact fields (name, email, phone).
3. On "Pay" click, opens Razorpay's hosted modal.
4. On success callback: clears cart, shows success screen.

**Before going live — required steps**:
1. Replace `RAZORPAY_KEY_ID = "[PLACEHOLDER: your Razorpay key_id]"` with your actual key from the Razorpay dashboard.
2. Add a Next.js API route (`app/api/create-order/route.ts`) that calls Razorpay's Orders API with your `key_secret` to create a proper order ID before opening the modal. The current flow skips this — it is not production-safe.
3. Add webhook verification for `payment.captured` events to confirm orders server-side.
4. Add shipping address fields to the checkout form.

---

## Images / Media

All skincare images have been deleted from `public/images/products/` and `public/images/`. The directory structure is empty. `public/placeholder.jpg` still exists (small 1KB placeholder) and is used everywhere images are missing.

**When real photos are added**:
- Place product photos in `public/images/products/`
- Update each product's `image` field in `lib/products.ts`
- Replace `public/placeholder.jpg` or keep it as a fallback (it's referenced as the `|| "/placeholder.jpg"` fallback in `Image` components throughout)

Hero and bento section videos are currently `src=""` (empty string). The `<video>` tags and structure are preserved exactly for when the owner supplies real jewellery videos.

---

## Forms (Contact & Custom Orders)

Both `app/contact/page.tsx` and `app/custom-orders/page.tsx` have complete UI forms with controlled React state. On submit they currently just set `submitted = true` (no actual send). They are marked with:
```
// [PLACEHOLDER: wire up to a form service — e.g. Formspree, Resend, or a Next.js API route]
```
Options to implement:
- **Formspree** — easiest, no backend: change the form `action` to a Formspree endpoint
- **Resend** — Next.js API route with Resend SDK for email delivery
- **Next.js API route** — `app/api/contact/route.ts` using any email provider

---

## Pages With Placeholder-Only Content

| Page | What needs real content |
|---|---|
| `app/about/page.tsx` | Maker portrait image, headline, 3 paragraphs of biography |
| `app/care/page.tsx` | Care instructions for each category (clay, oxidised) |
| `app/shipping/page.tsx` | Processing time, carriers, delivery estimates, returns policy |
| `app/custom-orders/page.tsx` | Intro copy, turnaround time, pricing note |
| `components/boty/feature-section.tsx` | 3 video srcs, 1 image src, maker story headline + paragraph, process headline, overlay card description, 4 feature card descriptions |
| `components/boty/testimonials.tsx` | 9 real customer reviews (name, city, review text, product name) |
| `components/boty/hero.tsx` | Hero video src |
| `components/boty/cta-banner.tsx` | Banner background image, custom orders copy |
| `components/boty/trust-badges.tsx` | "Gift Ready" badge description |
| `components/boty/footer.tsx` | Instagram URL, Facebook URL |
| `lib/products.ts` | All 4 products: real names, prices, descriptions, images, materials, dimensions, care, leadTime |

---

## Logo

Currently the header and footer render `"Artisnal Gallery"` as a serif text wordmark. The owner said they will share a logo file. When ready:
1. Add the logo file to `public/` (e.g. `public/logo.svg`)
2. In `header.tsx`, replace the `<span>` with a `<Image>` tag
3. In `footer.tsx`, do the same
4. Both spots are marked with `{/* [PLACEHOLDER: brand logo image] */}`

---

## Non-Negotiable Rules (from the owner — apply to all future work)

1. **Do not guess** on design, content, data, payments, or architecture. Stop and ask.
2. **Preserve visual identity**: colour tokens, fonts, spacing, radii, shadows, animations. No new colours or fonts without asking.
3. **Surgical changes only**: every changed line must trace to a request. Do not refactor unrelated code.
4. **Simplicity first**: no speculative features, no abstractions for single-use code.
5. **No invented facts**: no made-up reviews, prices, policies, shipping times, materials. Use `[PLACEHOLDER: ...]` markers.
6. **Zero skincare references** must remain in code. Grep check: `grep -rni "skincare\|Boty\|serum\|moisturizer\|hyaluronic" app/ components/boty/ lib/` must return empty.

---

## Build & Verification Commands

```bash
# Type check (zero errors as of handover)
./node_modules/.bin/tsc --noEmit

# Production build (clean as of handover — 10 routes, zero errors)
./node_modules/.bin/next build

# Dev server
./node_modules/.bin/next dev --port 3000

# Skincare grep (must return empty / CLEAN)
grep -rni "skincare\|skin care\|Boty family\|Glow gently\|Radiance Serum\|hyaluronic\|retinol\|niacinamide\|rosehip" app/ components/boty/ lib/
```

Note: `pnpm lint` and `pnpm dev` may fail with `ERR_PNPM_IGNORED_BUILDS: sharp@0.34.5`. This is a pnpm build-scripts warning, not a code error. Use `./node_modules/.bin/next dev` and `./node_modules/.bin/next build` directly to bypass it.

---

## State at Handover

- Build: clean (`✓ Compiled successfully`, 10 routes)
- Type check: zero errors (`tsc --noEmit` clean)
- Skincare grep: zero matches
- Dev server: running at http://localhost:3000
- Git repository: initialised, committed, and pushed to `https://github.com/AvraCodes/Artisnal-gallery.git` on branch `main`
- Custom Typography:
  - Font files organized in `app/fonts/`: `SugarMagicSerif-Medium.otf`, `Vielotta-Regular.otf`, `Ypsilanti-Signature.otf`
  - Unnecessary duplicate TTF formats deleted
  - Configured via `next/font/local` in `app/layout.tsx` and mapped via `@theme inline` in `app/globals.css`
  - Applied appropriately across the site: SugarMagicSerif for brand wordmark, hero headline, section titles, and footer watermark; Vielotta for product names and editorial headings; Ypsilanti for signature script accents; DM Sans for body/UI
- Visual bug fixes completed:
  - Hero scroll prompt removed
  - Footer background watermark updated from "AG" to "Artisnal" with fluid scaling
  - CTA banner and Bento craft card contrast overlays added for crystal clear white text readability
  - Next.js dev runtime errors and console warnings resolved (empty video source tags removed)
  - Video container surface backgrounds added to prevent empty holes
  - Operational/customer-facing UI placeholder strings cleaned up in Cart Drawer, Checkout, and Trust Badges
  - Segmented category tabs aligned across all screen sizes
- All pages: responsive, consistent with template visual identity
- All product data: placeholder only — awaiting real data from owner
- All media: placeholder only — awaiting real photos and videos from owner
- Payment: Razorpay UI built, key_id placeholder, no server-side order creation yet
- Forms: UI complete, submission not wired to any service yet
