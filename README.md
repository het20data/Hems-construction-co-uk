# HEMS Construction Ltd — GitHub + Cloudflare Deployment Guide

## Project Structure
```
hems-construction/
├── index.html          ← Main website
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All interactions
├── _headers            ← Cloudflare Pages security headers
├── _redirects          ← Cloudflare Pages redirects
└── README.md           ← This file
```

---

## 🚀 GitHub + Cloudflare Pages Deployment

### Step 1 — Push to GitHub
```bash
# In your project folder:
git init
git add .
git commit -m "Initial commit — HEMS Construction website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hems-construction.git
git push -u origin main
```

### Step 2 — Cloudflare Pages Setup
1. Go to https://pages.cloudflare.com
2. Click **Create a project** → Connect to Git
3. Authorise GitHub and select your repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

### Step 3 — Custom Domain (hemsconstruction.co.uk)
1. In Cloudflare Pages → **Custom Domains** → Add domain
2. Enter: `hemsconstruction.co.uk` and `www.hemsconstruction.co.uk`
3. If your domain is already in Cloudflare DNS, it auto-configures
4. If not, you'll need to update your domain registrar's nameservers to Cloudflare's

### Step 4 — Email Contacts
The site uses both:
- hemsconstruction@gmail.com (general enquiries)
- Info@hemsconstruction.co.uk (business / professional)

For the .co.uk email to work, set up MX records in Cloudflare DNS pointing 
to your email hosting provider (Google Workspace, Zoho Mail, etc.)

---

## 📧 Recommended: Connect the Contact Form
To make the contact form actually send emails, add Formspree (free):

1. Go to https://formspree.io and create a free account
2. Create a new form → copy your endpoint (e.g. https://formspree.io/f/YOUR_CODE)
3. In js/main.js, replace the setTimeout simulation in the form submit handler with:

```javascript
fetch('https://formspree.io/f/YOUR_CODE', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: fname + ' ' + document.getElementById('lname').value,
    email: email,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
  })
}).then(() => {
  submitBtn.style.display = 'none';
  formSuccess.classList.add('visible');
});
```

---

## 🔄 Updating the Site
Every `git push` to `main` automatically redeploys via Cloudflare Pages.
