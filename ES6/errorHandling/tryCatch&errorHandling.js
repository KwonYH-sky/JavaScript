/** 'try..catch'와 에러 핸들링
 * 아무리 프로그래밍이 능한 사람이더라도 에러가 있는 스크립트를 작성할 수 있다.
 * 원인은 아마도 실수, 예상치 못한 사용자 입력, 잘못된 서버 응답 등의 수천만 가지 이유 때문일 것이다.
 * 
 * 에러가 발생하면 스크립트는 '죽고'(즉시 중단되고), 콘솔에 에러가 출력된다.
 * 그러나 try..catch 문법을 사용하면 스크립트가 죽는 걸 방지하고, 에러를 '잡아서(catch)' 더 합당한 무언가를 할 수 있게 된다.
 */

/** 'try..catch' 문법
 * 'try..catch' 문법은 'try'와 'catch'라는 두 개의 주요 블록으로 구성된다.

try {

    // 코드...

} catch (err) {

    // 에러 핸들링

}

 * try..catch 동작 알고리즘은 다음과 같다
    * 1. 먼저, try {...} 안의 코드가 실행된다.
    * 2. 에러가 없다면, try 안의 마지막 줄까지 실행되고, catch 블록은 건너뛴다.
    * 3. 에러가 있다면, try 안 코드의 실행이 중단되고, catch(err) 블록으로 제어 흐름이 넘어간다.
        변수 err(아무 이름이나 사용가능)는 무슨 일이 일어났는지에 대한 설명이 담긴 에러 객체를 포함한다.
 * 이렇게 try {...} 블록 안에서 에러가 발생해도 catch에서 에러를 처리하기 때문에 스크립트는 죽지 않는다.
 */

/* 에러가 없는 예시: (1)과 (2)를 alert 창에 보여줌 */
try {
    
    alert('try 블록 시작'); // (1) <--

    // ...에러가 없습니다.

    alert('try 블록 끝'); // (2) <--

} catch (err) {
    
    alert('에러가 없으므로, catch는 무시됩니다.'); // (3)

}

/* 에러가 있는 예시: (1)과 (3)을 보여줌 */
try {

    alert('try 블록 시작'); // (1) <--

    lalala; // 에러, 변수가 정의되지 않음!

    alert('try 블록 끝(절대 도달하지 않음)'); // (2)

} catch (err) {
    
    alert('에러가 발생했습니다!'); // (3) <--

}
/** try..catch는 오직 런타임 에러에만 동작한다.
 * try..catch는 실행 가능한(runnable) 코드에만 동작한다.
 * 실행 가능한 코드는 유효한 자바스크립트 코드를 의미한다.
 * 중괄호 짝이 안 맞는 것처럼 코드가 문법적으로 잘못된 경우엔 try..catch가 동작하지 않는다.
    try {
        {{{{{{{{{{{{{{{{
    } catch(e) {
        alert("유효하지 않는 코드이기 때문에, 자바스크립트 엔진은 이 코드를 이해할 수 없습니다.");
    }
 * 자바스크립트 엔진은 코드를 읽고 난 후 코드를 실행한다. 
 * 코드를 읽는 중에 발생하는 에러는 'parse-time 에러'라고 부르는데, 
 * 엔진은 이 코드를 이해할 수 없기 때문에 parse-time 에러는 코드 안에서 복구가 불가능하다.
 * try..catch는 유효한 코드에서 발생하는 에러만 처리할 수 있다. 이런 에러를 '런타임 에러(runtime error)' 혹은 '예외(exception)'라고 부른다.
 */

/** try..catch는 동기적으로 동작한다.
 * setTimeout처럼 '스케줄 된(scheduled)' 코드에서 발생한 예외는 try..catch에서 잡아낼 수 없다.
 */
try {
    setTimeout(function() {
        noSuchVariable; // 스크립트는 여기서 죽는다.
    }, 1000);
} catch (e) {
    alert("작동 멈춤");
}
/* setTimeout에 넘겨진 익명 함수는 엔진이 try..catch를 떠난 다음에서야 실행되기 때문이다.
 * 스케줄 된 함수 내부의 예외를 잡을려면, try..catch를 반드시 함수 내부에 구현해야 한다.
 */
setTimeout(function() {
    try {
        noSuchVariable; // 이제 try..catch에서 에러를 핸들링 할 수 있다.
    } catch (e) {
        alert("에러를 잡았습니다!");
    }
}, 1000);



/** 에러 객체
 * 에러가 발생하면 자바스크립트는 에러 상세내용이 담긴 객체를 생성한다. 그 후, catch 블록에 이 객체를 인수로 전달한다.
try {
    // ...
} catch(err) { // <-- '에러 객체', err 대신 다른 이름으로도 쓸 수 있음
    // ...
}
 * 내장 에러 전체와 에러 객체는 두 가지 주요 프로퍼티를 가진다.
    * name
    에러 이름. 정의되지 않는 변수 때문에 발생한 에러라면 "ReferenceError"가 이름이 된다.
    * message
    에러 상세 내용을 담고 있는 문자 메시지
    * stack
    현재 호출 스택. 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열로 디버깅 목적으로 사용된다.
 * 
 */

/* 예시: */
try {
    lalala; // 에러, 변수가 정의되지 않음!
} catch (err) {
    alert(err.name); // ReferenceError
    alert(err.message); // lalala is not defined
    alert(err.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

    // 에러 전체를 보여줄 수도 있다.
    // 이때, 에러 객체는 "name: message" 형태의 문자열로 변환된다.
    alert(err); // ReferenceError: lalala is not defined
}

/** 선택적 'catch' 바인딩 (최근에 추가됨 -> 구식 브라우저는 폴리필이 필요)
 * 에러에 대한 자세한 정보가 필요하지 않으면, catch에서 이를 생략할 수 있다.
try {
    // ...
} catch  {
    // ...
}
 */

///////////////////////////////////////////////////////////////////////////

/** 'try..catch' 사용하기
 * 'try..catch'가 실무에서 어떻게 사용되는지 알아보자.
 * JSON.parse(str) 메서드는 주로 서버 등에서 네트워크를 통해 전달받은 데이터를 디코딩하는 데 사용한다.
 * 전달받는 데이터에 JSON.parse를 호출하는 식으로 사용된다.
 */

let json = '{"name": "John", "age": 30}'; // 서버로부터 전달받은 데이터

let user = JSON.parse(json); // 전달받은 문자열을 자바스크립트 객체로 변환

// 문자열 형태로 전달받은 user가 프로퍼티를 가진 객체가 됨
alert(user.name); // John
alert(user.alert); // 30

/* 잘못된 형식의 json이 들어온 경우, JSON.parse는 에러를 만들기 때문에 스크립트는 '죽는다'.
 * 
 * 서버에서 전달받은 데이터가 잘못되어 스크립트가 죽는 경우, 사용자는 개발자 콘솔을 열지 않는 이상 절대 원인을 알 수 없다.
 * 그런데 사람들은 메시지 등을 통해 에러의 원인을 알지 못한 채 무언가가 '그낭 죽는 것'을 정말 싫어한다.
 * 
 * try..catch를 사용해 처리해 보자
 */

json = "{ bad json}";

try {
    let user = JSON.parse(json); // <-- 여기서 에러가 발생하므로
    alert( user.name ); // 이 코드는 동작하지 않는다.
} catch (e) {
    // 에러가 발생하면 제어 흐름이 catch 문으로 넘어온다.
    alert("데이터에 에러가 있어 재요청을 시도합니다.");
    alert(e.name);
    alert(e.message);
}

/* 위 예시에선 에러가 발생했다는 걸 보여주기 위해 간단히 예외처리했지만,
 * catch 블록 안에서 새로운 네트워크 요청 보내기, 사용자에게 대안 제안하기, 로깅 장치에 에러 정보 보내기 등과 같은 구체적인 일을 할 수 있다.
 * 스크립트가 죽도록 놔두는 것보다 휠씬 나은 대응이다.
 */

/////////////////////////////////////

/** 에러 다시 던지기
 * 위 예시에선 불완전한 데이터를 try..catch로 처리하였다.
 * 그런데 또 다른 예기치 않는 에러가 try {...} 블록 안에서 발생 할 수도 있다.
 * 정의되지 않는 변수 사용 등의 프로그램밍 에러가 발생 할 가능성은 항상 있다.
 */

json = '{"age": 30}'; // 불완전한 데이터

try {
    user = JSON.parse(json); // <-- user 앞에 let을 붙이지 않음
} catch(err) {
    alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
    // (실제론 JSON Error가 아니다.)
}

/* 에러는 어떤 상황에서도 발생할 수 있다. 몇십 년간 몇백만 명이 사용한 오픈소스 유틸리티에서도 끔찍한 해킹으로 이어질 수 있는 엄청난 버그가 발견된다.
 * 위에선 '불완전한 데이터'를 다루려는 목적으로 try..catch를 썻다.
 * 그런데 catch는 원래 try 블록에서 발생한 모든 에러를 잡으려는 목적으로 만들어졌다.
 * 그렌데 위 예시에서 catch는 예상치 못한 에러를 잡아내 주긴 했지만, 에러 종류와 관계없이 "JSON Error" 메시지를 보여준다.
 * 이렇게 에러 종류와 관계없이 동일한 방식으로 에러를 처리하는 것은 디버깅을 어렵게 만들기 때문에 좋지 않다.
 * 
 * 이런 문제를 피하고자 '다시 던지기(rethrowing)' 기술을 사용한다. 규칙은 간단하다.
 * catch는 알고 있는 에러만 처리하고 나머지는 '다시 던져야'한다.
 * '다시 던지기' 기술을 더 자세히 설명하면,
    * 1. catch가 모든 에러를 받는다.
    * 2. catch(err) {...} 블록 안에서 에러 객체 err를 분석한다.
    * 3. 에러 처리 방법을 알지 못하면 throw err를 한다.
 * 보통 에러 타입을 instanceof 명령어로 체크한다.
 */

try {
    user = { /*...*/ };
} catch (err) {
    if (err instanceof ReferenceError) {
        alert('ReferenceError'); // 정의되지 않는 변수에 접근하여 'ReferenceError' 발생
    }
}

/* err.name 프로퍼티로 에러 클래스 이름을 알 수도 있다.
 * 기본형 에러는 모두 err.name 프로퍼티를 가진다. 또는 err.constructor.name를 사용할 수도 있다.
 * 에러를 다시 던져서 catch 블록에선 SyntaxError만 처리되도록 해보자.
 */

json = '{"age": 30}'; // 불완전한 데이터
try {
    
    let user = JSON.parse(json);

    if (!user.name) {
        throw new SyntaxError("불완전한 데이터: 이름 없음");
    }

    blabla(); // 예상치 못한 에러

    alert( user.name );

} catch (e) {
    
    if(e instanceof SyntaxError) {
        alert( "JSON Error: "+ e.message);
    } else {
        throw e; // 에러 다시 던지기 (*)
    }
}

/* catch 블록 안의 (*)로 표시한 줄에서 다시 던져진(rethrow) 에러는 try..catch "밖으로 던져진다."
 * 이때 바깥에 try..catch가 있다면 여기서 에러를 잡는다. 아니라면 스크립트는 죽을 것이다.
 * 이렇게 하면 catch 블록에선 어떻게 다룰지 알고 있는 에러만 처리하고, 알 수 없는 에러는 '건너뛸 수' 있다.
 * 이제 try..catch를 하나 더 만들어, 다시 던져진 예상치 못한 에러를 처리해보자.
 */

function readData() {
    let json = '{ "age": 30 }';

    try {
        // ...
        blabla(); // 에러!
    } catch (e) {
        // ...
        if (!(e instanceof SyntaxError)) {
            throw e; // 알 수 없는 에러 다시 던지기
        }
    }
}

try {
    readData();
} catch (e) {
    alert( "External catch got: " + e); // 에러를 잡음
}

/* readData는 SyntaxError만 처리할 수 있지만, 
 * 함수 바깥의 try..catch에서는 예상치 못한 에러도 처리할 수 있게 되었다. 
 */

///////////////////////////////////

/** try...catch...finally
 * try..catch는 finally라는 코드 절을 하나 더 가질 수 있다.
 * finally 안의 코드는 다음과 같은 상황에서 실행된다.
    * 에러가 없는 경우: try 실행이 끝난 후
    * 에러가 있는 경우: catch 실행이 끝난 후
 * finally를 사용하면 try..catch를 다음과 같이 확장할 수 있다.

    try{
        ...코드를 실행...
    } catch(e) {
        ...에러 핸들링...
    } finally {
        ...항상 실행...
    }

 * 
 */

try {
    alert( 'try 블록 시작!' );
    if(confirm('에러를 만드시겠습니까?')) 이상한_코드();
} catch (e) {
    alert( 'catch' );
} finally {
    alert( 'finally' );
}

/* 위 코드는 두 가지 경로로 실행된다.
    * 1. "에러를 만드시겠습니까?"에 'OK'로 답한 경우: try -> catch -> finally
    * 2. 'NO'로 답한 경우: try -> finally
 * finally 절은 무언가를 실행하고, 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용된다.
 * 
 * 피보나치 함수 fib(n)의 연산 시간을 측정하고 싶다고 해보자. 
 * 함수 실행 전에 측정을 시작해서 실행이 끝난 후 측정을 종료하면 된다.
 * 그런데 함수 실행 도중 에러가 발생하면 어떻게 될까?
 * 아래 fib(n)에는 음수나 정수가 아닌 수를 입력할 경우 에러가 발생한다.
 * 이런 경우 finally를 사용할 수 있다. finally 절은 무슨 일이 일어났든 관계없이 연산 시간 측정을 끝마치기 적절하다.
 * fib 함수가 에러 없이 정상적으로 실행되든 에러가 발생하든 상관없이, finally를 사용하면 연산 시간을 제대로 측정할 수 있다.
 */

let num = +prompt("양의 정수를 입력해주세요.", 35);

let diff, result;

function fib(n) {
    if (n < 0 || Math.trunc(n) != n) {
        throw new Error("음수나 정수가 아닌 값은 처리할 수 없습니다.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
    result = fib(num);
} catch (e) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

alert(result || "에러 발생");

alert( `연산 시간: ${diff}ms`);

/* 코드를 실행하고 프롬프트 대화상자에 35를 입력하면 try 다음에 finally가 정상적으로 실행되면서 연산시간을 확인할 수 있다. 
 * -1를 입력하면 에러가 발생하고, 연산 시간은 0ms가 된다.
 * 두 경우 모두 연산 시간이 정상적으로 측정된다.
 * 
 * 함수는 return 이나 throw를 만나면 종료되는데, 이렇게 finally 절을 사용하면 두 경루 모두를 처리할 수 있다.
 */

/** try..catch..finally 안의 변수는 지역 변수이다.
 * 위 예시에서 변수 diff와 result는 try..catch 전에 선언되었다는 점에 주의하자.
 * try 블록 안에서 선언한 변수는 블록 안에서만 유효한 지역 변수가 된다.
 */

/** finally와 return
 * finally 절은 try..catch 절을 빠져나가는 어떤 경우에도 실행된다.
 * return을 사용해 명시적으로 빠져나가려는 경우도 마찬가지이다.
 * 
 * 아래 예시의 try 블록 안엔 return이 있다. 이 경우엔 값이 바깥 코드로 변횐되기 전에 finally가 실행된다.
 */
function func() {
    try {
        return 1;
    } catch (e) {
        // ...
    } finally {
        alert('finally');
    }
}

alert(func()); // finally 안의 alert가 실행되고 난 후, 실행됨

/** try..finally
 * catch 절이 없는 try..finally 구문도 상황에 따라 유용하게 쓸 수 있다.
 * try..finally 안에서 에러를 처리하고 싶지 않지만, 
 * 시작한 프로세서가 마무리되었는지 확실히 하고 싶은 경우에 사용한다.
 */
function func() {
    // 무언가를 측정하는 경우와 같이 끝맺음이 있어야 하는 프로세스
    try {
        // ...
    } finally {
        // 스크립트가 죽더라도 완료됨
    }
}

/* 위 코드엔 catch가 없기 때문에 try안에서 발생한 에러는 항상 밖으로 떨어져 나온다.
 * finally는 실행 흐름이 함수를 떠나기 전에 실행된다.
 */

///////////////////////////////////////////

/** 전역 catch (호스트 환경 확인)
 * try..catch 바깥에서 치명적인 에러가 발생해 스크립트가 죽었다고 상상해보자.
 * 대처 방법은 무엇이 있을까? 어딘가에 에러 내역을 기록해 놓거나 사용자에게 에러가 발생했음을 알려주는 행위를 할 수 있을 것이다.
 * 
 * 자바스크립트 명세서에는 이런 치명적인 에러에 대응하는 방법이 적혀있지 않다.
 * 하지만 try..catch에서 처리하지 못한 에러를 잡는 것은 아주 중요하기 때문에,
 * 자바스크립트 호스트 환경 대다수는 자체적으로 에러 처리 기능을 제공한다.
 * Node.js의 process.on("uncaughtException")이 그 예이다.
 * 브라우저 환경에선 window.onerror를 이용해 에러를 처리할 수 있다.
 * window.onerror 프로퍼티에 함수를 할당하면, 예상치 못한 에러가 발생했을 때 이 함수가 실행된다.
 */

/* 문법:
    window.onerror = function (message, url, line, col, error) {
        // ...
    };
 * message
    에러 메시지
 * url
    에러가 발생한 스크립트의 URL
 * line, col
    에러가 발생한 곳의 줄과 열 번호
 * error
    에러 객체
 */

/* 예시:
    <script>
    window.onerror = function (message, url, line, col, error) {
        alert(`${message}\n At ${line}:${col} of ${url}`);
    };

    function readData() {
        badFunc(); // 에러가 발생한 장소
    }

    readData();
    </script>
 * 그런데 전역 핸들러 window.onerror는 죽어버린 스크립트를 복구하려는 목적으로 잘 사용하지 않는다.
 * 프로그래밍 에러가 발생한 경우 window.onerror만으로 스크립트를 복구하는 건 사실상 불가능하다.
 * window.onerror는 개발자에게 에러 메시지를 보내는 용도로 사용한다.
 * window.onerror말고 errorception.com 나 www.muscla.com같은 에러 로깅 관련 상용 서비스가 여러 가지 있다.
 * 이런 서비스들은 다음과 같은 프로세스로 동작한다.
    * 1. 서비스를 가입하면 자바스크립트 파일(혹은 스크립트 url)을 받는데, 개발자는 이 파일을 페이지에 삽입한다.
    * 2. 받은 파일은 커스텀 window.onerror 함수를 설정한다.
    * 3. 에러가 발생하면, 이 커스텀 함수가 에러에 관한 내용을 담아 서비스에 네트워크 요청을 보낸다.
    * 4. 개발자는 서비스 사이트에 로그인해 기록된 에러를 확인한다.
 */

/////////////////////////////////////////////////////

/** 요약
 * try..catch를 이용하면 런타임 에러를 처리할 수 있다.
 * try에선 코드를 실행하고, 에러가 발생라면 catch에서 잡아낸다.
 * 
 * 문법은 다음과 같다.
 */
try {
    // 이곳의 코드를 실행
} catch (err) {
    // 에러가 발생하면, 여기부터 실행됨
    // err는 에러 객체
} finally {
    // 에러 발생 여부와 상관없이 try/catch 이후에 실행됨
}
/* try..catch, try..catch..finally 이외도 try..finally를 사용할 수 있다.
 * 
 * 에러 객체엔 다음과 같은 프로퍼티가 있다.
    * message - 사람이 읽을 수 있는 형태의 에러 메시지
    * name - 에러 이름을 담은 문자열(에러 생성자 이름)
    * stack - 표준이 아니지만 대부분의 호스트 환경이 지원하는 프로퍼티로 에러가 발생한 순간의 스택을 나타냄
 * 
 * 에러 객체가 필요없다면 catch(err) {} 대신 catch {} 를 쓸 수 있다.
 * 
 * throw 연산자를 사용하면 에러를 직접 만들 수 있다. 이론상으론, throw 인수에 모든 것을 넘길 수 있지만,
 * 대개 내장 Error 클래스를 상속받은 에러 객체를 인수로 넘긴다.
 * 
 * 다시 던지기는 에러 처리 시 사용되는 중요한 패턴이다.
 * catch 블록에선 대개 예상하였거나 어떻게 다룰지를 알고 있는 에러를 다루고, 예상치 못한 에러는 `다시 던지기` 한다.
 * 
 * try..catch가 없어도 대부분 호스트 환경이 '전역' 에러 핸들러를 지원하기 때문에 "떨어져 나온" 에러를 잡을 수 있다.
 * window.onerror는 브라우저 환경의 전역 에러 핸들러이다.
 */

//////////////////////////////////////////////////////////////////////////////////