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

