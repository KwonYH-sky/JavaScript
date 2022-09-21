function outerFunc(argNum) {
    var num = argNum;
    return function (x) {
        num += x;
        console.log("num : " + num);
    }
}
var exam = outerFunc(40);
exam(5);
exam(-10);
/**
 * 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의
 * exam에 담긴 클로저로 바깥에 있는 자유변수 num의 값이 변함
 */