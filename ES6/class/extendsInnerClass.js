/** 내장 클래스 확장하기
 * 배열, 맵 같은 내장 클래스도 확장 가능하다.
 * 아래 예시에서 PowerArray는 기본 Array를 상속받아 만들었다.
 */

// 메서드 하나를 추가합니다.(더 많이 추가하는 것도 가능)
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false

/* filter, map 등의 내장 메서드가 상속받는 클래스인 PowerArray의 인스턴스(객체)를 반환한다.
 * 이 객체를 구현할 땐 내부에서 객체의 constructor 프로퍼티를 사용한다.
 * 따라서 아래와 같은 관계를 갖는다.
    arr.constructor === PowerArray
 * arr.filter()가 호출될 때, 내부에선 기본 Array가 아닌 arr.constructor를 기반으로 새로운 배열이 만들어지고 여기에 필터 후 결과가 담긴다.
 * 이렇게 되면 PowerArray에 구현된 메서드를 사용할 수 있다는 장점이 생긴다.
 * 
 * 물론 동작 방식을 변경할 수 있다.
 * 특수 정적 getter인 Symbol.species를 클래스에 추가할 수 있는데, Symbol.species가 있으면 map, filter 등의 메서드를 호출할 때
 * 만들어지는 개체의 생성자를 지정할 수 있다. 원하는 생성자를 반환하기만 하면 된다.
 * map이나 filter 같은 내장 메서드가 일반 배열을 반환하도록 하려면
 * 아래 예시처럼 Symbol.species가 Array를 반환하도록 해주면 된다.
 */

class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // 내장 메서드는 반환 값에 명시된 클래스를 생성자로 사용한다.
    static get [Symbol.species]() {
        return Array;
    }
}

arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter는 arr.constructor[Symbol.species]를 생성자로 사용해 새로운 배열을 만든다.
filteredArr = arr.filter(item => item >= 10);

// filteredArr는 PowerArray가 아닌 Array의 인스턴스이다.
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

/* 보시다시피 이제 .filter가 Array를 반환한다. 따라서 더는 확장 기능이 전달되지 않는다. */

/** 다른 컬렉션도 유사하게 동작한다.
 * Map, Set 같은 컬렉션도 위와 같이 동작한다.
 * 이 컬렉션들도 Symbol.species를 사용한다.
 */

//////////////////////////////////////////////

/** 내장 객체와 정적 메서드 상속
 * 내장 객체는 Object.keys, Array.isArray 등의 자체 정적메서드를 갖는다.
 * 네이티브 클래스들은 서로 상속 관계를 맺는다. Array는 Object를 상속 받는 것처럼
 * 
 * 일반적으론 한 클래스가 다른 클래스를 상속받으면 
 * 정적 메서드와 그렇지 않는 메서드 모두를 상속받는다.
 * 그런데 내장 클래스는 다르다. 내장클래스는 정적 메서드를 상속받지 못한다.
 * 
 * 예를 들어 Array와 Date는 모두 Object를 상속받기 때문에 두 클래스의 인스턴스에선 Object.prototype에 구현된 메서드를 사용할 수 있다.
 * 그런데 Array.[[Prototype]]와 Date.[[Prototype]]은 Object를 참조하지 않기 때문에
 * Array.keys()나 Date.keys() 같은 정ㅈ거 메서드를 인스턴스에서 사용할 수 없다.
 * 즉, Date와 Object를 직접 이어주는 링크가 없다. Date와 Object는 독립적이다.
 * 오직 Date.prototype만 Object.prototype를 상속받는다.
 * 
 * 내장 객체 간의 상속과 extends를 사용한 상속의 가장 큰 차이점이 여기에 있다.
 */