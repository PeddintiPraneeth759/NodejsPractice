const http = require('http');
const fs = require('fs');
const url = require('url');

// const user = require('./modules/user');

// Load files
// const html = fs.readFileSync('./Template/index.html', 'utf-8');
// let products = JSON.parse(fs.readFileSync('./Data/Products.json', 'utf-8'));
// let productsListHtml = fs.readFileSync('./Template/produtsList.html', 'utf-8');
// let productDetailshtml = fs.readFileSync('./Template/productdetails.html', 'utf-8');
// Generate HTML for the product list


// function replaceHtml(template,prod){
//     let output = template.replace('{{%NAME%}}', prod.name);
//   output = output.replace('{{%AGE%}}', prod.age);
//   output = output.replace('{{%EMAIL%}}', prod.email);
//   output = output.replace('{{%ACTIVE%}}', prod.active ? 'Yes' : 'No');
//   output = output.replace('{{%ID%}}', prod.id);
//   return output;
// }

const server = http.createServer();

//  server.on('request',(request, response) => {
//   // Parse URL
//   let { query, pathname } = url.parse(request.url, true);

//   if (pathname === '/' || pathname.toLowerCase() === '/home') {
//     // Home route
//     response.writeHead(200, {
//       'Content-Type': 'text/html',
//       'my-header': 'hello, world',
//     });
//     response.end(html);
//   } else if (pathname.toLowerCase() === '/about') {
//     // About route
//     response.end('You are on the about page');
//   } else if (pathname.toLowerCase() === '/contact') {
//     // Contact route
//     response.end('You are on the contact page');
//   } else if (pathname.toLowerCase() === '/product') {
//     // Product route
//     response.writeHead(200, {
//       'Content-Type': 'text/html',
//     });

//     if (!query.id) {
//       // No query parameter, show all products
//       let producthtmlArray = products.map((prodc) =>{
//        return replaceHtml(productsListHtml,prodc);
//       });
//       let productHtml = producthtmlArray.join('');
//       response.end(productHtml);
//     } else {
//       // If there's a query parameter, show a specific product by ID
//       let prod = products[query.id];
//       let productDetailsPesponceHtml = replaceHtml(productDetailshtml,prod);
//       response.end(productDetailsPesponceHtml);
//     }
//   } else {
//     // Handle 404 error
//     response.writeHead(404, {
//       'Content-Type': 'text/plain',
//     });
//     response.end('Error 404: page not found');
//   }
// });

server.listen(8001, '127.0.0.1', () => {
  console.log("Server has started!");
});

// let myEmitter = new user();


// myEmitter.on('userCreated',(id,name) =>{
//   console.log(`A new user ${name} with ID ${id} is created`)
// })

// myEmitter.on('userCreated',(id,name) =>{
//   console.log(`A new user ${name} with ID ${id} is added to database`)
// })

// myEmitter.emit('userCreated',101,'Praneeth');


//Soulution 1: without readable or writable stream

// server.on('request',(req,res)=>{
//   fs.readFile('./Files/LargeFile.txt',(err,data)=>{
//     if(err){
//       res.end('something went wrong');
//       return;
//     }
//     res.end(data);
//   })
// })

//SOLUTION:2 using readable & writable Stream
//by using this res.end() inside of rs.on if there is some more chunk left to write
// but due to the res.end() the write chunk is stoped..
// server.on('request',(req,res)=>{
//  let rs =fs.createReadStream('./Files/LargeFile.txt');

//  rs.on('data',(chunk) =>{
//   res.write(chunk);
//   res.end();
//  })

//  rs.on('error',(error) =>{
//    res.end(error.message);
//  })
//   })

// by using this if there is any chuck left it also reads that chunk
// until all the chunks are finished ..
// server.on('request',(req,res)=>{
//  let rs =fs.createReadStream('./Files/LargeFile.txt');

//  rs.on('data',(chunk) =>{
//   res.write(chunk);
  
//  })

//  rs.on('end', () =>{
//   res.end();
//  })

//  rs.on('error',(error) =>{
//    res.end(error.message);
//  })
//   })

// if the readable stream is quite faster and writable stream is quite slower
// then we should use pipe due to (backpressure)

//SOLUTION:3 USING PIPE METHOD

server.on('request', (req, res) => {
  let rs = fs.createReadStream('./Files/LargeFile.txt');
  rs.pipe(res); // Pipe the readable stream to the response
});


console.log('node mon is working');