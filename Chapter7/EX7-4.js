var fibo = function () {
    var cache = { '0': 0, '1': 1 };

    var func = function (n) {
        if (typeof (cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n - 1) + func(n - 2);
        }
        return result;
    }
    return func;
}();

console.log(fibo(10));

/**
 * 함수형 프로그래밍을 구현한 피보나치 수열
 * 재귀형 팩토리얼과 비슷하게 클로저를 이용하여 cache를 활용한다.
 */