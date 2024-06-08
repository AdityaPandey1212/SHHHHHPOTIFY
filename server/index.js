const express = require('express');
const cors = require('cors');
const app = express();
const Scraper = require('youtube-search-scraper').default;
const youtube = new Scraper();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON

async function search(query) {
    const results = await youtube.search(query);
    return results.videos[0];
}

// This is an API
app.get('/search', (req, res) => {
    const query = req.query.q;
    search(query).then((video) => {
        res.json(video);
    });
});

app.listen(3000, () => {
    console.log('server started');
});

