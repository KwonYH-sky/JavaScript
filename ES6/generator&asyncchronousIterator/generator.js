/** 제너레이터
 * 일반 함수는 하나의 값(혹은 0개의 값)만을 반환한다.
 * 하지만 제너레이터(generator)를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있다.
 * 제너레이터와 이터러블 객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있다.
 */

/** 제너레이터 함수 
 * 제너레이터를 만들려면 '제너레이터 함수'라 불리는 특별한 구조, `function*`이 필요하다.
 */
// 예시:
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

/* 제너레이터 함수는 일반 함수와 동작 방식이 다르다.
 * 제너레이터 함수를 호출하면 코드가 실행되지 않고, 
 * 대신 실행을 처리하는 특별 객체, '제너레이터 객체'가 반환된다.
 */

function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성한다.
let generator = generateSequence();
alert(generator); // [object Generator]

/* 함수 본문 코드는 아직 실행되지 않았다.
 * 
 * next()는 제너라이터의 주요 메서드이다. 
 * next()를 호출하면 가장 가까운 yield <value>문을 만날 때까지 실행이 지속된다(value를 생략할 수도 있는데, 이 경우엔 unde). 
 */