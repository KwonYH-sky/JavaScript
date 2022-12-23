// add() 함수
function add(a, b) {
  // arguments 객체 출력
  console.dir(arguments);
  return a + b;
}

console.log(add(1));
console.log(add(1, 2));
console.log(add(1, 2, 3));