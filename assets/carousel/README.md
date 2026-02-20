# Carousel Images

This folder contains sample nature-themed SVG images for the hero carousel:

- `1.svg` - Mountain landscape with forest (currently active)
- `2.svg` - Sunset lake scene with islands
- `3.svg` - Meadow with flowers and trees

## Replace with Your Own Images:

To use your own photos, replace these files with:

- `1.jpg` - First slide background  
- `2.jpg` - Second slide background
- `3.jpg` - Third slide background

Then update `index.hbs` to change the file extensions from `.svg` to `.jpg`:

```handlebars
<div class="carousel-slide active" style="background-image: url('{{asset "carousel/1.jpg"}}');"></div>
<div class="carousel-slide" style="background-image: url('{{asset "carousel/2.jpg"}}');"></div>
<div class="carousel-slide" style="background-image: url('{{asset "carousel/3.jpg"}}');"></div>
```

## Requirements:
- Format: JPG, PNG, or WebP
- Recommended size: 1920x1080 or higher
- Optimize images for web (compress to reduce file size)
- Ensure good contrast for text overlay readability

## Current Features:
✅ Full screen width carousel
✅ Automatic cycling every 5 seconds
✅ Smooth fade transitions between slides
✅ Sample nature images included
✅ Mobile responsive design