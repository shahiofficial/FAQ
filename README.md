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

## Still to add
- Real phone numbers in `CONFIG` (advisorPhone, guidePhone).
- White logo for the dark footer: drop `kt-white.png` in `images/`,
  set `logoWhite: "kt-white.png"` in CONFIG.
- Day 3 boating photo: add to `images/` and set `"Day 3"` in PHOTOS.
