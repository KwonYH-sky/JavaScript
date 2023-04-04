/** 모듈 내보고내 가져오기
 * export와 import 지시자는 다양한 방식으로 활용된다.
 * export와 import의 기본적인 사용법말고 좀 더 다양한 사용법을 알아보자.
 */

/** 선언부 앞에 export 붙이기
 * 변수나 함수, 클래스를 선언할 땐 앞에 export를 붙이면 내보내기가 가능하다.
 * 아래 내보내기느 모두 유효하다.
 */

// 배열 내보내기
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 상수 내보내기
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// 클래스 내보내기
export class User {
    constructor(name) {
        this.name = name;
    }
}

/** I) 클래스나 함수를 내보낼 땐 세미클론을 붙이지 말자.
 * 클래스나 함수 선언시, 선언 부 앞 except를 붙인다고 해서 
 * 함수 선언 방식이 함수 선언문에서 함수 표현식(function expression)으로 바뀌지 않는다.
 * 내보내 지긴 헀지만 여전히 함수 선언문이다.
 * 
 * 대부분의 자바스크립트 스타일 가이드는 함수나 클래스 선언 끝에 세미클론을 붙이지 말라고 권유한다.
 * 같은 이유로 export class 나 export function 끝에 세미클론을 붙이지 않는다.
 */
export function sayhi(user) {
    alert(`Hello, ${user}!`);
} // 끝에 ;(세미클론)을 붙이지 않는다.

////////////////////////////////////////////////

