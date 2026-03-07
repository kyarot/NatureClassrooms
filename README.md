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

## Ghost Content Tags Reference

This theme is **entirely data-driven through Ghost posts and internal tags**. Every section — from hero images to team members to downloadable resources — is populated by creating posts in Ghost Admin and assigning the correct tag. No code changes are needed to update content.

---

### How Tags Work in This Theme

Ghost supports two kinds of tags:

| Type | Ghost Admin prefix | Filter query syntax | Visible to readers |
|---|---|---|---|
| **Public tag** | *(no prefix)* | `tag:slug` | Yes — appears on post cards and tag archive pages |
| **Internal tag** | `#` (hash) | `tag:hash-slug` | No — used only for theme logic |

> **Important:** When creating internal tags in Ghost Admin, prefix the tag name with `#` (e.g., `#sec-home-hero`). The theme's Handlebars filters reference these as `hash-` (e.g., `filter="tag:hash-sec-home-hero"`). This is standard Ghost behaviour.

---

### Tag Naming Conventions

The theme follows a consistent three-part naming pattern for internal tags:

```
#<type>-<page>-<purpose>
```

| Prefix | Meaning | Usage pattern |
|---|---|---|
| `#sec-` | **Section content** | Single post (`limit="1"`) that controls a section's heading, body text, or media |
| `#card-` | **Card items** | Multiple posts, each rendered as one card in a grid or list |
| `#hash-` | **Resource items** | Multiple posts, each rendered as one downloadable/viewable resource tile |

---

### Public Tags

| Tag | Used in | Purpose |
|---|---|---|
| `blog` | `custom-blog.hbs`, `routes.yaml` | Marks a post as a blog article. Drives both the `/blog/` collection and the blog listing page. Every post intended to appear on the blog must carry this tag. |

---

### Homepage Tags — `index.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-home-hero` | `#sec-home-hero` | Hero carousel slides. Each post = one slide. Uses `title`, `feature_image`, and post body. Ordered by `published_at asc`. |
| `hash-sec-home-what-we-do` | `#sec-home-what-we-do` | "What We Do" section intro. Single post (`limit="1"`). Uses `title` and post body HTML. |
| `hash-sec-home-our-work` | `#sec-home-our-work` | "Our Work" four-panel section. Each post = one work area card. Ordered by `published_at asc`. |
| `hash-sec-home-partners` | `#sec-home-partners` | Partners section. Each post = one partner logo/link. Ordered by `published_at asc`. |
| `hash-sec-home-collaborators` | `#sec-home-collaborators` | Collaborators infinite-scroll ticker. Each post = one collaborator. Up to 100 entries. |

---

### About Page Tags — `custom-about.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-about-intro` | `#sec-about-intro` | About page intro/banner section. Single post. Uses `title` and body text. |
| `hash-sec-about-vision` | `#sec-about-vision` | Vision statement block. Single post. Uses `title` and body text. |
| `hash-sec-about-goals-title` | `#sec-about-goals-title` | Goals section heading post. Single post. Uses `title` only. |
| `hash-card-about-goal` | `#card-about-goal` | Individual organisational goal cards. Each post = one goal. Ordered by `published_at asc`. |
| `hash-team-member` | `#team-member` | Team member profiles. Each post = one team member. `feature_image` = photo; `primary_tag.name` = role/designation. Used in both the animated loop and the static grid. |
| `hash-card-about-alumni` | `#card-about-alumni` | Alumni member cards. Each post = one alumna/alumnus. Ordered by `published_at asc`. |
| `hash-card-about-intern` | `#card-about-intern` | Intern cards. Each post = one intern. Ordered by `published_at asc`. |
| `hash-card-about-illustrator` | `#card-about-illustrator` | Illustrator/contributor cards. Each post = one illustrator. Ordered by `published_at asc`. |
| `hash-sec-about-cta` | `#sec-about-cta` | Call-to-action section at the bottom. Single post. Uses `title`, body text, and any CTA link. |

---

### Blog Page Tags — `custom-blog.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-blog-note` | `#sec-blog-note` | Blog page intro note or banner. Single post. Uses `title` and body text. |
| `blog` *(public)* | `blog` | All blog articles fetched for the listing (10 per page, includes author and tag data). |

---

### Capacity Building Page Tags — `custom-capacity.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-capacity-intro` | `#sec-capacity-intro` | Page intro/hero text. Single post. |
| `hash-sec-capacity-testimonial` | `#sec-capacity-testimonial` | Testimonial/quote block. Single post. Uses body text for the quote. |
| `hash-card-capacity-engagement` | `#card-capacity-engagement` | Engagement type cards (workshops, training, etc.). Each post = one engagement type. Up to 100 entries; includes tags and authors. |
| `hash-card-capacity-collaborator` | `#card-capacity-collaborator` | Collaborator logos or names. Each post = one collaborator. `title` is rendered as a label badge. Ordered by `published_at asc`. |
| `hash-sec-capacity-cta` | `#sec-capacity-cta` | Call-to-action section at the bottom. Single post. |

---

### NC in Media Page Tags — `custom-media.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-media-articles` | `#sec-media-articles` | Articles section header/intro text. Single post. |
| `hash-media-article` | `#media-article` | Individual media article entries (press coverage, interviews). Each post = one article card. `primary_tag.name` is used as the category badge. Ordered by `published_at desc`. |
| `hash-sec-media-podcasts` | `#sec-media-podcasts` | Podcasts section header/intro text. Single post. |
| `hash-media-podcast` | `#media-podcast` | Individual podcast episode entries. Each post = one episode card. `primary_tag.name` is used as the category label. Ordered by `published_at desc`. |

---

### Outreach Page Tags — `custom-outreach.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-outreach-intro` | `#sec-outreach-intro` | Page intro text. Single post. |
| `hash-card-outreach-initiative` | `#card-outreach-initiative` | Outreach initiative cards. Each post = one initiative. Up to 100 entries; includes tags and authors. |
| `hash-sec-outreach-cta` | `#sec-outreach-cta` | Call-to-action section at the bottom. Single post. |

---

### Research Page Tags — `custom-research.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-research-intro` | `#sec-research-intro` | Page intro/hero text. Single post. |
| `hash-card-research-project` | `#card-research-project` | Research project cards. Each post = one project. `primary_tag.name` is used as the project category label. Up to 100 entries; includes tags and authors. |

---

### Resource Creation Page Tags — `custom-resourcecreation.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-rc-intro` | `#sec-rc-intro` | Page intro section. Single post. |
| `hash-sec-rc-inspiring` | `#sec-rc-inspiring` | "Inspiring Educators" section heading. Single post. |
| `hash-card-rc-inspiring` | `#card-rc-inspiring` | Inspiring educator/creator cards. Each post = one person or resource. Ordered by `published_at asc`. Up to 100 entries. |
| `hash-sec-rc-featured` | `#sec-rc-featured` | Featured resources section. Supports multiple posts; ordered by `published_at asc`. |
| `hash-sec-rc-explore` | `#sec-rc-explore` | Explore section content. Multiple posts; ordered by `published_at asc`. |
| `hash-sec-rc-collab` | `#sec-rc-collab` | Collaboration/partnership section. Single post. |

---

### Resources Hub Tags — `page-resources.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-resource-category` | `#resource-category` | Resource category navigation cards. Each post = one resource category (e.g., Bingos, Activities). Links users to the relevant sub-resource page. Up to 100 entries; includes tags and authors. |

---

### Activities Page Tags — `page-activities.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-activity` | `#hash-activity` | Individual activity resource posts. Each post = one downloadable or viewable activity. Ordered by `published_at asc`; includes tags. |
| `hash-sec-activity-note` | `#sec-activity-note` | Informational note/footer shown below the activity grid. Single post. |

---

### Alphabet Charts Page Tags — `page-alphabet-charts.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-alphabet-chart` | `#hash-alphabet-chart` | Alphabet chart resource posts (language-agnostic parent listing). Each post = one chart. Ordered by `published_at asc`; includes tags. |

---

### Anchor Charts Page Tags — `page-anchor-charts.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-anchor-chart` | `#hash-anchor-chart` | Individual anchor chart resource posts. Each post = one chart. Ordered by `published_at asc`; includes tags. |
| `hash-sec-anchor-note` | `#sec-anchor-note` | Informational note/footer below the chart grid. Single post. |

---

### Behavior Tales Page Tags — `page-behaviortales.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-behavior-tales` | `#hash-behavior-tales` | Individual Behavior Tales story posts. Each post = one tale/story. Ordered by `published_at asc`; includes tags. |
| `hash-sec-behaviortales-note` | `#sec-behaviortales-note` | Note/footer section below the stories grid. Single post. |

---

### Bingos Page Tags — `page-bingos.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-bingo` | `#hash-bingo` | Individual bingo card resource posts. Each post = one bingo sheet. Ordered by `published_at asc`; includes tags and full HTML content. |
| `hash-sec-bingo-note` | `#sec-bingo-note` | Informational note/footer below the bingo grid. Single post. |

---

### Seasonal Bingos Page Tags — `page-seasonal-bingos.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-seasonal-bingo` | `#hash-seasonal-bingo` | Seasonal bingo card resource posts. Each post = one seasonal bingo sheet. Ordered by `published_at asc`; includes tags. |

---

### Children, Nature & City Page Tags — `page-children-nature-city.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-cnc-about` | `#sec-cnc-about` | About/intro section. Single post. |
| `hash-sec-cnc-download` | `#sec-cnc-download` | Download section (book/resource download). Single post. |
| `hash-sec-cnc-partners` | `#sec-cnc-partners` | Partners section. Each post = one partner. Ordered by `published_at asc`. |

---

### Communities of Practice Page Tags — `page-communitiesofpractice.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-cop-about` | `#sec-cop-about` | About/intro section for the Communities of Practice programme. Single post. |

---

### Game (There's Nothing There) Page Tags — `page-game.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-game-about` | `#sec-game-about` | Game about/intro section. Single post. |

---

### There's Nothing There Page Tags — `page-theres-nothing-there.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-nothing-about` | `#sec-nothing-about` | About/intro section. Single post. |
| `hash-sec-nothing-card` | `#sec-nothing-card` | Game card/info content block. Single post; includes tags and full HTML. |
| `hash-sec-nothing-game` | `#sec-nothing-game` | Game download or link section. Single post. |

---

### Gojri Alphabet Chart Page Tags — `page-gojrialphabetchart.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-gojri-alphabet` | `#hash-gojri-alphabet` | Gojri alphabet chart posts. Each post = one letter/card. Ordered by `published_at asc`; includes tags. |
| `hash-sec-gojri-note` | `#sec-gojri-note` | Note/footer below the chart grid. Single post. |

---

### Gujarati Alphabet Chart Page Tags — `page-gujaratialphabetchart.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-gujarati-alphabet` | `#hash-gujarati-alphabet` | Gujarati alphabet chart posts. Each post = one letter/card. Ordered by `published_at asc`; includes tags. |
| `hash-sec-gujarati-note` | `#sec-gujarati-note` | Note/footer below the chart grid. Single post. |

---

### Kashmiri Alphabet Charts Page Tags — `page-kashmirialphabetcharts.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-kashmiri-alphabet` | `#hash-kashmiri-alphabet` | Kashmiri alphabet chart posts. Each post = one letter/card. Ordered by `published_at asc`; includes tags. |
| `hash-sec-kashmiri-note` | `#sec-kashmiri-note` | Note/footer below the chart grid. Single post. |

---

### Tamil Alphabet Charts Page Tags — `page-tamilalphabetcharts.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-tamil-alphabet` | `#hash-tamil-alphabet` | Tamil alphabet chart posts. Each post = one letter/card. Ordered by `published_at asc`; includes tags. |
| `hash-sec-tamil-video` | `#sec-tamil-video` | Tamil instructional video section. Single post. |

---

### Hidden Housemates Page Tags — `page-hidden-housemates.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-hidden-housemates` | `#hash-hidden-housemates` | Hidden Housemates resource posts. Each post = one creature/entry. Ordered by `published_at desc`; includes tags. |

---

### Modules Page Tags — `page-modules.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-module` | `#hash-module` | Learning module posts. Each post = one module. Ordered by `published_at asc`; includes tags. |

---

### Natural History Page Tags — `page-natural-history.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-natural-history` | `#hash-natural-history` | Natural history resource posts. Each post = one species/entry. Ordered by `published_at asc`; includes tags. |

---

### Nature-Based Social-Emotional Learning Page Tags — `page-nature-based-social-emotional-learning.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-nbsel-about` | `#sec-nbsel-about` | About/intro section. Single post. |
| `hash-sec-nbsel-download` | `#sec-nbsel-download` | Download section (framework document). Single post. |

---

### Nature Education Assessment Framework Page Tags — `page-nature-education-assessment-framework.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-neaf-about` | `#sec-neaf-about` | About/intro section for the NEAF programme. Single post. |

---

### Nature Educator Page Tags — `page-natureeducator.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-nem-about` | `#sec-nem-about` | About/intro section for the Nature Educator Module. Single post. |

---

### Nature Moves Page Tags — `page-naturemoves.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-nature-move` | `#nature-move` | Nature Moves activity posts. Each post = one movement activity. Ordered by `published_at desc`; includes tags and full HTML content. |

---

### Nature Strokes Page Tags — `page-naturestrokes.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-nature-stroke` | `#hash-nature-stroke` | Nature Strokes activity posts. Each post = one stroke/activity. Ordered by `published_at desc`; includes tags and full HTML content. |

---

### Our Approach Page Tags — `page-our-approach.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-approach-pillars` | `#sec-approach-pillars` | Approach pillar cards. Each post = one pillar. Ordered by `published_at asc`; includes tags. |
| `hash-sec-approach-action` | `#sec-approach-action` | Action/call-to-action section. Single post. |
| `hash-sec-approach-checklist` | `#sec-approach-checklist` | Checklist items. Up to 2 posts; each post = one checklist block. |
| `hash-sec-approach-reading` | `#sec-approach-reading` | Recommended reading/references section. Single post. |

---

### Plant Poster Page Tags — `page-plantposter.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-hash-plant-posters` | `#hash-plant-posters` | Plant poster resource posts. Each post = one poster. Ordered by `published_at desc`; includes tags. |

---

### Suttha Muttha Page Tags — `page-suttha-muttha.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-sm-about` | `#sec-sm-about` | About/intro section for the Suttha Muttha programme. Single post. |
| `hash-sec-sm-partners` | `#sec-sm-partners` | Partners section. Each post = one partner logo/name. Ordered by `published_at asc`. |

---

### Water Module Page Tags — `page-watermodule.hbs`

| Internal Tag | Ghost Admin Tag | Purpose |
|---|---|---|
| `hash-sec-wm-about` | `#sec-wm-about` | About/intro section. Single post. |
| `hash-sec-wm-download` | `#sec-wm-download` | Download section (module document). Single post; includes tags. |

---

### Complete Tag Index

The table below lists every tag used across the theme in alphabetical order for quick lookup.

| Tag (Ghost Admin) | Filter Query Key | Template(s) |
|---|---|---|
| `#card-about-alumni` | `hash-card-about-alumni` | `custom-about.hbs` |
| `#card-about-goal` | `hash-card-about-goal` | `custom-about.hbs` |
| `#card-about-illustrator` | `hash-card-about-illustrator` | `custom-about.hbs` |
| `#card-about-intern` | `hash-card-about-intern` | `custom-about.hbs` |
| `#card-capacity-collaborator` | `hash-card-capacity-collaborator` | `custom-capacity.hbs` |
| `#card-capacity-engagement` | `hash-card-capacity-engagement` | `custom-capacity.hbs` |
| `#card-outreach-initiative` | `hash-card-outreach-initiative` | `custom-outreach.hbs` |
| `#card-rc-inspiring` | `hash-card-rc-inspiring` | `custom-resourcecreation.hbs` |
| `#card-research-project` | `hash-card-research-project` | `custom-research.hbs` |
| `#hash-activity` | `hash-hash-activity` | `page-activities.hbs` |
| `#hash-alphabet-chart` | `hash-hash-alphabet-chart` | `page-alphabet-charts.hbs` |
| `#hash-anchor-chart` | `hash-hash-anchor-chart` | `page-anchor-charts.hbs` |
| `#hash-behavior-tales` | `hash-hash-behavior-tales` | `page-behaviortales.hbs` |
| `#hash-bingo` | `hash-hash-bingo` | `page-bingos.hbs` |
| `#hash-gojri-alphabet` | `hash-hash-gojri-alphabet` | `page-gojrialphabetchart.hbs` |
| `#hash-gujarati-alphabet` | `hash-hash-gujarati-alphabet` | `page-gujaratialphabetchart.hbs` |
| `#hash-hidden-housemates` | `hash-hash-hidden-housemates` | `page-hidden-housemates.hbs` |
| `#hash-kashmiri-alphabet` | `hash-hash-kashmiri-alphabet` | `page-kashmirialphabetcharts.hbs` |
| `#hash-module` | `hash-hash-module` | `page-modules.hbs` |
| `#hash-natural-history` | `hash-hash-natural-history` | `page-natural-history.hbs` |
| `#hash-nature-stroke` | `hash-hash-nature-stroke` | `page-naturestrokes.hbs` |
| `#hash-plant-posters` | `hash-hash-plant-posters` | `page-plantposter.hbs` |
| `#hash-seasonal-bingo` | `hash-hash-seasonal-bingo` | `page-seasonal-bingos.hbs` |
| `#hash-tamil-alphabet` | `hash-hash-tamil-alphabet` | `page-tamilalphabetcharts.hbs` |
| `#media-article` | `hash-media-article` | `custom-media.hbs` |
| `#media-podcast` | `hash-media-podcast` | `custom-media.hbs` |
| `#nature-move` | `hash-nature-move` | `page-naturemoves.hbs` |
| `#resource-category` | `hash-resource-category` | `page-resources.hbs` |
| `#sec-about-cta` | `hash-sec-about-cta` | `custom-about.hbs` |
| `#sec-about-goals-title` | `hash-sec-about-goals-title` | `custom-about.hbs` |
| `#sec-about-intro` | `hash-sec-about-intro` | `custom-about.hbs` |
| `#sec-about-vision` | `hash-sec-about-vision` | `custom-about.hbs` |
| `#sec-activity-note` | `hash-sec-activity-note` | `page-activities.hbs` |
| `#sec-anchor-note` | `hash-sec-anchor-note` | `page-anchor-charts.hbs` |
| `#sec-approach-action` | `hash-sec-approach-action` | `page-our-approach.hbs` |
| `#sec-approach-checklist` | `hash-sec-approach-checklist` | `page-our-approach.hbs` |
| `#sec-approach-pillars` | `hash-sec-approach-pillars` | `page-our-approach.hbs` |
| `#sec-approach-reading` | `hash-sec-approach-reading` | `page-our-approach.hbs` |
| `#sec-behaviortales-note` | `hash-sec-behaviortales-note` | `page-behaviortales.hbs` |
| `#sec-bingo-note` | `hash-sec-bingo-note` | `page-bingos.hbs` |
| `#sec-blog-note` | `hash-sec-blog-note` | `custom-blog.hbs` |
| `#sec-capacity-cta` | `hash-sec-capacity-cta` | `custom-capacity.hbs` |
| `#sec-capacity-intro` | `hash-sec-capacity-intro` | `custom-capacity.hbs` |
| `#sec-capacity-testimonial` | `hash-sec-capacity-testimonial` | `custom-capacity.hbs` |
| `#sec-cnc-about` | `hash-sec-cnc-about` | `page-children-nature-city.hbs` |
| `#sec-cnc-download` | `hash-sec-cnc-download` | `page-children-nature-city.hbs` |
| `#sec-cnc-partners` | `hash-sec-cnc-partners` | `page-children-nature-city.hbs` |
| `#sec-cop-about` | `hash-sec-cop-about` | `page-communitiesofpractice.hbs` |
| `#sec-game-about` | `hash-sec-game-about` | `page-game.hbs` |
| `#sec-gojri-note` | `hash-sec-gojri-note` | `page-gojrialphabetchart.hbs` |
| `#sec-gujarati-note` | `hash-sec-gujarati-note` | `page-gujaratialphabetchart.hbs` |
| `#sec-home-collaborators` | `hash-sec-home-collaborators` | `index.hbs` |
| `#sec-home-hero` | `hash-sec-home-hero` | `index.hbs` |
| `#sec-home-our-work` | `hash-sec-home-our-work` | `index.hbs` |
| `#sec-home-partners` | `hash-sec-home-partners` | `index.hbs` |
| `#sec-home-what-we-do` | `hash-sec-home-what-we-do` | `index.hbs` |
| `#sec-kashmiri-note` | `hash-sec-kashmiri-note` | `page-kashmirialphabetcharts.hbs` |
| `#sec-media-articles` | `hash-sec-media-articles` | `custom-media.hbs` |
| `#sec-media-podcasts` | `hash-sec-media-podcasts` | `custom-media.hbs` |
| `#sec-nbsel-about` | `hash-sec-nbsel-about` | `page-nature-based-social-emotional-learning.hbs` |
| `#sec-nbsel-download` | `hash-sec-nbsel-download` | `page-nature-based-social-emotional-learning.hbs` |
| `#sec-neaf-about` | `hash-sec-neaf-about` | `page-nature-education-assessment-framework.hbs` |
| `#sec-nem-about` | `hash-sec-nem-about` | `page-natureeducator.hbs` |
| `#sec-nothing-about` | `hash-sec-nothing-about` | `page-theres-nothing-there.hbs` |
| `#sec-nothing-card` | `hash-sec-nothing-card` | `page-theres-nothing-there.hbs` |
| `#sec-nothing-game` | `hash-sec-nothing-game` | `page-theres-nothing-there.hbs` |
| `#sec-outreach-cta` | `hash-sec-outreach-cta` | `custom-outreach.hbs` |
| `#sec-outreach-intro` | `hash-sec-outreach-intro` | `custom-outreach.hbs` |
| `#sec-rc-collab` | `hash-sec-rc-collab` | `custom-resourcecreation.hbs` |
| `#sec-rc-explore` | `hash-sec-rc-explore` | `custom-resourcecreation.hbs` |
| `#sec-rc-featured` | `hash-sec-rc-featured` | `custom-resourcecreation.hbs` |
| `#sec-rc-inspiring` | `hash-sec-rc-inspiring` | `custom-resourcecreation.hbs` |
| `#sec-rc-intro` | `hash-sec-rc-intro` | `custom-resourcecreation.hbs` |
| `#sec-research-intro` | `hash-sec-research-intro` | `custom-research.hbs` |
| `#sec-sm-about` | `hash-sec-sm-about` | `page-suttha-muttha.hbs` |
| `#sec-sm-partners` | `hash-sec-sm-partners` | `page-suttha-muttha.hbs` |
| `#sec-tamil-video` | `hash-sec-tamil-video` | `page-tamilalphabetcharts.hbs` |
| `#sec-wm-about` | `hash-sec-wm-about` | `page-watermodule.hbs` |
| `#sec-wm-download` | `hash-sec-wm-download` | `page-watermodule.hbs` |
| `#team-member` | `hash-team-member` | `custom-about.hbs` |
| `blog` *(public)* | `blog` | `custom-blog.hbs`, `routes.yaml` |

> **Total:** 1 public tag · 74 internal tags · across 25 templates

---

### Tips for Content Editors

- **Creating internal tags:** In Ghost Admin → Tags → New Tag, name the tag starting with `#` (e.g., `#sec-home-hero`). Ghost will mark it internal automatically.
- **Ordering content:** All resource and card collections respect `published_at` order. Set a post's publish date deliberately to control display order — no numeric sorting field is required.
- **Primary tag as label:** On Research projects, Media articles, and Team members, the `primary_tag` is used as a visible category badge or role label. Make the most descriptive tag the primary one.
- **Section posts:** Posts tagged with `#sec-*` should have their visibility set to **Public** (or use `visibility="all"` — already handled in the templates). The post body HTML is directly injected into the page.
- **Visibility:** Team member posts use `visibility="all"` — they can safely be set to **Private** or **Draft** without breaking the page, but they must be **Published** to appear.

---

## License

MIT — free to modify and use for the Nature Classrooms project.

---

**Nature Classrooms** — Connecting Learning to the Natural World  
[natureclassrooms.in](https://natureclassrooms.in) · [info@natureclassrooms.in](mailto:info@natureclassrooms.in)
