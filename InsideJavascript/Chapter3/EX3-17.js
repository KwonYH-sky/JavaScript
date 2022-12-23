var arr = [0, 1, 2];
console.log(arr.length); // 3

arr.length = 5;
console.log(arr); // [ 0, 1, 2, <2 empty items> ]

arr.length = 2;
console.log(arr); // [ 0. 1 ]
console.log(arr[2]) // undefined

arr.length = 3;
console.log(arr);