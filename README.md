# Kairali Trails — Malaysia Pre-Trip Companion

A single-page, mobile-first pre-trip info page. Images live in `images/`, so
`index.html` stays ~30 KB.

## Structure
```
index.html        # the page (all content in the <script> CONFIG/QUESTIONS/PHOTOS)
images/           # logo + card photos
README.md
```

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
