// 루프 안에서 클로저
/*
function countSeconds(howMany) {
    for (var i = 1; i <= howMany; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}
countSeconds(3);

setTimeout 함수 내부에 있는 익명함수는 자유 변수 i를 참조한다. 하지만 이 함수가 실행 될 때는
이미 countSeconds()함수가 실행이 종료 된 이후고 i값은 이미 4가 된 상태로
이후 실행 시 모두 4를 출력하게 된다.
*/
/*
function countSeconds(howMany) {
    for (var i = 1; i <= howMany; i++) {
        (function (currentI) {
            setTimeout(function () {
                console.log(currentI);
            }, i * 1000);
        }(i));
    }
}
countSeconds(3);


*/

function countSeconds(howMany) {
    for (let i = 1; i <= howMany; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}
countSeconds(3);
