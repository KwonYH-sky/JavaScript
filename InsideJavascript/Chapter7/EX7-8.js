function calculate(a, b, c) {
    return a * b + c;
}

function curry2(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        var arg_idx = 0;
        for (var i = 0; i < args.length && arg_idx < arguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = arguments[arg_idx++];
            }
        }
        return func.apply(null, args);
    }
}

var new_func = curry2(calculate, 1, undefined, 4);
console.log(new_func(3)); // 7 = 1 x 3 + 4

/**
 * 가운데 인자를 제외한 다른 인자들을 고정시키고 싶을 때 사용하는 커링 함수
 * 하지만, 이 함수를 호출할 땐 원하는 인자를 전부 넣어야한다. 
 * 즉 고정 시키질 않을 인자는 undefined로 넘기면 된다.
 * 
 * 이와 같이 함수를 부준적으로 적용하여 새로운 함수를 반환하는 방식을
 * 함수의 부분 적용(Partially applying function)이라고 한다.
 */