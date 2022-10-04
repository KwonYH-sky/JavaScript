function reduce(func, arr, memo) {
    var len = arr.length;
    i = 0,
        accum = memo;

    for (; i < len; i++) {
        accum = func(accum, arr[i]);
    }
    return accum;
}

var arr = [1, 2, 3, 4];

var sum = function (x, y) {
    return x + y;
};

var multiply = function (x, y) {
    return x * y;
};

console.log(reduce(sum, arr, 0));
console.log(reduce(multiply, arr, 1));

/**
 * 함수형 프로그래밍을 이용하여 코드가 훨씬 간결
 * 기존 프로그래밍 방식보다 높은 단게의 모듈화가 가능
 */