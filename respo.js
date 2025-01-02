const http = require('http');
const fs = require('fs');


const html = fs.readFileSync('./Template/index.html','utf-8');
let products = JSON.parse( fs.readFileSync('./Data/Products.json','utf-8'));
let productsListHtml = fs.readFileSync('./Template/produtsList.html','utf-8');

let newDatsArray = products.map((prod)=>{
  let output = productsListHtml.replace('{{%NAME%}}', prod.name);
  output = output.replace('{{%AGE%}}', prod.age);
  output = output.replace('{{%EMAIL%}}', prod.email);
  output = output.replace('{{%ACTIVE%}}', prod.active ? 'Yes' : 'No');
  return output;

});


const server = http.createServer((request, response) => {
  // response.end(html);
  // console.log('A new request received');

  let path = request.url;
  if(path === '/' || path.toLocaleLowerCase() ==='/home'){
    response.writeHead(200,{
      'Content-Type':'text/html',
      'my-header':'hello , world'
    });
    response.end(html);
  }
  else if(path.toLocaleLowerCase() === '/about'){
     response.end('you are in about page');
  } else if(path.toLocaleLowerCase() === '/contact'){
    response.end('you are in contact page');
  }
  else if(path.toLocaleLowerCase() === '/product'){
    response.writeHead(200,{
      'Content-Type':'text/html'
    });
       const productHtml = newDatsArray.join('');
    response.end(productHtml);
    console.log(productHtml);
  
  }
  else{
    response.end('Erro 404: page not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log("Server has started!");
});
