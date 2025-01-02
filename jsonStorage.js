const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('./Template/index.html','utf-8')

const server = http.createServer((request, response) => {
  // response.end(html);
  // console.log('A new request received');
  let path = request.url;
  if(path === '/' || path.toLocaleLowerCase() ==='/home'){
     response.end(html);
  }
  else if(path.toLocaleLowerCase() === '/about'){
     response.end('you are in about page');
  } else if(path.toLocaleLowerCase() === '/contact'){
    response.end('you are in contact page');
  }
  else{
    response.end('Erro 404: page not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log("Server has started!");
});
