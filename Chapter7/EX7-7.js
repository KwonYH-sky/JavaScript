function calculate(a, b, c) {
    return a * b + c;
}

function curry(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

var new_func1 = curry(calculate, 1);
console.log(new_func1(2, 3)); // 1 x 2 + 3 = 5
var new_func2 = curry(calculate, 1, 3);
console.log(new_func2(3)); // 1 x 3 + 3 = 6

/**
 * 커링(Curry)
 * 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 
 * 나머지를 인자로 받는 새로운 함수를 만드는 것을 의미
 * 
 * curry() 함수로 넘어온 인자를 args에 담아 놓고, 
 * 새로운 함수 호출로 넘어온 인자와 합쳐서 함수를 적용한다.
 */


/**
 * 커링
 * @param   고정시킬인자
 * @returns 인자를 고정 시킨 후 나온 함수
 */
Function.prototype.curry = function () {
    var fn = this,
        args = Array.prototype.slice.call(arguments);
    return function () {
        return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
};

/**
 * 커링은 함수형 프로그래밍 언어에서 기본적으로 지원하는데, 
 * 자바스트립트에서는 기본으로 제공하지 않음
 * 다음과 같이 Function.prototype에 커링 함수를 정의하여 사용
 */