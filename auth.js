const polka = require('polka');

const router = polka()

module.exports = router
  .get('/login', (req, res) => {
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    console.log("req.query", req.query);
    console.log("req.search", req.search);
    res.send("Hello from auth login demo");
  })
  .post('/login', (req, res) => {
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    console.log("req.query", req.query);
    console.log("req.search", req.search);
    res.send([`Sub: Howdy from ${req.method} ${req.url}`]);
  })
  .put('/:id', (req, res) => {
    res.statusCode = 201; // why not?
    res.end(`Sub: Updated user via ${req.method} ${req.url}`);
  });