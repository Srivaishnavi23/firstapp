const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('My name is ChatGPT!');
  res.end();
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
