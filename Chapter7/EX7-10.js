/*
 * 래퍼(wrapper)
 * 특정 함수를 자신의 함수로 덮아쓰는 것을 말함
 * 원래 함수 기능을 잃어버리지 않는 상태로 자신의 로직을 수행할 수 있어야함.
 * 다향성(polymorphism)을 위해 쓰는 오버라이드(override)와 유사함
 */


function wrap(object, method, wrapper) {
    var fn = object[method];
    return object[method] = function () {
        // return wrapper.apply(this, [fn].concat(
        return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)));
    };
}

Function.prototype.original = function (value) {
    this.value = value;
    console.log("value : " + this.value);
}

var mywrap = wrap(Function.prototype, "original", function (orig_func, value) {
    this.value = 20;
    orig_func(value);
    console.log("wrapper value : " + this.value);
});

var obj = new mywrap("zzoon");
// value : zzoon
// wrapper value : 20 -> zzoon

/**
 * Function.prototype에 original 함수을 덮어쓰기 위해 wrap함수를 호출
 * 세번째 인자로 넘신 자신의 익명함수를 Function.prototype.original에 덮어쓰려한다.
 * 자신의 익명 함수 첫 번째 인자로 원래 함수의 참조를 받을 수 있다. 이 참조로 원래 함수를 실행 로직 수행 할 수 있다.
 * 
 * wrapper()를 apply()로 기존 함수의 참조를 첫 번째 인자로 넘김으로써 이 함수에 접근 할 수 있다.
 * 클로저를 절묘하게 사용한 함수형 프로그래밍의 한 방법
 * 
 * [fn] 대신 [fn.bind(this)]를 쓰면 원래 함수에 반환되는 익명 함수의 this를 바인딩
 */

/**
 * 래퍼는 기존에 제공되는 함수에서 사용자가 원하는 로직을 추가하고 싶거나 
 * 기존에 있는 버스를 피해가고자 할 때 많이 사용된다.
 * 특정 플랫폼에서 버그를 발생시키는 함수가 있을 경우 컨트롤할 수 있으므로 상당히 용이
 */
