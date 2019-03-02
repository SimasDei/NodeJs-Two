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

  /**
   * @route -  Products, product Overview
   */
  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      'utf-8',
      (err, data) => {
        let overviewOutput = data;
        fs.readFile(
          `${__dirname}/templates/template-card.html`,
          'utf-8',
          (err, data) => {
            const cardsOutput = laptopData
              .map(el => replaceTemplate(data, el))
              .join('');

            overviewOutput = overviewOutput.replace(/{%CARDS%}/g, cardsOutput);
            res.end(overviewOutput);
          }
        );
      }
    );

    /**
     * @route - Laptop, laptop by Id
     */
  } else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      'utf-8',
      (err, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        res.end(output);
      }
    );

    /**
     * @route - Images route
     */
  } else if (/\.(jpg|jpeg|png|gif)$/i.test(pathName)) {
    fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(data);
    });

    /**
     * @route - 404, not found
     */
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('Wrong turn, my dude');
  }
});

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening on port 1337');
});

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCT_NAME%}/g, laptop.productName);
  output = output.replace(/{%ID%}/g, laptop.id);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.productName);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  return output;
}
