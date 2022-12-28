/*
    화살표 함수는 전통적인 힘수형 표현의 대안이다.
    함수표현식보다 단순하고 표현하기 간결한 문법으로 함수를 만들 수 있다.
*/

let func = function (arg1, arg2, ...argN) {
    return expression;
};
// 위 함수를 화살표 함수로 표현한 함수
let funcToArrow = (arg1, arg2, ...argN) => expression;

let sum = (a, b) => a + b;
/* 위 화살표 함수는 아래 함수의 축약형
let sum = function (a, b) {
    return a + b;
}
*/
alert(sum(1, 2)) // 3

// 인수가 하나 밖에 없다면 인수를 감싸는 괄호를 생략할 수 있음. 
// 괄호를 생략하면 코드의 길이를 더 줄일 수 있다.
let double = n => n * 2;
// let double = function(n){return n * 2;}과 거의 동일
alert(double(4)); // 8

// 인수가 하나도 없을 땐 괄호안을 비우면 된다. 다만 괄호는 생략하면 안된다.
let sayHi = () => alert("안녕하세요.")
sayHi();

// 화살표 함수는 함수 표현식과 같은 방법으로 사용가능
let age = prompt("나이를 알려주세요.", 18);
let welcome = (age < 18) ?
    () => alert("안녕") :
    () => alert("안녕하세요.");
welcome();

/* 본문이 여러줄인 화살표 함수
중괄호 안에 코드들을 적고 return 지시자를 사용해 명시적으로 결과값을 반환해줘야함. */
let sumA = (a, b) => { // 중괄호는 본문 여러 줄로 되어 있음을 알려줌
    let result = a + b;
    return result; // 중괄호를 사용 했다면 반드시 return으로 결괏값 반환
}
alert(sumA(1, 2)); // 3

/**
 * 화살표 함수는 단순히 함수를 짧게 쓰기 위한 용도로 사용되지 않는다.
 * 자바스크립트를 사용하다 보면 멀리 동떨어진 곳에서 실행될 작은 함수를 작성해야하는 상황을 자주 만나게 된다.
 * 
 * ex)arr.forEach(func) - func는 forEach가 호출될 때 배열 arr의 요소 전체를 대상으로 실행된다.
 * 
 * 자바스크립트에서는 함수를 생성하고 그 함수를 어딘가에 전달하는 것이 자연스럽다.
 * 
 * 어딘가에 함수를 전달하게 되면 함수의 컨텍스트를 잃을 수 있다. 
 * 이럴 때 화살표 함수를 사용하면 현재 컨텍스트를 잃지 않아 편리
 */

// 화살표 함수에는 'this'가 없다.
/**
 * 화살표 함수 본문에서 this에 접근하면, 외부에서 값을 가져온다.
 * 이런 특징은 객체의 메서드 안에서 동일 객체의 프로퍼티를 대상으로 순회하는데 사용할 수 있다.
*/
let group = {
    title: "1모둠",
    students: ["보라", "호진", "지민"],

    showList() {
        this.students.forEach(
            student => alert(this.title + ': ' + student)
        );
    }
};
group.showList();

/**
 * 예시의 forEach에서 화살표 함수를 사용했기 때문에 화살표 함수 본문에 있는 this.title은 화살표 함수 바깥에 있는
 * 메서드인 showList가 가리키는 대상과 동일 해진다.
 * 
 * 만약 화살표 함수 대신 일반함수를 사용했다면 에러가 발생한다.
 * forEach에 전달되는 함수의 this가 undefined이어서 발생한다.
 * 하지만 화살표 함수는 this 자체가 없기 때문에 에러가 발생하지 않는다.
 * 
 * 화살표 함수는 new와 함께 실행할 수 없다.
 * this가 없기 때문에 생성자 함수로 사용할 수 없다. 즉 화살표 함수는 new와 함께 호출 할 수 없다.
 */

// 화살표 함수 vs. bind
/** 화살표 함수와 일반 함수를 .bind(this)를 사용해서 호출하는 것 사이에는 작은 차이가 있다.
 * .bind(this)는 함수의 '한정된 버전(bound version)'을 만든다.
 * 화살표 함수는 어떤 것도 바인딩시키지 않는다. 화살표함수는 단지 this가 없을 뿐이다.
 * 화살표 함수에서 this을 사용하면 일반 변수 서칭과 마찬가지로 this의 값을 외부 렉시컬 환경에서 찾는다.
 */

// 화살표 함수엔 'arguments'가 없다.
/** 화살표 함수는 일반 함수와 다르게 모든 인수에 접근할 수 있게 해주는 유사 배열 객체 arguments룰 자원하지 않는다.
 * 이러한 특징은 현재 this값과 arguments정보를 함께 실어 호출을 포워딩해 주는 데코레이터를 만들 때 유용하게 사용된다.
 */

/**
 * 데코레이터 defer(f, ms)는 함수를 인자로 받고 이 함수를 래퍼로 감싸 반환하는데, 함수 f는 ms 밀리초 후에 호출된다.
 */
function defer(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms);
    }
}
function sayHi(who) {
    alert('안녕, ' + who);
}
let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("철수"); // 2초 후 "안녕, 철수"가 출력된다.

/**
 * 화살표 함수를 사용하지 않고 동일한 기능을 하는 데코레이터 함수를 만들면 아래와 같다.
 */
function deferNormal(f, ms) {
    return function (...args) {
        let ctx = this;
        setTimeout(function () {
            return f.apply(ctx, args);
        }, ms);
    };
}
// 일반 함수에선 setTimeout에 넘겨주는 콜백 함수에서 사용할 변수 ctx와 args를 반드시 만들어줘야 한다.

/** 화살표 함수가 일반 함수와 다른 점은 다음과 같다.
 * this를 가지지 않는다.
 * arguments를 지원하지 않는다
 * new와 함께 호출할 수 없다.
 * 화살표 함수는 super가 없다.
 * 
 * 화살표 함수는 컨텍스트가 있는 긴 코드보다는 자체'컨텍스트'가 없는 짧은 코드를 담을 용도로 만들어졌다.
 */