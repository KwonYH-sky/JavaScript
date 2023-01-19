/** 구조 분해 할당
 * 객체와 배열은 자바스크립트에서 가장 많이 쓰이는 자료 구조이다.
 * 키를 가진 데이터 여러 개를 하나의 엔티티에 저장할 땐 객체를, 컬렉션에 데이터를 순서대로 저장할 땐 배열을 사용한다.
 * 
 * 개발을 하다 보면 함수에 객체나 배열을 전달해야하는 경우가 생기곤 한다.
 * 가끔은 객체나 배열에 저장된 데이터 전체가 아닌 일부만 필요한 경우가 생기기도 한다.
 * 
 * 이럴 땐 객체나 배열을 변수로 '분해'할 수 있게 해주는 특별한 문법인 구조 분해 할당(destructuring assignment)을 사용할 수 있다.
 * 이 외에도 함수의 매개 변수가 많거나 매개변수 기본값이 필요한 경우 등에서 구조 분해(destructuring)는 그 진가를 발휘한다.
 */

/** 배열 분해하기
 * 배열이 어떻게 변수로 분해되는지 예제를 통해 보자.
 */

// 이름과 성을 요소로 가진 배열
let arr = ["Bora", "Lee"];

// 구조 분해 할당을 이용해
// firstName엔 arr[0]을
// surname엔 arr[1]을 할당하였다.
let [firstName, surname] = arr;

alert(firstName); // Bora
alert(surname); // Lee

/* 이제 인덱스를 이용해 배열에 접근하지 않고도 변수로 이름과 성을 사용할 수 있게 되었다.
   아래 예시처럼 split 같은 반환 값이 배열인 메서드를 함께 활용해도 좋다. */

[firstName, surname] = "Bora Lee".split(' ');

/** '분해(destructuring)'은 '파괴(destructive)'를 의미하지 않는다.
 * 구조 분해 할단이란 명칭은 어떤 것을 복사한 이후에 변수로 '분해(destructurize)'해준다는 의미때문에 붙여졌다.
 * 이 과정에서 분해 대상은 수정 또는 파괴되지 않는다.
 * 
 * 배열의 요소를 직접 변수에 할당하는 것보다 코드 양이 줄어든다는 점만 다르다.
 * // let [firstName, surname] = arr;
 * let firstName = arr[0];
 * let surname = arr[1];
 */

/** 쉼표를 사용하여 요소 무시하기.
 * 쉼표를 사용하면 필요하지 않는 배열 요소를 버릴 수 있다.
 */
let [FirstName, , Title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(Title); // Consul

/* 두 번째 요소는 생략되었지만, 세 번째 요소는 title이라는 변수에 할당 된 것을 확인할 수 있다.
   할당한 변수가 없기 때문에 네 번째 요소 역시 생략되었다.
*/

/** 할당 연산자 우측엔 모든 이터러블이 올 수 있다.
 * 배열 뿐만 아니라 모든 이터러블(iterable, 반복 가능한 객체)에 구조 분해 할당을 적용할 수 있다.
 */
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

/** 할당 연산자 좌측엔 뭐든지 올 수 있다.
 * 할당 연산자 좌측엔 '할당할 수 있는(assignables)'것이라면 어떤 것이든 올 수 있다.
 * 아래와 같이 객체 프로퍼티도 가능하다.
 */
let user = {};
[user.name, user.surname] = "Bora Lee".split(' ');

alert(user.name); // Bora

/** .entries()로 반복하기
 * Object.entries(obj)와 구조 분해를 조합하면 객체의 키와 값을 순회해 변수로 분해 할당할 수 있다.
 */
user = {
    name: "John",
    age: 30
};

// 객체의 키와 값 순회하기
for (let [key, value] of Object.entries(user)) {
    alert(`${key}: ${value}`); // name: John, age:30이 차례대로 출력 
}

// 맵에서도 물론 이 메서드를 활용할 수 있다.
user = new Map();
user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user) {
    alert(`${key}: ${value}`); // name: John, age: 30
}

/** 변수 교환트릭
 * 두 변수에 저자왼 값을 교환할 때 구조 분해 할당을 사용할 수 있다.
 */
let guest = "John";
let admin = "Pete";

// 변수 guest엔 Pete, 변수 admin엔 John이 저장되도록 값을 교환
[guest, admin] = [admin, guest];

alert(`${guest}, ${admin}`);

/* 예시에선 임시 배열을 만들어 두 변수를 담고, 요소 순서를 교체해 배열을 분해하는 방식을 사용했다.
   이 방식을 사용하면 두 개뿐만 아니라 그 이상의 변수에 담긴 값도 교환할 수 있다. */

/** '...'로 나머지 요소 가져오기
 * 배열 앞쪽에 위치한 값 몇개만 필요하고, 그 이후 이어지는 나머지 값들은 한데 모아서 저장하고 싶을 때가 있다.
 * 이럴 때는 점 세 개를 붙인 매개변수 하나를 추가하면 '나머지(rest)'요소를 가져올 수 있다.
 */
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar

// 'rest'는 배열이다.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2

/* rest는 나머지 배열 요소들이 저장된 새로운 배열이 된다.
   rest 대신에 다른 이름을 사용해도 되는데, 변수 앞의 점 세 개(...)와 변수가 가장 마지막에 위치해야 한다는 점은 지켜야한다.
*/

/** 기본값
 * 할당하고자 하는 변수의 개수가 분해하고자 하는 배열의 길이보다 크더라도 에러가 발생하지 않는다.
 * 할당한 값이 없으면 undefined로 취급되기 때문이다.
 */

[firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined

/* =을 이용하면 할당할 값이 없을 때 기본으로 할당해 줄 값인 '기본값(default value)'을 설정할 수 있다. */

// 기본값
let [name = "Guest", Surname = "Anonymous"] = ["Julius"];

alert(name) // Julius (배열에서 받아온 값)
alert(Surname) // Anonymous (기본값)

/* 복잡한 표현식이나 함수 호출도 기본값이 될 수 있다. 
   이렇게 기본식으로 표현식이나 함수를 설정하면 할당한 값이 없을 때 표현식이 평가되거나 함수가 호출된다.

   기본값으로 두 개의 prompt 함수를 할당한 예시를 보자
   값을 제공되지 않을 때만 함수가 호출되므로, prompt는 한 번만 호출된다.
*/

[surname = prompt('성을 입력하세요.'), name = prompt('이름을 입력하세요.')] = ["김"];

alert(surname); // 김 (배열에서 받아온 값)
alert(name); // prompt에서 받아온 값

///////////////////////////////////

/** 객체 분해하기
 * 구조 분해 할당으로 객체도 분해할 수 있다.
 * 기본 문법은 다음과 같다.
 * let {var1, var2} = {var1:..., var2:...}
 * 
 * 할당 연산자 우측엔 분해하고자 하는 객체를, 좌측엔 상응하는 객체 프로퍼티의 '패턴'을 넣는다.
 * 분해하려는 객체 프로퍼티의 키 목록을 패턴으로 사용하는 예시를 살펴보자.
 */

let options = {
    title: "Menu",
    width: 100,
    height: 200
};

let { title, width, height } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200

/* 프로퍼티 options.title과 options.width, options.height에 저장된 값이 사응하는 변수에 할당된 것을 확인할 수 있다.
   참고로 순서는 중요하지 않다.
*/
// let {...} 안의 순서가 바뀌어도 동일하게 동작함
/* let {height, width, title} = { title: "Menu", height: 200, width: 100 }; */

/* 할당 연산자 좌측엔 좀 더 복잡한 패턴이 올 수도 있다. 분해하려는 객체의 프로퍼티와 변수와 연결을 원하는 대로 조정할 수도 있다.

   객체 프로퍼티를 프로퍼티 키와 다른 이름을 가진 변수에 저장해보자.
   options.width를 w라는 변수에 저장하는 식으로..
   좌측 패턴에 콜론(:)을 사용하면 원하는 목표를 달성할 수 있다.
*/

options = {
    title: "Menu",
    width: 100,
    height: 200
};

let { width: w, height: h, title: theme } = options;

// width -> w
// height -> h
// title -> theme

alert(theme); // Menu
alert(h); // 200
alert(w); // 100

/* 클론은 '분해하려는 객체의 프로퍼티: 목표 변수'와 같은 형태로 사용한다.
   위 예시에선 프로퍼티 width를 변수 w에, 프로퍼티 height를 변수 h에 저장했다.

   프로퍼티가 없는 경우를 대비하여 =을 사용해 기본값을 설정하는 것도 가능하다.
*/

/*
let options = {
    title: "Menu"
};

let { width = 100, height =  200, title } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200
*/

/* 배열 혹은 함수의 매개변수에서 했던 것처럼 객체에도 표현식이나 함수 호출을 기본값으로 할당할수 있다.
   물론 표현식이나 함수는 값이 제공되지 않을때 평가 혹은 실행된다.

   아래 예시는 width 값만 물어보고 title 값은 물어보지 않는다.
*/

/*
let options = {
    title: "Menu"
};

let { width: prompt("width?"), title: prompt("title?") } = options;

alert(title); // Menu
alert(width); // prompt 창에 입력한 값
*/

// 클론과 할당 연산자를 동시에 사용할 수 도 있다
/*
let options = {
    title: "Menu"
};

let { width: w = 100, height: h = 200, title } = options;

alert(title); // Menu
alert(w); // 100
alert(h); // 200
*/

// 프로퍼티가 많은 복잡한 객체에서 원하는 정보만 뽑아오는 것도 가능하다.
/*
let options = {
    title: "Menu",    
    width: 100,
    height: 200
};

let { title } = options;

alert(title); // Menu
*/

/** 
 * 
 */