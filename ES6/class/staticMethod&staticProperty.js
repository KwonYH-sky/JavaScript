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

/* 
 * 
 */