var test = "This is test";
console.log(window.test);

// sayFoo() 함수
var sayFoo = function () {
  console.log(this.test); // sayFoo() 함수 호출시 this는 전역 객체에 바인딩
};

sayFoo();
