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

/**
 * 
 * @param {HelloFunc} obj 
 * @param {String} methodName 
 * @param {String} name 
 * @returns 
 */
function saySomething(obj, methodName, name) {
    return (function (greeting) {
        return obj[methodName](greeting, name);
    });
}
/**
 * obj.func애 saSomething() 추가
 * @param {HelloFunc} obj 
 * @param {String} name 
 * @returns 
 */
function newObj(obj, name) {
    obj.func = saySomething(this, "who", name);
    return obj;
}

newObj.prototype.who = function (greeting, name) {
    console.log(greeting + " " + (name || "everyone"));
}

var obj1 = new newObj(objHello, "zzoon");
obj1.call();
/*
obj1에 objHello와 이름 "zzoon"을 인자로 벋어 
func에 saySomething에 newObj객체와 함께 인자로 넘긴 후 반환
saySomething()이 받은 인자로 func에는 실질적으로 반환값인 function(greeting){}가 참조
obj1.call()시 newObj.prototype.who()를 호출
function(greeting)이 클로저 saSomething의 매개변수들이 자유변수가 된다.
*/