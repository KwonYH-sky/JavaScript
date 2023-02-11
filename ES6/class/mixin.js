/** 믹스인
 * 자바스크립트는 단일상속만을 허용하는 언어이다.
 * 객체엔 단 하나의 [[Prototype]]만 있을 수 있고, 클래스는 클래스 하나만 상속받을 수 있다.
 * 
 * 그런데 가끔 이런 제약이 한계처럼 느껴질 때가 있다. 예시를 들면,
 * 클래스 StreetSweeper(도시의 거리를 청소하는 차량)와 클래스 Bicycle이 있는데,
 * 이 둘을 섞어 StreetSweepingBicycle를 만들고 싶다고 해보자.
 * 또는 클래스 User와 이벤트를 생성하는 코드가 담긴 클래스 EventEmitter가 있는데, 
 * EventEmitter의 기능을 User에 추가해 사용자가 이벤트를 내뿜을 수 있게(emit) 해주고 싶다고 해보자.
 * 
 * 이럴 때 믹스인이라 불리는 개념을 사용하면 도움이 된다.
 * Wikipedia에선 믹스인(mixin)을 다른 클래스를 상속받을 필요 없이 이들 클래스에 구현되어있는 메서드를 담고 있는 클래스라고 정의한다.
 * 다시 말해서 믹스인은 특정 행동을 실행해주는 메서드를 제공하는데 단독으로 쓰이지 않고 다른 클래스에 행동을 더해주는 용도로 사용된다.
 */

/** 믹스인 예시
 * 자바스크립트에서 믹스인을 구현할 수 있는 가장 쉬운 방법은 유용한 메서드 여러 개가 담긴 객체를 하나 만드는 것이다.
 * 이렇게 하면 다수의 메서드를 원하는 클래스의 프로토타입을 쉽게 병합할 수 있다.
 * 
 * 아래 예시의 믹스인 sayHiMixin은 User에게 '언어 능력'을 부여해준다.
 */

// 믹스인
let sayHiMixin = {
    sayHi() {
        alert(`Hello ${this.name}`);
    },
    sayBye() {
        alert(`Bye ${this.name}`);
    }
};

// 사용법
class User {
    constructor(name) {
        this.name = name;
    }
}

// 메서드 복사
Object.assign(User.prototype, sayHiMixin);

// 이제 User가 인사를 할 수 있다.
new User("Dude").sayHi(); // Hello Dude

/* 상속 없이 메서드만 간단히 복사했다. 
 * 믹스인을 활용하면 User가 아래 예시처럼 다른 클래스를 상속받는 동시에,
 * 믹스인에 구현된 추가 메서드도 사용할 수 있다.
 */

class User extends Person {
    // ...
}
Object.assign(User.prototype, sayHiMixin);

/* 믹스인 안에서 믹스인 상속을 사용하는 것도 가능하다.
 * 아래 예시에서 sayHiMixin은 sayMixin을 상속받는다.
 */

let sayMixin = {
    say(phrase) {
        alert(phrase);
    }
};

sayHiMixin = {
    __proto__:sayMixin, // (Object.create를 사용해 프로토타입을 성정할 수도 있다.)

    sayHi() {
        // 부모 메서드 호출
        super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
        super.say(`Bye ${this.name}`); // (*)
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(User.prototype, sayHiMixin);

// 이제 User가 인사를 할 수 있다.
new User("Dude").sayHi(); // Hello Dude

/* sayHiMixin에서 부모 메서드 super.say()를 호출하면( (*)로 표시한줄 ) 
 * 클래스가 아닌 sayHiMixin의 프로토타입에서 메서드를 찾는다는 점을 주목하자
 * 
 * 이는 sayHi와 sayBye가 생성된 곳이 sayHiMixin이기 때문이다. 
 * 따라서 메서드를 복사했더라도, 이 메서드들의 내부 프로퍼티인 [[HomeObject]]는 sayHiMixin을 참조한다.
 * 
 * 메서드의 super가 [[HomeObject]].[[Prototype]] 내에서 부모 메서드를 찾기 때문에,
 * 메서드는 User.[[Prototype]]이 아닌 sayHiMixin.[[Prototype]]을 검색한다.
 */

////////////////////////////////////////////////////////////////