/** 생성자 함수 */
function HelloFunc() {
    this.greeting = "hello";
}
/**
 * 매개함수 null인지 확인하여 this로 func() 호출
 * @param {Function} func 
 */
HelloFunc.prototype.call = function (func) {
    func ? func(this.greeting) : this.func(this.greeting);
}
/**
 * console.log()로 인사 출력
 * @param {String} greeting 
 */
var userFunc = function (greeting) {
    console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call();

/* Description
변수 objHello에 생성돤 HelloFunc 객체 참조 후 
func 프로터티에 userFunc()함수를 담는다.
HelloFunc 프로토타입에 만들어 둔 call() 호출
call() 매개변수가 없으므로 objHello.func()에 greeting을 매개변수로 호출
userFunc(greeting)호출 되어 hello 출력
*/