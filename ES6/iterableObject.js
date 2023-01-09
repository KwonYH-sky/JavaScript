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
 */