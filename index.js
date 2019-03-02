// Import Node File System Module
const fs = require('fs');
// Import Server Module
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const id = parsedUrl.query.id;
  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end('Products Path');
  } else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(`Laptop Path, Laptop id: ${id} `);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('Wrong turn, my dude');
  }
});

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening on port 1337');
});
