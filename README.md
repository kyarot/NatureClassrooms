# Nature Classrooms — Ghost Theme

A custom Ghost CMS theme built for [Nature Classrooms](https://natureclassrooms.in), an organisation that integrates nature-based learning into teaching spaces. The theme is designed to be clean, responsive, and content-rich, with tailored pages for resources, research, outreach, capacity building, and more.

---

## Requirements

- Ghost CMS **v5.0.0 or later**
- Node.js (as required by your Ghost version)


---

## Installation

### Upload to Ghost Admin

1. Zip the theme folder (excluding `node_modules`, `server.js`, `.ghostignore`):
   ```bash
   npm run zip
   ```
2. Go to **Ghost Admin → Settings → Design → Change theme**
3. Upload the generated `nature-classrooms-theme.zip`
4. Activate the theme

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local preview server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:2368](http://localhost:2368) in your browser

---

## Theme Structure

```
nature-classrooms-theme/
├── assets/
│   ├── css/                  # Page-specific and global stylesheets
│   ├── js/                   # JavaScript files (main.js, page scripts)
│   ├── logo/                 # main.png (white), blackmain.png (dark)
│   ├── images/               # Illustrations and UI images
│   ├── home/                 # Hero carousel images
│   ├── about/                # Team member photos
│   ├── fourarms/             # Our Work section images
│   ├── collaborators/        # Collaborator logos
│   ├── partnerlogo/          # Partner logos
│   ├── files/                # Downloadable resources
│   └── ...                   # Other page-specific media folders
├── partials/
│   ├── header.hbs            # Site header with navbar, search, mobile drawer
│   ├── footer.hbs            # Site footer
│   └── icons/                # SVG icon partials
├── default.hbs               # Base layout template
├── index.hbs                 # Homepage
├── post.hbs                  # Blog post template
├── page.hbs                  # Generic page template
├── author.hbs                # Author page
├── tag.hbs                   # Tag archive page
├── custom-about.hbs          # About Us page
├── custom-blog.hbs           # Blog listing page
├── custom-capacity.hbs       # Capacity Building page
├── custom-media.hbs          # NC in Media page
├── custom-outreach.hbs       # Outreach page
├── custom-research.hbs       # Research page
├── custom-resourcecreation.hbs  # Resource Creation page
├── page-resources.hbs        # Resources hub
├── page-activities.hbs       # Activities resource page
├── page-bingos.hbs           # Bingos resource page
├── page-anchor-charts.hbs    # Anchor Charts page
├── page-alphabet-charts.hbs  # Alphabet Charts page
├── page-modules.hbs          # Modules page
├── page-natural-history.hbs  # Natural History page
├── page-game.hbs             # There's Nothing There game page
├── page-search.hbs           # Search results page
├── page-our-approach.hbs     # Our Approach page
├── page-naturemoves.hbs      # Nature Moves page
├── page-naturestrokes.hbs    # Nature Strokes page
├── ...                       # Other custom pages
├── package.json
├── server.js                 # Local dev server
└── export-theme.sh           # Export/zip helper script
```

---

## CSS Architecture

Global and page-specific styles are split across dedicated files in `assets/css/`:

| File | Purpose |
|---|---|
| `default.css` | Global layout, navbar, typography, variables |
| `responsive.css` | All mobile/tablet overrides (breakpoints: 1024px, 768px, 480px) |
| `index.css` | Homepage styles |
| `post.css` | Blog post styles |
| `page.css` | Generic page styles |
| `about.css` | About Us page |
| `resources.css` | Resources hub and all sub-resource pages |
| `blog.css` | Blog listing |
| `game.css` | Game page |
| `search.css` | Search results page |
| `koenig.css` | Ghost editor card styles |
| *(others)* | One CSS file per custom page/template |

---

## Key Features

- **Fixed floating navbar** — glass-morphism style, switches between dark/light mode based on scroll position
- **Mobile navigation drawer** — slides in from the right with rounded corners, full navigation tree with expandable dropdowns
- **Custom search** — dropdown search panel in the navbar with live results
- **Hero carousel** — auto-advancing full-viewport image carousel on the homepage
- **Decorative illustrations** — page-specific SVG/PNG illustrations, hidden on mobile to prevent overflow
- **Resource hub** — dedicated pages for Bingos, Activities, Alphabet Charts, Anchor Charts, Modules, Natural History, and more
- **Multilingual alphabet charts** — Gujarati, Gojri, Kashmiri, Tamil alphabet chart pages
- **Downloadable resources** — direct file download support (PDFs, ZIPs, EXEs)
- **Team section** — animated team card loop on the About page
- **Collaborator logo loop** — infinite scroll logo ticker
- **Responsive design** — fully optimised for iPhone 12 Pro and all mobile/tablet sizes

---

## Navbar Behaviour

- **Desktop (>1024px):** Full horizontal nav with dropdown menus
- **Tablet/Mobile (≤1024px):** Hamburger button + search icon in a floating pill navbar (top-right), full menu in a side drawer

---

## Fonts Used

| Font | Usage |
|---|---|
| Poppins | Body text, UI elements |
| Oswald | Page titles, section headers |
| Playfair Display / Dancing Script | Decorative headings (some pages) |

All fonts are loaded via Google Fonts in `default.hbs`.

---

## License

MIT — free to modify and use for the Nature Classrooms project.

---

**Nature Classrooms** — Connecting Learning to the Natural World  
[natureclassrooms.in](https://natureclassrooms.in) · [info@natureclassrooms.in](mailto:info@natureclassrooms.in)
