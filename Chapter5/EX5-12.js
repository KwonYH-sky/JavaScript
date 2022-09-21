/**
 * 익명함수를 즉시 실행시켜 반환되는 함수를 할당시켜
 * 그 함수에 스코프에 배열 buffAr을 담음
 */
var getCompletedStr = function () {
    var buffAr = [
        'I am ',
        '',
        '. I live in ',
        '',
        '. I\'am ',
        '',
        ' years old.'
    ];
    /**
     * 클로저
     * 스코프에 배열 buffAr을 참조하고 있음
     */
    return function (name, city, age) {
        buffAr[1] = name;
        buffAr[3] = city;
        buffAr[5] = age;

        return buffAr.join('');
    };
}();

var str = getCompletedStr('zzoon', 'seoul', 16);
console.log(str);