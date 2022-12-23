var inherit = function (Parent, Child) {
    var F = function () { };
    return function (Parent, Child) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.construtor = Child;
        Child.super = Parent.prototype;
    };
}();

/**
 * Javascript Patterns의 저자 스토얀 스테파노프가 제시한 상속관계를 즉시 실행 함수와
 * 클로저를 활용하여 최적화된 함수가 위 함수이다.
 * 클로저는 F()함수를 계속 참조하므로 가비지 컬렉터의 대상이 안되고 계속 남아있다.
 * 즉 F()생성은 단 한번만 이루어지고 함수가 계속 호출되어도 새로 생성 할 필요가 없다.
 */