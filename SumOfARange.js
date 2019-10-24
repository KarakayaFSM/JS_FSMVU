"use strict";

function range(start, stop, step = 1) {
  let result = [];

  if (start > stop) {
       for (let i = start; i >= stop; i+=step) {
            result.push(i)
      }
  } else {
      for (let i = start; i <= stop; i+=step) {
      result.push(i)
      }
  }
  return result;
}

function sum (arr) {
    let sum = 0
    for (let i = 0; i<arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));
