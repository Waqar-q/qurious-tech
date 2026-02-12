# Qurious Tech - Premium Futuristic Website

A complete static website for **Qurious Tech** - Building the Physical Brain of the Future.

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **Vanilla JavaScript** - No frameworks, pure performance
- **Google Fonts** - Space Grotesk (headings) & Inter (body)
- **Font Awesome** - Icons

## 📁 Folder Structure

```
qurious-tech-website/
├── index.html          # Homepage
├── embedded.html       # Embedded/Robotics page
├── services.html       # Services page
├── vault.html          # Blog & Video library
├── contact.html        # Contact page
├── styles.css          # All styles
├── script.js           # All JavaScript
├── assets/             # Images (placeholder)
└── README.md           # This file
```

## 🎨 Brand Colors

- **Primary Cyan:** `#36C9F6`
- **Deep Navy:** `#203762`
- **Royal Purple:** `#491078`
- **Neon Magenta:** `#A637FF`
- **Main Background:** `#0B0F1A`

## 📦 Deployment to GitHub Pages

### Method 1: Direct Upload

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select `main` branch and `/root` folder
5. Save and wait for deployment
6. Your site will be live at `https://username.github.io/repository-name/`

### Method 2: Git Commands

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Qurious Tech website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/username/repository-name.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages from Settings
```

## ✏️ Customization Guide

### Update YouTube Videos

1. Open `index.html` and `vault.html`
2. Find video cards with `data-video-id="dQw4w9WgXcQ"`
3. Replace `dQw4w9WgXcQ` with your actual YouTube video IDs
4. Update titles and descriptions

**Quick JavaScript Method:**
```javascript
// Add to script.js and call with your video IDs
updateVideoIds([
    'YOUR_VIDEO_ID_1',
    'YOUR_VIDEO_ID_2',
    // ... more IDs
]);
```

### Update Social Links

Search for these placeholders and replace:
- `https://youtube.com/@waqar_qurious`
- `https://instagram.com/qurioustech`
- `https://linkedin.com/company/qurioustech`
- `https://github.com/qurioustech`
- `https://x.com/qurioustech`

### Update Contact Email

Replace `hello@qurioustech.com` with your actual email in:
- All HTML files (contact links)
- `contact.html` (contact form)

### Add Real Images

1. Create `/assets/images/` folder
2. Add your images
3. Update image sources in HTML
4. Recommended sizes:
   - Hero images: 1920x1080px
   - Project images: 800x600px
   - Thumbnails: 400x300px

## 🎯 Features

### Interactive Elements
- ✅ Sticky navigation with scroll effect
- ✅ Mobile-responsive hamburger menu
- ✅ Smooth scroll animations
- ✅ Reveal on scroll effects
- ✅ Category filtering (Vault page)
- ✅ Search functionality (Vault page)
- ✅ Form validation
- ✅ Floating YouTube button

### Design Features
- ✅ Glassmorphism cards
- ✅ Gradient text effects
- ✅ Neon glow hover states
- ✅ Animated floating orbs
- ✅ Premium spacing and typography
- ✅ Fully responsive (mobile-first)

### SEO & Performance
- ✅ Semantic HTML5
- ✅ Meta tags for social sharing
- ✅ Fast loading (no dependencies)
- ✅ Optimized animations
- ✅ Accessibility features

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Form Handling

Currently, forms show alert messages. To connect to a backend:

### Option 1: Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
Add `netlify` attribute:
```html
<form netlify>
```

### Option 3: Custom Backend
Update `script.js` form handlers to POST to your API endpoint.

## 🎥 YouTube Integration

The website features YouTube video cards. To update:

1. **Get Video ID:** From URL `youtube.com/watch?v=VIDEO_ID`
2. **Update HTML:** Replace placeholder IDs
3. **Thumbnails auto-update** via YouTube API

## 🚀 Performance Tips

1. Optimize images before uploading (use WebP format)
2. Enable Cloudflare for CDN (free plan available)
3. Add lazy loading for images below fold
4. Consider adding a service worker for offline support

## 📧 Contact

For questions or support:
- **Email:** hello@qurioustech.com
- **YouTube:** [@waqar_qurious](https://youtube.com/@waqar_qurious)

## 📄 License

All rights reserved © 2024 Qurious Tech

---

**Built with ⚡ by Qurious Tech**

*Building the Physical Brain of the Future*
