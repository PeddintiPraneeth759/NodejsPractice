const http = require('http');
const fs = require('fs');
const url = require('url');

// Load files
const html = fs.readFileSync('./Template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/Products.json', 'utf-8'));
let productsListHtml = fs.readFileSync('./Template/produtsList.html', 'utf-8');
let productDetailshtml = fs.readFileSync('./Template/productdetails.html', 'utf-8');
// Generate HTML for the product list


function replaceHtml(template,prod){
    let output = template.replace('{{%NAME%}}', prod.name);
  output = output.replace('{{%AGE%}}', prod.age);
  output = output.replace('{{%EMAIL%}}', prod.email);
  output = output.replace('{{%ACTIVE%}}', prod.active ? 'Yes' : 'No');
  output = output.replace('{{%ID%}}', prod.id);
  return output;
}


const server = http.createServer((request, response) => {
  // Parse URL
  let { query, pathname } = url.parse(request.url, true);

  if (pathname === '/' || pathname.toLowerCase() === '/home') {
    // Home route
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'my-header': 'hello, world',
    });
    response.end(html);
  } else if (pathname.toLowerCase() === '/about') {
    // About route
    response.end('You are on the about page');
  } else if (pathname.toLowerCase() === '/contact') {
    // Contact route
    response.end('You are on the contact page');
  } else if (pathname.toLowerCase() === '/product') {
    // Product route
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });

    if (!query.id) {
      // No query parameter, show all products
      let producthtmlArray = products.map((prodc) =>{
       return replaceHtml(productsListHtml,prodc);
      });
      let productHtml = producthtmlArray.join('');
      response.end(productHtml);
    } else {
      // If there's a query parameter, show a specific product by ID
      let prod = products[query.id];
      let productDetailsPesponceHtml = replaceHtml(productDetailshtml,prod);
      response.end(productDetailsPesponceHtml);
    }
  } else {
    // Handle 404 error
    response.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    response.end('Error 404: page not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log("Server has started!");
});
