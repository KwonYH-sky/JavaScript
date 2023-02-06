/** 정적 메서드와 정적 프로퍼티
 * "prototype"이 아닌 클래스 함수 자체에 메서드를 설정할 수도 있다. 
 * 이런 메서드를 정적(static) 메서드라 부른다.
 * 
 * 정적 메서드는 아래와 같이 클래스 안에서 static 키워드를 붙여 만들 수 있다.
 */

class User {
    static staticMethod() {
        alert(this === User);
    }
}

User.staticMethod(); // true

/* 정적 메서드는 메서드를 프로퍼티 형태로 직접 할당하는 것과 동일한 일을 한다. */

class User { }

User.staticMethod = function () {
    alert(this === User);
};

User.staticMethod(); // true

/* User.staticMethod()가 호출될 때 this의 값은 클래스 생성자인 User 자체가 된다.(점 앞 객체)
 * 정적 메서드는 어떤 특정한 객체가 아닌 클래스에 속한 함수를 구현하고자 할 때 주로 사용된다.
 * 
 * 객체 Article이 여러 개 있고 이들을 비교해줄 함수가 필요하다고 가정해 보자
 * 가장 먼저 아래와 같이 Article.compare를 추가하는 방법을 사용하자.
 */

class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

// 사용법
let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

alert(articles[0].title); // CSS

/* 여기서 Article.compare는 article(글)을 비교해주는 수단으로, 글 전체를 '위에서' 바라보며 비교를 수행한다.
 * Article.compare이 글 하나의 메서드가 아닌 클래스의 메서드여야 하는 이유는 여기에 있다.
 * 
 * 이번에 살펴볼 예시는 '팩토리' 메서드를 구현한 코드이다. 
 * 다양한 방법을 사용해 조건에 맞는 article 인스턴스를 만들어야 한다고 가정해 보자.
    * 1. 매개변수(title, date 등)를 이용해 관련 정보가 담긴 article 생성
    * 2. 오늘 날짜를 기반으로 비어있는 article 생성
    * 3. 기타 등등
 * 첫 번째 방법은 생성자를 사용해 구현할 수 있다. 
 * 두 번째 방법은 클래스에 정적 메서드를 만들어 구현할 수 있다.
 * 
 * 아래 Article.createTodays() 처럼..
 */

class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static createTodays() {
        // this는 Article이다.
        return new this("Today's digest", new Date());
    }
}

let article = Article.createTodays();

alert(article.title); // Today's digest

/* 이제 Today's digest라는 글이 필요할 때마다 Article.createTodays()를 호출하면 된다.
 * 여기서도 마찬가지로 Article.createTodays()는 article의 메서드가 아닌 전체 클래스의 메서드이다.
 *
 * 정적 메서드는 아래 예시와 같이 항목 검색, 저장, 삭제 등을 수행해주는 데이터베이스 관련 클래스에도 사용된다.

    // Article은 article을 관리해주는 특별 클래스라고 가정하자.
    // article 삭제에 쓰이는 정적 메서드
    Article.remove({id: 12345});
 */

/////////////////////////////////////////////

/** 정적 프로퍼티
    * 스펙에 추가된지 얼마 안된 문법이다. 예시는 Chrome에서만 동작할 수 있다.
 * 정적 프로퍼티도 물론 만들 수 있다.
 * 정적 프로퍼티는 일반 클래스 프로퍼티와 유사하게 생겼는데 앞에 static이 붙는다는 점만 다르다.
 */

class Article {
    static publisher = "Ilya Kantor";
}

alert(Article.publisher); // Ilya Kantor

/* 위 예시는 Article에 프로퍼티를 직접 할당한 것과 동일하게 동적한다. */

Article.publisher = "Ilya Kantor";

/** 정적 프로퍼티와 메서드 상속
 * 정적 프로퍼티와 메서드는 상속된다.
 * 
 * 아래 예시에서 Animal.compare와 Animal.planet은 상속되어서 
 * 각각 Rabbit.compare와 Rabbit.planet에서 접근할 수 있다.
 */

class Animal {
    static planet = "지구";

    constructor(name, speed) {
        this.speed = speed;
        this.name = name;
    }

    run(speed = 0) {
        this.speed += speed;
        alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
    }

    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }
}

class Rabbit extends Animal {
    hide() {
        alert(`${this.name}가 숨었습니다!`);
    }
}

let rabbits = [
    new Rabbit("흰 토끼", 10),
    new Rabbit("검은 토끼", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // 검은 토끼가 속도 5로 달립니다.

alert(Rabbit.planet); // 지구

/* 이제 Rabbit.compare을 호출하면 Animal.compare가 호출된다.
 * 이게 가능한 이유는 프로토타입 때문이다.
 * extends 키워드는 Rabbit의 [[Prototype]]이 Animal을 참조하도록 해준다.
 * 
 * 따라서 Rabbit extends Animal은 두 개의 [[Prototype]] 참조를 만들어 낸다.
    * 1. 함수 Rabbit은 프로토타입을 통해 함수 Animal을 상속받는다.
    * 2. Rabbit.prototype은 프로토타입을 통해 Animal.prototype을 상속받는다.
 * 이런 과정이 있기 때문에 일반 메서드 상속과 정적 메서드 상속이 가능하다.
 */

class Animal { }
class Rabbit extends Animal { }

// 정적 메서드
alert(Rabbit.__proto__ === Animal);

// 일반 메서드
alert(Rabbit.prototype.__proto__ === Animal.prototype);

///////////////////////////////

/** 요약
 * 정적 메서드는 특정 클래스 인스턴스가 아닌 클래스 '전체'에 필요한 기능을 만들 때 사용할 수 있다.
 * 인스턴스끼리 비교해주는 메서드 Article.compare(article1, article2)이난 팩토리 메서드 Article.createTodays()를 만들 때 정적 메서드가 쓰인다.
 * 정적 메서드는 클래스 선언부 안에 위치하고 앞에 static이라는 키워드가 붙는다.
 * 정적 프로퍼티는 데이터를 틀래스 수준에 저장하고 싶을 때 사용한다. 정적 프로퍼티 역시 개별 인스턴스에 묶이지 않는다.
 *
 * 문법:
    class MyClass {
        static property = ...;

        static method() {
            ...
        }
    }
 * static을 사용한 선언은 기술적으론 클래스 자체에 직접 할당하는 것과 동일하다.
    MyClass.property = ...
    MyClass.method = ...
 * 정적 프로퍼티와 정적 메서드는 상속이 가능하다.
 * class B extends A는 클래스 B의 프로토타입이 클래스 A를 가리기게한다(B.[[Prototype]] = A).
 * 따라서 B에서 원하는 프로퍼티나 메서드를 찾지 못하면 A로 검색이 이어진다.
 */

////////////////////////////////////////////////////////////

/** Object를 상속받는 클래스
 * 아시다시피, 객체는 보통 Object.prototype를 상속받고 
 * hasOwnProperty같은 ‘일반’ 객체 메서드에 접근할 수 있습니다.
 * 
 * 예시:
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// 메서드 hasOwnProperty는 Object.prototype에서 왔습니다.
alert( rabbit.hasOwnProperty('name') ); // true

 * 그런데 "class Rabbit extends Object"같이 상속을 명시적으로 해주는 경우와 
 * 그냥 "class Rabbit"를 사용하는 경우, 결과가 다를까요?
 * 만약 다르다면 어떤 것이 다를까요?
 * 아래 예시에서 "class Rabbit extends Object"를 사용한 코드가 있는데, 
 * 실행해보면 동작하지 않습니다. 어디서 문제가 생긴걸까요? 코드를 수정해보세요.
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
 */

class Rabbit extends Object {
    constructor(name) {
      super();
      this.name = name;
    }
}
  
alert( Rabbit.hasOwnProperty('name') );

/** 해답
class Rabbit extends Object {
  constructor(name) {
    super(); // 상속 클래스의 생성자에선 부모 생성자를 반드시 호출해야 합니다.
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true 
 * ‘extends’ 문법은 두 개의 프로토타입을 설정합니다.
    * 1. 생성자 함수의 "prototype" 사이(일반 메서드용)
    * 2. 생성자 함수 자체 사이(정적 메서드용)
 * 따라서 Rabbit은 아래와 같이 Rabbit을 통해 Object의 정적 메서드에 접근할 수 있습니다.
 */