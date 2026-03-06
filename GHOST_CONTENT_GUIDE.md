# Ghost Content Management Guide

This guide explains how to manage the content of the Nature Classrooms theme using the Ghost Admin interface.

## General Principles

Most sections on the custom pages are powered by "Hidden" posts. These are posts that have an internal tag (starting with `#`). These internal tags are used by the theme to fetch specific content.

### Using Internal Tags
Internal tags do not appear on the website. They are strictly used for technical categorization.
Example: `#sec-about-vision`

---

> [!IMPORTANT]
> **CRITICAL TAGGING RULES**
> 1. **Blog Posts**: Every regular post intended for the blog **MUST** have the `blog` tag. If it doesn't, it will not appear on the stories page.
> 2. **Section Content**: All technical/hidden posts (Heroes, Educator Notes, Videos) **MUST** use an internal tag starting with `#` (e.g., `#sec-about-vision`).
> 3. **Alphabet/Resource Items**: Posts for grids **MUST** use the specific `#hash-` internal tags (e.g., `#hash-activity`).


## About Page (`custom-about.hbs`)

Manage the sections of the About Us page using these specific tags.

### A. Hero Section (Source: Page)
- **Source**: The Ghost **Page** named "About Us".
- **Feature Image**: Background image for the hero.
- **Title**: Main page heading.
- **Content**: Optional intro text shown below the title.

### B. Intro Section (Founded)
- **Tag**: `#sec-about-intro`.
- **Feature Image**: Displayed on the right inside a decorative frame.
- **Custom Excerpt**: The year founded (e.g., `2018`).
- **Content**: Use `<h2>` for the heading and `<p>` for paragraphs.

### C. Vision Section
- **Tag**: `#sec-about-vision`.
- **Title**: The vision heading.
- **Content**: The vision quote text.
- **Feature Image**: Used as the background image for this section.

### D. Goals Section
- **Title Tag**: `#sec-about-goals-title`.
- **Title**: Section Title (e.g., "Our Goals").
- **Card Tag**: `#card-about-goal`.
- **Content**: Each post body provides one goal card.

### E. Team Section (Carousel)
- **Tag**: `#team-member`. 
- **Title**: Member Name.
- **Primary Tag**: Member's Role (e.g., "Scientist").
- **Content**: Full bio (shown in the popup modal).
- **Metadata -> Meta Description**: LinkedIn Profile URL.
- **Feature Image**: Profile picture.
- **Note**: The theme automatically creates a seamless loop.

### F. Alumni & Interns
- **Tags**: `#card-about-alumni` and `#card-about-intern`.
- **Title**: Person's Name.
- **Custom Excerpt**: Their initials (e.g., `VK`).
- **Metadata -> Meta Description**: LinkedIn Profile URL.

### G. Illustrators Section
- **Tag**: `#card-about-illustrator`.
- **Title**: Artist Name.
- **Metadata -> Meta Description**: URL to their portfolio.
- **Format**: Displayed as clickable pills with an external link icon.

### H. Learn More (CTA)
- **Tag**: `#sec-about-cta`.
- **Title**: Section Title (e.g., "Want to Learn More?").
- **Content**: Subtitle/Description text.
- **Metadata -> Meta Description**: URL for the "Learn More" button.

## Capacity Building Page (`custom-capacity.hbs`)

### 1. Intro Section (Our Purpose)
- **Tag**: `#sec-capacity-intro`
- **Title**: Section Title (e.g., "Our Purpose").
- **Content**: The purpose text/paragraphs.

### 2. Testimonial Section
- **Tag**: `#sec-capacity-testimonial`
- **Title**: The author attribution (e.g., "An Educator's Experience...").
- **Content**: The quote text.

### 3. Engagement Cards
- **Tag**: `#card-capacity-engagement`
- **Title**: Group Name (e.g., "Teachers & Educators").
- **Content**: Description text.
- **Feature Image**: Card image.

### 4. Collaborators List
- **Tag**: `#card-capacity-collaborator`
- **Title**: Organization Name.
- **Format**: Displayed as simple text tags in a grid.

## Blog Page (`custom-blog.hbs`)

### 1. Hero Content
- **Title/Excerpt**: Managed via the Blog **Page** settings.

### 2. Submission Note Box
- **Tag**: `#sec-blog-note`
- **Content**: The text/HTML for the call-to-pitch box.

## Media Page (`custom-media.hbs`)

Manage the sections of the Media page using these specific tags.

### A. Hero Section (Source: Page)
- **Source**: The Ghost **Page** named "Media" (or your specific media page).
- **Feature Image**: Background image for the hero.
- **Title**: Main page heading.
- **Custom Excerpt**: The small label above the title (e.g., "Press & Publications").

### B. Articles & Publications
- **Section Header Tag**: `#sec-media-articles`.
    - **Title**: Section Title (e.g., "Stories that Inspire").
    - **Content**: Section description.
    - **Custom Excerpt**: Section label (e.g., "Articles & Publications").
- **Article Card Tag**: `#hash-media-article`.
    - **Title**: Article Title.
    - **Content**: Brief snippet or description for the card.
    - **Custom Excerpt**: The "Type" or "Publisher" text shown above the title.
    - **Feature Image**: Article thumbnail.
    - **Primary Tag**: Category slug used for filtering (e.g., `press`, `research`).
    - **Metadata -> Meta Description**: URL to the full article.

### C. Podcast Section
- **Section Header Tag**: `#sec-media-podcasts`.
    - **Title**: Section Title (e.g., "Listen & Learn").
    - **Content**: Section description.
    - **Custom Excerpt**: Section label (e.g., "Podcasts").
- **Podcast Card Tag**: `#hash-media-podcast`.
    - **Title**: Episode Title.
    - **Content**: Episode description.
    - **Feature Image**: Podcast cover art.
    - **Primary Tag**: Provider name (e.g., "Spotify").
    - **Metadata -> Meta Description**: URL for the "Listen Now" button.
## 5. Main Resources Page (`page-resources.hbs`)

Manage the main navigation hub for all resources.

### A. Hero Section
- **Title**: Main page heading.
- **Content**: The descriptive subtitle shown below the title. Use rich text for formatting.
- **Feature Image**: Background image for the hero.

### B. Resource Categories
- **Tag**: `#hash-resource-category`
- **Title**: Category name (e.g., "Seasonal Bingos").
- **Content**: Short description of what's inside.
- **Feature Image**: Icon image.
- **Metadata -> Meta Description**: The URL the "Explore Resources" button should link to (e.g., `/resources/bingos/`).

---

## 6. Resource Content Management (Bingos, Charts, Tales, etc.)

Follow these steps for any specific resource category page.

### A. Hero Content
- **Title**: Main page heading (pulled from Ghost Page Title).
- **Content**: The main description text (pulled from Ghost Page Content).
- **Fallback**: If the Content field is empty, the **Custom Excerpt** from page settings will be shown.
- **Tags for specific pages**:
    - **Activities**: `#hash-activity`, `#sec-activity-note`
    - **Anchor Charts**: `#hash-anchor-chart`, `#sec-anchor-note`
    - **Learning Modules**: `#hash-module`, `#sec-module-note`
    - **Natural History**: `#hash-natural-history`, `#sec-naturalhistory-note`
    - **There's Nothing There**: `#sec-nothing-card` (Feature Card), `#sec-nothing-game` (Game Section).

### B. "There's Nothing There" Special Sections
- **Feature Card** (`#sec-nothing-card`):
    - **Title**: Multi-language titles split by `|`. Example: `English | Kannada | Hindi`.
    - **Content**: Book description.
    - **Metadata -> Meta Description**: List download links like `English|URL, Kannada|URL`.
- **Game Section** (`#sec-nothing-game`):
    - **Content**: Game invitation text.
    - **Metadata -> Meta Description**: URL for the "The Game" button.

### B. Resource Items (The Cards)
- **Tag**: Use the corresponding `#hash-` tag.
- **Title**: Resource Name.
- **Custom Excerpt**: Short description on the card.
- **Metadata -> Meta Description**: 
  - **Option A (Custom Link)**: Paste a URL for direct navigation.
  - **Option B (Downloads)**: `DOWNLOAD: Language|URL, Language|URL`.

---

## 4. Home Page Management

The home page is now fully dynamic. Follow these steps to manage each section.

### A. Hero Carousel Images
- **Tag**: `#sec-home-hero` (Slug: `hash-sec-home-hero`)
- **Feature Image**: Each post with this tag provides one image for the hero carousel.
- **Order**: Posts are shown in chronological order (oldest first).

### B. "What We Do" Section
- **Tag**: `#sec-home-what-we-do`
- **Content**: The main descriptive text.
- **Feature Image**: Used as the illustration next to the text (replaces the ant illustration if provided).

### C. "Our Work" Grid
- **Tag**: `#sec-home-our-work`
- **Title**: Section Title (e.g., "Resource Creation").
- **Excerpt**: Short description.
- **Feature Image**: Background image for the card.
- **Metadata -> Meta Description**: URL where the "Read More" button should link (e.g., `/resourcecreation/`).

### D. Our Partners
- **Tag**: `#sec-home-partners`
- **Feature Image**: Partner Logo.
- **Title**: Partner Name (shown only if no image is provided).

### E. Our Collaborators
- **Tag**: `#sec-home-collaborators`
- **Feature Image**: Collaborator Logo.
- **Note**: These logos will appear in the seamless scrolling loop at the bottom of the home page.

### 3. Educator Notes
- **Tag**: `#sec-[category]-note` (e.g., `#sec-bingo-note`, `#sec-behaviortales-note`).
- **Title**: "Note for Educators" or similar.
- **Content**: The note text and any "Questions to Explore" list.
### 4. Language-Specific Alphabet Charts

These pages (`page-tamilalphabetcharts.hbs`, `page-gojrialphabetchart.hbs`, etc.) have specific tags for their unique sections:

#### Tamil Alphabet Chart
- **Hero Tag**: `#sec-tamil-hero` (Title, Content)
- **Resource Grid Tag**: `#hash-tamil-alphabet` (Resource posts)
- **Video Section Tag**: `#sec-tamil-video` (Title, Excerpt/Description, Content for Embed)

#### Gojri Alphabet Chart
- **Hero Tag**: `#sec-gojri-hero` (Title, Content)
- **Resource Grid Tag**: `#hash-gojri-alphabet` (Resource posts)
- **Educator Note Tag**: `#sec-gojri-note` (Title, Content)

#### Gujarati Alphabet Chart
- **Hero Tag**: `#sec-gujarati-hero` (Title, Content)
- **Resource Grid Tag**: `#hash-gujarati-alphabet` (Resource posts)
- **Educator Note Tag**: `#sec-gujarati-note` (Title, Content)

#### Kashmiri Alphabet Chart
- **Hero Tag**: `#sec-kashmiri-hero` (Title, Content)
- **Resource Grid Tag**: `#hash-kashmiri-alphabet` (Resource posts)
- **Educator Note Tag**: `#sec-kashmiri-note` (Title, Content)

---

## 7. Our Approach Page

Manage the sections of the "Our Approach" page using these specific tags.

### A. Hero Section
- **Source**: The Ghost **Page** named "Our Approach".
- **Background Image**: Set the **Feature Image** in page settings.
- **Title/Content**: Pulled from the page Title and Content fields.

### B. Pillars of Our Program
- **Tag**: `#sec-approach-pillars`.
- **Title**: Pillar name.
- **Content**: Description. **To add a Download button**, simply insert a link (URL) in the content that contains the word "Download".
- **Feature Image**: Image shown on the pillar card.

### C. Nature in Action (Gallery)
- **Tag**: `#sec-approach-action`.
- **Content**: Add as many images as you want into the post body. The theme will automatically extract them and display them in the gallery grid.

### D. Nature Learning Checklist
- **Tag**: `#sec-approach-checklist`.
- **Content**: Add your text and buttons (links) into the post body. All links will be styled as action buttons.

### E. Recommended Reading
- **Tag**: `#sec-approach-reading`.
- **Content**: Add description text and any links (buttons) into the post body.

---

## 8. Resource Creation Page

Manage the sections of the Resource Creation page using these specific tags.

### A. Hero Section (Source: Page)
- **Source**: The Ghost **Page** named "Resource Creation".
- **Feature Image**: Background image for the hero.
- **Title**: Main page heading.
- **Content**: The intro text immediately following the hero.

### B. Additional Intro
- **Tag**: `#sec-rc-intro`.
- **Content**: Any additional introductory text.

### C. Inspiring Students
- **Tag**: `#sec-rc-inspiring` (Header/Intro post).
    - **Title**: Section Title (e.g., "Inspiring Students").
    - **Content**: Intro paragraph.
- **Tag**: `#card-rc-inspiring` (Individual card posts).
    - **Content**: The text for each card.
    - **Metadata -> Meta Description**: Optional SVG code for a custom icon.

### D. Featured Projects & Explore More
- **Tags**: `#sec-rc-featured` and `#sec-rc-explore`.
- **Title**: Project or Section Title.
- **Content**: Description text.
- **Feature Image**: Main image for the section.
- **Metadata -> Meta Description**: URL for the button link.

### E. Bottom Collaboration
- **Tag**: `#sec-rc-collab`.
- **Title**: Header text.
- **Content**: Main body text.
- **Metadata -> Meta Description**: URL for the "Get in touch" link.

---

## 9. Capacity Building Page

Manage the hero section of the Capacity Building page using the Page settings.

### A. Hero Section
- **Source**: The Ghost **Page** named "Capacity Building".
- **Feature Image**: Set the **Feature Image** in page settings to change the hero background.
- **Title**: Change the page title to update the hero heading.

---

## 10. Research Page

Manage the sections of the Research page using these specific tags.

### A. Hero Section (Source: Page)
- **Source**: The Ghost **Page** named "Research".
- **Feature Image**: Background image for the hero.
- **Title**: Main page heading.
- **Content**: The intro text or description shown in the hero.

### B. Core Philosophy
- **Tag**: `#sec-research-intro`.
- **Title**: Section Title (e.g., "Core Philosophy").
- **Content**: The body text for the philosophy section.

### C. Research Projects
- **Tag**: `#card-research-project`.
- **Title**: Project Title.
- **Content**: Project description.
- **Feature Image**: Main image for the project item.
- **Primary Tag**: The category label (e.g., "Collaborative Study") will be taken from the post's primary tag.
- **Metadata -> Meta Description**: URL for the "Read More" button link.

---

## 11. Outreach Page

Manage the sections of the Outreach & Public Engagement page using these specific tags.

### A. Hero Section (Source: Page)
- **Source**: The Ghost **Page** named "Outreach & Public Engagement".
- **Feature Image**: Background image for the hero.
- **Title**: Main page heading.
- **Content**: Optional description text shown below the title in the hero.

### B. Intro Section
- **Tag**: `#sec-outreach-intro`.
- **Content**: The body text for the introductory section.

### C. Initiatives Grid
- **Tag**: `#card-outreach-initiative`.
- **Title**: Initiative Title.
- **Content**: Brief description.
- **Feature Image**: Main image for the initiative card.
- **Metadata -> Meta Description**: URL for the "Read More" link.

### D. Contact / CTA Section
- **Tag**: `#sec-outreach-cta`.
- **Title**: Header text (e.g., "Get in Touch").
- **Content**: Main body text.
- **Metadata -> Meta Description**: URL for the "Get in Touch" button link.

---

## Troubleshooting Visibility Issues

If a post is not appearing in its section:
1. **Check Tag Format**: Ensure technical tags start with `#` in the Ghost Admin.
2. **Check for 'blog' tag**: Ensure sections (like Educator Notes) do **NOT** have the `blog` tag, or they might appear in the stories section by mistake.
3. **Internal Tags vs Slugs**: The theme looks for the slug of the internal tag (e.g., `#sec-tamil-hero` has slug `hash-sec-tamil-hero`). Ghost handles this automatically, but ensure no special characters or spaces are in your tag names.
4. **Publishing Status**: Ensure the post is set to "Published", not "Draft".
