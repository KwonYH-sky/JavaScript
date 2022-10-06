var cacher = function (cache, func) {
    var calculate = function (n) {
        if (typeof (cache[n]) === 'number') {
            result = cache[n]
        } else {
            result = cache[n] = func(calculate, n);
        }

        return result;
    }
    return calculate;
};

/**
 * cacher 함수는 사용자 정의 함수와 초기 cache 값을 받아 연산을 수행
 * 인자로 피보나치 수열을 연산하는 함수나 팩토리얼을 연산하는 함수를 정의하여 사용할 수 있다.
 */