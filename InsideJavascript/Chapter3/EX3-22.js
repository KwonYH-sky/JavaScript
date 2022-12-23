var arr = ['zero', 'one', 'two', 'three'];
delete arr[2];
console.log(arr); // [ 'zero', 'one', <1 empty item>, 'three' ]
console.log(arr.length); // 4

arr.splice(2,1);
console.log(arr); // [ 'zero', 'one', 'three' ]
console.log(arr.length); // 3
