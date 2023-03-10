/** 프라미스 API
 * Promise 클래스에는 5가지 정적 메서드가 있다.
 * 이 다섯 메서드의 유스 케이스에 대해 알아보자.
 */

/** Promise.all
 * 여러 개의 프라미스를 동시에 실행시키고 모든 프라미스가 준비될 때까지 기다린다고 해보자.
 * 복수의 URL에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 이런 상황이 발생한다.
 * `Promise.all`은 이럴 때 사용할 수 있다.
 * 문법:
    let promise = Promise.all([...promises...]);
 * 
 * Promise.all은 요소 전체가 프라미스인 배열(엄밀히 따지면 이터러블 객체이지만, 대개는 배열임)을 받고 새로운 프라미스를 반환한다.
 * 배열 안 프라미스가 모두 처리되면 새로운 프라미스가 이행되는데, 
 * 배열 안 프라미스의 결괏값을 담은 배열이 새로운 프라미스의 result가 된다.
 * 
 * 아래 Promise.all은 3초 후에 처리되고, 반환되는 프라미스의 result는 배열 [1, 2, 3]이 된다.
 */
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환된다. 각 프라미스는 배열을 구성하는 요소가 된다.

/* 배열 result의 요소 순서는 Promise.all에 전달된 프라미스 순서와 상응한다는 점에 주목해야 한다.
 * Promise.all의 첫 번째 프라미스는 가장 늦게 이행되더라도 처리 결과는 배열의 첫 번째 요소에 저장된다.
 *
 * 작업해야 할 데이터가 담긴 배열을 프라미스 배열로 매핑하고, 이 배열을 Promise.all로 감싸는 트릭은 자주 사용된다.
 * URL이 담긴 배열을 fetch를 써서 처리하는 예시를 보자.
 */
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/Violet-Bora-Lee',
    'https://api.github.com/users/jeresig'
];

// fetch를 사용해 url을 프라미스로 매핑한다.
let requests = urls.map(url => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다린다.
Promise.all(requests)
    .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
    ));

/* GitHub 유저네임이 담긴 배열을 사용해 사용자 정보를 가져오는 예시를 살펴보자.
 * (실무에서 id를 0기준으로 장바구니 목록을 불러올 때도 같은 로직을 사용할 수 있다.)
 */

let names = ['iliakan', 'Violet-Bora-Lee', 'jeresig'];

requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
    .then(responses => {
        // 모든 응답이 성공적으로 이행되었다.
        for(let response of responses) {
            alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200이다.
        }

        return responses;
    })
    // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽는다.
    .then(responses => Promise.all(responses.map(r => r.json())))
    // JSON 형태의 응답 메시지는 파싱되어 배열 'users'에 저장된다.
    .then(users => users.forEach(user => alert(user.name)));

/* Promise.all에 전달되는 프라미스 중 하나라도 거부되면, Promise.all이 반환하는 프라미스는 에러와 함께 바로 거부된다. */
// 예시:
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: 에러 발생!

/* 2초 후 두 번째 프라미스가 거부되면서 Promise.all 전체가 거부되고,
 * .catch가 실행된다. 거부 에러는 Promise.all 전체의 결과가 된다. 
 */

/** ! 에러가 발생하면 다른 프라미스는 무시된다.
 * 프라미스가 하나라도 거부되면 Promise.all은 즉시 거부되고 배열에 저장된 다른 프라미스의 결과는 완전히 무시된다.
 * 이행된 프라미스의 결과도 무시된다.
 * fetch를 사용해 호출 여러 개를 만들면, 그중 하나가 실패하더라도 호출은 계속 일어난다. 그렇더라도 Promise.all은 다른 호출을 더는 신경 쓰지 않는다.
 * 프라미스가 처리되긴 하곘지만 그 결과는 무시된다.
 * 프라미스에는 '취소'라는 개념이 없어서 Promise.all도 프라미스를 취소하지 않는다. 
 * AbortController를 사용하면 프라미스 취소가 가능하지만, AbortController는 프라미스 API가 아니다.
 */

/** i 이터러블 객체가 아닌 '일반'값도 Promise.all(iterable)에 넘길 수 있다.
 * Promise.all(...)은 대개 프라미스가 요소인 이터러블 객체(대부분 배열)를 받는다. 
 * 그런데 요소가 프라미스가 아닌 객체일 경우엔 요소 '그대로' 결과 배열에 전달된다.
 * 
 * 아래 예시의 결과는 [1, 2, 3]이다.
 */
Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
    }),
    2,
    3
]).then(alert); // 1, 2, 3
/* 이미 결과를 알고 있는 값은 이 특징을 이용해 Promise.all에 그냥 전달하면 된다. */

/////////////////////

/** Promise.allSettled (! 최근에 추가됨)
 * Promise.all은 프라미스가 하나라도 거절되면 전체를 거절한다.
 * 따라서, 프라미스 결과가 모두 필요할 때같이 '모 아니면 도'일 때 유용하다.
 */
Promise.all([
    fetch('/template.html'),
    fetch('/style.css'),
    fetch('/date.json')
]).then(render); // render 메서드는 fetch 결과 전부가 있어야 제대로 동작한다.

/* 반면, Promise.allSettled는 모든 프라미스가 처리될 때까지 기다린다. 반환되는 배열은 다음과 같은 요소를 갖는다.
    * 응답이 성공할 경우 - {status:"fulfilled", value:result}
    * 에러가 발생한 경우 - {status:"rejected", reason:error}
 * 
 * fetch를 사용해 여러 사람의 정보를 가져오고 있다고 해보자. 여러 요청 중 하나가 실패해도 다른 요청 결과는 여전히 필요하다.
 * 이럴 때 Promise.allSettled를 사용할 수 있다.
 */
urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/Violet-Bora-Lee',
    'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
                alert(`${urls[num]}: ${result.value.status}`);
            }
            if (result.status == "rejected") {
                alert(`${urls[num]}: ${result.reason}`);
            }
        });
    });
/* (*)로 표시한 줄의 results는 다음과 같을 것이다.
    [
        {status: 'fulfilled', value: ...응답...},
        {status: 'fulfilled', value: ...응답...},
        {status: 'rejected', reason: ...에러 객체...}
    ]
 * Promise.allSettled를 사용하면 이처럼 각 프라미스 상태와 값 또는 에러를 받을 수 있다.
 */

/** 폴리필
 * 브라우저가 Promise.allSettled를 지원하지 않는다면 폴리필을 구현하면 된다.
 */
if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        return new Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            status: 'fulfilled',
            value
        }), reason => ({
            status: 'rejected',
            reason
        }))));
    };
}
/* 여기서 promise.map은 입력값을 받아 p => Promise.resolve(p)로 입력값을 프라미스로 변화시킨다(프라미스가 아닌 값을 값은 경우).
 * 그리고 모든 프라미스에 .then 핸들러가 추가된다.
 * 
 * then 핸들러는 성공한 프라미스의 결괏값 value를 {status: 'fulfilled', value}로, 
 * 실패한 프라미스의 결괏값 reason을 {status:'rejected', reason}으로 변경한다. 
 * Promise.allSettled의 구성과 동일하다.
 * 
 * 이렇게 폴리필을 구현하면 프라미스 일부가 거부되더라도 Promise.allSettled를 사용해 프라미스 전체의 결과를 얻을 수 있다.
 */

///////////////////////////////////

/** Promise.race
 * Promise.race는 Promise.all과 비슷하다.
 * 다만 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환한다.
 * 
 * 문법:
    let promise = Promise.race(iterable);

 * 아래 예시의 결과는 1이다.
 */
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

/* 첫 번째 프라미스가 가장 빨리 처리상태 되기 때문에 첫 번째 프라미스 결과가 result 값이 된다.
 * 이렇게 `Promise.race`를 사용하면 '경주(race)의 승자'가 나타난 순간 다른 프라미스의 결과 또는 에러는 무시된다.
 */

//////////////////////////////

/** Promise.resolve와 Promise.reject
 * 프라미스 메서드 Promise.resolve와 Promise.reject는 
 * async/await 문법이 생긴 후로 쓸모없어졌기 때문에 근래에는 거의 사용하지 않는다.
 */

/** Promise.resolve
 * Promise.resolve(value)는 결괏값이 value인 이행 상태 프라미스를 생성한다.
 * 아래 코드와 동일한 일을 수행한다.
    let promise = new Promise(resolve => resolve(value));

 * Promise.resolve는 호환성을 위해 함수가 프라미스를 반환하도록 해야 할 때 사용할 수 있다.
 * 
 * 아래 함수 loadCached는 인수로 받은 URL을 대상으로 fetch를 호출하고, 그 결과를 기억(cache)한다.
 * 나중에 동일한 URL을 대상으로 fetch를 호출하면 캐시에서 호출 결과를 즉시 가져오는데,
 * 이때 Promise.resolve를 사용해 캐시 된 내용을 프라미스로 만들어 반환 값이 항상 프라미스가 되게 한다.
 */
let cache = new Map();

function loadCached(url) {
    if (cache.has(url)) {
        return Promise.resolve(cache.get(url)); // (*)
    }

    return fetch(url)
        .then(response => response.text())
        .then(text => {
            cache.set(url, text);
            return text;
        });
}

/* loadCached를 호출하면 프라미스가 반환된다는 것이 보장되기 때문에 loadCached(url).then(...)을 사용할 수 있다.
 * loadCached 뒤에 언제 .then을 쓸 수 있게 된다.
 * (*)로 표시한 줄에서 Promise.resolve를 사용한 이유가 바로 여기에 있다.
 */

/** Promise.reject
 * Promise.reject(error)는 결괏값이 error인 거부 상태 프라미스를 생성한다.
 * 아래 코드와 동일한 일을 수행한다.
    let promise = new Promise((resolve, reject) => reject(error));
    
 * 실무에서 이 메서드를 쓸 일은 거의 없다.
 */

/////////////////////////////

/** 요약
 * Promise 클래스에는 5가지 정적 메서드가 있다.
 * 1. Promise.all(promises) - 모든 프라미스가 이행될 때까지 기다렸다가 그 결괏값을 담은 배열을 반환한다. 
    주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스 결과는 무시된다.
 * 2. Promise.allSettled(promises) - 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가 그 결과(객체)를 담은 배열을 반환한다.
    객체엔 다음과 같은 정보가 담긴다.
     status: "fulfilled" 또는 "rejected"
     value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우) 
 * 3. Promise.race(promises) - 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환한다.
 * 4. Promise.resolve(value) - 주어진 값을 사용해 이행 상태의 프라미스를 만든다.
 * 5. Promise.reject(error) - 주어진 에러를 사용해 거부 상태의 프라미스를 만든다.

 * 실무에선 다섯 메서드 중 Promise.all을 가장 많이 사용한다.
 */