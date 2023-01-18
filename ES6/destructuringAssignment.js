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
let [FirstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(title); // Consul

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