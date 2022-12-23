/**
* each() 함수는 배열의 각 요소 혹은 객체의 가 프로퍼티를 
* 하나씩 꺼내서 차례대로 특정 함수에 인자로 넣어 실행시키는 역할
보통 each 혹은 forEach라는 이름으로 제공
아래 함수는 jQuery 1.0의 each() 함수
*/
function each(obj, fn, args) {
    if (obj.lenth == undefined) {
        for (var i in obj) {
            fn.apply(obj[i], args || [i, obj[i]]);
        }
    } else {
        for (var i = 0; i < obj.lenth; i++) {
            fn.apply(obj[i], args || [i, obj[i]]);
        }
    }
    return obj;
};

each([1, 2, 3], function (idx, num) {
    console.log(idx + ": " + num);
});

var zzoon = {
    name: "zzoon",
    aeg: 30,
    sex: "Male"
};

each(zzoon, function (idx, value) {
    console.log(idx + ": " + value);
});

/**
 * lenth가 있는 경우(보통 배열)와 없는 경우(보통 객체)로 나누어 루프를 돌며
 * 각 요소를 인자로 함수를 호출한다.
 */