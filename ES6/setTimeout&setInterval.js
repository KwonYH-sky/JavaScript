/** setTimeout과 setInterval을 이용한 호출 스케줄링
 * 일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것을 '호출 스케줄링(scheduling a call)'이라고 한다.
 * 함수 스케줄링을 구현하는 방법은 두 가지가 있다.
     * setTimeout을 이용해 일정 시간이 지난 후에 함수를 실행하는 방법
     * setInterval을 이용해 일정 시간 간격을 두고 함수를 실행하는 방법
 * 자바스크립트 명세서엔 setTimeout과 setInterval가 명시되어있지 않다. 
 * 하지만 시중에 나와 있는 모든 브라우저, Node.js를 포함한 자바스크립트 호스트 환경 대부분이 이와 유사한 메서드와 내부 스케줄러를 지원한다.
 */

/** setTimeout
 * 문법:

    let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)

 * 매개변수:
    * func|code
        실행하고자 하는 코드로, 함수 또는 문자열 형태이다. 대개는 이 자리에 함수가 들어간다.
        하위 호환성을 위해 문자열도 받을수 있게 해놓았지만, 추천하지 않는다. 
    * delay
        실행 전 대기 시간으로, 단위는 밀리초(millisecond, 1000밀리초=1초)이며 기본값은 0이다.
    * arg1, arg2
        함수에 전달할 인수들로, IE9 이하에선 지원하지 않는다.
 * 
 * 예시를 통해 setTimeout을 어떻게 쓸 수 있는지 알아보자.
 * 아래 코드를 실행하면 1초 후에 sayHi()가 호출된다.
 */
function sayHi() {
    alert('안녕하세요.');
}

setTimeout(sayHi, 1000);

/* 아래와 같이 함수에 인수를 넘겨줄 수도 있다. */
function sayHi(who, phrase) {
    alert(who + ' 님, ' + phrase);
}

setTimeout(sayHi, 1000, "홍길동", "안녕하세요."); // 홍길동 님, 안녕하세요.

/* setTimeout의 첫 번째 인수가 문자열이면 자바스크립트는 이 문자열을 이용해 함수를 만든다.
   아래 예시가 정상적으로 작동하는 이유다.
*/

setTimeout("alert('안녕하세요')", 1000);

/* 그런데 이렇게 문자열을 사용하는 방법은 추천하지 않는다. 되도록 다음 예시와 같이 익명 화살표 함수를 사용하자 */

setTimeout(() => alert('안녕하세요.'), 1000);

/** 함수를 실행하지 말고 넘기자.
 * 초보 개발자는 setTimeout에 함수를 넘길 때, 함수 뒤에 ()을 붙이는 실수를 하곤 한다.

    // 잘못된 코드
    setTimeout(sayHi(), 1000);

 * setTimeout은 함수의 참조 값을 받도록 정의되어 있는데 sayHi()를 인수로 전달하면 함수 실행 결과가 전달되어 버린다.
 * 그런데 sayHi()엔 반환문이 없다. 호출 결과는 undefined가 된다.
 * 따라서 setTimeout은 스케줄링할 대상을 찾지 못해, 원하는 대로 코드가 작동하지 않는다.
 */

/** clearTimeout으로 스케줄링 취소하기
 * setTimeout을 호출하면 '타이머 식별자(timer identifier)'가 반환된다.
 * 스케줄링을 취소하고 싶을 땐 이 식별자(아래 예시에서 timerId)를 사용하면 된다.
 * 
 * 스케줄링 취소하기:

    let timerId = setTimeout(...);
    clearTimeout(timerId);

 * 아래 예시는 함수 실행을 계획해 놓았다가 중간에 마음이 바뀌어 계획해 놓았던 것을 취소한 상황을 코드로 표현한 것이다.
 * 예시를 실행해도 스케줄링이 취소되었기 때문에 아무런 변화가 없는 것을 확인 할 수 있다.
 */

let timerId = setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 1000);
alert(timerId); // 타이머 식별자

clearTimeout(timerId);
alert(timerId); // 위 타이머 식별자와 동일함 (취소 후에도 식별자의 값은 null이 되지 않는다.)

/* 예시를 실행하면 alter 창이 2개가 뜨는데,
   이 얼럿 창을 통해 브라우저 환경에선 타이머 식별자가 숫자라는 걸 알 수 있다.
   다른 호스트 환경에선 타이머 식별자가 숫자형 이외의 자료형일 수 있다.
   참고로 Node.js에서 setTimeout을 실행하면 타이머 객체가 반환한다.

   다시 언급하자면, 스케줄링에 관한 명세는 따로 존재하지 않는다.
   명세가 없기 때문에 호스트 환경마다 약간의 차이가 있을 수 밖에 없다.

   참고로 브라우저는 HTML5의 timers section을 준수하고 있다.
*/

/////////////////////////////////////////////////////////////////

/** setInterval
 * setInterval 메서드는 setTimeout과 동일한 문법을 사용한다.

    let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)

 * 인수 역시 동일하다. 다만, setTimeout이 함수를 단 한 번만 실행하는 것과 달리 setInterval은 함수를 주기적으로 실행하게 만든다.
 * 함수 호출을 중단하려면 clearInterval(timerId)을 사용하면 된다.
 * 다음 예시를 실행하면 메시지가 2초 간격으로 보이다가 5초 이후에는 더 이상 메시지가 보이지 않는다.
 */

// 2초 간격으로 메시지를 보여줌
timerId = setInterval(() => alert('째각'), 2000);

// 5초 후에 정지
setTimeout(() => {
    clearInterval(timerId);
    alert('정지');
}, 5000);

/** alert 창이 떠 있더라도 타이머는 멈추지 않는다.
 * Chrome과 Firefox를 포함한 대부분의 브라우저는 alert/confirm/prompt 창이 떠 있어 동안에도 내부 타이머를 멈추지 않는다.
 * 위 예시를 실행하고 첫 번째 alert 창이 떴을 때 몇 초간 기다렸다가 창을 닫으면, 두 번째 alert창이 바로 나타나는 것을 보고 이를 확인 할 수 있다.
 * 이런 이유로 얼럿 창은 명시한 지연 시간인 2초보다 더 짧은 간격으로 뜨게 됩니다.
 */

////////////////////////////////////////////////

/** 중첩 setTimeout
 * 무언가를 일정 간격을 두고 실행하는 방법에는 크게 2가지가 있다.
 * 하나는 setInterval을 이용하는 방법이고, 다른 하나는 아래 예시와 같이 중첩 setTimeout을 이용하는 방법이다.
 */

/** setInterval을 이용하지 않고 아래와 같이 중첩 setTimeout을 사용함
let timerId = setInterval(()=> alert('째각'), 2000);
 */

timerId = setTimeout(function tick() {
    alert('째각');
    timerId = setTimeout(tick, 2000); // (*)
}, 2000);

/* setTimeout은 (*)로 표시한 줄의 실행이 종료되면 다음 호출을 스케줄링한다.
   중첩 setTimeout을 이용하는 방법은 setInterval을 사용하는 방법보다 유연하다.
   호출의 결과에 따라 다음 호출을 원하는 방식으로 조정해 스케줄링할 수 있기 때문이다.

   5초 간격으로 서버에 요청을 보내 데이터를 얻는다고 가정해보자
   서버가 과부하 상태라면 요청 간격을 10초, 20초, 40초 등으로 증가시켜주는 것이 좋을 것이다.
   아래는 이를 구현한 코드 이다.
*/

let delay = 5000;

let timerID = setTimeout(function request() {
    // ...요청 보내기...

    if (/* 서버과부하로 인한 요청 실패 */ !성공) {
        // 요청 간격을 늘린다.
        delay *= 2;
    }
    timerID = setTimeout(request, delay);
}, delay);

/* CPU 소모가 많은 작업을 주기적으로 실행하는 경우에도 setTimeout을 재귀 실행하는 방법이 유용하다.
   작업이 걸리는 시간에 따라 다음 작업을 유동적으로 계획할 수 있기 때문이다.
   중첩 `setTimeout`을 이용하는 방법은 지연 간격을 보장하지만, `setInterval`은 이를 보장하지 않는다.

   아래 두 예시를 비교해보자 */

let i = 1;
setInterval(function () {
    func(i++);
}, 100);

let j = 1;

setTimeout(function () {
    func(j++);
    setTimeout(run, 100);
}, 100);

/*
첫 번째 예시에선, 내부 스케줄러가 func(i++)를 100밀리초마다 실행한다.
setInterval을 사용하면 func 호출 사이의 지연 간격이 실제 명시한 간격(100ms)보다 짧아진다!
이는 func을 실행하는 데 '소모되는' 시간도 지연 간격에 포함시키기 때문이다. 지극히 정상적인 동작이다.
그렇다면 func을 실행하는 데 걸리는 시간이 명시한 지연 간격보다 길 때 어떤 일이 발생할까?
이런 경우는 엔진이 func의 실행이 종료될 때까지 기다려준다. func의 실행이 종료되면 엔진은 스케줄러를 확인하고,
지연 시간이 지났으면 다음 호출을 바로 시작한다.
따라서 함수 호출에 걸리는 시간이 매번 delay 밀리초보다 길면, 모든 함수가 쉼 없이 계속 연속 호출된다.

한편, 중첩 setTimeout을 이용하면 func의 함수 실행이 종료 후 지연이 시작된다.
중첩 setTimeout을 사용하면 명시한 지연(여기서는 100ms)이 보장된다.
이렇게 지연 간격이 보장되는 이유는 이전 함수의 실행이 종료된 이후에 다음 함수 호출에 대한 계획이 세워지기 때문이다.
*/

/** 가비지 컬렉션과 setInterval, setTimeout
 * setInterval이나 setTimeout에 함수를 넘기면, 함수에 대한 내부 참조가 새롭게 만들어지고
 * 이 참조 정보는 스케줄러에 저장된다.
 * 따라서 해당 함수를 참조하는 것이 없어도 setInterval과 setTimeout에 넘긴 함수는 가비지 컬렉션 대상이 되지 않는다.

    // 스케줄러가 함수를 호출할 때까지 함수는 메모리에 유지된다.
    setTimeout(function() {...}, 100);

 * setInterval의 경우는, clearInterval이 호출되기 전까지 함수에 대한 참조가 메모리에 유지된다.
 * 
 * 그런데 이런 동작 방식에는 부작용이 하나 있다. 외부 렉시컬 환경을 참조하는 함수가 있다고 가정해보자.
 * 이 함수가 메모리에 남아있는 동안엔 외부 변수 역시 메모리에 남아있기 마련이다.
 * 그런데 이렇게 되면 실제 함수가 차지했어야 하는 공간보다 더 많은 메모리 공간이 사용된다.
 * 이런 부작용을 방지하고 싶다면 스케줄링할 필요가 없어진 함수는 아무리 작더라도 취소하도록 하자.
 */

/////////////////////////////////////////

/** 대기 시간이 0인 setTimeout
 * setTimeout(func, 0)이나 setTimeout(func)을 사용하면 setTimeout의 대기 시간을 0을 설정할 수 있다.
 * 이렇게 대기 시간을 0으로 설정하면 func을 '가능한 한'빨리 실행 할 수 있다.
 * 다만, 이때 스케줄러는 현재 실행 중인 스크립트의 처리가 종료된 이후에 스케줄링한 함수를 실행한다.
 * 
 * 이런 특징을 이용하면 현재 스크립트의 실행이 종료된 '직후에' 원하는 함수가 실행될 수 있게 할 수 있다.
 * 
 * 예시를 실행하면 얼럿창에 'Hello'와 'World'가 순서대로 출력되는 것을 확인할 수 있다.
 */
setTimeout(() => alert("World"));

alert("Hello");

/* 예시에서 첫 번째 줄은 '0밀리초 후에 함수 호출하기'라는 할 일을 '계획표에 기록'해주는 역할을 한다.
   그런데 스케줄러는 현재 스크립트(alert 함수)의 실행이 종료되고 나서야 '계획표에 어떤 할 일이 적혀있는지 확인'하므로 Hello가 먼저, World은 그다음에 출력된다.

   대기 시간이 0인 setTimeout을 활용한 브라우저 환경에서의 유스 케이스는 이벤트 루프와 매크로태스크, 마이크로태스크 등이 있다.
*/

/** 브라우저 환경에서 실제 대기 시간은 0이 아니다.
 * 브라우저는 HTML5 표준에서 정한 중첩 타이머 실행 간격 관련 제약을 준수한다.
 * 해당 표준엔 "다섯 번째 중첩 타이머 이후엔 대기 시간을 최소 4밀리초 이상으로 강제해야한다."라는 제약이 명시되어있다.
 *
 * 예시를 보며 이 제약을 사항을 이해해보자. 예시 내 setTImeout은 지연 없이 함수 run을 다시 호출할 수 있게 스케줄링 되어 있다.
 * 배열 times에는 실제 지연 간격에 대한 정보가 기록되도록 해놓았는데, 배열 times에 어떤 값이 저장되는지 알아보자.

    let start = Date.now();
    let times = [];

    setTimeout(function run(){
        times.push(Date.now() - start); // 이전 호출이 끝난 시점과 현재 호출이 시작된 시점의 시차를 기록

        if (start + 100 < Date.now()) alert(times); // 지연 간격이 100ms를 넘어가면, array를 얼럿창에 띄워줌
        else setTimeout(run); // 지언 간격이 100ms를 넘어가지 않으면 재스케줄링함
    });
 * 앞쪽 타이머들은 지연 없이 바로 실행된다.
 * 그런데 다섯 번째 중첩 타이머 이후엔 지연 간격이 4밀리초 이상이 되어 4밀리초 이상 간격으로 저장되는 것을 확인 할수 있다.
 *
 * 이런 제약은 setTimeout뿐만 아니라 setInterval에도 적용된다.
 * setInterval(f)도 처음 몇 번은 함수 f를 지연 없이 실행하지만, 나중엔 지연 간격을 4밀리초 이상으로 늘려버린다.
 * 이는 오랜전부터 있던 제약인데, 구식 스크립트 중 일부는 아직 이 제약에 의존하는 경우가 있어서 명세서를 변경하지 못하고 있는 상황이다.
 *
 * 한편, 서버 측엔 이런 제약이 없다. Node.js의 process.nextTick과 setImmediate를 이용한 비동기 작업을 지연 없이 실행할 수 있다.
 * 위에서 언급된 제약은 브라우저에 한정된다.
 */

///////////////////////////////////////////////////////

/** 요약
 * setInterval(func, delay, ...args)과 setTimeout(func, delay, args)은 delay 밀리초 후에 func을 규칙적으로, 또는 한번 실행하도록 해준다.
 * setInterval . setTimeout을 호출하고 반환받은 값을 clearInterval . clearTimeout에 넘겨주면 스케줄링을 취소할 수 있다.
 * 중첩 setTimeout을 사용하면 setInterval을 사용하는 것보다 유연하게 코드를 작성할 수 있다. 여기에 더하여 지연 간격 보장이라는 장점도 있다.
 * 대기 시간이 0인 setTimeout(setTimeout(func, 0) 혹은 setTimeout(func))을 상요하면 '현재 스크립트의 실행이 완료된 후 가능한 빠르게' 원하는 함수를 호출할 수 있다.
 * 지연 없이 중첩 setTimeout을 5회 이상 호출하거나 지연 없는 setInterval에서 호출이 5회 이상 이뤄지면, 4밀리초 이상의 지연 간격이 강제로 더해진다.
    이는 브라우저에만 적용되는 사항이며, 하위 호환성을 위해 유지되고 있다.
 *
 * 스케줄링 메서드를 사용할 땐 명시한 지연 간격이 보장되지 않을 수도 있다는 점을 유의해야 한다.
 * 아래와 같은 상황에서 브라우저 내 타이머가 느려지면 지연 간격이 보장되지 않는다.
    * CPU가 과부하 상태인 경우
    * 브라우저 탭이 백그라운드 모드인 경우
    * 노트북이 배터리에 의존해서 구동 중인 경우
 * 이런 상황에서 타이머의 최소 지연 시간은 300밀리초에서 심하면 1,000밀리초까지 늘어난다.
 * 연장 시간은 브라우저나 구동 중인 운영 체제의 성능 설정에 따라 다르다.
 */

/////////////////////////////

/** 
 * 일초 간격으로 숫자 출력하기
from에 명시한 숫자부터 to에 명시한 숫자까지 출력해주는 함수 printNumbers(from, to)를 만들어보세요. 숫자는 일 초 간격으로 출력되어야 합니다.

두 가지 방법을 사용해 함수를 만드셔야 합니다.

    1. setInterval을 이용한 방법
    2. 중첩 setTimeout을 이용한 방법
 */

function printNumbers(from, to) {
    let timerId = setInterval(() => {
        if (from <= to) {
            alert(from);
            from++;
        } else clearInterval(timerId);
    }, 1000);
}

function printNumbers(from, to) {
    let timeout = setTimeout(function print(from, to) {
        if (from <= to) {
            alert(from);
            from++;
        }
        let timeout = setTimeout(print, 1000, from, to);
    }, 1000, from, to);
}

/** 해답
 * setInterval을 이용한 방법:

function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);

 * 중첩 setTimeout을 이용한 방법:

function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);

두 방법 모두에서 최초 호출 이전에(첫 번째 얼럿 창이 뜨기 전에) 1000ms의 지연 간격을 두었다는 점에 주목해주시기 바랍니다.

초기 지연시간 없이 함수를 바로 실행하려면 아래와 같이 별도의 줄에서 함수를 호출해줘야 합니다.

function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

  go();
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
 */

/** setTimeout 은 무엇을 보여줄까요?
 * 아래 코드에선 setTimeout을 이용해 호출을 스케줄링하고 있습니다. 그런데 그 아래 코드에선 실행 시간이 100ms 이상 걸리는 무거운 작업을 하고 있네요.
 * 이런 경우 setTimeout에 넘겨준 함수는 언제 실행될까요?
    1. 반복문 실행 후
    2. 반복문 실행 전
    3. 반복문이 실행되는 시점
 * 얼럿창엔 어떤 값이 출력될까요?

    let i = 0;

    setTimeout(() => alert(i), 100); // 100000000

    // 아래 반복문을 다 도는 데 100ms 이상의 시간이 걸린다고 가정합시다.
    for(let j = 0; j < 100000000; j++) {
    i++;
    }

 */
/* setTimeout은 현재 실행 중인 코드의 실행이 종료되었을 때 실행됩니다.
   반복문 실행이 종료되고 난 후 i는 100000000이 되므로, 얼럿창엔 100000000이 출력됩니다. */