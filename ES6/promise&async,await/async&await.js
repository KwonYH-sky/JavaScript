/** async와 await
 * async와 await라는 특별한 문법을 사용하면 프라미스를 좀 더 편하게 사용할 수 있다.
 * async, await는 놀라울 정도로 이해하기 쉽고 사용법도 어렵지 않다.
 */

/** async 함수
 * async 키워드부터 알아보자.
 * async는 function 앞에 위치한다.
 */
async function f() {
    return 1;
}

/* function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환한다.
 * 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스를 반환하도록 한다.
 * 
 * 아래 예시의 함수를 호출하면 result가 1인 이행 프라미스를 반환된다.
 */
async function f() {
    return 1;
}

f().then(alert); // 1

/* 명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일하다. */
async function f() {
    return Promise.resolve(1);
}

f().then(alert); // 1
/* async가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다.
 * 그런데 async가 제공하는 기능은 이뿐만 아니다.
 * 또 다른 키워드 await는 async 함수 안에서만 동작한다. await 또한 매우 유능한 키워드이다.
 */

/////////////////////////////

/** await
 * await 문법은 다음과 같다.
    // await는 async 함수 안에서만 동작한다.
    let value = await promise;
 * 자바스크립트는 await 키워드를 만나면 프라미스가 처리될 때까지 기다린다(await는 '기다리다'라는 뜻을 가진 영단어이다).
 * 결과는 그 이후 반환된다.
 * 
 * 1초 후 이행되는 프라미스를 예시로 사용하여 await가 어떻게 동작하는지 알아보자.
 */
async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000)
    });

    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    alert(result); // "완료!"
}

f();

/* 함수를 호출하고, 함수 본문이 실행되는 도중에 
 * (*)로 표시한 줄에서 실행이 잠시 '중단'되었다가 프라미스가 처리되면서 실행이 재개된다.
 * 이때 프라미스 객체의 result 값이 변수 result에 할당된다. 따라서 위 예시를 실행하면 1초 후 '완료!'가 출력된다.
 * 
 * await는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다.
 * 프라미스가 처리되면 그 결과와 함께 실행이 재개된다.
 * 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.
 * 
 * await는 promise.then보다 좀 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해주는 문법이다.
 * promise.then보다 가독성이 좋고 쓰기 쉽다.
 */

/** ! 일반 함수엔 await을 사용할 수 없다.
 * async 함수가 아닌데 await을 사용하면 문법 에러가 발생한다.
 */
function f() {
    let promise = Promise.resolve(1);
//    let result = await promise; // Syntax Error
}
/* function 앞에 async를 붙이지 않으면 이런 에러가 발생할 수 있다.
 * 앞서 언급한 바와 같이 await는 async 함수 안에서만 동작한다.
 */

/* 이전 showAvatar() 예시를 async/await를 사용해 다시 작성해보자.
    * 1. 먼저 .then 호출 await로 바꾸어야 한다.
    * 2. function 앞에 async를 붙여 await를 사용할 수 있도록 해야 한다.
 */
async function showAvatar() {
    
    // JSON 읽기
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

    // github 사용자 정보 읽기
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();

    // 아바타 보여주기
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    // 3초 대기
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    img.remove();

    return githubUser;
}

showAvatar();
/* 코드가 깔끔해지고 읽기도 쉬워졌다. 프라미스를 사용하는 것보다 가독성이 좋아졌다. */

/** i await는 최상위 레벨 코드에서 작동하지 않는다.
 * await을 이제 막 사용하기 시작하면 최상위 레벨 코드(top-level-code)에서 await을 사용할 수 없다는 잊는다.
 * 아래와 같은 코드는 동작하지 않는다.
    // 최상위 레벨 코드에선 문법 에러가 발생함
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
 * 하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용할 수 있다.
 */
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    // ....
})();

