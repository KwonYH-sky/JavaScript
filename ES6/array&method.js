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
