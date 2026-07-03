# Sparkbotics AI Hub — Website

A dark-theme, tech-inspired static website for Sparkbotics AI Hub (Robotics + AI training institute, Vadavalli, Coimbatore).

## Files

```
sparkbotics/
├── index.html      → all page content and structure
├── css/styles.css  → theme, layout, responsive rules
├── js/script.js    → nav, scroll reveal, testimonial carousel, hero animation, form
├── images/         → real posters (.webp) already included, plus room for faculty/testimonial photos
└── README.md       → this file
```

Open `index.html` directly in a browser to preview — no build step needed.

---

## 1. Posters already integrated

Your real posters are already in `images/` as compressed `.webp` files (original PNGs totalled ~10.75MB → now under 1MB combined) and wired into the site:

| File | Used for |
|---|---|
| `hero-poster.webp` | Hero banner (from the Sunpack "STEM Smart Lab" poster) |
| `course-robotics.webp` | Robotics Explorers & Innovators Lab card |
| `course-ai.webp` | Artificial Intelligence & Machine Learning card |
| `course-cybersecurity.webp` | Cyber Defense & Security Lab card |
| `course-excel.webp` | Digital Data Explorers Lab card |
| `course-iot.webp` | Internet of Things Lab card |
| `course-mstools.webp` | MS Tools Masters & Productivity Lab card |
| `course-python.webp` | Code Crafters Lab card |
| `course-scratch.webp` | Imagination Coders Lab (Scratch) card |

Click any hero or course poster to open the **full poster in a lightbox** (built into `script.js`) — so all the pricing and curriculum detail from the original posters stays visible even though the card thumbnails are cropped previews.

**Faculty photos and extra testimonial posters are still placeholders**, since they weren't part of this image batch. To add them:

1. Compress your image (see below), then drop it into `images/` — e.g. `images/faculty-1.jpg`.
2. In `index.html`, find the relevant placeholder — a `<div class="faculty-photo">...</div>` under `<section id="faculty">`, or a `<div class="testi-avatar">` under `<section id="testimonials">` — and swap it for a real `<img>` tag.

| Section | Slot | Suggested filename | Suggested size |
|---|---|---|---|
| Faculty | Trainer photos | `images/faculty-1.jpg` … `faculty-4.jpg` | 500×500px (square) |
| Testimonials | Student feedback poster/photo | `images/testimonial-1.jpg` etc. | 500×500px |

**Replacing or adding a course poster later:** drop the new file into `images/`, then update both the `<img src="...">` and the `data-poster="..."` attribute on that card's `<button class="course-poster">` — the `data-poster` value controls what the lightbox opens.

**Image optimization (keep the site fast):**
- **WebP** (what this site uses) gives the smallest files with clean text/graphics; use **JPEG** for photos, **PNG** only if you need transparency.
- Target **under 200KB per image**. Free tool: [squoosh.app](https://squoosh.app) (drag-and-drop, no upload needed), or on the command line:
  ```bash
  python3 -c "from PIL import Image; im=Image.open('input.png').convert('RGB'); im.thumbnail((900,900)); im.save('images/course-new.webp','WEBP',quality=82)"
  ```
- Keep dimensions close to the "suggested size" column above — don't upload a 4000px photo straight from a phone.

---

## 2. Syncing text content with your Google Business Profile

The About section and address already reflect the public Vadavalli, Coimbatore listing. To keep things in sync going forward:

1. Open your Google Business Profile → **Edit profile**.
2. Copy the **Business description** → paste/adjust inside the `<section id="about">` block in `index.html`.
3. Copy your **Services / Products** list → update the three course cards in `<section id="courses">` (or add more `<article class="course-card">` blocks, copy-pasting the structure).
4. Copy new **Reviews** → replace or add `<div class="testi-card">` blocks in `<section id="testimonials">`. Keep quotes short and always attribute to a real reviewer name with their permission.
5. Update **phone, email, hours** in `<section id="contact">`.
6. To embed your live Google Map: Google Business Profile → **Share** → get the "Embed a map" iframe code, and paste it in place of the `.map-box` div.

There's no automatic sync for a static site — repeat this whenever your Google listing changes, or ask someone to do a quick content pass monthly.

---

## 3. Free hosting options

All three options below are free for a static site like this one.

### Option A — Netlify (drag-and-drop, easiest)
1. Go to [app.netlify.com](https://app.netlify.com) and sign up (free).
2. From your dashboard, click **Add new site → Deploy manually**.
3. Drag the whole `sparkbotics` folder onto the upload area.
4. Netlify gives you a live URL immediately (e.g. `sparkbotics-ai-hub.netlify.app`).
5. To use a custom domain: **Site settings → Domain management → Add a domain**, then update your domain's DNS as instructed.

### Option B — GitHub Pages
1. Create a free GitHub account, then a new repository (e.g. `sparkbotics-website`).
2. Upload all files (`index.html`, `css/`, `js/`, `images/`) to the repo — either via the GitHub web UI ("Add file → Upload files") or:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sparkbotics-website.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch `main`, folder `/root`.
5. Save — your site goes live at `https://<your-username>.github.io/sparkbotics-website/`.

### Option C — Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free).
2. Click **Add New → Project → Deploy without Git** (or connect a GitHub repo for auto-deploys on every push).
3. Upload the `sparkbotics` folder.
4. Vercel deploys instantly and gives you a URL like `sparkbotics.vercel.app`.
5. Add a custom domain under **Project → Settings → Domains** if needed.

**Recommendation:** Netlify or Vercel if you want the fastest setup with drag-and-drop; GitHub Pages if you're already comfortable with Git and want free version history.

---

## 4. Connecting the contact form

The form currently just shows a local "success" message — it doesn't send anywhere. Easiest free options:
- **Netlify Forms** (if hosting on Netlify): add `netlify` and `data-netlify="true"` attributes to the `<form>` tag — Netlify then emails you every submission automatically, no backend needed.
- **Formspree** ([formspree.io](https://formspree.io)): change the form's `action` to your Formspree endpoint and `method="POST"` — free tier included.

---

## 5. Customizing the theme

All colors, fonts and spacing are defined as CSS variables at the top of `css/styles.css`:
```css
--blue:  #00d4ff;   /* electric blue accent */
--green: #39ff14;   /* neon green accent */
--bg-void: #070a10;  /* page background */
```
Change these values to retint the entire site in one place.
