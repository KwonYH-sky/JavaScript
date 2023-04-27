/** JSON과 메서드
 * 복잡한 객체를 다루고 있다고 가정해보자.
 * 네트워크를 통해 객체를 어딘가에 보내거나 로깅 목적으로 객체를 출력해야 한다면 객체를 문자열로 전환해야 한다.
 * 
 * 이때 전환된 문자열엔 원하는 정보가 있는 객체 프로퍼티 모두가 포함되어야만 한다.
 * 아래와 같은 메서드를 구현해 객체를 문자열로 전환해보자.
 */
let user = {
    name: "John",
    age: 30,

    toString() {
        return `{name: "${this.name}", age: ${this.age}}`;
    }
};

alert(user); // {name: "John", age: 30}

/* 그런데 개발 과정에서 프로퍼티가 추가되거나 삭제, 수정될 수 있다. 
 * 이렇게 되면 위에서 구현한 `toString`을 매번 수정해야 하는데 이는 아주 비효율적인 작업이 될 것이다.
 * 프로퍼티에 반복문을 돌리는 방법을 대안으로 사용할 수 있는데, 
 * 중첩 객체 등으로 인해 객체가 복잡한 경우 이를 문자열로 변경하는 것은 까다로운 작업이라 이마저도 쉽지 않을 것이다.
 * 
 * 다행히 자바스크립트엔 이런 문제를 해결해주는 방법이 있다.
 * 관련 기능이 이미 구현되어 있어서 직접 코드를 짤 필요가 없다.
 */

/** JSON.stringify
 * JSON(JavaScript Object Notation)은 값이나 객체를 나타내주는 범용 포맷으로, RFC 4627 표준에 정의되어 있다.
 * JSON은 본래 자바스크립트에서 사용할 목적으로 만들어진 포맷이다. 
 * 그런데 라이브러리를 사용하면 자바스크립트가 아닌 언어에서도 JSON을 충분히 다룰 수 있어서,
 * JSON을 데이터 교환 목적으로 사용하는 경우가 많다.
 * 특히 클라이언트 측 언어가 자바스크립트일 때이다. 서버 측 언어는 무엇이든 상관없다.
 * 
 * 자바스크립트가 제공하는 JSON 관련 메서드는 아래와 같다.
    * JSON.stringify - 객체를 JSON으로 바꿔준다.
    * JSON.parse - JSON을 객체로 바꿔준다.
 * 
 * 객체 student에 JSON.stringify를 적용하자.
 */
let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};

let json = JSON.stringify(student);

alert(typeof json);

alert(json);
/* JSON으로 인코딩된 객체:
{
    "name": "John",
    "age" : 30,
    "isAdmin" : false,
    "courses" : ["html", "css", "js"],
    "wife" : null
}
*/

/* JSON.stringify(student)를 호출하자 student가 문자열로 바뀌었다.
 * 이렇게 변경된 문자열은 JSON으로 인코딩된(JSON-encoded), 직렬화 처리된(serialized), 
 * 문자열로 변환된(stringified), 결집된(marshalled) 객체라고 부른다.
 * 객체는 이렇게 문자열로 변환된 후에야 비로소 네크워크를 통해 전송하거나 저장소에 저장할 수 있다.
 * 
 * JSON으로 인코딩된 객체는 일반 객체와 다른 특징을 보인다.
    * 문자열은 큰따옴표로 감싸야 한다. JSON에선 작은따옴표나 백틱을 사용할 수 없다('John'이 "John"으로 변경된 것을 통해 이를 확인 할 수 있음).
    * 객체 프로퍼티 이름은 큰따옴표로 감싸야 한다(age:30이 "age":30으로 변한 것을 통해 이를 확인할 수 있음). 
 * 
 * JSON.stringify는 객체뿐만 아니라 원시값에도 적용할 수 있다.
 * 적용할 수 있는 자료형은 아래와 같다.
    * 객체 {...}
    * 배열 [...]
    * 원시형:
        * 문자형
        * 숫자형
        * 불린형 값 true와 false
        * null
 * 
 */

// 예시:
// 숫자를 JSON으로 인코딩하면 숫자이다.
alert( JSON.stringify(1) ); // 1

// 문자열을 JSON으로 인코딩하면 문자열이다(다만, 큰따옴표가 추가된다).
alert( JSON.stringify('test') ); // "test"

alert( JSON.stringify(true) );  // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]

/* JSON은 데이터 교환을 목적으로 만들어진 언어에 종속되지 않는 포맷이다.
 * 따라서 자바스크립트는 특유의 객체 프로퍼티는 JSON.stringify가 처리할 수 없다.
 * 
 * JSON.stringify 호출시 무시되는 프로퍼티는 아래와 같다.
    * 함수 프로퍼티(메서드)
    * 심볼형 프로퍼티(키가 심볼인 프로퍼티)
    * 값이 undefined인 프로퍼티
 */

user = {
    sayHi(){ // 무시
        alert("Hello"); 
    },
    [Symbol("id")]: 123, // 무시
    something: undefined // 무시
};

alert( JSON.stringify(user) ); // {} (빈 객체가 출력됨)

/* 대개 이 프로퍼티들은 무시 되어도 괜찮다. 그런데 이들도 문자열에 포함시켜야 하는 경우도 생기곤 한다.
 * 
 * JSON.stringify의 장점 중 하나는 중첩 객체도 알아서 문자열로 바꿔준다는 점이다.
 */

// 예시:
let meetup = {
    title:"Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
};

alert( JSON.stringify(meetup) );
/* 객체 전체가 문자열로 변환되었다.
{
    "title":"Conference",
    "room":{"number":23, "participants": ["john", "ann"]},
}
*/

/* JSON.stringify를 사용할 때 주의할 점이 하나 있다.
 * 순환 참조가 있으면 원하는 대로 객체를 문자열로 바꾸는 게 불가능하다.
 */

// 예시:
let room = {
    number: 23
};

meetup = {
    title:"Conference",
    participants: ["john", "ann"]
};

meetup.place = room;        // meetup은 room을 참조한다.
room.occupiedBy = meetup;   // room은 meetup을 참조한다.

JSON.stringify(meetup); // Error: Converting circular structure to JSON

/* room.occupiedBy는 meetup을, meetup.place는 room을 참조하기 때문에 JSON으로의 변환이 실패헀다. */

////////////////////////////////////

/** replacer로 원하는 프로퍼티만 직렬화하기
 * JSON.stringify의 전체 문법은 아래와 같다.
 
    let json = JSON.stringify(value[, replacer, space])

 * value
    인코딩하는 값
 * replacer
    JSON으로 인코딩 하길 원하는 프로퍼티가 담긴 배열, 또는 매핑 함수 
 * space
    서식 변경 목적으로 사용할 공백 문자 수
 
 * 대다수의 경우 JSON.stringify엔 인수를 하나만 넘겨서 사용한다.
 * 그런데 순환 참조를 다뤄야 하는 경우같이 전환 프로세스를 정교하게 조정하려면 두 번째 인수를 사용해야 한다.
 * 
 * JSON으로 변환하길 원하는 프로퍼티가 담긴 배열을 두 번째 인수로 넘겨주면 이 프로퍼티들만 인코딩할 수 있다.
 */
// 예시:
let room = {
    number: 23
};

let meetup = {
    title:"Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup은 room을 참조한다.
}

room.occupiedBy = meetup; // room은 meetup을 참조한다.

alert( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference", "participants":[{}, {}]}

/* 배열에 넣어준 프로퍼티가 잘 출력되었다. 그런데 배열에 name을 넣지 않아서 출력된 문자열의 participants가 텅 비어있다.
 * 규칙이 너무 까다로워서 발생한 문제이다.
 * 
 * 순환 참조를 발생시키는 프로퍼티 room.occupiedBy만 제외하고 모든 프로퍼티를 배열에 넣어보자.
 */

let room = {
    number: 23
};

let meetup = {
    title:"Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup은 room을 참조한다.
}

room.occupiedBy = meetup; // room은 meetup을 참조한다.

alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
    "title":"Conference", 
    "participants":[{name: "John"}, {name: "Alice"}],
    "place":{"number":23}
}
*/

/* occupiedBy를 제외한 모든 프로퍼티가 직렬화되었다. 그런데 배열이 좀 길다는 느낌이 든다.
 * `replacer` 자리에 배열 대신 함수를 전달해 이 문제를 해결해보자(매개변수 replacer는 '대신하다'라는 뜻을 가진 영단어이다).
 * `replacer`에 전달되는 함수(replacer 함수)는 프로퍼티 (키, 값)쌍 전체를 대상으로 호출되는데, 
 * 반드시 기존 프로퍼티 값을 대신하여 사용할 값을 반환해야 한다.
 * 특정 프로퍼티를 직렬화에서 누락시키려면 반환 값을 undefined로 만들면 된다.
 * 
 * 아래 예시는 occupiedBy를 제외한 모든 프로퍼티의 값을 변경 없이 "그대로" 직렬화하고 있다.
 * occupiedBy는 undefined를 반환하게 해 직렬화에 포함하지 않는 것도 확인해 보자.
 */

let room = {
    number: 23
};

let meetup = {
    title:"Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup은 room을 참조한다.
}

room.occupiedBy = meetup; // room은 meetup을 참조한다.

alert( JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
} ));
/* replacer 함수에서 처리하는 키:값 쌍 목록
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/

/* `replacer` 함수가 중첩 객체와 배열의 요소까지 포함한 모든 키-값 쌍을 처리하고 있다는 점에 주목하자.
 * `replacer` 함수는 재귀적으로 키-값 쌍을 처리하는데, 함수 내에서 this는 현재 처리하고 있는 프로퍼티가 위치한 객체를 가리킨다.
 * 
 * 첫 얼럿창에 예상치 못한 문자열(":[object Object]")이 뜨는걸 볼 수 있는데, 이는 함수가 최초로 호출될 때 {"": meetup} 형태의 "래퍼 객체"가 만들어지기 때문이다.
 * `replacer` 함수가 가장 처음으로 처리해야하는 (key, value) 쌍에서는 키는 빈 문자열, 값은 반환하고자 하는 객체(meetup) 전체가 되는 것이다.
 * 
 * 이렇게 replacer 함수를 사용하면 중첩 객체 등을 포함한 객체 전체에서 원하는 프로퍼티만 선택해 직렬화 할 수 있다.
 */

/////////////////////////////////////////////

/** space로 가독성 높이기
 * JSON.stringify(value, replacer, space)의 세 번째 인수 space는 가독성을 높이기 위해 중간에 삽임해 줄 공백 문자 수를 나타낸다.
 * 
 * 지금까진 `space` 없이 메서드를 호출했기 때문에 인코딩된 JSON에 들여쓰기나 여분의 공백문자가 하나도 없었다.
 * `space`는 가독성을 높이기 위한 용도로 만들어졌기 때문에 단순 전달 목적이라면 space 없이 직렬화하는 편이다.
 * 
 * 아래 예시처럼 `space`에 2를 넘겨주면 자바스크립트는 중첩 객체를 별도의 줄에 출력해주고 공백 문자 두 개를 써 들려쓰기를 해준다.
 */
user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};

alert( JSON.stringify(user, null, 2) );
/* 공백 문자 두 개를 사용하여 들여쓰기함:
{
  "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

/* JSON.stringify(user, null, 4)라면 아래와 같이 좀 더 들여써진다.
{
    "name": "John",
        "age": 25,
        "roles": {
            "isAdmin": false,
            "isEditor": true
        }
}
*/

/* 이처럼 매개변수 space는 로깅이나 가독성을 높이는 목적으로 사용된다. */

/** 커스텀 "toJSON"
 * toString을 사용해 객체를 문자형으로 변환시키는 것처럼, 
 * 객체에 toJSON이라는 메서드가 구현되어 있으면 객체를 JSON으로 바꿀 수 있을 것이다.
 * JSON.stringify는 이런 경우를 감지하고 toJSON을 자동으로 호출해준다.
 */

// 예시:
room = {
    number: 23
};

meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
};

alert( JSON.stringify(meetup) );
/*
{
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room":{"number":23}                // (2)
}
*/

/* Date 객체의 내장 메서드 toJSON이 호출되면서 date의 값이 문자열로 변환된 걸 확인할 수 있다.( (1) ).
 * 이번엔 room에 직접 커스텀 메서드 toJSON을 추가해보자. 그리고 (2)로 표시한 줄이 어떻게 변경되는지 확인하자.
 */

room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

meetup = {
    title: "Conference",
    room
};

alert( JSON.stringify(room) ); // 23

alert( JSON.stringify(meetup) );
/*
{
    "title":"Conference",
    "room": 23
}
*/

/* 위와 같이 toJSON은 JSON.stringify(room)를 직접 호출할 때도 사용할 수 있고, 
 * room과 같은 중첩객체에도 구현하여 사용할 수 있다.
 */