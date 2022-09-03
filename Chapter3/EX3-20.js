var emptyArray = []; // 배열 리터럴을 통한 빈 배열 생성
var emptyObject = {}; // 객체 리터럴을 통한 빈 객체 생성

console.dir(emptyArray.__proto__); // 배열의 포로토타입(Array.prototype) 출력
console.dir(emptyObject.__proto__); // 객체의 프로토타입(Object.prototype) 출력