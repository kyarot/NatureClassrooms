const express = require('express');
const exphbs = require('express-hbs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure express-hbs
app.engine('hbs', exphbs.express4({
    partialsDir: [
        path.join(__dirname, 'partials'),
        path.join(__dirname, 'partials/icons')
    ],
    layoutsDir: __dirname,
    defaultLayout: path.join(__dirname, 'default.hbs')
}));

app.set('view engine', 'hbs');
app.set('views', __dirname);

// Mock Ghost helpers
const registerHelper = (name, fn) => {
    exphbs.registerHelper(name, fn);
};

registerHelper('asset', function (context) {
    const cleanPath = context.startsWith('/') ? context.substring(1) : context;
    return '/assets/' + cleanPath;
});

registerHelper('get', function (resource, options) {
    let data = {};
    const root = (options.data && options.data.root) ? options.data.root : this;

    if (resource === 'posts') {
        // Fallback to a global mock if nothing is found in context
        data.posts = this.posts || root.posts || [];
    } else if (resource === 'pages') {
        data.pages = this.pages || root.pages || [];
    }

    console.log(`[DEBUG] get ${resource}: context has posts? ${!!this.posts}, root has posts? ${!!root.posts}, count: ${data[resource].length}`);

    if (data[resource] && data[resource].length > 0) {
        return options.fn(data);
    } else if (options.inverse) {
        return options.inverse(this);
    }
    return '';
});

registerHelper('foreach', function (context, options) {
    if (!context || !Array.isArray(context) || context.length === 0) {
        return options.inverse ? options.inverse(this) : '';
    }

    const from = parseInt(options.hash.from) || 1;
    const limit = parseInt(options.hash.limit) || context.length;
    const items = context.slice(from - 1, from - 1 + limit);

    return items.map((item, index) => {
        // Create a copy of the item to avoid mutation issues across multiple loops
        const itemCopy = Object.assign({}, item);
        itemCopy['@first'] = (index === 0);
        itemCopy['@last'] = (index === items.length - 1);
        itemCopy['@index'] = index;
        itemCopy['@number'] = index + 1;
        return options.fn(itemCopy);
    }).join('');
});

registerHelper('reading_time', function () {
    return this.reading_time || '3 min read';
});

registerHelper('excerpt', function (options) {
    const text = this.excerpt || '';
    const words = options.hash.words || 50;
    return text.split(' ').slice(0, words).join(' ') + '...';
});

registerHelper('img_url', function (context) {
    return context || '';
});

registerHelper('primary_author', function (options) {
    if (this.primary_author) return options.fn(this.primary_author);
    return '';
});

registerHelper('ghost_head', () => '');
registerHelper('ghost_foot', () => '');
registerHelper('body_class', () => 'page-template');
registerHelper('meta_title', () => 'Nature Classrooms');
registerHelper('post', function (options) { return options.fn(this); });

// Mock @site and @blog globals
app.use((req, res, next) => {
    res.locals['@site'] = {
        title: 'Nature Classrooms',
        description: 'Connecting Learning to the Natural World',
        logo: '/assets/logo/main.png',
        locale: 'en'
    };
    res.locals.post = {};
    next();
});

// Serve static files from assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about/', (req, res) => {
    res.render('custom-about');
});

app.get('/capacity/', (req, res) => {
    res.render('custom-capacity');
});

app.get('/research/', (req, res) => {
    res.render('custom-research');
});

app.get('/outreach/', (req, res) => {
    res.render('custom-outreach');
});

app.get('/media/', (req, res) => {
    res.render('custom-media');
});

app.get('/resources/', (req, res) => {
    res.render('page-resources');
});

app.get('/resources/:slug/', (req, res) => {
    const slug = req.params.slug;
    const templatePath = path.join(__dirname, `page-${slug}.hbs`);
    if (fs.existsSync(templatePath)) {
        res.render(`page-${slug}`);
    } else {
        res.status(404).send('<h1>404: Resource Not Found</h1><a href="/resources/">Back to Resources</a>');
    }
});

app.get('/our-approach/', (req, res) => {
    res.render('page-our-approach');
});



app.get('/blog/', (req, res) => {
    res.render('custom-blog', {
        posts: [
            {
                title: "How Spiders Won Over a Classroom",
                url: "#",
                meta_description: "An Educator's Diary #8",
                excerpt: "On a workshop about animal homes, children played a bingo game about spiders. They found all spiders except the signature spider. Weeks later, they excitedly shouted \"Ma'am, there it is!\"",
                feature_image: "/assets/images/media-1.jpg",
                primary_author: { name: "Gousia Taj" },
                reading_time: "2 min read"
            },
            {
                title: "ಜೇಡಗಳನ್ನು ಪ್ರೀತಿಸುವ ಮಕ್ಕಳು",
                url: "#",
                meta_description: "An Educator's Diary #8",
                excerpt: "An Educator's Diary #8. Exploring natural wonder through the eyes of curious learners in rural Karnataka schools.",
                feature_image: "/assets/images/media-2.jpg",
                primary_author: { name: "Gousia Taj" },
                reading_time: "2 min read"
            },
            {
                title: "Observing Nature through Binoculars",
                url: "#",
                meta_description: "An Educator's Diary #9",
                excerpt: "A day by the lake watching birds and learning about their unique characteristics. The children were thrilled to see a kingfisher pluck a fish from the water!",
                feature_image: "/assets/images/media-3.jpg",
                primary_author: { name: "Manjupriya Ayyanar & Maria Thomas" },
                reading_time: "5 min read"
            },
            {
                title: "Nature Classroom Pilot Study",
                url: "#",
                meta_description: "Research Report",
                excerpt: "Preliminary results from our pilot study on nature-integrated learning in urban public schools show increased student engagement and memory retention.",
                feature_image: "/assets/images/media-1.jpg",
                primary_author: { name: "Nature Classrooms Team" },
                reading_time: "8 min read"
            },
            {
                title: "The Art of Biodiversity",
                url: "#",
                meta_description: "Workshop Highlights",
                excerpt: "Students transformed scientific observations into beautiful charcoal sketches and clay models of local flora and fauna.",
                feature_image: "/assets/images/media-2.jpg",
                primary_author: { name: "Art Education Dept" },
                reading_time: "4 min read"
            },
            {
                title: "Morning Walks in the Forest",
                url: "#",
                meta_description: "Educational Journal",
                excerpt: "Learning to listen to the sounds of the forest and identify different bird calls during our early morning nature trail.",
                feature_image: "/assets/images/media-3.jpg",
                primary_author: { name: "Forest Rangers" },
                reading_time: "3 min read"
            }
        ]
    });
});

// Catch-all for other pages/templates
app.get('/:slug/', (req, res) => {
    const slug = req.params.slug;
    const customPath = path.join(__dirname, `custom-${slug}.hbs`);
    const templatePath = path.join(__dirname, `page-${slug}.hbs`);
    const fallbackPath = path.join(__dirname, `${slug}.hbs`);

    const data = {};

    if (fs.existsSync(customPath)) {
        res.render(`custom-${slug}`, data);
    } else if (fs.existsSync(templatePath)) {
        res.render(`page-${slug}`, data);
    } else if (fs.existsSync(fallbackPath)) {
        res.render(slug, data);
    } else {
        res.status(404).send('<h1>404: Page Not Found</h1><p>The template for this page was not found locally.</p><a href="/">Go Home</a>');
    }
});

app.listen(port, () => {
    console.log('-------------------------------------------');
    console.log(`Nature Classrooms Dev Server`);
    console.log(`Running at: http://localhost:${port}`);
    console.log('-------------------------------------------');
});
