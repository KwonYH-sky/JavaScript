
/**
 * 가장 기본적인 기능만을 구현한 코드
 * 
 * 커링과 같이 사용자가 고정시키고자 하는 인자를 bind() 함수를 호출할 때 인자로 넘겨주고
 * 반환벋은 함수를 호출하면서 나머지 인자를 넣어줄 수 있다.
 * Curry()함수와 다른 점은 함수를 호출할 때 this에 바인딩 시킬 객체를 사용자가 넣어줄 수 있다는 점이다.
 */

Function.prototype.bind = function (thisArg) {
    var fn = this,
        slice = Array.prototype.slice;
    args = slice.call(arguments, 1);
    return function () {
        return fn.apply(thisArg, args.concat(slice.call(arguments)));
    };
}

/**
 * ECMAScript 5로 지원하는 Function.prototype.bind 함수는 모질라 개발자 사이드에서 아래와 같이 소개
 * 반환 되는 함수 fBonund는 현재 this에 바인딩된 함수 객체를 상속받는다.
 * 따라서 반환되는 fBound 함수로 new 생성된 객체는 현재 함수의 prototype에 접근가능 
 */

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () { },
            fBonund = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    args.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBonund.prototype = new fNOP();

        return fBonund;
    };
}

/**
 * 위 bind()함수를 활용한 예제
 */

function Person(arg) {
    if (this.name == undefined) {
        this.name = arg ? arg : 'zzoon';
    }
    console.log("Name : " + this.name);
}
Person.prototype.setName = function (value) {
    this.name = value;
};
Person.prototype.getName = function () {
    return this.name;
};

var myobj = { name: "iamhjoo" };
var new_func = Person.bind(myobj);
new_func(); // Name : iamhjoo

var obj = new new_func(); // Name : zzoon
console.log(obj.getName()); // zzoon
