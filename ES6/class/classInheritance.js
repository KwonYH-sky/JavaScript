/** 클래스 상속
 * 클래스 상속을 사용하면 클래스를 다른 클래스로 확장할 수 있다.
 * 기존에 존재하던 기능을 토대로 새로운 기능을 만들 수 있다.
 * 
 ** 'extends' 키워드
 * 먼저, 클래스 Animal을 만들어 보자. 
 */

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        alert(`${this.name} 은/는 속도 ${this.speed}로 달립니다.`);
    }
    stop() {
        this.speed = 0;
        alert(`${this.name} 이/가 멈췄습니다.`);
    }
}

let animal = new Animal("동물");

/* 또 다른 클래스 Rabbit을 만들어 보자.
 * 토끼는 동물이므로 Rabbit은 동물 관련 메서드가 담긴 Animal을 확장해서 만들어야 한다. 
 * 이렇게 하면 토끼도 동물이 할 수 있는 '일반적인' 동작을 수행할 수 있다.
 * 
 * 클래스 확장 문법 class Child extends Parent를 사용해 확장해 보자.
 * Animal을 상속받는 class Rabbit을 만든다.
 */

class Rabbit extends Animal {
    hide() {
        alert(`${this.name} 이/가 숨었습니다!`);
    }
}

let rabbit = new Rabbit("흰 토끼");

rabbit.run(5) // 흰 토끼 은/는 속도 5로 달립니다.
rabbit.hide() // 흰 토끼 이/가 숨었습니다.

/* 클래스 Rabbit을 사용해 만든 객체는 rabbit.hide() 같은 Rabbit에 정의된 메서드에도 접근할 수 있고,
 * rabbit.run()같은 Animal에 정의된 메서드에도 접근할 수 있다.
 *  
 * 키워드 extends는 프로토타입을 기반으로 동ㅈ가한다. 
 * extends는 Rabbit.prototype.[[Prototype]]을 Animal.prototype으로 설정한다.
 * 그렇기 때문에 Rabbit.prototype에서 메서드를 찾지 못하면 Animal.prototype에서 메서드를 가져온다.
 * 
 * 엔진은 다음 절차에 따라 메서드 rabbit.run의 존재를 확인한다.
     * 1. 객체 rabbit에 run이 있나 확인한다. run이 없으면
     * 2. rabbit의 프로토타입인 Rabbit.prototype에 메서드가 있나 확인한다. hide는 있는데 run은 없다.
     * 3. extends를 통해 관계가 만들어진 Rabbit.prototype의 프로토타입, Animal.prototype에 메서드가 있는지 확인한다.
        드디어 메서드 run을 찾았다.
 * 
 * 자바스크립트의 내장 객체는 프로토타입을 기반으로 상속 관계를 맺는다.
 * 마치 Date.prototype.[[Prototype]]이 Object.prototype인 것처럼 말이다.
 * Date 객체에서 일반 객체 메서드를 사용할 수 있는 이유가 바로 여기에 있다.
 */

/** extends 뒤에 표현식이 올 수도 있다.
 * 클래스 문법은 extends 뒤에 표현식이 와도 처리해준다.
 * 아래 예시처럼 extends 뒤에서 부모 클래스를 만들어 주는 함수를 호출 할 수 있다.
 */

function f(phrase) {
    return class {
        sayHi() { alert(phrase) }
    }
}

class User extends f("Hello") { }

new User().sayHi(); // Hello

/* 여기서 class User는 f("Hello")의 반환 값을 상속받는다.
 * 이 방법은 조건에 따라 다른 클래스를 상속받고 싶을 때 유용하다.
 * 조건에 따라 다른 클래스를 반환하는 함수를 만들고, 함수 호출 결과를 상속받게 하면 된다.
 */

////////////////////////////////////////////////

/** 메서드 오버라이딩
 * 특별한 사항이 없으면 class Rabbit은 class Animal에 있는 메서드를 '그대로' 상속받는다.
 * 그런데 Rabbit에서 stop() 등의 메서드를 자체적으로 정의하면, 상속받은 메서드가 아닌 자체 메서드가 사용된다. 
 */

class Rabbit extends Animal {
    stop() {
        // rabbit.stop()을 호출할 때
        // Animal의 stop()이 아닌, 이 메서드가 사용된다.
    }
}

/* 개발을 하다 보면 부모 메서드 전체를 교체하지 않고, 부모 메서드를 토대로 일부 기능만 변경하고 싶을 때가 생긴다.
 * 부모 메서드의 기능을 확장하고 싶을 때도 포함해서 이럴 때 커스텀 메서드를 만들어 작업하게 되는데, 
 * 이미 커스텀 메서드를 만들었더라도 이 과정 전 후에  부모 메서드를 호출하고 싶을 때가 있다.
 * 
 * 키워드 super는 이럴 때 사용한다.
    * super.method(...)는 부모 클래스에 정의된 메서드, method를 호출한다.
    * super(...)는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 할 수 있다.
 * 이런 특징을 이용해 토끼가 멈추면 자동을 숨도록 하는 코드를 만들어보자.
 */
class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }

    run(speed) {
        this.speed = speed;
        alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
    }

    stop() {
        this.speed = 0;
        alert(`${this.name}가 멈췄습니다.`);
    }
}

class Rabbit extends Animal {
    hide() {
        alert(`${this.name}가 숨었습니다.`);
    }

    stop() {
        super.stop(); // 부모 클래스의 stop을 호출해 멈추고,
        this.hide(); // 숨습니다.
    }
}

rabbit = new Rabbit("흰 토끼");

rabbit.run(5); // 흰 토끼가 속도 5로 달립니다.
rabbit.stop(); // 흰 토끼가 멈췄습니다. 흰 토끼가 숨었습니다.

/* Rabbit은 이제 실행 중간에 부모 클래스에 정의된 메서드 super.stop()을 호출하는 stop을 가지게 되었다. */

/** 화살표 함수엔 super가 없다
 * 화살표 함수는 super를 지원하지 않는다.
 * super에 접근하면 아래 예시와 같이 super를 외부 함수에서 가져온다.

    class Rabbit extends Animal {
        stop() {
            setTimeout(() => super.stop(), 1000); // 1초 후에 부모 stop을 호출한다.
        }
    }

 * 화살표 함수의 super는 stop()의 super와 같아서 위 예시는 의도한 대로 동작한다.
 * 그렇지만 setTimeout안에서 '일반'함수를 사용했다면 에러가 발생했을 겁니다.

    // Unexpected super
    setTimeout(function () { super.stop() }, 1000);

 */

/////////////////////////////////////////////////////////

/** 생성자 오버라이딩
 * 생성자 오버라이딩은 좀 더 까다롭다.
 * 지금까진 Rabbit에 자체 constructor가 없었다.
 * 명세서에 따르면, 클래스가 다른 클래스를 상속받고 constructor가 없는 경우엔 아래처럼 '비어있는' constructor가 만들어진다.

    class Rabbit extends Animal {
        // 자체 생성자가 없는 클래스를 상속받으면 자동으로 만들어짐
        constructor(...args) {
            super(...args);
        }
    }

 * 보시다시피 생성자는 기본적으로 부모 constructor를 호출한다.
 * 이때 부모 constructor에도 인수를 모두 전달한다.
 * 클래스에 자체 생성자가 없는 경우엔 이런 일이 모두 자동으로 일어난다.
 * 
 * 이제 Rabbit에 커스텀 생성자를 추가해보자. 커스텀 생성자에서 name과 earLength를 지정한다.
 */

class Rabbit extends Animal {
    constructor(name, earLength) {
        this.speed = 0;
        this.name = name;
        this.earLength = earLength;
    }
    // ...
}

// 동작하지 않는다.
rabbit = new Rabbit("흰 토끼", 10); // ReferenceError: Must call super constructor in derived class before ...

/* 에러가 발생해 토끼를 만들 수 없다.
 * 이유는 다음과 같다
     * 상속 클래스의 생성자에선 반드시 super(...)를 호출해야 하는데, super(...)를 호출하지 않아 에러가 발생했다.
        super(...)는 this를 사용하기 전에 반드시 호출해야 한다.
 * 그런데 왜 super(...)를 호출해야 할까?
 * 상속 클래스의 생성자가 호출될 때 어떤 일이 일어나는지 알아보며 이유를 찾아보자.
 * 
 * 자바스크립트는 '상속 클래스의 생성자 함수(derived constructor)'와 그렇지 않는 생성자 함수를 구분한다.
 * 상속 클래스의 생성자 함수엔 특수 프로퍼티인 [[ConstructorKind]]: "derived"가 이름표처럼 붙는다.
 * 
 * 일반 클래스의 생성자 함수와 상속 클래스의 생성자 함수 간 차이는 new와 함께 드러난다.
     * 일반 클래스가 new와 함께 실행되면, 빈 객체가 만들어지고 this에 이 객체를 할당한다.
     * 반면, 상속 클래스의 생성자 함수가 실행되면, 일반 클래스에서 일어난 일이 일어나지 않는다.
        상속 클래스의 생성자 함수는 빈 객체를 만들고 this에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대한다.
 * 이런 차이 때문에 상속 클래스의 생성자에선 super를 호출해 부모 생성자를 실행해 주어야 한다.
 * 그렇지 않으면 this가 될 객체가 만들어지지 않아 에러가 발생한다.
 * 
 * 아래 예시와 같이 this를 사용하기 전에 super()를 호출하면 Rabbit의 생성자가 제대로 동작한다.
 */

class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
    // ...
}

class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }

    // ...
}

// 이제 에러 없이 동작한다.
rabbit = new Rabbit("흰 토끼", 10);
alert(rabbit.name); // 흰 토끼
alert(rabbit.earLength); // 10

/** 클래스 필드 오버라이딩: 까다로운 내용
 * 오버라이딩은 메서드뿐만 아니라 클래스 필드를 대상으로도 적용할 수 있다.
 * 부모 클래스의 생성자 안에 있는 오버라이딩한 필드에 접근하려고 할 때 
 * 자바스크립트는 다른 프로그래밍 언어와는 다르게 조금 까다롭다.
 */

class Animal {
    name = 'animal';

    constructor() {
        alert(this.name); // (*)
    }
}

class Rabbit extends Animal {
    name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal

/* Animal을 상속받는 Rabbit에서 name 필드를 오버라이딩 했다.
 * Rabbit에는 따로 생성자가 정의되어 있지 않기 때문에 
 * Rabbit을 사용해 인스턴스를 만들면 Animal의 생성자가 호출된다.
 * 흥미로운 점은 new Animal()과 new Rabbit()을 실행할 때 두 경우 모두 (*)로 표시한 줄에 있는 alert 함수를 실행되면서 얼럿창에 animal이 출력된다는 점이다.
 * 이를 통해 우리는 '부모 생성자는 자식 클래스에서 오버라이딩한 값이 아닌, 부모 클래스 안의 필드 값을 사용한다'는 사실을 알 수 있다.
 * 
 * 상속을 받고 필드 값을 오버라이딩했는데 새로운 값 대신 부모 클래스 안에 있는 기존 필드 값을 사용하다니 이상하다.
 * 아래 예시에선 필드 this.name 대신에 메서드 this.showName()을 사용했다.
 */

class Animal {
    showName() {
        alert('animal'); // this.name = 'animal' 대신 메서드 사용
    }

    constructor() {
        this.showName(); // alert(this.name); 대신 메서드 호출
    }
}

class Rabbit extends Animal {
    showName() {
        alert('rabbit');
    }
}

new Animal(); // animal
new Rabbit(); // rabbit

/* 필드를 오버라이딩한 위쪽 예시와 결과가 다르다.
 * 위와 같이 자식 클래스에서 부모 생성자를 호출하면 오버라이딩한 메서드가 실행된다.
 *
 * 그런데 클래스 필드는 자식 클래스엣서 필드를 오버라이딩해도 부모 생성자가 오버라이딩한 필드 값을 사용하지 않는다.
 * 부모 생성자는 항상 부모 클래스에 있는 필드의 값을 사용한다.
 *
 * 왜 이런 차이가 있는 것일까?
 * 이유는 필드 초기화 순서 때문이다. 클래스 필드는 다음과 같은 규칙에 따라 초기화 순서가 달라진다.
    * 아무것도 상속받지 않는 베이스 클래스는 생성자 실행 이전에 초기화됨.
    * 부모 클래스가 있는 경우엔 super() 실행 직후에 초기화됨.
 * 위 예시에서 Rabbit은 하위 클래스이고 constructor()가 정의되어 있지 않다.
 * 이런 경우 앞서 언급한 바와 같이 생성자는 비어있는데 그 안에 super(...args)만 있다고 보면 된다.
 *
 * 따라서 new Rabbit()을 실행하면 super()가 호출되고 그 결과 부모 생성자가 실행된다.
 * 그런데 이때 하위 클래스 필드 초기화 순서에 따라 하위 Rabbit의 필드는 super() 실행후에 초기화된다.
 * 부모 생성자는 실행되는 시점에 Rabbit의 필드는 아직 존재하지 않는다. 이런 이유로 필드를 오버라이딩 했을 때 Animal에 있는 필드가 사용된 것이다.
 *
 * 이렇게 자바스크립트는 오버라이딩시 필드와 메서드의 동작 방식이 미묘하게 다르다.
 * 다행히도 이런 문제는 오버라이딩한 필드를 부모 생성자에서 사용 할 때만 발생한다.
 * 이런 차이가 왜 발생하는지 모르면 결과를 해석할 수 없는 상황이 발생하기 때문에 알아두는 것이 좋다
 *
 * 개발하다가 필드 오버라이딩이 문제가 되는 상황이 발생하면 필드 대신 메서드를 사용하거나 getter나 setter를 사용해 해결하면 된다.
 */

///////////////////////////////////////////////////////////////////////

