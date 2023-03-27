/** async 이터레이터와 제너레이터
 * 비동기 이터레이터(asynchronous iterator)를 사용하면 비동기적으로 들어오는 데이터를 필요에 따라 처리할 수 있다.
 * 네트워트를 통해 데이터가 여러 번에 걸쳐 들어오는 상황을 처리할 수 있게 된다.
 * 비동기 이터레이터에 더하여 비동기 제너레이터(asynchronous generator)를 사용하면 이런 데이터를 좀 더 편리하게 처리할 수 있다.
 * 
 * 먼저 간단한 예시를 살펴보며 문법을 익힌 후, 실무에서 벌어질 법한 사례를 가지고
 * async 이터레이터와 제너레이터가 어떻게 사용되는지 알아보자.
 */

/** async 이터레이터
 * 비동기 이러테이터는 일반 이터레이터와 유사하며, 약간의 문법적인 차이가 있다.
 * 
 * 다음은 '일반' 이터러블 객체이다.
 */
let range = {
    from: 1,
    to: 5,

    // for..of 최초 호출 시, Symbol.iterator가 호출된다.
    [Symbol.iterator]() {
        // Symbol.iterator 메서드는 이터레이터 객체를 반환한다.
        // 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 
        // 다음 값은 next()에서 정해진다.
        return {
            current: this.from,
            last: this.to,

            // for..of 반복문에 의해 각 이레이션마다 next()가 호출된다.
            next() {
                // next()는 객체 형태의 값, {done:..., value:...}을 반환해야한다.
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (let value of range) {
    alert(value); // 1, 2, 3, 4, 5
}

/* 이터러블 객체를 비동기적으로 만들려면 어떤 작업이 필요한지 알아보자.
    * 1. Symbol.iterator 대신, Symbol.asyncIterator를 사용해야 한다.
    * 2. next()는 프라미스를 반환해야 한다.
    * 3. 비동기 이터러블 객체를 대상으로 하는 반복작업은 for await (let item of iterable) 반복문으로 사용해 처리해야 한다.
 * 
 * 익숙한 예시인 이터러블 객체 range를 토대로, 일초마다 비동기적으로 같은 값을 반환하는 이터르블 객체를 만들어보자.
 */
range = {
    from: 1,
    to: 5,

    // for await..of 최초 호출 시, Symbol.asyncIterator가 호출된다.
    [Symbol.asyncIterator]() { // (1)
        // Symbol.asyncIterator 메서드는 이터레이터 객체를 반환한다.
        // 이후 for await..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 
        // 다음 값은 next()에서 정해진다.
        return {
            current: this.from,
            last: this.to,

            // for await..of 반복문에 의해 각 이터레이션마다 next()가 호출된다.
            async next() { // (2)
                // next()는 객체 형태의 값, {done:..., value:...}을 반환한다.
                // (객체는 async에 의해 자동으로 프라미스로 감싸진다.)

                // 비동기로 무언가를 하기 위해 await를 사용할 수 있다.
                await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

(async () => {
    for await (let value of range) { // (4)
        alert(value); // 1, 2, 3, 4, 5
    }
})()

/* 위 예시에서 볼 수 있듯이, async 이터레이터는 일반 이터레이터와 구조가 유사한다. 하지만 아래와 같은 차이가 있다.
    * 1. 객체를 비동기적으로 반복 가능하도록 하려면, Symbol.asyncIterator 메서드가 반드시 구현되어 있어야 한다. - (1)
    * 2. Symbol.asyncIterator는 프라미스를 반환하는 메서드인 next()가 구현된 객체를 반환해야 한다. - (2)
    * 3. next()는 async 메서드일 필요는 없다. 프라미스를 반환하는 메서드라면 일반 메서드도 괜찮다.
        다만, async를 사용하면 await도 사용할 수 있기 때문에, 여기선 편의상 async 메서드를 사용해 일 초의 딜레이가 생기도록 했다. - (3)
    * 4. 반복 작업을 하려면 'for' 뒤에 'await'를 붙인 `for await (let value of range)`를 사용하면 된다.
        `for await (let value of range)`가 실행될 때 range[Symbol.asyncIterator]()가 일회 호출되는데, 
        그 이후엔 각 값을 대상으로 next()가 호출된다. - (4)
 * 
 * 일반 이터레이터와 async 이터레이터를 간략하게 비교하면 다음과 같다.
                                    * 이터레이터      / async 이터레이터
 * 이터레이터가 제공해주는 메서드   - Symbol.iterator / Symbol.asyncIterator
 * next()가 반환하는 값             - 모든 값         / Promise
 * 반복 작업을 위해 사용하는 반복문 - for..of         / for await..of
 */

/** !) 전개 문법 `...`은 비동기적으로 동작하지 않는다.
 * 일반적인 동기 이터레이터가 필요한 기능을 비동기 이터레이터와 함께 사용할 수 없다.
 * 전개 문법은 일반 이터레이터가 필요로 하므로 아래와 같은 코드는 동작하지 않는다.
 
    alert( [...range] ); // Symbol.iterator가 없기 때문에 에러 발생
    
 * 전개 문법은 await가 없는 for..of와 마찬가지로, 
 * Symbol.asyncIterator가 아닌 Symbol.iterator를 찾기 때문에 에러가 발생하는 것은 당연하다.
 */

///////////////////////////////////////////////////////////////

/** async 제너레이터
 * 자바스크립트는 제너레이터를 사용할 수 있는데, 제너레이터는 이터러블 객체이다.
 * 다음은 이전에 사용한 start부터 end까지 연속의 숫자를 생성해주는 제너레이터이다.
 */
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (let value of generateSequence(1, 5)) {
    alert(value); // 1, then 2, then 3, then 4, then 5
}

/* 일반 제너레이터에선 await를 사용할 수 없다. 그리고 모든 값은 동기적으로 생산된다.
 * for..of 어디에서도 딜레이를 줄 만한 곳이 없다. 일반 제너레이터는 동기적 문법이다.
 * 
 * 그런데 제너레이터 본문에서 await를 사용해야만 하는 상황이 발생하면 어떻게 해야할까?
 * 아래와 같이 네트워크를 요청해야하는 상황같은 사례가 발생한다면 말이다.
 * 
 * 아래 예시 처럼 async를 제너레이터 함수 앞에 붙여주면 된다.
 */
async function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        // await를 사용할 수 있다.
        await new Promise(resolve => setTimeout(resolve, 1000));

        yield i;
    }

}

(async () => {

    let generator = generateSequence(1, 5);
    for await (let value of generator) {
        alert(value); // 1, 2, 3, 4, 5
    }

})();

/* 이제 for await...of로 반복 가능한 async 제너레이터를 사용할 수 있게 되었다.
 * async 제너레이터를 만드는 것은 실제로도 상당히 간단하다. 
 * async 키워드를 붙이기만 하면 제너레이터 안에서 프라미스와 기타 async 함수를 기반으로 동작하는 await를 사용할 수 있다.
 * 
 * async 제너레이터의 generator.next() 메서드는 비동기적이 되고, 프라미스를 반환한다는 점은 일반 제너레이터와 async 제너레이터엔 또 다른 차이이다.
 * 일반 제너레이터에서는 result = generator.next()를 사용해 값을 얻는다.
 * 반면 async 제너레이터에서는 아래와 같이 await를 붙여줘야한다.
 
    result = await generator.next(); // result = {value:..., done: true/ false}

 */

//////////////////////////////////////////////////////

/** async 이터러블
 * 반복 가능한 객체를 만들려면 객체에 Symbol.iterator를 추가해야 한다.

let range = = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        return <range를 반복가능하게 만드는 next가 구현된 객체>
    }
}

 * 그런데 Symbol.iterator는 위 예시와 같이 next가 구현된 일반 객체를 반환하는 것 보다, 
 * 제너레이터를 반환하도록 구현하는 경우가 더 많다.
 * 
 * 제너레이터 예시를 다기 상기해보자.
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

for (let value of range) {
    alert(value); 1, 2, 3, 4, 5
}
/* 위 예시에서 커스텀 객체 range는 반복 가능하고, 
 * 제너레이터 *[Symbol.iterator]엔 값을 나열해주는 로직이 구현되어 있다.
 * 지금 상태에서 제너레이터에 비동기 동작을 추가하려면,
 * Symbol.iterator를 async Symbol.asyncIterator로 바꿔야 한다.
 */

range = {
    from: 1,
    to: 5,

    async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*()와 동일
        for (let value = this.from; value < this.to; value++) {

            // 값 사이 사이에 약간의 공백을 줌
            await new Promise(resolve => setTimeout(resolve , 1000));

            yield value;
        }
    }
};

(async () => {

    for (let value of range) {
        alert(value); // 1, 2, 3, 4, 5
    }

})();

/* 이제 1초의 간격을 두고 값을 얻을 수 있다. */

//////////////////////////////////////////////////////////////////////////