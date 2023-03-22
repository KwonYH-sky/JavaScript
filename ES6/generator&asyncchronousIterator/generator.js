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

/** 제너레이터와 이터러블
 * next() 메서드를 보면서 짐작했드시, 제너레이터는 이터러블이다.
 * 따라서 `for..of` 반복문을 사용해 값을 얻을 수 있다.
 */

function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

generator = generateSequence();

for (let value of generator) {
    alert(value); // 1, 2가 출력됨
}

/* .next().value을 호출하는 것보다 나아 보인다.
 * 그런데 주의할 점이 있다. 위 예시를 실행하면 1과 2만 출력되고 3은 출력되지 않는다.
 * 
 * 이유는 `for..of` 이터레이션이 `done:true`일 때 마지막 value를 무시하기 때문이다.
 * 그러므로 `for..of`를 사용했을 때 모든 값이 출력되길 원한다면 yield로 값을 반환해야 한다.
 */

function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

generator = generateSequence();

for (let value of generator) {
    alert(value); // 1, 2, 3
}

/* 제너레이터는 이터러블 객체이므로 제너레이터에도 전개 문법(...)같은 관련 기능을 사용할 수 있다.  */

function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3

/* 위 예시에서 ...generatorSequence()는 반복 가능한 제너레이터 객체를 배열 요소로 바꿔준다.
 */

//////////////////////////////////

/** 이터러블 대신 제너레이터 사용하기
 * iterable 객체에서 from..to 사이에 있는 값을 반환하는 반복 가틍 객체, range를 만들어 보았다.
 * 코드를 상기해보자.
 */
let range = {
    from: 1,
    to: 5,

    // for..of 최초 호출 시, Symbol.iterator가 호출된다.
    [Symbol.iterator]() {
        // Symbol.iterator는 이터레이터 객체를 반환한다.
        // for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해진다.
        return {
            current: this.from,
            last: this.to,

            // for..of 반복문에 의해 각 이레이션마다 next()가 호출된다.
            next(){
                // next()는 객체 형태의 값, {done:..., value:...}을 반환해야한다.
                if (this.current <= this.last) {
                    return { done: false, value: this.current++};
                } else {
                    return { done: true };
                }
            }
        };
    }
};

// 객체 range를 대상으로 하는 이터레이션은 range.from과 range.to 사이의 숫자를 출력한다.
alert([...range]); // 1, 2, 3, 4, 5

/* Symbol.iterator 대신 제너레이터 함수를 사용하면, 제너레이터 함수로 반복이 가능하다.
 * 같은 range이지만, 좀 더 암축된 range를 살펴보자.
 */
range = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() { // [Symbol.iterator]: function()를 잛게 줄임
        for (let value = this.from; value < this.to; value++) {
            yield value;
        }
    }
};

alert([...range]); // 1, 2, 3, 4, 5

/* range[Symbol.iterator]()는 제너레이터를 반환하고, 
 * 제너레이터 메서드는 for..of가 동작하는데 필요한 사항(아래 설명)을 충족시키므로 예시가 잘 동작한다.
    * .next() 메서드가 있음
    * 반환 값의 형태는 `{value:..., done: true/false}` 이어야함
 * 이렇게 이터러블 객체 대신 제너레이터를 사용할 수 있는 것은 우연이 아니다.
 * 제너레이터는 이터레이터를 어떻게 하면 쉽게 구현할지를 염두에 두며 자바스크립트에 추가되었다.
 * 
 * 제네러에터를 사용해 구현한 예시는 이터러블을 사용해 구현한 기존 예시보다 훨씬 간결하고 동일한 기능을 제공한다.
 */

/** i) 제너레이터는 무한한 값을 만들 수도 있다.
 * 위 예시에선 유한한 연속 값을 생성했지만, 값을 끊임없이 생성하는 제너레이터를 만드는 것도 가능하다.
 * 끊임없는 의사 난수를 생성하는 것처럼 말이다.
 * 
 * 끊임없는 값을 생성하는 제너레이터를 만들었다면 당연히 for..of 안에 break이나 return이 있어야 한다.
 * 그렇지 않으면 무한 반복문이 되어서 스크립트가 멈추어 버린다.
 */

///////////////////////////////////////////////////

/** 제너레이터 컴포지션
 * 제너레이터 컴포지션(generator composition)은 제너리이터 안에 제너레이터를 
 * '임베딩(embedding, composing)'할 수 있게 해주는 제너레이터의 특별 기능이다.
 * 
 * 먼저, 연속된 숫자를 생성하는 제너레이터 함수를 만들어 보자.
 */
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}
/* 그리고 이 함수를 기반으로 좀더 복잡한 값을 연속해서 생성하는 함수를 만들자. 값 생성 규칙은 다음과 같다.
    * 처음엔 숫자 0부터 9까지를 생성한다(문자 코드 48부터 57까지).
    * 이어서 알파벳 대문자 A부터 Z까지를 생성한다(문자 코드 65부터 90까지).
    * 이어서 알파벳 소문자 a부터 z까지를 생성한다(문자 코드 97부터 122까지).
 * 
 * 이런 규칙을 충족하는 연속 값은 비밀번호를 만들 때 응용할 수 있다(물론 특수 문자도 추가 할 수 있다).
 * 일반 함수로는 여러 개의 함수를 만들고, 그 결과를 어딘가에 저장한 후 다시 그 결과들을 조합해야 원하는 기능을 구현할 수 있다.
 * 하지만 제너레이터의 특수 문법 yield*를 사용하면 제너레이터를 다른 제너레이터에 '끼워 넣을 수' 있다.
 * 컴포지션을 적용한 제너레이터는 다음과 같다.
 */
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
    
    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);

}

let str ='';

for (let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z

/* `yield*` 지시자는 실행을 다른 제너레이터에 위임한다(delegate).
 * 여기서 '위임'은 `yield* gen`이 제너레이터 gen을 대상으로 반복을 수행하고, 
 * 산출 값들을 바깥으로 전달한다는 것을 의미한다.
 * 마치 외부 제네레이터에 의해 값이 산출된 것 처럼 보인다.
 * 
 * 중첩 제네러에터(generateSequence)의 코드를 직접 써줘도 결과는 같다.
 */
function* generatePasswordCodes() {
    
    // 0..9
    for (let i = 48; i <= 57; i++) yield i;

    // A..Z
    for (let i = 65; i <= 90; i++) yield i;

    // a..z
    for (let i = 97; i <= 122; i++) yield i;

}

str ='';

for (let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
/* 제너라이터 컴포지션을 사용하면 한 제네레이터의 흐름을 자연스럽게 다른 제너레이터에 삽입할 수 있다.
 * 제너레이터 컴포지션을 사용하면 중간결과 저장 용도의 추가 메모리가 필요하지 않다.
 */

///////////////////////////////////////////////////////////////////

