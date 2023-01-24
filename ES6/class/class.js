/** 클래스와 기본 문법
 * 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로,
 * 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.
 * 
 * 실무에선 사용자나 물건같이 동일한 종류의 객체를 여러 개 생성해야 하는 경우가 잦다.
 * 이럴 때 new 연산자와 생성자 함수에서의 new function을 사용할 수 있다.
 * 
 * 여기에 더하여 모던 자바스크립트에 도입된 클라스(class)라는 문법을 사용하면 
 * 객체 지향 프로그래밍에서 사용되는 다양한 기능을 자바스크립트에서도 사용할 수 있다.
 */

/** 기본 문법
 * 클래스는 다음과 같은 기본 문법을 사용해 만들 수 있다.

class MyClass {
    // 여러 메서드를 정의할 수 있음
    constructor() {...}
    method1() {...}
    method2() {...}
    method3() {...}
    ....
}

 * 이렇게 클래스를 만들고, new MyClass()를 호출하면 내부에서 정의한 메서드가 들어 있는 객체가 생성된다.
 * 객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있다.
 * 
 * 예시:
 */

class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        alert(this.name);
    }

}

// 사용법:
let user = new User("John");
user.sayHi();

/* new User("John")를 호출하면 다음과 같은 일이 일어난다.
    1. 새로운 객체가 생성된다.
    2. 넘겨 받은 인수와 함께 constructor가 다동으로 실행된다. 이때 인수 "John"이 this.name에 할당된다.

   이런 과정을 거친 후에 user.sayHi() 같은 객체 메서드를 호출할 수 있다.
*/

/** 메서드 사이엔 쉼표가 없다.
 * 초보 개발자는 클래스 메서드 사이에 쉼표를 넣는 실수를 저지르곤 한다. 이렇게 쉼표를 넣으면 문범 에러가 발생한다.
 * 클래스와 관련된 표기법은 객체 리터럴 표기법과 차이가 있다. 클래스에선 메서드 사이에 쉼표를 넣지 않아도 된다.
 */

////////////////////////////////////////

/** 클래스란
 * 클래스는 자바스크립트에서 새롭게 창안한 개체(entity)가 아니다.
 * 클래스가 보여주는 다양한 원리를 하나씩 파헤치면서 클래스가 정확히 무엇인지 알아보자.
 * 이 과정을 거치고 나면 자바스크립트의 복잡한 기능을 이해할 수 있을 것이다.
 * 
 * 자바스크립트에서 클래스는 함수의 한 종류다.
 */

class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        alert(this.name);
    }
}

// User가 함수라는 증거
alert(typeof User); // function

/* class User {...} 문법 구조가 진짜하는 일은 다음과 같다
    1. User라는 이름을 가진 함수를 만든다. 함수 본문은 생성자 메서드 constructor에서 가져온다.
        생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어진다.
    2. sayHi같은 클래스 내에서 정의한 메서드를 User.prototype에 저장한다.
   
   new User를 호출해 객체를 만들고, 객체의 메서드를 호출하면 메서드를 prototype 프로퍼티를 통해 가져온다.
   이 과정이 있기 때문에 객체에서 클래스 메서드에 접근할 수 있다. */

// 지금까지 했던 설명을 코드로 표현한 것이다.
class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}

// 클래스는 함수
alert(typeof User) // function

// 정확히는 생성자 메서드와 동일하다
alert(User === User.prototype.constructor); // true

// 클래스 내부에서 정의한 메서드는 User.prototype에 저장된다.
alert(User.prototype.sayHi); // alert(this.name);

// 현재 프로토타입에는 메서드가 두 개다.
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

/////////////////////////////////////

/** 클래스는 단순한 편의 문법이 아니다.
 * 어떤 사람들은 class라는 키워드 없이도 클래스 역할을 하는 함수를 선언할 수 있기 때문에
 * `클래스`는 '편의 문법'에 불과하다고 이야기한다.
 * 참고로 기능은 동일하나 기본 문법을 쉽게 읽을 수 있게 만든 문법을 편의 문법(syntactic sugar, 문법 설탕)이라고 한다.
 */

// class User와 동일한 기능을 하는 순수 함수를 만들어보았다.

// 1. 생성자 함수를 만든다.
function User(name) {
    this.name = name;
}
// 모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있기 때문에
// constructor 프로퍼티를 명시적으로 만든 필요가 없다.

// 2. prototype에 메서드를 추가한다.
User.prototype.sayHi = function () {
    alert(this.name);
};

// 사용법:
user = new User("John");
user.sayHi();

/* 위 예시처럼 순수 함수로 클래스 역할을 하는 함수를 선언하는 방법과 class 키워드를 사용하는 방법의 결과는 거의 같다
   class가 단순한 편의 문법이라고 생각하는 이유가 여기에 있다.

   그런데 두 방법에는 중요한 차이가 몇 가지 있다.
    1. class로 만든 함수엔 특수 내부 프로퍼티인 `[[IsClassConstructor]]: true`가 이름표처럼 붙는다.
        이것만으로도 두 방법엔 분명한 차이가 있다.
       자바스크립트는 다양한 경우에 [[IsClassConstructor]]: true를 활용한다.
       클래스 생성자를 new와 함께 호출하지 않으면 에러가 발생하는데 이 때 [[IsClassConstructor]]: true가 사용된다.

       class User {
         constructor() {}
       }

       alert(typeof User); // User의 타입은 함수이긴 하지만 그냥 호출할 수 없다.
       User(); // TypeError: Class constructor User cannot be invoked without 'new'

       클래스 생성자를 문자열로 형변환하면 'class...'로 시작하는 문자열이 되는데 이때도 [[IsClassConstructor]]: true가 사용된다.

       class User {
         constructor() {}
       }
       alert(User); // class User {...}

    2. 클래스에 정의된 메서드는 열거할 수 없다(non-enumerable).
       클래스의 prototype 프로퍼티에 추가된 메서드의 enumerable 플래그는 false이다.

       for..in으로 객체를 순회할 때, 메서드는 순회 대상에서 제외하고자 하는 경우가 많으므로 이 특징은 꽤 유용하다.
    3. 클래스는 항상 엄격 모드로 실행된다(use strict). 클래스 생성자 안 코드 전체엔 자동으로 엄격모드가 적용된다.
   이 외에도 class를 사용하면 다양한 기능이 따라온다.
*/

///////////////////////////////////////////////

/** 클래스 표현식
 * 함수처럼 클래스도 다른 표현식 내부에서 정의, 전달, 변환, 할당할 수 있다.
 * 먼저 클래스 표현식을 만들어보자
 */

let User = class {
    sayHi() {
        alert("안녕하세요.");
    }
};

/* 기명 함수 표현식(Named Function Expression)과 유사하게 클래스 표현식에도 이름을 붙일 수 있다.
   클래스 표현식에 이름을 붙이면, 이 이름은 오직 클래스 내부에서만 사용할 수 있다.
*/

// 기명 클래스 표현식(Named Function Expression)
// (명세서엔 없는 용어이지만, 기명 함수 표현식과 유사하게 동작한다.)
User = class MyClass {
    sayHi() {
        alert(MyClass); // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있다.
    }
};

new User().sayHi(); // 원하는대로 MyClass의 정의를 보여준다.

alert(MyClass); // ReferenceError: MyClass is not defined, MyClass는 클래스 밖에서 사용할 수 없다.

/* 아래와 같이 '필요에 따라' 클래스 동적으로 생성하는 것도 가능하다. */

function makeClass(phrase) {
    // 클래스를 선언하고 이를 반환함
    return class {
        sayHi() {
            alert(phrase);
        };
    };
}

// 새로운 클래스를 만듦
User = makeClass("안녕하세요.");

new User().sayHi(); // 안녕하세요.

////////////////////////////////////////

/** getter와 setter
 * 리터럴을 사용해 만든 객체처럼 클래스도 getter나 setter, 계산된 프로퍼티(computed property)를 지원한다.
 * get과 set을 이용해 user.name을 조작할 수 있게 해보자.
 */

class User {
    constructor(name) {
        // setter를 활성화한다.
        this.name = name;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 2) {
            alert("이름이 너무 짧습니다.");
            return;
        }
        this._name = value;
    }
}

user = new User("보라");
alert(user.name); // 보라

user = new User(""); // 이름이 너무 짧습니다.

/* 참고로 getter와 setter는 User.prototype에 정의된다. */

////////////////////////////////////

/** 계산된 메서드 이름[...]
 * 대괄호 [...]를 이용해 계산된 메서드 이름(computed method name)을 만드는 에시를 살펴보자
 */

class User {
    ['say' + 'Hi']() {
        alert("Hello");
    }
}

new User().sayHi();

/* 계산된 메서드 이름은 리터럴 객체와 유사한 형태를 띠기 때문에 사용법을 외우기 쉽다는 장점이 있다. */

/** 클래스 필드
    * 구식 브라우저에선 폴리필이 필요할 수 있다.
    * 클라스 필드는 최근에 더해진 기능이다.
 * 지금까진 살펴본 에시엔 메서드가 하나만 있었다.
 * '클래스 필드(class filed)'라는 문법을 사용하면 어떤 종류의 프로퍼티도 클래스에 추가할 수 있다.
 * 클래스 User에 name 프로퍼티를 추가해보자.
 */

class User {
    name = "보라";

    sayHi() {
        alert(`${this.name}님 안녕하세요.`);
    }
}

new User().sayHi(); // 보라님 안녕하세요.

/* 클래스를 정의할 때 `<프로퍼티 이름> = <값>`을 써주면 간단히 클래스 필드를 만들 수 있다.
   클래스 필드의 중요한 특징 중 하나는 User.prototype이 아닌 개별 객체에만 클래스 필드가 설정된다는 점이다.
*/

class User {
    name = "보라";
}

user = new User();
alert(user.name); // 보라
alert(User.prototype.name); // undefined

/* 아울러 클래스 필드엔 복잡한 표현식이나 함수 호출 결과를 사용할 수 있다. */

class User {
    name = prompt("이름을 알려주세요.", "보라");
}

user = new User();
alert(user.name); // 보라

/** 클래스 필드로 바인딩 된 메서드 만들기
 * 자바스크립트에서 this는 동적으로 결정된다.
 * 따라서 객체 메서드를 여기저기 전달해 전혀 다른 컨텍스트에서 호출하게 되면 
 * this는 메서드가 정의된 객체를 참조하지 않는다.
 * 
 * 관련 예시를 살펴보자. 예시를 실행하면 undefined가 출력된다.
 */
class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        alert(this.value);
    }
}

let button = new Button("안녕하세요.");

setTimeout(button.click, 1000); // undefined

/* 이렇게 this의 컨텍스트를 알 수 없게 되는 문제를 '잃어버린 this(loosing this)'라고 한다.
   문제는 두 방법을 사용해 해결할 수 있다.
    1. setTimeout(()=> button.click(), 1000) 같이 래퍼 함수를 전달하기.
    2. 생성자 안 등에서 메서드를 객체에 바인딩하기.

   이 두 방법 말고 클래스 필드를 사용해도 우아하게 문제를 해결할 수 있다.
*/

class Button {
    constructor(value) {
        this.value = value;
    }

    click = () => {
        alert(this.value);
    }
}

button = new Button("안녕하세요.");

setTimeout(button.click, 1000); // 안녕하세요.

/* 클래스 필드 click = () => {...}는 각 Button 객체마다 독립적인 함수를 만들어주고
   이 함수의 this를 해당 객체에 바인딩시켜준다.
   따라서 개발자는 button.click을 아무 곳에나 전달할 수 있고, this엔 항상 의도한 값이 들어가게 된다.

   클래스 필드의 이런 기능은 브라우저 환경에서 메서드를 이벤트 리스너로 설정해야할 때 특히 유용하다.
*/

////////////////////////////////////////////////////

/** 요약
 * 아래와 같은 기본 문법을 사용해 클래스를 만들 수 있다.

class MyClass{
    prop = value; // 프로퍼티

    constructor(...) { // 생성자 메서드
        // ...
    }

    method(...) {} // 메서드

    get something(...) {} // getter 메서드
    set something(...) {} // setter 메서드

    [Symbol.iterator]() {} // 계산된 이름(computed name)을 사용해 만드는 메서드 (심볼)
    // ...
}

 * MyClass는 constructor의 코드를 본문으로 갖는 함수이다. 
 * MyClass에서 정의한 일반 메서드나 getter, setter는 MyClass.prototype에 쓰인다.
 */

