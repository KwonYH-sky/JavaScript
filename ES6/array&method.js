/** 배열과 메서드
 * 배열은 다양한 메서드를 제공한다.
 *
 ** 요소 추가, 제거 메서드
 * :arr.push(...item) - 맨 끝에 요소 추가
 * :arr.pop() - 맨 끝 요소 제거
 * :arr.shift() - 맨 앞 요소 제거
 * :arr.unshift(...item) - 맨 앞에 요소 추가
 * 이 외에 요소 추가와 제거에 관련된 메서드들이 있다.
 */

///////////

/** splice
 * 배열에서 요소를 하나만 지우고 싶다면 어떻게 해야 할까?
 * 배열 역시 객체형에 속하므로 프로퍼티를 지울 때 쓰는 연산자 delete를 사용할 수 있을 것이다.
 */
let arr = ["I", "go", "home"];

delete arr[1]; // "go"를 삭제한다.

alert(arr[1]); // undefined

// delete를 써서 요소를 지우고 난 후 배열 --> arr = ["I",  , "home"];
alert(arr.length); // 3
/* 원하는 대로 요소를 지웠지만 배열의 요소는 여전히 세 개다. 
 * `delete obj.key`는 key를 이용해 해당 키에 상응하는 값을 지우기 때문이다. 
 * 하지만, 삭제된 요소가 만든 빈 공간을 나머지 요소들이 자동으로 채워 배열의 길이가 짧아지는 의도와 다른 결과다.
 * 그런 결과를 원한다면 특별한 메서드를 사용해야한다.
 * arr.splice(start)는 요소를 자유자재로 다룰 수 있게 한다. 해당 메서드는 요소 추가, 삭제, 교체가 모두 가능하다.
 * 
 * 아래와 같이 사용이 가능하다.
 * arr.splice(index[, deleteCount, elem1, ...., elemN])
 * 첫 번째 매개변수는 조작을 가할 첫 번째 요소를 가리키는 인덱스(index)이다. 
 * 두 번째 매개변수는 deleteCount로, 제거하고자 하는 요소의 개수를 나타낸다.
 * `elem1, ... , elemN`은 배열에 추가할 요소를 나타낸다.
 * 
 * 아래 예시는 요소 삭제 관련 예시다.
 */

arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // 인덱스 1부터 요소 한 개를 제거

alert(arr);  // ["I", "JavaScript"]

/* 다음 예시는 요소 세 개(3)를 지우고, 그 자리를 다른 요소 두 개로 교체한다. */
arr = ["I", "study", "JavaScript", "right", "now"];

// 처음(0) 세 개(3)의 요소를 지우고, 이 자리에 다른 요소를 대체한다.
arr.splice(0, 3, "Let's", "dance");

alert(arr); // now ["Let's", "dance", "right", "now"]

/* splice는 삭제된 요소를 구성된 배열을 반환한다. */
arr = ["I", "study", "JavaScript", "right", "now"];

// 처음 두 개의 요소를 삭제함
let removed = arr.splice(0, 2);

alert(removed); // "I", "study"

/* splice 메서드의 deleteCount를 0으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 추가 할 수 있다. */
arr = ["I", "study", "JavaScript"];

// 인덱스 2부터
// 0개의 요소를 삭제한다.
// 그 후, "complex"와 "language"를 추가한다.
arr.splice(2, 0, "complex", "language");

alert(arr); // "I", "study", "complex", "language", "JavaScript"

/** 음수 인덱스도 사용할 수 있다.
 * slice 메서드 뿐만 아니라 배열 관련 메서드엔 음수 인덱스를 사용할 수 있다. 
 * 이때 마이너스 부호 앞의 숫자는 배열 끝에서부터 센 위치를 나타낸다.
 */
arr = [1, 2, 5];

// 인덱스 -1부터 (배열 끝에서부터 첫 번째 요소)
// 0개의 요소를 삭제하고
// 3과 4를 추가한다.
arr.splice(-1, 0, 3, 4);

alert(arr); // 1,2,3,4,5

///////////////

/** slice
 * arr.slice는 arr.splice와 유사해 보이지만 횔씬 간단하다.
 * arr.slice([start], [end])
 * 
 * 이 메서드는 "start" 인덱스부터 ("end"를 제외한) "end"인덱스까지의 복사한 새로운 배열을 반환한다.
 * start와 end는 둘 다 음수일 수 있는데, 이땐 배열 끝에서부터의 요소 개수를 의미한다.
 * 
 * arr.slice는 문자열 메서드인 str.slice와 유사하게 동작하는데 arr.slice는 서브 문자열(substring) 대신 서브 배열(subarray)을 반환한다는 점이 다르다.
 */
arr = ["t", "e", "s", "t"];

alert(arr.slice(1, 3)); // e, s (인덱스가 1인 요소부터 인덱스가 3인 요소까지를 복사(인덱스가 3인 요소는 제외))

alert(arr.slice(-2)); // s,t (인덱스가 -2인 요소부터 제일 끝 요소까지룰 복사)
/* arr.slice()는 인수를 하나도 넘기지 않고 호출하여 arr의 복사본을 만들 수 있다. 
    이런 방식은 기존의 배열을 건들리지 않으면서 배열을 조작해 새로운 배열을 만들고자 할 때 자주 사용된다. */

/** concat
 * arr.concat은 기본 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용한다.
 * arr.concat(arg1, arg2...)
 * 
 * 인수엔 배열이나 값이 올 수 있는데, 인수 개수엔 제한이 없다.
 * 메서드를 호출하면 arr에 속한 모든 요소와 arg1, arg2 등에 속한 모든 요소를 한데 모은 새로운 배열이 반환된다.
 * 인수 argN가 배열일 경우 배열의 모든 요소가 복사된다. 그렇지 않는 경우(단순 값인 경우)는 인수가 그대로 복사된다.
 */

arr = [1, 2];

// arr의 요소 모두와 [3, 4]의 요소 모두를 한데 모은 새로운 배열이 만들어진다.
alert(arr.concat([3, 4])); // 1,2,3,4

// arr의 요소 모두와 [3, 4]의 요소 모두, [5, 6]의 요소 모두를 모은 새로운 배열이 만들어진다.
alert(arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// arr의 요소 모두와 [3, 4]의 요소 모두, 5, 6을 한데 모은 새로운 배열이 만들어진다.
alert(arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6

/* concat 메서드는 제공받은 배열의 요소를 복사해 활용한다. 
객체가 인자로 넘어오면(배열처럼 보이는 유사 배열 객체이더라도) 객체는 분해되지 않고 통으로 복사되어 더해진다. */

arr = [1, 2];

let arrayLike = {
    0: "something",
    length: 1
};

alert(arr.concat(arrayLike)); // 1, 2, [object Object]

/* 그런데 인자로 받은 유사 배열 객체에 특수한 프로퍼티  Symbol.isConcatSpreadable이 있으면
   concat은 이 객체를 배열처럼 취급한다. 따라서 객체 전체가 아닌 객체 프로퍼티의 값이 더해진다. */

arr = [1, 2];

arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
};

alert(arr.concat(arrayLike)); // 1, 2, something, else

///////////////////

/** forEach로 반복작업하기
 * arr.forEach는 주어진 함수를 배열 요소 각각에 대해 실행할 수 있게 한다.
 * 
 
 arr.forEach(function (item, index, array) {
    // 요소에 무언가를 할 수 있다.
 });

 * 
 */

// 요소 모두를 얼럿창을 통해 출력해주는 코드
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);

// 인덱스 정보까지 더해서 출력해주는 좀 더 정교한 코드
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
    alert(`${item} is at index ${index} in ${array}`);
});

/* 참고로, 인수로 넘겨준 함수의 반환값은 무시된다. */

/////////////////

/** 배열 탐색하기
 * 배열 내에서 무언가를 찾고 싶을 때 쓰는 메서드에 대해 알아보자
 * 
 ** indexOf, lastIndexOf와 includes
 * arr.indexOf와 arr.lastIndexOf, arr.includes는 같은 이름을 가진 문자열 메서드와 문범이 동일하다.
 * 하는 일 또한 같다. 연산 대상이 문자열이 아닌 배열의 요소라는 점만 다르다.
 * 
 * arr.indexOf(item, from)는 인덱스 from부터 시작해 item(요소)을 찾는다. 요소를 발견하면 해당 요소의 인덱스를 반환하고, 발견하지 못하면 -1을 반환한다.
 * arr.lastIndexOf(item, from)는 위 메서드와 동일한 기능을 하는데, 검색을 끝에서부터 시작한다는 점만 다르다.
 * arr.includes(item, from)는 인덱스 from부터 시작해 item이 있는지를 검색하는데, 해당하는 요소를 발견하면 true를 반환한다.
 */

arr = [1, 0, false];

alert(arr.indexOf(0)); // 1
alert(arr.indexOf(false)); // 2
alert(arr.indexOf(null)); // -1

alert(arr.includes(1)); // true

/* 위 메서드들은 요소를 찾을 때 완전 항등 연산자 ===을 사용한다는 점에 유의해야한다. 
   위를 보면 false를 검색하면 정확히 false만을 검색하지, 0을 검색하진 않는다.

   요소의 위치를 정확히 알고 싶은게 아니고 요소가 배열 내에 존재하는지 여부만 확인하고 싶다면, arr.includes를 사용하는 게 좋다.

   includes는 NaN도 제대로 처리한다는 점에서 indexOf/lastIndexOf와 약간 차이가 있다. */

const arrA = [NaN];
alert(arrA.indexOf(NaN)); // -1 (완전 항등 비교 === 는 NaN엔 동작하지 않으므로 0이 출력되지 않는다.)
alert(arr.includes(NaN)); // true (NaN의 여부를 확인하였다.)

/** find와 findIndex
 * 객체로 이루어진 배열이 있다고 가정해보자, 특정 조건에 부합하는 객체를 배열 내에서 어떻게 찾을 수 있을까?
 * 이럴 땐 arr.find(fn)을 사용할 수 있다.
 * 
 * let result = arr.find(function (item, index, array) {
    // true가 반환되면 반복이 멈추고 해당 요소를 반환한다.
    // 조건에 해당하는 요소가 없으면 undefined를 반환한다.
 });
 * 요소 전체를 대상으로 함수가 순차적으로 호출된다.
 * item - 함수를 호출할 요소
 * index - 요소의 인덱스
 * array - 배열 자기 자신
 * 
 * 함수가 참을 반환하면 탐색은 중단되고 해당 요소가 반환된다. 원하는 요소를 찾지 못했으면 undefined가 반환된다.
 */

// id와 name 프로퍼티를 가진 사용자 객체로 구성된 배열에서 id == 1 조건에 충족하는 사용자 객체를 찾는 코드
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" }
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
/* 실무에서 객체로 구성된 배열을 다뤄야 할 일이 잦기 때문에 find 메서드 활용법을 익혀두는게 좋다
   
   그런데 위 예시에서 find 안의 함수가 인자를 하나만 가지고 있다는 점을 알아두자(item => item.id == 1).
   이런 패턴이 가장 많이 사용되는 편이다. 다른 인자(index, array)은 잘 사용되지 않는다.
   
   arr.findIndex는 find와 동일한 일을 하나, 
   조건에 맞는 요소를 반환하는 대신 해당 요소의 인덱스를 반환한다는 점이 다르다.
   조건에 맞는 요소가 없으면 -1이 반환된다.*/