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

/** 소비자: then, catch, finally
 * 프라미스 객체는 executor('제작 코드' 혹은 '가수')와 결과나 에러를 받을 소비 함수('팬')를 이어주는 역할을 한다.
 * 소비함수는 .then, .catch, .finally 메서드를 사용해 등록(구독)된다.
 */

/** then
 * .then은 프라미스에서 가장 중요하고 기본이 되는 메서드이다.
 * 문법은 다음과 같다.
 */
    promise.then(
        function (result) {/* 결과(result)를 다룬다. */},
        function (error) {/* 에러(error)를 다룬다. */}
    );
/* .then의 첫 번째 인수는 프라미스가 이행되었을 때 실행되는 함수이고, 여기서 실행 결과를 받는다.
 * .then의 두 번째 인수는 프라미스가 거부되었을 대 실행되는 함수이고, 여기서 에러를 받는다.
 * 
 * 아래 예시는 성공적으로 이행된 프라미스에 어떻게 반응하는지 보여준다.
 */
promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("완료!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행한다.
promise.then(
    result => alert(result), // 1초 후 "완료!"를 출력
    error => alert(error) // 실행되지 않음
);
/* 첫 번째 함수가 실행되었다.
 * 프라미스가 거부된 경우에는 아래와 같이 두 번째 함수가 실행된다.
 */
promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// reject 함수는 .then의 두 번째 함수를 실행한다.
promise.then(
    result => alert(result), // 실행되지 않음
    error => alert(error) // 1초 후 "Error: 에러 발생!"를 출력
);

/* 작업이 성공적으로 처리된 경우만 다루고 싶다면 .then에 인수를 하나만 전달하면 된다. */
promise = new Promise(resolve => {
    setTimeout(() => resolve("완료!"), 1000);
});

promise.then(alert); // 1초 후 "완료!"를 출력

/** catch
 * 에러가 발생한 경우만 다루고 싶다면 .then(null, errorHandlingFunction)같이 null을 첫 번째 인수로 전달하면 된다.
 * .catch(errorHandlingFunction)를 써도 되는데, .catch는 .then에 null를 전달하는 것과 동일하게 작동한다.
 */
promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동한다.
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력

/* .catch(f)는 문법이 간결하다는 점만 빼고, .then(null, f)과 완벽하게 같다. */

/** finally
 * try {...} catch {...}에 finally 절이 있는 것처럼, 프라미스에도 finally가 있다.
 * 프라미스가 처리되면(이행이나 거부) f가 항상 실행된다는 점에서 .finally(f) 호출은 .then(f, f)과 유사하다.
 * 쓸모가 없어진 로딩 인디케이터(loading indicator)를 멈추는 경우같이, 결과가 어떻든 마무리가 필요하면 finally가 유용하다.
 * 사용법은 아래와 같다.
    new Promise((resolve, reject) => {
        // 시간이 걸리는 어떤 일을 수행하고, 그 후 resolve, reject를 호출됨     
    })
        // 성공, 실패 여부와 상관없이 프라미스가 처리되면 실행됨
        .finally(() => 로딩 인케이터 중지)
        .then(result => result와 err 보여줌 => error 보여줌)

 * 그런데 finally는 .then(f, f)과 완전히 같진 않다. 차이점은 다음과 같다.
    * 1.finally 핸들러엔 인수가 없다. finally에선 프라미스가 이행되었는지, 거부되었는지 알 수 없다.
        finally에선 절차를 마무리하는 '보편적' 동작을 수행하기 때문에 성공, 실패 여부를 몰라도 된다.
    * 2.finally 핸들러는 자동으로 다음 핸들러에 결과와 에러를 전달한다.
        result가 finally를 거쳐 then까지 전달되는 것을 확인해보자.
        
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("결과"), 2000);    
        })
            .finally(() => alert("프라미스가 준비되었습니다."))
            .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음
        
        프라미스에서 에러가 발생하고 이 에러가 finally를 거쳐 catch까지 전달하는 것을 롹인해보자.

        new Promise((resolve, reject) => {
            throw new Error("에러 발생!");
        })
            .finally(() => alert("프라미스가 준비되었습니다."))
            .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음

        finally는 프라미스 결과를 처리하기 위해 만들어 진게 아니다. 프라미스 결과는 finally를 통과해서 전달이 된다.
        이런 특징은 아주 유용하게 사용되기도 한다.
    * 3.`.finally(f)`는 함수 f를 중복해서 쓸 필요가 없기 때문에 `.then(f, f)`보다 문법 측면에서 더 편리하다.
 */

/** ! 처리된 프라미스의 핸들러는 즉각 실행된다.
 * 프라미스가 대기 상태일 때, .then/catch/finally 핸들러는 프라미스가 처리되길 기다린다.
 * 반면, 프라미스가 이미 처리상태라면 핸들러가 즉각 실행된다.
 */        
// 아래 프라미스는 생성과 동시에 이행된다.
promise = new Promise(resolve => resolve("완료"));

promise.then(alert); // 완료 (바료 출력됨)

/* 가수와 팬, 구독리스트 시나리오보다 프라미스가 더 복잡하다고 말한 이유가 바로 이런 기능 때문이다.
 * 가수가 신곡을 발표한 이후 구독 리스트에 이름을 올리는 팬은 신곡 발표 여부를 알 수 없다.
 * 구독 리스트에 이름을 올리는 것이 선행되어야 새로운 소식을 받을 수 있기 때문이다.
 * 
 * 그런데 프라미스는 핸들러를 언제든 추가할 수 있다는 점에서 구독리스트 시나리오보다 더 유연하다.
 * 결과가 나와 있는 상태에서도 핸들러를 등록하면 결과를 바로 받을 수 있다.
 */

/////////////////////////////

