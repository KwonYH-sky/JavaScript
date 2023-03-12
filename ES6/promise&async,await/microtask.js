/** 마이크로태스크
 * 프로미스 핸들러 .then/catch/finally는 항상 비동기적으로 실행된다.
 * 프라미스가 즉시 이행되더라도 .then/catch/finally 아래에 있는 코드는 이 핸들러들이 실행되기 전에 실행된다.
 */
// 예시
let promise = Promise.resolve();

promise.then(() => alert("프라미스 성공!"));

alert("코드 종료"); // 얼럿 창이 가장 먼저 뜬다.

/* 예시를 실행하면 '코드 종료'가 먼저, '프라미스 성공!'이 나중에 출력되는 것을 볼 수 있다.
 * 하지만 프라마스는 즉시 이행되었는데 말이다.
 * 왜 .then이 나중에 트리거 되었는지 알아보자.
 */

/** 마이크로태스크 큐
 * 비동기 작업을 처리하려면 적절한 관리가 필요하다.
 * 이를 위해 ECMA에선 PromiseJobs라는 내부 큐(internal queue)를 명시한다.
 * V8 엔진에선 이를 '마이크로태스크 큐(microtask queue)'라고 부르기 때문에 이 용어가 좀 더 선호된다.
 * 
 * 명세서의 설명을 살펴보자
    * 마이크로태스크 큐는 먼저 들어온 작업을 먼저 실행한다(FIFO, first-in-first-out).
    * 실행할 것이 아무것도 남아있지 않을 때만 마이크로태스크 큐에 있는 작업이 실행되기 시작한다.
 * 
 * 요약하자면, 어떤 프라미스가 준비되었을 때 이 프라미스의 .then/catch/finally 핸들러가 큐에 들어간다고 생각하면 된다.
 * 이때 핸들러들은 여전히 실행되지 않는다. 현재 코드에서 자유로운 상태가 되었을 때에서야 자바스크립트 엔진은 큐에서 작업을 꺼내 실행한다.
 * 위 예시에서 '코드 종료'가 먼저 출력되는 이유가 여기에 있다.
 * 
 * 프라미스 핸들러가 항상 내부 큐를 통과하게 된다.
 * 여러 개의 .then/catch/finally를 사용해 만든 체인의 경우, 각 핸들러는 비동기적으로 실행된다.
 * 큐에 들어간 핸들러 각각은 현재 코드가 완료되고, 큐에 적체된 이전 핸들러의 실행이 완료되었을 때 실행된다.
 * 
 * 그렇다면 '프라미스 성공!'을 먼저, '코드 종료'를 나중에 출력되게 하려면 어떻게 해야 할까?
 * 실행 순서가 중요한 경우엔 이런 요구사항이 충족되도록 코드를 작성해야 한다.
 * 
 * 방법은 아주 쉽다. .then을 사용해 큐에 넣으면 된다.
 */
Promise.resolve()
    .then(() => alert("프라미스 성공"))
    .then(() => alert("코드 종료"));
/* 이제 의도한 대로 순서가 변경되었다. */

////////////////////////////////////

/** 처리되지 못한 거부
 * 이제 자바스크립트 엔진이 어떻게 처리되지 못한 거부(unhandled rejection)를 찾는지 정확히 알 수 있다.
 * '처리되지 못한 거부'는 마이크로태스크 큐 끝에서 프라미스 에러가 처리되지 못할 때 발생한다.
 * 
 * 정상적인 경우라면 개발자는 에러가 생길 것을 대비하여 프라미스 체인에 .catch를 추가해 에러를 처리한다.
 */
promise = Promise.reject(new Error("프라미스 실패!"));
promise.catch(err => alert('잡았다!'));

// 에러를 잘 처리되었으므로 실행되지 않는다.
window.addEventListener('unhandledrejection', event => alert(event.reason));

/* 그런데 .catch를 추가해주는 걸 잊은 경우, 
 * 엔진은 마이크로태스크 큐가 빈 이후에 unhandledrejection 이벤트를 트리거 한다. 
 */
promise = Promise.reject(new Error("프라미스 실패!"));

// 프라미스 실패!
window.addEventListener('unhandledrejection', event => alert(event.reason));

/* 그런데 만약 아래와 같이 setTimeout을 이용해 에러를 나중에 처리하면 어떤 일이 생길까? */
promise = Promise.reject(new Error("프라미스 실패!"));
setTimeout(() => promise.catch(err => alert("잡았다!")), 1000);

// Error: 프라미스 실패!
window.addEventListener('unhandledrejection', event => alert(event.reason));

/* 예시를 실행하면 프라미스 실패!가 먼저, 잡았다!가 나중에 출력되는 걸 확인할 수 있다.
 * 마이크로태스크 큐에 대해 알지 못했다면 "에러를 잡았는데도 왜 unhandledrejection 핸들러가 실행되는 거지"와 같은 의문을 가졌을 것이다.
 * 
 * unhandledrejection은 마이크로태스크 큐에 있는 작업이 모두가 완료되었을 때 생성된다.
 * 엔진은 프라미스들을 검사하고 이 중 하나라도 '거부(rejected)' 상태이면 unhandledrejection 핸들러를 트리거한다.
 * 이로써 앞선 의문이 자연스레 해결되었다.
 * 
 * 위 예시를 실행하면 setTimeout을 사용해 추가한 .catch 역시 트리거 된다.
 * 다만, .catch는 unhandledrejection이 발생한 이후에 트리거 되므로 프라미스 실패!가 출력된다.
 */

/////////////////////////////

/** 요약
 * 모든 프라미스 동작은 '마이크로태스크 큐'(ES8 용어)라 불리는 
 * 내부 '프라미스 잡(promise job)' 큐에 들어가서 처리되기 때문에 프라미스 핸들링은 항상 비동기로 처리된다.
 * 따라서 .then/catch/finally 핸들러는 항상 현재 코드가 종료되고 난 후 호출된다.
 * 어떤 코드 조각을 .then/catch/finally가 호출된 이후에 실행하고 싶다면 .then을 체인에 추가하고 이 안에 코드 조각을 넣으면 된다.
 * 
 * 브라우저와 Node.js를 포함한 대부분의 자바스크립트 엔진에선 
 * 마이크로태스크가 '이벤트 루프(event loop)'와 '매크로태스크(macrotask)'와 깊은 연관 관계를 맺는다.
 */