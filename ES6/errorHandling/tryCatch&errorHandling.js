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

