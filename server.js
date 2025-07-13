// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware to inject random IDs into each movie
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

server.use((req, res, next) => {
  if (req.method === 'GET' && req.url === '/movies') {
    const db = router.db; // lowdb instance
    const movies = db.get('movies').value();

    const moviesWithIds = movies.map(movie => ({
      id: generateRandomId(),
      ...movie
    }));

    res.jsonp(moviesWithIds);
  } else {
    next(); // Let the default router handle everything else
  }
});

server.use('', router);
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});
