# divakarvelagacherla.com

> Not just a portfolio. A reflection of how I think.

Live → https://www.divakarvelagacherla.com

---

## Why this exists

Every developer has a portfolio. I didn't — not because I was lazy, but because I kept asking: _what's the point?_

I built one when I figured out what I actually wanted it to say. Not projects. Not tech stacks. How I think. What drives my decisions. And the other side of me no resume has ever captured.

---

## What's inside

|                 |                                                          |
| --------------- | -------------------------------------------------------- |
| **Engineering** | Philosophy, live GitHub stats, blog posts, tech stack    |
| **Photography** | 70+ photos, Apple-style gallery, ambient music, lightbox |
| **Blog**        | Thoughts on engineering, craft and curiosity             |

---

## How it's built

| Layer              | Choice                    | Why                                             |
| ------------------ | ------------------------- | ----------------------------------------------- |
| Framework          | Angular                   | Learned it deeply while building something real |
| Hosting            | GitHub Pages              | Simple, free, auto-deploys on push              |
| CI/CD              | GitHub Actions            | Stats and blog posts update automatically       |
| Photos             | Cloudflare R2             | Zero egress fees for a photo-heavy portfolio    |
| Image optimization | Cloudflare Image Resizing | On-the-fly WebP conversion, no preprocessing    |

---

## Things I'm proud of

**Custom gallery slider** — No library. Two rows, card recycling for infinite scroll, step-based animation with different speeds per row creating visual depth. Apple easing throughout.

**Live stats** — GitHub Actions workflow runs on every push, writes fresh stats to `stats.json`. No backend, no cron job.

**Blog from GitHub** — Posts live in a separate repo as markdown files. Fetched via GitHub Contents API, parsed client-side. Adding a post = pushing a markdown file.

**Ambient music** — Photography page plays a subtle looping track. Starts on first user interaction (browser policy). Pause button controls both the gallery animation and music together.

**Scroll animations** — Custom `IntersectionObserver` directive. One attribute on any element, it animates in on scroll. Animate once, stays visible — no jumping.

**Randomized gallery** — Fisher-Yates shuffle on every page load. 70 photos, different order every visit.

---

## Philosophy

> "Why over what. Every single time."

Every technology choice in this project has a reason. I didn't pick Angular because it's popular. I didn't use Cloudflare R2 because everyone does. I understood the trade-offs first, then decided.

That instinct is the same one that makes me a better engineer — and a better photographer.

---

## Running locally

```bash
git clone git@github.com:DivakarVelagacherla/portfolio_website.git
cd portfolio_website
npm install
ng serve
```

---

## Contact

[divakarvelagacherla.com](https://divakarvelagacherla.com) · [LinkedIn](https://linkedin.com/in/divakarvelagacherla) · [Instagram](https://instagram.com/divakar_velagacherla)
