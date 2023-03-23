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
 * next()는 제너레이터의 주요 메서드이다. 
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
/* 제너레이터 컴포지션을 사용하면 한 제네레이터의 흐름을 자연스럽게 다른 제너레이터에 삽입할 수 있다.
 * 제너레이터 컴포지션을 사용하면 중간결과 저장 용도의 추가 메모리가 필요하지 않다.
 */

///////////////////////////////////////////////////////////////////

/** 'yield'를 사용해 제너레이터 안 밖으로 정보 교환하기
 * 앞서 설명한 제너레이터는 값을 생성해주는 특수 문법을 가진 이터러블 객체와 유사했다.
 * 그런데 사실 제너레이터는 더 강력하고 유연한 기능을 제공한다.
 * 
 * `yield`가 양방향 길과 같은 역할을 하기 때문이다.
 * yield는 결과를 바깥으로 전달할 뿐만 아니라 값을 제너레이터 안으로 전달하기까지 한다.
 * 값을 안, 밖으로 전달하려면 generator.next(arg)를 호출해야한다. 이때 인수 arg는 yield의 결과가 된다.
 */
// 예시 :
function* gen() {
    // 질문을 제너레이터 밖 코드에 던지고 답을 기다린다.
    let result = yield "2 + 2 = ?"; // (*)

    alert(result);
}

generator = gen();

let question = generator.next().value; // <-- yield는 value를 반환한다.

generator.next(4); // --> 결과를 제너레이터 안으로 전달한다.
/* 1. generator.next()를 처음 호출할 땐 항상 인수가 없어야 한다.
    인수가 넘어오더라도 무시되어야 한다. generator.next()를 호출하면 실행이 시작되고
    첫 번째 `yield "2+2=?"`의 결과가 반환된다. 이 시점에는 제너레이터가 (*)로 표시한 줄에서 실행을 잠시 멈춘다.
 * 2. 그 후, 위 그림에서 보듯이 yield의 결과가 제너레이터를 호출하는 외부 코드에 있는 변수, question에 할당된다.
 * 3. 마지막 줄, generator.next(4)에서 제너레이터가 다시 시작되고 4는 result에 할당된다(let result = 4).
 * 
 * 외부 코드에선 next(4)를 즉시 호출하지 않고 있다는 점에 주목하자.
 * 제너레이터가 기다려주기 때문에 호출을 나중에 해도 문제가 되지 않는다.
 */
// 예시:
// 일정 시간이 지난 후 제너레이터가 다시 시작됨
setTimeout(() => generator.next(4), 1000);

/* 일반 함수와 다르게 제너레이터와 외부 호출 코드는 next/yield를 이용해 결과를 전달 및 교환한다.
 * 또 하나의 예시를 살펴보며 이 과정을 자세히 알아보자.
 */
function* gen() {
    let ask1 = yield "2 + 2 = ?";

    alert(ask1); // 4

    let ask2 = yield "3 * 3 = ?";

    alert(ask2); // 9
}

generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true

/* 1. 제너레이터 객체가 만들어지고 첫 번째 .next()가 호출되면, 실행이 시작되고 첫 번째 yield에 다다른다.
 * 2. 산출 값은 바깥 코드로 반환된다.
 * 3. 두 번째 .next(4)는 첫 번째 yield의 결과가 될 4를 제너레이터 안으로 전달한다. 그리고 다시 실행이 이어진다.
 * 4. 실행 흐름이 두 번째 yield에 다다르고, 산출 값("3 * 3 = ?")이 제너레이터 호출 결과가 된다.
 * 5. 세 번째 next(9)는 두 번째 yield의 결과가 될 9를 제너레이터 안으로 전달한다. 
    그리고 다시 실행이 이어지는데, done: true이므로 제너레이터 함수는 죵료된다.
 * 
 * 마치 '핑퐁 게임' 같아보인다. 첫 번째 next()를 제외한 각 next(value)는 현재 yield의 결과가 될 값을 제너레이터 안에 전달한다.
 * 그리고 다음 yield의 결과로 되돌아온다.
 */

////////////

/** generator.throw
 * 여러 가지 예시를 통해 살펴보았듯이 외부 코드는 yield의 결과가 될 값을 제너레이터 안에 전달하기도 한다.
 * 그런데 외부 코드가 에러를 만들거나 던질 수도 있다. 에러는 결과의 한 종류이기 때문에 이는 자연스러운 현상이다.
 * 
 * 에러를 yield 안으로 전달하려면 generator.throw(err)를 호출해야 한다.
 * generator.throw(err)를 호출하게 되면 err는 yield가 있는 줄로 던져진다.
 * 
 * "2 + 2 = ?"의 산출 값이 에러를 발생시키는 경우를 살펴보자.
 */
function* gen() {
    try {
        let result = yield "2 + 2 = ?"; // (1)

        alert("위에서 에러가 던져졌기 때문에 실행 흐름은 여기까지 다다르지 못한다.")
    } catch (e) {
        alert(e); // 에러 출력
    }
}

generator = gen();

question = generator.next().value;

generator.throw(new Error("데이터베이스에서 답을 찾지 못했습니다.")); // (2)

/* (2)에서 제너레이터 안으로 던진 에러는 yield와 함께 라인 (1)에서 예외를 만든다.
 * 예외는 try..catch에서 잡히고, 관련 정보가 얼럿창에 출력된다.
 * 
 * 제너레이터 안에서 예외를 처리하지 않았다면 예외는 여타 예외와 마찬가지로 제너레이터 호출 코드(외부 코드)로 "떨어져 나온다."
 * generator.throw( 라인 (2) )에서 제너레이터를 호출하고 있으므로 아래와 같이 에러를 여기서 잡아도 된다.
 */
function grn() {
    let result = yield "2 + 2 = ?";  // Error in this line
}

generator = gen();

question = generator.next().value;

try {
    generator.throw(new Error("데이터베이스에서 답을 찾지 못했습니다."));
} catch (e) {
    alert(e); // 에러 출력
}
/* 이렇게 제너레이터 바깥에서 에러를 잡지 못하면 에러는 제너레이터 호출 코드 바깥으로 떨어져 나간다. 
 * 여기서도 에러를 잡지 못하면 스크립트는 죽게 된다.
 */

////////////////////

/** 요약
    * 제너레이터는 제너레이터 함수 function* f(...) {...}을 사용해 만든다.
    * yield 연산자는 제너레이터 안에 있어야 한다.
    * next/yield 호출을 사용하면 외부 코드와 제너레이터 간에 결과를 교환할 수 있다.
 * 
 * 모던 자바스크립트에서는 제너레이터를 잘 사용하지 않는다.
 * 그러나 제너레이터를 사용하면 실행 중에도 제너레이터 호출 코드와 데이터를 교환할 수 있기 때문에 유용한 경우가 종종 있다.
 * 그리고 제너레이터를 사용하면 이터러블 객체를 쉽게 만들 수 있다는 장점도 있다.
 * 
 * for await ... of 루프 안 비동기 데이터 스트림을 다룰 때 사용되는 비동기 제너레이터(async generator)가 있다.
 * 비동기 제너레이터는 페이지네이션을 사용해 전송되는 비동기 데이터 스트림을 다룰 때 사용된다.
 * 
 * 웹프로그래밍에선 데이터 스트림을 다뤄야 하는 경우가 많은데, 제너레이터는 이 경우에 유용하다.
 */

//////////////////////////////

/** 의사 난수 생성기
 * 개발을 하다 보면 임의의 데이터가 필요한 경우가 자주 생깁니다.
 * 테스팅을 진행할 때도 임의의 데이터가 필요할 수 있습니다. 
 * 정형화된 데이터가 아닌 랜덤한 텍스트나 숫자 등을 입력해 테스트를 진행하는 것이 좋기 때문입니다.
 * 
 * 자바스크립트에서는 Math.random()을 사용해 난수를 만들 수 있습니다. 
 * 그런데 테스트 도중 문제가 생겨 테스트를 중단했다가 소스 코드를 고치고 다시 테스트를 재개할 때는
 * 이전에 문제를 일으켰던 데이터와 동일한 데이터를 입력해 같은 문제가 발생하는지 살펴보아야 합니다.
 * 
 * 이를 위해 '고정값 의사 난수 생성기’가 사용됩니다. 
 * 고정값 의사 난수 생성기는 첫 번째 값을 '고정값’으로 삼고, 
 * 생성기 안에 저장된 공식을 사용해 두 번째 값을 생성합니다. 
 * 고정값이 같으면 난수 생성기에서 차례대로 나오는 값들이 동일하므로 
 * 난수 생성 흐름을 쉽게 재현할 수 있습니다. 고정값만 기억해 두면 됩니다.
 * 
 * 다소 균일하게 분포된 값을 생성하는 공식의 예는 다음과 같습니다.
    * next = previous * 16807 % 2147483647
 * 
 * 고정값으로 1을 사용하면 생성기에서 나오는 값은 다음과 같습니다.
    * 1. 16807
    * 2. 282475249
    * 3. 1622650073
    * 4. 기타 등등
 * 이번 과제는 고정값을 받아 위 공식을 사용해 제너레이터를 만들어내는 
 * 함수인 pseudoRandom(seed)을 만드는 것입니다.
 * 
 * 예시:
    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073
 */

function* pseudoRandom(num) {
    let previous = (num * 16807) % 2147483647;
    yield previous;
    while (true) {
      previous = (previous * 16807) % 2147483647;
      yield previous;
    }
  }
  
let generatorA = pseudoRandom(1);

alert(generatorA.next().value); // 16807
alert(generatorA.next().value); // 282475249
alert(generatorA.next().value); // 1622650073
      
/** 해답
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073

 * 다음과 같이 일반 함수를 사용하여 동일한 작업을 수행 할 수 있음에 유의하세요.
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073

 * 일반 함수 또한 제너레이터와 같은 기능을 수행합니다. 
 * 그러나 일반 함수는 for..of을 이용해 반복하여 다른 곳에서 유용할 수 있는 
 * 제너레이터 구성 사용 능력을 잃게 합니다.
 */