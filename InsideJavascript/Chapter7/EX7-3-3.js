var fact = function () {
    var cache = { '0': 1 };
    var func = function (n) {
        var result = 0;

        if (typeof (cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = n * func(n - 1);
        }
        return result;
    }

    return func;
}();

console.log(fact(10));
console.log(fact(20));

/**
 * 클로저로 숨겨지는 cache에는 팩토리얼 연산한 값을 저장하고 있다.
 * 연산을 수행하는 과정에서 캐시에 저장된 값이 있으면 곧바로 그 값을 반환하는 방식이다.
 * 이렇게 하면 한 번 연산된 값을 캐시에 저장하고 있으면, 중복된 연산을 피하게 된다.
 * 
 * 메모이제이션(memoization) 패턴이라고 함
 */