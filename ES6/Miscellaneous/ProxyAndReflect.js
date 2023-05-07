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
 * 
 * 객체에 어떤 작업을 할 땐 자바스크립트 명세서에 정의된 '내부 메서드(internal method)'가 깊숙한 곳에서 관여한다.
 * 프로퍼티를 읽을 땐 [[Get]]이라는 내부 메서드가, 프로퍼티에 쓸 땐 [[Set]]이라는 매부 메서드가 관여하게 된다.
 * 이런 내부 메서드들은 명세서에만 정의된 메서드이기 때문에 개발자가 코드를 사용해 호출할 수 없다.
 * 
 * 프록시의 트랩은 내부 메서드의 호출을 가로챈다. 프록시가 가로채는 내부 메서드 리스트는 명세서에 확인 할 수 있다.
 * 
 * 모든 내부 메서드엔 대응하는 트랩이 있다.
 * new Proxy의 handler에 매개변수로 추가할 수 있는 메서드 이름은 핸들러 메서드열을 확인하자.
 */

/** 내부 메서드             핸들러 메서드               작동 시점
 * [[Get]]                  get                         프로퍼티를 읽을 때
 * [[Set]]                  set                         프로퍼티를 쓸 때
 * [[HasProperty]]          has                         `in` 연산자가 동작할 때
 * [[Delete]]               deleteProperty              `delete` 연산자가 동작항 때
 * [[Call]]                 apply                       함수를 호출할 때
 * [[Construct]]            Construct                   `new` 연산자가 동작할 때
 * [[GetPrototypeOf]]       getPrototypeOf              Object.getPrototypeOf
 * [[SetPrototypeOf]]       setPrototypeOf              Object.setPrototypeOf
 * [[IsExtensible]]         isExtensible                Object.isExtensible
 * [[PreventExtensions]]    preventExtensions           Object.preventExtensions
 * [[DefineOwnProperty]]    defineProperty              Object.defineProperty, Object.defineProperties
 * [[GetOwnProperty]]       getOwnPropertyDescriptor    Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
 * [[OwnPropertyKeys]]      ownKeys                     Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object.keys/values/entries
 */

/** ! 규칙
 * 내부 메서드나 트랩을 쓸 땐 자바스크립트에서 정한 몇 가지 규칙(invariant)을 반드시 따라야 한다.
 * 대부분의 규칙은 반환 값과 관련되어있다.
    * 값을 쓰는 게 성공적으로 처리되었으면 [[Set]]은 반드시 true를 반환해야 한다. 그렇지 않은 경우는 false을 반환해야 한다.
    * 값을 지우는 게 성공적으로 처리되었으면 [[Delete]]는 반드시 true를 반환해야 한다. 그렇지 않는 경우는 false을 반환해야 한다.
    * 기타 등등
 * 이 외에 다른 조건도 있다.
    * 프록시 객체를 대상으로 [[GetPrototypeOf]]가 적용되면 프록시 객체의 타깃 객체에 [[GetPrototypeOf]]를 적용한 것과 동일한 값이 반환되어야 한다. 
        프록시의 프로토타입을 읽을 것은 타깃 객체의 프로토타입을 읽는 것과 동일하다.
 * 트랩이 연산을 가로챌 땐 위에서 언급한 규칙을 따라야 한다.
 * 
 * 이와 같은 규칙은 자바스크립트가 일관된 동작을 하고 잘못된 동작이 있으면 이를 고쳐주는 역할을 한다.
 * 규칙 목록은 명세서에서 확인할 수 있다. 아주 이상한 짓을 하지 않는 한 이 규칙을 어길 일은 거의 없을것이다.
 */

////////////////////////////////////////////////////////////////

/** get 트랩으로 프로퍼티 기본값 설정하기
 * 가장 흔히 볼 수 있는 트랩은 프로퍼티를 읽거나 쓸 때 사용되는 트랩이다.
 * 프로퍼티 읽기를 가로채려면 handler에 get(target, property, receiver) 메서드가 있어야 한다.
 * 
 * get 메서드는 프로퍼티를 읽으려고 할 때 작동한다. 인수는 다음과 같다.
   * target - 동작을 전달할 객체로 new Proxy의 첫 번째 인자이다.
   * property - 프로퍼티 이름
   * receiver - 타깃 프로퍼티 getter라면 receiver는 getter가 호출될 때 this이다. 대가는 proxy 객체 자신이 this가 된다.
      프록시 객체를 상속받은 객체가 있다면 해당 객체가 this가 되기도 한다. 
 * 
 * get을 활용해 객체에 기본값을 설정해보자.
 * 예시에서 만들 것은, 존재하지 않는 요소를 읽으려고 할 때 기본값 0을 반환해주는 배열이다.
 * 존재하지 않는 요소를 읽을려고 하면 배열은 원래 undefined을 반환하는데, 
 * 예시에선 배열(객체)을 프록시에 감싸서 존재하지 않는 요소(프로퍼티)를 읽을려고 할 때 0이 반환되도록 하자.
 */

let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
   get(target, prop) {
      if (prop in target) {
         return target[prop];
      } else {
         return 0; // 기본값
      }
   }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 {해당하는 요소가 배열에 없으므로 0이 반환됨}

/* 예시를 통해 알 수 있듯이 get을 사용해 트랩을 만드는 건 상당히 쉽다.
 * Proxy를 사용하면 '기본'값 설정 로직을 원하는 대로 구현할 수 있다.
 * 구절과 번역문이 저장되어있는 사전이 있다고 가정해보자.
 */

let dictionary = {
   'Hello' : '안녕하세요',
   'Bye' : '안녕히 가세요'
};

alert( dictionary['Hello'] ); // 안녕하세요
alert( dictionary['Welcome'] ); // undefined

/* 지금 상태론 dictionary에 없는 구절에 접근하면 undefined가 반환된다. 
 * 사전에 없는 구절을 검색하려 했을 때 undefined가 아닌 구절 그대로를 반환해주는 게 더 좋을 것이다.
 * 
 * dictionary를 프록시로 감싸서 프로퍼티를 읽을려고 할 때 이를 프록시가 가로채도록 하면 원하는 기능을 구현할 수 있다.
 */

dictionary = {
   'Hello' : '안녕하세요',
   'Bye' : '안녕히 가세요'
};

dictionary = new Proxy(dictionary, {
   get(target, phrase) { // 프로퍼티를 읽기를 가로챈다.
      if (phrase in target) { // 조건: 사전에 구절이 있는 경우
         return target[phrase]; // 번역문을 반환한다.
      } else {
         // 구절이 없는 경우엔 구절 그대로를 반환한다.
         return phrase;
      }
   }
});

// 사전을 검색해보자.
// 사전에 없는 구절을 입력하면 입력값이 그대로 반환된다.
alert( dictionary['Hello'] ); // 안녕하세요
alert( dictionary['Welcome to Proxy'] ); // Welcome to Proxy (입력값이 그대로 출력됨)

/* i) 주의:
 * 프록시 객체가 변수를 어떻게 덮어쓰고 있는지 눈여겨보자.

   dictionary = new Proxy(dictionary, ...);

 * 타깃 객체의 위치와 상관없이 프록시 객체는 타깃 객체를 덮어써야만 한다.
 * 객체를 프록시로 감싼 이후엔 절대로 타깃 객체를 참조하는 코드가 없어야 한다.
 * 그렇지 않으면 엉망이 될 확률이 아주 높아진다.
 */