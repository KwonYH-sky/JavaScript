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

