/** 프라미스화
 * 콜백을 받은 함수를 프라미스를 반환하는 함수를 바꾸는 것을 '프라미스화(promisification)'라고 한다.
 * 
 * 기능을 구현 하다 보면 콜백보다는 프라미스가 더 편리하기 때문에
 * 콜백 기반 함수와 라이브러리를 프라미스를 반환하는 함수로 바꾸는 게 좋은 경우가 종종 생긴다.
 * 
 * 이전에 사용했던 loadScript(src, callback) 예시를 사용해 프라미스화에 대해 알아보자.
 */
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

    document.head.append(script);
}

// 사용법:
// loadScript('path/script.js', (err, script) => {...})

/* loadScript(src, callback)를 이제 프라미스화 해보자. 
 * 새로운 함수 loadScriptPromise(src)는 loadScript와 동일하게 동작하지만
 * callback을 제외한 src만 인수로 받아야 하고, 프라미스를 반환해야 한다.
 */
let loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err);
            else resolve(script);
        });
    });
};

// 사용법:
// loadScriptPromise('path/script.js').then(...)

/* 새롭게 구현한 loadScriptPromise는 프라미스 기반 코드와 잘 융화된다.
 * 예시에서 볼 수 있듯이, loadScriptPromise는 기존 함수 loadScript에 모든 일을 위임한다.
 * loadScript의 콜백은 스크립트 로딩 상태에 따라 이행 혹은 거부 상태의 프라미스를 반환한다.
 * 
 * 그런데 실무에선 함수 하나가 아닌 여러 개의 함수를 프라미스화 해야할 것이다. 헬퍼 함수를 만드는 것이 좋을 것이다.
 * 프라미스화를 적용 할 함수 f를 받고 래퍼 함수를 반환하는 함수 promisify(f)를 만들어 보자.
 * promisify(f)가 반환하는 래퍼 함수는 위 예시와 동일하게 동작할 것이다.
 * 프라미스를 반환하고 호출을 기존 함수 f에 전달하여 커스텀 콜백 내의 결과를 추적해야 한다.
 */

function promisify(f) {
    return function (...args) { // 래퍼 함수를 반환함
        return new Promise((resolve, reject) => {
            function callback(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가한다.

            f.call(this, ...args); // 기존 함수를 호출한다.
        });
    };
};

// 사용법
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);

/* 위 예시는 프라미스화 할 함수가 인수가 두 개((err, result))인 콜백을 받을 것이라 가정하고 작성되었다.
 * 십중팔구 이런 상황일 것이고, 커스텀 콜백은 이 상황에 딱 들어 맞는다.
 * 
 * 그런데 함수 f가 두 개를 초과하는 인수를 가진 콜백, callback(err, res1, res2, ...)을 받는다면 어떤 일이 발생할까?
 * 이런 경우를 대비하여 좀 더 진화한 헬퍼 함수, promisify를 만들어 보자.
 * 새롭게 만든 함수를 promisify(f, true)형태로 호출하면, 프라미스 결과는 콜백의 성공 케이스(results)를 담은 배열, [res1, res2, ...]이 된다.
 */
// 콜백의 성공 결과를 담은 배열을 얻게 해주는 promisify(f, true)
function promisify(f, manyArgs = false) {
    return function (...args) { 
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // f에 사용할 커스텀 콜백
                if (err) {
                    reject(err);
                } else {
                    // manyArgs가 구체적으로 명시되었다면, 콜백의 성공 케이스와 함께 이행 상태가 된다.
                    resolve(manyArgs ? results: results[0]);
                }
            }

            args.push(callback);

            f.call(this, ...args); 
        });
    };
};

// 사용법:
// f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ... )

/* callback(result) 같이 err이 없는 형태나 지금까지 언급하지 않는 형태의 이색적인 콜백도 있을 수 있는데,
 * 이런 경우엔 헬퍼 함수를 사용하지 않고 직접 프라미스화 하면 된다.
 * 
 * 앞서 설명한 헬퍼 함수보다 유용한 형태의 프라미스화를 도와주는 함수를 제공하는 모듈도 많다.
 * es6-promisify가 대표적인 예이다.
 * Node.js에선 내장 함수 util.promisify를 사용해 프라미스화를 할 수 있다.
 */

/** i 주의 : 
 * 프라미스화는 async/await와 함께 사용하면 더 좋다.
 * 다만, 콜백을 완전히 대체하지 못한다는 사실을 기억해두자.
 * 
 * 프라미스는 하나의 결과만 가질 수 있지만, 콜백은 여러 번 호출할 수 있기 때문이다.
 * 따라서 프라미스화는 콜백을 단 한 번 호출하는 함수에만 적용하기 바란다.
 * 프라미스화한 함수의 콜백을 여러 번 호출해도, 두 번째 부터는 무시된다.
 */