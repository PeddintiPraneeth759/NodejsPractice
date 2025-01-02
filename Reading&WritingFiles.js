const readLine = require('readline');
const fs = require('fs');


fs.readFile('./Files/start.txt','utf-8',(err,data)=>{
  console.log(data); 
  fs.readFile(`./Files/${data}.txt`,'utf-8',(err1,data1)=>{
      console.log(data1);
      fs.readFile(`./Files/append.txt`,'utf-8',(err3,data3)=>{
        console.log(data3);
          fs.writeFile('./Files/output.txt',`${data1} \n\n${data3}\nDate Created${new Date()}`,()=>{
             console.log("file written successfully");
          });
      })
  })
})
console.log("reading file...");