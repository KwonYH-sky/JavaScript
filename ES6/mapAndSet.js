/** 맵과 셋
 * 객체 - 키가 있는 컬렉션을 저장함
 * 배열 - 순서가 있는 컬렉션을 저장함
 * 
 * 위 두 자료구조만으론 현실 세계를 반영하기엔 이 두 자료구조 만으론 부족해서 맵(Map)과 셋(Set)이 등장하게 되었다.
 */


/** 맵
 * 맵(Map)은 키가 있는 데이터를 저장한다는 점에서 `객체`와 유사하다. 
 * 다만 `맵`은 키에 다양한 자료형을 허용한다는 점에 차이가 있다.
 * 
 * 맵에는 다음과 같은 주요 메서드와 프로퍼티가 있다.
    * new Map() - 맵을 만든다.
    * map.set(key, value) - `key`를 이용해 `value`를 저장한다.
    * map.get(key) - `key`에 해당하는 값을 반환한다. `key`가 존재하지 않으면 undefined를 반환한다.
    * map.has(key) - key가 존재하면 true, 존재하지 않으면 false를 반환한다.
    * map.delete(key) - key에 해당하는 값을 삭제한다.
    * map.clear() - 맵 안의 모든 요소를 제거한다.
    * map.size - 요소의 개수를 반환한다.
 * 
 */

let map = new Map();

map.set('1', 'str1');   // 문자형 키
map.set(1, 'num1');     // 숫자형 키
map.set(true, 'bool1'); // 뷸란형 키

// 객체는 키를 문자형으로 변환한다.
// 맵은 키의 타입을 변환시키지 않고 그대로 유지한다. 따라서 아래의 코드는 출력되는 값이 다르다.
alert(map.get(1)); // 'num1'
alert(map.get('1')); // 'str1'

alert(map.size); // 3

/* 맵은 객체와 달리 키를 문자형으로 변환하지 않는다. 키엔 자료형 제약이 없다.
 
 ** map[key]는 Map을 쓰는 바른 방법이 아니다.
 * map[key] = 2로 값을 설정하는 것 같이 map[key]를 사용할 수 있긴 하다. 
 * 하지만 이 방법은 map을 일반 객체처럼 취급하게 된다. 따라서 여러 제약이 생기게 된다.
 * map을 사용 할 땐 map 전용 메서드 set, get 등을 사용해야만 한다.
 */

// 맵은 키로 객체를 허용한다.
let john = { name: "John" };

// 고객의 가게 방문 횟수를 세본다고 가정해 보자
let visitsCountMap = new Map();

// john을 맵의 키로 사용한다.
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john)); // 123

/* 객체를 키로 사용할 수 있다는 점은 맵의 가장 중요한 기능 중 하나다.
   객체에는 문자열 키를 사용할 수 있다. 하지만 객체 키는 사용할 수 없다.

   객체형 키를 객체에 써보자. */

john = { name: "John" };

let visitsCountObj = {}; // 객체를 하나 만든다.

visitsCountObj[john] = 123 // 객체[john]를 키로 해서 객체에 값(123)을 저장한다.

// 원하는 값(123)을 얻을려면 아래와 같이 키가 들어갈 자리에 `object Object`를 써줘야한다.
alert(visitsCountObj["[object Object]"]); // 123

/* `visitsCountObj`는 객체이기 때문에 모든 키를 문자형으로 변화시킨다. 
   이 과정에서 john은 문자형으로 변환되어 "[object Object]"가 된다. 
   
 ** `맵`이 키를 비교하는 방식
 * `맵`은 SameValueZero라 불리는 알고리즘을 사용해 값의 등가 여부를 확인한다. 
 * 이 알고리즘은 일치 연산자 ===와 거의 유사하지만, `NaN` 과 `NaN`을 같다고 취급하는 것에서 일치 연산자와 차이가 있다. 
 * 따라서 맵에선 `NaN`도 키로 쓸 수 있다.
 * 이 알고리즘은 수정하거나 커스터마이징 하는 것이 불가능하다.
 * 
 ** 체이닝
 * map.set을 호출할 때마다 맵 자신이 반환된다. 이를 이용하면 map.set을 '체이닝(chaining)'할 수 있다.
 * map.set('1', 'str1')
 *   .set(1, 'num1')
 *   .set(true, 'bool1');
 */

////////////////////

/** 맵의 요소에 반복 작업하기
 * 다음 세 가지 메서드를 사용해 맵의 각 요소에 반복 작업을 할 수 있다.
    * map.keys() - 각 요소의 키를 모은 반복 가능한(iterable, 이터러블) 객체를 반환한다.
    * map.values() - 각 요소의 값을 모은 이터러블 객체를 반환한다.
    * map.entries() - 요소의 `[키, 값]`을 한 쌍으로 하는 이터러블 객체를 반환한다. 이 이터러블 객체는 `for..of` 반복문의 기초로 쓰인다.
 * 
 */

let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion', 50]
]);

// 키(vegetable)를 대상으로 순회한다.
for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
}

// 값(amount)을 대상으로 순회한다.
for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
}

// [키, 값] 쌍을 대사으로 순회한다.
for (let entry of recipeMap.entries()) {
    alert(entry); // cucumber,500 ...
}

/** 맵은 삽입 순서를 기억한다.
 * `맵`은 값이 삽입된 순대서로 순회를 실시한다. 객체가 프로퍼티 순서를 기억하지 못하는 것과는 다르다.
 
 * 여기에 더하여 맵은 배열과 유사하게 내장 메서드 forEach도 지원한다.
 */

// 각 (키, 값) 쌍을 대상으로 함수를 실행
recipeMap.forEach((value, key, map) => {
    alert(`${key}: ${value}`); // cucumber: 500 ...
});

////////////////////////////////////

/** Object.entries: 객체를 맵으로 바꾸기
 * 각 요소가 키-값 쌍인 배열이나 이터러블 객체를 초기화 용도로 `맵`에 전달해 새로운 `맵`을 만들 수 있다.
 */

// 각 요소가 [키, 값] 쌍인 배열
map = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

alert(map.get('1')); // str1

/* 평범한 객체를 가지고 맵을 만들고 싶다면 내장 메서드 Object.entries(obj)를 활용해야 한다. 
   이 메서드는 객체의 키-값 쌍을 요소([key, value])로 가지는 배열을 반환한다.
 */

let obj = {
    name: "John",
    age: 30
};

map = new Map(Object.entries(obj));

alert(map.get('name')); // John

/* Object.entries를 사용해 객체 obj를 배열 [ ["name: John"], ["age": 30] ]로 바꾸고, 
   이 배열을 이용해 새로운 맵을 만들어보았다.
 */

//////////////////////////////

/** Object.fromEntries: 맵을 객체로 바꾸기
 * 방금까진 Object.entries(obj)를 사용해 평범한 객체를 맵으로 바꾸는 방법을 알아보았다.
 * 이 반대인 맵을 객체로 바꾸는 방범인 Object.fromEntries를 사용하면 가능하다.
 * 이 메서드는 각 요소가 [키, 값] 쌍인 배열을 객체로 바꿔준다.
 */

let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat, 4']
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2

/* 자료가 맵에 저장되어있는데, 서드파티 코드에서 자료를 객체형태로 념겨 받길 원할 때 이 방법을 사용할 수 있다. */

map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

obj = Object.fromEntries(map.entries); // 맵을 일반 객체로 변환 (*)

// 맵이 객체가 되었다.
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2

/* map.entries()를 호출하면 맵의 [키, 값]을 요소로 가지는 이터러블을 반환한다.
   Object.fromEntries를 사용하기 위해 딱 맞은 형태다.

   (*)로 표시한 줄을 좀 더 짧게 줄이는 것도 가능하다. 
 */

obj = Object.fromEntries(map); // .entries()를 생략함

/* Object.fromEntries는 인수로 이터러블 객체를 받기 때문에 짧게 줄인 코드도 이전 코드와 동일하게 동적한다.
   꼭 배열을 전달해줄 필요는 없다. 그리고 map에서의 일반적인 반복은 map.entries()를 사용할 때와 같은 키-값 쌍을 반환한다.
   따라서 map과 동일한 키-값을 가진 일반 객체를 얻게 된다. */
