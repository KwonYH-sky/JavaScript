/**
 * map() 함수는 주로 배열에 많이 사용되는 함수이다.
 * 배열의 각 요소를 꺼내서 사용자 정의 함수를 적용시켜 새로운 값을 얻은 후,
 * 새로운 배열에 넣는다.
 */

Array.prototype.map = function (callback) {
    /* this가 null인지, 배열인지 체크*/
    /* callback이 함수 인지 체크*/

    var obj = this;
    var value, mapped_value;
    var A = new Array(obj.length);

    for (var i = 0; i < obj.length; i++) {
        value = obj[i];
        mapped_value = callback.call(null, value);
        A[i] = mapped_value;
    }

    return A;
};

var arr = [1, 2, 3];
var new_arr = arr.map(function (value) {
    return value * value;
});

console.log(new_arr);

/**
 * 배열 각 요소의 제곱값을 새로운 요소로 하는 배열을 반환
 * map() 함수를 이용하여 순수 함수를 넣어 실행시킨 뒤 새로운 배열을 반환 할 수 있다.
 */