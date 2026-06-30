# Kairali Trails — Malaysia Pre-Trip Companion

A single-page, mobile-first pre-trip info page. Images live in `images/`, so
`index.html` stays ~30 KB.

## Structure (multi-country, isolated links)
```
index.html                       # neutral landing — leaks no package links
hub-3b6cf0d7.html      # PRIVATE owner hub — lists every country (never share this)
kt-malaysia-50ec88.html     # Malaysia — the link you send the customer
kt-malaysia-50ec88-explore.html  # Malaysia "Explore" page (opened by a button on the main page)
images/                          # logo + photos (shared)
server/worker.js                 # optional AI proxy for Kaity
README.md
```

## How the isolation works
- Each country has a random, **unguessable** filename — customers can't guess another package.
- Customer pages link **only within their own country** (main ↔ explore). They never
  link to the hub or to any other country, so one package can't reach another.
- The **hub** is the only page that lists all countries. Keep its link private.
- `index.html` is a neutral landing in case someone hits the bare domain.

## Adding a new country
Send the country's content (like Malaysia) and it becomes:
`kt-<country>-<random>.html` (+ `-explore`), added as a Live card on the hub.

## Explore page photos
Open `explore.html`, find the `EXPLORE` list in the script, and set each item's
`img` to a filename you drop in `images/` (e.g. `img:"pool.jpg"`). Blank `""`
shows a placeholder. Suggested names: pool, klcc, jalan-alor, bukit-bintang,
coconut, nasi-lemak, roti-canai, teh-tarik, magnet, chocolate, white-coffee.

## Image source switch
Top of the `<script>` in `index.html`:
```js
const IMG_BASE = "images/";
```
- **GitHub Pages / same repo:** leave as `"images/"` (relative path).
- **jsDelivr CDN:** `"https://cdn.jsdelivr.net/gh/USER/REPO@main/images/"`
  (replace USER/REPO; `@main` can be a tag/commit for cache-busting).

## Deploy on GitHub Pages
1. Push this folder to a repo (index.html at the root, images/ beside it).
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. Site goes live at `https://USER.github.io/REPO/`.

## Editing content
All content is in three objects near the top of the `<script>`:
- `CONFIG`   — logo filename, advisor/guide names + phone numbers.
- `PHOTOS`   — maps each card to an image filename in `images/` (`""` = placeholder).
- `QUESTIONS`— the FAQ cards (icon, tag, question, answer HTML).

## AI Kaity (optional upgrade)
The chatbot works offline by default (keyword matching over the FAQ). To make
Kaity understand free-form questions, deploy the proxy in `server/worker.js`
and point the page at it. The API key stays server-side — never in the page.

1. Install Wrangler: `npm i -g wrangler` then `wrangler login`.
2. From `server/`, deploy: `wrangler deploy worker.js --name kaity`.
3. Set the key as a secret: `wrangler secret put ANTHROPIC_API_KEY`.
4. Copy the Worker URL and set it in `index.html` → `CONFIG.aiEndpoint`.
   Leave it `""` to stay fully offline.

Notes:
- The FAQ knowledge is baked into `worker.js` (`KNOWLEDGE`). Re-paste it if your
  FAQ changes, or have the client send it.
- Model is `claude-haiku-4-5-20251001` (fast/cheap) — see docs.claude.com.
- `Access-Control-Allow-Origin` is `*`; tighten to your site origin for production.
- If the AI call fails, Kaity automatically falls back to the offline matcher.

Other hosts: the same logic works as a Vercel/Netlify function or any small
server — just expose a POST endpoint that returns `{ reply }`.

## Still to add
- Real phone numbers in `CONFIG` (advisorPhone, guidePhone).
- `images/kt-white.png` is an auto-generated placeholder — swap in the
  official white logo when ready (filename stays the same).
