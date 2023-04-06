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

/** import 'as'
 * `as`를 사용하면 이름을 바꿔서 모듈을 가져올 수 있다.
 * sayHi를 hi로, sayBye를 bye로 이름을 바꿔서 가져와 보자.
 */

// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!

/** Export 'as'
 * `export`에도 `as`를 사용할 수 있다.
 * sayHi와 sayBye를 각각 hi와 bye로 이름을 바꿔 내보내보자.
 */

// 📁 say.js
function sayHi(user) { 
    alert(`Hello, ${user}!`);
}
function sayBye(user) { 
    alert(`Bye, ${user}!`);
}

export {sayHi as hi, sayBye as bye};

/* 이제 다른 모듈에서 이 함수들을 가져올 땐 이름은 hi와 bye가 된다. */

// 📁 main.js
import * as say from './say.js'

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!

/** export default
 * 모듈은 크게 두 종류로 나뉜다.
    * 1. 복수의 함수가 있는 라이브러리 형태의 모듈(위 예시의 `say.js`)
    * 2. 개체 하나만 선언되어있는 모듈(아래의 `user.js`. `class User` 하나만 내보개기 함)
 * 
 * 대개는 두 번째 방식으로 모듈을 만드는 걸 선호하기 때문에 함수, 클래스, 변수 등의 개체는 전용 모듈 안에 구현된다.
 * 그런데 어떻게 모듈을 만들다 보면 자연스레 파일 개수가 많이질 수 밖에 없다. 
 * 그렇더라도 모듈의 이름을 잘 지어주고, 폴더에 파일을 잘 나눠 프로젝트를 구성하면 코드 탐색이 어렵지 않으므로 이는 전혀 문제가 되지 않는다.
 * 
 * 모듈은 `export default`라는 특별한 문법을 지원한다. 
 * `export default`를 사용하면 '해당 모듈엔 개체가 하나만 있다'는 사실을 명확히 나타낼 수 있다.
 * 
 * 내보내고자 하는 개체 앞에 `export default`를 붙여보자
 */

// 📁 user.js
export default class User { // export 옆에 'default'를 추가해보았다.
    constructor(name) {
        this.name = name;
    }
}

/* 파일 하나엔 대개 export default가 하나만 있다.
 * 이렇게 default를 붙여서 모듈을 내보내면 중괄호 `{}` 없이 모듈을 가져올 수 있다.
 */

// 📁 main.js
import User from './user.js'; // {User}가 아닌 User로 클래스를 가져왔다.

new User('John');

/* 중괄호 없이 클래스를 가져오니 가독성이 더 좋아진다.
 * 모듈을 막 배우기 시작한 사람은 중괄호를 빼먹는 실수를 자주 한다.
 * named export한 모듈을 가져오려면 중괄호가 필요하고,
 * default export한 모듈을 가져오려면 중괄호가 필요하지 않다는 걸 기억해 실수를 방지하자.
 * 
 * named export             / default export
 * `export class {...}`     / `export default class User {...}`
 * `import {User} from ...` / `import User from ...`
 * 
 * 사실 named export와 default export를 같은 모듈에서 동시에 사용해도 문제는 없다.
 * 그런데 실무에선 어렇게 섞어 쓰는 사례는 흔치 않다.
 * 한 파일엔 named export나 default export 둘 중 하나만 사용한다.
 * 
 * 파일당 최대 하나의 default export가 있을 수 있으므로 내보낼 개체인 이름이 없어도 괜찮다.
 * 
 * 아래 예시의 개체엔 이름이 없지만 모두 에러 없이 잘 동작한다.

    export default class { // 클래스 이름이 없음
        constructor() {}
    }

    export default function(user) { // 함수 이름이 없음
        alert(`Hello, ${user}!`);
    }

    // 이름 없이 배열 형태의 값을 내보냄
    export default ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 * export default는 파일당 하나만 있으므로 이 개체를 가져오기 하려는 모듈에선 중괄호 없이도 
 * 어떤 개체를 가지고 올지 정확히 알 수 있으므로 이름이 없어도 괜찮다.
 * 
 * default를 붙이지 않았다면 개체에 이름이 없는 경우 에러가 발생한다.

    export class { // 에러! (default export가 아닌 경우엔 이름이 꼭 필요하다.)
        constructor() {}
    }
 
 */