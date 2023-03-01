/** 프라미스 체이닝
 * 스크립트 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러 개 있다고 가정해보자.
 * 어떻게 해야 이런 상황을 코드로 풀어낼 수 있을까?
 * 프라미스를 사용하면 여러 가지 해결책을 만들 수 있다.
 * 프라미스 체이닝(promise chaining)을 이용한 비동기 처리에 대해 알아보자.
 * 프라미스 체이닝은 아래와 같이 생겼다.
 */
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);  // (*)

}).then(function (result) { // (**)
    
    alert(result); // 1
    return result * 2;

}).then(function (result) { // (***)
    
    alert(result) // 2
    return result * 2;

}).then(function (result) {
    
    alert(result); // 4
    return result * 2;

});
/* 프라미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어다.
 * 위 예시는 아래와 같은 순서로 실행된다.
    * 1. 1초후 최초 프라미스가 이행된다. - (*)
    * 2. 이후 첫번째 .then 핸들러가 호출된다. - (**)
    * 3. 2에서 반환한 값은 다음 .then 핸들러에 전달된다. - (***)
    * 4. 이런 과정이 계속 이어진다.
 * result가 핸들러 체인을 따라 전달되므로, alert 창엔 1, 2, 4가 순서대로 출력된다.
 * 
 * 프라미스 체이닝이 가능한 이유는 promise.then을 호출하면 프라미스가 반환되기 때문이다.
 * 반환된 프라미스엔 당연히 .then을 호출할 수 있다.
 * 한편 핸들러가 값을 반환할 때엔 이 값이 프라미스의 result가 된다. 따라서 다음 .then은 이 값을 이용해 호출된다.
 * 
 * 초보자는 프라미스 하나에 .then을 여러 개 추가한 후, 이를 체이닝이라고 착각하는 경우가 있다.
 * 하지만 이는 체이닝이 아니다.
 */
// 예시 :
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
    alert(result); // 1
    return result * 2;
});

promise.then(function (result) {
    alert(result); // 1
    return result * 2;
});

promise.then(function (result) {
    alert(result); // 1
    return result * 2;
});

/* 예시의 프라미스는 하나인데 여기에 등록된 핸들러는 여러 개 이다.
 * 이 핸들러들은 result를 순차적으로 전달하기 않고 독립적으로 처리한다.
 * 
 * 동일한 프라미스에 등록된 .then 모두 동일한 결과 (프라미스의 result)를 받는다.
 * 따라서 위 에시를 실행하면 얼럿 창엔 전부 1이 출력된다.
 * 이런 식으로 한 프라미스에 여러 개의 핸들러를 등록해서 사용하는 경우는 거의 없다. 
 * 프라미스는 주로 체이닝을 해서 쓰인다.
 */

///////////////////////////////////

/** 프라미스 반환하기
 * .then(handler)에 사용된 핸들러가 프라미스를 생성하거나 반환하는 경우도 있다.
 * 이 경우 이어지는 핸들러는 프라미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 받는다.
 */
// 예시:
new Promise((resolve, reject) => {
    
    setTimeout(() => resolve(1), 1000);

}).then(function (result) {
    
    alert(result); // 1

    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    
    alert(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    
    alert(result); // 4

});
/* 예시에서 첫 번째 .then은 1을 출력하고 new Promise(...)를 반환((*))한다.
 * 1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result * 2)는 두 번째 .then으로 전달된다.
 * 두 번째 핸들러((**))는 2를 출력하고 동일한 과정이 반복된다.
 * 따라서 얼럿 창엔 이전 예시와 동일하게 1, 2, 4가 차례대로 출력된다. 다만 얼럿 창 사이에 1초의 딜레이가 생긴다.
 * 이렇게 핸들러 안에서 프라미스를 반환하는 것도 비동기 작업 체이닝을 가능하게 해준다.
 */

//////////////////

/**
 * 
 */

