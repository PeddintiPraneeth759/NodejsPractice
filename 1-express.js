// import package

const express = require('express');
let app = express();

app.length('/',(req,res) =>{
  res.status(200).json({message:'hello world', status:200});
    // res.status(200).send(<h1>Hello world</h1>);
})

app.post('/', () =>{

})

app.listen(3000,() =>{
  console.log('server has started..');
})