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

/** i) await는 최상위 레벨 코드에서 작동하지 않는다.
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

/** i) await는 'thenable' 객체를 받는다.
 * promise.then처럼 await에도 thenable 객체(then 메서드가 있는 호출 가능한 객체)를 사용할 수 있다.
 * thenable 객체는 서드파티 객체가 프라미스가 아니지만 프라미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능이다.
 * 서드파티에서 받은 객체가 .then을 지원하면 이 객체를 await와 함께 사용할 수 있다.
 * 
 * await는 데모용 클래스 Thenable의 인스턴스를 받을 수 있다.
 */
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        alert(resolve);
        // 1000밀리초 후에 이행됨(result는 this.num*2)
        setTimeout(() => resolve(this.num*2), 1000); // (*)
    }
};

async function f() {
    // 1초 후, 변수 result는 2가 됨
    let result = await new Thenable(1);
    alert(result);
}

f();

/* await는 .then이 구현되어있으면서 프라미스가 아닌 객체를 받으면, 
 * 내장 함수 resolve와 reject를 인수로 제공하는 메서드인 .then을 호출한다(일반 `Promise` executor가 하는 일과 동일하다). 
 * 그리고 나서 await는 resolve와 reject 중 하나가 호출되길 기다렸다가( (*)로 표시한 줄 ) 호출 결과를 가지고 다음 일을 진행한다.
 */



/** i) async 클래스 메서드
 * 메서드 이름 앞에 async를 추가하면 async 클래스 메서드를 선언할 수 있다.
 */
class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}

new Waiter()
    .wait()
    .then(alert); // 1
/* async 메서드와 async 함수는 프라미스를 반환하고 await를 사용할 수 있다는 점에서 동일하다. */

/////////////////////////////////////////////////////////////////

/** 에러 핸들링
 * 프라미스가 정상적으로 이행되면 await promise는 프라미스 객체의 result에 저장된 값을 반환한다.
 * 반면 프라미스가 거부되면 마치 throw문을 작성한 것처럼 에러가 던져진다.
 */
// 예시:
async function f() {
    await Promise.reject(new Error("에러 발생!"));
}
// 위 코드는 아래 코드와 동일하다.
async function f() {
    throw new Error("에러 발생!");
}
/* 실제 상황에선 프라미스가 거부 되기 전에 약간의 시간이 지체되는 경우가 있다.
 * 이런 경우엔 await가 에러를 던지기 전에 지연이 발생한다.
 * 
 * await가 던진 에러는 throw가 던진 에러를 잡을 때처럼 try..catch를 사용해 잡을 수 있다.
 */
async function f() {
    
    try {
        let response = await fetch('http://유효하지-않는-주소');
    } catch (err) {
        alert(err); // TypeError: failed to fetch
    }
}

f();
/* 에러가 발생하면 제어 흐름이 catch 블록으로 넘어간다.
 * 여러 줄의 코드를 try로 감싸는 것도 가능하다.
 */
async function f() {
    
    try {
        let response = await fetch('http://유효하지-않는-주소');
        let user = await response.json();
    } catch (err) {
        // fetch와 response.json에서 발행한 에러 모두를 여기서 잡는다.
        alert(err); 
    }
}

f();
/* try..catch가 없으면 아래 예시의 async 함수 f()를 호출해 만든 프라미스가 거부 상태가 된다.
 * f()에 .catch를 추가하면 거부된 프라미스를 처리할 수 있다.
 */
async function f() {
    let response = await fetch('http://유효하지-않는-주소');
}

// f()는 거부 상태의 프라미스가 된다.
f().catch(alert); // TypeError: failed to fetch // (*)
/* .catch를 추가하는 걸 잊으면 처리되지 않는 프라미스 에러가 발생한다.
 * 이런 에러는 전연 이벤트 핸들러 unhandledrejection을 사용해 잡을 수 있다.
 */

/** i) async/await와 promise.then/catch
 * async/await을 사용하면 await가 대시를 처리해주기 때문에 .then이 거의 필요하지 않는다.
 * 여기서 더하여 .catch 대신 일반 try..catch를 사용할 수 있다는 장점이 생긴다.
 * 항상 그런 것은 아니지만, promise.then을 사용하는 것보다 async/await를 사용하는 것이 대개 더 편리하다.
 * 
 * 그런데 문법 제약 때문에 async함수 바깥의 최상위 레벨 코드에선 await를 사용할 수 없다.
 * 그렇기 때문에 관행처럼 .then/catch를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.
 * 위 예시의 (*)로 표시한 줄처럼 말이다.
 */

/** i) async/await는 promise.all과 함께 쓸 수 있다.
 * 여러 개의 프라미스가 모두 처리되길 기다려야 하는 상황이라면 
 * 이 프라미스들을 Promise.all로 감싸고 여기에 await를 붙여 사용할 수 있다.
 */
// 프라미스 처리 결과가 담긴 배열을 기다린다.
let results = await Promise.all([
    fetch(url1),
    fetch(url2)
    // ...
]);
/* 실패한 프라미스에서 발생한 에러는 보통 에러와 마찬가지로 Promise.all로 전파된다. 
 * 에러 때문에 생긴 예외는 try..catch로 감싸 잡을 수 있다.
 */

//////////////////////////////////////////

/** 요약
 * function 앞에 async 키워드를 추가하면 두 가지 효과가 있다.
    * 1. 함수는 언제나 프라미스를 반환한다.
    * 2. 함수 안에서 await를 사용할 수 있다.
    
 * 프라미스 앞에 await 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기한다.
    처리가 완료되면 조건에 따라 아래와 같은 동작이 이어진다.
    * 1. 에러 발생 - 예외가 생성된(에러가 발생한 장소에서 throw error를 호출한 것과 동일함)
    * 2. 에러 미발생 - 프라미스 객체의 result 값을 반환
    
 * async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있다.

 * async/await를 사용하면 promise.then/catch가 거의 필요없다.
 * 하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때와 같이 promise.then/catch를 서야하는 경우가 생기기 때문에
 * async/await가 프라미스를 기반으로 한다는 사실을 알고 있어야 한다.
 * 여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용할 수 있다는 점도 알고 있으면 유용하다.
 */