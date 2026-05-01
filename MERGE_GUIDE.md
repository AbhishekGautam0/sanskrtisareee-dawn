# Theme Merge Guide

## Current Status
✅ Fresh theme successfully merged with old theme data  
✅ All custom sections, snippets, and templates are now in place  
✅ Ready for development and deployment

## What Was Merged
- **74 Custom Sections** from old theme
- **39 Reusable Snippets** from old theme
- **All Template Files**: index.json, product.json, collection.json, etc.
- **Assets**: CSS, JavaScript, and images
- **Locales**: Translation files
- **Config**: Theme settings and schema

## Important Files by Directory

### `/templates/` - Page Templates
- `index.json` - Homepage template
- `product.json` - Product page
- `collection.json` - Collection page
- `cart.json` - Shopping cart
- `article.json`, `blog.json` - Blog pages
- `page.json`, `page.about.json`, `page.contact.json` - Custom pages
- `password.json` - Password page
- `gift_card.liquid` - Gift card
- `404.json`, `search.json` - Error & search pages

### `/sections/` - Reusable Section Components
Key custom sections:
- `saree-story-video.liquid` - Custom video section
- `custom-contact-section.liquid` - Contact form
- `section-1-our-story.liquid` - Story section
- `hero-splide.liquid` - Hero carousel
- And 70 more...

### `/snippets/` - Reusable UI Components
Key snippets:
- `custom-media-slider.liquid` - Media slider
- `order-whatsapp.liquid` - WhatsApp integration
- `header-mega-menu.liquid` - Navigation menu
- And 36 more...

## Safe Merging Strategy for Future Updates

### ✅ DO: Update using this approach
```powershell
# 1. Create a feature branch for merges
git checkout -b feature/merge-old-updates
git pull origin main  # Get latest

# 2. Copy only NEW/MODIFIED sections from old theme
# (Identify what changed in old theme first)
Copy-Item "D:\old-theme\dawn-theme-old\sections\NEW_SECTION.liquid" `
  -Destination "./sections/" -Force

# 3. Copy only NEW snippets
Copy-Item "D:\old-theme\dawn-theme-old\snippets\NEW_SNIPPET.liquid" `
  -Destination "./snippets/" -Force

# 4. Review changes
git status
git diff

# 5. Commit and push
git add .
git commit -m "Merge new section/snippet from old theme: NEW_NAME"
git push origin feature/merge-old-updates

# 6. Create PR on GitHub for review before merging to main
```

### ❌ DON'T: Avoid bulk overwrites
- Don't use `-Force -Recurse` on entire folders (overwrites custom changes)
- Don't merge without reviewing changes first
- Don't push directly to main without testing

## File Protection Strategy

### Critical Custom Files (Protect These)
- Custom CSS/JS in `/assets/`
- Custom theme.json configuration
- Any files with "custom-" prefix

### Safe to Update
- Template files (usually have standard names like index.json, product.json)
- New sections/snippets from old theme (if they don't exist locally)

## Testing Before Deploy

```powershell
# Start development server
cd "c:\Users\HP\Downloads\fresh theme"
shopify theme dev

# Visit: http://localhost:9292 in your browser

# Once tested, deploy to live:
shopify theme push --live
```

## Git Commands Reference

```powershell
# Check what changed
git status

# See detailed changes
git diff

# Undo recent changes (before committing)
git restore <file>

# View commit history
git log --oneline

# Compare branches
git diff main origin/main
```

## Contact & Support
For theme updates, always:
1. ✅ Create a feature branch
2. ✅ Review changes locally (shopify theme dev)
3. ✅ Test thoroughly
4. ✅ Create PR for review
5. ✅ Merge to main after testing
6. ✅ Deploy with confidence
