/** 제너레이터
 * 일반 함수는 하나의 값(혹은 0개의 값)만을 반환한다.
 * 하지만 제너레이터(generator)를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있다.
 * 제너레이터와 이터러블 객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있다.
 */

const { generateKey } = require("crypto");
const { on } = require("events");

/** 제너레이터 함수 
 * 제너레이터를 만들려면 '제너레이터 함수'라 불리는 특별한 구조, `function*`이 필요하다.
 */
// 예시:
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

/* 제너레이터 함수는 일반 함수와 동작 방식이 다르다.
 * 제너레이터 함수를 호출하면 코드가 실행되지 않고, 
 * 대신 실행을 처리하는 특별 객체, '제너레이터 객체'가 반환된다.
 */

function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성한다.
let generator = generateSequence();
alert(generator); // [object Generator]

/* 함수 본문 코드는 아직 실행되지 않았다.
 * 
 * next()는 제너라이터의 주요 메서드이다. 
 * next()를 호출하면 가장 가까운 yield <value>문을 만날 때까지 실행이 지속된다(value를 생략할 수도 있는데, 이 경우엔 undefined가 된다).
 * 이후, yield <value>문을 만나면 실행이 멈추고 산출하고자 하는 값인 value가 바깥 코드에 반환된다(yield는 '생산하다, 산출하다'라는 뜻을 가짐).
 * 
 * next()는 항상 아래 두 프로퍼티를 가진 객체를 반환한다.
    * value : 산출 값
    * done : 함수 코드 실행이 끝났으면 true, 아니라면 false
 * 
 * 제너레이터를 만들고 첫 번째 산출 값을 받는 예시를 살펴보자.
 */
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}

/* generator.next()를 다시 호출해보자.
 * 실행이 재개되고 다음 yield를 반환한다.
 */
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

/* generator.next()를 또 호출하면 실행은 return문에 다다르고 함수가 종료된다. */
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}

/* 이제 제너레이터가 종료되었다. 마지막 결과인 value:3과 done:true를 통해 이를 확인할 수 있다.
 * 
 * 제너레이터가 종료되었기 때문에 지금 상태에선 generator.next()를 호출해도 아무 소용이 없다.
 * generator.next()를 여러번 호출해도 객체 {done:true}가 반환될 뿐이다.
 */

/** i) function* f(..)가 맞을까 아니면 function *f(..)가 맞을까?
 * 둘다 맞다.
 * 그런데 `*`는 제너레이터 함수를 나타내므로 대개는 첫 번째 문법이 선호된다.
 * `*`는 종류를 나타내는 것이지 이름을 나타내는 것이 아니기 때문이다.
 * 그러므로 `*`는 function에 붙이도록 하다.
 */

///////////////////////////////////////

