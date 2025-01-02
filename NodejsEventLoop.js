// //Event loop practice
// console.log('program has started');

// //Stroed in - 1st phase
// setTimeout(() => {
//   console.log("Timer callback executed");
// }, 1000);

// //Stroed in 3rd phase
// setImmediate(()=>{
//   console.log('set immediate callback executed');
// });

// console.log('program has completed');




//Event loop practice
console.log('program has started');

//Stroed in - 1st phase


fs.readFile('./Files/input.txt',() => {
  console.log('file read finished');

  setTimeout(() => {
  console.log("Timer callback executed");
}, 0);

  setImmediate(()=>{
  console.log('set immediate callback executed');

  process.nextTick(() =>{
    console.log('process.nextTick callback executed');
  })
});
})

//Stroed in 3rd phase


console.log('program has completed');