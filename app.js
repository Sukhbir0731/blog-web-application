const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let posts = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now().toString();
    posts.push({ id, title, content, createdAt: new Date() });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        posts[index] = { ...posts[index], title, content };
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog application listening at http://localhost:${port}`);
});