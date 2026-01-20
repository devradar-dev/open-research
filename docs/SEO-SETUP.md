# Google Search Console (GSC) Setup Guide

## Site Information

| Property | Value |
|----------|-------|
| **Site URL** | `https://devradar-dev.github.io/open-research/` |
| **Sitemap URL** | `https://devradar-dev.github.io/open-research/sitemap.xml` |
| **robots.txt** | `https://devradar-dev.github.io/open-research/robots.txt` |
| **llms.txt** | `https://devradar-dev.github.io/open-research/llms.txt` |

---

## Step 1: Add Property to GSC

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add a property"** (URL prefix)
3. Enter: `https://devradar-dev.github.io/open-research/`
4. Click **"Continue"**

---

## Step 2: Verify Ownership

### Method 1: HTML Tag Upload (Recommended for GitHub Pages)

1. Copy the **HTML tag** meta verification code from GSC
2. Add it to `_includes/_custom/head.html`:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
```

3. Commit and push to GitHub
4. Click **"Verify"** in GSC

### Method 2: Google Analytics (Alternative)

If GA is already configured:
1. Select **"Google Analytics"** verification method
2. Use GA tracking ID: `UA-2709176-48`

### Method 3: HTML File Upload

1. Download the verification HTML file from GSC
2. Add it to the repository root
3. Commit and push

---

## Step 3: Submit Sitemap

1. In GSC, go to **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**
4. Wait for processing (usually minutes to hours)

### Sitemap Contents

Your sitemap will automatically include:
- Homepage: `/`
- Category pages: `/ai-tools/`, `/frameworks/`, `/databases/`, `/hosting/`, `/auth/`
- All collection items (AI tools, frameworks, databases, hosting, auth reviews)

---

## Step 4: Configure Indexing

### Request Indexing for Important Pages

After sitemap submission, manually request indexing for:

| Page | URL | Priority |
|------|-----|----------|
| Homepage | `/` | High |
| AI Tools Category | `/ai-tools/` | High |
| Frameworks Category | `/frameworks/` | High |
| Windsurf Review | `/ai-tools/windsurf/` | Medium |
| Cursor Review | `/ai-tools/cursor/` | Medium |
| Next.js Guide | `/frameworks/nextjs/` | Medium |

**How to:**
1. Go to **"URL Inspection"** in GSC
2. Enter each URL
3. Click **"Request indexing"**

---

## Step 5: Monitor Key Metrics

### Coverage Report

Check weekly for:
- **Valid**: Pages successfully indexed
- **Excluded**: Pages intentionally not indexed
- **Error**: Pages with indexing issues (fix these!)

### Performance Report

Monitor:
- **Total clicks**: How often your site appears in search results
- **Impressions**: How often your site is shown
- **CTR**: Click-through rate
- **Position**: Average ranking position
- **Queries**: Top search terms

### Enhancement Reports

- **Core Web Vitals**: LCP, FID, CLS metrics
- **Mobile Usability**: Mobile-friendly issues
- **HTTPS**: Security certificate status

---

## Step 6: Set Up Email Forwarding

1. Go to **Settings** → **Users and permissions**
2. Enable email notifications for:
   - 📧 Critical issues (immediate)
   - 📧 Coverage issues (daily)
   - 📧 Performance reports (weekly)

---

## Additional SEO Tools to Connect

| Tool | Purpose | Link |
|------|---------|------|
| **Google Analytics** | Traffic analysis | https://analytics.google.com |
| **Google Tag Manager** | Tag management | https://tagmanager.google.com |
| **Bing Webmaster Tools** | Bing search | https://www.bing.com/webmasters |
| **Schema Validator** | Test structured data | https://validator.schema.org |

---

## Schema.org Validation

Test your JSON-LD markup:

1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter: `https://devradar-dev.github.io/open-research/`
3. Verify that your Organization, Person, and WebSite schemas are detected

---

## International Targeting

If you want to target specific countries:

1. Go to **"Legacy tools and reports"** → **"International targeting"**
2. **Country** → `Unlisted` (global) or select specific country
3. **Language** → English (en) is already set in HTML

---

## Troubleshooting

### Sitemap Not Found

If sitemap returns 404:
1. Check GitHub Actions deployment status
2. Wait 5-10 minutes for GitHub Pages to rebuild
3. Verify `jekyll-sitemap` plugin is in Gemfile

### Verification Fails

1. Clear browser cache
2. Wait 2-3 minutes for GitHub Pages to update
3. Use the "Inspect URL" tool to check if the meta tag is present

### Pages Not Indexed

1. Check robots.txt doesn't block important pages
2. Ensure no `noindex` meta tags on important pages
3. Submit individual URLs for indexing via URL Inspection tool

---

## Quick Checklist

- [ ] Add property to GSC (URL prefix)
- [ ] Verify ownership (HTML tag or GA)
- [ ] Submit sitemap.xml
- [ ] Request indexing for top 10 pages
- [ ] Set up email notifications
- [ ] Test structured data (Rich Results Test)
- [ ] Connect Google Analytics
- [ ] Check Coverage report after 1 week
- [ ] Monitor Performance report weekly

---

**Last Updated**: 2026-01-20
**Site**: DevRadar Open Research
**Repository**: https://github.com/devradar-dev/open-research
