var arrA = [1, 2, 3];
var arrB = arrA.slice(0); // [1, 2, 3]
var arrC = arrA.slice(); // [1, 2, 3]
var arrD = arrA.slice(1); // [2, 3]
var arrE = arrA.slice(1, 2); // [2]

console.log(arrB);
console.log(arrC);
console.log(arrD);
console.log(arrE);