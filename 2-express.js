// import package
const fs = require('fs');
const express = require('express');
let app = express();
let movies = JSON.parse(fs.readFilesync('./data/movies/json'))
 app.use(express.json())
app.get('/api/v1/movies',(req,res) =>{
  res.status(200).json({
    status:"sucess",
    count:movies.length,
    data:{
      movies:movies
    }
  });
    // res.status(200).send(<h1>Hello world</h1>);
})

app.post('/api/v1/movies', (req,res) =>{
 const newId = movies[movies.length -1].id +1;

 const newMovie = Object.assign({id:newId},req.body)
 movies.push(newMovie);

 fs.writeFile('./data/movies.json',JSON.stringify(movies),(err) =>{
  res.status(201).json({
    status:"success",
    data:{
      movie:newMovie
    }
  })
 })
})

app.listen(3000,() =>{
  console.log('server has started..');
})