const express = require('express');
const exphbs = require('express-hbs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure express-hbs to support Ghost-style template inheritance {{!< default}}
app.engine('hbs', exphbs.express4({
    partialsDir: [
        path.join(__dirname, 'partials'),
        path.join(__dirname, 'partials/icons')
    ],
    defaultLayout: path.join(__dirname, 'default.hbs'),
    layoutsDir: __dirname
}));
app.set('view engine', 'hbs');
app.set('views', __dirname);

// Mock Ghost helpers
exphbs.registerHelper('asset', function (context) {
    // Remove leading slash if present to avoid // in URL
    const cleanPath = context.startsWith('/') ? context.substring(1) : context;
    return '/assets/' + cleanPath;
});

exphbs.registerHelper('ghost_head', function () {
    return '';
});

exphbs.registerHelper('ghost_foot', function () {
    return '';
});

exphbs.registerHelper('body_class', function () {
    return 'page-template';
});

exphbs.registerHelper('meta_title', function () {
    return 'Nature Classrooms';
});

exphbs.registerHelper('post', function (options) {
    return options.fn(this);
});

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

// Catch-all for other pages/templates
app.get('/:slug/', (req, res) => {
    const slug = req.params.slug;
    const customPath = path.join(__dirname, `custom-${slug}.hbs`);
    const templatePath = path.join(__dirname, `page-${slug}.hbs`);
    const fallbackPath = path.join(__dirname, `${slug}.hbs`);

    if (fs.existsSync(customPath)) {
        res.render(`custom-${slug}`);
    } else if (fs.existsSync(templatePath)) {
        res.render(`page-${slug}`);
    } else if (fs.existsSync(fallbackPath)) {
        res.render(slug);
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
