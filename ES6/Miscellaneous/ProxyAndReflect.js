/** Proxy와 Reflect
 * Proxy는 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체로,
 * 가로채진 작업은 Proxy 자체에서 처리되기도 하고, 원래 객체가 처리하도록 그대도 전달되기도 한다.
 * 
 * 프록시는 다양한 라이브러리와 몇몇 브라우저 프레임워크에서 사용하고 있다. 
 */

/** Proxy
 * 문법:
    let proxy = new Proxy(target, handler)
    * target - 감싸게 될 객체로, 함수를 포함한 모든 객체가 가능하다.
    * handler - 동작을 가로채는 메서드인 '트랩(trap)'이 담긴 객체로, 여기서 프록시를 설정한다.
        (예시: get 트랩은 target의 프로퍼티를 읽을 때, set 트랩은 target의 프로퍼티를 쓸 때 활성화됨).
 * 
 * proxy에 작업이 가해지고, handler에 작업과 사응하는 트랩이 있으면 트랩이 실행되어 프록시가 이 작업을 처리할 기회를 얻게 된다.
 * 트랩이 없으면 target에 작업이 수행한다.
 * 
 * 먼저 트랩이 없는 프록시를 사용하는 예시를 보자.
 */
let target = {};
let proxy = new Proxy(target, {}); // 빈 핸들러

proxy.test = 5; // 프록시에 값을 쓴다. -- (1)
alert(target.test); // 5, target에 새로운 프로퍼티가 생겼다.

alert(proxy.test); // 5, 프록시를 사용해 값을 읽을 수도 있다. -- (2)

for (let key in proxy) alert(key); // test, 반복도 잘 동작한다. -- (3)

/* 위 예시의 프록시엔 트랩이 없기 때문에 proxy에 가해지는 모든 작업은 target에 전달 된다.
 * 1. `proxy.test=`를 이용해 값을 쓰면 target에 새로운 값이 설정된다.
 * 2. `proxy.test`를 이용해 값을 읽으면 target에서 값을 읽어온다.
 * 3. `proxy`를 대상으로 반복 작업을 하면 target에 저장된 값이 반환된다.
 * 
 * 트랩이 없으면 proxy는 target을 둘러싸는 투명한 래퍼가 된다.
 * 
 * Proxy는 일반 객체와는 다른 행동 양상을 보이는 '특수 객체(exotic object)'이다. 프로퍼티가 없다.
 * handler가 비어있으면 Proxy에 가해지는 작업은 target에 곧바로 전달된다.
 */