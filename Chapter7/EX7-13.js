/**
 * reduce()는 배열의 각 요소를 하나씩 꺼내서 사용자의 함수를 적용시킨 뒤,
 * 그 값을 계속 누적시키는 함수
 */
Array.prototype.reduce = function (callback, memo) {
    /* this가 null인지, 배열인지 체크*/
    /* callback이 함수 인지 체크*/

    var obj = this;
    var value, accumulated_value = 0;

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        accumulated_value = callback.call(null, accumulated_value, value);
    }

    return accumulated_value;
};

var arr = [1, 2, 3];
var accumulated_val = arr.reduce(function (a, b) {
    return a + b * b;
});

console.log(accumulated_val); // 1 x 1 + 2 x 2 + 3 x 3 = 14
/**
 * 배열의 각 요소를 순차적으로 제곱한 값을 더해서 누적된 값을 반환
 * 각 요소를 사용자가 원하는 특정 연산으로 누적된 값을 반환받고자 할 때 유용
 */

