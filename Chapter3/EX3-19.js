// colorsArray 배열
var colorsArray = ['orange', 'yellow', 'green'];
console.log(colorsArray[0]); // orange
console.log(colorsArray[1]); // yellow
console.log(colorsArray[2]); // green

// colorsObject 객체
var colorsObject = {
    '0' : 'orange',
    '1' : 'yellow',
    '2' : 'green'
};
console.log(colorsObject[0]); // orange
console.log(colorsObject[1]); // yellow
console.log(colorsObject[2]); // green

// typeof 연산자 비교
console.log(typeof colorsArray); // object ( not Array )
console.log(typeof colorsObject); // object

// length 프로퍼티
console.log(colorsArray.length); // 3
console.log(colorsObject.length); // undefined

// 배열 표준 매서드
colorsArray.push('red'); // [ 'orange', 'yellow', 'green', 'red' ]
colorsObject.push('red'); // Uncaught TypeError: Object #<Object> has no method 'push'
/* TypeError: colorsObject.push is not a function */