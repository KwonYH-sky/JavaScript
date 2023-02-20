/** 콜백
 * 자바스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 비동기(asynchronous) 동작을 스케줄링 할 수 있다.
 * 즉, 원하는 때에 동작이 시작하도록 할 수 있다.
 * setTimeout은 스케줄링에 사용되는 가장 대표적인 함수이다.
 * 
 * 실무에서 맞닥뜨리는 비동기 동작은 아주 다양하다. 스크립트나 모듈을 로딩하는 것 또한 비동기 동작이다.
 * 
 * src에 있는 스크립트를 읽어오는 함수 loadScript(src)를 예시로 비동기 동작처리가 어떻게 일어나는지 살펴보자.
 */
function loadScript(src) {
    // <script> 태그를 만들고 페이지에 태그를 추가한다.
    // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행한다.
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}

/* 함수 loadScript(src)는 <script src="...">를 동작으로 만들고 이를 문서에 추가한다.
 * 브라우저는 자동으로 태그에 있는 스크립트를 불러오고, 로딩이 완료되면 스크립트를 실행한다.
 * 
 * loadScript(src) 사용법은 다음과 같다.
 */

// 해당 경로에 위치한 스크립트를 불러오고 실행함
loadScript('/my/script.js');

/* 그런데 이 때 스크립트는 '비동기적으로' 실행된다.
 * 로딩은 지금 당장 시작되더라도 실행은 함수가 끝난 후에야 되기 때문이다.
 * 따라서 loadScript(...) 아래에 있는 코드들은 스크립트 로딩이 종료되는 걸 기다리지 않는다.
 */

loadScript('/my/script.js');
// loadScript 아래의 코드는
// 스크립트 로딩이 끝날 때까지 기다리지 않는다.
// ...

/* 스크립트 로딩이 끝나자마자 이 스크립트를 사용해 무언가를 해야만 한다고 가장해보자.
 * 스크립트 안에 다양한 함수가 정의되어 있고, 우리는 이 함수를 실행하길 원하는 상황이다.
 * 그런데 loadScript(...)를 호출하자마자 내부 함수를 호출하면 원하는 대로 작동하지 않는다.
 */

loadScript('/my/script.js'); // script.js엔 "function newFunction() {...}"이 있다.

newFunction(); // 함수가 존재하지 않는다는 에러가 발생한다.

/* 에러는 브라우저가 스크립트를 읽어올 수 있는 시간을 충분히 확보하지 못했기 때문에 발생한다.
 * 그런데 현재로서는 함수 loadScript에서 스크립트 로딩이 완료되었는지 알 방법이 없다.
 * 엔젠간 스크립트가 로드되고 실행 되곘지만 말이다.
 * 원하는 대로 스크립트 안의 함수나 변수를 사용하려면 스크립트 로딩이 끝났는지 여부를 알 수 있어야 한다.
 * 
 * loadScript의 두 번째 인수로 스크립트 로딩이 끝난 후 실행될 함수인 콜백(callback) 함수를 추가해 보자.(콜백 함수는 나중에 호출할 함수를 의미)
 */

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
}

/* 새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 로출하면 원하는 대로 외부 스크립트 안의 함수를 사용할 수 있다. */

loadScript('/my/script.js', function () {
    // 콜백 함수는 스크립트 로드가 끝나면 실행된다.
    newFunction(); // 이제 함수 호출이 제대로 동작한다.
    // ...
});

/* 이렇게 두 번째 인수로 전달된 함수(대개 익명 함수)는 원하는 동작(위 예제에선 외부 스크립트를 불러오는 것)이 완료되었을 때 실행된다.
 * 아래는 실재 존재하는 스크립트를 이용해 만든 예시이다.
 */

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`${script.src}가 로드되었습니다.`);
  alert( _ ); // 스크립트에 정의된 함수
});

/* 이런 방식을 '콜백 기반(callback-based)' 비동기 프로그래밍이라고 한다.
 * 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야한다.
 * 
 * 위 예시에선 loadScript의 인수로 콜백을 제공해 주었는데, 이렇게 콜백을 사용한 방식은 비동기 프로그래밍의 일반적인 접근법이다.
 */

//////////////////////////////////////////////////////

