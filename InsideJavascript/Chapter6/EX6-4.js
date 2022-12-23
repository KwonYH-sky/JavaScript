function create_object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

/**
 *  이 코드는 더글라스 크락포드가 자바스크립트 객체를 상속하는 방법으로
 * 오래 전에 소개한 코드이다.
 * create_object()함수는 인자로 들어온 객체를 부모로 하는 자식 객체를 생성하여 반환
 * 프로토타입의 특성을 활용하여 상속을 구현하는 것이 프로토타입 기반의 상속이다.
 * ECMAScript5에서 Object.create() 함수로 제공
 */