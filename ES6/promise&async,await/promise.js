/** 프라미스
 * 본인이 아주 유명한 가수라고 가정해보자. 그리고 탑 가수인 본인이 밤, 낮으로 다음 싱글 앨범이 언제 나오는지 물어보는 팬들을 상대해야 한다고 해보자.
 * 당신은 앨범이 출시되면 팬들이 자동으로 소식을 받아볼 수 있도록 해 부하를 덜 것이다.
 * 구독 리스트를 하나 만들어 팬들에게 전달해 이메일 주소를 적게 하고, 앨범이 준비되면 리스트에 있는 팬들에게 메일을 보내 앨범 관련 소식을 바로 받아볼 수 있게 하는 식이다.
 * 이렇게 하면 녹음 스튜디오에 화제가 발생해서 출시 예정인 앨범이 취소되는 불상사가 발생해도 관련 소식을 팬들에게 전달할 수 있다.
 * 이제 모두가 행복해졌다. 밤낮으로 질문하는 팬이 사라졌고, 팬들은 앨범 출시를 놓치지 않을 수 있게 되었다.
 * 
 * 이 비유는 코드를 작성하면서 자주 만나는 상황을 비유한 것이다. 아래와 같은 상황처럼 말이다.
    * 1. '제작 코드(producing code)'는 원격에서 스크립트를 불러오는 것 같은 시간이 걸리는 일은 한다.
        위 비유에선 '가수'가 제작 코드에 해당한다.
    * 2. '소비 코드(consuming code)'는 '제작 코드'의 결과를 기다렸다가 이를 소비한다. 이때 소비 주체(함수)는 여럿이 될 수 있다.
        위 비유에선 소비 코드는 '팬'이다.
    * 3. 프라미스(promise)는 '제작 코드'와 '소비 코드'를 연결해 주는 특별한 자바스크립트 객체이다. 위 비유에선 '구독리스트'이다.
        '프라미스'는 시간이 얼마나 걸리든 상관없이 약속한 결과를 만들어 내는 '제작 코드'가 준비 되었을 때, 
        모든 소비 코드가 결과를 사용할 수 있도록 해준다.
 * 사실 프라미스는 구독 리스트보다 훨씬 복잡하기 때문에, 위 비유가 완벽하게 들어맞지는 않다.
 * 프라미스엔 더 많은 기능이 있고, 한계도 있다. 하지만 일단 이 비유를 이용해 프라미스를 이해해보자.
 * 
 * promise 객체는 아래와 같은 문법으로 만들 수 있다.
 */
let promise = new Promise(function (resolve, reject) {
    // executor (제작 코드, '가수')
});

/* new Promise에 전달되는 함수는 executor(실행자, 실행함수)라고 부른다. 
 * executor는 new Promise가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작 코드를 포함한다.
 * 위 비유에서 '가수'가 바로 executor이다.
 * 
 * executor의 인수 resolve와 reject는 자바스크립트에서 자체 제공하는 콜백이다.
 * 개발자는 resolve와 reject를 신경 쓰지 않고 executor 안 코드만 작성하면 된다.
 * 
 * 대신 executor에선 결과를 즉시 얻든 늦게 얻든 상관없이 상황에 따라 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 한다.
    * resolve(value) - 일이 성공적으로 끝난 경우 그 결과를 나타내는 value와 함께 호출
    * reject(error) - 에러 발생 시 에러 객체를 나타내는 error와 함께 호출
 * 요약하면 다음과 같다. 
 * executor는 자동으로 실행되는데 여기서 원하는 일이 처리된다. 
 * 처리가 끝나면 executor는 처리 성공 여부에 따라 resolve나 reject를 호출한다.
 * 
 * 한편, new Promise 생성자는 반환하는 promise 객체는 다음과 같은 내부 프로퍼티를 갖는다.
    * state - 처음엔 "pending"(보류)이었다 resolve가 호출되면 "fulfilled", reject가 호출되면 "rejected"로 변한다.
    * result - 처음엔 undefined이었다 resolve(value)가 호출되면 value로, reject(error)가 호출되면 error로 변한다.
 * 따라서 executor는 promise의 상태를 둘 중 하나로 변화시킨다.
 * 
 * promise 생성자와 간단한 executor 함수로 만든 예시이다. setTimeout을 이용해 executor 함수는 약간 시간이 걸리도록 구현한다.
 */
promise = new Promise(function (resolve, reject) {
    // 프라미스가 만들어지면 executor 함수는 자동으로 실행된다.

    // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 '완료'가 된다.
    setTimeout(() => resolve("완료"), 1000);
});

/* 위 예시를 통해서 알 수 있는 것은 두가지이다.
    * 1. executor는 new Promise.에 의해 자동으로 그리고 즉각적으로 호출된다.
    * 2. executor는 인자로 resolve와 reject 함수를 받는다. 이 함수들은 자바스크립트 엔진이 미리 정의한 함수이므로 개발자가 따로 만들 필요가 없다.
        다만, resolve나 reject 중 하나는 반드시 호출해야 한다.
 * executor '처리'가 시작 된 지 1초 후, resolve("완료")가 호출되고 결과가 만들어진다.
 * 이처럼 일이 성공적으로 처리되었을 때의 프라미스는 'fulfilled promise(약속이 이행된 프라미스)'라고 불린다.
 * 
 * 이번엔 executor가 에러와 함께 약속한 작업을 거부하는 경우를 살펴보자.
 */
promise = new Promise(function (resolve, reject) {
    // 1초 뒤에 에러와 함께 실행이 종료되었다는 신호를 보낸다.
    setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

/* 1초 후 reject(...)가 호출되면 promise의 상태가 "rejected"로 변한다.
 * 
 * 앞서 다룬 내용을 요약하면,
 * executor는 보통 시간이 걸리는 일을 수행한다. 
 * 일이 끝나면 resolve나 reject 함수를 호출하는데, 이때 프라미스 객체의 상태가 변화한다.
 * 
 * 이행(resolved) 혹은 거부(rejected) 상태의 프라미스는 '처리된(settled)' 프라미스라고 부른다.
 * 반대되는 프라미스로 '대기(pending)'상태의 프라미스가 있다.
 */

/** ! 프라미스는 성공 또는 실패만 한다.
 * executor는 resolve나 reject 중 하나를 반드시 호출해야 한다. 이때 변경된 상태는 더 이상 변하지 않는다.
 * 처리가 끝난 프라미스에 resolve와 reject를 호출하면 무시되어버린다.
 */
promise = new Promise(function (resolve, reject) {
    resolve("완료");

    reject(new Error("...")); // 무시됨
    setTimeout(() => resolve("...")); // 무시됨
});

/* 이렇게 executor에 의해 처리가 끝난 일은 결과 홋은 에러만 가질 수 있다.
 * 여기에 더하여 resolve나 reject는 인수를 하나만 받고(혹은 아무것도 받지 않음) 그 이외의 인수는 무시한다는 특성도 있다.
 */

/** ! Error 객체와 함께 거부하기
 * 무언가 잘못된 경우, executor는 reject를 호출해야 한다. 
 * 이때 인수는 resolve와 마찬가지로 어떤 타입도 가능하지만 
 * Error 객체 또는 Error를 상속받은 객체를 사용할 것을 추천한다.
 */

/** ! resolve reject 함수 즉시 호출하기
 * executor는 대개 무언가를 비동기적으로 수행하고, 약간의 시간이 지난 후에 resolve, reject를 호출하는데, 꼭 이렇게 할 필요는 없다.
 * 아래와 같이 resolve나 reject를 즉시 호출할 수도 있다.
    let promise = new Promise(function (resolve, reject) {
        // 일이 끝마치는 데 시간이 들지 않음
        resolve(123); // 결과(123)를 즉시 resolve에 전달함
    });
 * 어떤 일을 시작했는데 알고 보니 일이 이미 끝나 저장까지 되어있는 경우, 
 * 어떻게 resolve나 reject를 즉시 호출하는 방식을 사용할 수 있다.
 * 이렇게 하면 프라미스는 즉시 이행 상태가 된다.
 */

/** ! state와 result는 내부에 있다.
 * 프라미스 객채의 state, result 프로퍼티는 내부 프로퍼티이므로 개발자가 직접 접근할 수 없다.
 * 대신 .then/ .catch / .finally 메서드를 사용하면 접근 가능한다.
 */

//////////////////////////////////////////////

