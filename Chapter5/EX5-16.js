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
이미 countSeconds()함수가 실행이 종료 되어 for문 루프가 끝난 이후고 i값은 이미 4가 된 상태로
이후 실행 시 모두 4를 출력하게 된다.
*/


function countSeconds1(howMany) {
    for (var i = 1; i <= howMany; i++) {
        (function (currentI) {
            setTimeout(function () {
                console.log(currentI);
            }, i * 1000);
        }(i));
    }
}
countSeconds1(3);

/*
for 루프를 돌때마다 I를 복사해 즉시 실핼 함수를 실행시켜서 
1 2 3 와 같은 출력값이 나오게 한다.
*/


function countSeconds2(howMany) {
    for (let i = 1; i <= howMany; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}
countSeconds2(3);

/*
var 대신 let를 사용하여 변수가 function scope 대신 block scope를 갖게 하여 
매 for 루프 돌때마다 스코프를 참조하여 출력하게 된다. 
*/