/** iterable 객체
 * 반복 가능한(iterable, 이터러블) 객체는 배열을 일반화한 객체이다. 
 * 이터러블 이라는 개념은 어떤 객체에든 `for..of` 반복문을 적용할 수 있다.
 * 
 * 배열은 대표적인 이터러블이다. 배열 외에도 다수의 내장 객체가 반복 가능하다. 문자열 역시 이터러블의 예다.
 * 배열이 아닌 객체가 있는데, 이 객체가 어떤 것들의 컬렉션(목록, 집합 등)을 나타내고 있는 경우,
 * `for...of` 문법을 적용할 수만 있다면 컬렉션을 순회하는데 유용할 것이다.
 */

/** Symbol.iterator
 * 직접 이터러블 객체를 만들어 보자.
 * `for...of`를 적용하기에 적합해 보이는 배열이 아닌 객체를 만들어보자.

// 객체 range는 숫자 간격을 나타내고 있다.
let range = {
    from: 1,
    to: 5
};
// 아래와 같이 for..of가 동작할 수 있도록 하는게 목표
// for(let num of range) ... num=i,2,3,4,5

 * range를 이터러블로 만들려면(for...of가 동작하도록 하려면) 객체에 Symbol.iterator(특수 내장 심볼)라는 메서드를 추가해 아래와 같이 일어나도록 해야한다. 
 * 1. for..of가 시작되자마자 for..of는 Symbol.iterator를 호출한다.(Symbol.iterator가 없으면 에러가 발생한다.)
 *      Symbol.iterator는 반드시 이터레이터(iterator, 메서드 next가 있는 객체)를 반환해야한다.
 * 2. 이후 for..of는 반환된 객체(이터레이터)만을 대상으로 동작한다.
 * 3. for..of에 다음 값이 필요하면, for..of는 이터레이터의 next() 메서드를 호출한다.
 * 4. next()의 반환 값은 {done: Boolean, value: any}와 같은 형태이어야 한다. done=true는 반복이 종료되었음을 의미한다.
 *      done=false일땐, value에 다음 값이 저장된다.
 */

// range를 반복 가능한 객체로 만들어 주는 코드는 아래와 같다.
let range = {
    from: 1,
    to: 5
};

// 1. for..of 최초 호출 시, Symbol.iterator가 호출된다.
range[Symbol.iterator] = function () {

    // Symbol.iterator는 이터레이터 객체를 반환한다.
    // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해진다.
    return {
        current: this.from,
        last: this.to,

        // 3. for..of 반복문에 의해 반복마다 next()가 호출된다.
        next() {
            // 4. next()는 값을 객체 {done:..., value:...} 형태로 반환해야 한다.
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

for (let num of range) {
    alert(num); // 1, then 2, 3, 4, 5
}

/* 이터러블 객체의 핵심은 '관심사의 분리(Separation of concern, SoC)'에 있다.
    * range엔 메서드 next()가 없다.
    * 대신 range[Symbol.iterator]()를 호출해서 만든 '이터레이터' 객체와 이 객체의 메서드 next()에서 반복에 사용될 값을 만들어 낸다.
 * 이렇게 하면 이터레이터 객체와 반복 대상인 객체를 분리 할 수 있다.
 * 
 * 이터레이터 객체와 반복 대상 객체를 합쳐서 range 자체를 이터레이터로 만들면 코드가 더 간단해진다.
 */

range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) return { done: false, value: this.current++ };
        else return { done: true };
    }
};

for (let num of range) {
    alert(num); // 1, 2, 3, 4, 5
};

/* 이제 range[Symbol.iterator]()가 객체 range 자체를 반환한다. 반환된 객체엔 필수 메서드인 next()가 있고
   this.current에 반복이 얼마나 진행되었는지를 나타내는 값도 저장되어 있다.
   코드는 더 짧아졌다. 이렇게 작성하는 게 좋을 때가 종종 있다.

   단점은 두 개의 for..of 반복문을 하나의 객체에 동시에 사용할 수 없다는 점이다.
   이터레이터(객체 자신)가 하나뿐이어서 두 반복문이 반복상태를 공유하기 때문이다. 
   그런데 동시에 두 개의 for..of를 사용하는 것은 비동기 처리에서도 흔한 케이스는 아니다.
*/

/** 무한개의 이터레이터
 * 무수히 많은 이터레이터도 가능하다. range에서 range.to에 `Infinity`를 할당하면 `range`가 무한대가 된다.
 * 무수히 많은 의사난수(pseudorandom numbers)를 생성하는 이터러블 객체를 만드는 것도 가능하다.
 * 이 방법이 유용하게 쓰이는 경우도 있다.
 * 
 * next엔 제약사항이 없다. next가 값을 계속 반환하는 것은 정상적인 동작이다.
 * 물론 위와 같은 이터러블에 for..of 반복문을 사용하면 끝이 없을 것이다.
 * 그렇다 하더라도 break를 사용하면 언제든지 반복을 멈출 수 있다.
 */

////////////////////////////

/** 문자열은 이터러블이다.
 * 배열과 문자열은 가장 광범위하게 쓰이는 내장 이터러블이다.
 * for..of는 문자열의 각 글자를 순회한다.
 */

for (let char of "test") {
    // 글자 하나당 한 번 실행된다.(4회 호출).
    alert(char); // t, e, s, t가 차례대로 출력됨
};

// 서로게이트 쌍(surrogate pair)에도 잘 동작한다.
let str = '👒🍕🍕';
for (let char of str) {
    alert(char); // 👒🍕🍕가 차례대로 출력됨
}

///////////////////////////

/** 이터레이터를 명시적으로 호출하기
 * 이터레이터를 어떻게 명시적으로 사용할 수 있는지 살펴보면서 좀 더 깊게 이해해보자.
 * for..of를 사용했을 때와 동일한 방법으로 문자열을 순회할 것이다.
 * 하지만 직접 호출을 통해서 순회해보자.
 * 다음 코드는 문자열 이터레이터를 만들고, 여기서 값을 '수동으로' 가져온다.
 */

let string = "Hello";

// for..of를 사용한 것과 동일한 작업을 한다.
// for (let char of str) alert(char);

let iterator = string[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    alert(result.value); // 글자가 하나씩 출력된다.
}

/* 이터레이터를 명시적으로 호출하는 경우는 거의 없는데,
   이 방법을 사용하면 for..of를 사용하는 것보다 반복 과정을 더 잘 통제할 수 있다는 장점이 있다.
   반복을 시작했다가 잠시 멈춰 다른 작업을 하다가 다시 반복을 시작하는 것과 같이 반복 과정을 여러 개로 쪼개는 것이 가능하다. */

///////////////////////////

/** 이터러블과 유사 배열
 * 비슷해 보이지만 아주 다른 용어 두가지가 있다. 헷갈리지 않으려면 두 용어를 잘 이해하고 있어야 한다.
    * 이터러블(iterable)은 위에서 설명한 바와 같이 메서드 Symbol.iterator가 구현된 객체이다.
    * 유사 배열(array-like)은 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체이다.
 * 브라우저 등의 호스트 환경에서 자바스크립트를 사용해 문제를 해결할 때 이터러블 객체나 유사 배열 객체 혹은 둘 다인 객체를 만날 수 있다.
 * 이터러블 객체(for..of를 사용할 수 있음)이면서 유사배열 객체(숫자 인덱스와 length 프로퍼티가 있음)인 문자열이 대표적인 예이다.
 * 이터러블 객체라고 해서 유사 배열 객체가 아니다. 유사 배열 객체라고 해서 이터러블 객체인 것도 아니다.
 * 위 예시의 range는 이터러블 객체이긴 하지만 인덱스도 없고 length 프로퍼티도 없으므로 유사 배열 객체가 아니다.
 */

// 아래 예시의 객체는 유사 배열 객체이긴 하지만 이터러블 객체가 아니다.
let arrayLike = { // 인덱스와 length프로퍼티가 있음 => 유사 배열
    0: "Hello",
    1: "World",
    length: 2
};

// Symbol.iterator가 없으므로 에러 발생
for (let item of arrayLike) { };
/* 이터러블과 유사 배열은 대개 배열이 아니기 때문에 push, pop 등의 메서드를 지원하지 않는다. 
   이터러블과 유사 배열을 배열처럼 다루고 싶을 때 이런 특징은 불편하다.
   range에 배열 메서드를 사용해 무언가를 하고 싶을 때처럼, 어떻게 하면 이터러블과 유사 배열에 배열 메서드를 적용할 수 있을까? */

/** Array.from
 * 범용 메서드 Array.from는 이터러블이나 유사 배열을 받아 '진짜' Array를 만들어 준다. 
 * 이 과정을 거치면 이터러블이나 유사 배열에 배열 메서드를 사용할 수 있다.
 */

let array = Array.from(arrayLike); // (*)
alert(array.pop()); // World (메서드가 제대로 동작한다.)

/* (*)로 표시한 줄에 있는 Array.from은 객체를 받아 이터러블이나 유사 배열인지 조사한다. 
   넘겨 받은 인수가 이터러블이나 유사 배열인 경우, 새로운 배열을 만들고 객체의 모든 요소를 새롭게 만든 배열로 복사한다. */

// 이터러블을 사용한 예시는 다음과 같다.
// range는 위쪽 예시에서 그대로 사용
let arrIterable = Array.from(range);
alert(arr); // 1, 2, 3, 4, 5 (배열-문자열 형 변환이 제대로 동작한다.)

/* Array.from엔 '매핑(mapping)' 함수를 선택적으로 넘겨줄 수 있다.
    Array.from(obj[, mapFn, thisArg])

   mapFn을 두 번째 인수로 넘겨주면 새로운 배열에 obj의 요소를 추가하기 전에 각 요소를 대상으로 mapFn을 적용할 수 있다.
   새로운 배열엔 mapFn을 적용하고 반환된 값이 추가된다. 세 번째 인수 thisArg는 각 요소의 this를 지정할 수 있도록 해준다. 
 */

// 각 숫자를 제곱
let arrMappingFrom = Array.from(range, num => num * num);

alert(arrMappingFrom); // 1, 4, 9, 16, 25

// 아래 예시는 Array.from를 사용해 문자열을 배열로 만들어본다.
str = '𝒳😂';

let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2

/* Array.from은 str.split과 달리, 문자열 자체가 가진 이터러블 속성을 이용해 동작한다. 
   따라서 for..of처럼 서로게이트 쌍에도 제대로 적용된다. 
 */

// 위 예시는 기술적으로 아래 예시와 동일하게 동작한다고 보면 된다.

str = '𝒳😂';

chars = []; // Array.from 내부에선 아래와 동일한 반복문이 돌아간다.
for (let char of str) {
    chars.push(char);
}

alert(chars);

/* 어쨌든 Array.from을 사용한 예시가 더 짧다.
Array.from을 사용하면 서로게이트 쌍을 처리할 수 있는 slice를 직접 구현할 수도 있다. */
function slice(str, start, end) {
    return Array.from(str).slice(start, end).join('');
}

str = '𝒳😂𩷶';

alert(slice(str, 1, 3)); // 😂𩷶

// 내장 순수 메서드는 서로게이트 쌍을 지원하지 않는다.
alert(str.slice(1, 3)); // 쓰레깃값 출력 (영역이 다른 특수 값)

////////////////////////

/** 요약
 * for..of을 사용할 수 있는 객체를 이터러블이라고 부른다.
    * 이터러블엔 메서드 Symbol.iterator가 반드시 구현되어 있어야 한다.
        * obj[Symbol.iterator]의 결과는 이터레이터라고 부른다. 이터레이터는 이어지는 반복 과정을 처리한다.
        * 이터레이터엔 객체 {done: Boolean, value: any}을 반환하는 메서드 next()가 반드시 구현되어 있어야 한다.
          여기서 done:true은 반복이 끝났음을 의미하고, 그렇지 않는 경우엔 value가 다음 값이 된다.
    * 메서드 Symbol.iterator는 for..of에 의해 자동으로 호출되는데, 개발자가 명시적으로 호출하는 것도 가능하다.
    * 문자열이나 배열 같은 내장 이터러블에도 Symbol.iterator가 구현되어 있다.
    * 문자열 이터레이터는 서로게이트 쌍을 지원한다.
 * 
 * 인덱스와 length 프로퍼티가 있는 객체는 유사 배열이라 불린다. 
 * 유사 배열 객체엔 다양한 프로퍼티와 메서드가 있을 수 있는데 배열 내장 메서드는 없다.
 * 
 * 명세서를 보면 대부분의 메서드는 '진짜'배열이 아닌 이터러블이나 유사 배열을 대상으로 동작한다고 쓰여 있는걸 볼 수 있다.
 * 이 방법이 더 추상적이기 때문이다.
 * 
 * Array.from(obj[, mapFn, thisArg])을 사용하면 이터러블이나 유사 배열인 obj를 진짜 Array로 만들수 있다.
 * 이렇게 하면 obj에도 배열 메서드를 사용할 수 있다. 선택 인수 mapFn와 thisArg는 각 요소에 함수를 적용할 수 있게 해준다.
 */