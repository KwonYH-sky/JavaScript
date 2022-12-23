var f1 = function (input) {
    var result;
    /* 암호화 작업 수행*/
    result = 1;
    return result;
};

var f2 = function (input) {
    var result;
    /* 암호화 작업 수행*/
    result = 2;
    return result;
};


var f3 = function (input) {
    var result;
    /* 암호화 작업 수행*/
    result = 3;
    return result;
};

var get_encrypted = function (func) {
    var str = 'zzoon';

    return function () {
        return func.call(null, str);
    }
};

var encrypyed_value = get_encrypted(f1)();
console.log(encrypyed_value);
var encrypyed_value = get_encrypted(f2)();
console.log(encrypyed_value);
var encrypyed_value = get_encrypted(f3)();
console.log(encrypyed_value);

/**
 * 자바스트립트에서도 일급객체로서의 함수 및 클로저를 지원하기에 함수프로그래밍이 가능하다.
 * 위와 같은 함수형 프로그래밍 슈도(pseudo)코드를 구현 할 수 있다.
 * 함수의 인수로 함수로 넘기고, 함수를 반환할 수도 있다. 
 * 변수 갓이 영향 받지 않게 하려고 클로저 사용
 * 
 * f1, f2, f3는 외부에 아무런 영향을 미치지 않는 함수로 순수 함수(Pure function)이라 함
 * get_encrypted 함수는 인자로 함수를 받고 결과값을 또 다른 형태의 함수로 반환값으로 사용하는 함수를 고계 함수(Higher-oder function)라고 함.
 */