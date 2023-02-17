/** 커스텀 에러와 에러 확장
 * 개발을 하다 보면 자체 에러 클래스가 필요한 경우가 종종 생긴다.
 * 네트워크 관련 작업 중 에러가 발생했다면 HttpError, 데이터베이스 관련 작업중 에러가 발생했다면 DbError,
 * 검색 관련 작업 중 에러가 발생했다면 NotFoundError를 사용하는 것이 직관적이기 때문이다.
 * 
 * 직접 에러 클래스를 만든 경우, 이 에러들은 message이나 name, 가능하다면 stack 프로퍼티를 지원해야 한다.
 * 물론 이런 프로퍼티 이외에도 다른 프로퍼티를 지원할 수 있다.
 * HttpError 클래스의 객체에 statusCode 프로퍼티를 만들고 404나 403, 500같은 숫자를 값으로 지정할 수 있다.
 * 
 * 앞서 배운 바와 같이 throw의 인수엔 아무런 제약이 없기 때문에 커스텀 에러 클래스는 반드시 Error를 상속할 필요가 없다.
 * 그렇지만 Error를 상속받아 커스텀 에러 클래스를 만들게 되면 obj instanceof Error를 사용해서 에러 객체를 식벽할 수 있다는 장점이 생긴다.
 * 이런 장점 때문에 맨땅에서 커스텀 에러 객체를 만드는 것보다 Error를 상속받아 에러 객체를 만드는 것이 낫다.
 * 
 * 애플리케이션 크기가 점점 커자면 우리가 만들게 될 커스텀 에러 클래스들은 자연스레 계층 구조를 형성하게 된다.
 * HttpTimeoutError는 HttpError를 상속받는 식으로 말이다.
 */

/** 에러 확장하기
 * 사용자 데이터가 저장된 JSON을 읽을 함수 readUser(json)가 있다고 가정해보자.
 * 유효한 json은 다음과 같은 형태이어야 한다.
 */
let json = '{ "name": "John", "age": 30}';
/* readUser 내부에건 JSON.parse를 이용하게 된다. 따라서 잘못된 형식의 json이 들어오면 SyntaxError가 발생하게 된다.
 * 그런데 인수로 받은 데이터가 JSON 형식이긴 하지만, 유효한 사용자일 것이라는 보장은 없다.
 * 사용자 데이터라면 필수적으로 있어야 할 name이나 age가 누락되었을 수 있다.
 * 
 * 따라서 readUser(json)은 JSON 형식의 데이터를 읽을 수 있을 뿐만 아니라, 데이터를 '검증'할 수 있어야 한다.
 * 필수 프로퍼티가 없거나, 위 형식에 맞지않으면 에러를 발생시킬 수 있어야 한다.
 * 그런데 이때 발생하는 에러는 SyntaxError가 아니다. JSON 형식은 맞지만, 자체 기준이 맞지 않기 때문에 발생한 에러이므로 전혀 다른 종류의 에러이다.
 * 지금부턴 이 에러를 ValidationError라고 칭한다. 이제 ValidationError를 위한 클래스를 만들어 보자.
 * 
 * 그 전에 먼저 잠시 슈도 코드로 Error 클래스가 어떻게 생겼는지 살펴보자.
 */
/*
// 자바스크립트 자체 내장 에러 클래스 Error의 '슈도 코드'
class Error {
    constructor(message) {
        this.message = message;
        this.name = "Error"; // (name은 내장 에러 클래스마드 다르다.)
        this.stack = <call stack>; // stack은 표준은 아니지만, 대다수 환경이 지원한다.
    }
}
*/

/* 이제 ValidationError에서 Error를 상속 받아보자 */
class ValidationError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}

function test() {
    throw new ValidationError("에러 발생!");
}

try {
    test();
} catch (err) {
    alert(err.message); // 에러 발생!
    alert(err.name); // ValidationError
    alert(err.stack); // 각 행 번호가 있는 중첩된 호출들의 목록
}

/* (1)에서 부모 생성자를 호출하고 있다는 것에 주목하자. 자바스크립트에서는 자식 생성자 안에 super를 반드시 호출해야한다.
 * message 프로퍼티는 부모 생성자에서 설정된다.
 * 부모 생성자에선 message뿐만 아니라 name 프로퍼티도 설정("Error")하기 때문에, (2)에서 원하는 값으로 재설정해주었다.
 *  
 * 이제 readUser(json) 안에서 ValidationError를 사용하자.
 */

class ValidationError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}

// 사용법
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new ValidationError("No field: age");
    }
    if (!user.name) {
        throw new ValidationError("No field: name");
    }

    return user;
}

// try..catch와 readUser를 함께 사용한 예시
try {
    let user = readUser('{"age":25}');
} catch (err) {
    if (err instanceof ValidationError) {
        alert("Invalid data: " + err.message); // Invalid data: No field: name
    } else if (err instanceof SyntaxError) { // (*)
        alert("JSON Syntax Error: " + err.message);
    } else {
        throw err; // 알려지지 않은 에러는 재던지기 한다. (**)
    }
}

/* 이제 try..catch 블록에서 커스텀 에러 ValidationError와 JSON.parse에서 발생하는 SyntaxError 둘 다를 처리할수 있게 되었다.
 * 
 * 이 과정에서 instanceof로 에러 유형을 확인((*)) 하였다.
 * 에러 유형 확인은 instanceof 말고 다음과 같이 err.name을 사용해도 가능하다.
    // ...
    // (err instanceof SyntaxError) 대신 사용 가능
    } else if (err.name === "SyntaxError") { // (*)
    // ...
 * 그런데 에러 유형 확인은 err.name보다는 instanceof를 사용하는 게 횔씬 좋다. 
 * 나중에 ValidationError를 확장하여 PropertyRequiredError 같은 새로운 확장 에러를 만들게 될 텐데,
 * instanceof는 새로운 상속 클래스에서도 동작하기 때문이다.
 * 
 * catch에 알려지지 않는 에러가 있을 때 이 에러는 재 던기기 된다는 점((**)) 또한 주목해서 보자.
 * catch 블록에선 유효성 검사와 문법 오류만 처리하고, 다른 종류의 에러는 밖으로 던져야 한다.
 */

///////////////////////////////////////////////////////////////

/** 더 깊게 상속하기
 * 앞서 만든 ValidationError 클래스는 너무 포괄적이어서 뭔가 잘못될 확률이 있다.
 * 꼭 필요한 프로퍼티가 누락되거나 age에 문자열값이 들어가는 것처럼 형식이 잘못된 경우를 처리할 수 없다.
 * 필수 프로퍼티가 없는 경우에 대응할 수 있도록 좀 더 구체적인 클래스 PropertyRequiredError를 만들어 보자.
 * PropertyRequiredError엔 누락된 프로퍼티에 대한 추가 정보가 담겨야 한다.
 */

class ValidationError extends Error {
    constructor(message) {
        super(message); 
        this.name = "ValidationError"; 
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

// 사용법
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }
    if (!user.name) {
        throw new PropertyRequiredError("name");
    }

    return user;
}

// try..catch와 readUser를 함께 사용하면 다음과 같다.
try {
    let user = readUser('{"age":25}');
} catch (err) {
    if (err instanceof ValidationError) {
        alert("Invalid data: " + err.message); // Invalid data: No property: name
        alert(err.name); // PropertyRequiredError
        alert(err.property); // name
    } else if (err instanceof SyntaxError) { 
        alert("JSON Syntax Error: " + err.message);
    } else {
        throw err; // 알려지지 않은 에러는 재던지기 한다.
    }
}

/* 새롭게 만든 클래스 PropertyRequiredError는 사용하기 쉽다. 
 * new PropertyRequiredError(property)처럼 프로퍼티 이름을 전달하기만 하면 된다. 사람이 읽을 수 있는 message는 생성자가 알아서 만들어 준다.
 * 
 * 여기서 주목할 점은 PropertyRequiredError 생성자 안에서 this.name을 수동으로 할당해 주었다는 것이다.
 * 그런데 어떻게 매번 커스텀 에러 클래스의 생성자 안에서 this.name을 할당해 주는 것은 귀찮은 작업이다.
 * 이런 번거로운 작업은 '기본 에러' 클래스를 만들고 커스텀 에러들이 이 클래스를 상속받게 하면 피할 수 있다.
 * 기본 에러 생성자에 this.name = this.constructor.name를 추가하면 된다.
 * 
 * 기본 에러 클래스를 MyError라고 부르겠다.
 * MyError를 사용하면 다음과 같이 커스텀 에러 클래스를 간결하게 할 수 있다.
 */
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError {}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

// 제대로 된 이름이 출력된다.
alert(new PropertyRequiredError("field").name); // PropertyRequiredError

/* "this.name = ..."이 사라졌기 때문에 ValidationError같은 커스텀 에러의 생성자가 더 깔끔해진 것을 확인 할 수 있다. */

/////////////////////////////////////

