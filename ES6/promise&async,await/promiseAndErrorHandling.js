/** 프라미스와 에러 핸들링
 * 프라미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어가기 때문에 
 * 프라미스 체인을 사용하면 에러를 쉽게 처리할 수 있다. 이는 실무에서 아주 유용한 기능이다.
 * 
 * 존재하지 않는 주소 fetch에 넘겨주는 예시를 보자. .catch에서 에러를 처리한다.
 */
fetch('https://no-such-server.blabla') // 거부
    .then(response => response.json())
    .catch(err => alert(err)); // TypeError: Load failed
/* 예시에서 보듯 .catch는 첫번째 핸들러일 필요가 없고 하나 혹은 여러 개의 .then 뒤에 올 수 있다.
 * 
 * 이번엔 사이에는 아무런 문제가 없지만 응답으로 받은 JSON의 형식이 잘못된 경우를 살펴보자.
 * 가장 쉬운 에러 처리 방법은 체인 끝에 .catch를 붙이는 것이다.
 */
fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise(function(resolve, reject) { 
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser); 
        }, 3000);
    }))
    .catch(error => alert(error.message));

/* 정상적인 경우라면 .catch는 절대 트리거 되지 않는다. 
 * 그런데 네트워크 문제, 잘못된 형식의 JSON 등으로 위쪽 프라미스 중 하나라도 거부되면
 * .catch에서 에러를 잡게 된다.
 */

/////////////////////

/** 암시적 try...catch
 * 프라미스 executor와 프라미스 핸들러 코드 주위엔 '보이지 않는(암시적) try...catch'가 있다.
 * 예외가 발생하면 암시적 try...catch에서 예외를 잡고 이를 reject처럼 다룬다.
 */
// 예시:
new Promise((resolve, reject) => {
    throw new Error("에러 발생!");
}).catch(alert); // Error: 에러 발생!

/* 위 예시는 아래 예시와 똑같이 동작한다. */
new Promise((resolve, reject) => {
    reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!

/* executor 주위의 '암시적 try..catch'는 스스로 에러를 잡고, 에러를 거부상태의 프라미스로 변경시킨다.
 * 이런 일은 executor 함수뿐만 아니라 핸들러에서도 발생한다. 
 * .then 핸들러 안에서 throw를 사용해 에러를 던지면, 이 자체가 거부된 프라미스를 의미한다.
 * 따라서 제어 흐름이 가장 가까운 에러 핸들러로 넘어간다.
 */
// 예시:
new Promise((resolve, reject) => {
    resolve("OK");
}).then(result => {
    throw new Error("에러 발생!") // 프라미스가 거부됨
}).catch(alert); // Error: 에러 발생!

/* throw문이 만들 에러뿐만 아니라 모든 종류의 에러가 암시적 try..catch에서 처리된다.
 * 암시적 try..catch가 프로그래밍 에러를 어떻게 처리하는지 살펴보자.
 */
new Promise((resolve, reject) => {
    resolve("OK");
}).then(result =>{
    blabla(); // 존재하지 않는 함수
}).catch(alert); // ReferenceError: blabla is not defined

/* 마지막 .catch는 이렇게 명시적인 거부뿐만 아니라 핸들러 위쪽에서 발생한 비정상 에러 또한 잡는다. */

////////////////////////////

/** 다시 던지기
 * 체인 마지막의 .catch는 try..catch와 유사한 역할을 한다.
 * .then 핸들러를 원하는 만큼 사용하다 마지막에 .catch 하나만 붙이면 
 * .then 핸들러에서 발생한 모든 에러를 처리할 수 있다.
 * 일반 try..catch에선 에러를 분석하고, 처리할 수 없는 에러라 판단되면 에러를 다시 던질 때가 있다.
 * 프라미스에서도 유사한 일을 할 수 있다.
 * 
 * .catch 안에서 throw를 사용하면 제어 흐름이 가장 가까운 곳에 있는 에러 핸들러로 넘어간다.
 * 여기서 에러가 성공적으로 처리되면 가장 가까운 곳에 있는 .then 핸들러로 넘어간다.
 * 아래 예시의 .catch는 에러를 성공적으로 처리한다.
 */
// 실행 순서: catch -> then
new Promise((resolve, reject) => {
    
    throw new Error("에러 발생!");

}).catch(function (error) {
    
    alert("에러가 잘 처리 되었습니다. 정상적인 실행이 이어집니다.");

}).then(() => alert("다음 핸들러가 실행됩니다."));

/* .catch 블록이 정상적으로 종료되었기 때문에 다음 성공 핸들러 .then이 호출된 것을 확인할 수 있다.
 * 
 * .catch를 활용한 또 다른 사례를 살펴보자. 
 * (*)로 표시한 핸들러에서 에러를 잡는데, 
 * 여기서 에러를 처리하지 못하기 때문에(URIError 처리 방법만 알고 있음) 에러를 다시 던진다.
 */
// 실행 순서: catch -> catch
new Promise((resolve, reject) => {
    
    throw new Error("Error!");

}).catch(function (error) { // (*)
    
    if (error instanceof URIError) {
        // 예러 처리
    } else {
        alert("처리할 수 없는 에러");

        throw error; // 에러 다시 던지기
    }

}).then(function () {
    /* 여기는 실행되지 않는다. */
}).catch(error => { // (**)

    alert(`알 수 없는 에러가 발생함: ${error}`);
    // 반환값이 없음 => 실행이 계속됨

});

/* 실행 흐름이 첫 번째 .catch (*)로 넘어갔다가 다음 .catch (**)로 이어지는 것을 확인할 수 있다. */

//////////////////////////////////////////

/** 처리되지 못한 거부
 * 에러를 처리하지 못하면 무슨 일이 생길까? 
 * 아래 예시처럼 체인 끝에 .catch를 추가하지 못하는 경우처럼 말이다.
 */
new Promise(function () {
    noSuchFunction(); // 존재하지 않는 함수를 호출하기 때문에 에러가 발생함.
})
    .then(() => {
        // 성공 상태의 프라미스를 처리하는 핸들러. 한 개 혹은 여러 개가 있을 수 있음
    }); //끝에 .catch가 없음!
/* 에러가 발생하면 프라미스는 거부상태가 되고, 실행 흐름은 가장 가까운 rejection 핸들러로 넘어간다.
 * 그런데 위 예시에선 예외를 처리해 줄 핸들러가 없어서 에러가 '갇혀버린다.' 에러를 처리할 코드가 없기 때문이다.
 * 이런 식으로 코드에 처리하지 못한 에러가 남게 되면 실무에선 끔찍한 일이 발생한다.
 * 
 * 일반적인 에러가 발생하고 이를 try..catch에서 처리하지 못하는 경우를 생각해보자.
 * 스크립트가 죽고 콘솔 창에 메시지가 출력된다. 거부된 프라미스를 처리하지 못했을 때도 유사한 일이 발생한다.
 * 
 * 자바스크립트 엔진은 프라미스 거부를 추적하다가 위와 같은 상황이 발생하면 전역 에러를 생성한다.
 * 콘솔창을 열고 위 예시를 실행하면 전역 에러를 확인할 수 있다.
 * 
 * 브라우저 환경에선 이런 에러를 unhandledrejection 이벤트로 처리할 수 있다.
 */
window.addEventListener('unhandledrejection', function (event) {
    // unhandledrejection 이벤트엔 두 개의 특수 프로퍼티가 있다.
    alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
    alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});

new Promise(function () {
    throw new Error("에러 발생!");
}); // 에러를 처리할 수 있는 .catch 핸들러가 없음

/* unhandledrejection 이벤트는 HTML 명세서에 정의된 표준 이벤트이다.
 * 브라우저 환경에선 에러가 발생했는데 .catch가 없으면 unhandledrejection 핸들러가 트리거가 된다.
 * unhandledrejection 핸들러는 에러 정보가 담긴 event 객체를 받기 때문에 
 * 이 핸들러 안에서 원하는 작업을 할 수 있다.
 * 
 * 대개 이런 에러는 회복을 할 수 없기 때문에 
 * 개발자로서 할 수 있는 최선의 방법은 사용자에게 문제 상황을 알리고 가능하다면
 * 서버에 에러 정보를 보내는 것이다.
 * 
 * Node.js같은 기타 호스트 환경에도 처리하지 못한 에러를 다루는 방법을 어러 가지 제공한다.
 */

///////////////////////////////////////

/** 요약
 * .catch는 프라미스에서 발생한 모든 에러를 다룬다. reject()가 호출되거나 에러가 던져지면 .catch에서 이를 처리한다.
 * .catch는 에러를 처리하고 싶은 지점에서 정확히 위치시켜야 한다. 물론 어떻게 에러를 처리할지 알고 있어야 한다.
    핸들러에서 에러를 분석하고(커스텀 에러 클래스가 이때 도움이 된다.) 알 수 없는 에러(프로그래밍 실수로 발생한 에러일 확률이 높다)는 다시 던질 수 있다.
 * 에러 발생 시, 회복할 방법이 없다면 .catch를 사용하지 않아도 괜찮다.
 * unhandledrejection 이벤트 핸들러를 사용해 처리되지 않는 에러를 추적하고, 이를 사용자(혹은 서버에)에게 알려서 애플리케이션이 아무런 설명도 없이 '그냥 죽는걸' 방지한다.
    브라우저 환경에서 예방에 unhandledrejection을, 다른 환경에선 유사한 핸들러를 사용할 수 있다.
 */

