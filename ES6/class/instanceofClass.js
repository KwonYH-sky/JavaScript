/** 'instanceof'로 클래스 확인하기
 * instanceof 연산자를 사용하면 객체가 특정 클래스에 속하는지 아닌지 확인 할 수 있다.
 * 확인 기능은 다양한 곳에서 쓰이는데, 
 * instanceof를 사용해 인스의 타입에 따라 이를 다르게 처리하는 다형적인(polymorphic)함수를 만드는데 사용해 보자.
 */

/** instanceof 연산자
 * 문법은 아래와 같다.
    obj instanceof Class
 * obj가 Class에 속하거나 Class를 상속받는 클래스에 속하면 true가 반환된다.
 */

class Rabbit {}
let rabbit = new Rabbit();

// rabbit이 클래스 Rabbit의 객체인가요?
alert(rabbit instanceof Rabbit); // true

/* instanceof는 생성자 함수에서도 사용할 수 있다. */

// 클래스가 아닌 생성자 함수

function Rabbit() {}

alert( new Rabbit() instanceof Rabbit); // true

/* Array 같은 내장 클래스에도 사용할 수 있다. */

let arr = [1, 2, 3];
alert(arr instanceof Array); // true
alert(arr instanceof Object); // true

/* 위 예시에서 arr은 클래스 Object에도 속한다는 점에 주목하자.
 * Array는 프로토타입 기반으로 Object를 상속받았다.
 * instanceof 연산자는 보통, 프로토타입 체인을 거슬러 올라가며 인스턴스 여부나 상속 여부를 확인한다.
 * 그런데 정적메서드 Symbol.hasInstance을 사용하면 직접 확인 로직을 설정할 수도 있다.
 * 
 * obj instanceof Class은 대략 아래와 같은 알고리즘으로 동작한다.
    * 1. 클래스에 정적 메서드 Symbol.hasInstance가 구현되어 있으면, obj instanceof Class문이 실행될 때,
        Class[Symbol.hasInstance](obj)가 호출된다. 호출 결과는 true나 false이어야 한다.
        이런 규칙 기반으로 instanceof의 동작을 커스터마이징 할 수 있다.

        예시:
        // canEat 프로퍼티가 있으면 animal이라고 판단할 수 있도록
        // instanceof의 로직을 직접 설정한다.
        class Animal {
            static [Symbol.hasInstance](obj) {
                if (obj.canEat) return true;
            }
        }
        let obj = { canEat: true };

        alert(obj instanceof Animal); // true, Animal[Symbol.hasInstance](obj)가 호출됨
    * 2. 그런데, 대부분의 클래스엔 Symbol.hasInstance가 구현되어있지 않다. 이럴 땐 일반적인 로직이 사용된다.
        obj instanceof Class는 Class.prototype이 obj 프로토타입 체인 상의 프로토타입 중 하나와 일치하는지 확인한다.

        비교는 차례 차례 진행된다.
        obj.__proto__ === Class.prototype?
        obj.__proto__.__proto__ === Class.prototype?
        obj.__proto__.__proto__.__proto__ === Class.prototype?
        ...
        // 이 중 하나라도 true라면 true를 반환한다.
        // 그렇지 않고 체인의 끝에 도달하면 false를 반환한다.

        위 예시에서 rabbit.__proto__ === Rabbit.prototype가 true이기 때문에 instanceof는 true를 반환한다.
        상속받은 클래스를 사용하는 경우엔 두 번째 단계에서 일치 여부가 확인된다.

        class Animal {}
        class Rabbit extends Animal {}

        let rabbit = new Rabbit();
        alert(rabbit instanceof Animal); // true

        // rabbit.__proto__ === Rabbit.prototype
        // rabbit.__proto__.__proto__ === Animal.prototype (일치!)

        한편, objA가 objB의 프로토타입 체인 상 어딘가에 있으면 true를 반환해주는 메서드,
        objA.isPrototypeOf(objB)도 있다.
        obj instanceof Class는 Class.prototype.isPrototypeOf(obj)와 동일하다.

        isPrototypeOf는 Class 생성자를 제외하고 포함 여부를 검사하는 점이 조금 특이하다.
        검사 시, 프로토타입 체인과 Class.prototype만 고려한다.

        isPrototypeOf의 이런 특징은 객체 생성 후 prototype 프로퍼티가 변경되는 경우 특이한 결과를 초래하기도 한다.
        아래와 같이 말이다.

        예시:
        function Rabbit() {}
        let rabbit = new Rabbit();

        // 프로토타입이 변경됨
        Rabbit.prototype = {}

        // 더 이상 Rabbit이 아니다.
        alert( rabbit instanceof Rabbit ); // false
        
 * 
 */

///////////////////////////////////

/** 타입 확인을 위한 Object.prototype.toString
 * 일반 객체를 문자열로 변화하면 [object Object]가 된다.
 */

let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // 같은 결과가 출력됨.

/* 이렇게 [object Object]가 되는 이유는 toString의 구현 방식 때문이다. 
 * 그런데 toString엔 toString을 더 강력하게 만들어 주는 기능이 숨겨져 있다.
 * toString의 숨겨진 기능을 사용하면 확장 typeof, instanceof의 대안을 만들 수 있다.
 * 
 * 명세서에 따르면, 객체에서 내장 toString을 추출하는 게 가능하다.
 * 이렇게 추출한 메서드는 몯느 값을 대상으로 실행할 수 있다. 호출 결과는 값에 따라 달라진다.
    * 숫자형 - [object Number]
    * 불린형 - [object Boolean]
    * null - [object Null]
    * undefined - [object Undefined]
    * 배열 - [object Array]
    * 그외 - 커스터마이징 가능
 */

// 편의를 위해 toString 메서드를 변수에 복사함
let objectToString = Object.prototype.toString;

arr = [];

alert(objectToString.call(arr)); // [object Array]

/* call을 사용해 컨텍스트를 this=arr로 설정하고 함수 objectToString를 실행하였다.
 * toString 알고리즘은 내부적으로 this를 검사하고 상응하는 결과를 반환한다.
 */

let s = Object.prototype.toString;

alert(s.call(123)); // [object Number]
alert(s.call(null)); // [object Null]
alert(s.call(alert)); // [object Function]

/** Symbol.toStringTag
 * 특수 객체 프로퍼티 Symbol.toStringTag를 사용하면 toString의 동작을 커스터마이징할 수 있다.
 */

let user = {
    [Symbol.toStringTag]: "User"
};

alert({}.toString.call(user)); // [Object User]

/* 대부분의 호스팅 환경 자체 객체에 이와 유사한 프로퍼티를 구현해 놓고 있다.
   브라우저 관련 예시 몇 가지를 보자. */

// 특정 호스팅 환경의 객체와 클래스에 구현된 toStringTag
alert(window[Symbol.toStringTag]); // window
alert(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

alert( {}.toString.call(window)); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]

/* 실횅 결과에서 보듯이 호스트 환경 고유 객체의 Symbol.toStringTag 값은 [object ...]로 쌓여진 값과 동일하다.
 * 
 * 이처럼 'typeof' 연산자의 강력한 변형들(toString과 toStringTag)은 원시 자료형뿐만 아니라 내장 객체에도 사용할 수 있다.
 * 그리고 커스터마이징까지 가능하다.
 * 
 * 내장 객체의 타입 확인을 넘어서 타입을 문자열 형태로 받고 싶다면 instanceof 대신, {}.toString.call을 사용할 수 있다.
 */

/////////////////////////////////////////////////////////////////

/** 요약
 * 타입 확인 메서드 요약
    *        - 동작대상 - 반환값
    * typeof - 원시형   - 문자열
    * {}.toString - 원시형, 내장객체, Symbol.toStringTag가 있는 객체 - 문자열
    * instanceof - 객체 - true나 false
 * 
 * 앞서 보았듯이 {}.toString은 typeof보다 '기능이 더' 많다.
 * instanceof 연산자는 계층 구조를 가진 클래스를 다룰 때나 클래스의 상속 여부를 확인하고자 할 때 그 진가를 발휘한다.
 */

////////////////////////////////////////////////////////////////

/** 이상한 instanceof
 * 아래 예시에서 a는 B()를 통해 생성하지 않았습니다. 그런데도 instanceof는 왜 true를 반환할까요?
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // true
 */
// a의 프로토타입이 B 프로토타입을 가리키기 때문
/* 해답
instanceof는 평가 시, 함수는 고려하지 않고 평가 대상의 prototype을 고려합니다. 
평가 대상의 prototype이 프로토타입 체인 상에 있는 프로토타입과 일치하는지 여부를 고려하죠.

문제에서 a.__proto__ == B.prototype이므로, instanceof는 true를 반환합니다.

instanceof의 내부 알고리즘에 의해 prototype은 생성자 함수가 아닌 타입을 정의합니다.
*/