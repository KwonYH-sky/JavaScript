function Calculate(key, input, func) {
    Calculate.data = Calculate.data || {};

    if (!Calculate.data[key]) {
        var result;
        result = func(input);
        Calculate.data[key] = result;
    }

    return Calculate.data[key];
}

var result = Calculate(1, 5, function (input) {
    return input * input;
});

console.log(result);

result = Calculate(2, 5, function (input) {
    return input * input / 4;
});

console.log(result);

console.log(Calculate(1));
console.log(Calculate(2));

/**
 * 메모이제이션(Memoization) 페턴
 * 계산 결과를 저장해 놓아 이후 다시 계산할 필요 없이 사용할 수 있게 한다는 컴퓨팅 용어
 */