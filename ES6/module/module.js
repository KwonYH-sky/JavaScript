/** 모듈 소개
 * 개발하는 애플리케이션의 크기가 커지면 언젠간 파일을 여러 개로 분리해야 하는 시점이 온다.
 * 이때 분리된 파일 각각을 '모듈(module)'이라고 부르는데, 
 * 모둘은 대개 클라스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성된다.
 * 
 * 자바스크립트가 만들어진 지 얼마 안 되었을 때는 자바스크립트로 만든 스크립트의 크기도 작고 기능도 단순했기 때문에
 * 자바스크립트는 긴 세월 동안 모듈 관련 표준 문법 없이 성장할 수 있었다. 즉 새로운 문법을 만들 필요가 없었다.
 * 
 * 그런데 스크립트의 크기가 점차 커지고 기능도 복잡해지자 자바스크립트 커뮤니티는 특별한 라이브러리를 만들어
 * 필요한 모듈을 언제든지 불러올 수 있게 해준다거나 코드를 모듈 단위로 구성해주는 방법을 만드는 등 다양한 시도를 하게 된다.
 * 그 시도는 다음과 같은 모듈 시스템으로 이어졌다.
    * AMD - 가장 오래된 모듈 시스템 중 하나로 require.js라는 라이브러리를 통해 처음 개발되었다.
    * CommonJS - Node.js 서버를 위해 만들어진 모듈 시스템이다.
    * UMD - AMD와 CommonJS와 같은 다양한 모듈 시스템을 함께 사용하기 위해 만들어졌다.
 * 이런 모듈 시스템은 오래된 스크립트에서 여전히 발견할 수 있는데, 이제는 역사의 뒤안길로 사라지고 있다.
 * 
 * 모듈 시스템은 2015년에 표준으로 등재되었다. 
 * 이 이후로 관련된 문법은 진화를 거듭해 이제는 대부분의 주요 브라우저와 Node.js가 모듈 시스템을 지원하고 있다.
 */

/** 모듈이란
 * 모듈은 단지 파일 하나에 불과하다. 스크립트 하나는 모듈 하나이다.
 * 모듈에 특수한 지시자 export와 import를 적용하면 다른 모듈을 불러와 모듈에 있는 함수를 호출하는 것과 같은 기능 공유가 가능하다.
    * `export` 지시자를 변수나 함수 앞에 붙이면 외부 모듈에서 해당 변수나 함수에 접근할 수 있다(모듈 내보내기).
    * `import` 지시자를 사용하면 외부 모듈의 기능을 가져올 수 있다(모듈 가져오기).
 * 
 * export 지시자를 사용해 파일 sayHi.js 내부의 함수 sayHi를 외부로 내보내자.
 */

// 📁 sayHi.js
export function sayHi(user) {
   alert(`Hello, ${user}!`);
}

// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // 함수
sayHi('John'); // Hello, John!
/* 위 예시에서 import 지시자는 상대 경로(./sayHi.js) 기준으로 모듈을 가져오고 sayHi.js에서 내보낸함수 sayHi를 사응하는 변수에 할당한다.
 * 이제 브라우저에서 모듈이 어떻게 동작하는지 예시를 이용해 알아보자.
 * 
 * 모듈은 특수한 키워드나 기능과 함께 사용되므로 <script type="module">같은 속성을 설정해 
 * 해당 스크립트가 모듈이라는 걸 브라우저가 알 수 있게 해줘야 한다.
 */

/*
// 📁 index.html
<!DOCTYPE html>
<script type="module">
   import {sayHi} from './sayHi.js';

   document.body.innerHTML = sayHi('John');
</script>
*/

// 📁 sayHi.js
export function sayHi(user) {
   return `Hello , ${user}!`;
}

/* 브라우저가 자동으로 모듈을 가져오고 평가한 다음, 이를 실행한 것을 확인할 수 있다. */

/** ! 모듈은 로컬 파일에서 동작하지 않고, HTTP 또는 HTTPS 프로토콜을 통해서만 동작한다.
 * 로컬에서 `file://` 프로토콜을 사용해 웹페이지를 열면 import, export 지시자가 동작하지 않는다.
 * 예시를 실행하려면 로컬 웹 서버인 static-server나, 코드 에디터의 '라이브 서버' 익스텐션을 사용하자.
 */

////////////////////////////////////////////

/** 모듈의 핵심 기능 
 * '일반' 스크립트와 모듈의 차이는 무엇일까?
 * 모든 호스트 환경에 공통으로 적용되는 모듈의 핵심 기능을 알아보자.
 */

/** 1. 엄격 모드로 실행됨
 * 모듈은 항상 엄격 모드(use strict)로 실행된다.
 * 선언되지 않는 변수에 값을 할당하는 등의 코드는 에러를 발생시킨다.

   <script type="module">
      a = 5; // 에러
   </script>

 */

/** 2. 모듈 레벨 스코프
 * 모듈은 자신만의 스코프가 있다. 따라서 모듈 내부에서 정의한 변수나 함수는 다른 스크립트에서 접근할 수 없다.
 * 
 * user.js와 hello.js를 가져오고 user.js에서 선언한 변수 user를 hello.js에서 사용해보자.
 * 에러가 나는 것을 확인 할 수 있다.
 */
/*
// 📁 index.html
<!DOCTYPE html>
<script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script>
*/
// 📁 user.js
let user = "John";

// 📁 hello.js
alert(user); // 모듈은 변수를 공유하기 않기 때문에 `Uncaught ReferenceError: user is not defined`라는 에러가 콘솔 패널에 출력된다.

/* 외부에 공개하려는 모듈은 export 해야하고, 내보내진 모듈은 가져와 사용하려면 import 해줘야 한다.
 * 전역변수를 대신하여 hello.js에 user.js를 가져와 필요한 기능을 얻을 수 있다.
 * 
 * 아래와 같이 코드를 수정하면 정상적으로 동작한다.
 */
/*
// 📁 index.html
<!DOCTYPE html>
<script type="module" src="hello.js"></script>
*/

// 📁 user.js
export let userA = "John";

// 📁 hello.js
import {userA} from './user.js'

document.body.innerHTML = userA; // John

/* 브라우저 환경에서도 <script type = "module">을 사용해 모듈을 만들면 독립적인 스코프가 만들어진다.
   
   <script type="module">
      // user는 해당 모듈 안에서만 접근 가능하다.
      let user = "John"
   </script>

   <script type="module">
      alert(user) // Error: user is not defined
   </script>
   
 * 참고로 브라우저 환경에서 부득이하게 window 레벨 전역 변수를 만들어야 한다면 window 객체에 변수를 명시적으로 할당하고
 * window.user와 같이 접근하는 방식을 취하면 된다. 그런데 이 방법은 정말 필요한 경우에만 사용하길 바란다.
 */

/** 3. 단 한번만 평가됨
 * 동일한 모듈이 여러 곳에서 사용되더라도 모듈은 최초 호출 시 단 한 번만 실행된다.
 * 실행 후 결과는 이 모듈을 가져가려는 모든 모듈에 내보내진다.
 * 이런 작동 방식은 중요한 결과를 초래한다.
 * 
 * alert 함수가 있는 모듈(alert.js)을 여러 모듈에서 가져오기로 해보자. 얼럿 창은 단 한 번만 나타난다.
 */

// 📁 alert.js
alert("모듈이 평가되었습니다.");

// 동일한 모듈을 여러 모듈에서 가져오기

// 📁 1.js
import `./alert.js`; // 얼럿창에 '모듈이 평가되었습니다!'가 출력된다.

// 📁 2.js
import `./alert.js`; // 아무 일도 발생하지 않는다.

/* 실무에선 최상위 레벨 모듈을 대개 초기화나 내부에서 쓰이는 
 * 데이터 구조를 만들고 이를 내보내 재사용하고 싶을 때 사용한다. 
 * 
 * 객체를 내보내는 모듈을 만들어보자.
 */

// 📁 admin.js
export let admin = {
   name: "John"
};

/* 이 모듈을 가져오는 모듈이 여러 개이더라도 앞서 설명한 것처럼 모듈은 최초 호출시 단 한번만 평가된다.
 * 이때 admin 객체가 만들어지고 이 모듈을 가져오는 모든 모듈에 admin 객체가 전달된다.
 * 
 * 각 모듈 동일한 admin 객체가 전달된다.
 */

// 📁 1.js
import { admin } from "./admin.js";
admin.name = "Pete";

// 📁 2.js
import { admin } from "./admin.js";
alert(admin.name); // Pete

// 1.js와 2.js 모두 같은 객체를 가져오므로
// 1.js에서 객체에 가한 조작을 2.js에서도 확인할 수 있다.

/* 모듈은 단 한 번만 실행되고 실행된 모듈은 필요한 곳에 공유되므로 
 * 어느 모듈에서 admin을 수정하면 다른 모듈에서도 변경사항을 확인 할 수 있다.
 * 
 * 이런 특징을 이용하면 모듈 *설정(configuration)*을 쉽게 할 수 있다.
 * 최초로 실행되는 모듈의 객체 프로퍼티를 원하는 대로 설정하면 다른 모듈에서 이 설정을 그대로 사용할 수 있기 때문이다.
 * 
 * 예시를 통해 이에 대해 자세히 알아보자.
 * 아래 admin.js 모듈은 어떤 특정한 기능을 제공해주는데, 
 * 이 기능을 사용하려면 외부에서 admin 객체와 관련된 인증 정보를 받아와야 한다고 가정해보자
 */

// 📁 admin.js
export let admin = { };

export function sayHi() {
   alert(`${admin.name}님, 안녕하세요!`);
}

/* 최초로 실행되는 스크립트인 init.js에서 admin.name을 설정해주었다.
 * 이렇게 하면 admin.js를 포함한 외부 스크립트에서 admin.name에 저장된 정보를 볼 수 있다.
 */

// 📁 init.js
import {admin} from './admin.js';
admin.name = "보라";

// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // 보라

sayHi(); // 보라님, 안녕하세요!

/** 4. import.meta
 * import.meta 객체는 현재 모듈에 대한 정보를 제공해준다.
 * 
 * 호스트 환경에 따라 제공하는 정보의 내용은 다른데, 브라우저 환경에선 스크립트 URL 정보를 얻을 수 있다.
 * HTML 안에 있는 모듈이라면, 현재 실행 중인 웹페이지의 URL 정보를 얻을 수 있다.
 
   <script type="module">
      alert(import.meta.url); // script URL (인라인 스크립트가 위치해 있는 html 페이지의 URL)
   </script>
   
 */

/** 5. this는 undefined
 * 모듈 최상위 레벨의 this는 undefined이다.
 * 모듈이 아닌 일반 스크립트의 this는 전역 객체인 것과 대조된다.

  <script>
      alert(this); // window
   </script>

     <script type="module">
      alert(this); // undefined
   </script>
 */

/////////////////////////////////////////////////////

/** 브라우저 특정 기능
 * 브라우저 환경에서 type="module"이 붙은 스크립트가 일반 스크립트와 어떤 점이 다른지 알아보자.
 */

/** 1. 지연 실행
 * 모듈 스크립트는 항상 지연 실행이된다. 
 * 외부 스크립트, 인라인 스크립트와 관계없이 마치 defer 속성(defer 속성이 있으면 백그라운드에서 다운로드함)을 붙인 것처럼 실행된다.
 * 
 * 따라서 모듈 스크립트는 아래와 같은 특징을 보인다.
   * 외부 모듈 스크립트<script type="module" src="...">를 다운로드할 때 브라우저의 HTML 처리가 멈추지 않는다.
      브라우저는 외부 모듈 스크립트와 기타 리소스를 병렬적으로 불러온다.
   * 모듈 스크립트는 HTML 문서가 완전히 준비될 때까지 대기 상태에 있다가 HTML 문서가 완전히 만들어진 이후에 실행된다.
      모듈의 크기가 아주 작아서 HTML보다 빨리 불러온 경우에도 말이다.
   * 스크립트의 상대적 순서가 유지된다. 문서상 위쪽의 스크립트부터 차례로 실행된다.

 * 이런 특징 때문에 모듈 스크립트는 항상 완전한 HTML 페이지를 '볼 수' 있고 문서 내 요소에도 접근할 수 있다.
 * 예시:
   <script type="module">
      alert(type of button); // 모듈 스크립트는 지연 실행되기 때문에 페이지가 모두 로드되고 난 다음에 alert 함수가 실행되므로
      // 얼럿창에 object가 정상적으로 출력된다. 모듈 스크립트는 아래쪽의 button 요소를 '볼 수' 있다.
   </script>

   하단 일반 스크립트와 비교해 보자.

   <script>
   alert(type of button); // 일반 스크립트는 페이지가 완전히 구성되기 전이라도 바로 실행된다.
   // 버튼 요소가 페이지에 만들어지기 전에 접근하였기 때문에 undefined가 출력되는 것을 확인할 수 있다.
   </script>
 * 
 * 위 예시에서 일반 스크립트는 첫 번째 모듈 스크립트보다 먼저 실행된다는 점에 주의하자.
 * `undefined`가 먼저, `object`는 나중에 출력된다.
 * 
 * 모듈 스크립트는 지연 실행되기 때문에 문서 전체가 처리되기 전까지 실행되지 않고, 
 * 일반 스크립트는 바로 실행되므로 위와 같은 결과가 나타난다.
 * 
 * 모듈을 사용할 땐 HTML 페이지가 완전히 나타난 이후에 모듈이 실행된다는 점에 항상 유의하자.
 * 페이지 내 특정 기능이 모듈 스크립트에 의존적인 경우, 
 * 모듈이 완전히 로딩되기 전에 페이지가 먼저 사용자에게 노출되면 사용자가 혼란을 느낄 수 있기 때문이다.
 * 모듈 스크립트를 불러오는 동안엔 투명 오버레이나 '로딩 인디케이터(loading indicator)'를 보여주어 사용자의 혼란을 예방해 주도록 하자.
 */

/** 2. 인라인 스크립트의 비동기 처리
 * 모듈이 아닌 일반 스크립트에서 async 속성은 외부 스크립트 불러올 때만 유효하다.
 * async 속성이 붙은 스크립트는 로딩이 끝나면 다른 스크립트나 HTML 문서가 처리되길 기다리지 않고 바로 실행된다.
 * 
 * 반면, 모듈 스크립트에선 async 속성을 인라인 스크립트에도 적용할 수 있다.
 * 아래 인라인 스크립트엔 async 속성이 붙었기 때문에 다른 스크립트나 HTML이 처리되길 기다리지 않고 바로 실행된다.
 * 가져오기(./analytics.js) 작업이 끝나면 HTML 파싱이 끝나지 않았거나 다른 스크립트가 대기 상태에 있더라도 모듈이 바로 실행된다.
 * 이런 특징은 광고나 문서 레벨 이벤트 리스너, 카운터 같이 어디에도 종속되지 않는 기능을 구현할 때 유용하게 사용 할 수 있다.
 
   <!-- 필요한 모듈(analytics.js)의 로드가 끝나면 -->
   <!-- 문서나 다른 <script>가 로드되딜 기다리지 않고 바로 실행된다. -->
   <script async type="module">
      import { counter } from "./analytics.js";

      counter.count();
   </script>

 */

/** 3. 외부 스크립트
 * type="module"가 붙은 외부 모듈 스크립트엔 두 가지 큰 특징이 있다.
   * 1. scr 속성이 동일한 외부 스크립트는 한 번만 실행된다.
   <!-- my.js는 한 번만 로드 및 실행된다. -->
   <script type="module" src="my.js"></script>
   <script type="module" src="my.js"></script>

   * 2. 외부 사이트같이 다른 오리진에서 모듈 스크립트를 불러오려면 CORS 헤더가 필요하다.
      모듈이 저당되어 있는 원격 서버가 `Access-Control-Allow-Origin: *` 헤더를 제공해야만 외부 모듈을 불러올 수 있다.
      `*`대신 페치(fetch)를 허용할 도메인을 명시 할 수도 있다.
   <--! another-site.com이 Access-Control-Allow-Origin을 지원해야만 외부 모듈을 불러올 수 있다. -->
   <--! 그렇지 않으면 스크립트는 실행되지 않는다. -->
   <script type="module" src="http://another-site.com/their.js"></script>
 * 
 * 이 특징은 보안을 강화해 준다.
 */

/** 4. 경로가 없는 모듈은 금지
 * 브라우저 환경에서 import는 반드시 상대 혹은 절대 URL 앞에 와야 한다.
 * `경로가 없는` 모듈은 허용되지 않는다.
 * 아래 예제에서는 import가 무효하다.
 */
import { sayHi } from "sayHi"; // Error
// './sayHi.ja'와 같이 경로 정보를 지정해 주어야 한다.

/* Node.js나 번들링 툴은 경로가 없어도 해당 모듈을 찾을 수 있는 방법을 알기 때문에 경로가 없는 모듈을 사용할 수 있다.
 * 하지만 브라우저는 경로 없는 모듈을 지원하지 않는다.
 */

/** 5. 호환을 위한 nomodule
 * 구식 브라우저는 type="module"을 해석하지 못하기 때문에 모듈 타입의 스크립트를 만나면 이를 무시하고 넘어간다.
 * nomodule 속성을 사용하면 이런 상황을 대비 할 수 있다.
   <script type="module">
      alert("모던 브라우저를 사용하고 계시군요.");
   </script>

   <script nomodule>
      alert("type=module을 해석 할 수 있는 브라우저는 nomodule 타입의 스크립트는 넘어간다. 따라서 이 alert 문은 실행되지 않는다.");
      alert("오래된 브라우저를 사용하고 있다면 type=module이 붙은 스크립트는 무시된다. 대신 이 alert 문이 실행된다.");
   </script>
 */

///////////////////////////////////////////////////////////////////////////