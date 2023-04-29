const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    let messages = fs.readFileSync('message.txt').toString().split('\n');
    messages = messages.filter(message => message !== ''); // filter out any empty lines
    console.log('Messages:', messages); // debug statement
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body>');
    res.write('<ul>');
    for (const message of messages) {
      res.write(`<li>${message}</li>`);
    }
    res.write('</ul>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log('New message:', message); // debug statement
      fs.appendFileSync('message.txt', message + '\n');
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);


