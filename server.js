// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);

// Custom route handler for /movies
server.get('/movies', (req, res) => {
  const db = router.db; // lowdb instance
  const movies = db.get('movies').value();

  const generateRandomId = () => Math.random().toString(36).substr(2, 9);

  const moviesWithIds = movies.map(movie => ({
    id: generateRandomId(),
    ...movie
  }));

  res.jsonp(moviesWithIds);
});

// All other routes
server.use(router);

server.listen(port, () => {
  console.log(`✅ JSON Server is running at http://localhost:${port}`);
});
