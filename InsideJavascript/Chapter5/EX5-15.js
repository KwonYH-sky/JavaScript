// 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다.
function func() {
    var x = 1;
    return {
        func1: function () { console.log(++x); },
        func2: function () { console.log(-x); }
    };
}
var exam = func();
exam.func1();
exam.func2();
/**
 * 객체에 2개의 함수가 정의 되어 있을 때, 두 함수가 자유변수를 참조하고 있을 경우
 * 호출될 때 마다 자유변수 값이 변화할 수 있음에 주의
 */