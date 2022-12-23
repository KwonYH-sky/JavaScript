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

Function.prototype.memoization = function (key) {
    var arg = Array.prototype.slice.call(arguments, 1);
    this.data = this.data || {};
    return this.data[key] !== undefined ?
        this.data[key] : this.data[key] = this.apply(this, arg);
};

function myCalculate1(input) {
    return input * input;
}

function myCalculate2(input) {
    return input * input / 4;
}

myCalculate1.memoization(1, 5);
myCalculate1.memoization(2, 4);
myCalculate2.memoization(1, 6);
myCalculate2.memoization(2, 7);

console.log(myCalculate1.memoization(1)); // equal to console.log(myCalculate1.data[1]);
console.log(myCalculate1.memoization(2)); // equal to console.log(myCalculate1.data[2]);
console.log(myCalculate2.memoization(2)); // equal to console.log(myCalculate2.data[1]);
console.log(myCalculate2.memoization(1)); // equal to console.log(myCalculate2.data[2]);

/**
 * Function.prototype에 메서드를 정의해 놓으면 특정 값을 리턴하는 모든 함수에서 유용
 * 주의할 점은 한 번 값이 들어간 경우 계속 유지되므로 이를 초기화하는 방법 제공되어야 함
 */