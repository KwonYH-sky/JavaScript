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
 */