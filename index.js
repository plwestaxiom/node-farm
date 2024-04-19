const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { replaceTemplate } = require('./modules/replace-template');




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
const data = fs.readFileSync(path.join(__dirname, 'dev-data', 'data.json'), 'utf-8');
const productDataObj = JSON.parse(data);
const templateOverview = fs.readFileSync(path.join(__dirname, 'templates', 'template-overview.html'), 'utf-8');
const templateProduct = fs.readFileSync(path.join(__dirname, 'templates', 'template-product.html'), 'utf-8');
const templateCard = fs.readFileSync(path.join(__dirname, 'templates', 'template-card.html'), 'utf-8');


const server = http.createServer((req, res) => {

  const { query, pathname } = url.parse(req.url, true);

  switch (req.url) {
    // OVERVIEW PAGE
    case '/':
    case '/overview':
      res.writeHead(200, { 'Content-type': 'text/html' });

      const cardsHtml = productDataObj.map(product => replaceTemplate(templateCard, product)).join('');
      const overviewOutput = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

      res.end(overviewOutput)
      break;

    // PRODUCT PAGE
    case `/product?id=${query.id}`:
      res.writeHead(200, { 'Content-type': 'text/html' });
      const product = productDataObj[query.id];
      const productOutput = replaceTemplate(templateProduct, product);

      res.end(productOutput);
      break;

    // API
    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(data);
      break;

    // DEFAULT NOT FOUND
    default:
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>Page not found!</h1>')
      break;
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server listening on port ${PORT}`)
});



