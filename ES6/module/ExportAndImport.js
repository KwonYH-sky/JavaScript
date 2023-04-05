/** 모듈 내보고내 가져오기
 * export와 import 지시자는 다양한 방식으로 활용된다.
 * export와 import의 기본적인 사용법말고 좀 더 다양한 사용법을 알아보자.
 */

/** 선언부 앞에 export 붙이기
 * 변수나 함수, 클래스를 선언할 땐 앞에 export를 붙이면 내보내기가 가능하다.
 * 아래 내보내기느 모두 유효하다.
 */

// 배열 내보내기
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 상수 내보내기
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// 클래스 내보내기
export class User {
    constructor(name) {
        this.name = name;
    }
}

/** I) 클래스나 함수를 내보낼 땐 세미클론을 붙이지 말자.
 * 클래스나 함수 선언시, 선언 부 앞 except를 붙인다고 해서 
 * 함수 선언 방식이 함수 선언문에서 함수 표현식(function expression)으로 바뀌지 않는다.
 * 내보내 지긴 헀지만 여전히 함수 선언문이다.
 * 
 * 대부분의 자바스크립트 스타일 가이드는 함수나 클래스 선언 끝에 세미클론을 붙이지 말라고 권유한다.
 * 같은 이유로 export class 나 export function 끝에 세미클론을 붙이지 않는다.
 */
export function sayHi(user) {
    alert(`Hello, ${user}!`);
} // 끝에 ;(세미클론)을 붙이지 않는다.

////////////////////////////////////////////////

/** 선언부와 떨어진 곳에 export 붙이기
 * 선언부와 export가 떨어져 있어도 내보내기가 가능하다.
 * 아래 예시에선 함수를 먼저 선언한 후, 마지막 줄에서 내보낸다.
 */
// 📁 say.js 
function sayHi(user) { 
    alert(`Hello, ${user}!`);
}

function sayBye(user) { 
    alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // 두 함수를 내보냄

/* 참고로 export문을 함수 선언부 위에 적어주는 것도 동일하게 동작한다. */

/** import *
 * 무언갈 가져오고 싶다면 
 * 아래와 같이 목록을 만들어 `import {...}` 안에 적어주면 된다.
 */
// 📁 main.js 
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!

/* 가져올 것이 많으면 `import * as <obj>`처럼 객체 형태로 원하는 것들을 가지고 올수 있다.*/

// 📁 main.js 
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');

/* 이렇게 '한꺼번에 모든 걸 가져온느 방식'을 사용하면 코드가 짧아진다. 
 * 그런데도 어떤 걸 가져올 땐 그 대상을 구체적으로 명시하는 것이 좋다.
 * 
 * 이렇게 라는 데 몇 가지 이유가 있다.
    * 1. 웹팩(Webpack)과 같은 모던 빌드 툴은 로딩 속도를 높이기 위해 모듈들을 한데 모으는 번들링과 최적화를 수행한다.
        이 과정을 사용하지 않는 리소스는 삭제되기도 한다.
        아래와 같이 프로젝트 서드파티 라이브러리인 say.js를 도입했다 가정하자. 이 라이브러리엔 수 많은 함수가 있다.
        // 📁 say.js
        export function sayHi() {...}
        export function sayBye() {...}
        export function becomeSilent() {...}

        현재로선 say.js의 수많은 함수 중 단 하나만 필요하기 때문에, 이 함수만 가져와 보겠다.
        // 📁 main.js
        import {sayHi} from './say.js';

        빌드 툴은 실제 사용되는 함수가 무엇인지 파악해, 그렇지 않은 함수는 최종 번들링 결과물에 포함하지 않는다.
        이 과정에서 불필요한 코드가 제거되기 때문에 빌드 결과물의 크기가 작아진다. 
        이런 최적화 과정은 '가지치기(tree-shaking)'라고 불린다.
    * 2. 어떤 걸 가지고 올지 명시하면 이름을 간결하게 써줄 수 있다. `say.sayHi()`보다 `sayHi()`가 더 간결하다.
    * 3. 어디서 어떤 게 쓰이즌 지 명확하기 때문에 코드 구조를 파악하기가 쉬워 리팩토링이나 유지보수에 도움이 된다.
 * 
 */

/////////////////////////////////////////////////////////////////////////////////////
