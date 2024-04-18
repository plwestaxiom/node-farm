const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');




// const inputFilePath = path.join(__dirname, 'txt', 'input.txt')

// // blocking code
// try {
//   const data = fs.readFileSync(inputFilePath, 'utf8');
//   console.log(data);
// } catch (err) {
//   console.log(err);
// }
// // non-blocking code
// fs.readFile(inputFilePath, 'utf8', (err, data) => {
//   console.log(data);
// });
// console.log('Reading File...')

/////////////////////////////////
// SERVER

const PORT = 3500;

const server = http.createServer((req, res) => {
  console.log(req.url);

  switch (req.url) {
    case '/':
    case '/overview':
      res.end("This is the OVERVIEW")
      break;
    default:
      res.writeHead(404, {
        'Content-type': 'text/html'
      });
      res.end('<h1>Page not found!</h1>')
      break;
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server listening on port ${PORT}`)
});



