# Publish SizeToKB on Hostinger

Your app is configured as a **static export** (`output: "export"`). That is the cheapest and simplest path on Hostinger: no Node server required at runtime. All photo/PDF work already runs in the visitor’s browser.

## What you need to buy

### Recommended (start here)

| Item | Why |
|------|-----|
| **Domain** | `sizetokb.in` (primary) and optionally `sizetokb.com` → redirect to `.in` |
| **Hostinger Shared / Premium Web Hosting** (or Business) | Enough to host the static `out/` site + SSL |
| **Email** (optional) | `support@sizetokb.in` via Hostinger email or Google Workspace |

You do **not** need a VPS for this project unless you later add server APIs, login, or databases.

### Optional upgrades later

- **Hostinger Node.js / Web Apps hosting** — only if you remove static export and run `next start` (SSR). Not required now.
- **VPS** — overkill for SizeToKB today; more DevOps work (Node, PM2, Nginx, SSL).

## One-time checklist

1. Buy **sizetokb.in** (and .com if you want) on Hostinger or transfer DNS to Hostinger nameservers.
2. Buy a **hosting plan** and create a website for `sizetokb.in`.
3. Enable **free SSL** (Let’s Encrypt) in hPanel.
4. Create mailbox **support@sizetokb.in** (matches Contact / Privacy pages).
5. Point **sizetokb.com** → redirect 301 to `https://sizetokb.in` (Domains → Redirects).

## Partner: SarkariSuchi cross-links

Before building for production, set your live SarkariSuchi URL so SizeToKB can link back to jobs / results:

```bash
# .env.local (or Hostinger build env)
NEXT_PUBLIC_SARKARISUCHI_URL=https://sarkarisuchi.com
```

Then `npm run build` and upload `out/` as usual. Without this variable, SarkariSuchi partner strips stay hidden.

## Build on your Mac

```bash
cd ~/Desktop/ImageResizer
npm install
npm run build
```

After a successful build you get an **`out/`** folder (HTML, CSS, JS, `.htaccess`).

## Upload to Hostinger (shared hosting)

1. Open **hPanel → Files → File Manager**.
2. Open **`public_html`** (for the main domain).
3. Delete default Hostinger placeholder files if present.
4. Upload **all contents inside `out/`** (not the `out` folder itself).
   - Easiest: zip the contents of `out/`, upload the zip, Extract in `public_html`.
5. Confirm these exist at the root of `public_html`:
   - `index.html`
   - `sitemap.xml` (or `/sitemap.xml` path Next generates)
   - `robots.txt`
   - `.htaccess`
6. Visit `https://sizetokb.in` and test Tools + one exam page (e.g. `/ssc-gd/`).

### Alternate: Git + Hostinger Node.js Web Apps

If your plan supports **Node.js Apps**:

1. Push this repo to GitHub.
2. hPanel → **Websites → Add → Node.js Apps → Import Git**.
3. Build: `npm run build` · Start: not needed for pure static — prefer static `out/` upload instead, **or** switch config later to SSR.

For this codebase, **static upload of `out/` is the intended Hostinger path**.

## After go-live (SEO)

1. [Google Search Console](https://search.google.com/search-console) → Add `https://sizetokb.in`.
2. Submit sitemap: `https://sizetokb.in/sitemap.xml`.
3. Add property for `sizetokb.com` only if it serves content; otherwise leave as redirect.
4. Optional: Bing Webmaster Tools with the same sitemap.
5. Do **not** keyword-stuff blog spam; keep updating exam profiles when notifications change — that wins long-term.

## DNS quick map

| Record | Value (typical) |
|--------|------------------|
| A / nameservers | Hostinger as shown in hPanel |
| CNAME `www` | `sizetokb.in` or Hostinger target |
| Redirect `.com` | `https://sizetokb.in/$1` 301 |

## Cost reality (approx.)

- Domain `.in`: low yearly fee  
- Shared hosting: Hostinger entry plans are enough  
- No server CPU cost for image processing (client-side)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on `/ssc-gd/` | Ensure trailing-slash folders from export uploaded fully; keep `.htaccess` |
| Mixed content / no HTTPS | Force HTTPS in hPanel SSL |
| Old site showing | Purge cache / hard refresh; confirm files in correct `public_html` |
| HEIC fails on some phones | User converts to JPG in gallery, or we improve HEIC later |

## Local preview of production build

```bash
npm run build
npx serve out
```

Open the URL `serve` prints and smoke-test before uploading.
